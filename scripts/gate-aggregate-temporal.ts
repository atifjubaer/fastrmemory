/**
 * P3/P4 gate: aggregate coverage and temporal filtering.
 *
 * Emits `bench/results/gate-aggregate-temporal-<split>.json` with, for each engine:
 * overall and per-cell metrics (n, k, Wilson 95% CI), and the paired comparison against
 * BM25-only (fixed / broken, exact McNemar p, paired bootstrap CI on the delta).
 *
 * The dev split is for tuning. The test split is reported once and never used to pick a
 * parameter. Requires the pinned 277 MB dataset.
 *
 * Run: npx tsx scripts/gate-aggregate-temporal.ts --split dev
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseLongMemEval, type PublicDataset } from '../src/bench/public-datasets.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin } from '../src/bench/public-pins.js';
import {
  evaluatePublicEngine,
  loadPublicDataset,
  PUBLIC_ENGINES,
  type PublicEngine,
  type PublicEngineEval
} from '../src/bench/public-harness.js';
import { selectSplit, slicePerType, type BenchSplitName } from '../src/bench/split.js';
import { pairedCompare, wilson } from './lib/stats.js';

function splitArg(): BenchSplitName {
  const index = process.argv.indexOf('--split');
  const value = index >= 0 ? process.argv[index + 1] : 'dev';
  if (value !== 'dev' && value !== 'test') throw new Error('--split must be dev or test');
  return value;
}

/** A metric cell: count, successes, percentage, and Wilson interval. */
interface Cell {
  n: number;
  k: number;
  percent: number;
  ci: [number, number];
}

function cell(values: number[]): Cell {
  const n = values.length;
  const k = values.reduce((sum, value) => sum + value, 0);
  return {
    n,
    k,
    percent: n === 0 ? 0 : Math.round((1000 * k) / n) / 10,
    ci: wilson(k, n)
  };
}

interface PairedCell {
  metric: string;
  fixed: number;
  broken: number;
  unchanged: number;
  mcnemarP: number;
  deltaPercent: number;
  bootstrap: { mean: number; low: number; high: number; iterations: number };
}

function metricsFor(evaluation: PublicEngineEval, predicate: (item: PublicEngineEval['cases'][number]) => boolean) {
  const cases = evaluation.cases.filter(predicate);
  return {
    cases: cases.length,
    hitAt1: cell(cases.map((item) => item.hitAt1)),
    hitAt5: cell(cases.map((item) => item.hitAt5)),
    hitAt10: cell(cases.map((item) => item.hitAt10)),
    strictAt5: cell(cases.map((item) => item.fullRecallAt5)),
    strictAt10: cell(cases.map((item) => item.fullRecallAt10))
  };
}

function pairedFor(
  baseline: PublicEngineEval,
  candidate: PublicEngineEval,
  metric: 'hitAt1' | 'hitAt5' | 'fullRecallAt5' | 'fullRecallAt10',
  predicate: (item: PublicEngineEval['cases'][number]) => boolean = () => true
): PairedCell {
  const toMap = (evaluation: PublicEngineEval) =>
    new Map(evaluation.cases.filter(predicate).map((item) => [item.caseId, item[metric]]));
  const comparison = pairedCompare(toMap(baseline), toMap(candidate));
  const baseMean = [...toMap(baseline).values()].reduce((sum, value) => sum + value, 0) / Math.max(1, comparison.n);
  const candidateMean = [...toMap(candidate).values()].reduce((sum, value) => sum + value, 0) / Math.max(1, comparison.n);
  return {
    metric,
    fixed: comparison.fixed,
    broken: comparison.broken,
    unchanged: comparison.unchanged,
    mcnemarP: comparison.mcnemarP,
    deltaPercent: Math.round((candidateMean - baseMean) * 1000) / 10,
    bootstrap: comparison.bootstrap
  };
}

