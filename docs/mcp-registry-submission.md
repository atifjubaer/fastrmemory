# Official Model Context Protocol Registry Submission

> **Status (2026-10-26): 0.6.0 published; ready to submit.** The canonical unscoped `fastrmemory@0.6.0` is published and `latest`; root `server.json` pins `0.6.0`. `npm view fastrmemory version` returns `0.6.0`. The old scoped `@atifjubaer/fastrmemory@0.2.1` npm entry was removed on 2026-10-23. This entry has not been submitted to the MCP registry yet.

Submit this entry as a Pull Request to [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) under the **Memory & Cognitive Engines** section.

---

### PR Title
`feat: add FastrMemory - High-Performance Cognitive Agent Memory Engine`

### Table Entry for `README.md`
```markdown
| [FastrMemory](https://github.com/atifjubaer/fastrmemory) | High-Performance Cognitive Agent Memory Engine with native `node:sqlite` WAL storage (Node >= 22.16), Bi-Temporal Git Sync, Triple-Stream RRF ($k=20$), Conditional 2.0x Error Trap Shield, and High-DPI React 19 Dashboard. Zero background daemons, zero open ports. | `npx -y fastrmemory@0.6.0 mcp` |
```

### Full Server Description & Metadata
- **Name**: `fastrmemory` (npm package: `fastrmemory`; registry ID: `io.github.atifjubaer/fastrmemory`)
- **Repository**: [https://github.com/atifjubaer/fastrmemory](https://github.com/atifjubaer/fastrmemory)
- **Author**: Atif Jubaer / Fastrsoft
- **Transport**: `stdio` (Zero network daemon, in-process WAL SQLite)
- **Runtime**: Node.js >= 22.16 (uses built-in `node:sqlite`)
- **Primary Tool Interfaces** (43 tools in the full profile; the default core profile exposes 12 of them, including `fastr_tools` and `fastr_call`; see `src/mcp/server.ts`):
  - `fastr_recall`: Search memories using triple-stream RRF (k=20) over FTS5 BM25, optional local embeddings, and 2-hop file graph spreading.
  - `fastr_remember`: Ingest architectural decisions, rules, and workflows with verbatim event attribution.
  - `fastr_trap_recall`: Active pre-edit error check with a conditional 2.0x recall multiplier for trap-intent or file-scoped queries.
  - `fastr_trap_log`: Logs a diagnosed failure as a verified error trap linked to the affected files, with a conditional 2.0x recall boost.
  - `fastr_action_create` / `fastr_action_update` / `fastr_frontier` / `fastr_next`: Multi-agent action DAG with dependencies, conflicts, frontier discovery, and atomic claiming.
  - `fastr_handoff`: Structured agent handoff packets and staging rule verification.
  - `fastr_conflicts` / `fastr_resolve`: Contradiction detection between opposing rules and structured resolution.
  - `fastr_replay` / `fastr_diff`: Reconstruct the active memory set at an ISO timestamp and diff two states with supersession links and token deltas.

### Quick Start
```bash
# Add to Claude Desktop (claude_desktop_config.json):
{
  "mcpServers": {
    "fastrmemory": {
      "command": "npx",
      "args": ["-y", "fastrmemory@0.6.0", "mcp", "--project", "/absolute/path/to/repo"]
    }
  }
}

# Add to Cursor (.cursor/mcp.json), where the project root is implicit:
{
  "mcpServers": {
    "fastrmemory": {
      "command": "npx",
      "args": ["-y", "fastrmemory@0.6.0", "mcp"]
    }
  }
}
```

> Version note: `fastrmemory@0.6.0` is published and `latest`; pin it for registry installs. `0.5.0`, `0.4.0`, and `0.3.1` remain published historical. The default core profile exposes 12 tools (8,715-byte `tools/list`); pass `--profile full` for all 43. On native Windows, use `cmd /c npx ...` if the client cannot launch `npx` directly.

### Pre-submission validation

The registry validates `server.json` against
`https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json` before it accepts a publish. A rejection after `npm publish` is unrecoverable, because the npm version is immutable. `npm run check:package` therefore enforces the constraints that actually reject a release:

- `name` matches `namespace/server` and equals `package.json` `mcpName` (`io.github.atifjubaer/fastrmemory`), which is how the registry proves npm ownership.
- `description` is 1-100 characters. The previous 108-character description would have been rejected; it is now 97.
- `title` is at most 100 characters.
- `repository.url` is the source repo and `repository.source` is `github`.
- `websiteUrl` matches `repository.url`.
- `version` and `packages[0].version` both equal the `package.json` version, so the registry resolves an npm release that exists.
- `packages[0]` keeps `registryType: npm`, `identifier: fastrmemory`, `transport: stdio`, and the positional `mcp` argument.

Every one of those checks runs offline in `check:ci`, so a manifest that cannot be published cannot be released either.

### Publishing

Publishing needs an interactive GitHub login, so it cannot run inside CI:

```bash
# 1. Install the publisher (Go binary from modelcontextprotocol/registry releases)
brew install mcp-publisher          # macOS/Linux
# Windows: download mcp-publisher_windows_amd64.zip from the releases page

# 2. Authenticate as the repo owner; opens a device-code flow in the browser
mcp-publisher login github

# 3. Publish the root server.json (run from the repo root)
mcp-publisher publish
```

The published record is `io.github.atifjubaer/fastrmemory@0.6.0`. Re-running `mcp-publisher publish` after a version bump publishes the new version under the same name; it does not create a duplicate.
