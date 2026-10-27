# Migration Guide

**Current release:** `0.8.1` (published 2026-10-28; unscoped npm package and `latest`; `0.8.0`, `0.7.2`, `0.7.1`, `0.7.0`, `0.6.0`, `0.5.0`, `0.4.0`, and `0.3.1` remain published historical)
**Previous releases:** `0.8.0`, `0.7.2`, `0.7.1`, `0.7.0`, `0.6.0`, `0.5.0` (remains published historical)
**Historical release:** `0.3.1` and `0.2.1` (published historical; the `0.2.1` npm entry was removed 2026-10-23, but its GitHub Release remains)
**Applies to:** `0.1.x` → `0.2.x` → `0.3.1` → `0.4.0` → `0.5.0` → `0.6.0` → `0.7.x` (schema changes are additive only; no table rewrites)

FastrMemory stores memory in a local SQLite database. Schema setup is additive: new tables are created with `CREATE TABLE IF NOT EXISTS`, and the `provenance_hash` column is added when missing. There is no destructive schema rewrite. That does not replace a backup. Stop every agent, hook, daemon, and dashboard before upgrading or rolling back.

## 1. Pre-upgrade checklist

Run these commands from the project root:

```bash
fastr --version
fastr status
fastr snapshot export fastr-backup-$(date +%Y%m%d-%H%M%S).jsonl
```

On PowerShell:

```powershell
fastr --version
fastr status
fastr snapshot export ("fastr-backup-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsonl")
```

On a `0.3.x` build, prefer the backup command. It writes the same portable JSONL plus a sidecar manifest with the file SHA-256, content hash, record counts, tool version, environment, and source integrity:

```bash
fastr backup fastr-backup.jsonl
fastr backup --verify fastr-backup.jsonl
```

The JSONL export is a portable, content-hashed logical backup. It is safe to commit only if your memory content is safe to commit; it is not encrypted. For a physical backup, stop all processes and copy these three files together:

- `.fastr/fastr.db`
- `.fastr/fastr.db-wal`
- `.fastr/fastr.db-shm`

Copying only `fastr.db` while a WAL file exists can lose recent writes.

## 2. Upgrade from 0.1.x to 0.2.x

`0.2.1` is the frozen 0.2.x release. Its npm entry was removed on 2026-10-23; the GitHub Release tarball remains the historical fallback:

```bash
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
fastr status
```

What changes:

- MCP `serverInfo.name` is `fastrmemory`. Reconnect MCP clients after upgrading.
- The default MCP surface is 41 tools, 2 prompts, and 4 resources. The 0.3.0 release adds a fifth resource template.
- `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core` exposes the 12-tool daily-loop profile. The full surface remains the default.
- Replay, diff, snapshots, Memory CI, non-lossy consolidation, and the 240-case benchmark are available.
- The optional local embedding model is not downloaded unless embeddings are enabled.

Existing memories remain readable. The first `fastr status` opens the database and applies additive schema setup.

## 3. Upgrade from 0.2.x to 0.3.1

`0.3.1`, `0.4.0`, and `0.5.0` are published historical releases; `0.6.0` is the current `latest`. Install the exact `0.3.1` release only when you need that version:

```bash
npm install -g fastrmemory@0.3.1
fastr --version
```

The package name changed from `@atifjubaer/fastrmemory` to unscoped `fastrmemory`; the `fastr` and `fastrmemory` bin names stay the same. The scoped `0.2.1` npm entry was removed on 2026-10-23; the GitHub `v0.2.1` tag/release remains historical. `0.3.1` is a patch over `0.3.0`: no schema migration, plus the Node runtime guard, project-root pinning for user-scoped clients, Windows launch fixes, and the automated release workflow.

After installing `0.3.1`:

```bash
fastr status
fastr hygiene
fastr backup fastr-post-upgrade.jsonl
fastr backup --verify fastr-post-upgrade.jsonl
```

What changes:

- Conflict-aware recall marks both sides of an open contradiction.
- `fastr conflict list` and `fastr conflict resolve` manage contradictions.
- `fastr import --from markdown|agents-md|cursor-rules|claude-md|jsonl` imports local rules and snapshots.
- Immutable branches: `fastr branch create`, `fastr branch list`, `fastr merge`.
- Per-ID confidence tiers and append-only feedback: `fastr feedback <memory-id> <good|bad>`.
- `fastr hygiene` reports orphaned, duplicate, and stale rows.
- `fastr backup [file]` writes a portable snapshot plus a provenance manifest; `--verify` checks the manifest and file hash, and `--restore` verifies before importing.
- The dashboard adds `/replay` with snapshot and diff views.
- The MCP resource surface grows to 5 with `fastr://memory/{id}/envelope`.

Schema additions are automatic. No manual SQL is required. Branch pointers and merge logs are additive; merging is one-way into the current active set.

### 0.7.x (published 2026-10-27 / 2026-10-28)

`0.7.0` through `0.7.2` add five core agent features and concurrency hardening. Schema setup remains 100% additive:

- **Code Symbol Index & Declaration Anchoring:** Adds the `symbols` table and `declaration_id`/`symbol_id` to `file_links`. Memories can anchor to function, class, and interface declarations, surviving renames and file moves.
- **Per-Turn Memory Injection:** Adds the bounded `file_edits` table (capped at 20 rows per project) for injecting relevant error traps into `UserPromptSubmit` hooks.
- **Read-Only Recall:** Retrieval counters are queued to `.fastr/spool/retrievals.jsonl` rather than taking SQLite's write lock, allowing concurrent recall while writers operate.
- **Self-Verifying Memories:** Adds `assertion` column to `memories`. Traps automatically stop surfacing when their target defect is fixed, and `fastr doctor --heal` / `fastr trap verify --apply` retires them to `dormant`.
- **64-bit ID Entropy (0.7.1):** Memory and feedback IDs expanded to 64 bits to eliminate collisions at large corpus scales (~78k+ memories).
- **Official Brand Kit & Logo (0.7.2):** Integrates the official Neural Synapse Core logo mark into the README for GitHub and npm.

