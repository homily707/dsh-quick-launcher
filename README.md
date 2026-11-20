# Quick Launcher

Package: `@homily/dsh-quick-launcher`.

A quick launcher for commands, prompt snippets and skills, pinned to the left gutter of the DSH composer card.

## What it does

- Reads a volatile plugin `Config` with ordered `commands` and `skills` lists, plus a `promptDir` directory path.
- Shows one compact square `⌘` button in `conversation.input.overlay`, absolutely positioned in the composer card's left gutter (never inside the tool row).
- Opens a portal panel on hover (and click/keyboard) with the configured rows; moving away closes it.
- Commands execute through the Host command registry (`ctx.remote.commands.execute`).
- Commands with no `args` open an inline argument field using the command's own `input.hint`.
- Prompt snippets are bound to local files: every `*.md` file inside the prompt directory is one preset, but only the files listed in the `prompts` config appear in the launcher (default empty — none shown). Clicking a prompt reads the file fresh and inserts its text at the current caret through `inputActions.captureInsertion()` / `inputActions.insertText(text, span)`; prompts never send the message and never rewrite the existing draft or reference chips.
- Skills are inserted into the composer as `/skill-name` tokens; the Host's `dsh-tool-skill` pre-step loads them.
- The Host half exposes a `quickLauncher` Remote namespace (`list` / `readFile` / `writeFile` / `removeFile`) over the prompt directory, mounted client-side through a hand-written Typert contribution; names are restricted to single path segments inside the directory, so the Web client can never touch files outside it.

## Configuration

Open **Settings → 命令与技能** (Settings → Commands & Skills). The page is registered through the plugin's `settings.section`; changes are saved to the volatile plugin config and apply to the launcher immediately, without reinstalling or editing the profile.

- **Commands** — edit `command`, `label`, `args` and `confirm`, add/remove/reorder rows. `args` omitted or empty means "let the user fill the command's input"; a non-empty value executes immediately.
- **Prompt snippets** — bound to a local directory (`promptDir`, absolute path, `~` supported; empty uses `<profile>/data/quick-launcher/prompts`). The page lists every `*.md` file with a native directory picker, per-file edit (loading the file and saving straight back to it), delete with confirmation, and a create-file row. Click **选择 / 已选** on a file to add or remove it from the launcher panel — like skills, only selected snippets appear (nothing shows until you select). Editing and saving always modify the source file directly; the panel inserts the file's current content.
- **Skills** — search the user-invocable skill catalog visible to the current session, click to select or deselect, and reorder the selected list. A skill that is not in the catalog is shown as unavailable and can be removed. A skill that collides with a Host command is marked as a conflict; the command wins, so saving is blocked until the conflict is resolved.
- **Advanced JSON (fallback)** — edit `commands` / `skills` / `promptDir` in bulk, apply to the form and save.

The skill catalog is the session-scoped `skills.list` Remote, which only returns `invocation.userInvocable === true` skills. Skills restricted to the model do not appear in the picker. The picker reads the catalog through the current main-view session (falling back to the first non-subagent session) and shows that session name and working directory above the list; with no session it shows an explicit "open a session first" state and a retry action.

You can still override the bundle entry in the profile patch:

```yaml
- id: dsh-quick-launcher
  name: '@homily/dsh-quick-launcher'
  config:
    promptDir: ~/Dropbox/prompts
    commands:
      - { command: goal, label: 目标 }
      - { command: advisor, label: 顾问状态, args: status }
      - { command: advisor, label: 顾问关闭, args: off }
      - { command: compact, label: 压缩, confirm: true }
    prompts:
      - { name: quick.md, label: 快速 }
      - { name: retro.md }
    skills:
      - { name: golang-how-to, label: Go }
      - { name: taskmd, label: Task }
```

Rows render in config order. A command can appear multiple times with different `args`. Prompt presets live as `*.md` files in the bound directory; the `prompts` list selects which of them appear in the panel (names include the `.md` extension), and `label` is optional. With no `prompts` entries, no prompt snippet is shown.

## Manual verification

1. Open **Settings → 命令与技能**; confirm the page loads with no horizontal overflow at 320px and both light and dark themes.
2. Edit a command and select a skill; save. Open the launcher and confirm each change appears immediately.
3. Select a prompt file with **选择**, save, and confirm it now appears in the launcher (and that unselected files do not). Create/edit a prompt file and confirm the content matches; click the prompt with an empty composer, then with existing text and a reference chip. Confirm the file's text is appended at the caret, the chip remains, and no message is sent.
4. Press Escape with the launcher panel open; confirm the panel closes and focus returns to the `⌘` button.
5. Pin a prompt, delete its source file outside the app, then reopen the launcher. Confirm the missing prompt is hidden without an error; the other entries remain usable. Settings should show the missing selection with a Remove action. Restore the file and reopen to confirm it reappears. If a file is deleted after opening but before clicking, the row should disappear with a non-error notice.

Manual checks against the running desktop app covered the 320px and dark-theme layouts, prompt insertion with a live reference chip, the unavailable-skill row and the Save → launcher hot update. The Host file service and its path-traversal guards are covered by a scripted smoke test (`node --input-type=module` driving the exported `QuickLauncherFiles` prototype with a stubbed root). The plugin has no automated UI test suite; the session-scoped skill Remote also cannot enumerate model-only (`userInvocable: false`) skills by design.
