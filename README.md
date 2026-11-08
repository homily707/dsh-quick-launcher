# Quick Launcher

Package: `dsh-quick-launcher`.

A quick launcher for commands, prompt snippets and skills, pinned to the left gutter of the DSH composer card.

## What it does

- Reads a volatile plugin `Config` with three ordered lists: `commands`, `prompts` and `skills`.
- Shows one compact square `⌘` button in `conversation.input.overlay`, absolutely positioned in the composer card's left gutter (never inside the tool row).
- Opens a portal panel on hover (and click/keyboard) with the configured rows; moving away closes it.
- Commands execute through the Host command registry (`ctx.remote.commands.execute`).
- Commands with no `args` open an inline argument field using the command's own `input.hint`.
- Prompt snippets insert plain text at the current caret through `inputActions.captureInsertion()` / `inputActions.insertText(text, span)`; they never send the message and never rewrite the existing draft or reference chips.
- Skills are inserted into the composer as `/skill-name` tokens; the Host's `dsh-tool-skill` pre-step loads them.

## Configuration

Open **Settings → 命令与技能** (Settings → Commands & Skills). The page is registered through the plugin's `settings.section`; changes are saved to the volatile plugin config and apply to the launcher immediately, without reinstalling or editing the profile.

- **Commands** — edit `command`, `label`, `args` and `confirm`, add/remove/reorder rows. `args` omitted or empty means "let the user fill the command's input"; a non-empty value executes immediately.
- **Prompt snippets** — edit `label`, optional `id` and the prompt text. Clicking a prompt inserts the text at the caret; when the text before the caret does not end in whitespace, one space is added first.
- **Skills** — search the user-invocable skill catalog visible to the current session, click to select or deselect, and reorder the selected list. A skill that is not in the catalog is shown as unavailable and can be removed. A skill that collides with a Host command is marked as a conflict; the command wins, so saving is blocked until the conflict is resolved.
- **Advanced JSON (fallback)** — edit `commands` / `prompts` / `skills` in bulk, apply to the lists and save.

The skill catalog is the session-scoped `skills.list` Remote, which only returns `invocation.userInvocable === true` skills. Skills restricted to the model do not appear in the picker. The picker reads the catalog through the current main-view session (falling back to the first non-subagent session) and shows that session name and working directory above the list; with no session it shows an explicit "open a session first" state and a retry action.

You can still override the bundle entry in the profile patch:

```yaml
- id: dsh-quick-launcher
  name: dsh-quick-launcher
  config:
    prompts:
      - { id: review, label: 复盘, prompt: 请复盘刚才的变化，列出关键决策和下一步。 }
    commands:
      - { command: goal, label: 目标 }
      - { command: advisor, label: 顾问状态, args: status }
      - { command: advisor, label: 顾问关闭, args: off }
      - { command: compact, label: 压缩, confirm: true }
    skills:
      - { name: golang-how-to, label: Go }
      - { name: taskmd, label: Task }
```

Rows render in config order. A command can appear multiple times with different `args`.

## Manual verification

1. Open **Settings → 命令与技能**; confirm the page loads with no horizontal overflow at 320px and both light and dark themes.
2. Edit a command, add a prompt and select a skill; save. Open the launcher and confirm each change appears immediately.
3. Click a prompt with an empty composer, then with existing text and a reference chip. Confirm the text is appended at the caret, the chip remains, and no message is sent.
4. Press Escape with the launcher panel open; confirm the panel closes and focus returns to the `⌘` button.

Manual checks against the running desktop app covered the 320px and dark-theme layouts, prompt insertion with a live reference chip, the unavailable-skill row and the Save → launcher hot update. The plugin has no automated UI test suite; the session-scoped skill Remote also cannot enumerate model-only (`userInvocable: false`) skills by design.
