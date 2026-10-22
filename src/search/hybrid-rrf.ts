import { DatabaseSync } from 'node:sqlite';
import { Memory } from '../db/schema.js';
import {
  cosineSimilarity,
  decodeTaggedEmbedding,
  EMBEDDING_MODEL_IDS,
  getProviderForModel,
  VECTOR_SIMILARITY_THRESHOLDS,
  warmupEmbeddingModel
} from './embeddings.js';
import { scheduleBackfill } from './backfill.js';
import { packMemoriesIntoBudget, ScoredMemory, TOKEN_LEVELS } from './budget.js';
import { extractEntities } from '../learn/ner.js';

interface ConflictRow {
  id: number;
  memory_a_id: string;
  memory_b_id: string;
  reason: string;
  score: number;
  a_title: string | null;
  b_title: string | null;
}

/**
 * Annotate ranked results with open contradictions. Both sides are marked when both are
 * present, so an agent sees the warning regardless of which rule it recalls first.
 */
function attachConflictMarkers(db: DatabaseSync, projectId: string, scored: ScoredMemory[]): void {
  if (scored.length === 0) return;

  const byId = new Map(scored.map((result) => [result.memory.id, result]));
  const ids = [...byId.keys()];
  const chunkSize = 400;

  for (let start = 0; start < ids.length; start += chunkSize) {
    const chunk = ids.slice(start, start + chunkSize);
    const placeholders = chunk.map(() => '?').join(',');
    let rows: ConflictRow[];

    try {
      rows = db.prepare(`
        SELECT c.id, c.memory_a_id, c.memory_b_id, c.reason, c.score,
               ma.title AS a_title, mb.title AS b_title
        FROM memory_conflicts c
        LEFT JOIN memories ma ON ma.id = c.memory_a_id
        LEFT JOIN memories mb ON mb.id = c.memory_b_id
        WHERE c.project_id = ? AND c.status = 'open'
          AND (c.memory_a_id IN (${placeholders}) OR c.memory_b_id IN (${placeholders}))
        ORDER BY c.id DESC
      `).all(projectId, ...chunk, ...chunk) as unknown as ConflictRow[];
    } catch {
      // Older databases without the conflict table still return normal recall results.
      return;
    }

    for (const row of rows) {
      const a = byId.get(row.memory_a_id);
      const b = byId.get(row.memory_b_id);

      if (a && !a.conflict) {
        a.conflict = {
          conflictId: row.id,
          withMemoryId: row.memory_b_id,
          withTitle: row.b_title ?? row.memory_b_id,
          reason: row.reason,
          score: row.score
        };
      }
      if (b && !b.conflict) {
        b.conflict = {
          conflictId: row.id,
          withMemoryId: row.memory_a_id,
          withTitle: row.a_title ?? row.memory_a_id,
          reason: row.reason,
          score: row.score
        };
      }
    }
  }
}

export interface StreamWeights {
  bm25?: number;
  vector?: number;
  graph?: number;
}

/**
 * Retrieval ablation controls. The defaults are the production behavior; the benchmark
 * overrides them to measure one stream or multiplier at a time.
 */
export interface RetrievalConfig {
  /** Reciprocal Rank Fusion smoothing constant (default 20). */
  rrfK?: number;
  /** Per-stream RRF weights (default 1.0; semantic vectors default to 3.0 when present). */
  streamWeights?: StreamWeights;
  enableBm25?: boolean;
  enableVector?: boolean;
  enableGraph?: boolean;
  /** Seed graph activation from the first BM25/vector candidates (default false). */
  graphSeedFromCandidates?: boolean;
  /** Error-trap ranking multiplier (default 2.0; use 1.0 to disable). */
  trapBoost?: number;
  /**
   * When the trap multiplier applies. `conditional` (default) boosts a trap only
   * for trap-intent queries or queries scoped to a file the trap is linked to.
   * `always` restores the legacy blanket boost; `off` disables it.
   */
  trapBoostMode?: 'conditional' | 'always' | 'off';
  /** Verified-memory ranking multiplier (default 1.25; use 1.0 to disable). */
  verifiedBoost?: number;
  /** Optional cosine-similarity floor for the vector stream (default is model-specific). */
  vectorThreshold?: number;
}

