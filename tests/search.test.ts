import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { searchMemories, sanitizeFtsQuery } from '../src/search/hybrid-rrf.js';
import { cosineSimilarity } from '../src/search/embeddings.js';
import { packMemoriesIntoBudget, TOKEN_LEVELS } from '../src/search/budget.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Triple-Stream Hybrid Search & Budgeting', () => {
  const testDbPath = path.join(process.cwd(), 'tests', 'temp_search_test.db');
  let db: any;
  let repo: FastrRepository;

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
    db = initDatabase(testDbPath);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    if (db) db.close();
    if (fs.existsSync(testDbPath)) {
      try { fs.unlinkSync(testDbPath); } catch {}
    }
  });

  it('sanitizes special characters for FTS5 queries', () => {
    const raw = 'How do I use "JWT" with auth:login & tokens*?';
    const sanitized = sanitizeFtsQuery(raw);
    expect(sanitized).toBe('"How" OR "use" OR "JWT" OR "with" OR "auth" OR "login" OR "tokens"');
  });

  it('computes cosine similarity accurately', () => {
    const vecA = new Float32Array([1.0, 0.0, 0.0]);
    const vecB = new Float32Array([1.0, 0.0, 0.0]);
    const vecC = new Float32Array([0.0, 1.0, 0.0]);

    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
    expect(cosineSimilarity(vecA, vecC)).toBeCloseTo(0.0);
  });

  it('retrieves memories with RRF fusion, trap boost (2.0x), and verified boost (1.25x)', async () => {
    // 1. Regular rule
    repo.insertMemory({
      projectId: 'proj_search',
      module: 'auth',
      kind: 'rule',
      title: 'Token Length Standard',
      content: 'Access tokens should be 256 bits long.',
      files: ['src/auth/jwt.ts'],
      verified: false
    });

    // 2. Error trap on the same file
    repo.insertMemory({
      projectId: 'proj_search',
      module: 'auth',
      kind: 'error_trap',
      title: 'Token Expiration Trap',
      content: 'Never use milliseconds for JWT expiration; always use Math.floor(Date.now() / 1000).',
      files: ['src/auth/jwt.ts'],
      verified: true
    });

    const result = await searchMemories(db, {
      projectId: 'proj_search',
      query: 'Token expiration and length',
      files: ['src/auth/jwt.ts']
    });

    expect(result.memories.length).toBe(2);
    // The error_trap with verified status must rank first due to 2.0x trap * 1.25x verified multipliers
    expect(result.memories[0].memory.kind).toBe('error_trap');
    expect(result.memories[0].score).toBeGreaterThan(result.memories[1].score);
    expect(result.text).toContain('[TRAP]');
  });

  it('strictly excludes superseded memories unless includeHistory is true', async () => {
    const mem1 = repo.insertMemory({
      projectId: 'proj_search',
      module: 'db',
      kind: 'rule',
      title: 'Old DB Port',
      content: 'Connect to database on port 5432.',
      verified: true
    });

    repo.supersedeMemory(
      mem1.id,
      'New DB Port',
      'Connect to database on port 6543.',
      'Upgraded to pooled proxy'
    );

    // Standard search: only active memory
    const activeResult = await searchMemories(db, {
      projectId: 'proj_search',
      query: 'database port'
    });

    expect(activeResult.memories.length).toBe(1);
    expect(activeResult.memories[0].memory.title).toBe('New DB Port');

    // Historical search: includes superseded memory
    const historyResult = await searchMemories(db, {
      projectId: 'proj_search',
      query: 'database port',
      includeHistory: true
    });

    expect(historyResult.memories.length).toBe(2);
  });

  it('enforces token budget limits during context packing', () => {
    const candidates = [
      {
        memory: {
          id: 'mem_1',
          project_id: 'p',
          agent_id: 'a',
          module: 'm',
          kind: 'rule' as const,
          title: 'Title 1',
          content: 'A'.repeat(400), // ~100 tokens
          status: 'verified' as const,
          pinned: 0,
          reward_score: 1.0,
          retrieval_count: 0,
          valid_from: '',
          valid_to: null,
          superseded_by_id: null,
          superseded_reason: null,
          source_event_ids: '[]',
          embedding: null,
          embedded: 0,
          created_at: '',
          last_recalled_at: null
        },
        score: 2.0
      },
      {
        memory: {
          id: 'mem_2',
          project_id: 'p',
          agent_id: 'a',
          module: 'm',
          kind: 'rule' as const,
          title: 'Title 2',
          content: 'B'.repeat(400), // ~100 tokens
          status: 'verified' as const,
          pinned: 0,
          reward_score: 1.0,
          retrieval_count: 0,
          valid_from: '',
          valid_to: null,
          superseded_by_id: null,
          superseded_reason: null,
          source_event_ids: '[]',
          embedding: null,
          embedded: 0,
          created_at: '',
          last_recalled_at: null
        },
        score: 1.0
      }
    ];

    // Budget allowed for 1 item (~120 tokens)
    const packed = packMemoriesIntoBudget(candidates, 120);
    expect(packed.packed.length).toBe(1);
    expect(packed.packed[0].memory.id).toBe('mem_1');
  });
});
