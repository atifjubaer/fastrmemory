import { DatabaseSync } from 'node:sqlite';
import { Memory } from '../db/schema.js';
import {
  cosineSimilarity,
  decodeTaggedEmbedding,
  EMBEDDING_MODEL_IDS,
  embedQueryCached,
  getProviderForModel,
  resolveVectorMode,
  VECTOR_SIMILARITY_THRESHOLDS,
  warmupEmbeddingModel,
  type VectorMode
} from './embeddings.js';
import { scheduleBackfill } from './backfill.js';
import { drainFtsQueue, pendingFtsCount } from '../db/fts-queue.js';
import { filterByAssertion } from '../db/assertions.js';
import { packMemoriesIntoBudget, ScoredMemory, TOKEN_LEVELS } from './budget.js';
import { extractEntities } from '../learn/ner.js';
import { detectTemporalWindow, parseQuestionDate, withinWindow, type TemporalWindow } from './temporal.js';
import { detectAggregateIntent } from './aggregate.js';

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
  /**
   * Legacy explicit vector switch. `true` runs whatever provider is available (including
   * the feature-hash vectorizer) and exists for benchmark ablations; `false` forces vectors
   * off. Omit it to use the production default: vectors run only when a real semantic
   * provider is loaded, or when FASTR_VECTOR_MODE selects a mode.
   */
  enableVector?: boolean;
  /**
   * Explicit vector mode. 'hash' opts into the feature-hash vectorizer, 'semantic' runs only
   * with a loaded semantic model, 'off' disables the stream. Overrides enableVector.
   */
  vectorMode?: VectorMode;
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
  /**
   * Static-tier fusion strength (default 0.15). The static model is a bounded reranker:
   * its cosine similarity is blended into the BM25 score instead of contributing a rank,
   * and the bonus is capped at this fraction of a rank-1 BM25 hit. A value of 0 drops the
   * static stream's influence entirely.
   */
  staticBlendWeight?: number;
  /**
   * Apply a parsed temporal window as a hard pre-ranking filter (default false until the
   * benchmark gate passes). When the window matches nothing, retrieval falls back to the
   * unfiltered set and reports `temporalFallback: true`.
   */
  temporalFilter?: boolean;
  /** ISO timestamp of the question. Required to resolve relative ranges like "past two weeks". */
  questionDate?: string;
  /**
   * Aggregate-intent coverage pass (default on). Counting questions search with their
   * content terms only, fused with the original query, and return up to `aggregateLimit`
   * rows. Set false to restore the single-pass lexical behaviour.
   */
  aggregateCoverage?: boolean;
  /** Maximum candidates the aggregate path returns (default 20). */
  aggregateLimit?: number;
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
  /** Whether to drain the deferred full-text index before running BM25. This is a write,
   * so a caller that must not block on SQLite's write lock can turn it off and read a
   * slightly stale index instead. Defaults to true. */
  drainFts?: boolean;
  /** Project root, used to evaluate memory assertions on the read path. Without it, a
   * memory with an assertion is treated as still holding. */
  projectRoot?: string;
  /** Optional retrieval configuration for ablations and offline benchmarks. */
  retrieval?: RetrievalConfig;
}

