import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { searchMemories, type RetrievalConfig } from '../search/hybrid-rrf.js';
import { estimateTokens } from '../search/budget.js';
import { backfillEmbeddings } from '../search/backfill.js';
import type { BenchCase, BenchCategory, BenchCorpus, BenchSplit } from './corpus.js';

export interface CorpusSetup {
  repo: FastrRepository;
  embedded: number;
}

/** Inserts the corpus into an isolated database. Never touches a user database. */
export function setupCorpusDatabase(
  db: DatabaseSync,
  corpus: BenchCorpus,
  projectId: string
): CorpusSetup {
  applySchema(db);
  const repo = new FastrRepository(db);

  const insertMemory = db.prepare(`
    INSERT OR REPLACE INTO memories
      (id, project_id, module, kind, title, content, status, reward_score,
       valid_from, valid_to, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertEntity = db.prepare(`
    INSERT OR REPLACE INTO entities (id, project_id, name, entity_type)
    VALUES (?, ?, ?, ?)
  `);
  const insertEdge = db.prepare(`
    INSERT OR REPLACE INTO graph_edges (id, project_id, source_id, target_id, edge_type, weight)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const memory of corpus.memories) {
    insertMemory.run(
      memory.id,
      projectId,
      memory.module,
      memory.kind,
      memory.title,
      memory.content,
      memory.status,
      memory.rewardScore,
      memory.validFrom,
      memory.validTo,
      memory.createdAt
    );

    if (memory.files.length > 0) {
      repo.linkFiles(memory.id, memory.files);
    }

    if (memory.entity) {
      insertEntity.run(memory.entity.id, projectId, memory.entity.name, memory.entity.type);
      insertEdge.run(
        `edge_${memory.id}_entity`,
        projectId,
        memory.id,
        memory.entity.id,
        'entity_link',
        1.0
      );
    }

    for (const edge of memory.graphEdges ?? []) {
      insertEdge.run(
        `edge_${memory.id}_${edge.targetId}`,
        projectId,
        memory.id,
        edge.targetId,
        edge.edgeType,
        edge.weight
      );
    }
  }

  return { repo, embedded: 0 };
}

/** Embeds the whole corpus with the currently available provider (hash by default). */
export async function embedCorpus(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string
): Promise<number> {
  const total = await backfillEmbeddings(db, repo, projectId, { limit: 1000 });
  return total;
}

export interface EvalMetrics {
  count: number;
  hitAt1: number;
  hitAt3: number;
  hitAt5: number;
  mrr: number;
  ndcgAt10: number;
  avgTokens: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
}

export interface Ci95 {
  low: number;
  high: number;
}

export interface CaseResult {
  caseId: string;
  category: BenchCategory;
  rank: number;
  reciprocalRank: number;
  ndcg: number;
  tokens: number;
  latencyMs: number;
}

export interface CategoryEval extends EvalMetrics {
  category: BenchCategory;
}

export interface EngineEval {
  name: string;
  split: BenchSplit;
  config: RetrievalConfig | { static: true };
  overall: EvalMetrics;
  ci95: {
    hitAt1: Ci95;
    hitAt5: Ci95;
    mrr: Ci95;
    avgTokens: Ci95;
  };
  byCategory: CategoryEval[];
  cases: CaseResult[];
}

export interface EngineDefinition {
  name: string;
  description: string;
  retrieval?: RetrievalConfig;
  static?: boolean;
  requiresEmbeddings?: boolean;
  /** Which vector provider this ablation needs when `requiresEmbeddings` is set. */
  embeddingModel?: 'hash' | 'minilm';
}

/**
 * The default comparison set. Names are neutral: these are ablations implemented in this
 * repository, not third-party products. No baseline is labeled as a real competitor.
 */
