---
name: fastr-setup
description: Use when FastrMemory tools are missing or not responding in Claude Code, when the user asks to install or wire up FastrMemory in a project, or when hooks (session start, pre-edit trap warnings) are not firing. Covers project install, manual MCP registration, and verification.
---

# FastrMemory: Wire Up Claude Code

## When to use
- `fastr_*` tools are not available in the session.
- The user asks to set up FastrMemory for this repository.
- Pre-edit trap warnings or session-start context stopped appearing.

## 1. Project install (recommended)
Run from the project root:
```bash
npx -y github:atifjubaer/fastrmemory hook install
```
This is idempotent and backs up files it changes. It writes:
- `.mcp.json`: a project-scoped `fastrmemory` MCP server.
- `.claude/settings.json`: hooks for `SessionStart`, `PreToolUse` (matcher `Edit|Write|MultiEdit|NotebookEdit`), `PreCompact`, and `SessionEnd`, each running the FastrMemory CLI as `... hook run <event>`.
- `.cursor/mcp.json` and an `AGENTS.md` discipline block for other agents.

Commit `.mcp.json` and `.claude/settings.json` so the team shares the setup. Restart Claude Code and approve the project MCP server when prompted.

## 2. Manual MCP registration (alternative)
```bash
claude mcp add fastrmemory -- npx -y github:atifjubaer/fastrmemory mcp
```
On native Windows use `-- cmd /c npx -y github:atifjubaer/fastrmemory mcp`. Pass `--scope project` (before the name) to write `.mcp.json`. This adds tools only, not hooks.

## 3. Verify
```bash
npx -y github:atifjubaer/fastrmemory status
claude mcp list
```
`status` prints the project ID, memory counts, and database path (`.fastr/` under the project). Inside a session, call:
```js
fastr_status({})
```

## Troubleshooting
- Tools missing after install: run `/mcp` in Claude Code and check the server started; requires Node >= 22.16.
- Searches miss new memories or the DB looks inconsistent: follow the `fastr-doctor` skill.
- Do not edit `~/.claude` files by hand; prefer the commands above.
