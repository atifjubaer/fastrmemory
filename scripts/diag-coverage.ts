/**
 * P3/P4 diagnostic: post-window gold ranks and session diversity for multi-gold cases.
 * Prints the rank of every gold memory after the temporal filter, at depth 100, so a
 * coverage pass can be designed against real numbers instead of guesses.
 *
 * Run: npx tsx scripts/diag-coverage.ts [--split dev|test|all] [--temporal]
 */

import * as path from 'node:path';
import { parseLongMemEval, type PublicDataset } from '../src/bench/public-datasets.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin } from '../src/bench/public-pins.js';
import { loadPublicDataset } from '../src/bench/public-harness.js';
import { selectSplit, slicePerType, type BenchSplitName } from '../src/bench/split.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

function splitArg(): BenchSplitName | 'all' {
  const index = process.argv.indexOf('--split');
  const value = index >= 0 ? process.argv[index + 1] : 'all';
  if (value !== 'dev' && value !== 'test' && value !== 'all') throw new Error('--split must be dev, test, or all');
  return value;
}

async function main(): Promise<void> {
  const split = splitArg();
  const temporal = process.argv.includes('--temporal');
  const pin = PUBLIC_DATASET_PINS.longmemeval;
  const file = path.join(process.cwd(), 'bench', 'data', pin.file);
  verifyDatasetPin(pin, file, false);
  const full = parseLongMemEval(readJson(file));
  let dataset: PublicDataset = { ...full, cases: slicePerType(full.cases, 20) };
  if (split !== 'all') dataset = { ...dataset, cases: selectSplit(dataset.cases, split) };
  const projects = new Set(dataset.cases.map((item) => item.projectId));
  dataset = { ...dataset, memories: dataset.memories.filter((memory) => projects.has(memory.projectId)) };

  const loaded = loadPublicDataset(dataset);
  for (const item of dataset.cases) {
    if (item.goldIds.length < 3) continue;
    const result = await searchMemories(loaded.db, {
      projectId: item.projectId,
      query: item.query,
      budgetTokens: 10_000_000,
      limit: 100,
      maxPerSession: 100,
      backfill: false,
      retrieval: {
        enableBm25: true,
        enableVector: false,
        enableGraph: false,
        trapBoost: 1,
        verifiedBoost: 1,
        temporalFilter: temporal,
        questionDate: item.questionDate
      }
    });
    const ids = result.memories.map((entry) => entry.memory.id);
    const gold = new Set(item.goldIds);
    const ranks = item.goldIds.map((id) => {
      const index = ids.indexOf(id);
      return index >= 0 ? index + 1 : 0;
    });
    const strict5 = item.goldIds.every((id) => ids.slice(0, 5).includes(id));
    const strict10 = item.goldIds.every((id) => ids.slice(0, 10).includes(id));
    console.log(
      `${item.id} gold=${item.goldIds.length} ranks=[${ranks.join(',')}] s5=${strict5} s10=${strict10} ` +
        `pool=${ids.length} window=${result.temporalWindow?.label ?? '-'} fallback=${result.temporalFallback ?? false}`
    );
  }
  loaded.db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
