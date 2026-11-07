# Quick Launcher

Package: `dsh-quick-launcher`.

A quick launcher for commands and skills, pinned to the left gutter of the DSH composer card.

## What it does

- Reads a volatile plugin `Config` with two ordered lists: `commands` and `skills`.
- Shows one compact square `⌘` button in `conversation.input.overlay`, absolutely positioned in the composer card's left gutter (never inside the tool row).
- Opens a portal panel on hover (and click/keyboard) with the configured rows; moving away closes it.
- Commands execute through the Host command registry (`ctx.remote.commands.execute`).
- Commands with no `args` open an inline argument field using the command's own `input.hint`.
- Skills are inserted into the composer as `/skill-name` tokens; the Host's `dsh-tool-skill` pre-step loads them.
- There is no search, favorites, recent list, or local toggle state.

## Configuration

Edit the JSON in **Plugins → Quick Launcher → Configuration**; changes apply immediately without reinstalling.
You can also override the bundle entry in the profile patch:

```yaml
- id: dsh-quick-launcher
  name: dsh-quick-launcher
  config:
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
`args` omitted or empty means "let the user fill the command's input"; a non-empty value executes immediately.
`confirm: true` asks for one more confirmation before executing.

## Scope

V1 covers commands visible in the Host `commands.list` catalog and user-invocable skills from `skills.list`.
Client-only commands such as `/model` and `/permission` keep their native `/` menu behavior.
