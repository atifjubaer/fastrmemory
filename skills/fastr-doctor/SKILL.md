---
name: fastr-doctor
description: Autonomous SQLite self-healing doctor for verifying B-Tree integrity, rebuilding FTS5 fulltext indices, and pruning orphaned references.
triggers:
  - fastr-doctor
  - fastr-diagnose
  - fastr-heal
  - repair-memory
---

# FastrMemory Autonomous Doctor & Self-Healing Skill

Use this skill whenever database latency increases, searches fail to return newly ingested memories, or foreign key inconsistencies are suspected.

## Diagnostic Protocol

1. **Pre-Heal Audit**: Call `fastr_diagnose` to perform a non-mutating health inspection across 5 subsystems:
   - SQLite B-Tree integrity (`PRAGMA integrity_check`)
   - FTS5 BM25 search index synchronization
   - Orphaned `file_links`
   - Action DAG prerequisite edges
   - WAL page fragmentation
2. **Automated Self-Repair**: Call `fastr_heal` with `dryRun: false` to execute atomic repairs:
   - Rebuilds FTS5 index via `INSERT INTO memories_fts(memories_fts) VALUES('rebuild')`
   - Prunes dangling foreign key references
   - Reclaims space via `PRAGMA wal_checkpoint(TRUNCATE)`

## MCP Invocation

```json
{
  "tool": "fastr_diagnose",
  "arguments": {}
}
```

```json
{
  "tool": "fastr_heal",
  "arguments": {
    "dryRun": false
  }
}
```
