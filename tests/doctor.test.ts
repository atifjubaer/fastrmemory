import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { diagnoseDatabase, healDatabase } from '../src/db/doctor.js';

describe('Autonomous Database Doctor & Self-Healing', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  const projectId = 'test-proj-doctor';

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('reports healthy on clean initialized database', () => {
    const report = diagnoseDatabase(db, projectId);
    expect(report.healthy).toBe(true);
    expect(report.metrics.walMode).toBeDefined();
  });

  it('detects and heals orphaned file_links', () => {
    // Insert a valid memory
    repo.insertMemory({
      projectId,
      agentId: 'agent-1',
      module: 'auth',
      kind: 'rule',
      title: 'Valid Rule',
      content: 'Rule content',
      files: ['src/auth.ts']
    });

    // Manually inject an orphaned file_link with foreign keys temporarily off
    db.prepare('PRAGMA foreign_keys = OFF').run();
    db.prepare(`
      INSERT INTO file_links (memory_id, file_path, symbol_name)
      VALUES (?, ?, ?)
    `).run('mem_nonexistent_123', 'src/orphaned.ts', '');
    db.prepare('PRAGMA foreign_keys = ON').run();

    const diagBefore = diagnoseDatabase(db, projectId);
    expect(diagBefore.issues.some(i => i.category === 'file_links')).toBe(true);

    // Dry run does not delete
    const dryRun = healDatabase(db, projectId, { dryRun: true });
    expect(dryRun.dryRun).toBe(true);
    expect(dryRun.fixedCount).toBe(0);

    // Actual healing deletes orphan
    const healRes = healDatabase(db, projectId);
    expect(healRes.dryRun).toBe(false);
    expect(healRes.fixedCount).toBeGreaterThanOrEqual(1);

    const diagAfter = diagnoseDatabase(db, projectId);
    expect(diagAfter.issues.some(i => i.category === 'file_links')).toBe(false);
  });

  it('detects and repairs broken action edges', () => {
    // Insert a valid action
    repo.createAction({
      projectId,
      title: 'Valid Action',
      status: 'pending'
    });

    // Manually inject an invalid action_edge with foreign keys temporarily off
    db.prepare('PRAGMA foreign_keys = OFF').run();
    db.prepare(`
      INSERT INTO action_edges (source_action_id, target_action_id, edge_type)
      VALUES (?, ?, ?)
    `).run('act_nonexistent_1', 'act_nonexistent_2', 'requires');
    db.prepare('PRAGMA foreign_keys = ON').run();

    const diagBefore = diagnoseDatabase(db, projectId);
    expect(diagBefore.issues.some(i => i.category === 'actions')).toBe(true);

    // Heal repairs it
    const healRes = healDatabase(db, projectId);
    expect(healRes.actionsTaken.some(a => a.includes('Pruned'))).toBe(true);

    const diagAfter = diagnoseDatabase(db, projectId);
    expect(diagAfter.issues.some(i => i.category === 'actions')).toBe(false);
  });
});
