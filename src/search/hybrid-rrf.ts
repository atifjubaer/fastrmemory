import { DatabaseSync } from 'node:sqlite';
import { Memory } from '../db/schema.js';
import { computeEmbedding, cosineSimilarity, bufferToFloat32Array } from './embeddings.js';
import { packMemoriesIntoBudget, ScoredMemory, TOKEN_LEVELS } from './budget.js';

export interface SearchParams {
  projectId: string;
  query: string;
  files?: string[];
  module?: string;
  symbols?: string[];
  includeHistory?: boolean;
  budgetTokens?: number;
  maxPerSession?: number;
}

export interface SearchResult {
  text: string;
  memories: ScoredMemory[];
  totalTokens: number;
}

const STOP_WORDS = new Set(['do', 'a', 'an', 'the', 'in', 'on', 'at', 'is', 'it', 'to', 'of', 'for', 'by', 'i', 'me', 'my', 'we', 'our']);

export function sanitizeFtsQuery(query: string): string {
  const words = query
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w.toLowerCase()));

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
    maxPerSession = 3
  } = params;

  const candidatesMap = new Map<string, { memory: Memory; rankA?: number; rankB?: number; rankC?: number }>();

  // Helper to test if a memory passes filters
  const passesFilter = (m: Memory): boolean => {
    if (m.project_id !== projectId) return false;
    if (targetModule && m.module.toLowerCase() !== targetModule.trim().toLowerCase()) return false;
    if (!includeHistory) {
      if (m.valid_to !== null) return false;
      if (m.status === 'superseded' || m.status === 'dormant') return false;
    }
    return true;
  };

  // --- STREAM A: BM25 FTS5 Keyword Search ---
  const ftsQuery = sanitizeFtsQuery(query);
  if (ftsQuery) {
    try {
      const rows = db.prepare(`
        SELECT m.*, f.rank
        FROM memories_fts f
        JOIN memories m ON m.id = f.id
        WHERE m.project_id = ?
          AND memories_fts MATCH ?
        ORDER BY f.rank ASC
        LIMIT 50
      `).all(projectId, ftsQuery) as unknown as (Memory & { rank: number })[];

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

  // --- STREAM B: Vector Cosine Similarity Search ---
  const queryVec = await computeEmbedding(query);
  if (queryVec) {
    const embeddedRows = db.prepare(`
      SELECT * FROM memories
      WHERE project_id = ?
        AND embedded = 1
        AND embedding IS NOT NULL
    `).all(projectId) as unknown as Memory[];

    const scoredVectors: Array<{ memory: Memory; sim: number }> = [];
    for (const row of embeddedRows) {
      if (passesFilter(row) && row.embedding) {
        const memVec = bufferToFloat32Array(row.embedding);
        const sim = cosineSimilarity(queryVec, memVec);
        if (sim > 0.25) {
          scoredVectors.push({ memory: row, sim });
        }
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

  // --- STREAM C: File Links Graph Search ---
  if (files.length > 0) {
    const placeholders = files.map(() => '?').join(',');
    const fileRows = db.prepare(`
      SELECT DISTINCT m.*
      FROM file_links fl
      JOIN memories m ON m.id = fl.memory_id
      WHERE m.project_id = ?
        AND fl.file_path IN (${placeholders})
      ORDER BY (m.kind = 'error_trap') DESC, m.reward_score DESC
      LIMIT 50
    `).all(projectId, ...files) as unknown as Memory[];

    let rank = 1;
    for (const row of fileRows) {
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

  // Fallback: If no matches across streams and query is empty, return latest active memories
  if (candidatesMap.size === 0) {
    const fallbackRows = db.prepare(`
      SELECT * FROM memories
      WHERE project_id = ?
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
      ORDER BY pinned DESC, (kind = 'error_trap') DESC, reward_score DESC, created_at DESC
      LIMIT 20
    `).all(projectId) as unknown as Memory[];

    let rank = 1;
    for (const row of fallbackRows) {
      if (passesFilter(row)) {
        candidatesMap.set(row.id, { memory: row, rankA: rank });
        rank++;
      }
    }
  }

  // --- RRF FUSION (k = 60) & MULTIPLIERS ---
  const scoredMemories: ScoredMemory[] = [];
  const sessionCounts = new Map<string, number>();

  for (const [, item] of candidatesMap) {
    const { memory, rankA, rankB, rankC } = item;

    // Session Diversification
    let sessionId = 'unknown';
    try {
      const srcIds = JSON.parse(memory.source_event_ids || '[]');
      if (srcIds.length > 0) sessionId = srcIds[0];
    } catch {}

    const curSessCount = sessionCounts.get(sessionId) || 0;
    if (curSessCount >= maxPerSession) {
      continue;
    }

    let rrf = 0;
    if (rankA !== undefined) rrf += 1 / (60 + rankA);
    if (rankB !== undefined) rrf += 1 / (60 + rankB);
    if (rankC !== undefined) rrf += 1 / (60 + rankC);

    // Multipliers
    const trapMultiplier = memory.kind === 'error_trap' ? 2.0 : 1.0;
    const verifiedMultiplier = memory.status === 'verified' ? 1.25 : 1.0;
    const finalScore = rrf * memory.reward_score * trapMultiplier * verifiedMultiplier;

    sessionCounts.set(sessionId, curSessCount + 1);

    scoredMemories.push({
      memory,
      score: finalScore,
      bm25Rank: rankA,
      vectorRank: rankB,
      graphRank: rankC
    });
  }

  const packed = packMemoriesIntoBudget(scoredMemories, budgetTokens);

  return {
    text: packed.text,
    memories: packed.packed,
    totalTokens: packed.totalTokens
  };
}
