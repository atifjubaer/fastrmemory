# Changelog

All notable changes to FastrMemory are recorded here. Versions follow semantic versioning.

## [0.2.1] - 2026-10-21

Release candidate prepared from the post-0.2.0 fixes. npm publication remains blocked by the account suspension documented in [docs/npm-publishing.md](docs/npm-publishing.md).

### Added

- Memory Replay and Memory Diff over CLI and MCP: `fastr replay`, `fastr diff`, `fastr_replay`, `fastr_diff`.
- Hashed JSONL snapshot export/import and a replay evidence generator.
- Memory CI workflow for PR memory diffs.
- Non-lossy consolidation with raw-event retention.
- Hermetic test isolation via `FASTR_HOME`; the suite writes no rows to the real home store.
- 240-case deterministic retrieval corpus with a fixed 20% holdout, confidence intervals, raw JSON, and an ablation report.
- 10k-write crash test: 10/10 randomized `taskkill /F` runs, 10,718 acknowledged writes, 0 lost, 0 duplicates, integrity `ok`.
- `CLAIMS.md`, `BENCHMARKS.md`, and the baseline audit.

### Changed

- MCP `serverInfo.name` is now `fastrmemory`; registry identity remains `io.github.atifjubaer/fastrmemory`.
- MCP surface is 41 tools, 2 prompts, and 4 resources.
- Retrieval uses weighted FTS5 `bm25`, configurable RRF (`k = 20` by default), per-stream weights, conditional trap boosting, and graph seeding disabled by default.
- Semantic embeddings are optional; deterministic hash vectors are not the default semantic path.
- Test suite is 234 tests across 42 files.

### Fixed

- Retrieval backfill now includes the memory module in the embedding document.
- Package metadata, bin paths, and the tracked UI bundle are checked before packing.
- Documentation no longer presents the 12-case smoke test as the headline benchmark.

### Known limitations

- npm publication is blocked until the registry account is restored.
- The benchmark corpus is synthetic; no external memory engine is measured.
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
