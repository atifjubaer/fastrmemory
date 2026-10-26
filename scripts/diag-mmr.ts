/**
 * P3 diagnostic: does greedy MMR over the deep candidate pool recover the gold sessions
 * that BM25 buries under near-duplicate non-gold sessions?
 *
 * For every multi-gold case the script retrieves a 50-row pool, then simulates the
 * coverage pass: keep the rank-1 result pinned, then greedily pick the candidate that
 * maximises `score - lambda * maxSimilarityToSelected`, where similarity is Jaccard over
 * the lowercased content token set. It reports strict@5 / strict@10 before and after for
 * several lambda values so the choice is measured, not guessed.
 *
 * Run: npx tsx scripts/diag-mmr.ts [--split dev|test|all]
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

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2)
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const value of a) if (b.has(value)) shared++;
  return shared / (a.size + b.size - shared);
}

function mmrOrder(
  pool: Array<{ id: string; score: number; tokens: Set<string> }>,
  lambda: number,
  depth: number
): string[] {
  if (pool.length === 0) return [];
  const chosen: Array<{ id: string; tokens: Set<string> }> = [pool[0]];
  const remaining = pool.slice(1);
  const maxScore = pool[0].score || 1;
  while (chosen.length < Math.min(depth, pool.length) && remaining.length > 0) {
    let bestIndex = 0;
    let bestValue = -Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      const redundancy = Math.max(...chosen.map((item) => jaccard(candidate.tokens, item.tokens)));
      // Normalise the retrieval score so lambda has a stable meaning across queries.
      const value = (candidate.score / maxScore) - lambda * redundancy;
      if (value > bestValue) {
        bestValue = value;
        bestIndex = i;
      }
    }
    chosen.push(remaining[bestIndex]);
    remaining.splice(bestIndex, 1);
  }
  return chosen.map((item) => item.id);
}

async function main(): Promise<void> {
  const split = splitArg();
  const pin = PUBLIC_DATASET_PINS.longmemeval;
  const file = path.join(process.cwd(), 'bench', 'data', pin.file);
  verifyDatasetPin(pin, file, false);
  const full = parseLongMemEval(readJson(file));
  let dataset: PublicDataset = { ...full, cases: slicePerType(full.cases, 20) };
  if (split !== 'all') dataset = { ...dataset, cases: selectSplit(dataset.cases, split) };
  const projects = new Set(dataset.cases.map((item) => item.projectId));
  dataset = { ...dataset, memories: dataset.memories.filter((memory) => projects.has(memory.projectId)) };

  const lambdas = [0.1, 0.2, 0.3, 0.5, 0.7];
  const totals = new Map<string, { s5: number; s10: number; n: number }>();
  for (const key of ['baseline', ...lambdas.map((value) => `mmr@${value}`)]) {
    totals.set(key, { s5: 0, s10: 0, n: 0 });
  }

  const loaded = loadPublicDataset(dataset);
  for (const item of dataset.cases) {
    if (item.goldIds.length < 2) continue;
    const result = await searchMemories(loaded.db, {
      projectId: item.projectId,
      query: item.query,
      budgetTokens: 10_000_000,
      limit: 50,
      maxPerSession: 50,
      backfill: false,
      retrieval: { enableBm25: true, enableVector: false, enableGraph: false, trapBoost: 1, verifiedBoost: 1 }
    });
    const pool = result.memories.map((entry) => ({
      id: entry.memory.id,
      score: entry.score,
      tokens: tokens(`${entry.memory.title}\n${entry.memory.content}`)
    }));
    const base = pool.map((entry) => entry.id);
    const gold = new Set(item.goldIds);
    const baseRow = totals.get('baseline')!;
    baseRow.n++;
    if (item.goldIds.every((id) => base.slice(0, 5).includes(id))) baseRow.s5++;
    if (item.goldIds.every((id) => base.slice(0, 10).includes(id))) baseRow.s10++;

    const line = [`${item.id} gold=${item.goldIds.length}`, `base=[${item.goldIds.map((id) => base.indexOf(id) + 1).join(',')}]`];
    for (const lambda of lambdas) {
      const order = mmrOrder(pool, lambda, 10);
      const row = totals.get(`mmr@${lambda}`)!;
      row.n++;
      const s5 = item.goldIds.every((id) => order.slice(0, 5).includes(id));
      const s10 = item.goldIds.every((id) => order.slice(0, 10).includes(id));
      if (s5) row.s5++;
      if (s10) row.s10++;
      line.push(`λ${lambda}=[${item.goldIds.map((id) => order.indexOf(id) + 1).join(',')}]`);
    }
    console.log(line.join(' '));
  }
  loaded.db.close();

  console.log('');
  for (const [key, row] of totals) {
    console.log(`${key} n=${row.n} strict@5=${((100 * row.s5) / row.n).toFixed(1)}% strict@10=${((100 * row.s10) / row.n).toFixed(1)}%`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
