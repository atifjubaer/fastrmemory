# Official Model Context Protocol Registry Submission

> **Status (2026-10-23): ready to submit for 0.3.0.** The canonical unscoped `fastrmemory@0.3.0` is published (`npm view fastrmemory version` returns `0.3.0`; `latest` is `0.3.0`), and root `server.json` pins that version. The scoped `@atifjubaer/fastrmemory@0.2.1` remains published and frozen. This entry has not been submitted to the MCP registry yet.

Submit this entry as a Pull Request to [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) under the **Memory & Cognitive Engines** section.

---

### PR Title
`feat: add FastrMemory - High-Performance Cognitive Agent Memory Engine`

### Table Entry for `README.md`
```markdown
| [FastrMemory](https://github.com/atifjubaer/fastrmemory) | High-Performance Cognitive Agent Memory Engine with native `node:sqlite` WAL storage (Node >= 22.16), Bi-Temporal Git Sync, Triple-Stream RRF ($k=20$), Conditional 2.0x Error Trap Shield, and High-DPI React 19 Dashboard. Zero background daemons, zero open ports. | `npx -y fastrmemory@0.3.0 mcp` |
```

### Full Server Description & Metadata
- **Name**: `fastrmemory` (npm package: `fastrmemory`; registry ID: `io.github.atifjubaer/fastrmemory`)
- **Repository**: [https://github.com/atifjubaer/fastrmemory](https://github.com/atifjubaer/fastrmemory)
- **Author**: Atif Jubaer / Fastrsoft
- **Transport**: `stdio` (Zero network daemon, in-process WAL SQLite)
- **Runtime**: Node.js >= 22.16 (uses built-in `node:sqlite`)
- **Primary Tool Interfaces** (41 tools total; see `src/mcp/server.ts`):
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
      "args": ["-y", "fastrmemory@0.3.0", "mcp"]
    }
  }
}

# Add to Cursor (.cursor/mcp.json):
{
  "mcpServers": {
    "fastrmemory": {
      "command": "npx",
      "args": ["-y", "fastrmemory@0.3.0", "mcp"]
    }
  }
}
```

> Version note: pin `fastrmemory@0.3.0`; it is published and is the current `latest`. The full 41-tool surface is the default; pass `--profile core` for the 12-tool daily loop.