Upgrading from `0.6.0` or `0.5.0` requires no manual migration: opening the database with any `0.7.x` command applies all column and table additions automatically without data loss.

### 0.6.0 (published 2026-10-26)

`0.6.0` changes three defaults and adds one command. None of them rewrites a memory row.

- **Writes are deferred.** `insertMemory()` commits the memory row, its file links, and three queue rows in one savepoint; conflict analysis, entity extraction, and FTS tokenization run afterwards. `write.conflictMode`, `write.nerMode`, and `write.ftsMode` accept `sync` to reproduce `0.5.0` behaviour exactly. Readers drain the FTS queue before BM25, so a memory is searchable as soon as `insertMemory()` returns.
- **The MCP surface defaults to the 12-tool core profile.** `fastr mcp --profile full` exposes all 43 tools; `fastr_tools` and `fastr_call` reach the rest from the core profile. Client configs written by `fastr mcp init` pin the profile explicitly.
- **Hash vectors are opt-in.** `FASTR_VECTOR_MODE=hash` re-enables the feature-hash stream; rows tagged with the hash model stay inert otherwise.
- **`fastr hook uninstall` exists.** It removes exactly what `fastr hook install` wrote for Claude Code, Cursor, OpenCode, Gemini CLI, and Copilot CLI, and is idempotent. See [docs/CLIENT_SUPPORT.md](docs/CLIENT_SUPPORT.md).

Schema setup is additive: `memory_conflict_queue`, `memory_ner_queue`, and `memory_fts_queue` are created with `CREATE TABLE IF NOT EXISTS` the first time a `0.6.0` command opens the database. There is no data rewrite and no downgrade path, so take a backup before upgrading. `0.5.0` remains published historical.

### 0.5.0 (published 2026-10-23)

`0.5.0` adds `fastr mcp init --source local`, which writes the active CLI path and an absolute `--project`; `--source registry` remains the default. No schema migration is required. `0.4.0` remains published historical.

### 0.4.0 (published 2026-10-23)

`0.4.0` adds `fastr mcp init`, LF checkout enforcement, and documentation updates, with no schema migration. Install the exact version with `npm install -g fastrmemory@0.4.0` and run the same `fastr status` and `fastr hygiene` checks shown above. `0.3.1` remains published historical.

## 4. Verify the upgrade

```bash
fastr status
fastr hygiene
fastr backup fastr-verify.jsonl
fastr backup --verify fastr-verify.jsonl
fastr backup --restore fastr-verify.jsonl --dry-run
```

Expected result: status reports database health, hygiene reports raw counts without deleting anything, the backup writes a manifest with a file SHA-256 and content hash, verification checks both, and the dry-run restore reports counts without writing.

For a full round-trip on a scratch project, import the backup into a new project and compare counts before touching the original database.

## 5. Roll back

### Code rollback

Install the previous release again from the GitHub Release tarball:

```bash
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
```

The old scoped npm entry was removed on 2026-10-23; do not use it for rollback.

For source installs, check out tag `v0.2.1` and rebuild:

```bash
git checkout v0.2.1
npm ci
npm run build
```

### Data rollback

1. Stop all agents, hooks, `fastr ui`, and `fastr daemon`.
2. Move the current database aside instead of overwriting it:
   - `.fastr/fastr.db` → `.fastr/fastr.db.failed`
   - `.fastr/fastr.db-wal` and `.fastr/fastr.db-shm` → matching `.failed` names
3. Restore the pre-upgrade database files, or create a fresh database and import the JSONL backup:

```bash
# 0.3.0: verify the manifest and restore
fastr backup --restore fastr-backup.jsonl

# v0.2.1 and earlier: import the JSONL directly
fastr snapshot import fastr-backup-YYYYMMDD-HHMMSS.jsonl
```

Do not assume that an older binary can read a database written by a newer binary. Restore the pre-upgrade physical backup, or import into a fresh database. `fastr snapshot rollback` rolls back memory state to a snapshot; it is not a code rollback.

## 6. Agent configuration changes

`fastrmemory hook install` and `fastr setup` can modify agent configuration files, including `opencode.json`, `.gemini/settings.json`, `.github/mcp.json`, `.github/hooks/fastrmemory.json`, `.claude.json`, `.cursor/mcp.json`, and `AGENTS.md`.

- JSON config installers write a one-time `<file>.fastr.bak` before their first change; `AGENTS.md` is appended only when the FastrMemory marker is absent.
- JSON merges are atomic and preserve unrelated keys.
- Review the changed files before committing them.
- Re-run the installer after upgrading if the MCP command or hook format changed.

## 7. Known limits

- There is no automatic database downgrade command.
- `fastr backup` and `fastr snapshot export` are logical and do not include the SQLite WAL file. The backup scope is memories, raw events, file links, and conflicts; it does not include feedback history, snapshots, branches, action DAG rows, or vision assets. Use the physical `.fastr/fastr.db*` copy for a complete database backup.
- `fastr backup --restore` verifies the sidecar manifest and file hash before writing; the import runs in one SQLite transaction, but stop other writers first.
- npm `0.6.0` is `latest`; `0.5.0`, `0.4.0`, `0.3.1`, and `0.3.0` remain published historical versions. The `0.2.1` npm entry was removed, but its GitHub Release tarball remains for rollback.
- Pin the exact published version for reproducible installs: `0.6.0`.
