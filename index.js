import Schema from '@deepseek-ai/schemastery'

/**
 * Host half of dsh-quick-launcher.
 *
 * The client half reads this entry's volatile configuration through the shared
 * config form service, so changing the pinned rows does not require rebuilding
 * client.js or restarting the plugin.
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

/** The Host half has no runtime work; the Client half owns the launcher. */
export function apply() {}
