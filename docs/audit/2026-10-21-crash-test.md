# 10k Crash-Safety Test

**Date:** 2026-10-21 (local); raw JSON generated `2026-10-20T20:11:11Z`
**Commit:** `fa8e81c` (0.2.1 release candidate)
**Command:** `npm run test:crash` (`node scripts/crash-test.mjs --runs 10 --threshold 1000`)
**Raw JSON:** [`bench/results/crash-test.json`](../../bench/results/crash-test.json)
**Harness:** [`scripts/crash-test.mjs`](../../scripts/crash-test.mjs), writer [`scripts/crash-test-child.ts`](../../scripts/crash-test-child.ts)
**Evidence gate:** `npm run check:crash` (runs inside `npm run check:ci`)

## Method

The child opens the real repository path (`FastrRepository.insertMemory`) against a temporary WAL database and writes unique memories continuously. The parent counts only writes acknowledged on stdout after the insert returns.

For each of 10 runs, the parent waits for 1,000 acknowledged writes, then kills the writer after a random 0–100 ms jitter:

- Windows: `taskkill /F`
- POSIX: `SIGKILL`

The database is reopened after each kill. The parent checks:

1. Every acknowledged memory id exists.
2. No id appears more than once.
3. No logical title appears more than once.
4. `PRAGMA integrity_check` returns `ok`.
5. The final report has 10 runs and at least 10,000 acknowledged writes.

## Results

| Metric | Value |
|---|---:|
| Runs | 10 |
| Acknowledged writes | 10,718 |
| Committed rows | 10,727 |
| Lost acknowledged writes | 0 |
| Duplicate ids | 0 |
| Duplicate titles | 0 |
| Final `PRAGMA integrity_check` | `ok` |
| Result | **PASS (10/10)** |

Per-run acknowledged writes ranged from 1,032 to 1,166. Each run committed one additional row that was written but whose stdout acknowledgement was lost with the process. Those rows are not counted as lost; they are evidence that the write completed before the acknowledgment line was read.

## Caveats

- This is a **process-crash** test, not an OS-crash or power-loss test. SQLite runs with `synchronous=NORMAL` in WAL mode; that mode protects database consistency across process crashes but does not promise durability across power loss.
- The run used the local Windows host (`win32`, Node `v24.15.0`). The harness supports POSIX `SIGKILL`, but the committed report is a Windows run.
- The optional MiniLM model is not installed; the crash path does not depend on embeddings.
- The report is validated by `scripts/check-crash-evidence.mjs`. Re-run `npm run test:crash` to regenerate it.
