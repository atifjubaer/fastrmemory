/**
 * P1a validation gate: is the pure-TS static model (model2vec potion-base-8M) a viable
 * semantic tier?
 *
 * The gate answers four questions before any default changes:
 *   1. Does the TypeScript tokenizer reproduce the HuggingFace `tokenizers` output exactly?
 *   2. Does the safetensors reader + mean pooling reproduce the reference embeddings?
 *   3. Is load time and embedding throughput good enough for async backfill?
 *   4. Does the semantic stream improve retrieval on the dev split, and by how much?
 *
 * Run: npx tsx scripts/gate-static-model.ts [--split dev|test|all]
 * Requires bench/external/potion-base-8M (30 MB, gitignored) and the pinned LongMemEval file.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import {
  loadStaticModel,
  POTION_BASE_8M,
  readSafetensorsTensor
} from '../src/search/static-model.js';
import {
  EMBEDDING_MODEL_IDS,
  encodeTaggedEmbedding,
  setStaticModel
} from '../src/search/embeddings.js';
import {
  evaluatePublicEngine,
  loadPublicDataset,
  PUBLIC_ENGINES,
  type PublicEngine
} from '../src/bench/public-harness.js';
import { parseLongMemEval, type PublicDataset } from '../src/bench/public-datasets.js';
import { PUBLIC_DATASET_PINS, readJson, verifyDatasetPin } from '../src/bench/public-pins.js';
import { selectSplit, slicePerType, type BenchSplitName } from '../src/bench/split.js';

const MODEL_DIR = path.join(process.cwd(), 'bench', 'external', 'potion-base-8M');
const TOKENIZER_GOLDEN = path.join(process.cwd(), 'bench', 'fixtures', 'potion-golden.json');
const EMBEDDING_GOLDEN = path.join(process.cwd(), 'bench', 'external', 'potion-embeddings-golden.json');

function sha256(file: string): string {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function splitArg(): BenchSplitName | 'all' {
  const index = process.argv.indexOf('--split');
  const value = index >= 0 ? process.argv[index + 1] : 'dev';
  if (value !== 'dev' && value !== 'test' && value !== 'all') {
    throw new Error('--split must be dev, test, or all');
  }
  return value;
}

function verifyFiles(): { loadMs: number } {
  const modelPath = path.join(MODEL_DIR, POTION_BASE_8M.modelFile);
  const tokenizerPath = path.join(MODEL_DIR, POTION_BASE_8M.tokenizerFile);
  if (!fs.existsSync(modelPath) || !fs.existsSync(tokenizerPath)) {
    throw new Error(
      `Model files missing in ${MODEL_DIR}. Download them from ${POTION_BASE_8M.name}@${POTION_BASE_8M.revision}.`
    );
  }
  const modelBytes = fs.statSync(modelPath).size;
  if (modelBytes !== POTION_BASE_8M.modelBytes) {
    throw new Error(`model.safetensors is ${modelBytes} bytes, expected ${POTION_BASE_8M.modelBytes}`);
  }
  const modelHash = sha256(modelPath);
  if (modelHash !== POTION_BASE_8M.modelSha256) {
    throw new Error(`model.safetensors sha256 ${modelHash} does not match the pin`);
  }
  const tokenizerHash = sha256(tokenizerPath);
  if (tokenizerHash !== POTION_BASE_8M.tokenizerSha256) {
    throw new Error(`tokenizer.json sha256 ${tokenizerHash} does not match the pin`);
  }
  return { loadMs: 0 };
}

function checkTokenizer(model: ReturnType<typeof loadStaticModel>): void {
  const golden = JSON.parse(fs.readFileSync(TOKENIZER_GOLDEN, 'utf8')) as {
    cases: Array<{ text: string; ids: number[] }>;
  };
  let checked = 0;
  for (const item of golden.cases) {
    const ids = model.tokenize(item.text);
    if (ids.length !== item.ids.length || ids.some((id, index) => id !== item.ids[index])) {
      throw new Error(
        `tokenizer mismatch for ${JSON.stringify(item.text)}\n` +
          `  expected ${item.ids.slice(0, 24).join(',')}\n` +
          `  actual   ${ids.slice(0, 24).join(',')}`
      );
    }
    checked++;
  }
  console.log(`tokenizer: ${checked}/${golden.cases.length} cases match the HuggingFace reference exactly`);
}

function checkEmbeddings(model: ReturnType<typeof loadStaticModel>): void {
  if (!fs.existsSync(EMBEDDING_GOLDEN)) {
    console.log('embeddings: golden file missing, skipping reference comparison');
    return;
  }
  const golden = JSON.parse(fs.readFileSync(EMBEDDING_GOLDEN, 'utf8')) as {
    cases: Array<{ text: string; embedding: number[] }>;
  };
  let maxAbs = 0;
  let minCosine = 1;
  for (const item of golden.cases) {
    const vec = model.embed(item.text);
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < item.embedding.length; i++) {
      const delta = Math.abs(vec[i] - item.embedding[i]);
      if (delta > maxAbs) maxAbs = delta;
      dot += vec[i] * item.embedding[i];
      normA += vec[i] * vec[i];
      normB += item.embedding[i] * item.embedding[i];
    }
    const cosine = normA > 0 && normB > 0 ? dot / Math.sqrt(normA * normB) : 0;
    if (cosine < minCosine) minCosine = cosine;
  }
  console.log(
    `embeddings: ${golden.cases.length} cases, max abs diff ${maxAbs.toExponential(2)}, min cosine ${minCosine.toFixed(8)}`
  );
}

function measureThroughput(model: ReturnType<typeof loadStaticModel>, texts: string[]): void {
  for (const text of texts.slice(0, 20)) model.embed(text);
  const start = performance.now();
  const runs = 3;
  for (let run = 0; run < runs; run++) {
    for (const text of texts) model.embed(text);
  }
  const elapsed = performance.now() - start;
  const perDoc = elapsed / (texts.length * runs);
  console.log(
    `throughput: ${texts.length} docs x ${runs} runs -> ${perDoc.toFixed(3)} ms/doc (${Math.round(1000 / perDoc)} docs/s)`
  );
}

function qualityPairs(model: ReturnType<typeof loadStaticModel>): void {
  const pairs: Array<[string, string, string]> = [
    ['Where do I live?', 'I moved to Berlin last spring and rent a flat there.', 'The database migration runs at midnight.'],
    ['What did I decide about the payment provider?', 'We chose Stripe for payments after comparing fees.', 'The CSS grid layout uses twelve columns.'],
    ['When is my sister’s birthday?', 'My sister was born on March 3rd, 1994.', 'The CI pipeline caches node_modules.']
  ];
  for (const [query, related, unrelated] of pairs) {
    const q = model.embed(query);
    const a = model.embed(related);
    const b = model.embed(unrelated);
    const dot = (x: Float32Array, y: Float32Array) => x.reduce((sum, value, i) => sum + value * y[i], 0);
    console.log(
      `sanity: "${query}" -> related ${dot(q, a).toFixed(3)} vs unrelated ${dot(q, b).toFixed(3)}`
    );
  }
}

function engine(name: string, retrieval: PublicEngine['retrieval']): PublicEngine {
  return { name, retrieval, requiresEmbeddings: true, embeddingModel: 'potion' };
}

/** Wilson score interval for a binomial proportion, in percentage points. */
function wilson(successes: number, n: number, z = 1.96): [number, number] {
  if (n === 0) return [0, 0];
  const p = successes / n;
  const denom = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / denom;
  const spread = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / denom;
  return [
    Math.round(Math.max(0, center - spread) * 1000) / 10,
    Math.round(Math.min(1, center + spread) * 1000) / 10
  ];
}

