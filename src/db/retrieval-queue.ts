import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

/**
 * Retrieval counters are bookkeeping, not content.
 *
 * Incrementing them on the read path turned every recall into a writer, so two agents on one
 * `.fastr/fastr.db` contended for SQLite's single write lock: one recalling while the other
 * wrote produced a 5-second `busy_timeout` stall, or an outright `SQLITE_BUSY` thrown out of
 * the recall tool. The counters feed hygiene (which memories were never recalled) and the
 * reward signal, so losing one is harmless — but stalling on it is not.
 *
 * So the read path appends to a plain file and never touches the database. A writer drains
 * the file later, when it already holds the lock for its own reasons.
 */

/** One queued recall event. */
export interface RetrievalEvent {
  memoryId: string;
  /** ISO timestamp of the recall. */
  at: string;
}

export class RetrievalQueue {
  private queuePath: string;

  constructor(queuePath: string) {
    this.queuePath = queuePath;
    // The directory is created lazily on the first append: a queue that is never used
    // should not create anything, and a path that cannot be created must not throw here —
    // the constructor runs on the read path.
  }

  /** Creates the queue's directory. Failures are left for the append to report. */
  private ensureDir(): void {
    const dir = path.dirname(this.queuePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Records that a memory was recalled.
   *
   * This must never throw: a recall that fails to record its own counter still has a valid
   * answer to give the caller. Every failure is swallowed deliberately.
   */
  record(memoryIds: string[]): void {
    if (memoryIds.length === 0) return;
    try {
      this.ensureDir();
      const at = new Date().toISOString();
      const lines = memoryIds.map((memoryId) => JSON.stringify({ memoryId, at }) + '\n');
      fs.appendFileSync(this.queuePath, lines.join(''), 'utf-8');
    } catch {
      // A missing counter costs a hygiene signal. A thrown error here would cost the recall.
    }
  }

  /** Number of queued events waiting to be drained. */
  pendingCount(): number {
    try {
      const content = fs.readFileSync(this.queuePath, 'utf-8');
      let count = 0;
      for (const line of content.split('\n')) {
        if (line.trim().length > 0) count++;
      }
      return count;
    } catch {
      return 0;
    }
  }

  /**
   * Applies the queued counters to the database.
   *
   * The file is renamed aside first, so a concurrent append lands in a fresh file and is
   * never truncated away. The rename is the only operation that can fail on Windows while
   * another process holds the file; that case is left for the next drain.
   */
  drain(db: DatabaseSync): number {
    if (!fs.existsSync(this.queuePath)) return 0;

    const drainingPath = `${this.queuePath}.${process.pid}.${Date.now()}.draining`;
    try {
      fs.renameSync(this.queuePath, drainingPath);
    } catch (err: any) {
      // Vanished (another drainer won) or locked by a writer on Windows: retry later.
      if (['ENOENT', 'EBUSY', 'EPERM', 'EACCES'].includes(err?.code)) return 0;
      return 0;
    }

    let content: string;
    try {
      content = fs.readFileSync(drainingPath, 'utf-8');
    } catch {
      try { fs.rmSync(drainingPath, { force: true }); } catch {}
      return 0;
    }

    const events: RetrievalEvent[] = [];
    for (const line of content.split('\n')) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        if (parsed && typeof parsed.memoryId === 'string' && parsed.memoryId) {
          events.push(parsed);
        }
      } catch {
        // Skip malformed lines; the rest are still usable.
      }
    }

    let applied = 0;
    if (events.length > 0) {
      // The write takes SQLite's single write lock. Never wait for it here: a drain runs
      // from the write path and from the maintenance loop, and neither should stall behind
      // another agent. `busy_timeout = 0` makes the attempt fail immediately, and the
      // events go back to the queue for the next drain.
      const previousTimeout = setBusyTimeout(db, 0);
      try {
        const stmt = db.prepare(`
          UPDATE memories
          SET retrieval_count = retrieval_count + 1,
              last_recalled_at = ?
          WHERE id = ?
        `);
        db.exec('BEGIN TRANSACTION');
        try {
          for (const event of events) {
            stmt.run(event.at || new Date().toISOString(), event.memoryId);
            applied++;
          }
          db.exec('COMMIT');
        } catch (err) {
          db.exec('ROLLBACK');
          throw err;
        }
      } catch {
        // The database was busy or the schema changed. Put the events back so a later
        // drain can apply them; losing a counter is better than losing them all.
        applied = 0;
        try {
          fs.appendFileSync(this.queuePath, content, 'utf-8');
        } catch {}
      } finally {
        setBusyTimeout(db, previousTimeout);
      }
    }

    try { fs.rmSync(drainingPath, { force: true }); } catch {}
    return applied;
  }
}

/**
 * Sets the busy timeout and returns the previous value.
 *
 * `PRAGMA busy_timeout` reports the old value, so restoring it is a single statement.
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
