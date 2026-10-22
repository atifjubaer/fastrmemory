# Migration Guide

**Current published release:** `0.2.1` (GitHub Release and npm)
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

On a `0.3.0` build, prefer the backup command. It writes the same portable JSONL plus a sidecar manifest with the file SHA-256, content hash, record counts, tool version, environment, and source integrity:

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

`0.2.1` is the supported 0.2.x release. Install it from npm; the GitHub Release tarball remains a byte-verified fallback:

```bash
npm install -g @atifjubaer/fastrmemory@0.2.1
fastr --version
fastr status
```

If you need the exact GitHub asset:
```bash
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
```

What changes:

- MCP `serverInfo.name` is `fastrmemory`. Reconnect MCP clients after upgrading.
- The default MCP surface is 41 tools, 2 prompts, and 4 resources. The unreleased 0.3.0 branch adds a fifth resource template.
- `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core` exposes the 12-tool daily-loop profile. The full surface remains the default.
- Replay, diff, snapshots, Memory CI, non-lossy consolidation, and the 240-case benchmark are available.
- The optional local embedding model is not downloaded unless embeddings are enabled.

Existing memories remain readable. The first `fastr status` opens the database and applies additive schema setup.

## 3. Upgrade from 0.2.x to 0.3.0

`0.3.0` is not published. These steps describe the branch behavior and are not a registry upgrade path yet. The package name changes from `@atifjubaer/fastrmemory` to unscoped `fastrmemory`; the `fastr` and `fastrmemory` bin names stay the same. The scoped `0.2.1` package remains available.

After installing a `0.3.0` build:

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

Install the previous release again:

```bash
npm install -g @atifjubaer/fastrmemory@0.2.1
fastr --version
```

The byte-verified GitHub fallback is:
```bash
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
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
- npm `0.2.1` is published; the GitHub Release tarball remains available when a byte-verified asset is required.
- `0.3.0` is unreleased. Do not describe it as a published upgrade.