export interface SearchParams {
  projectId: string;
  query: string;
  files?: string[];
  module?: string;
  symbols?: string[];
  includeHistory?: boolean;
  budgetTokens?: number;
  maxPerSession?: number;
  /** Maximum number of memories returned (applied after scoring + diversification). */
  limit?: number;
  /** Opportunistically embed a small batch of un-embedded memories after recall.
   * Defaults to true only when the local embedding model is explicitly enabled. */
  backfill?: boolean;
  /** Optional retrieval configuration for ablations and offline benchmarks. */
  retrieval?: RetrievalConfig;
}

export interface SearchResult {
  text: string;
  memories: ScoredMemory[];
  totalTokens: number;
}

const STOP_WORDS = new Set(['do', 'a', 'an', 'the', 'in', 'on', 'at', 'is', 'it', 'to', 'of', 'for', 'by', 'i', 'me', 'my', 'we', 'our']);

export function hasGlobalDb(db: DatabaseSync): boolean {
  try {
    const list = db.prepare('PRAGMA database_list').all() as any[];
    return list.some((d) => d.name === 'global_db');
  } catch {
    return false;
  }
}

/**
 * Builds a safe FTS5 MATCH expression from free text.
 * - Unicode-aware: keeps letters/numbers/marks of any script (café, 日本語, Привет).
 * - Every surviving term is wrapped in double quotes (quotes themselves are stripped), so
 *   FTS5 syntax such as OR / NOT / NEAR / * / : / ^ / parentheses / leading '-' is always
 *   treated as literal text and can never alter or break the MATCH expression.
 */
export function sanitizeFtsQuery(query: string): string {
  const seen = new Set<string>();
  const words = query
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/^[-_]+|[-_]+$/g, ''))
    .filter((w) => {
      if (!/[\p{L}\p{N}]/u.test(w)) return false;
      // Single ASCII chars are noise; a single CJK ideograph is a real word
      if (w.length < 2 && /^[\x00-\x7F]+$/.test(w)) return false;
      const lower = w.toLowerCase();
      if (STOP_WORDS.has(lower) || seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });

  if (words.length === 0) {
    return '';
  }

  // Use OR combination of quoted words to allow broad matching
  return words.map((w) => `"${w}"`).join(' OR ');
}

