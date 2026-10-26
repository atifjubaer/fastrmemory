# Installing FastrMemory (for AI agents)

You are an AI agent asked to install FastrMemory for a developer or team. Follow these steps in order, run every command yourself, and finish with the verification in step 5. Stop and report the exact error if a step fails.

## 1. Check the prerequisite

```bash
node --version    # must be 22.16.0 or newer
```

FastrMemory uses the built-in `node:sqlite` module, so there is no database service to install.

## 2. Install the CLI

```bash
npm install -g fastrmemory@latest
fastr --version
```

If global installs are not allowed, replace `fastr <command>` with `npx -y fastrmemory@latest <command>` in the remaining steps. For a fully reproducible install, replace `@latest` with the exact version the project has approved.

## 3. Wire the agent clients

From the project the developer works in, configure the MCP client with one command:

```bash
fastr mcp init --client claude
```

Supported project-scoped clients are `claude`, `cursor`, `vscode`, `opencode`, `gemini`, and `copilot`. Use `--client all --scope project` for all six. User-scoped clients are `claude`, `cursor`, `vscode`, `gemini`, `windsurf`, `antigravity`, `claude-desktop`, and `codex`; `codex` prints a TOML snippet for `~/.codex/config.toml` instead of rewriting it. The default writes `fastrmemory@latest`; add `--channel pinned` to write the exact version, `--runner pnpm|yarn|bunx` to change the package runner, and `--dry-run` to inspect without writing. Existing JSON is merged, unrelated keys are preserved, and the first change writes a `.fastr.bak` backup. Pass `--source local` to write the active CLI path plus an absolute `--project`; use the default `--source registry` for portable configs. `--source local` ships in published `0.6.0` and `0.5.0`; `0.5.0`, `0.4.0`, and `0.3.1` remain published historical, and on `0.4.0`, `fastr setup` writes an installed-CLI entry.

> `mcp init` ships in `0.4.0` and later; `npx fastrmemory@latest mcp init ...` now resolves to published `0.6.0`. If the command is missing, check `fastr --version`, install `npm install -g fastrmemory@0.6.0`, or run `npx -y fastrmemory@0.6.0 mcp init ...`. For the previous release, use `fastr setup` or pin `fastrmemory@0.3.1`.

For the full installer (database initialization, `AGENTS.md`, skills, and lifecycle hooks), run:

```bash
fastr setup
```

`fastr setup` writes MCP entries for the clients it finds. It never creates a database outside the project and never uploads memory content. For lifecycle hooks only:

```bash
fastr hook install
```

## 4. Manual MCP configuration

Any MCP client can launch the stdio server directly:

```json
{
  "mcpServers": {
    "fastrmemory": {
      "command": "npx",
      "args": ["-y", "fastrmemory@latest", "mcp"]
    }
  }
}
```

For user-scoped clients (Claude Desktop, Antigravity, Windsurf, and the Claude Code entry in `~/.claude.json`), append `--project /absolute/path/to/project` so the client's launch directory cannot select the wrong database. `fastr mcp init --scope user` adds this automatically. On native Windows, `fastr mcp init` emits `cmd /c npx ...`; a manual entry can use `cmd /c npx -y fastrmemory@latest mcp` if the client cannot launch `npx` directly. `fastr setup` writes the absolute `node` path automatically. On published `0.6.0` and `0.5.0`, `fastr mcp init --source local` writes the same installed-CLI shape. The default core profile exposes 12 tools, including `fastr_tools` and `fastr_call`; add `--profile full` to expose all 43.

## 5. Verify

```bash
fastr status
fastr trap list
```

`fastr status` prints the project ID, memory counts, embedding coverage, and database path. Inside an MCP session, call `fastr_status` with an empty object and confirm it returns the same project.

## Rules while using FastrMemory

- Never store API keys, tokens, passwords, private keys, or personal data in a memory. The secret scrubber is a safety net, not a guarantee.
- Remember decisions, rules, file-scoped traps, and known dead ends, not full transcripts.
- Call `fastr_trap_recall` before editing files and log diagnosed failures with `fastr_trap_log`.
- Use `fastr recall` or `fastr_recall` to retrieve context instead of loading the whole database.