export const DEFAULT_ENGINES: EngineDefinition[] = [
  {
    name: 'bm25_only',
    description: 'Weighted FTS5 BM25, no vector stream, no graph stream, no ranking boosts.',
    retrieval: { enableBm25: true, enableVector: false, enableGraph: false, trapBoost: 1, verifiedBoost: 1 }
  },
  {
    name: 'bm25_hash',
    description: 'BM25 plus the offline feature-hash vector stream, no graph stream or boosts.',
    retrieval: { enableBm25: true, enableVector: true, enableGraph: false, trapBoost: 1, verifiedBoost: 1 },
    requiresEmbeddings: true,
    embeddingModel: 'hash'
  },
  {
    name: 'bm25_minilm',
    description: 'BM25 plus local MiniLM semantic vectors, no graph stream or boosts.',
    retrieval: { enableBm25: true, enableVector: true, enableGraph: false, trapBoost: 1, verifiedBoost: 1 },
    requiresEmbeddings: true,
    embeddingModel: 'minilm'
  },
  {
    name: 'bm25_graph',
    description: 'BM25 plus file/entity graph activation, no vector stream or boosts.',
    retrieval: { enableBm25: true, enableVector: false, enableGraph: true, trapBoost: 1, verifiedBoost: 1 }
  },
  {
    name: 'full_hash',
    description: 'BM25 + hash vectors + graph + conditional trap/verified boosts, candidate graph seeding off.',
    retrieval: {
      enableBm25: true,
      enableVector: true,
      enableGraph: true,
      graphSeedFromCandidates: false,
      trapBoost: 2.0,
      trapBoostMode: 'conditional',
      verifiedBoost: 1.25
    },
    requiresEmbeddings: true,
    embeddingModel: 'hash'
  },
  {
    name: 'full_minilm',
    description: 'BM25 + MiniLM vectors + graph + conditional trap/verified boosts, candidate graph seeding off.',
    retrieval: {
      enableBm25: true,
      enableVector: true,
      enableGraph: true,
      graphSeedFromCandidates: false,
      trapBoost: 2.0,
      trapBoostMode: 'conditional',
      verifiedBoost: 1.25
    },
    requiresEmbeddings: true,
    embeddingModel: 'minilm'
  },
  {
    name: 'no_graph',
    description: 'BM25 + hash vectors + boosts, graph stream disabled.',
    retrieval: {
      enableBm25: true,
      enableVector: true,
      enableGraph: false,
      trapBoost: 2.0,
      trapBoostMode: 'conditional',
      verifiedBoost: 1.25
    },
    requiresEmbeddings: true,
    embeddingModel: 'hash'
  },
  {
    name: 'no_trap',
    description: 'BM25 + hash vectors + graph, trap boost disabled.',
    retrieval: {
      enableBm25: true,
      enableVector: true,
      enableGraph: true,
      graphSeedFromCandidates: false,
      trapBoost: 1.0,
      verifiedBoost: 1.25
    },
    requiresEmbeddings: true,
    embeddingModel: 'hash'
  },
  {
    name: 'static_dump',
    description: 'All active memories in creation order; the full dump is counted in tokens.',
    static: true
  }
];

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[index];
}

function round(value: number, digits: number): number {
  return Number(value.toFixed(digits));
}

function metricsFromCases(cases: CaseResult[]): EvalMetrics {
  const n = cases.length;
  if (n === 0) {
    return {
      count: 0,
      hitAt1: 0,
      hitAt3: 0,
      hitAt5: 0,
      mrr: 0,
      ndcgAt10: 0,
      avgTokens: 0,
      p50LatencyMs: 0,
      p95LatencyMs: 0
    };
  }
  const hit1 = cases.filter((c) => c.rank === 1).length;
  const hit3 = cases.filter((c) => c.rank > 0 && c.rank <= 3).length;
  const hit5 = cases.filter((c) => c.rank > 0 && c.rank <= 5).length;
  const mrr = cases.reduce((sum, c) => sum + c.reciprocalRank, 0) / n;
  const ndcg = cases.reduce((sum, c) => sum + c.ndcg, 0) / n;
  const tokens = cases.reduce((sum, c) => sum + c.tokens, 0) / n;
  const latencies = cases.map((c) => c.latencyMs);
  return {
    count: n,
    hitAt1: round((hit1 / n) * 100, 1),
    hitAt3: round((hit3 / n) * 100, 1),
    hitAt5: round((hit5 / n) * 100, 1),
    mrr: round(mrr, 3),
    ndcgAt10: round(ndcg, 3),
    avgTokens: Math.round(tokens),
    p50LatencyMs: round(percentile(latencies, 50), 2),
    p95LatencyMs: round(percentile(latencies, 95), 2)
  };
}

