import { DatabaseSync } from 'node:sqlite';

/**
 * Deferred full-text indexing.
 *
 * The insert trigger only appends to `memory_fts_queue`; tokenizing ~10 KB of text into
 * FTS5 costs about 0.27 ms, which is 74% of the remaining foreground append budget. The
 * queue row is written in the same transaction as the memory row, so a crash can only lose
 * index freshness, never data.
 *
 * Draining is idempotent: the batch deletes any existing index rows for the queued ids
 * before re-inserting, so a duplicate queue row or a concurrent update cannot double-index
 * a memory. Readers call this before BM25 so a memory is always searchable immediately
 * after insertMemory() returns.
 */

export type FtsSchema = 'main' | 'global_db';

export interface DrainFtsResult {
  drained: number;
}

function table(schema: FtsSchema, name: string): string {
  return schema === 'global_db' ? `global_db.${name}` : name;
}

/** Number of memories waiting for full-text indexing. */
export function pendingFtsCount(db: DatabaseSync, schema: FtsSchema = 'main'): number {
  try {
    const row = db.prepare(`SELECT COUNT(*) AS c FROM ${table(schema, 'memory_fts_queue')}`).get() as
      | { c?: number }
      | undefined;
    return Number(row?.c ?? 0);
  } catch {
    return 0;
  }
}

/**
 * Indexes up to `batchSize` queued memories in one transaction and clears their queue rows.
 * Returns the number of queue rows consumed (which can exceed the number of memories when
 * the same memory was queued twice).
 */
export function drainFtsQueue(
  db: DatabaseSync,
  options: { limit?: number; schema?: FtsSchema; busyTimeoutMs?: number } = {}
): DrainFtsResult {
  const limit = Math.max(1, Math.floor(options.limit ?? 500));
  const schema = options.schema ?? 'main';
  const queue = table(schema, 'memory_fts_queue');
  const fts = table(schema, 'memories_fts');
  const memories = table(schema, 'memories');

  let boundary: { maxId: number | null; rows: number } | undefined;
  try {
    boundary = db
      .prepare(`SELECT MAX(id) AS maxId, COUNT(*) AS rows FROM (SELECT id FROM ${queue} ORDER BY id ASC LIMIT ?)`)
      .get(limit) as { maxId: number | null; rows: number } | undefined;
  } catch {
    return { drained: 0 };
  }
  if (!boundary || boundary.maxId === null || boundary.rows === 0) return { drained: 0 };

  // The write below takes SQLite's single write lock. On the read path that lock must never
  // be waited on: another agent's write would otherwise stall this caller for the full
  // `busy_timeout`. A caller that passes `busyTimeoutMs: 0` makes the attempt fail
  // immediately when the lock is held and falls back to a slightly stale index instead.
  // Writers leave the timeout alone and keep the connection's normal retry behaviour.
  const previousTimeout = options.busyTimeoutMs === undefined
    ? null
    : setBusyTimeout(db, options.busyTimeoutMs);

  try {
    db.exec('SAVEPOINT fastr_drain_fts');
    try {
      db.prepare(`DELETE FROM ${fts} WHERE id IN (SELECT memory_id FROM ${queue} WHERE id <= ?)`).run(boundary.maxId);
      db.prepare(`
        INSERT INTO ${fts}(id, title, module, content)
        SELECT m.id, m.title, m.module, m.content FROM ${memories} m
        WHERE m.id IN (SELECT memory_id FROM ${queue} WHERE id <= ?)
      `).run(boundary.maxId);
      db.prepare(`DELETE FROM ${queue} WHERE id <= ?`).run(boundary.maxId);
      db.exec('RELEASE fastr_drain_fts');
    } catch (err) {
      db.exec('ROLLBACK TO fastr_drain_fts');
      db.exec('RELEASE fastr_drain_fts');
      throw err;
    }
  } catch (err) {
    // The lock was held by another writer. Leave the queue rows in place: a later drain
    // indexes them. A stale index is a worse answer, not a broken one.
    if (!isBusyError(err)) throw err;
    return { drained: 0 };
  } finally {
    if (previousTimeout !== null) setBusyTimeout(db, previousTimeout);
  }

  return { drained: boundary.rows };
}

function isBusyError(err: any): boolean {
  const code = typeof err?.errcode === 'number' ? err.errcode & 0xff : -1;
  if (code === 5 || code === 6) return true;
  const message = String(err?.message ?? '');
  return message.includes('SQLITE_BUSY')
    || message.includes('database is locked')
    || message.includes('database table is locked');
}

/**
 * Sets the busy timeout and returns the previous value.
 *
 * `PRAGMA busy_timeout` returns the old value, so restoring it is a single statement.
 * A connection that has no timeout set reports 0.
 */
function setBusyTimeout(db: DatabaseSync, timeoutMs: number): number {
  try {
    const row = db.prepare('PRAGMA busy_timeout').get() as { timeout?: number } | undefined;
    const previous = Number(row?.timeout ?? 0);
    db.exec(`PRAGMA busy_timeout = ${Math.max(0, Math.floor(timeoutMs))}`);
    return previous;
  } catch {
    return 0;
  }
}

/**
 * Indexes one memory immediately and drops its queue row. Used by write.ftsMode = 'sync',
 * which reproduces the historical inline behaviour exactly.
 */
export function indexMemoryFtsNow(db: DatabaseSync, memoryId: string, schema: FtsSchema = 'main'): void {
  const fts = table(schema, 'memories_fts');
  const memories = table(schema, 'memories');
  const queue = table(schema, 'memory_fts_queue');

  db.exec('SAVEPOINT fastr_index_fts');
  try {
    db.prepare(`DELETE FROM ${fts} WHERE id = ?`).run(memoryId);
    db.prepare(`
      INSERT INTO ${fts}(id, title, module, content)
      SELECT id, title, module, content FROM ${memories} WHERE id = ?
    `).run(memoryId);
    db.prepare(`DELETE FROM ${queue} WHERE memory_id = ?`).run(memoryId);
    db.exec('RELEASE fastr_index_fts');
  } catch (err) {
    db.exec('ROLLBACK TO fastr_index_fts');
    db.exec('RELEASE fastr_index_fts');
    throw err;
  }
}