async function main(): Promise<void> {
  const split = splitArg();
  const pin = PUBLIC_DATASET_PINS.longmemeval;
  const file = path.join(process.cwd(), 'bench', 'data', pin.file);
  verifyDatasetPin(pin, file, false);
  const full = parseLongMemEval(readJson(file));
  let dataset: PublicDataset = { ...full, cases: slicePerType(full.cases, 20) };
  dataset = { ...dataset, cases: selectSplit(dataset.cases, split) };
  const projects = new Set(dataset.cases.map((item) => item.projectId));
  dataset = { ...dataset, memories: dataset.memories.filter((memory) => projects.has(memory.projectId)) };

  const names = ['bm25_only', 'bm25_aggregate', 'bm25_temporal', 'bm25_temporal_aggregate'];
  const engines = names.map((name) => {
    const engine = PUBLIC_ENGINES.find((candidate) => candidate.name === name);
    if (!engine) throw new Error(`Missing engine: ${name}`);
    return engine as PublicEngine;
  });

  const loaded = loadPublicDataset(dataset);
  const evaluations: PublicEngineEval[] = [];
  for (const engine of engines) {
    const evaluation = await evaluatePublicEngine(loaded.db, dataset, engine);
    evaluations.push(evaluation);
  }
  loaded.db.close();

  const baseline = evaluations[0];
  const cells = {
    all: () => true,
    fourGold: (item: PublicEngineEval['cases'][number]) => item.goldCount === 4,
    multiGold: (item: PublicEngineEval['cases'][number]) => item.goldCount >= 4,
    temporal: (item: PublicEngineEval['cases'][number]) => item.category === 'temporal-reasoning',
    preference: (item: PublicEngineEval['cases'][number]) => item.category === 'single-session-preference'
  };

  const rows = evaluations.map((evaluation) => ({
    engine: evaluation.name,
    retrieval: evaluation.config,
    metrics: Object.fromEntries(
      Object.entries(cells).map(([name, predicate]) => [name, metricsFor(evaluation, predicate)])
    ),
    cases: evaluation.cases.map((item) => ({
      caseId: item.caseId,
      category: item.category,
      goldCount: item.goldCount,
      rank: item.rank,
      hitAt1: item.hitAt1,
      strictAt5: item.fullRecallAt5,
      strictAt10: item.fullRecallAt10,
      temporalWindow: item.temporalWindow ?? null,
      temporalFallback: item.temporalFallback ?? false
    })),
    paired: evaluation === baseline
      ? null
      : {
          hitAt1: pairedFor(baseline, evaluation, 'hitAt1'),
          strictAt5: pairedFor(baseline, evaluation, 'fullRecallAt5'),
          strictAt10: pairedFor(baseline, evaluation, 'fullRecallAt10'),
          fourGoldStrictAt5: pairedFor(baseline, evaluation, 'fullRecallAt5', cells.fourGold),
          fourGoldStrictAt10: pairedFor(baseline, evaluation, 'fullRecallAt10', cells.fourGold),
          temporalStrictAt5: pairedFor(baseline, evaluation, 'fullRecallAt5', cells.temporal),
          preferenceStrictAt5: pairedFor(baseline, evaluation, 'fullRecallAt5', cells.preference)
        }
  }));

  for (const row of rows) {
    const all = row.metrics.all;
    console.log(
      `\n${row.engine}: Hit@1 ${all.hitAt1.percent}% (${all.hitAt1.k}/${all.hitAt1.n}, CI ${all.hitAt1.ci.join('-')}) | ` +
        `strict@5 ${all.strictAt5.percent}% (${all.strictAt5.k}/${all.strictAt5.n}) | ` +
        `strict@10 ${all.strictAt10.percent}% (${all.strictAt10.k}/${all.strictAt10.n})`
    );
    for (const [name, metrics] of Object.entries(row.metrics)) {
      if (name === 'all') continue;
      console.log(
        `  ${name}: n=${metrics.cases} strict@5 ${metrics.strictAt5.percent}% (${metrics.strictAt5.k}/${metrics.strictAt5.n}) ` +
          `strict@10 ${metrics.strictAt10.percent}% (${metrics.strictAt10.k}/${metrics.strictAt10.n})`
      );
    }
    if (row.paired) {
      for (const [name, paired] of Object.entries(row.paired)) {
        console.log(
          `  Δ${name}: ${paired.deltaPercent >= 0 ? '+' : ''}${paired.deltaPercent} pp ` +
            `(${paired.fixed} fixed / ${paired.broken} broken, McNemar p=${paired.mcnemarP}, ` +
            `bootstrap ${paired.bootstrap.low}..${paired.bootstrap.high})`
        );
      }
    }
  }

  const out = path.join(process.cwd(), 'bench', 'results', `gate-aggregate-temporal-${split}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(
    out,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        dataset: {
          name: 'longmemeval_s_cleaned',
          revision: PUBLIC_DATASET_PINS.longmemeval.revision,
          sha256: PUBLIC_DATASET_PINS.longmemeval.sha256,
          slicePerType: 20,
          split,
          cases: dataset.cases.length,
          memories: dataset.memories.length
        },
        metric: 'strict@k = every gold session present in the top k; 95% CI is Wilson; delta CI is a paired bootstrap over cases',
        rows
      },
      null,
      2
    )}\n`,
    'utf8'
  );
  console.log(`\nwrote ${out}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