export interface SearchResult {
  text: string;
  memories: ScoredMemory[];
  totalTokens: number;
  /** Parsed temporal window, when one was detected and applied. */
  temporalWindow?: TemporalWindow;
  /** True when the window excluded every candidate and retrieval fell back to the full set. */
  temporalFallback?: boolean;
  /** Present when the query was classified as an aggregate (counting) question. */
  aggregate?: { detected: boolean; limit: number };
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
 * Adds memories that are queued for full-text indexing but not yet in the FTS table.
 *
 * The FTS drain is a write, so it can be skipped when another agent holds SQLite's write
 * lock. That must not make a just-inserted memory invisible: the queue row names the
 * memory, so a read-only scan of the queue finds it and the row is added to the BM25
 * results behind the ones already indexed.
 *
 * The match is a plain substring test over the same terms the FTS query uses. It is
 * deliberately simple: it only has to catch the rows the index would have caught, and it
 * ranks behind the real BM25 results.
 */
function mergePendingMatches(
  db: DatabaseSync,
  projectId: string,
  existing: Array<Memory & { rank: number }>,
  ftsExpression: string
): Array<Memory & { rank: number }> {
  if (!ftsExpression) return existing;
  const terms = ftsExpression
    .split(' OR ')
    .map((term) => term.replace(/^"|"$/g, ''))
    .filter((term) => term.length > 0);
  if (terms.length === 0) return existing;

  try {
    const rows = db.prepare(`
      SELECT m.* FROM memories m
      JOIN memory_fts_queue q ON q.memory_id = m.id
      WHERE (m.project_id = ? OR m.project_id = 'global')
        AND m.valid_to IS NULL
        AND m.status != 'superseded'
        AND m.status != 'dormant'
      LIMIT 500
    `).all(projectId) as unknown as Memory[];

    const alreadyFound = new Set(existing.map((row) => row.id));
    // Pending rows rank after every indexed row: BM25 order is by rank ascending, and the
    // existing rows all have a real score.
    let worstRank = existing.reduce((max, row) => Math.max(max, row.rank), 0);
    const additions: Array<Memory & { rank: number }> = [];

    for (const row of rows) {
      if (alreadyFound.has(row.id)) continue;
      const haystack = `${row.title}\n${row.content}`.toLowerCase();
      if (!terms.some((term) => haystack.includes(term.toLowerCase()))) continue;
      additions.push({ ...row, rank: ++worstRank });
    }

    return additions.length > 0 ? [...existing, ...additions] : existing;
  } catch {
    return existing;
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
    backfill,
    drainFts = true,
    projectRoot
  } = params;

  const retrieval = params.retrieval ?? {};
  const rrfK = Math.max(1, retrieval.rrfK ?? 20);
  /**
   * Temporal window: parsed once from the query and the question date, then applied at
   * fusion time. Date-bounded questions ("how many times did I bake in the past two
   * weeks") share words with every session, so BM25 alone ranks by topic and loses the
   * rows that actually fall inside the range. The window is a filter, never a score.
   */
  const temporalWindow: TemporalWindow | null = retrieval.temporalFilter
    ? detectTemporalWindow(query, parseQuestionDate(retrieval.questionDate))
    : null;
  // A window makes most candidates irrelevant, so the first stage keeps a deeper pool;
  // without one the caps stay at 50 and query cost is unchanged.
  const bm25Limit = temporalWindow ? 200 : 50;
  const vectorLimit = temporalWindow ? 100 : 50;
  /**
   * Aggregate intent. A counting question is answered by collecting every session that
   * mentions the activity, so the lexical query drops the scaffolding words that are
   * frequent across the corpus and keeps only the content terms.
   */
  const aggregate = retrieval.aggregateCoverage === false
    ? { detected: false, terms: [] as string[] }
    : detectAggregateIntent(query);
  const lexicalQuery = aggregate.detected && aggregate.terms.length > 0
    ? aggregate.terms.join(' ')
    : query;
  const streamWeights = {
    bm25: retrieval.streamWeights?.bm25 ?? 1,
    vector: retrieval.streamWeights?.vector ?? 1,
    graph: retrieval.streamWeights?.graph ?? 1
  };
  const enableBm25 = retrieval.enableBm25 ?? true;
  /**
   * Production default: the vector stream is off unless a real semantic provider is loaded.
   * Feature-hash vectors duplicate BM25 lexically and measurably regress Hit@1, so they are
   * reachable only via an explicit vectorMode: 'hash' or FASTR_VECTOR_MODE=hash.
   */
  const vectorMode: VectorMode = retrieval.vectorMode
    ? resolveVectorMode(retrieval.vectorMode)
    : retrieval.enableVector === true
      ? 'hash'
      : retrieval.enableVector === false
        ? 'off'
        : resolveVectorMode();
  const enableVector = vectorMode !== 'off';
  const allowHashVectors = vectorMode === 'hash';
  // Embedding backfill follows the same rule as recall: it never generates hash vectors
  // implicitly. A caller may still force it explicitly.
  const shouldBackfill = backfill ?? enableVector;
  const enableGraph = retrieval.enableGraph ?? true;
  const graphSeedFromCandidates = retrieval.graphSeedFromCandidates ?? false;
  const trapBoost = retrieval.trapBoost ?? 2.0;
  const trapBoostMode = retrieval.trapBoostMode ?? 'conditional';
  const verifiedBoost = retrieval.verifiedBoost ?? 1.25;
  const queryHasTrapIntent = /\b(trap|avoid|mistake|error|fail(?:ed|ure)?|bug|regression|before editing|warning|guard)\b/i.test(query);

  const candidatesMap = new Map<string, { memory: Memory; rankA?: number; rankB?: number; rankC?: number; staticSim?: number }>();
  // Semantic vectors and feature-hash vectors need different fusion weights:
  // hash vectors are lexical duplicates of BM25, while a semantic model adds independent signal.
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
  // Read-your-writes: index anything the writer deferred before running BM25. This is a
  // bounded, idempotent batch and a no-op once the queue is empty.
  //
  // The drain is best-effort on purpose. It is a write, and a write takes SQLite's single
  // write lock: two agents on one `.fastr/fastr.db` — one recalling while the other writes —
  // would otherwise stall the recall for the full `busy_timeout` or fail with SQLITE_BUSY.
  // A stale index is a worse answer, not a broken one, so the drain is skipped whenever the
  // lock is not free.
  if (enableBm25 && drainFts) {
    try {
      // busyTimeoutMs: 0 — never wait for the write lock on the read path.
      drainFtsQueue(db, { limit: 500, schema: 'main', busyTimeoutMs: 0 });
      if (hasGlobalDb(db)) drainFtsQueue(db, { limit: 500, schema: 'global_db', busyTimeoutMs: 0 });
    } catch {
      // A stale index must never fail a search.
    }
  }
  /**
   * Runs one FTS5 MATCH and returns the matching rows in BM25 order. The main and global
   * databases are queried separately and merged locally so each branch is capped on its
   * own; a global row never displaces a project row before the cap.
   */
  const runBm25 = (expression: string): Array<Memory & { rank: number }> => {
    if (!expression) return [];
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
        LIMIT ${bm25Limit}
      )
    `;
    const ftsParams: any[] = [projectId, expression];

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
          LIMIT ${bm25Limit}
        )
      `;
      ftsParams.push(expression);
    }

