# Official Model Context Protocol Registry Submission

> **Status (2026-10-20): draft only.** The npm package is unpublished (`npm view` returns E404), so the `npx @atifjubaer/fastrmemory` form is not available. Use the GitHub form below until an npm release exists.

Submit this entry as a Pull Request to [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) under the **Memory & Cognitive Engines** section.

---

### PR Title
`feat: add FastrMemory - High-Performance Cognitive Agent Memory Engine`

### Table Entry for `README.md`
```markdown
| [FastrMemory](https://github.com/atifjubaer/fastrmemory) | High-Performance Cognitive Agent Memory Engine with native `node:sqlite` WAL storage (Node >= 22.16), Bi-Temporal Git Sync, Triple-Stream RRF ($k=60$), 2.0x Error Trap Shield, and High-DPI React 19 Dashboard. Zero background daemons, zero open ports. | `npx -y github:atifjubaer/fastrmemory mcp` |
```

### Full Server Description & Metadata
- **Name**: FastrMemory (`@atifjubaer/fastrmemory`)
- **Repository**: [https://github.com/atifjubaer/fastrmemory](https://github.com/atifjubaer/fastrmemory)
- **Author**: Atif Jubaer / Fastrsoft
- **Transport**: `stdio` (Zero network daemon, in-process WAL SQLite)
- **Runtime**: Node.js >= 22.16 (uses built-in `node:sqlite`)
- **Primary Tool Interfaces** (39 tools total; see `src/mcp/server.ts`):
  - `fastr_recall`: Search memories using triple-stream RRF (k=60) over FTS5 BM25, optional local embeddings, and 2-hop file graph spreading.
  - `fastr_remember`: Ingest architectural decisions, rules, and workflows with verbatim event attribution.
  - `fastr_trap_recall`: Active pre-edit error check with 2.0x recall boost multiplier.
  - `fastr_trap_log`: Logs a diagnosed failure as a verified error trap linked to the affected files, with a 2.0x recall boost.
  - `fastr_action_create` / `fastr_action_update` / `fastr_frontier` / `fastr_next`: Multi-agent action DAG with dependencies, conflicts, frontier discovery, and atomic claiming.
  - `fastr_handoff`: Structured agent handoff packets and staging rule verification.
  - `fastr_conflicts` / `fastr_resolve`: Contradiction detection between opposing rules and structured resolution.

### Quick Start
```bash
# Add to Claude Desktop (claude_desktop_config.json):
{
  "mcpServers": {
    "fastrmemory": {
      "command": "npx",
      "args": ["-y", "github:atifjubaer/fastrmemory", "mcp"]
    }
  }
}

# Add to Cursor (.cursor/mcp.json):
{
  "mcpServers": {
    "fastrmemory": {
      "command": "npx",
      "args": ["-y", "github:atifjubaer/fastrmemory", "mcp"]
    }
  }
}
```
