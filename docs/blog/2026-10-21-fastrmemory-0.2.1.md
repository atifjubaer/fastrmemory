# FastrMemory 0.2.1: replay, crash evidence, and an installable tarball while npm is blocked

**Date:** 2026-10-21  
**Release commit:** `3fa2bf9` (tag `v0.2.1`)  
**CI:** [run 39495621243](https://github.com/atifjubaer/fastrmemory/actions/runs/39495621243) - 6/6 jobs green  
**npm:** still blocked (`npm whoami` E401, `npm view` E404)

FastrMemory 0.2.1 is the replay and reliability release. It adds exact memory replay, portable JSONL snapshots, Memory CI, non-lossy consolidation, and a 12-tool core MCP profile. The GitHub Release tarball is attached and installable; the npm registry package is not published.

## Install

```bash
# Local project install from the GitHub Release asset:
npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
npx fastr --version

# Global CLI:
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
```

The release tarball is **591,204 bytes** with SHA-256 `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`. A local Windows release-URL install took **8.35 s**, produced **16,493,121 bytes** in `node_modules`, and reported `0.2.1` from both binaries.

Do not bypass the npm account security flow. The registry returns E401/E404; use the GitHub asset until the suspension lifts.

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
| npm registry | `npm view @atifjubaer/fastrmemory version` | E404 Not Found |
| npm identity | `npm whoami` | E401 Unauthorized |

The benchmark uses **240 deterministic synthetic cases with a 48-case frozen holdout**, not SWE-bench or LongMemEval. The full ledger is in [`CLAIMS.md`](../../CLAIMS.md); methodology and caveats are in [`BENCHMARKS.md`](../../BENCHMARKS.md).

## Caveats

- npm publication is blocked until the registry account is restored.
- The benchmark corpus is synthetic; it is not a QA leaderboard result.
- The macOS CI jobs use Intel `macos-15-intel`; Apple Silicon is not covered.
- Memory CI comment updates are verified for same-repository PRs; fork PRs are job-summary-only because their token is read-only.
- The crash test kills the process (`taskkill /F`); it is not a power-loss test, and SQLite uses `synchronous=NORMAL` in WAL mode.
- The clean-install time is a local Windows measurement with a warm npm cache.
- Tarball hashes are sensitive to line endings; use the attached release asset as the canonical artifact.
- The optional MiniLM model is not installed by default and is not counted in the install size.

## Next

The `0.3.0` branch adds conflict-aware recall, local rule import, OpenCode V2/Gemini CLI/Copilot CLI hooks, immutable branches, confidence tiers, feedback, hygiene, and the dashboard Replay & Diff workspace. The npm publish step remains a separate gate: publish `0.2.1` from tag `3fa2bf9` only after `npm whoami` succeeds, then verify `npm view` and a clean `npx` install.