    // Merge the two locally-limited streams and cap the combined candidate set.
    querySql = `SELECT * FROM (${querySql}) ORDER BY rank ASC LIMIT ${bm25Limit}`;
    return db.prepare(querySql).all(...ftsParams) as unknown as Array<Memory & { rank: number }>;
  };

  const ftsQuery = enableBm25 ? sanitizeFtsQuery(query) : '';
  const aggregateFtsQuery = enableBm25 && lexicalQuery !== query ? sanitizeFtsQuery(lexicalQuery) : '';
  if (ftsQuery || aggregateFtsQuery) {
    try {
      let primary = runBm25(ftsQuery);
      let secondary = aggregateFtsQuery ? runBm25(aggregateFtsQuery) : [];

      // Read-your-writes: a memory inserted a moment ago is queued for indexing, not yet in
      // the FTS table. When the drain above could not take the write lock, the queue still
      // holds those rows, so scan it read-only and add anything it matches. This keeps the
      // "searchable as soon as insertMemory() returns" guarantee without ever waiting for
      // the write lock.
      if (pendingFtsCount(db, 'main') > 0) {
        primary = mergePendingMatches(db, projectId, primary, ftsQuery);
        if (aggregateFtsQuery) {
          secondary = mergePendingMatches(db, projectId, secondary, aggregateFtsQuery);
        }
      }

      /**
       * When an aggregate question runs two lexical queries, a document found by both
       * outranks a document found by only one: the two rank lists are fused with the same
       * reciprocal-rank rule the streams use. That keeps the original query's precision
       * (its rank-1 is almost always also in the stripped list) while admitting the
       * deeper rows only the stripped query reaches.
       */
      let ordered: Array<{ row: Memory; score: number }>;
      if (secondary.length === 0) {
        ordered = primary.map((row) => ({ row, score: row.rank }));
      } else {
        const fused = new Map<string, { row: Memory; score: number }>();
        primary.forEach((row, index) => {
          fused.set(row.id, { row, score: 1 / (rrfK + index + 1) });
        });
        secondary.forEach((row, index) => {
          const contribution = 1 / (rrfK + index + 1);
          const existing = fused.get(row.id);
          if (existing) existing.score += contribution;
          else fused.set(row.id, { row, score: contribution });
        });
        // Higher fused score first; ties keep the primary query's order via insertion.
        ordered = [...fused.values()].sort((a, b) => b.score - a.score);
      }

      let rank = 1;
      for (const { row } of ordered) {
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
  // Model warmup is an explicit operator opt-in (FASTR_EMBEDDINGS_MODEL=1) and is never
  // awaited, so it stays independent of the vector stream being enabled for this query.
  warmupEmbeddingModel();
  if (enableVector && query.trim().length > 0) {
    // Static vectors rerank only the BM25 candidate set. BM25 already caps at 50 rows;
    // 100 is the ceiling if that cap grows, so query cost does not scale with the database.
    const bm25CandidateIds: ReadonlySet<string> = new Set(
      [...candidatesMap.values()]
        .filter((candidate) => candidate.rankA !== undefined)
        .sort((a, b) => (a.rankA ?? 0) - (b.rankA ?? 0))
        .slice(0, 100)
        .map((candidate) => candidate.memory.id)
    );
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
    const scoredVectors: Array<{ memory: Memory; sim: number; modelId: number }> = [];
    for (const row of embeddedRows) {
      if (!passesFilter(row)) continue;
      const decoded = decodeTaggedEmbedding(row.embedding);
      if (!decoded) continue; // legacy / untagged vector: unknown model, never compared
      // Rows embedded by the feature-hash vectorizer are inert unless hash mode is on.
      // This keeps a database written by an older default from re-enabling the regression.
      if (decoded.modelId === EMBEDDING_MODEL_IDS.FEATURE_HASH_384 && !allowHashVectors) continue;
      if (
        decoded.modelId === EMBEDDING_MODEL_IDS.MINILM_L6_V2 ||
        decoded.modelId === EMBEDDING_MODEL_IDS.STATIC_POTION_256
      ) {
        semanticVectorSeen = true;
      }
      // The static tier is a bounded reranker, not a full scan: it only scores the BM25
      // candidate set (top 50 today, capped at 100) so query cost stays flat as the
      // database grows.
      if (
        decoded.modelId === EMBEDDING_MODEL_IDS.STATIC_POTION_256 &&
        !bm25CandidateIds.has(row.id)
      ) {
        continue;
      }

      if (!queryVecs.has(decoded.modelId)) {
        const provider = getProviderForModel(decoded.modelId, allowHashVectors);
        let qv: Float32Array | null = null;
        if (provider) {
          try { qv = await embedQueryCached(provider, lexicalQuery); } catch { qv = null; }
        }
        queryVecs.set(decoded.modelId, qv);
      }
      const queryVec = queryVecs.get(decoded.modelId);
      if (!queryVec || queryVec.length !== decoded.vector.length) continue;

      const sim = cosineSimilarity(queryVec, decoded.vector);
      const threshold = retrieval.vectorThreshold ?? VECTOR_SIMILARITY_THRESHOLDS[decoded.modelId] ?? 0.5;
      // A zero cosine means an empty or orthogonal vector; it is never a match.
      if (sim > 0 && sim >= threshold) {
        scoredVectors.push({ memory: row, sim, modelId: decoded.modelId });
      }
    }

    scoredVectors.sort((a, b) => b.sim - a.sim);
    let rank = 1;
    for (const item of scoredVectors.slice(0, vectorLimit)) {
      const existing = candidatesMap.get(item.memory.id);
      const isStatic = item.modelId === EMBEDDING_MODEL_IDS.STATIC_POTION_256;
      if (!existing) {
        candidatesMap.set(item.memory.id, isStatic
          ? { memory: item.memory, staticSim: item.sim }
          : { memory: item.memory, rankB: rank });
      } else if (isStatic) {
        // A static vector is a bounded rerank score, never a rank contribution.
        existing.staticSim = item.sim;
      } else {
        existing.rankB = rank;
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
  const staticBlendWeight = retrieval.staticBlendWeight ?? 0.15;
  let allScored: ScoredMemory[] = [];
  for (const [, item] of candidatesMap) {
    const { memory, rankA, rankB, rankC, staticSim } = item;

    let rrf = 0;
    if (rankA !== undefined) rrf += streamWeights.bm25 / (rrfK + rankA);
    if (rankB !== undefined) rrf += effectiveVectorWeight / (rrfK + rankB);
    if (rankC !== undefined) rrf += streamWeights.graph / (rrfK + rankC);
    // The static tier reranks BM25 candidates by adding a bounded cosine bonus: at most
    // `staticBlendWeight` of a rank-1 BM25 hit, so it can settle near-ties but never
    // displace a clearly better lexical match.
    if (staticSim !== undefined && staticBlendWeight > 0) {
      rrf += (staticBlendWeight * Math.max(0, staticSim)) / (rrfK + 1);
    }
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

  // A memory whose assertion has stopped holding is spent: the defect it warns about was
  // fixed, so surfacing it (with a 2.0x trap boost) wastes the caller's context on a bug
  // that no longer exists. Filter before sorting so the budget goes to live memories.
  if (projectRoot) {
    const live = filterByAssertion(db, allScored.map((item) => item.memory), projectRoot);
    if (live.length !== allScored.length) {
      const liveIds = new Set(live.map((memory) => memory.id));
      allScored = allScored.filter((item) => liveIds.has(item.memory.id));
    }
  }

  // Sort by final score FIRST, then diversify, so per-session caps drop the weakest items.
  allScored.sort((a, b) => b.score - a.score);

  /**
   * Temporal filter. Applied after fusion and before diversification so the window can
   * never change the relative order of the rows it keeps. If the window excludes every
   * candidate the parse was wrong for this corpus, so retrieval falls back to the
   * unfiltered ranking and says so instead of returning nothing.
   */
  let temporalFallback = false;
  let temporalRows = allScored;
  if (temporalWindow) {
    const inWindow = allScored.filter((item) => withinWindow(item.memory.valid_from, temporalWindow));
    if (inWindow.length > 0) {
      for (const item of inWindow) item.temporalMatch = true;
      temporalRows = inWindow;
    } else {
      temporalFallback = true;
    }
  }
  allScored = temporalRows;

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

  // An aggregate question needs the whole set, not the usual handful, so the caller can
  // count or enumerate. The cap is explicit and bounded; it never widens a normal query.
  const aggregateLimit = aggregate.detected ? Math.max(0, Math.floor(retrieval.aggregateLimit ?? 20)) : 0;
  const requested = limit !== undefined && limit >= 0 ? Math.floor(limit) : Number.POSITIVE_INFINITY;
  const maxItems = aggregateLimit > 0 ? Math.max(requested, aggregateLimit) : requested;
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
  if (shouldBackfill) {
    scheduleBackfill(db, projectId);
  }

  return {
    text: packed.text,
    memories: ranked,
    totalTokens: packed.totalTokens,
    ...(temporalWindow ? { temporalWindow, temporalFallback } : {}),
    ...(aggregate.detected ? { aggregate: { detected: true, limit: aggregateLimit } } : {})
  };
}
