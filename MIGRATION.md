# Migration Guide

**Current published release:** `0.2.1` (GitHub Release; npm publication is blocked)
**Next release:** `0.3.0` (unreleased)
**Applies to:** `0.1.x` → `0.2.x` → `0.3.0`

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

The JSONL export is a portable, content-hashed logical backup. It is safe to commit only if your memory content is safe to commit; it is not encrypted. For a physical backup, stop all processes and copy these three files together:

- `.fastr/fastr.db`
- `.fastr/fastr.db-wal`
- `.fastr/fastr.db-shm`

Copying only `fastr.db` while a WAL file exists can lose recent writes.

## 2. Upgrade from 0.1.x to 0.2.x

`0.2.1` is the supported 0.2.x release. Install the GitHub Release tarball until npm publication is restored:

```bash
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
fastr status
```

What changes:

- MCP `serverInfo.name` is `fastrmemory`. Reconnect MCP clients after upgrading.
- The default MCP surface is 41 tools, 2 prompts, and 4 resources.
- `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core` exposes the 12-tool daily-loop profile. The full surface remains the default.
- Replay, diff, snapshots, Memory CI, non-lossy consolidation, and the 240-case benchmark are available.
- The optional local embedding model is not downloaded unless embeddings are enabled.

Existing memories remain readable. The first `fastr status` opens the database and applies additive schema setup.

## 3. Upgrade from 0.2.x to 0.3.0

`0.3.0` is not published. These steps describe the branch behavior and are not a registry upgrade path yet.

After installing a `0.3.0` build:

```bash
fastr status
fastr hygiene
fastr snapshot export fastr-post-upgrade.jsonl
```

What changes:

- Conflict-aware recall marks both sides of an open contradiction.
- `fastr conflict list` and `fastr conflict resolve` manage contradictions.
- `fastr import --from markdown|agents-md|cursor-rules|claude-md|jsonl` imports local rules and snapshots.
- Immutable branches: `fastr branch create`, `fastr branch list`, `fastr merge`.
- Per-ID confidence tiers and append-only feedback: `fastr feedback <memory-id> <good|bad>`.
- `fastr hygiene` reports orphaned, duplicate, and stale rows.
- The dashboard adds `/replay` with snapshot and diff views.
- The MCP resource surface grows to 5 with `fastr://memory/{id}/envelope`.

Schema additions are automatic. No manual SQL is required. Branch pointers and merge logs are additive; merging is one-way into the current active set.

## 4. Verify the upgrade

```bash
fastr status
fastr hygiene
fastr snapshot export fastr-verify.jsonl
fastr snapshot import fastr-verify.jsonl --dry-run
```

Expected result: status reports database health, hygiene reports raw counts without deleting anything, the export reports a content hash, and the dry-run import verifies the hash without writing.

For a full round-trip on a scratch project, import the backup into a new project and compare counts before touching the original database.

## 5. Roll back

### Code rollback

Install the previous release again:

```bash
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
```

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
- `fastr snapshot export` is logical and does not include the SQLite WAL file.
- npm installation remains blocked by the registry account suspension; use the GitHub Release tarball.
- `0.3.0` is unreleased. Do not describe it as a published upgrade.
