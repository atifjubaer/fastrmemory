# Installing FastrMemory (for AI agents)

You are an AI agent asked to install FastrMemory for a developer or team. Follow these steps in order, run every command yourself, and finish with the verification in step 5. Stop and report the exact error if a step fails.

## 1. Check the prerequisite

```bash
node --version    # must be 22.16.0 or newer
```

FastrMemory uses the built-in `node:sqlite` module, so there is no database service to install.

## 2. Install the CLI

```bash
npm install -g fastrmemory@0.3.0
fastr --version
```

If global installs are not allowed, replace `fastr <command>` with `npx -y fastrmemory@0.3.0 <command>` in the remaining steps. Pin the version so an unrelated future release cannot change the installed behavior.

## 3. Wire the agent clients

From the project the developer works in:

```bash
fastr setup
```

`fastr setup` initializes `.fastr/` and writes MCP entries for the clients it finds. It also adds the AGENTS.md discipline block and installs the Agent Skills. Existing JSON configs are merged, not replaced, and changed files are backed up. It never creates a database outside the project and never uploads memory content.

For Claude Code lifecycle hooks only:

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
      "args": ["-y", "fastrmemory@0.3.0", "mcp"]
    }
  }
}
```

On native Windows, use `cmd /c npx -y fastrmemory@0.3.0 mcp` if the client cannot launch `npx` directly. The full 41-tool surface is the default; add `--profile core` to expose the 12-tool daily loop.

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