interface GateRow {
  engine: string;
  blend: number | null;
  n: number;
  hitAt1: number;
  hitAt5: number;
  mrr: number;
  p50Ms: number;
  hitAt1Ci: [number, number];
  fixed: number;
  broken: number;
  perType: Record<string, number>;
  backfillMsPerDoc: number | null;
}

async function evaluateVariants(
  dataset: PublicDataset,
  model: ReturnType<typeof loadStaticModel>,
  variants: Array<{ name: string; text: (memory: PublicDataset['memories'][number]) => string; blends?: number[] }>
): Promise<GateRow[]> {
  const rows: GateRow[] = [];
  const bm25 = PUBLIC_ENGINES.find((item) => item.name === 'bm25_only')!;
  const bm25Loaded = loadPublicDataset(dataset);
  const bm25Eval = await evaluatePublicEngine(bm25Loaded.db, dataset, bm25);
  bm25Loaded.db.close();
  console.log(
    `\nbm25_only (n=${bm25Eval.overall.count}): Hit@1 ${bm25Eval.overall.hitAt1}% | Hit@5 ${bm25Eval.overall.hitAt5}% | MRR ${bm25Eval.overall.mrr}`
  );
  rows.push({
    engine: 'bm25_only',
    blend: null,
    n: bm25Eval.overall.count,
    hitAt1: bm25Eval.overall.hitAt1,
    hitAt5: bm25Eval.overall.hitAt5,
    mrr: bm25Eval.overall.mrr,
    p50Ms: bm25Eval.overall.p50LatencyMs,
    hitAt1Ci: wilson(Math.round((bm25Eval.overall.hitAt1 / 100) * bm25Eval.overall.count), bm25Eval.overall.count),
    fixed: 0,
    broken: 0,
    perType: Object.fromEntries(bm25Eval.byCategory.map((cell) => [cell.category, cell.hitAt1])),
    backfillMsPerDoc: null
  });

  for (const variant of variants) {
    const loaded = loadPublicDataset(dataset);
    const started = performance.now();
    for (const memory of dataset.memories) {
      const vec = model.embed(variant.text(memory));
      loaded.repo.updateEmbedding(memory.id, encodeTaggedEmbedding(vec, EMBEDDING_MODEL_IDS.STATIC_POTION_256));
    }
    const backfillMs = performance.now() - started;
    const perDoc = backfillMs / Math.max(1, dataset.memories.length);

    for (const blend of variant.blends ?? [0.15]) {
      const result = await evaluatePublicEngine(loaded.db, dataset, engine(`bm25_${variant.name}`, {
        enableBm25: true,
        vectorMode: 'semantic',
        enableGraph: false,
        trapBoost: 1,
        verifiedBoost: 1,
        staticBlendWeight: blend
      }));

      const delta = Number((result.overall.hitAt1 - bm25Eval.overall.hitAt1).toFixed(1));
      const mrrDelta = Number((result.overall.mrr - bm25Eval.overall.mrr).toFixed(3));
      const changed = result.cases.filter((item) => item.hitAt1 !== bm25Eval.cases.find((base) => base.caseId === item.caseId)?.hitAt1);
      const improved = changed.filter((item) => item.hitAt1 && !bm25Eval.cases.find((base) => base.caseId === item.caseId)?.hitAt1).length;
      const degraded = changed.length - improved;
      const successes = Math.round((result.overall.hitAt1 / 100) * result.overall.count);
      console.log(
        `bm25_${variant.name} blend=${blend} (n=${result.overall.count}, ${perDoc.toFixed(3)} ms/doc): ` +
          `Hit@1 ${result.overall.hitAt1}% (${delta >= 0 ? '+' : ''}${delta} pp) | ` +
          `Hit@5 ${result.overall.hitAt5}% | MRR ${result.overall.mrr} (${mrrDelta >= 0 ? '+' : ''}${mrrDelta}) | ` +
          `p50 ${result.overall.p50LatencyMs} ms | ${improved} fixed / ${degraded} broken | ` +
          `CI ${wilson(successes, result.overall.count).join('..')}`
      );
      rows.push({
        engine: `bm25_${variant.name}`,
        blend,
        n: result.overall.count,
        hitAt1: result.overall.hitAt1,
        hitAt5: result.overall.hitAt5,
        mrr: result.overall.mrr,
        p50Ms: result.overall.p50LatencyMs,
        hitAt1Ci: wilson(successes, result.overall.count),
        fixed: improved,
        broken: degraded,
        perType: Object.fromEntries(result.byCategory.map((cell) => [cell.category, cell.hitAt1])),
        backfillMsPerDoc: Number(perDoc.toFixed(3))
      });
    }

    const byCategory = (await evaluatePublicEngine(loaded.db, dataset, engine(`bm25_${variant.name}`, {
      enableBm25: true,
      vectorMode: 'semantic',
      enableGraph: false,
      trapBoost: 1,
      verifiedBoost: 1
    }))).byCategory.map((cell) => `${cell.category} ${cell.hitAt1}%`).join(' | ');
    console.log(`  by type @0.15: ${byCategory}`);
    loaded.db.close();
  }

  return rows;
}

