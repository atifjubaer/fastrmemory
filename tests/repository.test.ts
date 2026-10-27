import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { SpoolManager } from '../src/db/spool.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('FastrRepository & SpoolManager', () => {
  const testDbPath = path.join(process.cwd(), 'tests', 'temp_repo_test.db');
  const testSpoolPath = path.join(process.cwd(), 'tests', 'temp_pending.jsonl');
  let db: any;
  let spool: SpoolManager;
  let repo: FastrRepository;

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
    if (fs.existsSync(testSpoolPath)) fs.unlinkSync(testSpoolPath);

    db = initDatabase(testDbPath);
    spool = new SpoolManager(testSpoolPath);
    repo = new FastrRepository(db, spool);
  });

  afterEach(() => {
    if (db) db.close();
    if (fs.existsSync(testDbPath)) {
      try { fs.unlinkSync(testDbPath); } catch {}
    }
    if (fs.existsSync(testSpoolPath)) {
      try { fs.unlinkSync(testSpoolPath); } catch {}
    }
  });

  it('records raw events immutably and deduplicates identical hashes', () => {
    repo.insertRawEvent({
      id: 'evt_1',
      project_id: 'proj_1',
      session_id: 'sess_1',
      event_type: 'tool_use',
      raw_payload: '{"cmd":"npm test"}'
    });

    const evt = repo.getRawEvent('evt_1');
    expect(evt).not.toBeNull();
    expect(evt?.content_hash).toBeDefined();

    // Insert same event again -> ignored by PRIMARY KEY / INSERT OR IGNORE
    repo.insertRawEvent({
      id: 'evt_1',
      project_id: 'proj_1',
      session_id: 'sess_1',
      event_type: 'tool_use',
      raw_payload: '{"cmd":"npm test"}'
    });

    const status = repo.getStatus('proj_1');
    expect(status.rawEventCount).toBe(1);
  });

  it('spools events offline and drains them in a single transaction', () => {
    spool.append({
      id: 'spool_1',
      project_id: 'proj_1',
      session_id: 'sess_1',
      agent_id: 'default',
      event_type: 'tool_error',
      raw_payload: 'Error: Connection timeout',
      content_hash: 'hash_spool_1'
    });

    expect(spool.hasPending()).toBe(true);

    const drained = spool.drain(db);
    expect(drained).toBe(1);
    expect(spool.hasPending()).toBe(false);

    const ev = repo.getRawEvent('spool_1');
    expect(ev?.raw_payload).toBe('Error: Connection timeout');
  });

  it('manages memories with staging quarantine and bi-temporal supersession', () => {
    // 1. Create staging memory
    const mem1 = repo.insertMemory({
      projectId: 'proj_1',
      module: 'auth',
      kind: 'rule',
      title: 'JWT Expiration Format v1',
      content: 'Store expiration as seconds',
      files: ['src/auth.ts']
    });

    expect(mem1.status).toBe('staging');
    expect(mem1.valid_to).toBeNull();

    // 2. Promote staging to verified
    const verifiedCount = repo.verifyStaging('proj_1');
    expect(verifiedCount).toBe(1);

    const activeList = repo.listActiveMemories('proj_1', 'auth');
    expect(activeList.length).toBe(1);
    expect(activeList[0].status).toBe('verified');

    // 3. Supersede memory (bi-temporal window test)
    const { oldMemory, newMemory } = repo.supersedeMemory(
      mem1.id,
      'JWT Expiration Format v2',
      'Store expiration as ISO string in header',
      'Standardized on RFC-7519',
      ['src/auth.ts']
    );

    expect(oldMemory.status).toBe('superseded');
    expect(oldMemory.valid_to).not.toBeNull();
    expect(oldMemory.superseded_by_id).toBe(newMemory.id);

    expect(newMemory.status).toBe('verified');
    expect(newMemory.valid_to).toBeNull();

    // Active query must only return the new memory, NEVER the superseded memory
    const activeAfterSupersede = repo.listActiveMemories('proj_1', 'auth');
    expect(activeAfterSupersede.length).toBe(1);
    expect(activeAfterSupersede[0].id).toBe(newMemory.id);
  });

  it('adjusts reward score per-ID without penalizing other memories', () => {
    const mem1 = repo.insertMemory({
      projectId: 'proj_1',
      kind: 'rule',
      title: 'Rule 1',
      content: 'Content 1'
    });
    const mem2 = repo.insertMemory({
      projectId: 'proj_1',
      kind: 'rule',
      title: 'Rule 2',
      content: 'Content 2'
    });

    // Good outcome on mem1
    const resGood = repo.updateFeedback(mem1.id, 'good');
    expect(resGood.reward_score).toBe(1.2);

    // Bad outcome on mem2
    const resBad = repo.updateFeedback(mem2.id, 'bad');
    expect(resBad.reward_score).toBe(0.5);

    // Check mem1 was unaffected by mem2's penalty
    const freshMem1 = repo.getMemory(mem1.id);
    expect(freshMem1?.reward_score).toBe(1.2);
  });

  it('retrieves memories linked to files and saves cross-agent handoffs', () => {
    const trapMem = repo.insertMemory({
      projectId: 'proj_1',
      kind: 'error_trap',
      title: 'SQLite Lock Trap',
      content: 'Always specify busy_timeout = 5000',
      files: ['src/db.ts'],
      verified: true
    });

    const fileMems = repo.getMemoriesForFile('proj_1', 'src/db.ts');
    expect(fileMems.length).toBe(1);
    expect(fileMems[0].id).toBe(trapMem.id);

    // Handoff test
    const handoff = repo.saveHandoff({
      project_id: 'proj_1',
      session_id: 'sess_99',
      task_title: 'Auth Refactor',
      summary: 'Migrated from session tokens to JWT',
      next_step: 'Add refresh token rotation endpoint',
      active_files: JSON.stringify(['src/auth.ts'])
    });

    expect(handoff.id).toBeDefined();

    const latest = repo.getLatestHandoff('proj_1');
    expect(latest?.task_title).toBe('Auth Refactor');
    expect(latest?.next_step).toBe('Add refresh token rotation endpoint');
  });

  it('generates 64-bit memory ids', () => {
    // Four bytes of entropy made a collision a coin flip at ~78k memories (birthday
    // bound), which the concurrent soak surfaced as a UNIQUE constraint failure.
    const ids = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const memory = repo.insertMemory({
        projectId: 'proj_ids',
        module: 'db',
        kind: 'rule',
        title: `Id entropy ${i}`,
        content: 'A memory row must be addressable for the life of the project.',
        verified: true
      });
      expect(memory.id).toMatch(/^mem_[0-9a-f]{16}$/);
      ids.add(memory.id);
    }
    expect(ids.size).toBe(200);
  });
});
