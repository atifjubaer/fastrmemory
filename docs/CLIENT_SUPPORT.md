# Client support matrix

FastrMemory integrates with agent clients through two surfaces:

- an **MCP server** entry, which gives the client the tools, and
- **lifecycle hooks** (or a plugin, where the client has no hook system), which push session
  context in, keep memory present on every turn, and capture pre-compaction snapshots.

`fastr hook install` writes both for the five project-scoped clients below. `fastr hook
uninstall` removes exactly what install wrote. Both commands are idempotent and are covered by
`tests/hook-lifecycle.test.ts` and `scripts/smoke-hooks.mjs`.

Claude Code is the only client with a per-prompt hook event, so it is the only one that gets
`UserPromptSubmit` — a ≤150-token block with the next step, the traps for the files being
edited, and the open conflict count, injected on every user prompt. The other clients have no
equivalent event, so they keep their existing four hooks rather than a config their runtime
would ignore.

## Project-scoped clients

| Client | MCP config | Hook / plugin surface | What uninstall removes |
|---|---|---|---|
| Claude Code | `.mcp.json` | `.claude/settings.json` → `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PreCompact`, `SessionEnd` | the `fastrmemory` server, the five hook commands, and the file when nothing else is left |
| Cursor | `.cursor/mcp.json` | none (no project hook API) | the `fastrmemory` server and the file when nothing else is left |
| OpenCode | `opencode.json` (or `.opencode/opencode.json`) | `.opencode/plugins/fastrmemory/index.ts`, marked `// fastrmemory:managed` | the `fastrmemory` server, the managed plugin, and the plugin directories when empty |
| Gemini CLI | `.gemini/settings.json` | `.gemini/settings.json` → `SessionStart`, `BeforeTool`, `PreCompress`, `SessionEnd` | the `fastrmemory` server, the four hooks, and the file when nothing else is left |
| GitHub Copilot CLI | `.github/mcp.json` | `.github/hooks/fastrmemory.json` → `sessionStart`, `preToolUse`, `preCompact`, `sessionEnd` | the `fastrmemory` server, the four hooks, and the hook file when only `version` remains |

`AGENTS.md` is also updated with a short discipline block between
`<!-- fastrmemory:start -->` and `<!-- fastrmemory:end -->` unless `--no-agents-md` is passed.
Uninstall removes the block and restores the surrounding text; it deletes the file only when the
block was its whole content.

## Usage

```bash
# every client, plus AGENTS.md
fastr hook install

# one client, no AGENTS.md change
fastr hook install --client claude --no-agents-md

# remove one client's integration
fastr hook uninstall --client claude

# machine-readable report (per-client status: updated | present | removed | absent | skipped | error)
fastr hook install --json
```

`--client` accepts `claude`, `cursor`, `opencode`, `gemini`, `copilot`, a comma-separated list, or
`all` (the default). An unknown id is an error, not a silent skip.

`--project <dir>` targets a project other than the current directory. This is what the smoke test
uses, and it is also how you install into a repository you are not standing in.

## What is verified, and what is not

| Property | How it is checked |
|---|---|
| Install writes the documented files | `tests/hook-lifecycle.test.ts` (16 tests) and `scripts/smoke-hooks.mjs` |
| Install is idempotent | second run reports `present` and changes no bytes |
| Uninstall restores the project | fresh project round trip leaves the directory empty; a project with user config is compared key-by-key after uninstall |
| Uninstall is idempotent | second run reports `absent`, `changed: false`, and writes nothing |
| User entries survive | every test starts from a config that already contains another MCP server, another hook, or a user-owned OpenCode plugin |
| Unparseable configs are never clobbered | `.mcp.json` with a torn write makes install and uninstall report `error` for Claude Code and leave the bytes untouched |
| JSONC OpenCode configs are never rewritten | install and uninstall report `skipped` and the file stays byte-identical |
| Claude, OpenCode, Cursor round trip | `node scripts/smoke-hooks.mjs`, run on the CI matrix: Ubuntu, Windows, and Intel macOS on Node 22.x and 24.x |
| Gemini CLI and Copilot CLI round trip | unit tests only; their config formats are asserted but no live client is launched |

**Not verified:** that a client actually starts the server and renders hook output. That requires
the client binary, a signed-in session, and a human looking at the transcript. The MCP surface
itself is covered separately by `scripts/smoke-mcp-profile.mjs` (tool counts and schemas) and the
`fastr hook run` tests in `tests/installer-safety.test.ts` (output contracts for Claude, Gemini,
and Copilot).

## Design notes

- **Uninstall never restores `.fastr.bak`.** Install writes a one-time `<file>.fastr.bak` before
  its first change. Uninstall removes only FastrMemory entries; restoring the backup wholesale
  would resurrect keys the user deleted after installing. The backup stays as a recovery point.
- **Uninstall never deletes a user-owned plugin.** The OpenCode plugin is removed only while it
  still carries the `// fastrmemory:managed` marker.
- **Files that become empty are deleted.** A project that had no client config before install is
  left with no client config after uninstall, not with a set of `{}` files.
- **Global installs are out of scope.** `fastr setup` also wires user-scoped clients (Antigravity,
  Claude Desktop, Windsurf, `~/.claude.json`). `hook uninstall` does not touch those; remove those
  entries with the client's own settings UI or by editing the file.
