import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  DEFAULT_ENGINES,
  embedCorpus,
  evaluateEngine,
  setupCorpusDatabase,
  type EngineEval
} from '../src/bench/harness.js';
import { buildBenchmarkCorpus, summarizeCorpus, type BenchSplit } from '../src/bench/corpus.js';
import { ensureEmbeddingModel, getAvailableEmbeddingProvider } from '../src/search/embeddings.js';

type SplitArg = BenchSplit | 'all';
type EmbeddingArg = 'hash' | 'minilm';

function parseArgs(argv: string[]): { split: SplitArg; out: string; embeddings: EmbeddingArg } {
  let split: SplitArg = 'train';
  let out = path.resolve('bench', 'results', 'latest.json');
  let embeddings: EmbeddingArg = 'hash';
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--split' && argv[i + 1]) {
      const value = argv[++i] as SplitArg;
      if (!['train', 'holdout', 'all'].includes(value)) {
        throw new Error(`Invalid --split value: ${value}`);
      }
      split = value;
    } else if (arg === '--out' && argv[i + 1]) {
      out = path.resolve(argv[++i]);
    } else if (arg === '--embeddings' && argv[i + 1]) {
      const value = argv[++i] as EmbeddingArg;
      if (!['hash', 'minilm'].includes(value)) {
        throw new Error(`Invalid --embeddings value: ${value}`);
      }
      embeddings = value;
    }
  }
  return { split, out, embeddings };
}

function commitSha(): string {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
}

function markdownTable(split: string, evaluations: EngineEval[]): string {
  const lines = [
    `### ${split}`,
    '',
    '| Engine | Hit@1 | Hit@3 | Hit@5 | MRR | nDCG@10 | Tokens | p50 ms | p95 ms |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|'
  ];
  for (const evaluation of evaluations) {
    const m = evaluation.overall;
    lines.push(
      `| ${evaluation.name} | ${m.hitAt1} | ${m.hitAt3} | ${m.hitAt5} | ${m.mrr} | ${m.ndcgAt10} | ${m.avgTokens} | ${m.p50LatencyMs} | ${m.p95LatencyMs} |`
    );
  }
  return lines.join('\n');
}

async function main() {
  const { split, out, embeddings } = parseArgs(process.argv.slice(2));
  if (embeddings === 'minilm') {
    const loaded = await ensureEmbeddingModel();
    if (!loaded) {
      throw new Error(
        'MiniLM is not available. Install @huggingface/transformers and allow the model download, or run with --embeddings hash.'
      );
    }
  }

  const corpus = buildBenchmarkCorpus();
  const summary = summarizeCorpus(corpus);
  const projectId = 'bench_corpus_proj';

  const db = new DatabaseSync(':memory:');
  const setup = setupCorpusDatabase(db, corpus, projectId);
  const embedded = await embedCorpus(db, setup.repo, projectId);
  const provider = getAvailableEmbeddingProvider();
  const engines = DEFAULT_ENGINES.filter((engine) => {
    if (!engine.requiresEmbeddings) return true;
    return (engine.embeddingModel ?? 'hash') === embeddings;
  });

  const splits: BenchSplit[] = split === 'all' ? ['train', 'holdout'] : [split];
  const results: Record<string, EngineEval[]> = {};

  for (const currentSplit of splits) {
    const evaluations: EngineEval[] = [];
    for (const engine of engines) {
      const evaluation = await evaluateEngine(db, projectId, corpus, currentSplit, engine);
      evaluations.push(evaluation);
    }
    results[currentSplit] = evaluations;
    console.log(markdownTable(currentSplit, evaluations));
    console.log('');
  }

  const commandOut = path.relative(process.cwd(), out).replaceAll('\\', '/');
  const notMeasured = embeddings === 'hash'
    ? [
        {
          name: 'bm25_minilm',
          reason:
            'Not measured in this run. Use --embeddings minilm to load the local MiniLM model and measure it.'
        }
      ]
    : [
        {
          name: 'bm25_hash',
          reason:
            'Not measured in this run. Hash-only engine; use --embeddings hash to measure it.'
        },
        {
          name: 'no_graph (hash)',
          reason:
            'Hash-only ablation. Not measured with MiniLM in this run.'
        },
        {
          name: 'no_trap (hash)',
          reason:
            'Hash-only ablation. Not measured with MiniLM in this run.'
        }
      ];

  const payload = {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    commit: commitSha(),
    command: `npx tsx scripts/eval-bench.ts --split ${split} --embeddings ${embeddings} --out ${commandOut}`,
    kind: 'synthetic',
    corpus: {
      path: 'bench/corpus.json',
      seed: corpus.seed,
      createdAt: corpus.createdAt,
      memories: summary.memories,
      cases: summary.cases,
      train: summary.train,
      holdout: summary.holdout,
      splitRule: corpus.splitRule,
      byCategory: summary.byCategory
    },
    hardware: {
      platform: process.platform,
      arch: process.arch,
      node: process.version,
      cpu: os.cpus()[0]?.model ?? 'unknown',
      logicalCpus: os.cpus().length
    },
    embeddings: {
      requested: embeddings,
      provider: embeddings === 'minilm' ? 'Xenova/all-MiniLM-L6-v2' : 'feature-hash-384',
      modelId: provider.modelId,
      memoriesEmbedded: embedded
    },
    engines: engines.map((engine) => ({
      name: engine.name,
      description: engine.description,
      requiresEmbeddings: engine.requiresEmbeddings ?? false,
      embeddingModel: engine.embeddingModel ?? null,
      static: engine.static ?? false
    })),
    notMeasured,
    splits: results
  };

  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');
  console.log(
    `Wrote ${out}: ${summary.cases} cases (${summary.train} train / ${summary.holdout} holdout), ` +
      `${summary.memories} memories, commit ${payload.commit.slice(0, 7)}`
  );
  db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
