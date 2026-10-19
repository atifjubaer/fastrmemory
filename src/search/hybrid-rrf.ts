import { DatabaseSync } from 'node:sqlite';
import { Memory } from '../db/schema.js';
import { computeEmbedding, cosineSimilarity, bufferToFloat32Array } from './embeddings.js';
import { packMemoriesIntoBudget, ScoredMemory, TOKEN_LEVELS } from './budget.js';
import { extractEntities } from '../learn/ner.js';

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

export function hasGlobalDb(db: DatabaseSync): boolean {
  try {
    const list = db.prepare('PRAGMA database_list').all() as any[];
    return list.some((d) => d.name === 'global_db');
  } catch {
    return false;
  }
}

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
    if (m.project_id !== projectId && m.project_id !== 'global') return false;
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
      const isGlobalAttached = hasGlobalDb(db);
      let querySql = `
        SELECT m.*, f.rank
        FROM memories_fts f
        JOIN memories m ON m.id = f.id
        WHERE (m.project_id = ? OR m.project_id = 'global')
          AND memories_fts MATCH ?
      `;
      const ftsParams: any[] = [projectId, ftsQuery];

      if (isGlobalAttached) {
        querySql += `
          UNION ALL
          SELECT gm.*, gf.rank
          FROM global_db.memories_fts gf
          JOIN global_db.memories gm ON gm.id = gf.id
          WHERE memories_fts MATCH ?
        `;
        ftsParams.push(ftsQuery);
      }

      querySql += ` ORDER BY rank ASC LIMIT 50`;
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

  // --- STREAM B: Vector Cosine Similarity Search ---
  const queryVec = await computeEmbedding(query);
  if (queryVec) {
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
    const embeddedRows = db.prepare(vecSql).all(projectId) as unknown as Memory[];

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

  // --- STREAM C: Spreading Activation Graph Retrieval ---
  // Seed activation using explicitly passed files + entities extracted from query
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

  // Round 1.5: Seed from top Stream A & B candidate matches
  for (const candId of Array.from(candidatesMap.keys()).slice(0, 5)) {
    if (!activationScores.has(candId)) {
      activationScores.set(candId, 1.0);
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
