import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { distillSessionTraps } from '../src/learn/passive-distillation.js';

const PROJECT_ID = 'proj_distill_test';

describe('Passive Cognitive Distillation', () => {
  let tempDir: string;
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-distill-'));
    db = initDatabase(path.join(tempDir, 'test.db'));
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('synthesizes draft error trap from failure event and correlated file edit', () => {
    const sessionId = 'session_123';

    // 1. Record tool failure
    repo.insertRawEvent({
      id: 'err_evt_1',
      project_id: PROJECT_ID,
      session_id: sessionId,
      agent_id: 'claude-code',
      event_type: 'tool_error',
      tool_name: 'Bash',
      file_path: 'src/auth/jwt.ts',
      raw_payload: JSON.stringify({ error: 'TypeError: jwt.sign expects seconds, received NaN' })
    });

    // 2. Record file edit in the same session
    db.prepare(`
      INSERT INTO file_edits (project_id, file_path, session_id, created_at)
      VALUES (?, ?, ?, ?)
    `).run(PROJECT_ID, 'src/auth/jwt.ts', sessionId, new Date().toISOString());

    // 3. Run passive distillation
    const res = distillSessionTraps(db, PROJECT_ID, sessionId);
    expect(res.inspectedErrors).toBe(1);
    expect(res.distilledCount).toBe(1);
    expect(res.traps[0].title).toContain('TypeError: jwt.sign expects seconds');
    expect(res.traps[0].files).toEqual(['src/auth/jwt.ts']);
    expect(res.traps[0].module).toBe('auth');

    // 4. Verify in database
    const mem = repo.getMemory(res.traps[0].id);
    expect(mem).toBeDefined();
    expect(mem?.kind).toBe('error_trap');
    expect(mem?.status).toBe('staging');
    expect(JSON.parse(mem?.source_event_ids || '[]')).toEqual(['err_evt_1']);

    // 5. Re-running distillation is idempotent (no duplicates created)
    const second = distillSessionTraps(db, PROJECT_ID, sessionId);
    expect(second.distilledCount).toBe(0);
  });

  it('returns clean zero result when no tool errors exist', () => {
    const res = distillSessionTraps(db, PROJECT_ID);
    expect(res.inspectedErrors).toBe(0);
    expect(res.distilledCount).toBe(0);
    expect(res.traps).toEqual([]);
  });
});
