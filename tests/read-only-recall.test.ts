import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { RetrievalQueue } from '../src/db/retrieval-queue.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

const PROJECT_ID = 'proj_read_only_recall';

describe('read-only recall', () => {
  let tempDir: string;
  let dbPath: string;
  let db: DatabaseSync;
  let queue: RetrievalQueue;
  let repo: FastrRepository;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-readonly-'));
    dbPath = path.join(tempDir, 'fastr.db');
    db = initDatabase(dbPath);
    queue = new RetrievalQueue(path.join(tempDir, 'spool', 'retrievals.jsonl'));
    repo = new FastrRepository(db, undefined, { retrievalQueue: queue, ftsMode: 'deferred' });
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  /** A second connection, like a second agent on the same project database. */
  function holdWriteLock(): { release: () => void } {
    const other = new DatabaseSync(dbPath);
    other.exec('PRAGMA journal_mode = WAL');
    other.exec('PRAGMA busy_timeout = 5000');
    other.exec('BEGIN IMMEDIATE');
    other.exec(
      "INSERT INTO memories (id, project_id, module, kind, title, content, status, created_at) " +
      "VALUES ('mem_writer', 'proj_read_only_recall', 'm', 'rule', 'writer', 'writer', 'verified', '2026-01-01T00:00:00Z')"
    );
    return {
      release: () => {
        try { other.exec('ROLLBACK'); } catch {}
        other.close();
      }
    };
  }

  function seedRule(): string {
    return repo.insertMemory({
      projectId: PROJECT_ID,
      kind: 'rule',
      title: 'Always sign tokens with the injected clock',
      content: 'Use the injected clock so tests stay deterministic.',
      verified: true,
    }).id;
  }

  it('does not throw SQLITE_BUSY while another writer holds the lock', async () => {
    seedRule();
    const lock = holdWriteLock();
    try {
      const result = await searchMemories(db, {
        projectId: PROJECT_ID,
        query: 'sign tokens injected clock',
        budgetTokens: 500,
        backfill: false,
      });
      expect(result.memories.length).toBeGreaterThan(0);
    } finally {
      lock.release();
    }
  });

  it('does not wait for the write lock', async () => {
    seedRule();
    const lock = holdWriteLock();
    const started = Date.now();
    try {
      await searchMemories(db, {
        projectId: PROJECT_ID,
        query: 'sign tokens injected clock',
        budgetTokens: 500,
        backfill: false,
      });
    } finally {
      lock.release();
    }
    // The connection's busy_timeout is 5000 ms. A blocking drain would blow past this.
    expect(Date.now() - started).toBeLessThan(1000);
  });

  it('still finds a memory that is queued for indexing', async () => {
    // The memory was inserted with deferred FTS mode, so it is in the queue, not the index.
    seedRule();
    const lock = holdWriteLock();
    try {
      const result = await searchMemories(db, {
        projectId: PROJECT_ID,
        query: 'sign tokens injected clock',
        budgetTokens: 500,
        backfill: false,
      });
      expect(result.memories.map((m) => m.memory.title)).toContain(
        'Always sign tokens with the injected clock'
      );
    } finally {
      lock.release();
    }
  });

  it('queues the retrieval counter instead of writing it', () => {
    const id = seedRule();
    repo.incrementRetrieval([id]);

    expect(queue.pendingCount()).toBe(1);
    const row = db.prepare('SELECT retrieval_count FROM memories WHERE id = ?').get(id) as
      | { retrieval_count: number }
      | undefined;
    expect(row?.retrieval_count).toBe(0);
  });

  it('applies the queued counters on the next drain', () => {
    const id = seedRule();
    repo.incrementRetrieval([id]);
    repo.incrementRetrieval([id]);

    const applied = repo.drainRetrievalCounters();
    expect(applied).toBe(2);

    const row = db.prepare('SELECT retrieval_count, last_recalled_at FROM memories WHERE id = ?').get(id) as
      | { retrieval_count: number; last_recalled_at: string | null }
      | undefined;
    expect(row?.retrieval_count).toBe(2);
    expect(row?.last_recalled_at).toBeTruthy();
    expect(queue.pendingCount()).toBe(0);
  });

  it('applies queued counters when a memory is written', () => {
    const id = seedRule();
    repo.incrementRetrieval([id]);
    expect(queue.pendingCount()).toBe(1);

    repo.insertMemory({
      projectId: PROJECT_ID,
      kind: 'rule',
      title: 'Another rule',
      content: 'Another body.',
      verified: true,
    });

    expect(queue.pendingCount()).toBe(0);
    const row = db.prepare('SELECT retrieval_count FROM memories WHERE id = ?').get(id) as
      | { retrieval_count: number }
      | undefined;
    expect(row?.retrieval_count).toBe(1);
  });

  it('keeps the counters when the database is busy', () => {
    const id = seedRule();
    repo.incrementRetrieval([id]);

    const lock = holdWriteLock();
    try {
      expect(repo.drainRetrievalCounters()).toBe(0);
      expect(queue.pendingCount()).toBe(1);
    } finally {
      lock.release();
    }

    // Once the lock is gone, the counter lands.
    expect(repo.drainRetrievalCounters()).toBe(1);
    const row = db.prepare('SELECT retrieval_count FROM memories WHERE id = ?').get(id) as
      | { retrieval_count: number }
      | undefined;
    expect(row?.retrieval_count).toBe(1);
  });

  it('never throws when the queue file cannot be written', () => {
    const id = seedRule();
    const brokenQueue = new RetrievalQueue(path.join(tempDir, 'nope', '\0invalid', 'q.jsonl'));
    const brokenRepo = new FastrRepository(db, undefined, { retrievalQueue: brokenQueue });
    expect(() => brokenRepo.incrementRetrieval([id])).not.toThrow();
  });
});
