# FastrMemory 0.2.0: a verified tarball, a deterministic UI, and an honest CI gate

> **Historical note (2026-10-23):** This post describes the 0.2.0 release, when npm was blocked. `@atifjubaer/fastrmemory@0.2.1` was published later and removed on 2026-10-23; the canonical release target is `fastrmemory@0.3.1` (`0.3.0` remains `latest` until the release workflow publishes the patch). The 0.2.0 registry status below is preserved as history; current install instructions are in [the 0.2.1 post](2026-10-21-fastrmemory-0.2.1.md) and [npm-publishing.md](../npm-publishing.md).

**Date:** 2026-10-20  
**Code commit:** `de4fde3`  
**CI:** [run 39467306362](https://github.com/atifjubaer/fastrmemory/actions/runs/39467306362) - 6/6 jobs green  
**npm:** blocked at publication time (`npm whoami` E401, `npm view` E404); resolved 2026-10-22

FastrMemory 0.2.0 is the packaging and evidence release. The retrieval engine is
unchanged from the measured 0.2.0 benchmark commit; this release makes the
installable artifact, the UI bundle, and the CI result reproducible.

## Install

```bash
# Local project install from the GitHub Release asset:
npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz
npx fastr --version

# Global CLI:
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz
fastr --version
```

The release tarball is **571,279 bytes** with SHA-256
`12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`.
A clean temp-project install took **1.81 s** and produced **16,397,409 bytes**
in `node_modules`; both `npx fastr --version` and `npx fastrmemory --version`
reported `0.2.0`.

The npm registry package is unpublished. `npm whoami` returns E401 and
`npm view @atifjubaer/fastrmemory version` returns E404. Do not bypass the
account security flow; the exact resume protocol is in
[`docs/npm-publishing.md`](../npm-publishing.md).

## What changed

1. **Package surface checks.** `scripts/check-package.mjs` now verifies the MCP
   registry name, bin paths, exports, files allowlist, required build output,
   absence of tests/docs/databases, and the 5 MB tarball gate.
2. **Deterministic UI manifest.** `dist-ui/build-manifest.json` records
   normalized SHA-256 hashes for every UI build input and emitted file.
   `scripts/check-dist-ui.mjs` fails when the tracked bundle is stale.
3. **Version alignment.** The CLI and MCP server read the version from
   `package.json` at runtime. The old CLI literal reported `0.1.0`; the current
   binary reports `0.2.0`.
4. **CI truth.** The six-job matrix now runs tests, isolation, skills, UI
   freshness, package, docs, and benchmark checks. The macOS jobs use the
   Intel `macos-15-intel` runner to avoid the arm64 hosted-runner capacity queue.
5. **Release path.** The verified tarball is attached to the GitHub Release
   while the npm account is blocked.

## Evidence

| Claim | Command | Result |
|---|---|---|
| Local test suite | `npm test` | 226 passed across 38 files |
| Six-job CI | `gh run view 39467306362 --json conclusion,jobs` | 6/6 succeeded on `de4fde3` |
| Tarball dry-run | `npm pack --dry-run --json --ignore-scripts` | 557.9 kB packed, 2.1 MB unpacked, 200 files |
| Actual tarball | `Get-FileHash -Algorithm SHA256 <tarball>` | 571,279 bytes; SHA-256 `12B7D495...09ED7` |
| Clean install | `npm install <tarball> --ignore-scripts` | 1.81 s; 16,397,409 bytes; CLI `0.2.0` |
| npm registry | `npm view @atifjubaer/fastrmemory version` | E404 Not Found |
| npm identity | `npm whoami` | E401 Unauthorized |
| Benchmark holdout | `npx tsx scripts/eval-bench.ts --split all --embeddings minilm` | Hit@1 89.6%, Hit@5 100%, MRR 0.932, 206 tokens, p95 5.80 ms |

The benchmark uses **240 deterministic synthetic cases with a 48-case frozen
holdout**, not SWE-bench or LongMemEval. The holdout Hit@1 target is 90%; the
measured 89.6% is 0.4 points below it. The full ledger is in
[`CLAIMS.md`](../../CLAIMS.md) and the methodology is in
[`BENCHMARKS.md`](../../BENCHMARKS.md).

## Caveats

- The macOS CI jobs ran on Intel macOS 15; Apple Silicon is not covered by this
  six-job matrix.
- The clean-install time is a local Windows measurement with a warm npm cache.
- Tarball hashes are sensitive to line endings; use the attached release asset as
  the canonical artifact.
- The optional MiniLM model is not installed by default and is not counted in
  the install size.
- At the time of this release, the npm registry was unavailable until the
  account security issue was resolved; npm `0.2.1` is now published.

## Next

The next gate is retrieval quality: move the frozen holdout Hit@1 from 89.6% to
at least 90% and the paraphrase subset from 58.3% to at least 75% without
tuning on the holdout. After that, the roadmap moves to non-lossy absorption and
replay/Memory CI.