export async function searchMemories(
  db: DatabaseSync,
  params: SearchParams
): Promise<SearchResult> {
  const {
    projectId,
    query,
    files = [],
    module: targetModule,
    includeHistory = false,
    budgetTokens = TOKEN_LEVELS.L2_TASK_RECALL,
    maxPerSession = 3,
    limit,
    backfill = process.env.FASTR_EMBEDDINGS_MODEL === '1'
  } = params;

  const retrieval = params.retrieval ?? {};
  const rrfK = Math.max(1, retrieval.rrfK ?? 20);
  const streamWeights = {
    bm25: retrieval.streamWeights?.bm25 ?? 1,
    vector: retrieval.streamWeights?.vector ?? 1,
    graph: retrieval.streamWeights?.graph ?? 1
  };
  const enableBm25 = retrieval.enableBm25 ?? true;
  const enableVector = retrieval.enableVector ?? true;
  const enableGraph = retrieval.enableGraph ?? true;
  const graphSeedFromCandidates = retrieval.graphSeedFromCandidates ?? false;
  const trapBoost = retrieval.trapBoost ?? 2.0;
  const trapBoostMode = retrieval.trapBoostMode ?? 'conditional';
  const verifiedBoost = retrieval.verifiedBoost ?? 1.25;
  const queryHasTrapIntent = /\b(trap|avoid|mistake|error|fail(?:ed|ure)?|bug|regression|before editing|warning|guard)\b/i.test(query);

  const candidatesMap = new Map<string, { memory: Memory; rankA?: number; rankB?: number; rankC?: number }>();
  // Semantic vectors and feature-hash vectors need different fusion weights:
  // hash vectors are lexical duplicates of BM25, while MiniLM adds independent signal.
  let semanticVectorSeen = false;

  // Helper to test if a memory passes filters
  const passesFilter = (m: Memory): boolean => {
    if (m.project_id !== projectId && m.project_id !== 'global') return false;
    if (targetModule && m.module.toLowerCase() !== targetModule.trim().toLowerCase()) return false;
    if (!includeHistory) {
      if (m.valid_to !== null) return false;
      if (m.status === 'superseded' || m.status === 'dormant') return false;
    }
    return true;
  };

  // --- STREAM A: BM25 FTS5 Keyword Search ---
  const ftsQuery = enableBm25 ? sanitizeFtsQuery(query) : '';
  if (ftsQuery) {
    try {
      const isGlobalAttached = hasGlobalDb(db);
      // Column order is id (UNINDEXED), title, module, content. The leading 0.0 weight
      // keeps the unindexed id column out of the score while boosting title and module.
      const bm25Expr = 'bm25(memories_fts, 0.0, 10.0, 5.0, 1.0)';
      let querySql = `
        SELECT * FROM (
          SELECT m.*, ${bm25Expr} AS rank
          FROM memories_fts f
          JOIN memories m ON m.id = f.id
          WHERE (m.project_id = ? OR m.project_id = 'global')
            AND memories_fts MATCH ?
          ORDER BY rank ASC
          LIMIT 50
        )
      `;
      const ftsParams: any[] = [projectId, ftsQuery];

      if (isGlobalAttached) {
        // FTS5's bm25() and MATCH both take the table name, not a schema-qualified
        // name or an alias. Keeping the FTS table unaliased makes the unqualified
        // `memories_fts` resolve to the attached table in this subquery.
        const globalBm25Expr = 'bm25(memories_fts, 0.0, 10.0, 5.0, 1.0)';
        querySql += `
          UNION ALL
          SELECT * FROM (
            SELECT gm.*, ${globalBm25Expr} AS rank
            FROM global_db.memories_fts
            JOIN global_db.memories gm ON gm.id = memories_fts.id
            WHERE memories_fts MATCH ?
            ORDER BY rank ASC
            LIMIT 50
          )
        `;
        ftsParams.push(ftsQuery);
      }

      // Merge the two locally-limited streams and cap the combined candidate set.
      querySql = `SELECT * FROM (${querySql}) ORDER BY rank ASC LIMIT 50`;
      const rows = db.prepare(querySql).all(...ftsParams) as unknown as (Memory & { rank: number })[];

      let rank = 1;
      for (const row of rows) {
        if (passesFilter(row)) {
          if (!candidatesMap.has(row.id)) {
            candidatesMap.set(row.id, { memory: row, rankA: rank });
          } else {
            candidatesMap.get(row.id)!.rankA = rank;
          }
          rank++;
        }
      }
    } catch {
      // FTS syntax error or missing virtual table
    }
  }

  // --- STREAM B: Vector Cosine Similarity Search (opt-in / lazy) ---
  // Vectors are only produced by backfillEmbeddings() (scheduled after recall) and are
  // model-tagged. Recall NEVER loads or downloads a model: a query vector is computed only
  // if memories in scope are already embedded, and only with a provider for the SAME
  // model id that is usable right now (offline feature-hash, or an already-loaded model).
  // Vectors from different/unknown models are never compared.
  if (enableVector) {
    warmupEmbeddingModel(); // no-op unless FASTR_EMBEDDINGS_MODEL=1; never awaited
  }
  if (enableVector && query.trim().length > 0) {
    const isGlobalAttached = hasGlobalDb(db);
    let vecSql = `
      SELECT * FROM memories
      WHERE (project_id = ? OR project_id = 'global')
        AND embedded = 1
        AND embedding IS NOT NULL
    `;
    if (isGlobalAttached) {
      vecSql += `
        UNION ALL
        SELECT * FROM global_db.memories
        WHERE embedded = 1
          AND embedding IS NOT NULL
      `;
    }
    let embeddedRows: Memory[] = [];
    try {
      embeddedRows = db.prepare(vecSql).all(projectId) as unknown as Memory[];
    } catch {
      embeddedRows = [];
    }

    // Query vectors are computed lazily, once per model id actually present in scope
    const queryVecs = new Map<number, Float32Array | null>();
    const scoredVectors: Array<{ memory: Memory; sim: number }> = [];
    for (const row of embeddedRows) {
      if (!passesFilter(row)) continue;
      const decoded = decodeTaggedEmbedding(row.embedding);
      if (!decoded) continue; // legacy / untagged vector: unknown model, never compared
      if (decoded.modelId === EMBEDDING_MODEL_IDS.MINILM_L6_V2) semanticVectorSeen = true;

      if (!queryVecs.has(decoded.modelId)) {
        const provider = getProviderForModel(decoded.modelId);
        let qv: Float32Array | null = null;
        if (provider) {
          try { qv = await provider.embed(query); } catch { qv = null; }
        }
        queryVecs.set(decoded.modelId, qv);
      }
      const queryVec = queryVecs.get(decoded.modelId);
      if (!queryVec || queryVec.length !== decoded.vector.length) continue;

      const sim = cosineSimilarity(queryVec, decoded.vector);
      const threshold = retrieval.vectorThreshold ?? VECTOR_SIMILARITY_THRESHOLDS[decoded.modelId] ?? 0.5;
      if (sim >= threshold) {
        scoredVectors.push({ memory: row, sim });
      }
    }

    scoredVectors.sort((a, b) => b.sim - a.sim);
    let rank = 1;
    for (const item of scoredVectors.slice(0, 50)) {
      if (!candidatesMap.has(item.memory.id)) {
        candidatesMap.set(item.memory.id, { memory: item.memory, rankB: rank });
      } else {
        candidatesMap.get(item.memory.id)!.rankB = rank;
      }
      rank++;
    }
  }

  // --- STREAM C: Spreading Activation Graph Retrieval ---
  // Seed activation using explicitly passed files + entities extracted from query.
  // Disabled streams are skipped entirely so ablations do not pay for them.
  if (enableGraph) {
  const seedFiles = new Set(files);
  const queryEntities = extractEntities(query);
  const seedEntityNames = queryEntities.map((e) => e.name.toLowerCase());

  const activationScores = new Map<string, number>();

  // Round 1: Direct file link matches
  if (seedFiles.size > 0) {
    const placeholders = Array.from(seedFiles).map(() => '?').join(',');
    const fileRows = db.prepare(`
      SELECT DISTINCT m.id
      FROM file_links fl
      JOIN memories m ON m.id = fl.memory_id
      WHERE m.project_id = ?
        AND fl.file_path IN (${placeholders})
    `).all(projectId, ...Array.from(seedFiles)) as unknown as Array<{ id: string }>;

    for (const r of fileRows) {
      activationScores.set(r.id, (activationScores.get(r.id) || 0) + 1.0);
    }
  }

  // Round 1: Direct entity link matches
  if (seedEntityNames.length > 0) {
    const placeholders = seedEntityNames.map(() => '?').join(',');
    const entityRows = db.prepare(`
      SELECT DISTINCT ge.source_id AS memory_id, ge.weight
      FROM entities e
      JOIN graph_edges ge ON ge.target_id = e.id AND ge.edge_type = 'entity_link'
      WHERE e.project_id = ?
        AND LOWER(e.name) IN (${placeholders})
    `).all(projectId, ...seedEntityNames) as unknown as Array<{ memory_id: string; weight: number }>;

    for (const r of entityRows) {
      activationScores.set(r.memory_id, (activationScores.get(r.memory_id) || 0) + (r.weight * 1.8));
    }
  }

  // Round 1.5: optional seed from top Stream A & B candidate matches.
  // Off by default: it can turn a weak lexical hit into an unearned graph hit.
  if (graphSeedFromCandidates) {
    for (const candId of Array.from(candidatesMap.keys()).slice(0, 5)) {
      if (!activationScores.has(candId)) {
        activationScores.set(candId, 1.0);
      }
    }
  }

  // Round 2: 2-Hop Spreading Activation outward across graph edges
  if (activationScores.size > 0) {
    const edgeWeights: Record<string, number> = {
      causal: 2.0,
      entity_link: 1.8,
      temporal: 1.5,
      association: 1.0,
      supersedes: 0.5,
    };

    // Propagate across 2 hops
    for (let hop = 0; hop < 2; hop++) {
      const activeKeys = Array.from(activationScores.keys());
      if (activeKeys.length === 0) break;
      const placeholders = activeKeys.map(() => '?').join(',');

      const edgeRows = db.prepare(`
        SELECT ge.source_id, ge.target_id, ge.edge_type, ge.weight
        FROM graph_edges ge
        WHERE ge.project_id = ?
          AND (ge.source_id IN (${placeholders}) OR ge.target_id IN (${placeholders}))
      `).all(projectId, ...activeKeys, ...activeKeys) as unknown as Array<{ source_id: string; target_id: string; edge_type: string; weight: number }>;

      for (const edge of edgeRows) {
        const isOutward = activationScores.has(edge.source_id);
        const source = isOutward ? edge.source_id : edge.target_id;
        const target = isOutward ? edge.target_id : edge.source_id;

        if (source !== target) {
          const sourceAct = activationScores.get(source) || 1.0;
          const w = (edgeWeights[edge.edge_type] || 1.0) * (edge.weight || 1.0);
          const spread = 0.8 * (w * sourceAct * 0.5);
          activationScores.set(target, (activationScores.get(target) || 0) + spread);
        }
      }
    }

    // Lateral inhibition: top nodes suppress bottom nodes (beta = 0.15)
    const memoryActEntries = Array.from(activationScores.entries()).filter(([k]) => k.startsWith('mem_'));
    memoryActEntries.sort((a, b) => b[1] - a[1]);
    if (memoryActEntries.length > 2) {
      const topScore = memoryActEntries[0][1];
      for (let i = 2; i < memoryActEntries.length; i++) {
        const id = memoryActEntries[i][0];
        const val = memoryActEntries[i][1];
        activationScores.set(id, Math.max(0, val - 0.15 * (topScore - val)));
      }
    }

    // Load candidate memories for activated memory IDs
    const activatedIds = Array.from(activationScores.keys()).filter((id) => id.startsWith('mem_') && (activationScores.get(id) || 0) > 0.1);
    if (activatedIds.length > 0) {
      const isGlobalAttached = hasGlobalDb(db);
      const memPlaceholders = activatedIds.map(() => '?').join(',');
      let memSql = `SELECT * FROM memories WHERE id IN (${memPlaceholders})`;
      let memParams: any[] = [...activatedIds];
      if (isGlobalAttached) {
        memSql += ` UNION ALL SELECT * FROM global_db.memories WHERE id IN (${memPlaceholders})`;
        memParams = [...activatedIds, ...activatedIds];
      }
      const memRows = db.prepare(memSql).all(...memParams) as unknown as Memory[];

      memRows.sort((a, b) => (activationScores.get(b.id) || 0) - (activationScores.get(a.id) || 0));

      let rank = 1;
      for (const row of memRows) {
        if (passesFilter(row)) {
          if (!candidatesMap.has(row.id)) {
            candidatesMap.set(row.id, { memory: row, rankC: rank });
          } else {
            candidatesMap.get(row.id)!.rankC = rank;
          }
          rank++;
        }
      }
    }
  }
  }

  // No "latest memories" fallback: every result must come from at least one stream with a
  // real match (BM25 hit, vector similarity above threshold, or graph activation seeded by
  // provided files / query entities / real stream hits). Garbage queries return nothing.

  // File-scoped trap boosts must only affect traps linked to one of the queried files.
  // A blanket boost on every trap in the database promotes unrelated warnings.
  const fileLinkedMemoryIds = new Set<string>();
  if (files.length > 0) {
    const placeholders = files.map(() => '?').join(',');
    try {
      const rows = db.prepare(`
        SELECT DISTINCT memory_id FROM file_links WHERE file_path IN (${placeholders})
      `).all(...files) as unknown as Array<{ memory_id: string }>;
      for (const row of rows) fileLinkedMemoryIds.add(row.memory_id);
      if (hasGlobalDb(db)) {
        const globalRows = db.prepare(`
          SELECT DISTINCT memory_id FROM global_db.file_links WHERE file_path IN (${placeholders})
        `).all(...files) as unknown as Array<{ memory_id: string }>;
        for (const row of globalRows) fileLinkedMemoryIds.add(row.memory_id);
      }
    } catch {
      // Missing/legacy link table: fall back to query-intent-only boosts.
    }
  }

  // --- RRF FUSION & MULTIPLIERS ---
  const effectiveVectorWeight = retrieval.streamWeights?.vector ?? (semanticVectorSeen ? 3 : 1);
  const allScored: ScoredMemory[] = [];
  for (const [, item] of candidatesMap) {
    const { memory, rankA, rankB, rankC } = item;

    let rrf = 0;
    if (rankA !== undefined) rrf += streamWeights.bm25 / (rrfK + rankA);
    if (rankB !== undefined) rrf += effectiveVectorWeight / (rrfK + rankB);
    if (rankC !== undefined) rrf += streamWeights.graph / (rrfK + rankC);
    if (rrf === 0) continue;

    // Multipliers (both are configurable so ablations can disable them cleanly).
    // A trap is boosted only when the query asks for a trap/guard, or when the
    // caller supplied a file and this trap is linked to that exact file.
    const trapBoostApplies = trapBoostMode === 'always'
      || (trapBoostMode === 'conditional' && (queryHasTrapIntent || fileLinkedMemoryIds.has(memory.id)));
    const trapMultiplier = memory.kind === 'error_trap' && trapBoostApplies ? trapBoost : 1.0;
    const verifiedMultiplier = memory.status === 'verified' ? verifiedBoost : 1.0;
    const finalScore = rrf * memory.reward_score * trapMultiplier * verifiedMultiplier;

    allScored.push({
      memory,
      score: finalScore,
      bm25Rank: rankA,
      vectorRank: rankB,
      graphRank: rankC
    });
  }

  // Sort by final score FIRST, then diversify, so per-session caps drop the weakest items.
  allScored.sort((a, b) => b.score - a.score);

  // Session Diversification: only applies to memories with a known source session;
  // memories without provenance (empty source_event_ids) are never capped.
  const scoredMemories: ScoredMemory[] = [];
  const sessionCounts = new Map<string, number>();
  for (const scored of allScored) {
    let sessionId: string | null = null;
    try {
      const srcIds = JSON.parse(scored.memory.source_event_ids || '[]');
      if (Array.isArray(srcIds) && typeof srcIds[0] === 'string' && srcIds[0] && srcIds[0] !== 'unknown') {
        sessionId = srcIds[0];
      }
    } catch {}

    if (sessionId !== null && maxPerSession > 0) {
      const cur = sessionCounts.get(sessionId) || 0;
      if (cur >= maxPerSession) continue;
      sessionCounts.set(sessionId, cur + 1);
    }
    scoredMemories.push(scored);
  }

  const maxItems = limit !== undefined && limit >= 0 ? Math.floor(limit) : Number.POSITIVE_INFINITY;
  // `memories` is the ranked result set (metadata + full content). `text` is the
  // compact prompt context and is the only part constrained by budgetTokens.
  // Keeping the two separate means a small context never hides the full ranked
  // list from callers that need to fetch a specific memory by id.
  const ranked = Number.isFinite(maxItems) ? scoredMemories.slice(0, maxItems) : scoredMemories;
  attachConflictMarkers(db, projectId, ranked);
  const packed = packMemoriesIntoBudget(ranked, budgetTokens);

  // Bounded, non-blocking embedding backfill. Enabled by default only when the
  // local semantic model is explicitly enabled; hash vectors duplicate lexical BM25
  // and should not be generated implicitly.
  if (backfill) {
    scheduleBackfill(db, projectId);
  }

  return {
    text: packed.text,
    memories: ranked,
    totalTokens: packed.totalTokens
  };
}
