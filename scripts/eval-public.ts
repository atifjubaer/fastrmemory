/**
 * Public retrieval benchmark runner.
 *
 * Usage:
 *   npx tsx scripts/eval-public.ts longmemeval --embeddings hash
 *   npx tsx scripts/eval-public.ts locomo --embeddings hash
 *   npx tsx scripts/eval-public.ts repo --revision HEAD --max-cases 200
 *
 * Datasets are downloaded separately into bench/data (gitignored). The pinned revision and
 * SHA-256 are verified before a run, and both are written into the raw JSON output.
 */

import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  buildRepoBench,
  parseLoCoMo,
  parseLongMemEval,
  type PublicDataset,
  type RepoCommit,
  type RepoFile
} from '../src/bench/public-datasets.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin, type DatasetPin } from '../src/bench/public-pins.js';
import {
  evaluatePublicEngine,
  loadPublicDataset,
  prepareEmbeddings,
  PUBLIC_ENGINES,
  type PublicEngine,
  type PublicHarnessOptions
} from '../src/bench/public-harness.js';
import { ensureEmbeddingModel } from '../src/search/embeddings.js';
import { selectSplit, slicePerType, type BenchSplitName } from '../src/bench/split.js';

type DatasetName = 'longmemeval' | 'locomo' | 'repo';
type EmbeddingName = 'hash' | 'minilm';

interface Args {
  dataset: DatasetName;
  data: string;
  out: string;
  embeddings: EmbeddingName;
  engines: string[];
  limit?: number;
  maxCases: number;
  revision: string;
  allowMismatch: boolean;
  split: BenchSplitName | 'all';
  slicePerType?: number;
}

function parseArgs(argv: string[]): Args {
  const dataset = argv[0] as DatasetName;
  if (!['longmemeval', 'locomo', 'repo'].includes(dataset)) {
    throw new Error('Dataset must be one of: longmemeval, locomo, repo');
  }
  const args: Args = {
    dataset,
    data: path.resolve('bench', 'data'),
    out: path.resolve('bench', 'results', `public-${dataset}.json`),
    embeddings: 'hash',
    engines: [],
    maxCases: 250,
    revision: 'HEAD',
    allowMismatch: false,
    split: 'all'
  };
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => {
      const value = argv[++i];
      if (!value) throw new Error(`Missing value for ${arg}`);
      return value;
    };
    if (arg === '--data') args.data = path.resolve(next());
    else if (arg === '--out') args.out = path.resolve(next());
    else if (arg === '--embeddings') args.embeddings = next() as EmbeddingName;
    else if (arg === '--engines') args.engines = next().split(',').map((value) => value.trim()).filter(Boolean);
    else if (arg === '--limit') args.limit = Number(next());
    else if (arg === '--max-cases') args.maxCases = Number(next());
    else if (arg === '--revision') args.revision = next();
    else if (arg === '--split') {
      const value = next();
      if (!['dev', 'test', 'all'].includes(value)) throw new Error('--split must be dev, test, or all');
      args.split = value as BenchSplitName | 'all';
    }
    else if (arg === '--slice-per-type') args.slicePerType = Number(next());
    else if (arg === '--allow-mismatch') args.allowMismatch = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!['hash', 'minilm'].includes(args.embeddings)) {
    throw new Error('--embeddings must be hash or minilm');
  }
  return args;
}

function git(cwd: string, args: string[]): string {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 512 * 1024 * 1024
  });
}

function gitHead(cwd: string): string {
  try {
    return git(cwd, ['rev-parse', 'HEAD']).trim();
  } catch {
    return 'unknown';
  }
}

function buildRepoDataset(repoRoot: string, revision: string, maxCases: number): {
  dataset: PublicDataset;
  pin: DatasetPin;
  details: Record<string, unknown>;
} {
  const resolved = git(repoRoot, ['rev-parse', revision]).trim();
  const commitDate = git(repoRoot, ['show', '-s', '--format=%cI', resolved]).trim();
  const paths = git(repoRoot, ['ls-tree', '-r', '--name-only', resolved])
    .split(/\r?\n/)
    .filter(Boolean);
  const files: RepoFile[] = [];
  for (const filePath of paths) {
    try {
      const content = git(repoRoot, ['show', `${resolved}:${filePath}`]);
      files.push({ path: filePath, content });
    } catch {
      // Skip binary, missing, or LFS-backed blobs.
    }
  }

  const log = git(repoRoot, [
    'log',
    `-n`,
    String(Math.max(maxCases * 2, 50)),
    '--no-merges',
    '--format=%x1e%H%x1f%cI%x1f%s',
    '--name-only',
    resolved
  ]);
  const commits: RepoCommit[] = [];
  for (const chunk of log.split('\x1e')) {
    const lines = chunk.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (lines.length === 0) continue;
    const [sha, , subject] = lines[0].split('\x1f');
    if (!sha || !subject) continue;
    commits.push({
      sha,
      subject,
      files: lines.slice(1).map((line) => line.trim()).filter(Boolean)
    });
  }

  const dataset = buildRepoBench(files, commits, {
    projectId: 'repo_self',
    validFrom: commitDate,
    maxCases,
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md', '.yml', '.yaml']
  });

  return {
    dataset,
    pin: {
      file: `repo@${resolved}`,
      revision: resolved,
      sha256: '',
      url: 'local repository',
      source: 'git:local-repository'
    },
    details: {
      repository: path.basename(repoRoot),
      revision: resolved,
      commitDate,
      files: files.length,
      commits: commits.length
    }
  };
}

