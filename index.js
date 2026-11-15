import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'
import Schema from '@deepseek-ai/schemastery'
import { RemoteError, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

/**
 * Host half of dsh-quick-launcher.
 *
 * The client half reads this entry's volatile configuration through the shared
 * config form service, so changing the pinned rows does not require rebuilding
 * client.js or restarting the plugin.
 *
 * Prompt snippets are bound to local files: every `*.md` file inside the
 * configured prompt directory is one preset, and the `quickLauncher` Remote
 * namespace exposes list/read/write/remove over that directory to the client.
 */
export const name = 'dsh-quick-launcher'

export const Config = Schema.object({
  enabled: Schema.boolean()
    .default(true)
    .description('显示输入框左侧的快捷入口'),
  entryLabel: Schema.string()
    .default('')
    .description('入口按钮的无障碍标签；留空时使用当前语言'),
  panelTitle: Schema.string()
    .default('')
    .description('弹层标题；留空时使用当前语言'),
  promptDir: Schema.string()
    .default('')
    .description('Prompt 片段目录（绝对路径，支持 ~）；留空使用 profile 数据目录下的 quick-launcher/prompts。目录内每个 .md 文件是一个 Prompt 预设'),
  commands: Schema.array(Schema.object({
    command: Schema.string()
      .required()
      .description('slash 命令名，不要带开头的 /'),
    label: Schema.string()
      .default('')
      .description('按钮显示文字；留空时使用 /命令名'),
    args: Schema.string()
      .default('')
      .description('固定参数；有值时点击直接执行，留空时按命令的 input.hint 决定是否弹参数框'),
    confirm: Schema.boolean()
      .default(false)
      .description('执行前是否再确认一次'),
  }))
    .default([
      { command: 'goal', label: '目标', args: '', confirm: false },
      { command: 'plan', label: '计划', args: '', confirm: false },
      { command: 'advisor', label: '顾问状态', args: 'status', confirm: false },
      { command: 'advisor', label: '顾问开启', args: 'on', confirm: false },
      { command: 'advisor', label: '顾问关闭', args: 'off', confirm: false },
      { command: 'compact', label: '压缩上下文', args: '', confirm: true },
    ])
    .description('固定在面板里的命令快捷项；同一命令可配置多条不同 args'),
  skills: Schema.array(Schema.object({
    name: Schema.string()
      .required()
      .description('skill 名，不要带开头的 /'),
    label: Schema.string()
      .default('')
      .description('按钮显示文字；留空时使用 /skill 名'),
  }))
    .default([
      { name: 'golang-how-to', label: 'Go' },
      { name: 'taskmd', label: 'Task' },
    ])
    .description('固定在面板里的技能项；点击会向输入框插入 /name token'),
}).volatile()

/** Versioned marker descriptor key the Gateway's source-mode discovery reads. */
const REMOTE_METHODS_KEY = '@deepseek-ai/dsh-typert-protocol/remote-methods'

/** A prompt file name must be a single plain path segment. */
function assertFileName(name) {
  if (typeof name !== 'string' || name === '' || name === '.' || name === '..'
    || /[\\/]/.test(name) || /[\r\n\0]/.test(name)) {
    throw new RemoteError('quickLauncher/invalid-name', `invalid prompt file name: ${JSON.stringify(String(name))}`, {})
  }
}

/** Read the current snapshot out of a volatile (or plain) config reference. */
function configSnapshot(config) {
  if (config !== null && typeof config === 'object' && typeof config.get === 'function') {
    return config.get()
  }
  return config
}

/** Resolve the prompt directory: configured absolute path or the profile default. */
function resolvePromptDir(configured, profileDir) {
  const trimmed = String(configured ?? '').trim()
  if (trimmed === '') {
    const base = profileDir ?? path.join(homedir(), '.dsh', 'profiles', 'default')
    return path.join(base, 'data', 'quick-launcher', 'prompts')
  }
  const expanded = trimmed === '~' || trimmed.startsWith('~/')
    ? path.join(homedir(), trimmed.slice(1))
    : trimmed
  return path.resolve(expanded)
}

/** Fold a filesystem error into a Remote failure that carries its reason. */
function fileError(error) {
  if (error instanceof RemoteError) return error
  return new RemoteError(
    'quickLauncher/file-error',
    error instanceof Error ? error.message : String(error),
    typeof error?.code === 'string' ? { code: error.code } : {},
  )
}

/** Prompt files Remote over one directory, callable as `ctx.remote.quickLauncher`. */
class QuickLauncherFiles extends TypertRemoteService {
  static inject = ['profileContext']

  constructor(ctx, config) {
    super(ctx, 'quickLauncherFiles', { namespace: 'quickLauncher' })
    this.pluginConfig = config
  }

  /** Current prompt directory; volatile config means updates apply live. */
  root() {
    const profile = this.ctx.get('profileContext')
    const profileDir = profile !== undefined && typeof profile.dir === 'string' ? profile.dir : undefined
    const snapshot = configSnapshot(this.pluginConfig)
    return resolvePromptDir(snapshot?.promptDir, profileDir)
  }

  /** Every `*.md` file in the prompt directory, plus the resolved root path. */
  async list() {
    const root = this.root()
    let entries
    try {
      entries = await readdir(root, { withFileTypes: true })
    } catch (error) {
      if (error?.code === 'ENOENT') return { root, files: [] }
      throw fileError(error)
    }
    const files = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => ({ name: entry.name }))
      .sort((a, b) => a.name.localeCompare(b.name))
    return { root, files }
  }

  /** Read one prompt file's text. */
  async readFile(name) {
    assertFileName(name)
    try {
      return { name, text: await readFile(path.join(this.root(), name), 'utf8') }
    } catch (error) {
      throw fileError(error)
    }
  }

  /** Create or overwrite one prompt file; creates the directory when missing. */
  async writeFile(name, text) {
    assertFileName(name)
    if (typeof text !== 'string') {
      throw new RemoteError('quickLauncher/invalid-text', 'prompt file text must be a string', {})
    }
    const root = this.root()
    const file = path.join(root, name)
    try {
      await mkdir(root, { recursive: true })
      await writeFile(file, text, 'utf8')
      return { name }
    } catch (error) {
      throw fileError(error)
    }
  }

  /** Delete one prompt file. */
  async removeFile(name) {
    assertFileName(name)
    try {
      await rm(path.join(this.root(), name))
      return { name }
    } catch (error) {
      throw fileError(error)
    }
  }
}

// The @Remote decorator is TypeScript-only; plain JavaScript attaches the same
// versioned marker descriptor `remoteMethods()` reads from the prototype.
Object.defineProperty(QuickLauncherFiles.prototype, REMOTE_METHODS_KEY, {
  enumerable: false,
  writable: false,
  configurable: false,
  value: Object.freeze({
    version: 1,
    methods: [
      { method: 'list', invocation: { kind: 'direct' } },
      { method: 'readFile', invocation: { kind: 'direct' } },
      { method: 'writeFile', invocation: { kind: 'direct' } },
      { method: 'removeFile', invocation: { kind: 'direct' } },
    ].map((marker) => Object.freeze({ ...marker })),
  }),
})

export function apply(ctx, config) {
  new QuickLauncherFiles(ctx, config)
}

export { QuickLauncherFiles }
