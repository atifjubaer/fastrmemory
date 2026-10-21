# Changelog

All notable changes to FastrMemory are recorded here. Versions follow semantic versioning.

## [Unreleased]

### Added

- Conflict-aware recall: ranked results mark both sides of an open contradiction with the conflict id and the opposing memory.
- `fastr conflict list` and `fastr conflict resolve <id> --keep <memory-id> [--forget] [--reason]`.
- `fastr import --from markdown|agents-md|cursor-rules|claude-md|jsonl` imports local Markdown rules and snapshots with dry-run and exact-duplicate skipping.
- OpenCode V2 integration: `fastrmemory hook install` writes `opencode.json` `mcp.servers.fastrmemory` and an auto-loaded plugin that injects session-start context and captures pre-compaction snapshots.
- Gemini CLI integration: `fastrmemory hook install` merges `.gemini/settings.json` `mcpServers.fastrmemory` and `SessionStart`, `BeforeTool`, `PreCompress`, and `SessionEnd` hooks; `fastr hook run --format gemini` emits Gemini's strict JSON hook contract.
- `npm run smoke:gemini` installs the Gemini config in a temporary project, starts the configured MCP server, and asserts the 41-tool surface.
- GitHub Copilot CLI integration: `fastrmemory hook install` merges `.github/mcp.json` `mcpServers.fastrmemory` and `.github/hooks/fastrmemory.json` `sessionStart`, `preToolUse`, `preCompact`, and `sessionEnd` hooks; `fastr hook run --format copilot` emits Copilot's JSON contract.
- `npm run smoke:copilot` installs the Copilot config in a temporary project, starts the configured MCP server, and asserts the 41-tool surface.
- Memory envelope resource: `fastr://memory/{id}/envelope` returns metadata, cryptographic provenance, file/graph links, and open/resolved/ignored conflict state for one memory.
- Immutable memory branches: `fastr branch create <name> [--from <snapshot-id>]` and `fastr branch list [--json]`.
- `fastr merge <branch> [--dry-run] [--force] [--strategy target|branch] [--json]` adds branch-only memories, preserves target-only memories, reports same-identity conflicts, and records merge attempts in `memory_branch_merges`. Branch-favored resolution supersedes target rows without deleting history.
- Per-ID confidence tiers: active memories report `high`, `medium`, or `low` from `reward_score`; inactive rows report `dormant` or `superseded`. `fastr feedback <memory-id> <good|bad>` exposes the same update from the CLI.
- Three consecutive bad outcomes automatically move a memory to `dormant`; good outcomes reset the streak. Feedback events are stored in the append-only `memory_feedback` audit table.
- `fastr hygiene` reports orphaned file link, conflict, and feedback rows; duplicate active memories by normalized title or exact content; and stale unpinned active memories (default 90 days). `npm run check:hygiene` seeds a deterministic fixture inside `check:ci` and asserts the raw counts.
- Dashboard Replay & Diff workspace at `/replay`: pick two timestamps, inspect both replay snapshots, and review added, superseded, changed, still-active, and open-conflict sections from the new `/api/replay` endpoint.
- `docs/MEMORY_CI.md` documents the PR workflow inputs, outputs, permissions, fork behavior, sample comment, local reproduction, and troubleshooting.
- Memory CI live evidence: same-repository draft PR #12 produced one marker comment, kept it through a re-run, and updated the same comment in place when a new head commit changed the diff from `Added (1)` to `Added (2)`.
- Public retrieval harnesses for LongMemEval, LoCoMo, and real-repository history: pinned dataset revisions, SHA-256 checks, per-case raw JSON, and retrieval-only metrics in `docs/PUBLIC_BENCHMARKS.md`.
- Pinned external retrieval baselines: MiniSearch `7.2.0` and the official MCP reference memory server `2.0.0`, with raw JSON, adapter rules, and caveats in `docs/EXTERNAL_BASELINE.md`. The `+5pp Hit@5` target is met on LongMemEval but missed on LoCoMo (`+4.4pp` vs MiniSearch, `+2.3pp` vs MCP).
- `MIGRATION.md`, `SECURITY.md`, and `SCORECARD.md`: upgrade/rollback paths, local threat model and reporting path, and an evidence-based nine-gate release score (`7.8 / 10` provisional, below the `9.2` target).

### Changed

- Dormancy now requires three consecutive bad outcomes instead of a low reward score alone.

### Fixed

- Conflict resolution now rejects a keep id that is not part of the conflict and refuses to resolve an already-resolved conflict.

## [0.2.1] - 2026-10-21

GitHub release attached from the post-0.2.0 fixes. npm publication remains blocked by the account suspension documented in [docs/npm-publishing.md](docs/npm-publishing.md).

### Added

- Memory Replay and Memory Diff over CLI and MCP: `fastr replay`, `fastr diff`, `fastr_replay`, `fastr_diff`.
- Hashed JSONL snapshot export/import and a replay evidence generator.
- Memory CI workflow for PR memory diffs.
- Non-lossy consolidation with raw-event retention.
- MCP core profile: `fastrmemory mcp --profile core` or `FASTR_MCP_PROFILE=core` exposes 12 daily-loop tools; the full 41-tool surface remains the default.
- Hermetic test isolation via `FASTR_HOME`; the suite writes no rows to the real home store.
- 240-case deterministic retrieval corpus with a fixed 20% holdout, confidence intervals, raw JSON, and an ablation report.
- 10k-write crash test: 10/10 randomized `taskkill /F` runs, 10,718 acknowledged writes, 0 lost, 0 duplicates, integrity `ok`.
- `CLAIMS.md`, `BENCHMARKS.md`, and the baseline audit.

### Changed

- MCP `serverInfo.name` is now `fastrmemory`; registry identity remains `io.github.atifjubaer/fastrmemory`.
- MCP surface is 41 tools, 2 prompts, and 4 resources.
- Retrieval uses weighted FTS5 `bm25`, configurable RRF (`k = 20` by default), per-stream weights, conditional trap boosting, and graph seeding disabled by default.
- Semantic embeddings are optional; deterministic hash vectors are not the default semantic path.
- Test suite is 235 tests across 43 files.

### Fixed

- Retrieval backfill now includes the memory module in the embedding document.
- Package metadata, bin paths, and the tracked UI bundle are checked before packing.
- Documentation no longer presents the 12-case smoke test as the headline benchmark.

### Known limitations

- npm publication is blocked until the registry account is restored.
- At v0.2.1, the benchmark corpus was synthetic and no external memory engine was measured; the Unreleased section adds pinned external retrieval baselines.
- Apple Silicon macOS is not in the 6-job CI matrix.
- The crash test kills the process (`taskkill /F`); it is not an OS-crash or power-loss test, and SQLite uses `synchronous=NORMAL` in WAL mode.

## [0.2.0] - 2026-10-20

### Added

- 240-case retrieval corpus and generated benchmark report.
- Optional local MiniLM embeddings.
- Official MCP v2 server surface.
- Local web dashboard and setup installer.

### Notes

- This release was attached as a GitHub Release tarball; the npm registry publication did not complete.
- The README install instructions for v0.2.0 remain available as a fallback.

## [0.1.0] - 2026-10-18

Initial public source release: bi-temporal SQLite memory, raw event log, FTS5 retrieval, MCP server, CLI, and local dashboard.
