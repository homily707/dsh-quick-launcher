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
      prompts: 'Prompt 片段',
      skills: '技能',
      close: '关闭',
      loading: '正在加载…',
      empty: '还没有配置常用项',
      promptEmpty: 'Prompt 内容为空',
      promptInserted: '已插入 prompt：{label}',
      promptInsertFailed: 'Prompt 插入失败，请重试',
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
      save: '保存',
      saving: '保存中…',
      saved: '已保存',
      saveFailed: '保存失败，请检查配置',
      invalidJson: 'JSON 格式不正确：{message}',
      readOnly: '当前配置不可写',
      settingsNav: '命令与技能',
      settingsTitle: '命令与技能',
      settingsIntro: '编辑 Quick Launcher 的命令、Prompt 与技能；保存后立即生效，无需重装。',
      commandsSection: '命令',
      commandsHint: '按保存后的顺序显示在面板里；同一命令可以配置多条不同参数。',
      promptsSection: 'Prompt 片段',
      promptsHint: '点击后把纯文本注入输入框，不会自动发送。',
      skillsSection: '技能',
      skillsHint: '从当前会话可见且允许用户手动调用的技能里多选；顺序就是面板中的显示顺序。',
      skillCatalogSource: '技能目录来源：{source}',
      advanced: '高级 JSON（fallback）',
      advancedHint: '直接编辑 commands / prompts / skills，然后应用到列表再保存。',
      applyJson: '应用到列表',
      addCommand: '添加命令',
      addPrompt: '添加 Prompt',
      remove: '删除',
      moveUp: '上移',
      moveDown: '下移',
      commandField: '命令',
      labelField: '显示名',
      argsField: '固定参数',
      confirmField: '执行前确认',
      promptField: 'Prompt 内容',
      promptIdField: '标识（可选）',
      dirty: '有未保存的修改',
      notWritable: '当前配置只读，无法保存',
      emptyCommands: '还没有命令',
      emptyPrompts: '还没有 Prompt 片段',
      emptySkills: '还没有选择技能',
      commandRequired: '第 {index} 条命令需要填写 command',
      commandInvalid: '第 {index} 条命令不能包含换行',
      argsInvalid: '第 {index} 条命令的参数不能包含换行',
      promptRequired: '第 {index} 个 Prompt 内容不能为空',
      promptIdDuplicate: 'Prompt 标识重复：{id}',
      skillRequired: '第 {index} 个技能需要填写 name',
      skillUnavailable: '不可用：目录中已不存在',
      skillConflictShort: '与同名命令冲突',
      skillConflictSave: '技能 /{name} 与同名命令冲突；命令优先，请先移除该技能或调整命令名',
      skillConflictUnchecked: '技能目录未就绪，本次保存无法检查同名命令冲突',
      skillUserOnly: '仅用户可调用',
      skillSearchEmpty: '没有匹配的技能',
      skillBuiltin: '内置技能',
      skillSearchPlaceholder: '搜索名称或描述',
      skillCatalogLoading: '正在加载技能目录…',
      skillCatalogEmpty: '当前会话没有可用技能',
      skillCatalogError: '技能目录加载失败：{message}',
      skillNoSession: '打开一个会话后才能读取技能目录',
      skillSelect: '选择',
      skillSelected: '已选',
      skillsSelectedTitle: '已选技能',
      skillsAllTitle: '全部技能',
      retry: '重试',
      settingsLoading: '正在加载配置…',
    }

    const EN = {
      entryLabel: 'Quick Launcher',
      openHint: 'Open Quick Launcher',
      panelTitle: 'Quick Launcher',
      commands: 'Commands',
      prompts: 'Prompts',
      skills: 'Skills',
      close: 'Close',
      loading: 'Loading…',
      empty: 'No pinned items yet',
      promptEmpty: 'This prompt is empty',
      promptInserted: 'Inserted prompt: {label}',
      promptInsertFailed: 'Could not insert the prompt; try again',
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
      save: 'Save',
      saving: 'Saving…',
      saved: 'Saved',
      saveFailed: 'Save failed; check the configuration',
      invalidJson: 'Invalid JSON: {message}',
      readOnly: 'This configuration is not writable',
      settingsNav: 'Commands & Skills',
      settingsTitle: 'Commands & Skills',
      settingsIntro: 'Edit Quick Launcher commands, prompts and skills; save applies immediately without reinstalling.',
      commandsSection: 'Commands',
      commandsHint: 'Shown in saved order. The same command may appear multiple times with different arguments.',
      promptsSection: 'Prompt snippets',
      promptsHint: 'Clicking inserts plain text at the caret without sending the message.',
      skillsSection: 'Skills',
      skillsHint: 'Pick from skills visible to the current session that allow manual invocation; the order is the panel order.',
      skillCatalogSource: 'Skill catalog source: {source}',
      advanced: 'Advanced JSON (fallback)',
      advancedHint: 'Edit commands / prompts / skills directly, then apply to the lists before saving.',
      applyJson: 'Apply to lists',
      addCommand: 'Add command',
      addPrompt: 'Add prompt',
      remove: 'Remove',
      moveUp: 'Move up',
      moveDown: 'Move down',
      commandField: 'Command',
      labelField: 'Label',
      argsField: 'Fixed arguments',
      confirmField: 'Confirm before running',
      promptField: 'Prompt text',
      promptIdField: 'ID (optional)',
      dirty: 'Unsaved changes',
      notWritable: 'This configuration is read-only',
      emptyCommands: 'No commands yet',
      emptyPrompts: 'No prompt snippets yet',
      emptySkills: 'No skills selected',
      commandRequired: 'Command #{index} needs a command name',
      commandInvalid: 'Command #{index} must not contain a newline',
      argsInvalid: 'Arguments for command #{index} must not contain a newline',
      promptRequired: 'Prompt #{index} cannot be empty',
      promptIdDuplicate: 'Duplicate prompt ID: {id}',
      skillRequired: 'Skill #{index} needs a name',
      skillUnavailable: 'Unavailable: not in the catalog',
      skillConflictShort: 'Collides with a command',
      skillConflictSave: 'Skill /{name} collides with a command; the command wins. Remove the skill or rename the command first.',
      skillConflictUnchecked: 'The skill catalog is not ready, so this save cannot check for command-name conflicts.',
      skillUserOnly: 'User-invocable only',
      skillSearchEmpty: 'No matching skills',
      skillBuiltin: 'Built-in skill',
      skillSearchPlaceholder: 'Search name or description',
      skillCatalogLoading: 'Loading skill catalog…',
      skillCatalogEmpty: 'No usable skills in the current session',
      skillCatalogError: 'Could not load the skill catalog: {message}',
      skillNoSession: 'Open a session to load the skill catalog',
      skillSelect: 'Select',
      skillSelected: 'Selected',
      skillsSelectedTitle: 'Selected skills',
      skillsAllTitle: 'All skills',
      retry: 'Retry',
      settingsLoading: 'Loading configuration…',
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
.dsh-cl-config-hint {
  margin: 0; color: var(--dsw-alias-label-secondary);
  font-size: 12px; line-height: 1.5;
}
.dsh-cl-status--error { color: var(--dsw-alias-state-error-primary); }
.dsh-cl-status--muted { color: var(--dsw-alias-label-secondary); }
.dsh-cl-empty { padding: 8px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
.dsh-cl-settings { display: grid; gap: 18px; max-width: 760px; padding: 4px 2px 28px; }
.dsh-cl-settings-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.dsh-cl-settings-title { margin: 0 0 4px; font-size: 15px; font-weight: 500; color: var(--dsw-alias-label-primary); }
.dsh-cl-settings-intro { margin: 0; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.5; }
.dsh-cl-section { display: grid; gap: 8px; }
.dsh-cl-section-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.dsh-cl-section-title { margin: 0; font-size: 13px; font-weight: 500; color: var(--dsw-alias-label-primary); }
.dsh-cl-section-hint { margin: 0; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.45; }
.dsh-cl-editor { border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 0 10px; }
.dsh-cl-editor-row { display: grid; gap: 8px; padding: 10px 0; border-top: 1px solid var(--dsw-alias-border-l1); }
.dsh-cl-editor-row:first-child { border-top: 0; }
.dsh-cl-row-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.dsh-cl-row-index { color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dsh-cl-mini-actions { display: flex; align-items: center; gap: 4px; }
.dsh-cl-btn--mini { height: 22px; padding: 0 7px; font-size: 10px; line-height: 20px; }
.dsh-cl-fields { display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px; }
.dsh-cl-field { display: grid; gap: 4px; min-width: 0; }
.dsh-cl-field-label { color: var(--dsw-alias-label-secondary); font-size: 10px; }
.dsh-cl-field .dsh-cl-input { height: 30px; font-size: 12px; }
.dsh-cl-textarea {
  width: 100%; min-width: 0; min-height: 64px; box-sizing: border-box; resize: vertical;
  padding: 7px 8px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 12px; line-height: 1.45; outline: none;
}
.dsh-cl-textarea::placeholder { color: var(--dsw-alias-label-secondary); }
.dsh-cl-check { display: flex; align-items: center; gap: 6px; color: var(--dsw-alias-label-primary); font-size: 11px; }
.dsh-cl-check input { width: 14px; height: 14px; margin: 0; accent-color: var(--dsw-alias-brand-primary); }
.dsh-cl-skill-list { border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; }
.dsh-cl-skill-row {
  display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; align-items: center;
  width: 100%; box-sizing: border-box; padding: 8px 10px; border: 0; border-top: 1px solid var(--dsw-alias-border-l1);
  background: transparent; color: var(--dsw-alias-label-primary); font: inherit; text-align: left; cursor: pointer;
}
.dsh-cl-skill-row:first-child { border-top: 0; border-radius: 7px 7px 0 0; }
.dsh-cl-skill-row:last-child { border-radius: 0 0 7px 7px; }
.dsh-cl-skill-row:only-child { border-radius: 7px; }
.dsh-cl-skill-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent); }
.dsh-cl-skill-row--selected { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent); }
.dsh-cl-skill-row--disabled { opacity: .55; cursor: default; }
.dsh-cl-skill-main { min-width: 0; display: grid; gap: 2px; }
.dsh-cl-skill-name { font-size: 12px; font-weight: 500; overflow-wrap: anywhere; }
.dsh-cl-skill-desc { color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.35; overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.dsh-cl-skill-meta { color: var(--dsw-alias-label-secondary); font-size: 10px; overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.dsh-cl-skill-badge { flex: none; color: var(--dsw-alias-label-secondary); font-size: 10px; white-space: nowrap; }
.dsh-cl-picker-tools { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.dsh-cl-picker-tools .dsh-cl-input { flex: 1; min-width: 140px; }
.dsh-cl-selected-row {
  display: grid; grid-template-columns: 1.2rem minmax(0, 1fr) auto; gap: 8px; align-items: center;
  padding: 8px 10px; border-top: 1px solid var(--dsw-alias-border-l1);
}
.dsh-cl-selected-row:first-child { border-top: 0; }
.dsh-cl-selected-order { color: var(--dsw-alias-label-secondary); font-size: 10px; text-align: right; font-variant-numeric: tabular-nums; }
.dsh-cl-selected-main { display: grid; gap: 4px; min-width: 0; }
.dsh-cl-selected-name { font-size: 12px; font-weight: 500; overflow-wrap: anywhere; }
.dsh-cl-empty-inline { padding: 12px 10px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
.dsh-cl-settings-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.dsh-cl-settings-status { min-height: 16px; margin: 0; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.4; }
.dsh-cl-settings-status--error { color: var(--dsw-alias-state-error-primary); }
.dsh-cl-settings-status--warn { color: var(--dsw-alias-state-warn-primary); }
.dsh-cl-advanced { border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 8px 10px; }
.dsh-cl-advanced summary { cursor: pointer; color: var(--dsw-alias-label-primary); font-size: 12px; font-weight: 500; }
.dsh-cl-advanced[open] summary { margin-bottom: 8px; }
.dsh-cl-advanced .dsh-cl-textarea { min-height: 180px; font-family: var(--dsw-font-mono, ui-monospace, monospace); font-size: 11px; }
.dsh-cl-settings :is(input, textarea, button, summary):focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px;
}
@media (min-width: 560px) {
  .dsh-cl-fields--command { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1fr); }
  .dsh-cl-fields--command .dsh-cl-check { grid-column: 1 / -1; }
}
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
      prompts: [],
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

    function asText(value) {
      return typeof value === 'string' ? value : ''
    }

    function toCommandDraft(item) {
      return {
        command: asText(item?.command),
        label: asText(item?.label),
        args: asText(item?.args),
        confirm: item?.confirm === true,
      }
    }

    function toPromptDraft(item, index) {
      return {
        id: asText(item?.id) || `prompt-${index + 1}`,
        label: asText(item?.label),
        prompt: asText(item?.prompt),
      }
    }

    function toSkillDraft(item) {
      return { name: asText(item?.name), label: asText(item?.label) }
    }

    function moveItem(list, index, delta) {
      const target = index + delta
      if (target < 0 || target >= list.length) return list
      const next = list.slice()
      const [item] = next.splice(index, 1)
      next.splice(target, 0, item)
      return next
    }

    function newPromptId() {
      return `prompt-${Date.now().toString(36)}`
    }

    function selectCatalogSession(state) {
      const ids = state !== undefined && Array.isArray(state.ids) ? state.ids : []
      const rows = ids
        .map((id) => (state.byId !== undefined ? state.byId[id] : undefined))
        .filter((row) => row !== undefined && row.origin !== 'subagent')
      const main = rows.find((row) => row.retainedBy !== undefined && row.retainedBy.mainView > 0)
      return (main ?? rows[0])?.id
    }

    function SettingsConfigPage(props) {
      const { ctx } = props
      const t = useLocale(ctx)
      const { form, snapshot } = useConfigForm(ctx)
      const [commands, setCommands] = React.useState([])
      const [prompts, setPrompts] = React.useState([])
      const [skills, setSkills] = React.useState([])
      const [loaded, setLoaded] = React.useState(false)
      const [dirty, setDirty] = React.useState(false)
      const [busy, setBusy] = React.useState(false)
      const [status, setStatus] = React.useState(null)
      const [skillQuery, setSkillQuery] = React.useState('')
      const [skillState, setSkillState] = React.useState({ status: 'idle', sessionId: undefined, skills: [], commands: new Set(), error: '' })
      const [jsonText, setJsonText] = React.useState('')
      const [jsonError, setJsonError] = React.useState('')
      const value = snapshot !== undefined && snapshot !== null && typeof snapshot.value === 'object' && snapshot.value !== null
        ? snapshot.value
        : undefined

      React.useEffect(() => {
        if (loaded || value === undefined) return
        setCommands(Array.isArray(value.commands) ? value.commands.map(toCommandDraft) : [])
        setPrompts(Array.isArray(value.prompts) ? value.prompts.map(toPromptDraft) : [])
        setSkills(Array.isArray(value.skills) ? value.skills.map(toSkillDraft) : [])
        setLoaded(true)
      }, [loaded, value])

      const useSessionsHook = typeof props.useSessions === 'function' ? props.useSessions : () => undefined
      const sessionId = useSessionsHook(selectCatalogSession)
      const sessionTitle = useSessionsHook((state) => (
        sessionId === undefined || state === undefined || state.byId === undefined
          ? ''
          : (state.byId[sessionId]?.displayTitle || '')
      ))
      const sessionCwd = useSessionsHook((state) => (
        sessionId === undefined || state === undefined || state.byId === undefined
          ? ''
          : (state.byId[sessionId]?.cwd || '')
      ))
      const skillRequestRef = React.useRef(0)

      const loadSkillCatalog = React.useCallback(async () => {
        const requestId = ++skillRequestRef.current
        if (sessionId === undefined) {
          setSkillState({ status: 'nosession', sessionId: undefined, skills: [], commands: new Set(), error: '' })
          return
        }
        setSkillState({ status: 'loading', sessionId, skills: [], commands: new Set(), error: '' })
        try {
          const [commandsResult, skillsResult] = await Promise.all([
            ctx.remote.commands.list(sessionId),
            ctx.remote.skills.list({ sessionId }),
          ])
          if (skillRequestRef.current !== requestId) return
          if (!commandsResult.ok) {
            throw new Error(`${commandsResult.error.code}: ${commandsResult.error.message}`)
          }
          if (!skillsResult.ok) {
            throw new Error(`${skillsResult.error.code}: ${skillsResult.error.message}`)
          }
          setSkillState({
            status: 'ready',
            sessionId,
            skills: Array.isArray(skillsResult.value?.skills) ? skillsResult.value.skills : [],
            commands: new Set((Array.isArray(commandsResult.value) ? commandsResult.value : []).map((item) => item.name)),
            error: '',
          })
        } catch (error) {
          if (skillRequestRef.current !== requestId) return
          setSkillState({
            status: 'error',
            sessionId,
            skills: [],
            commands: new Set(),
            error: error instanceof Error ? error.message : String(error),
          })
        }
      }, [ctx, sessionId])

      React.useEffect(() => {
        void loadSkillCatalog()
      }, [loadSkillCatalog])

      const touch = () => {
        setDirty(true)
        setStatus(null)
      }
      const updateCommand = (index, patch) => {
        setCommands((previous) => previous.map((item, position) => (position === index ? { ...item, ...patch } : item)))
        touch()
      }
      const updatePrompt = (index, patch) => {
        setPrompts((previous) => previous.map((item, position) => (position === index ? { ...item, ...patch } : item)))
        touch()
      }
      const updateSkill = (index, patch) => {
        setSkills((previous) => previous.map((item, position) => (position === index ? { ...item, ...patch } : item)))
        touch()
      }

      if (snapshot === undefined || snapshot === null || snapshot.status === 'loading') {
        return h('p', { className: 'dsh-cl-config-hint' }, t('settingsLoading'))
      }
      if (value === undefined) return h('p', { className: 'dsh-cl-config-hint' }, t('readOnly'))

      const writable = snapshot.writable !== false
      const disabled = busy || !writable
      const catalogReady = skillState.status === 'ready' && skillState.sessionId === sessionId
      const saveDisabled = disabled || skillState.status === 'loading' || skillState.status === 'idle' || (skillState.status === 'ready' && !catalogReady)
      const skillNames = new Set(catalogReady ? skillState.skills.map((item) => item.name) : [])
      const commandNames = catalogReady ? skillState.commands : new Set()
      const selectedNames = new Set(skills.map((item) => normalizeName(item.name)))
      const query = skillQuery.trim().toLowerCase()
      const filteredSkills = skillState.skills.filter((item) => {
        if (query === '') return true
        return `${item.name} ${item.description || ''} ${item.path || ''}`.toLowerCase().includes(query)
      })

      const buildDraft = () => {
        const nextCommands = []
        for (let index = 0; index < commands.length; index += 1) {
          const item = commands[index]
          const name = asText(item.command).trim()
          const args = asText(item.args).trim()
          if (name === '') return { error: t('commandRequired', { index: index + 1 }) }
          if (/[\r\n]/.test(name)) return { error: t('commandInvalid', { index: index + 1 }) }
          if (/[\r\n]/.test(args)) return { error: t('argsInvalid', { index: index + 1 }) }
          nextCommands.push({ command: name, label: asText(item.label).trim(), args, confirm: item.confirm === true })
        }
        const promptIds = new Set()
        const nextPrompts = []
        for (let index = 0; index < prompts.length; index += 1) {
          const item = prompts[index]
          const prompt = asText(item.prompt)
          if (prompt.trim() === '') return { error: t('promptRequired', { index: index + 1 }) }
          const id = asText(item.id).trim() || `prompt-${index + 1}`
          if (promptIds.has(id)) return { error: t('promptIdDuplicate', { id }) }
          promptIds.add(id)
          nextPrompts.push({ id, label: asText(item.label).trim(), prompt })
        }
        const seenSkills = new Set()
        const nextSkills = []
        for (let index = 0; index < skills.length; index += 1) {
          const item = skills[index]
          const name = normalizeName(item.name)
          if (name === '') return { error: t('skillRequired', { index: index + 1 }) }
          if (seenSkills.has(name)) continue
          seenSkills.add(name)
          nextSkills.push({ name, label: asText(item.label).trim() })
        }
        const commandSet = new Set(nextCommands.map((item) => item.command))
        const conflict = nextSkills.find((item) => commandSet.has(item.name))
        if (conflict !== undefined) return { error: t('skillConflictSave', { name: conflict.name }) }
        return { commands: nextCommands, prompts: nextPrompts, skills: nextSkills }
      }

      const save = async () => {
        if (busy || !writable || form === undefined) return
        const next = buildDraft()
        if (next.error !== undefined) {
          setStatus({ kind: 'error', text: next.error })
          return
        }
        setBusy(true)
        setStatus(null)
        try {
          const ok = await form.mutate([
            { op: 'set', path: ['commands'], value: next.commands },
            { op: 'set', path: ['prompts'], value: next.prompts },
            { op: 'set', path: ['skills'], value: next.skills },
          ])
          if (!ok) {
            setStatus({ kind: 'error', text: t('saveFailed') })
            return
          }
          setCommands(next.commands)
          setPrompts(next.prompts)
          setSkills(next.skills)
          setDirty(false)
          setStatus({ kind: 'ok', text: t('saved') })
        } catch (_error) {
          setStatus({ kind: 'error', text: t('saveFailed') })
        } finally {
          setBusy(false)
        }
      }

      const toggleSkill = (skill) => {
        const name = normalizeName(skill.name)
        setSkills((previous) => {
          const exists = previous.some((item) => normalizeName(item.name) === name)
          return exists
            ? previous.filter((item) => normalizeName(item.name) !== name)
            : [...previous, { name, label: '' }]
        })
        touch()
      }

      const applyJson = () => {
        try {
          const parsed = JSON.parse(jsonText)
          if (!Array.isArray(parsed?.commands) || !Array.isArray(parsed?.prompts) || !Array.isArray(parsed?.skills)) {
            setJsonError(t('invalidJson', { message: 'commands, prompts and skills must be arrays' }))
            return
          }
          setCommands(parsed.commands.map(toCommandDraft))
          setPrompts(parsed.prompts.map(toPromptDraft))
          setSkills(parsed.skills.map(toSkillDraft))
          setJsonError('')
          touch()
        } catch (error) {
          setJsonError(t('invalidJson', { message: error instanceof Error ? error.message : String(error) }))
        }
      }

      const renderField = (key, label, input) => h('label', { key, className: 'dsh-cl-field' }, [
        h('span', { key: 'label', className: 'dsh-cl-field-label' }, label),
        input,
      ])

      const commandRows = commands.length === 0
        ? h('div', { key: 'empty', className: 'dsh-cl-empty-inline' }, t('emptyCommands'))
        : h('div', { key: 'rows', className: 'dsh-cl-editor' }, commands.map((item, index) => h('div', {
            key: `command-${index}`,
            className: 'dsh-cl-editor-row',
          }, [
            h('div', { key: 'head', className: 'dsh-cl-row-head' }, [
              h('span', { key: 'index', className: 'dsh-cl-row-index' }, `#${index + 1}`),
              h('div', { key: 'actions', className: 'dsh-cl-mini-actions' }, [
                h('button', {
                  key: 'up', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled: disabled || index === 0,
                  'aria-label': `${t('moveUp')} ${index + 1}`,
                  onClick: () => { setCommands((previous) => moveItem(previous, index, -1)); touch() },
                }, '↑'),
                h('button', {
                  key: 'down', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled: disabled || index === commands.length - 1,
                  'aria-label': `${t('moveDown')} ${index + 1}`,
                  onClick: () => { setCommands((previous) => moveItem(previous, index, 1)); touch() },
                }, '↓'),
                h('button', {
                  key: 'remove', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled,
                  onClick: () => { setCommands((previous) => previous.filter((_, position) => position !== index)); touch() },
                }, t('remove')),
              ]),
            ]),
            h('div', { key: 'fields', className: 'dsh-cl-fields dsh-cl-fields--command' }, [
              renderField('command', t('commandField'), h('input', {
                className: 'dsh-cl-input', value: item.command, disabled,
                onChange: (event) => updateCommand(index, { command: event.currentTarget.value }),
              })),
              renderField('label', t('labelField'), h('input', {
                className: 'dsh-cl-input', value: item.label, disabled,
                onChange: (event) => updateCommand(index, { label: event.currentTarget.value }),
              })),
              renderField('args', t('argsField'), h('input', {
                className: 'dsh-cl-input', value: item.args, disabled,
                onChange: (event) => updateCommand(index, { args: event.currentTarget.value }),
              })),
              h('label', { key: 'confirm', className: 'dsh-cl-check' }, [
                h('input', {
                  key: 'box', type: 'checkbox', checked: item.confirm === true, disabled,
                  onChange: (event) => updateCommand(index, { confirm: event.currentTarget.checked }),
                }),
                h('span', { key: 'text' }, t('confirmField')),
              ]),
            ]),
          ])))

      const promptRows = prompts.length === 0
        ? h('div', { key: 'empty', className: 'dsh-cl-empty-inline' }, t('emptyPrompts'))
        : h('div', { key: 'rows', className: 'dsh-cl-editor' }, prompts.map((item, index) => h('div', {
            key: `prompt-${item.id}-${index}`,
            className: 'dsh-cl-editor-row',
          }, [
            h('div', { key: 'head', className: 'dsh-cl-row-head' }, [
              h('span', { key: 'index', className: 'dsh-cl-row-index' }, `#${index + 1}`),
              h('div', { key: 'actions', className: 'dsh-cl-mini-actions' }, [
                h('button', {
                  key: 'up', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled: disabled || index === 0,
                  'aria-label': `${t('moveUp')} ${index + 1}`,
                  onClick: () => { setPrompts((previous) => moveItem(previous, index, -1)); touch() },
                }, '↑'),
                h('button', {
                  key: 'down', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled: disabled || index === prompts.length - 1,
                  'aria-label': `${t('moveDown')} ${index + 1}`,
                  onClick: () => { setPrompts((previous) => moveItem(previous, index, 1)); touch() },
                }, '↓'),
                h('button', {
                  key: 'remove', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled,
                  onClick: () => { setPrompts((previous) => previous.filter((_, position) => position !== index)); touch() },
                }, t('remove')),
              ]),
            ]),
            h('div', { key: 'fields', className: 'dsh-cl-fields' }, [
              h('div', { key: 'meta', className: 'dsh-cl-fields dsh-cl-fields--command' }, [
                renderField('label', t('labelField'), h('input', {
                  className: 'dsh-cl-input', value: item.label, disabled,
                  onChange: (event) => updatePrompt(index, { label: event.currentTarget.value }),
                })),
                renderField('id', t('promptIdField'), h('input', {
                  className: 'dsh-cl-input', value: item.id, disabled,
                  onChange: (event) => updatePrompt(index, { id: event.currentTarget.value }),
                })),
              ]),
              renderField('prompt', t('promptField'), h('textarea', {
                className: 'dsh-cl-textarea', value: item.prompt, disabled,
                onChange: (event) => updatePrompt(index, { prompt: event.currentTarget.value }),
              })),
            ]),
          ])))

      const selectedSkillRows = skills.length === 0
        ? h('div', { key: 'empty', className: 'dsh-cl-empty-inline' }, t('emptySkills'))
        : h('div', { key: 'rows', className: 'dsh-cl-skill-list' }, skills.map((item, index) => {
            const name = normalizeName(item.name)
            const unavailable = skillState.status === 'ready' && skillState.sessionId === sessionId && !skillNames.has(name)
            return h('div', { key: `${name}:${index}`, className: 'dsh-cl-selected-row' }, [
              h('span', { key: 'order', className: 'dsh-cl-selected-order' }, String(index + 1)),
              h('div', { key: 'main', className: 'dsh-cl-selected-main' }, [
                h('span', { key: 'name', className: 'dsh-cl-selected-name' }, `/${name}`),
                unavailable ? h('span', { key: 'unavailable', className: 'dsh-cl-skill-meta' }, t('skillUnavailable')) : null,
                h('input', {
                  key: 'label', className: 'dsh-cl-input', value: item.label, disabled,
                  placeholder: t('labelField'),
                  'aria-label': `${t('labelField')} ${name}`,
                  onChange: (event) => updateSkill(index, { label: event.currentTarget.value }),
                }),
              ]),
              h('div', { key: 'actions', className: 'dsh-cl-mini-actions' }, [
                h('button', {
                  key: 'up', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled: disabled || index === 0,
                  'aria-label': `${t('moveUp')} ${name}`,
                  onClick: () => { setSkills((previous) => moveItem(previous, index, -1)); touch() },
                }, '↑'),
                h('button', {
                  key: 'down', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled: disabled || index === skills.length - 1,
                  'aria-label': `${t('moveDown')} ${name}`,
                  onClick: () => { setSkills((previous) => moveItem(previous, index, 1)); touch() },
                }, '↓'),
                h('button', {
                  key: 'remove', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--mini',
                  disabled,
                  onClick: () => { setSkills((previous) => previous.filter((_, position) => position !== index)); touch() },
                }, t('remove')),
              ]),
            ])
          }))

      const catalogStatus = skillState.status === 'nosession'
        ? h('div', { key: 'nosession', className: 'dsh-cl-empty-inline' }, t('skillNoSession'))
        : skillState.status === 'loading' || skillState.status === 'idle' || (skillState.status === 'ready' && !catalogReady)
          ? h('div', { key: 'loading', className: 'dsh-cl-empty-inline' }, t('skillCatalogLoading'))
          : skillState.status === 'error'
            ? h('div', { key: 'error', className: 'dsh-cl-editor' }, [
                h('div', { key: 'text', className: 'dsh-cl-empty-inline' }, t('skillCatalogError', { message: skillState.error })),
                h('div', { key: 'retry', className: 'dsh-cl-editor-row' }, [
                  h('button', { key: 'button', type: 'button', className: 'dsh-cl-btn', onClick: () => { void loadSkillCatalog() } }, t('retry')),
                ]),
              ])
            : null

      const skillPicker = catalogReady
        ? h('div', { key: 'picker', className: 'dsh-cl-skill-list' }, filteredSkills.length === 0
            ? [h('div', { key: 'empty', className: 'dsh-cl-empty-inline' }, skillState.skills.length === 0 ? t('skillCatalogEmpty') : t('skillSearchEmpty'))]
            : filteredSkills.map((item) => {
                const selected = selectedNames.has(item.name)
                const conflict = commandNames.has(item.name) && !selected
                const rowDisabled = disabled || conflict
                return h('button', {
                  key: item.name,
                  type: 'button',
                  className: `dsh-cl-skill-row${selected ? ' dsh-cl-skill-row--selected' : ''}${rowDisabled ? ' dsh-cl-skill-row--disabled' : ''}`,
                  'aria-pressed': selected,
                  disabled: rowDisabled,
                  onClick: () => { toggleSkill(item) },
                }, [
                  h('span', { key: 'main', className: 'dsh-cl-skill-main' }, [
                    h('span', { key: 'name', className: 'dsh-cl-skill-name' }, item.name),
                    h('span', { key: 'desc', className: 'dsh-cl-skill-desc' }, item.description || ''),
                    h('span', { key: 'meta', className: 'dsh-cl-skill-meta' }, [
                      conflict ? `${t('skillConflictShort')} · ` : '',
                      item.modelInvocable === false ? `${t('skillUserOnly')} · ` : '',
                      item.path !== undefined ? item.path : t('skillBuiltin'),
                    ].filter(Boolean).join('')),
                  ]),
                  h('span', { key: 'badge', className: 'dsh-cl-skill-badge' }, selected ? t('skillSelected') : t('skillSelect')),
                ])
              }))
        : null

      const skillSearch = catalogReady
        ? h('div', { key: 'search', className: 'dsh-cl-picker-tools' }, [
            h('input', {
              key: 'input', className: 'dsh-cl-input', value: skillQuery, disabled,
              placeholder: t('skillSearchPlaceholder'), 'aria-label': t('skillSearchPlaceholder'),
              onChange: (event) => setSkillQuery(event.currentTarget.value),
            }),
          ])
        : null

      return h('div', { className: 'dsh-cl-settings' }, [
        h('div', { key: 'head', className: 'dsh-cl-settings-head' }, [
          h('div', { key: 'text' }, [
            h('h2', { key: 'title', className: 'dsh-cl-settings-title' }, t('settingsTitle')),
            h('p', { key: 'intro', className: 'dsh-cl-settings-intro' }, t('settingsIntro')),
          ]),
          h('div', { key: 'actions', className: 'dsh-cl-settings-actions' }, [
            dirty ? h('span', { key: 'dirty', className: 'dsh-cl-settings-status dsh-cl-settings-status--warn' }, t('dirty')) : null,
            h('button', {
              key: 'save', type: 'button', className: 'dsh-cl-btn dsh-cl-btn--primary',
              disabled: saveDisabled || !dirty, onClick: () => { void save() },
            }, busy ? t('saving') : t('save')),
          ]),
        ]),
        !writable ? h('p', { key: 'readonly', className: 'dsh-cl-settings-status dsh-cl-settings-status--warn' }, t('notWritable')) : null,
        h('section', { key: 'commands', className: 'dsh-cl-section' }, [
          h('div', { key: 'head', className: 'dsh-cl-section-head' }, [
            h('h3', { key: 'title', className: 'dsh-cl-section-title' }, t('commandsSection')),
            h('button', {
              key: 'add', type: 'button', className: 'dsh-cl-btn',
              disabled, onClick: () => { setCommands((previous) => [...previous, { command: '', label: '', args: '', confirm: false }]); touch() },
            }, t('addCommand')),
          ]),
          h('p', { key: 'hint', className: 'dsh-cl-section-hint' }, t('commandsHint')),
          commandRows,
        ]),
        h('section', { key: 'prompts', className: 'dsh-cl-section' }, [
          h('div', { key: 'head', className: 'dsh-cl-section-head' }, [
            h('h3', { key: 'title', className: 'dsh-cl-section-title' }, t('promptsSection')),
            h('button', {
              key: 'add', type: 'button', className: 'dsh-cl-btn',
              disabled, onClick: () => { setPrompts((previous) => [...previous, { id: newPromptId(), label: '', prompt: '' }]); touch() },
            }, t('addPrompt')),
          ]),
          h('p', { key: 'hint', className: 'dsh-cl-section-hint' }, t('promptsHint')),
          promptRows,
        ]),
        h('section', { key: 'skills', className: 'dsh-cl-section' }, [
          h('div', { key: 'head', className: 'dsh-cl-section-head' }, [
            h('h3', { key: 'title', className: 'dsh-cl-section-title' }, t('skillsSection')),
          ]),
          h('p', { key: 'hint', className: 'dsh-cl-section-hint' }, t('skillsHint')),
          sessionId !== undefined
            ? h('p', { key: 'source', className: 'dsh-cl-skill-meta' }, t('skillCatalogSource', {
                source: `${sessionTitle || sessionId}${sessionCwd !== '' ? ` — ${sessionCwd}` : ''}`,
              }))
            : null,
          skills.length > 0 && !catalogReady && (skillState.status === 'error' || skillState.status === 'nosession')
            ? h('p', { key: 'conflictUnchecked', className: 'dsh-cl-settings-status dsh-cl-settings-status--warn' }, t('skillConflictUnchecked'))
            : null,
          h('h4', { key: 'selectedTitle', className: 'dsh-cl-section-title' }, t('skillsSelectedTitle')),
          selectedSkillRows,
          h('h4', { key: 'allTitle', className: 'dsh-cl-section-title' }, t('skillsAllTitle')),
          skillSearch,
          catalogStatus,
          skillPicker,
        ]),
        h('details', {
          key: 'advanced',
          className: 'dsh-cl-advanced',
          onToggle: (event) => {
            if (!event.currentTarget.open) return
            setJsonText(JSON.stringify({ commands, prompts, skills }, null, 2))
            setJsonError('')
          },
        }, [
          h('summary', { key: 'summary' }, t('advanced')),
          h('p', { key: 'hint', className: 'dsh-cl-section-hint' }, t('advancedHint')),
          h('textarea', {
            key: 'json', className: 'dsh-cl-textarea', value: jsonText, spellCheck: false, disabled,
            'aria-label': t('advanced'),
            onChange: (event) => setJsonText(event.currentTarget.value),
          }),
          h('div', { key: 'actions', className: 'dsh-cl-settings-actions' }, [
            h('button', { key: 'apply', type: 'button', className: 'dsh-cl-btn', disabled, onClick: applyJson }, t('applyJson')),
          ]),
          jsonError !== '' ? h('p', { key: 'jsonError', className: 'dsh-cl-settings-status dsh-cl-settings-status--error' }, jsonError) : null,
        ]),
        h('p', {
          key: 'status',
          className: `dsh-cl-settings-status${status?.kind === 'error' ? ' dsh-cl-settings-status--error' : ''}`,
          role: 'status',
          'aria-live': 'polite',
        }, status?.text || ''),
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

    function PromptRow(props) {
      const { item, busy, onClick } = props
      const text = typeof item.prompt === 'string' ? item.prompt : ''
      const label = typeof item.label === 'string' && item.label.trim() !== '' ? item.label.trim() : text
      return h('button', {
        type: 'button',
        className: 'dsh-cl-row',
        onClick,
        disabled: busy,
        title: text,
      }, [
        h('span', { key: 'title', className: 'dsh-cl-row-title' }, label),
        h('span', { key: 'detail', className: 'dsh-cl-row-detail' }, text.replace(/\s+/g, ' ').trim()),
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
      const prompts = React.useMemo(
        () => (Array.isArray(config.prompts) ? config.prompts : [])
          .filter((item) => item !== null && typeof item === 'object'
            && typeof item.prompt === 'string' && item.prompt.trim() !== ''),
        [config.prompts],
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

      const insertPrompt = React.useCallback(async (item) => {
        if (busyRef.current) return
        const text = typeof item.prompt === 'string' ? item.prompt : ''
        if (text.trim() === '') {
          setStatus({ kind: 'error', text: t('promptEmpty') })
          return
        }
        setStatus(null)
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
        if (!actions.insertText(`${lead}${text}`, span)) {
          setStatus({ kind: 'error', text: t('promptInsertFailed') })
          return
        }
        const label = typeof item.label === 'string' && item.label.trim() !== ''
          ? item.label.trim()
          : text.replace(/\s+/g, ' ').trim().slice(0, 32)
        setStatus({ kind: 'ok', text: t('promptInserted', { label }) })
      }, [draft, inputPhase, props.inputActions, t])

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
            prompts.length > 0
              ? h('section', { key: 'prompts', 'aria-label': t('prompts') }, [
                  ...prompts.map((item, index) => {
                    const promptId = typeof item.id === 'string' && item.id.trim() !== '' ? item.id.trim() : `prompt-${index}`
                    return h(PromptRow, {
                      key: `${promptId}:${index}`,
                      item,
                      busy,
                      onClick: () => { void insertPrompt(item) },
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
            commands.length === 0 && prompts.length === 0 && skills.length === 0 && !loading
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
      ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: 'command-launcher',
        order: 14,
        locale: NS,
        label: () => t('settingsNav'),
      }, (props) => h(SettingsConfigPage, { ...props, ctx })))
    }

    return { inject: ['slots', 'sessions', 'remote', 'remote.commands', 'remote.skills', 'locale', 'configForms'], apply }
  },
})
