import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { searchMemories, sanitizeFtsQuery } from '../src/search/hybrid-rrf.js';
import { packMemoriesIntoBudget, estimateTokens, ScoredMemory } from '../src/search/budget.js';
import {
  __setModelLoaderForTests,
  computeFeatureHashVector,
  decodeTaggedEmbedding,
  encodeTaggedEmbedding,
  EMBEDDING_MODEL_IDS,
  getAvailableEmbeddingProvider,
  getExtractor,
  isModelLoaded
} from '../src/search/embeddings.js';
import { backfillEmbeddings } from '../src/search/backfill.js';

const P = 'proj_recall';
const flush = () => new Promise<void>((r) => setImmediate(r));

function mem(id: string, score: number, contentLen: number): ScoredMemory {
  return {
    memory: {
      id, project_id: 'p', agent_id: 'a', module: 'm', kind: 'rule', title: id,
      content: 'x'.repeat(contentLen), status: 'verified', pinned: 0, reward_score: 1,
      retrieval_count: 0, valid_from: '', valid_to: null, superseded_by_id: null,
      superseded_reason: null, source_event_ids: '[]', embedding: null, embedded: 0,
      created_at: '', last_recalled_at: null
    } as any,
    score
  };
}

describe('Recall correctness fixes', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  afterEach(async () => {
    await flush();
    __setModelLoaderForTests(null);
    delete process.env.FASTR_EMBEDDINGS_MODEL;
    db.close();
  });

  // --- Task 1: scoring before diversification ---
  it('returns more than 3 relevant memories, sorted desc, with the boosted trap ranked first', async () => {
    for (let i = 0; i < 7; i++) {
      repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: `Deploy pipeline rule ${i}`, content: `The deploy pipeline step ${i} must run lint.`, verified: true });
    }
    // Trap inserted last (last in stream order), weaker keyword match
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'error_trap', title: 'Rollback trap', content: 'Deploy without a rollback plan broke prod.', verified: true });

    const res = await searchMemories(db, {
      projectId: P,
      query: 'deploy pipeline',
      backfill: false,
      retrieval: { trapBoostMode: 'always' }
    });
    expect(res.memories.length).toBe(8);
    for (let i = 1; i < res.memories.length; i++) {
      expect(res.memories[i - 1].score).toBeGreaterThanOrEqual(res.memories[i].score);
    }
    // The trap (last in stream order, weakest BM25 rank) is kept and ranked by its 2.0x boost:
    // above every single-stream rule even though those have better BM25 ranks.
    const trapIdx = res.memories.findIndex((m) => m.memory.kind === 'error_trap');
    expect(trapIdx).toBeGreaterThanOrEqual(0);
    const trap = res.memories[trapIdx];
    expect(trap.score).toBeCloseTo((2.0 * 1.25) / (20 + trap.bm25Rank!), 6);
    for (const m of res.memories.slice(trapIdx + 1)) {
      expect(m.graphRank).toBeUndefined();
      expect(m.bm25Rank!).toBeLessThan(trap.bm25Rank!);
    }
  });

  it('only boosts traps for trap-intent or file-scoped queries in conditional mode', async () => {
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: 'Deploy pipeline rule', content: 'The deploy pipeline must run lint.', verified: true });
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'error_trap', title: 'Rollback trap', content: 'Deploy without a rollback plan broke prod.', verified: true });

    const plain = await searchMemories(db, { projectId: P, query: 'deploy pipeline', backfill: false });
    expect(plain.memories[0].memory.kind).toBe('rule');

    const trapIntent = await searchMemories(db, { projectId: P, query: 'deploy pipeline trap', backfill: false });
    expect(trapIntent.memories[0].memory.kind).toBe('error_trap');
  });

  it('respects the requested limit', async () => {
    for (let i = 0; i < 6; i++) {
      repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: `Cache rule ${i}`, content: 'cache invalidation policy', verified: true });
    }
    const res = await searchMemories(db, { projectId: P, query: 'cache invalidation', limit: 4, backfill: false });
    expect(res.memories.length).toBe(4);
  });

  it('caps known sessions at maxPerSession but keeps the highest-scored items', async () => {
    for (let i = 0; i < 5; i++) {
      repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: `Queue rule ${i}`, content: 'queue retry backoff', verified: true, sourceEventIds: ['evt_session_a'] } as any);
    }
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'error_trap', title: 'Queue trap', content: 'queue retry storm', verified: true, sourceEventIds: ['evt_session_a'] } as any);
    const res = await searchMemories(db, { projectId: P, query: 'queue retry', maxPerSession: 3, backfill: false });
    expect(res.memories.length).toBe(3);
    expect(res.memories[0].memory.kind).toBe('error_trap');
  });

  // --- Task 2: no "everything" fallback ---
  it('returns nothing for garbage queries instead of unrelated memories', async () => {
    repo.insertMemory({ projectId: P, module: 'auth', kind: 'rule', title: 'JWT expiry', content: 'Use seconds for exp claims.', files: ['src/auth/jwt.ts'], verified: true });
    for (const q of ['foo "bar', 'zzqx wvut', '', '"*:^']) {
      const res = await searchMemories(db, { projectId: P, query: q, backfill: false });
      expect(res.memories).toHaveLength(0);
    }
    // A real graph link from provided files still recalls with an empty query
    const byFile = await searchMemories(db, { projectId: P, query: '', files: ['src/auth/jwt.ts'], backfill: false });
    expect(byFile.memories.map((m) => m.memory.title)).toEqual(['JWT expiry']);
  });

  // --- Task 3: Unicode-aware, injection-safe FTS sanitizer ---
  it('keeps Unicode terms intact', () => {
    expect(sanitizeFtsQuery('café')).toBe('"café"');
    expect(sanitizeFtsQuery('日本語')).toBe('"日本語"');
    expect(sanitizeFtsQuery('Привет мир')).toBe('"Привет" OR "мир"');
  });

  it('neutralises FTS5 operators so they cannot break MATCH', async () => {
    const raw = 'foo OR bar NOT baz* title:x "quoted -neg NEAR(a b) ^start AND';
    const s = sanitizeFtsQuery(raw);
    // Every term is a quoted literal, joined only by our own OR
    const parts = s.split(' OR ');
    for (const p of parts) expect(p).toMatch(/^"[^"*:^()]+"$/);
    expect(parts).toContain('"NOT"');
    expect(parts).toContain('"neg"');
    // And it is a valid MATCH expression
    expect(() => db.prepare('SELECT * FROM memories_fts WHERE memories_fts MATCH ?').all(s)).not.toThrow();
  });

  it('recalls memories written in non-ASCII scripts', async () => {
    repo.insertMemory({ projectId: P, module: 'i18n', kind: 'rule', title: 'Menu café', content: 'Le café utilise UTF-8.', verified: true });
    repo.insertMemory({ projectId: P, module: 'i18n', kind: 'rule', title: 'Locale', content: '設定 日本語 ドキュメント', verified: true });
    const fr = await searchMemories(db, { projectId: P, query: 'café', backfill: false });
    expect(fr.memories.map((m) => m.memory.title)).toContain('Menu café');
    const ja = await searchMemories(db, { projectId: P, query: '日本語', backfill: false });
    expect(ja.memories.map((m) => m.memory.title)).toContain('Locale');
  });

  // --- Task 4: lazy, model-tagged vector stream + backfill ---
  it('never loads the embedding model during recall', async () => {
    const loader = vi.fn(async () => async () => ({ data: new Float32Array(384) }));
    __setModelLoaderForTests(loader);
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: 'Logs', content: 'rotate logs daily', verified: true });
    const res = await searchMemories(db, { projectId: P, query: 'rotate logs' });
    expect(res.memories.length).toBe(1);
    await flush();
    expect(loader).not.toHaveBeenCalled();
    expect(isModelLoaded()).toBe(false);
  });

  it('does not block recall on an opt-in model warmup that never finishes', async () => {
    process.env.FASTR_EMBEDDINGS_MODEL = '1';
    const loader = vi.fn(() => new Promise<any>(() => {})); // simulated never-ending download
    __setModelLoaderForTests(loader);
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: 'Logs', content: 'rotate logs daily', verified: true });
    const res = await searchMemories(db, { projectId: P, query: 'rotate logs', backfill: false });
    expect(res.memories.length).toBe(1);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('backfills un-embedded memories with model-tagged vectors, bounded by limit', async () => {
    for (let i = 0; i < 5; i++) {
      repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: `Rule ${i}`, content: `content ${i}`, verified: true });
    }
    expect(await backfillEmbeddings(db, repo, P, { limit: 3 })).toBe(3);
    expect(await backfillEmbeddings(db, repo, P, { limit: 10 })).toBe(2);
    expect(await backfillEmbeddings(db, repo, P, { limit: 10 })).toBe(0);
    const rows = db.prepare('SELECT embedding FROM memories').all() as any[];
    for (const r of rows) {
      const decoded = decodeTaggedEmbedding(r.embedding);
      expect(decoded?.modelId).toBe(EMBEDDING_MODEL_IDS.FEATURE_HASH_384);
      expect(decoded?.vector.length).toBe(384);
    }
  });

  it('re-embeds with a loaded model and tags vectors with its model id', async () => {
    __setModelLoaderForTests(async () => async () => ({ data: new Float32Array(384).fill(0.05) }));
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: 'R', content: 'c', verified: true });
    await backfillEmbeddings(db, repo, P);
    await getExtractor(); // explicit (opt-in) load through the mocked loader
    expect(getAvailableEmbeddingProvider().modelId).toBe(EMBEDDING_MODEL_IDS.MINILM_L6_V2);
    expect(await backfillEmbeddings(db, repo, P)).toBe(1); // hash vector is stale for the new model
    const row = db.prepare('SELECT embedding FROM memories').get() as any;
    expect(decodeTaggedEmbedding(row.embedding)?.modelId).toBe(EMBEDDING_MODEL_IDS.MINILM_L6_V2);
  });

  it('only compares vectors produced by the same model', async () => {
    const query = 'kubernetes ingress annotations';
    const a = repo.insertMemory({ projectId: P, module: 'k8s', kind: 'rule', title: 'Alpha', content: 'unrelated words one', verified: true });
    const b = repo.insertMemory({ projectId: P, module: 'k8s', kind: 'rule', title: 'Beta', content: 'unrelated words two', verified: true });
    const c = repo.insertMemory({ projectId: P, module: 'k8s', kind: 'rule', title: 'Gamma', content: 'unrelated words three', verified: true });
    const qv = computeFeatureHashVector(query);
    repo.updateEmbedding(a.id, encodeTaggedEmbedding(qv, EMBEDDING_MODEL_IDS.FEATURE_HASH_384)); // same model
    repo.updateEmbedding(b.id, encodeTaggedEmbedding(qv, EMBEDDING_MODEL_IDS.MINILM_L6_V2)); // other model (not loaded)
    repo.updateEmbedding(c.id, qv); // legacy untagged blob

    const res = await searchMemories(db, { projectId: P, query, backfill: false });
    expect(res.memories.map((m) => m.memory.title)).toEqual(['Alpha']);
    expect(res.memories[0].vectorRank).toBe(1);
  });

  it('opportunistically backfills after a search when explicitly enabled', async () => {
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: 'Logs', content: 'rotate logs daily', verified: true });
    await searchMemories(db, { projectId: P, query: 'rotate logs', backfill: true });
    await flush();
    await flush();
    const row = db.prepare('SELECT embedded FROM memories').get() as any;
    expect(row.embedded).toBe(1);
  });

  it('does not backfill hash vectors by default', async () => {
    repo.insertMemory({ projectId: P, module: 'ops', kind: 'rule', title: 'Logs', content: 'rotate logs daily', verified: true });
    await searchMemories(db, { projectId: P, query: 'rotate logs' });
    await flush();
    await flush();
    const row = db.prepare('SELECT embedded FROM memories').get() as any;
    expect(row.embedded).toBe(0);
  });
});

// --- Task 5: budget packing ---
describe('packMemoriesIntoBudget', () => {
  it('skips an oversized top item and still packs smaller later items', () => {
    const packed = packMemoriesIntoBudget([mem('big', 3, 4000), mem('s1', 2, 40), mem('s2', 1, 40)], 100);
    expect(packed.packed.map((p) => p.memory.id)).toEqual(['s1', 's2']);
  });

  it('never exceeds the budget, counting separators', () => {
    const cands = Array.from({ length: 20 }, (_, i) => mem(`m${i}`, 20 - i, 37));
    for (const budget of [0, 10, 25, 50, 77, 150, 400]) {
      const packed = packMemoriesIntoBudget(cands, budget);
      expect(packed.totalTokens).toBe(estimateTokens(packed.text));
      expect(packed.totalTokens).toBeLessThanOrEqual(budget);
    }
    expect(packMemoriesIntoBudget([mem('only', 1, 4000)], 50).packed).toHaveLength(0);
  });
});
