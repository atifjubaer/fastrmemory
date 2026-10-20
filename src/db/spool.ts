import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { RawEvent } from './schema.js';

export class SpoolManager {
  private spoolFilePath: string;

  constructor(spoolFilePath: string) {
    this.spoolFilePath = spoolFilePath;
    const dir = path.dirname(spoolFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Fast append-only write (<5ms) for offline queueing during SQLite lock or high-concurrency hooks.
   */
  append(event: Partial<RawEvent> & { project_id: string; session_id: string; event_type: string; raw_payload: string; content_hash: string }): void {
    const fullEvent: RawEvent = {
      id: event.id || `ev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      project_id: event.project_id,
      session_id: event.session_id,
      agent_id: event.agent_id || 'default',
      event_type: event.event_type,
      tool_name: event.tool_name || null,
      file_path: event.file_path || null,
      raw_payload: event.raw_payload,
      content_hash: event.content_hash,
      created_at: event.created_at || new Date().toISOString(),
    };
    const line = JSON.stringify(fullEvent) + '\n';
    fs.appendFileSync(this.spoolFilePath, line, 'utf-8');
  }

  /**
   * Returns true if there are pending events in the spool file.
   */
  hasPending(): boolean {
    return fs.existsSync(this.spoolFilePath) && fs.statSync(this.spoolFilePath).size > 0;
  }

  /**
   * Number of complete (newline-terminated) events waiting in the spool file.
   */
  pendingCount(): number {
    let content: string;
    try {
      content = fs.readFileSync(this.spoolFilePath, 'utf-8');
    } catch {
      return 0;
    }
    let count = 0;
    for (const line of content.split('\n')) {
      if (line.trim().length > 0) count++;
    }
    return count;
  }

  /**
   * Drains all pending events into the SQLite database inside a single transaction.
   * The spool file is first renamed aside so concurrent appends land in a fresh file
   * and are never truncated away. Returns the count of events successfully inserted.
   */
  drain(db: DatabaseSync): number {
    if (!this.hasPending()) {
      return 0;
    }

    const drainingPath = this.nextDrainingPath();
    try {
      fs.renameSync(this.spoolFilePath, drainingPath);
    } catch (err: any) {
      // Vanished (another drainer won) or locked by a writer on Windows: retry on next drain.
      if (['ENOENT', 'EBUSY', 'EPERM', 'EACCES'].includes(err?.code)) return 0;
      throw err;
    }

    const content = fs.readFileSync(drainingPath, 'utf-8');
    const lines = content.split('\n');
    // Text after the last newline may be an incomplete write; it is only ingested if it parses.
    const trailing = lines.pop() ?? '';

    const events: RawEvent[] = [];
    for (const line of lines) {
      if (line.trim().length === 0) continue;
      try {
        events.push(JSON.parse(line));
      } catch {
        // Skip malformed lines
      }
    }

    let partialLine: string | null = null;
    if (trailing.trim().length > 0) {
      try {
        events.push(JSON.parse(trailing));
      } catch {
        partialLine = trailing;
      }
    }

    if (events.length > 0) {
      try {
        const insertStmt = db.prepare(`
          INSERT OR IGNORE INTO raw_events (
            id, project_id, session_id, agent_id, event_type, tool_name, file_path, raw_payload, content_hash, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, strftime('%Y-%m-%dT%H:%M:%SZ', 'now')))
        `);
        db.exec('BEGIN TRANSACTION');
        try {
          for (const ev of events) {
            insertStmt.run(
              ev.id,
              ev.project_id,
              ev.session_id,
              ev.agent_id || 'default',
              ev.event_type,
              ev.tool_name || null,
              ev.file_path || null,
              ev.raw_payload,
              ev.content_hash,
              ev.created_at || null
            );
          }
          db.exec('COMMIT');
        } catch (err) {
          db.exec('ROLLBACK');
          throw err;
        }
      } catch (err) {
        // Put everything back so nothing is lost; the next drain retries.
        fs.appendFileSync(this.spoolFilePath, content, 'utf-8');
        fs.rmSync(drainingPath, { force: true });
        throw err;
      }
    }

    if (partialLine !== null) {
      // Newline-terminate so a later append is not glued onto the fragment and corrupted.
      fs.appendFileSync(this.spoolFilePath, partialLine + '\n', 'utf-8');
    }
    fs.rmSync(drainingPath, { force: true });
    return events.length;
  }

  private nextDrainingPath(): string {
    const dir = path.dirname(this.spoolFilePath);
    const base = path.basename(this.spoolFilePath, path.extname(this.spoolFilePath));
    const ts = `${Date.now()}${String(drainSeq++).padStart(4, '0')}`;
    return path.join(dir, `${base}.${process.pid}.${ts}.draining`);
  }
}

let drainSeq = 0;
