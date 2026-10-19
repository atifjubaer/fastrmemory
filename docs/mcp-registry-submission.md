# Official Model Context Protocol Registry Submission

Submit this entry as a Pull Request to [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) under the **Memory & Cognitive Engines** section.

---

### PR Title
`feat: add FastrMemory - High-Performance Cognitive Agent Memory Engine`

### Table Entry for `README.md`
```markdown
| [FastrMemory](https://github.com/atifjubaer/fastrmemory) | High-Performance Cognitive Agent Memory Engine with Native Node 24 WAL SQLite, Bi-Temporal Git Sync, Triple-Stream RRF ($k=60$), 2.0x Error Trap Shield, and High-DPI React 19 Dashboard. Zero background daemons, zero open ports. | `npx github:atifjubaer/fastrmemory mcp` |
```

### Full Server Description & Metadata
- **Name**: FastrMemory (`@atifjubaer/fastrmemory`)
- **Repository**: [https://github.com/atifjubaer/fastrmemory](https://github.com/atifjubaer/fastrmemory)
- **Author**: Atif Jubaer / Fastrsoft
- **Transport**: `stdio` (Zero network daemon, in-process WAL SQLite)
- **Primary Tool Interfaces**:
  - `fastr_recall`: Search memories using Triple-Stream RRF ($k=60$) fusing FTS5 BM25, 384-dim local embeddings, and 2-hop file graph spreading.
  - `fastr_remember`: Ingest architectural decisions, rules, and workflows with verbatim event attribution.
  - `fastr_trap_recall`: Active pre-edit error check with 2.0x recall boost multiplier.
  - `fastr_trap_log`: Quarantine known failures, library gotchas, and syntax bugs into staging memory.
  - `fastr_action_dag`: Multi-agent topological task scheduler with frontier discovery.
  - `fastr_handoff`: Structured agent handoff packets and staging rule verification.
  - `fastr_conflict_check`: Contradiction detection between opposing agent rules with 1-click resolution.

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
