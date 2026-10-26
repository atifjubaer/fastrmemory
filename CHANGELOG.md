# Changelog

All notable changes to FastrMemory are recorded here. Versions follow semantic versioning.

## [Unreleased]

### Added

- `fastr model install` downloads the optional static semantic model (`minishlab/potion-base-8M`, 256-dim, 30.2 MB, revision `bf8b0566`), verifies both files against pinned SHA-256 hashes, and loads it once at server start when present. `fastr model status` and `fastr model remove` manage it. The asset is never downloaded implicitly and is not part of the npm package.
- Pure-TypeScript model2vec inference (`src/search/static-model.ts`): BERT normalizer, BertPreTokenizer, greedy WordPiece, safetensors reader, mean pooling and L2 normalization, with no runtime dependency and no native binary. It reproduces the HuggingFace tokenizer on 20 edge cases exactly and the reference embeddings to `2.98e-8` max absolute error.
- Query-vector LRU (256 entries, keyed by model id + query text) so repeated agent queries do not re-embed.
- `fastr_tools` lists every tool the server can run, with its JSON input schema, filtered by name or description. `fastr_call` runs any listed tool after validating arguments against that tool's schema; it rejects unknown tools, meta-tools, and invalid arguments. Both are part of the core profile, so the complete surface stays reachable without loading every schema up front.
- `fastr mcp --profile full` exposes all 43 tools. `fastr mcp init` now always writes an explicit `--profile <profile>` into generated configs, so a config never depends on the server default.

### Fixed

- The feature-hash vectorizer is opt-in (`FASTR_VECTOR_MODE=hash`). `enableVector` now defaults to true only when a semantic provider is loaded, so the shipped default is BM25-only. On the 120-case LongMemEval cleaned slice the hash stream degraded 11 cases, improved none, and lowered Hit@1 from 89.2% to 81.7%. Rows tagged with the hash model stay inert unless hash mode is explicitly enabled, including after an upgrade.
- `bench/fixtures/hash-regression.json` pins 20 of those cases (10 degraded, 10 unchanged) with a self-contained test that fails if hash vectors return to the default path.

### Changed

- The MCP **core profile is now the default**: 12 tools with an 8,715-byte `tools/list` payload (~2,179 tokens) instead of 43 tools and 29,829 bytes (~7,457 tokens). `fastr_timeline` and `fastr_diff` left the core schema and remain available through `fastr_call` and `--profile full`.
- Write path: the memory row, file links, and three queue rows commit in one savepoint; conflict analysis, entity extraction, and FTS tokenization are deferred by default (`write.conflictMode`, `write.nerMode`, `write.ftsMode`). Measured on 120 documents (1,225,535 chars): 13.342 ms/doc synchronous vs 0.124 ms/doc deferred, a 107.60x reduction; the conflict scan was 99.1% of the synchronous path. `write.*Mode: 'sync'` reproduces the old behaviour and is tested.
- Readers drain the FTS queue before BM25, so a memory is searchable immediately after `insertMemory()` returns. `fastr doctor` / `fastr heal` drain all three queues and report their depth.
- LongMemEval pin moved to `xiaowu0162/longmemeval-cleaned` at `98d7416c` (`longmemeval_s_cleaned.json`, SHA-256 `D6F21EA9D60A0D56F34A05B609C79C88A451D2AE03597821EA3D5A9678C3A442`). The public harness adds a stable 60/60 dev/test split and `--slice-per-type`.
- Test suite is 332 tests across 57 files.

## [0.5.0] - 2026-10-23

