/**
 * P3 diagnostic: does stripping question scaffolding ("how many", "past two weeks")
 * from an aggregate query recover the gold sessions?
 *
 * Aggregate questions are answered by finding every session that mentions the activity,
 * but BM25 ORs every term, so scaffolding words that are frequent across the corpus
 * ("times", "past", "many") outvote the one content word that identifies the activity.
 * The script measures strict@5 / strict@10 with the original query versus a query with
 * scaffolding removed.
 *
 * Run: npx tsx scripts/diag-scaffolding.ts [--split dev|test|all]
 */

import * as path from 'node:path';
import { parseLongMemEval, type PublicDataset } from '../src/bench/public-datasets.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin } from '../src/bench/public-pins.js';
import { loadPublicDataset } from '../src/bench/public-harness.js';
import { selectSplit, slicePerType, type BenchSplitName } from '../src/bench/split.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

const SCAFFOLDING = new Set([
  'how', 'many', 'much', 'times', 'time', 'often', 'total', 'altogether', 'all', 'every',
  'across', 'list', 'name', 'what', 'which', 'who', 'when', 'where', 'did', 'do', 'does',
  'have', 'has', 'had', 'was', 'were', 'is', 'are', 'am', 'been', 'being', 'i', 'me', 'my',
  'we', 'our', 'us', 'you', 'your', 'in', 'on', 'at', 'for', 'to', 'of', 'with', 'and', 'or',
  'the', 'a', 'an', 'past', 'last', 'few', 'couple', 'week', 'weeks', 'month', 'months',
  'year', 'years', 'day', 'days', 'since', 'start', 'currently', 'something', 'anything',
  'things', 'thing', 'there', 'about', 'from', 'by', 'as', 'that', 'this', 'these', 'those',
  'so', 'far', 'up', 'out', 'get', 'got', 'make', 'made', 'take', 'took', 'it', 'its'
]);

function splitArg(): BenchSplitName | 'all' {
  const index = process.argv.indexOf('--split');
  const value = index >= 0 ? process.argv[index + 1] : 'all';
  if (value !== 'dev' && value !== 'test' && value !== 'all') throw new Error('--split must be dev, test, or all');
  return value;
}

function contentTerms(query: string): string {
  const words = query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !SCAFFOLDING.has(word));
  return words.join(' ');
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

  const loaded = loadPublicDataset(dataset);
  const buckets = {
    original: { s5: 0, s10: 0, h1: 0, n: 0 },
    stripped: { s5: 0, s10: 0, h1: 0, n: 0 }
  };

  for (const item of dataset.cases) {
    if (item.goldIds.length < 4) continue;
    const run = async (query: string) => {
      const result = await searchMemories(loaded.db, {
        projectId: item.projectId,
        query,
        budgetTokens: 10_000_000,
        limit: 50,
        maxPerSession: 50,
        backfill: false,
        retrieval: { enableBm25: true, enableVector: false, enableGraph: false, trapBoost: 1, verifiedBoost: 1 }
      });
      return result.memories.map((entry) => entry.memory.id);
    };
    const base = await run(item.query);
    const strippedQuery = contentTerms(item.query);
    const stripped = await run(strippedQuery);
    const gold = new Set(item.goldIds);
    const rankOf = (ids: string[]) => item.goldIds.map((id) => ids.indexOf(id) + 1);

    buckets.original.n++;
    if (item.goldIds.every((id) => base.slice(0, 5).includes(id))) buckets.original.s5++;
    if (item.goldIds.every((id) => base.slice(0, 10).includes(id))) buckets.original.s10++;
    if (base[0] && gold.has(base[0])) buckets.original.h1++;

    buckets.stripped.n++;
    if (item.goldIds.every((id) => stripped.slice(0, 5).includes(id))) buckets.stripped.s5++;
    if (item.goldIds.every((id) => stripped.slice(0, 10).includes(id))) buckets.stripped.s10++;
    if (stripped[0] && gold.has(stripped[0])) buckets.stripped.h1++;

    console.log(
      `${item.id} gold=${item.goldIds.length} q="${strippedQuery}"\n` +
        `  base=[${rankOf(base).join(',')}] stripped=[${rankOf(stripped).join(',')}]`
    );
  }
  loaded.db.close();

  for (const [key, row] of Object.entries(buckets)) {
    console.log(
      `${key} n=${row.n} strict@5=${((100 * row.s5) / row.n).toFixed(1)}% ` +
        `strict@10=${((100 * row.s10) / row.n).toFixed(1)}% hit@1=${((100 * row.h1) / row.n).toFixed(1)}%`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
