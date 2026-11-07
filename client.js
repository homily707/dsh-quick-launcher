window.__ModuleLoader__.load({
  id: 'dsh-quick-launcher',
  factory(require) {
    const React = require('react')
    const ReactDOM = require('react-dom')
    const h = React.createElement

    const NS = 'quick-launcher'
    const ENTRY_ID = 'dsh-quick-launcher'

    const ZH = {
      entryLabel: 'Quick Launcher',
      openHint: '打开 Quick Launcher',
      panelTitle: 'Quick Launcher',
      commands: '命令',
      skills: '技能',
      close: '关闭',
      loading: '正在加载…',
      empty: '还没有配置常用项',
      catalogError: '无法加载命令/技能目录：{message}',
      catalogUnavailable: '当前会话的命令目录不可用',
      unknownCommand: '未找到命令 /{command}',
      unknownSkill: '未找到技能 /{name}',
      skillConflict: '技能 /{name} 与同名命令冲突，命令优先',
      skillNotUserInvocable: '技能 /{name} 不允许用户手动调用',
      skillAlready: '/{name} 已在本轮输入中',
      skillInserted: '已插入 /{name}',
      skillInsertFailed: '插入失败，请重试',
      inputUnavailable: '当前输入框不可用',
      inputBusy: '输入框正在提交，稍后再试',
      argsPlaceholder: '输入参数',
      argsLabel: '命令 /{command} 的参数',
      run: '执行',
      cancel: '取消',
      confirm: '确认执行',
      confirmText: '确认执行 /{command}？',
      commandRunning: '正在执行 /{command}…',
      commandDone: '已执行 /{command}',
      commandError: '/{command} 执行失败：{message}',
      failed: '执行失败',
      configSummary: '配置 Quick Launcher',
      configHint: '编辑 JSON 后保存；修改会立即生效，无需重装。',
      jsonLabel: 'Quick Launcher 配置 JSON',
      save: '保存',
      saving: '保存中…',
      saved: '已保存',
      saveFailed: '保存失败，请检查配置',
      invalidJson: 'JSON 格式不正确：{message}',
      readOnly: '当前配置不可写',
    }

    const EN = {
      entryLabel: 'Quick Launcher',
      openHint: 'Open Quick Launcher',
      panelTitle: 'Quick Launcher',
      commands: 'Commands',
      skills: 'Skills',
      close: 'Close',
      loading: 'Loading…',
      empty: 'No pinned items yet',
      catalogError: 'Could not load the command/skill catalog: {message}',
      catalogUnavailable: 'The command catalog is unavailable for this session',
      unknownCommand: 'Unknown command /{command}',
      unknownSkill: 'Unknown skill /{name}',
      skillConflict: 'Skill /{name} collides with a command; the command wins',
      skillNotUserInvocable: 'Skill /{name} is not available for manual invocation',
      skillAlready: '/{name} is already in this turn',
      skillInserted: 'Inserted /{name}',
      skillInsertFailed: 'Could not insert the skill; try again',
      inputUnavailable: 'The composer is unavailable',
      inputBusy: 'The composer is submitting; try again shortly',
      argsPlaceholder: 'Arguments',
      argsLabel: 'Arguments for /{command}',
      run: 'Run',
      cancel: 'Cancel',
      confirm: 'Confirm',
      confirmText: 'Run /{command}?',
      commandRunning: 'Running /{command}…',
      commandDone: 'Ran /{command}',
      commandError: '/{command} failed: {message}',
      failed: 'Execution failed',
      configSummary: 'Configure Quick Launcher',
      configHint: 'Edit the JSON and save; changes apply immediately without reinstalling.',
      jsonLabel: 'Quick Launcher configuration JSON',
      save: 'Save',
      saving: 'Saving…',
      saved: 'Saved',
      saveFailed: 'Save failed; check the configuration',
      invalidJson: 'Invalid JSON: {message}',
      readOnly: 'This configuration is not writable',
    }

    const CSS = `
.dsh-cl-wrap { display: inline-flex; align-items: center; min-width: 0; }
.dsh-cl-dock { position: absolute; z-index: 40; display: flex; align-items: center; }
.dsh-cl-pill {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; padding: 0; box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 16px; line-height: 1; font-weight: 500; cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .04);
  transition: background-color .1s ease, border-color .1s ease;
}
.dsh-cl-pill:hover, .dsh-cl-pill[aria-expanded="true"] {
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, var(--dsw-alias-bg-layer-1));
  border-color: var(--dsw-alias-border-l2);
}
.dsh-cl-icon { display: block; line-height: 1; transform: translateY(-.5px); }
.dsh-cl-panel {
  position: fixed; z-index: 1000; box-sizing: border-box;
  width: min(360px, calc(100vw - 16px)); max-height: min(60vh, 520px);
  overflow-y: auto; padding: 6px;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
  box-shadow: var(--dsw-elevation-prominent);
  font-size: 12px; line-height: 1.35;
}
.dsh-cl-panel > section + section {
  margin-top: 4px; padding-top: 2px;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.dsh-cl-head {
  position: sticky; top: 0; z-index: 1;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 6px 6px 8px 10px; color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  font-size: 12px; font-weight: 500;
}
.dsh-cl-close {
  flex: none; width: 24px; height: 24px; padding: 0; border: 0; border-radius: 6px;
  background: transparent; color: var(--dsw-alias-label-secondary); font: inherit;
  font-size: 16px; line-height: 24px; cursor: pointer;
}
.dsh-cl-close:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
.dsh-cl-row {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 10px;
  width: 100%; min-width: 0; padding: 7px 8px; border: 0; border-radius: 7px;
  background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; text-align: left; cursor: pointer;
}
.dsh-cl-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); }
.dsh-cl-row:disabled { opacity: .5; cursor: default; }
.dsh-cl-row--selected {
  box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
}
.dsh-cl-row-title {
  display: block; min-width: 0; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; font-size: 12px; font-weight: 500;
}
.dsh-cl-row-detail {
  display: block; max-width: 220px; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; justify-self: end; color: var(--dsw-alias-label-secondary);
  font-family: var(--dsw-font-mono, ui-monospace, monospace); font-size: 11px;
}
.dsh-cl-inline {
  display: grid; gap: 6px; margin: 2px 8px 8px; padding: 7px 8px;
  border-left: 2px solid var(--dsw-alias-border-l2);
}
.dsh-cl-confirm-text { color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dsh-cl-actions { display: flex; align-items: center; gap: 6px; }
.dsh-cl-btn {
  height: 26px; padding: 0 10px; border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 6px; background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 11px; line-height: 24px; cursor: pointer;
}
.dsh-cl-btn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
.dsh-cl-btn--primary {
  border-color: transparent;
  background: var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary));
  color: var(--dsw-alias-label-primary-foreground);
}
.dsh-cl-btn--primary:hover {
  background: var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary));
}
.dsh-cl-btn:disabled { opacity: .5; cursor: default; }
.dsh-cl-input {
  width: 100%; min-width: 0; height: 28px; padding: 0 8px; box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 12px; outline: none;
}
.dsh-cl-input::placeholder { color: var(--dsw-alias-label-secondary); }
.dsh-cl-status {
  padding: 8px; color: var(--dsw-alias-label-secondary);
  font-size: 11px; line-height: 1.45; white-space: pre-wrap; word-break: break-word;
}
.dsh-cl-config { display: grid; gap: 8px; padding: 12px 8px; }
.dsh-cl-config-hint {
  margin: 0; color: var(--dsw-alias-label-secondary);
  font-size: 12px; line-height: 1.5;
}
.dsh-cl-config-text {
  width: 100%; min-height: 220px; box-sizing: border-box; resize: vertical;
  padding: 8px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-mono, ui-monospace, monospace);
  font-size: 11px; line-height: 1.5; outline: none;
}
.dsh-cl-config-status {
  min-height: 16px; margin: 0; color: var(--dsw-alias-label-secondary);
  font-size: 11px; line-height: 1.4;
}
.dsh-cl-status--error { color: var(--dsw-alias-state-error-primary); }
.dsh-cl-status--muted { color: var(--dsw-alias-label-secondary); }
.dsh-cl-empty { padding: 8px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
.dsh-cl-pill:focus-visible, .dsh-cl-close:focus-visible, .dsh-cl-row:focus-visible,
.dsh-cl-btn:focus-visible, .dsh-cl-input:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px;
}
`

    function message(template, vars) {
      return String(template).replace(/\{(\w+)\}/g, (match, key) => (
        vars !== undefined && Object.prototype.hasOwnProperty.call(vars, key)
          ? String(vars[key])
          : match
      ))
    }

    function translator(locale) {
      const dict = /^zh(?:-|$)/i.test(String(locale || '')) ? ZH : EN
      return (key, vars) => message(dict[key] ?? EN[key] ?? key, vars)
    }

    function useLocale(ctx) {
      const subscribe = React.useCallback((listener) => ctx.locale.subscribe(listener), [ctx])
      const getSnapshot = React.useCallback(() => ctx.locale.getSnapshot().active, [ctx])
      const active = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
      return React.useMemo(() => translator(active), [active])
    }

    const EMPTY_CONFIG = Object.freeze({
      enabled: true,
      entryLabel: '',
      panelTitle: '',
      commands: [],
      skills: [],
    })
    const EMPTY_FORM_SNAPSHOT = Object.freeze({ status: 'idle', value: undefined })

    function useConfigForm(ctx) {
      const form = React.useMemo(() => {
        const forms = ctx.get('configForms')
        if (forms === undefined || typeof forms.get !== 'function') return undefined
        return forms.get(ENTRY_ID)
      }, [ctx])
      const subscribe = React.useCallback(
        (listener) => (form === undefined ? () => {} : form.subscribe(listener)),
        [form],
      )
      const getSnapshot = React.useCallback(
        () => (form === undefined ? EMPTY_FORM_SNAPSHOT : form.getSnapshot()),
        [form],
      )
      const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
      return { form, snapshot }
    }

    function useConfig(ctx) {
      const { snapshot } = useConfigForm(ctx)
      return snapshot !== undefined && snapshot !== null && typeof snapshot.value === 'object' && snapshot.value !== null
        ? snapshot.value
        : EMPTY_CONFIG
    }

    function ConfigPage(props) {
      const { ctx, view } = props
      const t = useLocale(ctx)
      const { form, snapshot } = useConfigForm(ctx)
      const [text, setText] = React.useState('')
      const [loaded, setLoaded] = React.useState(false)
      const [dirty, setDirty] = React.useState(false)
      const [busy, setBusy] = React.useState(false)
      const [status, setStatus] = React.useState('')
      const value = snapshot !== undefined && snapshot !== null && typeof snapshot.value === 'object' && snapshot.value !== null
        ? snapshot.value
        : undefined

      React.useEffect(() => {
        if (loaded || dirty || value === undefined) return
        setText(JSON.stringify({
          commands: Array.isArray(value.commands) ? value.commands : [],
          skills: Array.isArray(value.skills) ? value.skills : [],
        }, null, 2))
        setLoaded(true)
      }, [dirty, loaded, value])

      if (view === 'summary') return h('span', null, t('configSummary'))
      if (snapshot === undefined || snapshot === null || snapshot.status === 'loading') {
        return h('p', { className: 'dsh-cl-config-hint' }, t('loading'))
      }
      if (value === undefined) return h('p', { className: 'dsh-cl-config-hint' }, t('readOnly'))

      const writable = snapshot.writable !== false
      const save = async () => {
        if (busy || form === undefined || !writable) return
        let parsed
        try {
          parsed = JSON.parse(text)
        } catch (error) {
          setStatus(t('invalidJson', { message: error instanceof Error ? error.message : String(error) }))
          return
        }
        const commands = Array.isArray(parsed?.commands) ? parsed.commands : null
        const skills = Array.isArray(parsed?.skills) ? parsed.skills : null
        if (commands === null || skills === null) {
          setStatus(t('invalidJson', { message: 'commands and skills must be arrays' }))
          return
        }
        setBusy(true)
        setStatus('')
        try {
          const ok = await form.mutate([
            { op: 'set', path: ['commands'], value: commands },
            { op: 'set', path: ['skills'], value: skills },
          ])
          if (!ok) {
            setStatus(t('saveFailed'))
            return
          }
          setDirty(false)
          setLoaded(true)
          setStatus(t('saved'))
        } catch (_error) {
          setStatus(t('saveFailed'))
        } finally {
          setBusy(false)
        }
      }

      return h('div', { className: 'dsh-cl-config' }, [
        h('p', { key: 'hint', className: 'dsh-cl-config-hint' }, t('configHint')),
        h('textarea', {
          key: 'json',
          className: 'dsh-cl-config-text',
          value: text,
          spellCheck: false,
          'aria-label': t('jsonLabel'),
          onChange: (event) => {
            setDirty(true)
            setText(event.currentTarget.value)
          },
        }),
        h('div', { key: 'actions', className: 'dsh-cl-actions' }, [
          h('button', {
            key: 'save',
            type: 'button',
            className: 'dsh-cl-btn dsh-cl-btn--primary',
            disabled: busy || !writable,
            onClick: save,
          }, busy ? t('saving') : t('save')),
        ]),
        h('p', { key: 'status', className: 'dsh-cl-config-status', role: 'status' }, status),
      ])
    }

    function normalizeName(value) {
      return typeof value === 'string' ? value.trim().replace(/^\//, '') : ''
    }

    function escapeRegExp(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    function hasSkillToken(draft, name) {
      if (typeof draft !== 'string' || draft === '' || name === '') return false
      return new RegExp(`(^|\\s)/${escapeRegExp(name)}(?=\\s|$)`).test(draft)
    }

    async function loadCatalog(ctx, sessionId, signal) {
      const sessions = ctx.get('sessions')
      if (sessions === undefined || typeof sessions.using !== 'function') {
        throw new Error('sessions service unavailable')
      }
      return sessions.using(sessionId, { source: 'commandLauncher', signal }, async (reference) => {
        const state = reference.binding.session.getSnapshot()
        if (state.openState !== 'open') {
          throw state.openError ?? new Error(`session "${sessionId}" is not open`)
        }
        const [commandsResult, skillsResult] = await Promise.all([
          ctx.remote.commands.list(sessionId),
          ctx.remote.skills.list({ sessionId }, signal),
        ])
        if (!commandsResult.ok) {
          throw new Error(`${commandsResult.error.code}: ${commandsResult.error.message}`)
        }
        if (!skillsResult.ok) {
          throw new Error(`${skillsResult.error.code}: ${skillsResult.error.message}`)
        }
        return {
          commands: Array.isArray(commandsResult.value) ? commandsResult.value : [],
          skills: Array.isArray(skillsResult.value?.skills) ? skillsResult.value.skills : [],
        }
      })
    }

    function CommandRow(props) {
      const {
        item, rowKey, rowId, editing, confirming, hint, draftArg, setDraftArg,
        onActivate, onConfirm, onCancel, onSubmit, busy, t,
      } = props
      const inputRef = React.useRef(null)
      const name = normalizeName(item.command)
      const detail = `/${name}${item.args && item.args.trim() !== '' ? ` ${item.args.trim()}` : ''}`

      React.useEffect(() => {
        if (editing && inputRef.current !== null) inputRef.current.focus()
      }, [editing])

      return h('div', { className: 'dsh-cl-rowwrap' }, [
        h('button', {
          key: 'row',
          type: 'button',
          className: `dsh-cl-row${editing ? ' dsh-cl-row--active' : ''}`,
          onClick: onActivate,
          disabled: busy,
          'aria-expanded': editing || confirming ? 'true' : 'false',
          'aria-controls': editing || confirming ? rowId : undefined,
        }, [
          h('span', { key: 'title', className: 'dsh-cl-row-title' }, item.label || `/${name}`),
          h('span', { key: 'detail', className: 'dsh-cl-row-detail' }, detail),
        ]),
        confirming
          ? h('div', { key: 'confirm', className: 'dsh-cl-inline', id: rowId }, [
              h('span', { key: 'text', className: 'dsh-cl-confirm-text' }, t('confirmText', { command: name })),
              h('div', { key: 'actions', className: 'dsh-cl-actions' }, [
                h('button', {
                  key: 'yes', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--primary',
                  onClick: onConfirm, disabled: busy,
                }, t('confirm')),
                h('button', {
                  key: 'no', type: 'button', className: 'dsh-cl-btn',
                  onClick: onCancel, disabled: busy,
                }, t('cancel')),
              ]),
            ])
          : null,
        editing
          ? h('div', { key: 'editor', className: 'dsh-cl-inline', id: rowId }, [
              h('input', {
                key: 'input',
                ref: inputRef,
                className: 'dsh-cl-input',
                value: draftArg,
                placeholder: hint || t('argsPlaceholder'),
                'aria-label': t('argsLabel', { command: name }),
                disabled: busy,
                onChange: (event) => setDraftArg(event.currentTarget.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    onSubmit()
                  } else if (event.key === 'Escape') {
                    event.preventDefault()
                    onCancel()
                  }
                },
              }),
              h('div', { key: 'actions', className: 'dsh-cl-actions' }, [
                h('button', {
                  key: 'run', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--primary',
                  onClick: onSubmit, disabled: busy,
                }, t('run')),
                h('button', {
                  key: 'cancel', type: 'button', className: 'dsh-cl-btn',
                  onClick: onCancel, disabled: busy,
                }, t('cancel')),
              ]),
            ])
          : null,
      ].filter(Boolean))
    }

    function SkillRow(props) {
      const { item, selected, busy, onClick, t } = props
      const name = normalizeName(item.name)
      return h('button', {
        type: 'button',
        className: `dsh-cl-row${selected ? ' dsh-cl-row--selected' : ''}`,
        'aria-pressed': selected,
        onClick,
        disabled: busy,
      }, [
        h('span', { key: 'title', className: 'dsh-cl-row-title' }, item.label || `/${name}`),
        h('span', { key: 'detail', className: 'dsh-cl-row-detail' }, `/${name}`),
      ])
    }

    function Launcher(props) {
      const { ctx, sessionId } = props
      const t = useLocale(ctx)
      const config = useConfig(ctx)
      const draft = props.useInput !== undefined ? props.useInput((state) => state.draft) : ''
      const inputPhase = props.useInput !== undefined ? props.useInput((state) => state.phase) : 'plain'
      const [open, setOpen] = React.useState(false)
      const [anchor, setAnchor] = React.useState(null)
      const [side, setSide] = React.useState(null)
      const [catalog, setCatalog] = React.useState(null)
      const [catalogError, setCatalogError] = React.useState('')
      const [loading, setLoading] = React.useState(false)
      const [status, setStatus] = React.useState(null)
      const [editingKey, setEditingKey] = React.useState(null)
      const [editingHint, setEditingHint] = React.useState('')
      const [draftArg, setDraftArg] = React.useState('')
      const [confirmingKey, setConfirmingKey] = React.useState(null)
      const [busy, setBusy] = React.useState(false)

      const buttonRef = React.useRef(null)
      const panelRef = React.useRef(null)
      const sessionRef = React.useRef(sessionId)
      const aliveRef = React.useRef(true)
      const catalogRef = React.useRef(null)
      const catalogPromiseRef = React.useRef(null)
      const busyRef = React.useRef(false)
      const hoverTimerRef = React.useRef(null)
      const closeTimerRef = React.useRef(null)
      const openReasonRef = React.useRef('click')
      const panelId = React.useId()

      React.useEffect(() => {
        aliveRef.current = true
        return () => { aliveRef.current = false }
      }, [])

      React.useEffect(() => () => {
        if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current)
        if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
      }, [])

      React.useEffect(() => {
        sessionRef.current = sessionId
        if (hoverTimerRef.current !== null) {
          window.clearTimeout(hoverTimerRef.current)
          hoverTimerRef.current = null
        }
        if (closeTimerRef.current !== null) {
          window.clearTimeout(closeTimerRef.current)
          closeTimerRef.current = null
        }
        setOpen(false)
        setStatus(null)
        setCatalog(null)
        catalogRef.current = null
        catalogPromiseRef.current = null
      }, [sessionId])

      const cancelClose = React.useCallback(() => {
        if (hoverTimerRef.current !== null) {
          window.clearTimeout(hoverTimerRef.current)
          hoverTimerRef.current = null
        }
        if (closeTimerRef.current !== null) {
          window.clearTimeout(closeTimerRef.current)
          closeTimerRef.current = null
        }
      }, [])

      const openOnHover = React.useCallback(() => {
        cancelClose()
        if (open) return
        hoverTimerRef.current = window.setTimeout(() => {
          hoverTimerRef.current = null
          openReasonRef.current = 'hover'
          setOpen(true)
        }, 120)
      }, [cancelClose, open])

      const scheduleClose = React.useCallback(() => {
        cancelClose()
        if (!open || openReasonRef.current !== 'hover') return
        closeTimerRef.current = window.setTimeout(() => {
          closeTimerRef.current = null
          setOpen(false)
        }, 180)
      }, [cancelClose, open])

      const openByClick = React.useCallback(() => {
        cancelClose()
        openReasonRef.current = 'click'
        setOpen(true)
      }, [cancelClose])

      const commands = React.useMemo(
        () => (Array.isArray(config.commands) ? config.commands : [])
          .filter((item) => item !== null && typeof item === 'object' && normalizeName(item.command) !== ''),
        [config.commands],
      )
      const skills = React.useMemo(
        () => (Array.isArray(config.skills) ? config.skills : [])
          .filter((item) => item !== null && typeof item === 'object' && normalizeName(item.name) !== ''),
        [config.skills],
      )

      const updateAnchor = React.useCallback(() => {
        const element = buttonRef.current
        if (element === null || typeof window === 'undefined') return
        const rect = element.getBoundingClientRect()
        const width = Math.min(360, Math.max(240, window.innerWidth - 16))
        const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))
        const spaceAbove = rect.top - 12
        const spaceBelow = window.innerHeight - rect.bottom - 12
        const openBelow = spaceAbove < 220 && spaceBelow > spaceAbove
        setAnchor(openBelow
          ? {
              left,
              width,
              top: rect.bottom + 8,
              maxHeight: Math.max(180, Math.min(520, spaceBelow)),
            }
          : {
              left,
              width,
              bottom: Math.max(8, window.innerHeight - rect.top + 8),
              maxHeight: Math.max(180, Math.min(520, spaceAbove)),
            })
      }, [])

      React.useLayoutEffect(() => {
        if (open) updateAnchor()
      }, [open, updateAnchor])

      const updateSide = React.useCallback(() => {
        const element = buttonRef.current
        if (element === null || typeof window === 'undefined') return
        const card = element.closest('[data-composer-card="true"]')
        if (card === null) return
        const cardRect = card.getBoundingClientRect()
        const width = element.offsetWidth
        const height = element.offsetHeight
        const gap = 8
        const fitsLeft = cardRect.left >= width + gap + 8
        setSide(fitsLeft
          ? { left: -width - gap, top: (cardRect.height - height) / 2 }
          : { left: 0, top: -height - gap })
      }, [])

      React.useLayoutEffect(() => {
        updateSide()
      }, [updateSide])

      React.useEffect(() => {
        const element = buttonRef.current
        if (element === null) return undefined
        const card = element.closest('[data-composer-card="true"]')
        if (card === null) return undefined
        const observer = typeof ResizeObserver === 'function'
          ? new ResizeObserver(() => updateSide())
          : null
        if (observer !== null) observer.observe(card)
        window.addEventListener('resize', updateSide)
        window.addEventListener('scroll', updateSide, true)
        return () => {
          if (observer !== null) observer.disconnect()
          window.removeEventListener('resize', updateSide)
          window.removeEventListener('scroll', updateSide, true)
        }
      }, [updateSide])

      React.useEffect(() => {
        if (!open) return undefined
        window.addEventListener('resize', updateAnchor)
        window.addEventListener('scroll', updateAnchor, true)
        return () => {
          window.removeEventListener('resize', updateAnchor)
          window.removeEventListener('scroll', updateAnchor, true)
        }
      }, [open, updateAnchor])

      React.useEffect(() => {
        if (!open) return undefined
        const onPointerDown = (event) => {
          const target = event.target
          if (panelRef.current !== null && panelRef.current.contains(target)) return
          if (buttonRef.current !== null && buttonRef.current.contains(target)) return
          cancelClose()
          setOpen(false)
        }
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return
          event.stopPropagation()
          cancelClose()
          setOpen(false)
          if (buttonRef.current !== null) buttonRef.current.focus()
        }
        document.addEventListener('pointerdown', onPointerDown, true)
        document.addEventListener('keydown', onKeyDown)
        return () => {
          document.removeEventListener('pointerdown', onPointerDown, true)
          document.removeEventListener('keydown', onKeyDown)
        }
      }, [open, cancelClose])

      React.useEffect(() => {
        if (!open || openReasonRef.current !== 'click') return undefined
        const timer = window.setTimeout(() => {
          if (panelRef.current !== null) panelRef.current.focus()
        }, 0)
        return () => window.clearTimeout(timer)
      }, [open])

      React.useEffect(() => {
        if (status === null) return
        const panel = panelRef.current
        if (panel !== null) panel.scrollTop = panel.scrollHeight
      }, [status])

      React.useEffect(() => {
        if (!open || sessionId === undefined) return undefined
        let cancelled = false
        const controller = new AbortController()
        setLoading(true)
        setCatalogError('')
        setCatalog(null)
        catalogRef.current = null
        const promise = loadCatalog(ctx, sessionId, controller.signal)
          .then((value) => {
            if (cancelled) return
            const next = {
              commands: new Map(value.commands.map((item) => [item.name, item])),
              skills: new Map(value.skills.map((item) => [item.name, item])),
            }
            catalogRef.current = next
            setCatalog(next)
          })
          .catch((error) => {
            if (cancelled || error?.name === 'AbortError') return
            setCatalogError(error instanceof Error ? error.message : String(error))
          })
          .finally(() => {
            if (!cancelled) setLoading(false)
          })
        catalogPromiseRef.current = promise
        return () => {
          cancelled = true
          controller.abort()
        }
      }, [open, sessionId, ctx])

      const ensureCatalog = React.useCallback(async () => {
        if (catalogRef.current !== null) return catalogRef.current
        if (catalogPromiseRef.current !== null) {
          try { await catalogPromiseRef.current } catch (_error) {}
        }
        return catalogRef.current
      }, [])

      const runCommand = React.useCallback(async (line, name) => {
        if (busyRef.current) return
        busyRef.current = true
        setBusy(true)
        setStatus({ kind: 'info', text: t('commandRunning', { command: name }) })
        const atSession = sessionId
        try {
          const result = await ctx.remote.commands.execute(atSession, line, [])
          if (!aliveRef.current || sessionRef.current !== atSession) return
          if (!result.ok) {
            setStatus({ kind: 'error', text: t('commandError', { command: name, message: result.error.message }) })
            return
          }
          if (result.value === undefined) {
            setStatus({ kind: 'error', text: t('unknownCommand', { command: name }) })
            return
          }
          const outcome = result.value.result
          if (outcome !== undefined && outcome.kind === 'error') {
            setStatus({ kind: 'error', text: outcome.text || t('failed') })
          } else {
            setStatus({ kind: 'ok', text: outcome?.text || t('commandDone', { command: name }) })
          }
        } catch (error) {
          if (aliveRef.current && sessionRef.current === atSession) {
            setStatus({
              kind: 'error',
              text: t('commandError', {
                command: name,
                message: error instanceof Error ? error.message : String(error),
              }),
            })
          }
        } finally {
          busyRef.current = false
          if (aliveRef.current) setBusy(false)
        }
      }, [ctx, sessionId, t])

      const activateCommand = React.useCallback(async (item, rowKey) => {
        const name = normalizeName(item.command)
        if (busyRef.current || name === '') return
        const atSession = sessionId
        setStatus(null)
        if (item.confirm === true && confirmingKey !== rowKey) {
          setEditingKey(null)
          setConfirmingKey(rowKey)
          return
        }
        setConfirmingKey(null)
        const args = typeof item.args === 'string' ? item.args.trim() : ''
        if (args !== '') {
          await runCommand(`/${name} ${args}`, name)
          return
        }
        const current = await ensureCatalog()
        if (sessionRef.current !== atSession) return
        if (current === null) {
          setStatus({ kind: 'error', text: t('catalogUnavailable') })
          return
        }
        const descriptor = current.commands.get(name)
        if (descriptor === undefined) {
          setStatus({ kind: 'error', text: t('unknownCommand', { command: name }) })
          return
        }
        if (descriptor.input !== undefined && typeof descriptor.input.hint === 'string') {
          setConfirmingKey(null)
          setEditingKey(rowKey)
          setEditingHint(descriptor.input.hint)
          setDraftArg('')
          return
        }
        await runCommand(`/${name}`, name)
      }, [confirmingKey, ensureCatalog, runCommand, sessionId, t])

      const submitEditor = React.useCallback(async (item) => {
        const name = normalizeName(item.command)
        const args = draftArg.trim()
        setEditingKey(null)
        setEditingHint('')
        setDraftArg('')
        await runCommand(`/${name}${args !== '' ? ` ${args}` : ''}`, name)
      }, [draftArg, runCommand])

      const insertSkill = React.useCallback(async (item) => {
        if (busyRef.current) return
        const name = normalizeName(item.name)
        if (name === '') return
        setStatus(null)
        if (hasSkillToken(draft, name)) {
          setStatus({ kind: 'info', text: t('skillAlready', { name }) })
          return
        }
        const current = await ensureCatalog()
        if (sessionRef.current !== sessionId) return
        if (current === null) {
          setStatus({ kind: 'error', text: t('catalogUnavailable') })
          return
        }
        if (current.commands.has(name)) {
          setStatus({ kind: 'error', text: t('skillConflict', { name }) })
          return
        }
        const skill = current.skills.get(name)
        if (skill === undefined) {
          setStatus({ kind: 'error', text: t('unknownSkill', { name }) })
          return
        }
        if (skill.invocation !== undefined && skill.invocation.userInvocable === false) {
          setStatus({ kind: 'error', text: t('skillNotUserInvocable', { name }) })
          return
        }
        const actions = props.inputActions
        if (actions === undefined || typeof actions.captureInsertion !== 'function' || typeof actions.insertText !== 'function') {
          setStatus({ kind: 'error', text: t('inputUnavailable') })
          return
        }
        if (inputPhase !== 'plain' && inputPhase !== 'claimed') {
          setStatus({ kind: 'error', text: t('inputBusy') })
          return
        }
        const span = actions.captureInsertion()
        const before = span !== undefined && typeof span.start === 'number' && typeof draft === 'string'
          ? draft.slice(0, span.start)
          : ''
        const lead = before !== '' && !/\s$/.test(before) ? ' ' : ''
        if (!actions.insertText(`${lead}/${name} `, span)) {
          setStatus({ kind: 'error', text: t('skillInsertFailed') })
          return
        }
        setStatus({ kind: 'ok', text: t('skillInserted', { name }) })
      }, [draft, ensureCatalog, inputPhase, props.inputActions, sessionId, t])

      const entryLabel = typeof config.entryLabel === 'string' && config.entryLabel.trim() !== ''
        ? config.entryLabel
        : t('entryLabel')
      const panelTitle = typeof config.panelTitle === 'string' && config.panelTitle.trim() !== ''
        ? config.panelTitle
        : t('panelTitle')

      if (config.enabled === false) return null

      const panel = open && anchor !== null
        ? ReactDOM.createPortal(h('div', {
            id: panelId,
            ref: panelRef,
            className: 'dsh-cl-panel',
            role: 'dialog',
            'aria-label': panelTitle,
            tabIndex: -1,
            onPointerEnter: cancelClose,
            onPointerLeave: scheduleClose,
            style: {
              left: `${anchor.left}px`,
              ...(anchor.top !== undefined
                ? { top: `${anchor.top}px` }
                : { bottom: `${anchor.bottom}px` }),
              width: `${anchor.width}px`,
              maxHeight: `${anchor.maxHeight}px`,
            },
          }, [
            h('div', { key: 'head', className: 'dsh-cl-head' }, [
              h('span', { key: 'title' }, panelTitle),
              h('button', {
                key: 'close',
                type: 'button',
                className: 'dsh-cl-close',
                'aria-label': t('close'),
                onClick: () => {
                  cancelClose()
                  setOpen(false)
                  if (buttonRef.current !== null) buttonRef.current.focus()
                },
              }, '×'),
            ]),
            loading
              ? h('div', { key: 'loading', className: 'dsh-cl-status dsh-cl-status--muted' }, t('loading'))
              : null,
            catalogError !== ''
              ? h('div', { key: 'error', className: 'dsh-cl-status dsh-cl-status--error', role: 'alert' }, t('catalogError', { message: catalogError }))
              : null,
            commands.length > 0
              ? h('section', { key: 'commands' }, [
                  ...commands.map((item, index) => {
                    const name = normalizeName(item.command)
                    const rowKey = `${name}:${typeof item.args === 'string' ? item.args : ''}:${index}`
                    const rowId = `${panelId}-cmd-${index}`
                    return h(CommandRow, {
                      key: rowKey,
                      rowKey,
                      rowId,
                      item,
                      editing: editingKey === rowKey,
                      confirming: confirmingKey === rowKey,
                      hint: editingKey === rowKey ? editingHint : '',
                      draftArg: editingKey === rowKey ? draftArg : '',
                      setDraftArg,
                      onActivate: () => { void activateCommand(item, rowKey) },
                      onConfirm: () => { void activateCommand(item, rowKey) },
                      onCancel: () => {
                        setEditingKey(null)
                        setEditingHint('')
                        setDraftArg('')
                        setConfirmingKey(null)
                      },
                      onSubmit: () => { void submitEditor(item) },
                      busy,
                      t,
                    })
                  }),
                ])
              : null,
            skills.length > 0
              ? h('section', { key: 'skills' }, [
                  ...skills.map((item, index) => {
                    const name = normalizeName(item.name)
                    return h(SkillRow, {
                      key: `${name}:${index}`,
                      item,
                      selected: hasSkillToken(draft, name),
                      busy,
                      onClick: () => { void insertSkill(item) },
                      t,
                    })
                  }),
                ])
              : null,
            commands.length === 0 && skills.length === 0 && !loading
              ? h('div', { key: 'empty', className: 'dsh-cl-empty' }, t('empty'))
              : null,
            h('div', {
              key: 'status',
              className: `dsh-cl-status${status !== null && status.kind === 'error' ? ' dsh-cl-status--error' : ''}`,
              'aria-live': 'polite',
            }, status === null ? '' : status.text),
          ]), document.body)
        : null

      return h(React.Fragment, null, [
        h('div', {
          key: 'wrap',
          className: 'dsh-cl-dock',
          style: side !== null
            ? { left: `${side.left}px`, top: `${side.top}px` }
            : { left: '-9999px', top: '-9999px' },
        }, [
          h('button', {
            key: 'button',
            ref: buttonRef,
            type: 'button',
            className: 'dsh-cl-pill',
            title: t('openHint'),
            'aria-label': entryLabel,
            'aria-haspopup': 'dialog',
            'aria-expanded': open ? 'true' : 'false',
            'aria-controls': open ? panelId : undefined,
            onPointerEnter: openOnHover,
            onPointerLeave: scheduleClose,
            onClick: openByClick,
          }, [
            h('span', { key: 'icon', className: 'dsh-cl-icon', 'aria-hidden': 'true' }, '⌘'),
          ]),
        ]),
        panel,
      ])
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh: ZH, en: EN }), 'quick-launcher: dictionaries')
      ctx.effect(() => {
        const style = document.createElement('style')
        style.dataset.plugin = 'dsh-quick-launcher'
        style.textContent = CSS
        document.head.appendChild(style)
        return () => style.remove()
      }, 'quick-launcher: styles')

      const t = ctx.locale.bind(NS)
      ctx.slots.inject('conversation.input.overlay', () => ctx.slots.register({
        name: 'conversation.input.overlay',
        id: 'quick-launcher',
        order: 10,
        locale: NS,
        label: () => t('entryLabel'),
      }, (props) => h(Launcher, { ...props, ctx })))
      ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
        name: 'plugins.bundle.config',
        key: ENTRY_ID,
        locale: NS,
        label: () => t('configSummary'),
      }, (props) => h(ConfigPage, { ...props, ctx })))
    }

    return { inject: ['slots', 'sessions', 'remote', 'remote.commands', 'remote.skills', 'locale'], apply }
  },
})