function engineSelection(args: Args): PublicEngine[] {
  const defaults = args.embeddings === 'minilm' ? ['bm25_only', 'full_minilm'] : ['bm25_only', 'full_hash'];
  const names = args.engines.length > 0 ? args.engines : defaults;
  const selected = names.map((name) => {
    const engine = PUBLIC_ENGINES.find((candidate) => candidate.name === name);
    if (!engine) throw new Error(`Unknown engine: ${name}`);
    if (engine.requiresEmbeddings && engine.embeddingModel !== args.embeddings) {
      throw new Error(`Engine ${name} uses ${engine.embeddingModel} vectors, but --embeddings=${args.embeddings}`);
    }
    return engine;
  });
  return selected;
}

function summaryTable(results: Array<{ name: string; overall: { count: number; hitAt1: number; hitAt5: number; hitAt10: number; mrr: number; evidenceRecallAt5: number; fullRecallAt5: number; avgTokens: number; p50LatencyMs: number } }>): string {
  const lines = [
    '| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 ms |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|'
  ];
  for (const result of results) {
    const m = result.overall;
    lines.push(
      `| ${result.name} | ${m.count} | ${m.hitAt1}% | ${m.hitAt5}% | ${m.hitAt10}% | ${m.mrr} | ${m.evidenceRecallAt5} | ${m.fullRecallAt5}% | ${m.avgTokens} | ${m.p50LatencyMs} |`
    );
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();
  let dataset: PublicDataset;
  let pin: DatasetPin;
  let details: Record<string, unknown>;

  if (args.dataset === 'repo') {
    const built = buildRepoDataset(repoRoot, args.revision, args.maxCases);
    dataset = built.dataset;
    pin = built.pin;
    details = built.details;
  } else {
    const expected = PUBLIC_DATASET_PINS[args.dataset];
    const file = path.join(args.data, expected.file);
    const sha256 = verifyDatasetPin(expected, file, args.allowMismatch);
    const raw = readJson(file);
    dataset = args.dataset === 'longmemeval'
      ? parseLongMemEval(raw, { limit: args.limit })
      : parseLoCoMo(raw, { limit: args.limit });
    if (args.slicePerType !== undefined) {
      dataset = { ...dataset, cases: slicePerType(dataset.cases, args.slicePerType) };
    }
    if (args.split !== 'all') {
      dataset = { ...dataset, cases: selectSplit(dataset.cases, args.split) };
    }
    if (args.slicePerType !== undefined || args.split !== 'all') {
      const projects = new Set(dataset.cases.map((item) => item.projectId));
      dataset = {
        ...dataset,
        memories: dataset.memories.filter((memory) => projects.has(memory.projectId))
      };
    }
    pin = { ...expected, sha256 };
    details = {
      rawFile: path.relative(repoRoot, file).replaceAll('\\', '/'),
      bytes: fs.statSync(file).size
    };
  }

  if (args.embeddings === 'minilm') {
    const loaded = await ensureEmbeddingModel();
    if (!loaded) {
      throw new Error('MiniLM is not available. Install @huggingface/transformers or use --embeddings hash.');
    }
  }

  const engines = engineSelection(args);
  const { db, repo } = loadPublicDataset(dataset);
  const results = [];
  for (const engine of engines) {
    const embedded = await prepareEmbeddings(db, repo, dataset, engine);
    const options: PublicHarnessOptions = { limit: args.limit, budgetTokens: 1_000_000 };
    const evaluation = await evaluatePublicEngine(db, dataset, engine, options);
    (evaluation as PublicEngineEval & { embedded?: number }).embedded = embedded;
    results.push(evaluation);
    console.log(`\n${args.dataset} / ${engine.name} (${evaluation.overall.count} cases)`);
    console.log(summaryTable([evaluation]));
  }

  const missingGold = dataset.cases.reduce((sum, item) => sum + item.missingGoldCount, 0);
  const output = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    commit: gitHead(repoRoot),
    dataset: {
      name: dataset.name,
      source: pin.source,
      revision: pin.revision,
      file: pin.file,
      sha256: pin.sha256,
      url: pin.url,
      ...details,
      memories: dataset.memories.length,
      cases: dataset.cases.length,
      examples: dataset.examples,
      skippedCases: dataset.skippedCases,
      missingGold
    },
    environment: {
      platform: `${process.platform} ${process.arch}`,
      os: `${os.type()} ${os.release()}`,
      cpu: os.cpus()[0]?.model ?? 'unknown',
      cpuCount: os.cpus().length,
      totalMemoryMb: Math.round(os.totalmem() / 1024 / 1024),
      node: process.version
    },
    config: {
      embeddings: args.embeddings,
      limit: args.limit ?? null,
      split: args.split,
      slicePerType: args.slicePerType ?? null,
      engines: engines.map((engine) => engine.name),
      budgetTokens: 1_000_000,
      retrievalLimit: 10,
      measurement: 'in-process retrieval; no answer generation'
    },
    results
  };

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`\nWrote ${path.relative(repoRoot, args.out)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
