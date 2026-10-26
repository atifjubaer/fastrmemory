/**
 * Cross-engine comparison: FastrMemory vs agentmemory vs Hippo.
 *
 * Every engine is driven over MCP stdio, which is the surface an agent actually uses, and
 * every engine is isolated on disk so nothing leaks between runs or into the real profile.
 * The corpus is deterministic (see src/bench/marker-corpus.ts) and is not committed as
 * data: it is regenerated from a seed on every run.
 *
 * What is measured:
 *   - ingest: wall-clock per `remember` round trip, including the engine's own commit,
 *     plus the first-decile / last-decile ratio so a store that degrades with size shows it.
 *   - recall: wall-clock per `recall` round trip.
 *   - context: `estimateTokens` of the text the engine returned, at the same 2000-token
 *     budget for all three, and how many distinct documents that budget bought.
 *   - accuracy: rank of the gold document in the returned text (see markerRank), reported
 *     as Hit@1 per tier with Wilson 95% intervals, plus whether the gold was present at all.
 *
 * Paired statistics compare each engine against FastrMemory on the same queries: an exact
 * McNemar test on discordant pairs and a paired bootstrap over per-query differences.
 *
 * Usage:
 *   npm run bench:setup                    # one-time: install the pinned third-party engines
 *   npm run bench:vs                       # full run, 1200 documents, 120 queries
 *   npx tsx scripts/bench-vs.ts --quick    # 180 documents, 90 queries, smoke only
 */

import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  buildMarkerCorpus,
  MARKER_TIERS,
  markerRank,
  type MarkerCorpus,
  type MarkerTier
} from '../src/bench/marker-corpus.js';
import { McpStdioClient } from '../src/bench/mcp-stdio.js';
import { assertEngineAvailable, createVsEngines, type CaseDirs, type VsEngine } from '../src/bench/vs-engines.js';
import { estimateTokens } from '../src/search/budget.js';
import { mcnemarExact, pairedBootstrap, wilson } from '../src/bench/stats.js';

interface Options {
  engines: string[];
  docs: number;
  golds: number;
  budgetTokens: number;
  out: string;
  keep: boolean;
}

interface QueryResult {
  id: string;
  tier: MarkerTier;
  query: string;
  goldMarker: string;
  /** 1 = gold document came first, null = absent from the returned context. */
  rank: number | null;
  hitAt1: boolean;
  present: boolean;
  /** Distinct documents the engine returned within the budget. */
  documents: number;
  tokens: number;
  ms: number;
}

interface TierSummary {
  n: number;
  hitAt1: number;
  hitAt1Percent: number;
  hitAt1Ci: [number, number];
  present: number;
  presentPercent: number;
  meanDocuments: number;
}

interface EngineResult {
  id: string;
  label: string;
  version: string;
  serverName?: string;
  ingest: {
    docs: number;
    totalMs: number;
    msPerDoc: number;
    p50Ms: number;
    p95Ms: number;
    firstDecileMsPerDoc: number;
    lastDecileMsPerDoc: number;
    degradation: number;
  };
  recall: {
    queries: number;
    /** Steady-state latency after three unscored warm-up reads. */
    p50Ms: number;
    p95Ms: number;
    /** Cost of the first read, which pays any deferred index drain. */
    firstReadMs: number;
    meanTokens: number;
    p50Tokens: number;
    p95Tokens: number;
    meanDocuments: number;
  };
  tiers: Record<MarkerTier, TierSummary>;
  overall: TierSummary;
  results: QueryResult[];
}

function parseArgs(argv: string[]): Options {
  const options: Options = {
    engines: [],
    docs: 1200,
    golds: 40,
    budgetTokens: 2000,
    out: 'bench/results/vs-engines.json',
    keep: false
  };
  let enginesGiven = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--quick') {
      options.docs = 180;
      options.golds = 30;
    } else if (arg === '--engines') {
      options.engines = (argv[++i] ?? '').split(',').filter(Boolean);
      enginesGiven = true;
    } else if (arg === '--docs') {
      options.docs = Number(argv[++i]);
    } else if (arg === '--golds') {
      options.golds = Number(argv[++i]);
    } else if (arg === '--budget') {
      options.budgetTokens = Number(argv[++i]);
    } else if (arg === '--out') {
      options.out = argv[++i] ?? options.out;
    } else if (arg === '--keep') {
      options.keep = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log('usage: bench-vs [--quick] [--engines a,b] [--docs n] [--golds n] [--budget n] [--out file] [--keep]');
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  if (!enginesGiven) options.engines = ['fastrmemory', 'agentmemory', 'hippo'];
  return options;
}

