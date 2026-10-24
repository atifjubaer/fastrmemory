import { describe, it, expect, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';

const PROJECT = 'proj_conflict_queue';

interface Seeded {
  db: DatabaseSync;
  /** insertion index -> memory id */
  ids: Map<number, string>;
}

const TOPICS = [
  'JWT expiration unit',
  'SQLite journal mode',
  'HTTP retry budget',
  'Cache invalidation window',
  'Password hashing rounds',
  'Queue drain interval',
  'Vector index threshold',
  'Session cookie domain',
  'Rate limit bucket',
  'Log rotation size',
  'Worker pool ceiling',
  'Snapshot retention days',
  'Conflict scan window',
  'Embedding batch size',
  'Search fusion weight',
  'Temporal filter window',
  'Handoff summary length',
  'Trap boost multiplier',
  'Graph hop limit',
  'Provenance hash salt',
  'Tool profile default',
  'Backfill page size',
  'Tokenizer vocabulary',
  'Memory slot budget',
  'Doctor batch limit'
];

/**
 * Deterministic corpus: 25 topics x 2 opposing prescriptions, plus neutral filler that
 * must not create conflicts. Every insert returns before any analysis runs in deferred mode.
 */
function seed(conflictMode: 'sync' | 'deferred'): Seeded {
  const db = initDatabase(':memory:');
  const repo = new FastrRepository(db, undefined, { conflictMode });
  const ids = new Map<number, string>();
  let index = 0;

  const add = (title: string, content: string) => {
    const memory = repo.insertMemory({
      projectId: PROJECT,
      module: 'config',
      kind: 'rule',
      title,
      content,
      verified: true
    });
    ids.set(index++, memory.id);
  };

  for (const topic of TOPICS) {
    add(topic, `Always enable ${topic} for the production service and keep the default value.`);
    add(topic, `Never enable ${topic} for the production service; it is deprecated.`);
    add(`Unrelated note ${topic}`, `Documentation link for ${topic} lives in the wiki.`);
  }

  return { db, ids };
}

function conflictPairs(seeded: Seeded): string[] {
  const rows = seeded.db.prepare(`
    SELECT memory_a_id, memory_b_id, reason, score FROM memory_conflicts ORDER BY id ASC
  `).all() as unknown as Array<{ memory_a_id: string; memory_b_id: string; reason: string; score: number }>;
  const byId = new Map<string, number>();
  for (const [index, id] of seeded.ids) byId.set(id, index);
  return rows
    .map((row) => {
      const a = byId.get(row.memory_a_id);
      const b = byId.get(row.memory_b_id);
      return `${a}:${b}|${row.reason}|${row.score.toFixed(4)}`;
    })
    .sort();
}

describe('Deferred conflict queue', () => {
  let databases: DatabaseSync[] = [];

  afterEach(() => {
    for (const db of databases) {
      try { db.close(); } catch {}
    }
    databases = [];
  });

  it('drainConflicts() produces exactly the same rows as conflictMode: sync', () => {
    const sync = seed('sync');
    const deferred = seed('deferred');
    databases.push(sync.db, deferred.db);

    const syncPairs = conflictPairs(sync);

    // Nothing has been analysed yet: the queue holds one row per memory.
    const queued = deferred.db.prepare('SELECT COUNT(*) AS c FROM memory_conflict_queue').get() as { c: number };
    expect(queued.c).toBe(75);
    expect(conflictPairs(deferred)).toEqual([]);

    const repo = new FastrRepository(deferred.db, undefined, { conflictMode: 'deferred' });
    let drained = 0;
    for (;;) {
      const result = repo.drainConflicts(20);
      drained += result.drained;
      if (result.drained === 0) break;
    }

    expect(drained).toBe(75);
    expect(syncPairs.length).toBeGreaterThan(0);
    expect(conflictPairs(deferred)).toEqual(syncPairs);
  });

  it('commits the memory and its queue row before insertMemory() returns', () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { conflictMode: 'deferred' });

    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'decision',
      title: 'Durability contract',
      content: 'The memory row is committed before the call returns.'
    });

    const stored = db.prepare('SELECT id FROM memories WHERE id = ?').get(memory.id) as { id: string } | undefined;
    const queued = db.prepare('SELECT memory_id FROM memory_conflict_queue WHERE memory_id = ?').get(memory.id) as
      | { memory_id: string }
      | undefined;
    expect(stored?.id).toBe(memory.id);
    expect(queued?.memory_id).toBe(memory.id);
  });

  it('is idempotent: a second drain is a no-op and never duplicates conflicts', () => {
    const seeded = seed('deferred');
    databases.push(seeded.db);
    const repo = new FastrRepository(seeded.db, undefined, { conflictMode: 'deferred' });

    repo.drainConflicts(1000);
    const first = conflictPairs(seeded);
    const second = repo.drainConflicts(1000);

    expect(second).toEqual({ drained: 0, created: 0 });
    expect(conflictPairs(seeded)).toEqual(first);
  });

  it('off mode neither queues nor records conflicts', () => {
    const db = initDatabase(':memory:');
    databases.push(db);
    const repo = new FastrRepository(db, undefined, { conflictMode: 'off' });

    repo.insertMemory({ projectId: PROJECT, kind: 'rule', title: 'A', content: 'Always enable caching.' });
    repo.insertMemory({ projectId: PROJECT, kind: 'rule', title: 'A', content: 'Never enable caching.' });

    const queue = db.prepare('SELECT COUNT(*) AS c FROM memory_conflict_queue').get() as { c: number };
    const conflicts = db.prepare('SELECT COUNT(*) AS c FROM memory_conflicts').get() as { c: number };
    expect(queue.c).toBe(0);
    expect(conflicts.c).toBe(0);
  });
});