async function main(): Promise<void> {
  const started = performance.now();
  verifyFiles();
  const model = loadStaticModel(MODEL_DIR);
  const loadMs = performance.now() - started;
  console.log(
    `loaded ${model.name} in ${loadMs.toFixed(0)} ms: ${model.vocabSize} x ${model.dim} float32 ` +
      `(${(POTION_BASE_8M.modelBytes / 1_000_000).toFixed(1)} MB)`
  );

  checkTokenizer(model);
  checkEmbeddings(model);
  qualityPairs(model);

  const split = splitArg();
  const pin = PUBLIC_DATASET_PINS.longmemeval;
  const file = path.join(process.cwd(), 'bench', 'data', pin.file);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${file}; download the pinned LongMemEval file first.`);
  }
  verifyDatasetPin(pin, file, false);
  const full = parseLongMemEval(readJson(file));
  let dataset: PublicDataset = { ...full, cases: slicePerType(full.cases, 20) };
  if (split !== 'all') {
    dataset = { ...dataset, cases: selectSplit(dataset.cases, split) };
  }
  const projects = new Set(dataset.cases.map((item) => item.projectId));
  dataset = { ...dataset, memories: dataset.memories.filter((memory) => projects.has(memory.projectId)) };
  console.log(`\nLongMemEval slice: ${dataset.cases.length} cases, ${dataset.memories.length} memories, split=${split}`);

  measureThroughput(model, dataset.memories.map((memory) => memory.content));
  setStaticModel(model);

  const rows = await evaluateVariants(dataset, model, [
    { name: 'potion_title', text: (memory) => `${memory.title}. module: public_bench` },
    {
      name: 'potion_title_content',
      text: (memory) => `${memory.title}\n${memory.content}`,
      blends: [0.1, 0.15, 0.3, 0.6, 1.0]
    },
    { name: 'potion_content', text: (memory) => memory.content }
  ]);

  const out = path.join(process.cwd(), 'bench', 'results', `static-model-gate-${split}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    model: {
      name: POTION_BASE_8M.name,
      revision: POTION_BASE_8M.revision,
      dim: POTION_BASE_8M.dim,
      bytes: POTION_BASE_8M.modelBytes,
      sha256: POTION_BASE_8M.modelSha256
    },
    dataset: {
      name: 'longmemeval_s_cleaned',
      revision: PUBLIC_DATASET_PINS.longmemeval.revision,
      sha256: PUBLIC_DATASET_PINS.longmemeval.sha256,
      slicePerType: 20,
      split,
      cases: dataset.cases.length,
      memories: dataset.memories.length
    },
    metric: 'Hit@1 over 60 dev / 60 test cases; 95% CI is Wilson on the binomial count',
    rows
  }, null, 2)}\n`, 'utf8');
  console.log(`\nwrote ${out}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
