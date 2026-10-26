/**
 * Benchmark harness for public datasets and real-repository history.
 *
 * Retrieval is measured in-process against one isolated database. We report ranked retrieval
 * metrics (Hit@k, MRR, evidence recall) and never claim answer quality: the datasets' answers
 * are not generated or scored here.
 */

import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { backfillEmbeddings } from '../search/backfill.js';
import { drainFtsQueue } from '../db/fts-queue.js';
import { searchMemories, type RetrievalConfig } from '../search/hybrid-rrf.js';
import type { PublicCase, PublicDataset } from './public-datasets.js';

export interface PublicEngine {
  name: string;
  retrieval: RetrievalConfig;
  requiresEmbeddings?: boolean;
  embeddingModel?: 'hash' | 'minilm';
  /** Result depth the engine returns (default 10). */
  limit?: number;
}

export const PUBLIC_ENGINES: PublicEngine[] = [
  {
    name: 'bm25_only',
    retrieval: {
      enableBm25: true,
      enableVector: false,
      enableGraph: false,
      trapBoost: 1,
      verifiedBoost: 1,
      aggregateCoverage: false
    }
  },
  {
    // Same first stage, plus the parsed date window as a pre-ranking filter.
    name: 'bm25_temporal',
    retrieval: {
      enableBm25: true,
      enableVector: false,
      enableGraph: false,
      trapBoost: 1,
      verifiedBoost: 1,
      temporalFilter: true,
      aggregateCoverage: false
    }
  },
  {
    // Counting questions search with their content terms only and return the full set.
    name: 'bm25_aggregate',
    retrieval: {
      enableBm25: true,
      enableVector: false,
      enableGraph: false,
      trapBoost: 1,
      verifiedBoost: 1,
      aggregateCoverage: true,
      aggregateLimit: 20
    }
  },
  {
    // Both stages: the window removes out-of-range rows, the aggregate pass removes
    // scaffolding from the lexical query.
    name: 'bm25_temporal_aggregate',
    retrieval: {
      enableBm25: true,
      enableVector: false,
      enableGraph: false,
      trapBoost: 1,
      verifiedBoost: 1,
      temporalFilter: true,
      aggregateCoverage: true,
      aggregateLimit: 20
    }
  },
  {
    // The shipped default after P0: full pipeline, vector stream off unless a semantic
    // provider is loaded. This is what a user gets with no configuration at all.
    name: 'default_config',
    retrieval: {}
  },
  {
    name: 'full_hash',
    retrieval: {
      enableBm25: true,
      vectorMode: 'hash',
      enableGraph: true,
      graphSeedFromCandidates: false,
      trapBoost: 2.0,
      trapBoostMode: 'conditional',
      verifiedBoost: 1.25,
      aggregateCoverage: false
    },
    requiresEmbeddings: true,
    embeddingModel: 'hash'
  },
  {
    name: 'full_minilm',
    retrieval: {
      enableBm25: true,
      vectorMode: 'semantic',
      enableGraph: true,
      graphSeedFromCandidates: false,
      trapBoost: 2.0,
      trapBoostMode: 'conditional',
      verifiedBoost: 1.25,
      aggregateCoverage: false
    },
    requiresEmbeddings: true,
    embeddingModel: 'minilm'
  }
];

export interface PublicCaseResult {
  caseId: string;
  category: string;
  projectId: string;
  rank: number;
  reciprocalRank: number;
  hitAt1: number;
  hitAt5: number;
  hitAt10: number;
  recallAt5: number;
  fullRecallAt5: number;
  /** Strict@10: every gold id is present in the top 10. */
  fullRecallAt10: number;
  goldCount: number;
  retrieved: string[];
  goldIds: string[];
  tokens: number;
  latencyMs: number;
  /** Parsed temporal window applied to this case, when the engine used one. */
  temporalWindow?: string;
  temporalFallback?: boolean;
}

export interface PublicMetrics {
  count: number;
  hitAt1: number;
  hitAt5: number;
  hitAt10: number;
  mrr: number;
  evidenceRecallAt5: number;
  fullRecallAt5: number;
  /** Strict@10 = all gold ids in the top 10, averaged over cases. */
  fullRecallAt10: number;
  avgTokens: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
}

export interface PublicCategoryMetrics extends PublicMetrics {
  category: string;
}

/** Metrics restricted to cases with an exact gold count (the aggregate-question slice). */
export interface PublicGoldBucket extends PublicMetrics {
  goldCount: number;
}

export interface PublicEngineEval {
  name: string;
  config: RetrievalConfig;
  overall: PublicMetrics;
  byCategory: PublicCategoryMetrics[];
  byGoldCount: PublicGoldBucket[];
  cases: PublicCaseResult[];
}

export interface PublicHarnessOptions {
  limit?: number;
  budgetTokens?: number;
  embeddingsLoaded?: boolean;
}

