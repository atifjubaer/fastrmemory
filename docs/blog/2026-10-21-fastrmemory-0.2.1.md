# FastrMemory 0.2.1: replay, crash evidence, and the 0.2.1 release

**Date:** 2026-10-21 (release); 2026-10-22 (npm publish); 2026-10-23 (npm removal)<br>
**Release commit:** `3fa2bf9` (tag `v0.2.1`)<br>
**CI:** [run 39495621243](https://github.com/atifjubaer/fastrmemory/actions/runs/39495621243) - 6/6 jobs green<br>
**npm:** `@atifjubaer/fastrmemory@0.2.1` (published 2026-10-22 16:51 UTC; removed 2026-10-23)

FastrMemory 0.2.1 is the replay and reliability release. It adds exact memory replay, portable JSONL snapshots, Memory CI, non-lossy consolidation, and a 12-tool core MCP profile. The GitHub Release tarball is attached and installable. The npm registry package was published at `0.2.1` and later removed.

> **Update (2026-10-23):** The canonical unscoped release is `fastrmemory@0.5.0`, published and npm `latest` since 2026-10-23 15:20 UTC; `0.4.0`, `0.3.1`, and `0.3.0` remain published historical. The old scoped npm package was removed on 2026-10-23; the GitHub `v0.2.1` release remains historical. The "0.3.0 is not published" statements below describe the 0.2.1 release date; see [docs/npm-publishing.md](../npm-publishing.md).

## Install

The npm commands below are historical and no longer work. Use published `fastrmemory@0.5.0` for new installs.

```bash
# Historical GitHub Release fallback:
npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
npx fastr --version
```

The GitHub release asset is **591,204 bytes** with SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`. A local Windows release-URL install took **8.35 s**, produced **16,493,121 bytes** in `node_modules`, and reported `0.2.1` from both binaries.

The npm tarball was a separate pack: npm reported **591.4 kB packed / 2.3 MB unpacked / 220 files**, shasum `352abba135ce1b0921cacbcdf9b7efd2abfc4802`, and integrity `sha512-vl51HU0V7BvJ7+ctDMjumDRAt6+5ylvFJYeRPDViM2K4Li0j9fdNIPaF9IILWKdMZwP/wVDQCbM812V+iv3AVA==`. The two channels were not byte-identical; both reported `0.2.1`. The npm entry was removed on 2026-10-23.

The publish completed from the frozen tag. The first `npm view` returned E404 for about two minutes during registry propagation; it then returned `0.2.1`. This was not a failed publish. The npm entry has since been removed; do not republish `0.2.1`.

## What changed

1. **Replay and diff.** `fastr replay` reconstructs the active set at an ISO timestamp. `fastr diff` reports added, superseded, still-active, changed, and conflict rows.
2. **Portable snapshots.** `fastr snapshot export/import` writes a content-hashed JSONL file with no SQLite files, verifies the hash, and skips existing rows.
3. **Memory CI.** The PR workflow posts one marked memory-diff comment and updates it in place on rerun for same-repository PRs; fork PRs are job-summary-only.
4. **Non-lossy consolidation.** Summaries are new rows; source memories and raw events remain.
5. **Core MCP profile.** `fastrmemory mcp --profile core` exposes 12 daily-loop tools; the full 41-tool surface remains the default.
6. **Evidence gates.** `check:ci` runs the test suite, replay verification, package surface, UI manifest, docs checks, and hygiene, and validates the committed benchmark and crash report.

## Evidence

| Claim | Command | Result |
|---|---|---|
| Local test suite | `npm test` at `3fa2bf9` | 235 passed across 43 files |
| Six-job CI | `gh run view 39495621243 --json conclusion,jobs` | 6/6 succeeded on `3fa2bf9` |
| Release asset | `gh release view v0.2.1` | `atifjubaer-fastrmemory-0.2.1.tgz`, 591,204 bytes |
| Tarball hash | `Get-FileHash -Algorithm SHA256 <tarball>` | `78F1535E...0ACA63B` |
| Clean install | `npm install <release URL> --ignore-scripts` | 8.35 s; 16,493,121 bytes; CLI `0.2.1` |
| Benchmark holdout | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm` | 240 cases, 48 holdout; Hit@1 95.8%, Hit@5 100%, MRR 0.969 |
| MCP surface | `node scripts/smoke-mcp-profile.mjs` | core 12/12; full 41/41 |
| Crash test | `npm run test:crash` | 10/10 runs; 10,718 acknowledged writes; 0 lost; 0 duplicates |
| Replay exactness | `npm run verify:replay` | Three stable snapshot hashes; JSONL round-trip hash equal |
The npm rows below are historical; the registry entry was removed on 2026-10-23.

| npm publish | `npm publish --access public` from `3fa2bf9` | `+ @atifjubaer/fastrmemory@0.2.1`; 591.4 kB packed / 2.3 MB unpacked / 220 files |
| npm registry | `npm view @atifjubaer/fastrmemory version` | `0.2.1` (verified 2026-10-22) |
| npm tarball | `npm view @atifjubaer/fastrmemory dist.tarball` | `https://registry.npmjs.org/@atifjubaer/fastrmemory/-/fastrmemory-0.2.1.tgz` |
| npm integrity | `npm view @atifjubaer/fastrmemory dist.integrity` | `sha512-vl51HU0V7BvJ7+ctDMjumDRAt6+5ylvFJYeRPDViM2K4Li0j9fdNIPaF9IILWKdMZwP/wVDQCbM812V+iv3AVA==` |
| npm identity | `npm whoami`; `npm access get status @atifjubaer/fastrmemory` | `atifjubaer`; `@atifjubaer/fastrmemory: public` |
| npm one-shot | `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` | `0.2.1` |

The benchmark uses **240 deterministic synthetic cases with a 48-case frozen holdout**, not SWE-bench or LongMemEval. The full ledger is in [`CLAIMS.md`](../../CLAIMS.md); methodology and caveats are in [`BENCHMARKS.md`](../../BENCHMARKS.md).

## Caveats

- The npm registry tarball and GitHub asset are not byte-identical; both report `0.2.1`. Use the exact version for reproducible installs.
- At the 0.2.1 release date, `0.3.0` was unpublished. `0.3.0`, `0.3.1`, `0.4.0`, and `0.5.0` are now published; `0.5.0` is `latest`, and `0.4.0`/`0.3.1`/`0.3.0` remain historical. See [docs/npm-publishing.md](../npm-publishing.md).
- The benchmark corpus is synthetic; it is not a QA leaderboard result.
- The macOS CI jobs use Intel `macos-15-intel`; Apple Silicon is not covered.
- Memory CI comment updates are verified for same-repository PRs; fork PRs are job-summary-only because their token is read-only.
- The crash test kills the process (`taskkill /F`); it is not a power-loss test, and SQLite uses `synchronous=NORMAL` in WAL mode.
- The clean-install time is a local Windows measurement with a warm npm cache.
- Tarball hashes are sensitive to line endings; compare hashes within the same channel.
- The optional MiniLM model is not installed by default and is not counted in the install size.

## Next

The `0.3.0` release added conflict-aware recall, local rule import, OpenCode V2/Gemini CLI/Copilot CLI hooks, immutable branches, confidence tiers, feedback, hygiene, and the dashboard Replay & Diff workspace. It remains published as `fastrmemory@0.3.0`; `0.3.1` remains the previous patch, `0.4.0` remains published historical, and `0.5.0` is the current release with `fastr mcp init --source local` and LF checkout enforcement. The `0.2.1` npm publish completed on 2026-10-22 from tag `3fa2bf9`; for future releases, use the documented workflow and verify `npm view` and `npx` from a neutral directory.