/** Deterministic mulberry32 PRNG so bootstrap CIs are reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function bootstrapMeanCi(values: number[], seed: number, iterations = 1000): Ci95 {
  if (values.length === 0) return { low: 0, high: 0 };
  const rng = mulberry32(seed);
  const means: number[] = [];
  for (let i = 0; i < iterations; i++) {
    let sum = 0;
    for (let j = 0; j < values.length; j++) {
      sum += values[Math.floor(rng() * values.length)];
    }
    means.push(sum / values.length);
  }
  means.sort((a, b) => a - b);
  const low = means[Math.floor(means.length * 0.025)];
  const high = means[Math.min(means.length - 1, Math.floor(means.length * 0.975))];
  return { low: round(low, 3), high: round(high, 3) };
}

function computeCi(cases: CaseResult[], seed: number): EngineEval['ci95'] {
  return {
    hitAt1: bootstrapMeanCi(cases.map((c) => (c.rank === 1 ? 1 : 0)), seed),
    hitAt5: bootstrapMeanCi(cases.map((c) => (c.rank > 0 && c.rank <= 5 ? 1 : 0)), seed + 1),
    mrr: bootstrapMeanCi(cases.map((c) => c.reciprocalRank), seed + 2),
    avgTokens: bootstrapMeanCi(cases.map((c) => c.tokens), seed + 3)
  };
}

function categoryEvaluations(cases: CaseResult[]): CategoryEval[] {
  const categories = Array.from(new Set(cases.map((c) => c.category))) as BenchCategory[];
  return categories.map((category) => ({
    category,
    ...metricsFromCases(cases.filter((c) => c.category === category))
  }));
}

function caseResult(c: BenchCase, ids: string[], tokens: number, latencyMs: number): CaseResult {
  const index = ids.indexOf(c.expectedMemoryId);
  const rank = index >= 0 ? index + 1 : 0;
  return {
    caseId: c.id,
    category: c.category,
    rank,
    reciprocalRank: rank > 0 && rank <= 10 ? 1 / rank : 0,
    ndcg: rank > 0 && rank <= 10 ? 1 / Math.log2(rank + 1) : 0,
    tokens,
    latencyMs
  };
}

export async function evaluateSearchEngine(
  db: DatabaseSync,
  projectId: string,
  corpus: BenchCorpus,
  split: BenchSplit,
  engine: EngineDefinition,
  limit = 5
): Promise<EngineEval> {
  const selected = corpus.cases.filter((c) => c.split === split);
  const results: CaseResult[] = [];

  for (const c of selected) {
    const start = performance.now();
    const response = await searchMemories(db, {
      projectId,
      query: c.query,
      files: c.file ? [c.file] : [],
      budgetTokens: 250,
      limit,
      backfill: false,
      retrieval: engine.retrieval
    });
    const latencyMs = performance.now() - start;
    results.push(
      caseResult(
        c,
        response.memories.map((m) => m.memory.id),
        response.totalTokens,
        latencyMs
      )
    );
  }

  return {
    name: engine.name,
    split,
    config: engine.retrieval ?? { static: true },
    overall: metricsFromCases(results),
    ci95: computeCi(results, corpus.seed + (split === 'holdout' ? 1000 : 0)),
    byCategory: categoryEvaluations(results),
    cases: results
  };
}

export function evaluateStaticDump(
  db: DatabaseSync,
  projectId: string,
  corpus: BenchCorpus,
  split: BenchSplit,
  limit = 10
): EngineEval {
  const selected = corpus.cases.filter((c) => c.split === split);
  const dump = db.prepare(`
    SELECT id, title, content FROM memories
    WHERE project_id = ?
      AND valid_to IS NULL
      AND status NOT IN ('superseded', 'dormant')
    ORDER BY created_at DESC, id ASC
  `).all(projectId) as unknown as Array<{ id: string; title: string; content: string }>;

  const dumpTokens = dump.reduce((sum, row) => sum + estimateTokens(`${row.title}\n${row.content}\n`), 0);
  const ids = dump.slice(0, limit).map((row) => row.id);
  const results = selected.map((c) => caseResult(c, ids, dumpTokens, 0));

  return {
    name: 'static_dump',
    split,
    config: { static: true },
    overall: metricsFromCases(results),
    ci95: computeCi(results, corpus.seed + (split === 'holdout' ? 1000 : 0)),
    byCategory: categoryEvaluations(results),
    cases: results
  };
}

export async function evaluateEngine(
  db: DatabaseSync,
  projectId: string,
  corpus: BenchCorpus,
  split: BenchSplit,
  engine: EngineDefinition
): Promise<EngineEval> {
  if (engine.static) {
    return evaluateStaticDump(db, projectId, corpus, split);
  }
  return evaluateSearchEngine(db, projectId, corpus, split, engine);
}