function round(value: number, places = 2): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function percentile(values: number[], q: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor(q * sorted.length)));
  return round(sorted[index]);
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function summarizeTier(results: QueryResult[]): TierSummary {
  const n = results.length;
  const hitAt1 = results.filter((result) => result.hitAt1).length;
  const present = results.filter((result) => result.present).length;
  return {
    n,
    hitAt1,
    hitAt1Percent: n === 0 ? 0 : round((hitAt1 / n) * 100, 1),
    hitAt1Ci: wilson(hitAt1, n),
    present,
    presentPercent: n === 0 ? 0 : round((present / n) * 100, 1),
    meanDocuments: round(mean(results.map((result) => result.documents)))
  };
}

function makeDirs(engineId: string): CaseDirs {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `fastr-vs-${engineId}-`));
  return { root, project: path.join(root, 'project'), home: path.join(root, 'home') };
}

function cleanup(dirs: CaseDirs): void {
  try {
    fs.rmSync(dirs.root, { recursive: true, force: true, maxRetries: 3 });
  } catch {
    // A locked SQLite file on Windows is not a benchmark failure.
  }
}

async function runEngine(engine: VsEngine, corpus: MarkerCorpus, options: Options): Promise<EngineResult> {
  const dirs = makeDirs(engine.id);
  await engine.bootstrap(dirs);

  const client = await McpStdioClient.connect(engine.spec(dirs));
  const ingestTimes: number[] = [];
  const errors: string[] = [];

  process.stdout.write(`  ${engine.label} ${engine.version}: ingesting ${corpus.docs.length} documents `);
  const ingestStarted = performance.now();
  for (let i = 0; i < corpus.docs.length; i++) {
    const doc = corpus.docs[i];
    try {
      const result = await client.callTool(engine.rememberTool, engine.rememberArgs(doc));
      ingestTimes.push(result.durationMs);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${doc.id}: ${message}`);
      if (errors.length >= 3) break;
    }
    if ((i + 1) % 100 === 0) process.stdout.write('.');
  }
  const ingestTotal = performance.now() - ingestStarted;
  process.stdout.write(` ${Math.round(ingestTotal)} ms\n`);

  if (errors.length > 0) {
    await client.close();
    if (!options.keep) cleanup(dirs);
    throw new Error(`${engine.label} failed to ingest:\n${errors.join('\n')}`);
  }

  const results: QueryResult[] = [];
  // Warm-up: pay any one-time read cost (index drain, cache fill) before timing, so the
  // timed numbers are steady state. FastrMemory defers FTS indexing to the first reader
  // (500 rows per search), so three warm-up reads clear a 1200-document queue.
  const warmupMs: number[] = [];
  for (let i = 0; i < 3; i++) {
    const warmup = await client.callTool(engine.recallTool, engine.recallArgs('warmup read', options.budgetTokens));
    warmupMs.push(round(warmup.durationMs));
  }
  process.stdout.write(`  ${engine.label}: ${corpus.queries.length} queries `);
  for (const query of corpus.queries) {
    const result = await client.callTool(engine.recallTool, engine.recallArgs(query.query, options.budgetTokens));
    const rank = markerRank(result.text, query.goldMarker);
    results.push({
      id: query.id,
      tier: query.tier,
      query: query.query,
      goldMarker: query.goldMarker,
      rank,
      hitAt1: rank === 1,
      present: rank !== null,
      documents: new Set(result.text.match(/MKR-[0-9A-F]{10}/g) ?? []).size,
      tokens: estimateTokens(result.text),
      ms: round(result.durationMs)
    });
    if (results.length % 20 === 0) process.stdout.write('.');
  }
  process.stdout.write(' done\n');

  const serverName = client.serverInfo.name;
  await client.close();
  if (!options.keep) cleanup(dirs);

  const tiers = {} as Record<MarkerTier, TierSummary>;
  for (const tier of MARKER_TIERS) tiers[tier] = summarizeTier(results.filter((result) => result.tier === tier));

  const tokenCounts = results.map((result) => result.tokens);
  const recallTimes = results.map((result) => result.ms);
  const decile = Math.max(1, Math.floor(ingestTimes.length / 10));
  // Skip the very first call: every engine pays a one-time store/JIT cost there, and
  // including it would make a flat store look like it degrades.
  const firstDecile = mean(ingestTimes.slice(1, decile + 1));
  const lastDecile = mean(ingestTimes.slice(-decile));

  return {
    id: engine.id,
    label: engine.label,
    version: engine.version,
    serverName,
    ingest: {
      docs: corpus.docs.length,
      totalMs: Math.round(ingestTotal),
      msPerDoc: round(ingestTotal / Math.max(1, corpus.docs.length), 3),
      p50Ms: percentile(ingestTimes, 0.5),
      p95Ms: percentile(ingestTimes, 0.95),
      firstDecileMsPerDoc: round(firstDecile, 3),
      lastDecileMsPerDoc: round(lastDecile, 3),
      degradation: round(lastDecile / Math.max(0.0001, firstDecile), 2)
    },
    recall: {
      queries: results.length,
      p50Ms: percentile(recallTimes, 0.5),
      firstReadMs: warmupMs[0] ?? 0,
      p95Ms: percentile(recallTimes, 0.95),
      meanTokens: Math.round(mean(tokenCounts)),
      p50Tokens: percentile(tokenCounts, 0.5),
      p95Tokens: percentile(tokenCounts, 0.95),
      meanDocuments: round(mean(results.map((result) => result.documents)))
    },
    tiers,
    overall: summarizeTier(results),
    results
  };
}

interface PairedCell {
  n: number;
  fixed: number;
  broken: number;
  mcnemarP: number;
  deltaPercent: number;
  /** Paired-bootstrap interval over per-query differences, in percentage points. */
  bootstrapPp: { mean: number; low: number; high: number; iterations: number };
}

function pairedAgainstBaseline(
  baseline: EngineResult,
  candidate: EngineResult
): Record<MarkerTier | 'all', PairedCell> {
  const baseById = new Map(baseline.results.map((result) => [result.id, result]));
  const candidateById = new Map(candidate.results.map((result) => [result.id, result]));
  const output = {} as Record<MarkerTier | 'all', PairedCell>;
  const tiers: Array<MarkerTier | 'all'> = [...MARKER_TIERS, 'all'];
  for (const tier of tiers) {
    const ids = baseline.results
      .filter((result) => tier === 'all' || result.tier === tier)
      .map((result) => result.id)
      .filter((id) => candidateById.has(id));
    let fixed = 0;
    let broken = 0;
    const diffs: number[] = [];
    for (const id of ids) {
      const a = baseById.get(id)?.hitAt1 ? 1 : 0;
      const b = candidateById.get(id)?.hitAt1 ? 1 : 0;
      if (a === 0 && b === 1) fixed++;
      else if (a === 1 && b === 0) broken++;
      diffs.push(b - a);
    }
    const raw = pairedBootstrap(diffs);
    const toPp = (value: number): number => round(value * 100, 1);
    output[tier] = {
      n: ids.length,
      fixed,
      broken,
      mcnemarP: mcnemarExact(broken, fixed),
      deltaPercent: toPp(raw.mean),
      bootstrapPp: { mean: toPp(raw.mean), low: toPp(raw.low), high: toPp(raw.high), iterations: raw.iterations }
    };
  }
  return output;
}

function printTable(results: EngineResult[]): void {
  const rows: string[][] = [];
  for (const result of results) {
    rows.push([
      result.label,
      result.version,
      String(result.ingest.msPerDoc),
      `${result.ingest.firstDecileMsPerDoc}->${result.ingest.lastDecileMsPerDoc}`,
      String(result.recall.p50Ms),
      String(result.recall.p95Ms),
      String(result.recall.firstReadMs),
      String(result.recall.meanTokens),
      String(result.recall.meanDocuments),
      ...MARKER_TIERS.map(
        (tier) => `${result.tiers[tier].hitAt1Percent}% (${result.tiers[tier].hitAt1}/${result.tiers[tier].n})`
      ),
      `${result.overall.hitAt1Percent}%`,
      `${result.overall.presentPercent}%`
    ]);
  }
  const header = [
    'engine',
    'version',
    'ms/doc',
    'first->last',
    'recall p50',
    'recall p95',
    'first read',
    'tokens',
    'docs',
    ...MARKER_TIERS.map((tier) => `${tier} Hit@1`),
    'overall Hit@1',
    'gold present'
  ];
  const widths = header.map((cell, index) => Math.max(cell.length, ...rows.map((row) => row[index].length)));
  const line = (cells: string[]): string => cells.map((cell, index) => cell.padEnd(widths[index])).join('  ');
  console.log(`\n${line(header)}`);
  console.log(widths.map((width) => '-'.repeat(width)).join('  '));
  for (const row of rows) console.log(line(row));
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();
  const externalDir = path.join(repoRoot, 'bench', 'external');

  if (!fs.existsSync(path.join(repoRoot, 'dist', 'bin', 'fastr.js'))) {
    throw new Error('dist/bin/fastr.js is missing; run `npm run build:core` first');
  }

  const corpus = buildMarkerCorpus({ docs: options.docs, golds: options.golds });
  const allEngines = createVsEngines({ repoRoot, externalDir });
  const selected = allEngines.filter((engine) => options.engines.includes(engine.id));
  if (selected.length === 0) throw new Error(`no known engine in ${options.engines.join(',')}`);
  for (const engine of selected) assertEngineAvailable(engine, externalDir);

  console.log(
    `marker corpus: ${corpus.docs.length} documents, ${corpus.queries.length} queries ` +
      `(${MARKER_TIERS.map((tier) => `${corpus.queries.filter((query) => query.tier === tier).length} ${tier}`).join(', ')}), ` +
      `seed ${corpus.seed}, budget ${options.budgetTokens} tokens`
  );

  const results: EngineResult[] = [];
  for (const engine of selected) results.push(await runEngine(engine, corpus, options));

  const baseline = results.find((result) => result.id === 'fastrmemory');
  const paired: Record<string, Record<MarkerTier | 'all', PairedCell>> = {};
  if (baseline) {
    for (const result of results) {
      if (result.id === baseline.id) continue;
      paired[result.id] = pairedAgainstBaseline(baseline, result);
    }
  }

  printTable(results);

  if (baseline) {
    console.log('\npaired against FastrMemory (positive = candidate better):');
    for (const [engineId, byTier] of Object.entries(paired)) {
      for (const tier of [...MARKER_TIERS, 'all'] as Array<MarkerTier | 'all'>) {
        const cell = byTier[tier];
        console.log(
          `  ${engineId.padEnd(12)} ${tier.padEnd(10)} delta ${cell.deltaPercent >= 0 ? '+' : ''}${cell.deltaPercent} pp ` +
            `[${cell.bootstrapPp.low}, ${cell.bootstrapPp.high}] fixed ${cell.fixed} broken ${cell.broken} p=${cell.mcnemarP}`
        );
      }
    }
  }

  const artifact = {
    generatedAt: new Date().toISOString(),
    kind: 'cross-engine-marker-benchmark',
    command: 'npx tsx scripts/bench-vs.ts',
    corpus: {
      seed: corpus.seed,
      docs: corpus.docs.length,
      queries: corpus.queries.length,
      systems: corpus.systems.length,
      problems: corpus.problems.length,
      symptoms: corpus.symptoms.length,
      events: corpus.events.length,
      tiers: Object.fromEntries(
        MARKER_TIERS.map((tier) => [tier, corpus.queries.filter((query) => query.tier === tier).length])
      ),
      generator: 'src/bench/marker-corpus.ts',
      committedData: false
    },
    protocol: {
      transport: 'mcp-stdio',
      budgetTokens: options.budgetTokens,
      metric: 'rank of the gold marker in the returned context; Hit@1 = gold document came first',
      ci: 'Wilson 95% on the binomial count; paired bootstrap and exact McNemar vs FastrMemory'
    },
    engines: results,
    paired
  };

  const outPath = path.resolve(repoRoot, options.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
  console.log(`\nwrote ${path.relative(repoRoot, outPath)}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exit(1);
});
