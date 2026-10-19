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
   * Drains all pending events into the SQLite database inside a single transaction.
   * Returns the count of events successfully inserted.
   */
  drain(db: DatabaseSync): number {
    if (!this.hasPending()) {
      return 0;
    }

    const content = fs.readFileSync(this.spoolFilePath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.trim().length > 0);
    if (lines.length === 0) {
      return 0;
    }

    const events: RawEvent[] = [];
    for (const line of lines) {
      try {
        events.push(JSON.parse(line));
      } catch {
        // Skip malformed lines
      }
    }

    if (events.length === 0) {
      fs.writeFileSync(this.spoolFilePath, '', 'utf-8');
      return 0;
    }

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
      // Truncate the spool file after successful commit
      fs.writeFileSync(this.spoolFilePath, '', 'utf-8');
      return events.length;
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  }
}