Published 2026-10-23 15:20:41 UTC from tag `v0.5.0` (`54a79ab`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. `npm view fastrmemory version` returns `0.5.0` and `latest` is `0.5.0`; release workflow run `39977196250` passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload. The GitHub Release tarball SHA-256 is `10420ed6c70e6db52984ad6b895949f0f1d849dff06e2cb9227b7b56540cfb0e`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations. `0.4.0` remains published historical.

### Added

- `fastr mcp init --source local` writes the active CLI path and an absolute `--project` into client configs; `--source registry` remains the default portable runner. The local source supports a globally installed `fastr` without relying on `npx`.
- Dashboard status reports the active MCP source (`source`, `installed`, or `registry`) and the resolved project root.

### Changed

- Test suite is 297 tests across 53 files at `6c2a53a`; release tag `v0.5.0` (`54a79ab`) includes the same suite; remote CI run `39935705994` passed 6/6 matrix jobs, and release workflow run `39977196250` passed the full gate. Historical `0.4.0` remains 293 tests / 53 files.

## [0.4.0] - 2026-10-23

Published 2026-10-23 07:32:53 UTC from tag `v0.4.0` (`bb365c2`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. `npm view fastrmemory version` returns `0.4.0` and `latest` is `0.4.0`; release workflow run `39918288792` passed the full gate, clean tarball install, provenance publish, registry verification, and GitHub Release upload. The GitHub Release tarball SHA-256 is `b784e3e12b8a50deaee3b38dbc1f45c756bc37462f2d40433fdda5288cf554ad`; `npm audit signatures` reports 5 verified registry signatures and 4 verified attestations. `0.3.1` remains published historical.

### Added

- `fastr mcp init`: config-only MCP setup for Claude Code, Cursor, VS Code, OpenCode, Gemini CLI, GitHub Copilot CLI, Windsurf, Antigravity, and Claude Desktop (9 JSON clients), plus a Codex TOML snippet for `~/.codex/config.toml`. Supports project and user scopes, `npx` / `pnpm dlx` / `yarn dlx` / `bunx` runners, `latest` and pinned channels, `--profile core`, `--dry-run`, `--json`, and idempotent merges with `.fastr.bak` backups.
- `.gitattributes` and `.editorconfig`: enforce LF checkout and editor defaults so LF-sensitive tests do not fail on Windows with `core.autocrlf=true`.

### Changed

- Package, lockfile, MCP registry manifest, Claude plugin manifests, and skills metadata are `0.4.0`; generated `--channel pinned` configs pin `fastrmemory@0.4.0`.
- README now documents package-runner quick starts and the `mcp init` client matrix; roadmap and contribution sections were removed, with contributor credit retained in `CONTRIBUTING.md`.
- Test suite is 293 tests across 53 files. CI run `39879913968` at `bb365c2` passed all six matrix jobs on 2026-10-23, including Windows Node `22.x` and `24.x`; release workflow run `39918288792` at tag `v0.4.0` passed the full gate.

### Fixed

- Windows checkouts no longer convert LF-sensitive test fixtures to CRLF when `core.autocrlf=true`.

### Release caveat

- At the `0.4.0` release, `npx fastrmemory@latest mcp init` resolved to published `0.4.0`, and `--channel pinned` wrote `fastrmemory@0.4.0`. `0.3.1` remains published historical. There is no schema migration.

## [0.3.1] - 2026-10-23

Published 2026-10-22 23:02:38 UTC from tag `v0.3.1` (`3a3cac6`) by `.github/workflows/release.yml` using GitHub Actions OIDC trusted publishing. At release time, `npm view fastrmemory@0.3.1 version` returned `0.3.1` and `latest` was `0.3.1`; release workflow run `39868908223` passed the full gate, clean install, provenance publish, registry verification, and GitHub Release upload. The GitHub Release tarball SHA-256 is `747f61791dcb7c5694f3cf5cc8705152892a5b16cb33bec51a356fc22112a7b8`. This release replaces the stale `0.3.0` npm README, fixes Windows MCP launch commands, pins user-scoped clients to the project root, and adds a Node runtime guard before `node:sqlite` is loaded.

### Added

- `bin/fastr-guard.mjs`: a dependency-free CLI entry point that fails with a clear message on Node `< 22.16.0` before the `node:sqlite` import is evaluated.
- `fastr mcp --project <path>`: explicit project-root selection for clients that launch outside the repository.
- User-scoped installer entries (`Claude Desktop`, `Antigravity`, `Claude Code` in `~/.claude.json`, and `Windsurf`) now append `--project` with the absolute project root. Project-scoped Cursor config remains unqualified.
- `.github/workflows/release.yml`: tag-driven full gate, production audit, clean tarball install, npm provenance publish, registry verification, and GitHub Release asset upload.
- `scripts/check-release-version.mjs` and `tests/node-guard.test.ts`.

### Changed

- Package and manifests are `0.3.1`; generated MCP and hook configs pin `fastrmemory@0.3.1`.
- Manual MCP snippets use pinned `npx` commands and document the native Windows `cmd /c npx` form.
- Test suite is 282 tests across 52 files.

### Fixed

- Windows clients can no longer fail on a bare `npx.cmd` shim when using the installer; `fastr setup` writes an absolute `node` path.
- User-scoped clients no longer depend on their launch directory to select `.fastr/fastr.db`.
- npm README no longer points at the removed `@atifjubaer/fastrmemory@0.2.1` package.

## [0.3.0] - 2026-10-22

Published as canonical unscoped `fastrmemory@0.3.0` on 2026-10-22 18:32 UTC from tag `v0.3.0` (`50a7d8f`). It was npm `latest` until `0.3.1` published and remains available as a historical version; registry tarball shasum `e17af4f854bd9231e1f4b3a8efb04d3e5b65f8e2`. The old scoped npm entries (`@atifjubaer/fastrmemory` and `fastrmemory@0.0.0-stage`) were removed on 2026-10-23; the GitHub `v0.2.1` tag/release remains as history. See [docs/npm-publishing.md](docs/npm-publishing.md).

### Added

- `docs/blog/2026-10-21-fastrmemory-0.2.1.md` launch post with one reproducible command per release number; npm `0.2.1` was published on 2026-10-22 and removed on 2026-10-23.
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
- `fastr backup [file]` writes a portable JSONL snapshot plus a sidecar provenance manifest; `--verify` checks the file SHA-256 and content hash, and `--restore` verifies before importing with an optional `--dry-run`. The manifest records scope, record counts, tool/environment, source integrity, and provenance-hash count.
- `npm run check:query-plans` records ten `EXPLAIN QUERY PLAN` shapes against a 10k-memory fixture and fails on full table scans of large tables. Raw evidence is in `bench/results/query-plans.json`; methodology is in `docs/QUERY_PLANS.md`.
- `npm run check:recall-latency` seeds 10k memories and fails when default recall p95 reaches 50 ms. Raw evidence is in `bench/results/recall-latency-10k.json`.
- `npm run check:install-size` packs the current tree, installs it into an empty temporary project with scripts disabled, and fails above 20 MB installed or 10 seconds with a warm npm cache.
- Dashboard Replay & Diff workspace at `/replay`: pick two timestamps, inspect both replay snapshots, and review added, superseded, changed, still-active, and open-conflict sections from the new `/api/replay` endpoint.
- `docs/MEMORY_CI.md` documents the PR workflow inputs, outputs, permissions, fork behavior, sample comment, local reproduction, and troubleshooting.
- Memory CI live evidence: same-repository draft PR #12 produced one marker comment, kept it through a re-run, and updated the same comment in place when a new head commit changed the diff from `Added (1)` to `Added (2)`.
- Public retrieval harnesses for LongMemEval, LoCoMo, and real-repository history: pinned dataset revisions, SHA-256 checks, per-case raw JSON, and retrieval-only metrics in `docs/PUBLIC_BENCHMARKS.md`.
- Pinned external retrieval baselines: MiniSearch `7.2.0` and the official MCP reference memory server `2.0.0`, with raw JSON, adapter rules, and caveats in `docs/EXTERNAL_BASELINE.md`. The `+5pp Hit@5` target is met on LongMemEval but missed on LoCoMo (`+4.4pp` vs MiniSearch, `+2.3pp` vs MCP).
- `MIGRATION.md`, `SECURITY.md`, and `SCORECARD.md`: upgrade/rollback paths, local threat model and reporting path, and an evidence-based nine-gate release score (`9.4 / 10` provisional; the `9.2` target is met, with Retrieval still Partial).
- Root `server.json` registry manifest and `llms-install.md` agent install guide, both included in the npm tarball.

### Changed

- Package identity is now unscoped `fastrmemory@0.3.0` (published; later superseded as `latest` by `0.3.1`); generated MCP and hook configs pin `fastrmemory@0.3.0` instead of the GitHub default branch. The old scoped npm package was removed on 2026-10-23.
- Removed 60 legacy `Global Security Invariant` rows from the global store with explicit approval; a timestamped database backup was written first, and the post-cleanup dry run reported 0 matching rows.
- Dormancy now requires three consecutive bad outcomes instead of a low reward score alone.
- Added indexes for project/time raw-event replay and project/embedded candidate scans; the query-plan gate verifies they are selected.

### Fixed

- Conflict resolution now rejects a keep id that is not part of the conflict and refuses to resolve an already-resolved conflict.

## [0.2.1] - 2026-10-21

GitHub release attached and npm package published from the post-0.2.0 fixes. `@atifjubaer/fastrmemory@0.2.1` went live on 2026-10-22 16:51 UTC from `3fa2bf9` and was removed from npm on 2026-10-23; the GitHub release remains. See [docs/npm-publishing.md](docs/npm-publishing.md).

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
- MCP surface is 41 tools, 2 prompts, and 4 resources. The 0.3.0 release adds a fifth resource template.
- Retrieval uses weighted FTS5 `bm25`, configurable RRF (`k = 20` by default), per-stream weights, conditional trap boosting, and graph seeding disabled by default.
- Semantic embeddings are optional; deterministic hash vectors are not the default semantic path.
- Test suite is 235 tests across 43 files.

### Fixed

- Retrieval backfill now includes the memory module in the embedding document.
- Package metadata, bin paths, and the tracked UI bundle are checked before packing.
- Documentation no longer presents the 12-case smoke test as the headline benchmark.

### Known limitations

- At the time of the 0.2.1 release, the npm registry also listed `0.0.0-stage`; both old npm entries were removed on 2026-10-23. Use `fastrmemory@0.5.0` for current installs.
- At v0.2.1, the benchmark corpus was synthetic and no external memory engine was measured; the 0.3.0 release adds pinned external retrieval baselines.
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
