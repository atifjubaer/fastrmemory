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
import { searchMemories, type RetrievalConfig } from '../search/hybrid-rrf.js';
import type { PublicCase, PublicDataset } from './public-datasets.js';

export interface PublicEngine {
  name: string;
  retrieval: RetrievalConfig;
  requiresEmbeddings?: boolean;
  embeddingModel?: 'hash' | 'minilm';
}

export const PUBLIC_ENGINES: PublicEngine[] = [
  {
    name: 'bm25_only',
    retrieval: { enableBm25: true, enableVector: false, enableGraph: false, trapBoost: 1, verifiedBoost: 1 }
  },
  {
    name: 'full_hash',
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
  goldCount: number;
  retrieved: string[];
  goldIds: string[];
  tokens: number;
  latencyMs: number;
}

export interface PublicMetrics {
  count: number;
  hitAt1: number;
  hitAt5: number;
  hitAt10: number;
  mrr: number;
  evidenceRecallAt5: number;
  fullRecallAt5: number;
  avgTokens: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
}

export interface PublicCategoryMetrics extends PublicMetrics {
  category: string;
}

export interface PublicEngineEval {
  name: string;
  config: RetrievalConfig;
  overall: PublicMetrics;
  byCategory: PublicCategoryMetrics[];
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
  const results: PublicCaseResult[] = [];

  for (const item of selected) {
    const start = performance.now();
    const response = await searchMemories(db, {
      projectId: item.projectId,
      query: item.query,
      budgetTokens,
      limit: 10,
      backfill: false,
      retrieval: engine.retrieval
    });
    const latencyMs = performance.now() - start;
    results.push(
      caseResult(
        item,
        response.memories.map((memory) => memory.memory.id),
        response.totalTokens,
        latencyMs
      )
    );
  }

  const categories = Array.from(new Set(results.map((item) => item.category))).sort();
  return {
    name: engine.name,
    config: engine.retrieval,
    overall: metricsFromCases(results),
    byCategory: categories.map((category) => ({
      category,
      ...metricsFromCases(results.filter((item) => item.category === category))
    })),
    cases: results
  };
}
