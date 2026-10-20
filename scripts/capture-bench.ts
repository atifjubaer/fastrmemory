import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { runIsolatedBenchmarks, SIMULATED_BASELINE_LABEL } from '../src/bench/benchmark.js';

async function main() {
  const report = await runIsolatedBenchmarks('bench_proj');
  let commit = 'unknown';
  try {
    commit = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
  } catch {}

  const payload = {
    schemaVersion: 1,
    generatedAt: report.timestamp,
    commit,
    command: 'npx tsx scripts/capture-bench.ts',
    kind: 'synthetic',
    caseCount: report.totalCases,
    simulatedBaselineLabel: SIMULATED_BASELINE_LABEL,
    engines: report.engines
  };

  const outDir = path.resolve('bench', 'results');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'legacy-12.json');
  fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');
  console.log(`Wrote ${outFile} (${report.totalCases} synthetic cases, commit ${commit.slice(0, 7)})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

