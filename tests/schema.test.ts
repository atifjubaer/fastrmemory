import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase } from '../src/db/schema.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('SQLite Schema & Triggers', () => {
  const testDbPath = path.join(process.cwd(), 'tests', 'temp_test.db');

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDbPath)) {
      try {
        fs.unlinkSync(testDbPath);
      } catch {
        // ignore on lock
      }
    }
  });

  it('initializes WAL mode, tables, indices, and triggers', () => {
    const db = initDatabase(testDbPath);

    // Verify raw_events table
    db.prepare(`
      INSERT INTO raw_events (id, project_id, session_id, event_type, raw_payload, content_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('evt_1', 'proj_test', 'sess_1', 'tool_use', '{"tool":"test"}', 'hash123');

    const event = db.prepare('SELECT * FROM raw_events WHERE id = ?').get('evt_1') as any;
    expect(event.id).toBe('evt_1');
    expect(event.event_type).toBe('tool_use');

    // Verify memories table and automatic FTS5 trigger sync
    db.prepare(`
      INSERT INTO memories (id, project_id, module, kind, title, content)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('mem_1', 'proj_test', 'auth', 'rule', 'JWT Expiration Format', 'Always use Math.floor(Date.now() / 1000) for exp');

    const memory = db.prepare('SELECT * FROM memories WHERE id = ?').get('mem_1') as any;
    expect(memory.id).toBe('mem_1');
    expect(memory.status).toBe('staging');
    expect(memory.reward_score).toBe(1.0);

    // Verify FTS5 search
    const ftsResults = db.prepare(`
      SELECT m.id, m.title
      FROM memories_fts f
      JOIN memories m ON m.id = f.id
      WHERE memories_fts MATCH ?
    `).all('JWT Expiration') as any[];

    expect(ftsResults.length).toBe(1);
    expect(ftsResults[0].id).toBe('mem_1');

    db.close();
  });
});
