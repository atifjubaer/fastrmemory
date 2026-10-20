import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';

describe('FastrMemory Git-Style Snapshots & Rollback', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  const projectId = 'snap_test_proj';

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    applySchema(db);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it('creates point-in-time snapshot, mutates state, and rolls back cleanly', () => {
    // 1. Create baseline memory
    const mem1 = repo.insertMemory({
      projectId,
      module: 'auth',
      kind: 'rule',
      title: 'Baseline Auth Standard',
      content: 'Always use bcrypt with salt rounds >= 12',
      files: ['src/auth/hash.ts'],
      verified: true
    });

    expect(repo.listActiveMemories(projectId).length).toBe(1);

    // 2. Create Snapshot v1
    const snap1 = repo.createSnapshot(projectId, 'v1.0-baseline', 'Initial security standard');
    expect(snap1.tag).toBe('v1.0-baseline');
    expect(snap1.memoryCount).toBe(1);

    // 3. Mutate state: add a bad experimental rule
    repo.insertMemory({
      projectId,
      module: 'auth',
      kind: 'rule',
      title: 'Bad Experimental Rule',
      content: 'Use MD5 for fast hashing',
      files: ['src/auth/hash.ts'],
      verified: true
    });
    expect(repo.listActiveMemories(projectId).length).toBe(2);

    // 4. Verify snapshot list
    const snapshots = repo.listSnapshots(projectId);
    expect(snapshots.length).toBe(1);
    expect(snapshots[0].tag).toBe('v1.0-baseline');

    // 5. Rollback to Snapshot v1
    const rollback = repo.rollbackToSnapshot(projectId, snap1.id);
    expect(rollback.restoredCount).toBe(1);
    expect(rollback.snapshotTag).toBe('v1.0-baseline');

    // 6. Verify restored state: only baseline memory active; bad rule is superseded!
    const active = repo.listActiveMemories(projectId);
    expect(active.length).toBe(1);
    expect(active[0].title).toBe('Baseline Auth Standard');

    const superseded = db.prepare(`SELECT * FROM memories WHERE status = 'superseded' AND project_id = ?`).all(projectId) as any[];
    expect(superseded.length).toBeGreaterThanOrEqual(1);
    expect(superseded[0].superseded_reason).toContain('Rollback to snapshot');
  });
});
