import { describe, it, expect, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { drainFtsQueue, pendingFtsCount } from '../src/db/fts-queue.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

const PROJECT = 'proj_fts_queue';

function ftsRowCount(db: DatabaseSync, id?: string): number {
  const row = id
    ? (db.prepare('SELECT COUNT(*) AS c FROM memories_fts WHERE id = ?').get(id) as { c: number })
    : (db.prepare('SELECT COUNT(*) AS c FROM memories_fts').get() as { c: number });
  return Number(row.c);
}

describe('Deferred full-text indexing', () => {
  const databases: DatabaseSync[] = [];

  afterEach(() => {
    for (const db of databases) {
      try { db.close(); } catch {}
    }
    databases.length = 0;
  });

  it('commits the memory and its index job before returning, without indexing inline', () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { ftsMode: 'deferred' });

    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'decision',
      title: 'Durability contract',
      content: 'The row is committed before the call returns.'
    });

    expect(ftsRowCount(db, memory.id)).toBe(0);
    expect(pendingFtsCount(db)).toBe(1);
    expect(repo.pendingFtsCount()).toBe(1);
  });

  it('makes a memory searchable immediately after insertMemory() returns', async () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { ftsMode: 'deferred' });

    repo.insertMemory({
      projectId: PROJECT,
      kind: 'rule',
      title: 'Rotate signing keys',
      content: 'Rotate the Ed25519 signing keys every quarter.'
    });

    const result = await searchMemories(db, { projectId: PROJECT, query: 'Ed25519 signing keys', backfill: false });
    expect(result.memories.map((item) => item.memory.title)).toContain('Rotate signing keys');
    // The read drained the queue.
    expect(pendingFtsCount(db)).toBe(0);
  });

  it('is idempotent: repeated drains never duplicate index rows', () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { ftsMode: 'deferred' });

    for (let i = 0; i < 10; i++) {
      repo.insertMemory({ projectId: PROJECT, kind: 'rule', title: `Rule ${i}`, content: `content ${i}` });
    }

    const first = drainFtsQueue(db, { limit: 4 });
    const second = drainFtsQueue(db, { limit: 100 });
    const third = drainFtsQueue(db, { limit: 100 });

    expect(first.drained).toBe(4);
    expect(second.drained).toBe(6);
    expect(third.drained).toBe(0);
    expect(ftsRowCount(db)).toBe(10);
  });

  it('survives a crash between insert and drain', async () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { ftsMode: 'deferred' });

    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'error_trap',
      title: 'ERR_HTTP2_PROTOCOL_ERROR',
      content: 'Strip OParams and esctx before replaying cookies.'
    });

    // Simulate a process restart: a fresh connection sees the committed queue row.
    expect(pendingFtsCount(db)).toBe(1);
    const result = await searchMemories(db, { projectId: PROJECT, query: 'OParams esctx', backfill: false });
    expect(result.memories.map((item) => item.memory.id)).toContain(memory.id);
  });

  it('ftsMode sync indexes inside insertMemory() exactly like the historical path', () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { ftsMode: 'sync' });

    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'rule',
      title: 'Inline indexing',
      content: 'This row must be searchable without a drain.'
    });

    expect(ftsRowCount(db, memory.id)).toBe(1);
    expect(pendingFtsCount(db)).toBe(0);
  });

  it('keeps the index consistent when a memory is deleted or updated', async () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { ftsMode: 'deferred' });

    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'rule',
      title: 'Cache invalidation',
      content: 'Invalidate the cache on every deploy.'
    });
    drainFtsQueue(db, { limit: 100 });
    expect(ftsRowCount(db, memory.id)).toBe(1);

    repo.supersedeMemory(memory.id, 'Cache invalidation', 'Invalidate the cache hourly.', 'policy change');
    expect(ftsRowCount(db, memory.id)).toBe(1);

    db.prepare('DELETE FROM memories WHERE id = ?').run(memory.id);
    expect(ftsRowCount(db, memory.id)).toBe(0);
  });
});