export function loadPublicDataset(dataset: PublicDataset): { db: DatabaseSync; repo: FastrRepository } {
  const db = new DatabaseSync(':memory:');
  applySchema(db);
  const repo = new FastrRepository(db);
  const insert = db.prepare(`
    INSERT OR REPLACE INTO memories
      (id, project_id, module, kind, title, content, status, reward_score,
       valid_from, valid_to, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec('BEGIN');
  try {
    for (const memory of dataset.memories) {
      insert.run(
        memory.id,
        memory.projectId,
        'public_bench',
        'workflow',
        memory.title,
        memory.content,
        'verified',
        1.0,
        memory.validFrom,
        null,
        memory.validFrom
      );
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }

  // Seeding is not timed; index everything so the first measured query is a warm query.
  drainFtsQueue(db, { limit: 1_000_000, schema: 'main' });

  return { db, repo };
}

export async function prepareEmbeddings(
  db: DatabaseSync,
  repo: FastrRepository,
  dataset: PublicDataset,
  engine: PublicEngine
): Promise<number> {
  if (!engine.requiresEmbeddings) return 0;
  let embedded = 0;
  const projectIds = Array.from(new Set(dataset.cases.map((item) => item.projectId)));
  for (const projectId of projectIds) {
    embedded += await backfillEmbeddings(db, repo, projectId, { limit: 1_000_000 });
  }
  return embedded;
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[index];
}

function round(value: number, digits: number): number {
  return Number(value.toFixed(digits));
}

export function metricsFromCases(cases: PublicCaseResult[]): PublicMetrics {
  const count = cases.length;
  if (count === 0) {
    return {
      count: 0,
      hitAt1: 0,
      hitAt5: 0,
      hitAt10: 0,
      mrr: 0,
      evidenceRecallAt5: 0,
      fullRecallAt5: 0,
      fullRecallAt10: 0,
      avgTokens: 0,
      p50LatencyMs: 0,
      p95LatencyMs: 0
    };
  }
  const latencies = cases.map((item) => item.latencyMs);
  return {
    count,
    hitAt1: round((cases.reduce((sum, item) => sum + item.hitAt1, 0) / count) * 100, 1),
    hitAt5: round((cases.reduce((sum, item) => sum + item.hitAt5, 0) / count) * 100, 1),
    hitAt10: round((cases.reduce((sum, item) => sum + item.hitAt10, 0) / count) * 100, 1),
    mrr: round(cases.reduce((sum, item) => sum + item.reciprocalRank, 0) / count, 3),
    evidenceRecallAt5: round(cases.reduce((sum, item) => sum + item.recallAt5, 0) / count, 3),
    fullRecallAt5: round((cases.reduce((sum, item) => sum + item.fullRecallAt5, 0) / count) * 100, 1),
    fullRecallAt10: round((cases.reduce((sum, item) => sum + item.fullRecallAt10, 0) / count) * 100, 1),
    avgTokens: Math.round(cases.reduce((sum, item) => sum + item.tokens, 0) / count),
    p50LatencyMs: round(percentile(latencies, 50), 2),
    p95LatencyMs: round(percentile(latencies, 95), 2)
  };
}

export function caseResult(
  item: PublicCase,
  retrieved: string[],
  tokens: number,
  latencyMs: number
): PublicCaseResult {
  const gold = new Set(item.goldIds);
  const rankIndex = retrieved.findIndex((id) => gold.has(id));
  const rank = rankIndex >= 0 ? rankIndex + 1 : 0;
  const top5 = retrieved.slice(0, 5);
  const foundAt5 = top5.filter((id) => gold.has(id)).length;
  const recallAt5 = gold.size === 0 ? 0 : foundAt5 / gold.size;
  const foundAt10 = retrieved.slice(0, 10).filter((id) => gold.has(id)).length;
  const fullRecallAt10 = gold.size > 0 && foundAt10 === gold.size ? 1 : 0;
  return {
    caseId: item.id,
    category: item.category,
    projectId: item.projectId,
    rank,
    reciprocalRank: rank > 0 && rank <= 10 ? 1 / rank : 0,
    hitAt1: rank === 1 ? 1 : 0,
    hitAt5: rank > 0 && rank <= 5 ? 1 : 0,
    hitAt10: rank > 0 && rank <= 10 ? 1 : 0,
    recallAt5: round(recallAt5, 3),
    fullRecallAt5: recallAt5 === 1 ? 1 : 0,
    fullRecallAt10,
    goldCount: item.goldIds.length,
    retrieved,
    goldIds: item.goldIds,
    tokens,
    latencyMs: round(latencyMs, 2)
  };
}

export async function evaluatePublicEngine(
  db: DatabaseSync,
  dataset: PublicDataset,
  engine: PublicEngine,
  options: PublicHarnessOptions = {}
): Promise<PublicEngineEval> {
  const selected = options.limit ? dataset.cases.slice(0, options.limit) : dataset.cases;
  const budgetTokens = options.budgetTokens ?? 1_000_000;
  const resultLimit = engine.limit ?? 10;
  const results: PublicCaseResult[] = [];

  for (const item of selected) {
    const start = performance.now();
    const response = await searchMemories(db, {
      projectId: item.projectId,
      query: item.query,
      budgetTokens,
      limit: resultLimit,
      backfill: false,
      retrieval: { ...engine.retrieval, questionDate: item.questionDate }
    });
    const latencyMs = performance.now() - start;
    const caseRow = caseResult(
      item,
      response.memories.map((memory) => memory.memory.id),
      response.totalTokens,
      latencyMs
    );
    if (response.temporalWindow) {
      caseRow.temporalWindow = response.temporalWindow.label;
      caseRow.temporalFallback = response.temporalFallback === true;
    }
    results.push(caseRow);
  }

  const categories = Array.from(new Set(results.map((item) => item.category))).sort();
  const goldCounts = Array.from(new Set(results.map((item) => item.goldCount))).sort((a, b) => a - b);
  return {
    name: engine.name,
    config: engine.retrieval,
    overall: metricsFromCases(results),
    byCategory: categories.map((category) => ({
      category,
      ...metricsFromCases(results.filter((item) => item.category === category))
    })),
    byGoldCount: goldCounts.map((goldCount) => ({
      goldCount,
      ...metricsFromCases(results.filter((item) => item.goldCount === goldCount))
    })),
    cases: results
  };
}
