import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { exportSnapshotJsonl, importSnapshotJsonl } from '../src/replay/jsonl.js';
import { runMemoryCi } from '../src/ci/memory-ci.js';

const P = 'proj_memory_ci';
const AT = '2026-01-04T00:00:00.000Z';

describe('Memory CI', () => {
  let base: DatabaseSync;
  let head: DatabaseSync;

  beforeEach(() => {
    base = initDatabase(':memory:');
    head = initDatabase(':memory:');
  });

  afterEach(() => {
    base.close();
    head.close();
  });

  it('reports additions and supersessions and fails on a new trap', () => {
    const baseRepo = new FastrRepository(base);
    const oldRule = baseRepo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'rule',
      title: 'Use WAL mode',
      content: 'Enable WAL for concurrent readers.',
      verified: true
    });
    base.prepare('UPDATE memories SET valid_from = ? WHERE id = ?').run('2026-01-01T00:00:00.000Z', oldRule.id);
    const baseJsonl = exportSnapshotJsonl(base, P, AT).jsonl;

    // The head snapshot starts from the base state, then applies the PR changes.
    importSnapshotJsonl(head, baseJsonl);

    const headRepo = new FastrRepository(head);
    const newRule = headRepo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'rule',
      title: 'Use WAL mode with a busy timeout',
      content: 'Enable WAL and set busy_timeout.',
      verified: true
    });
    const newTrap = headRepo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'error_trap',
      title: 'Do not hold a write transaction open',
      content: 'Long write transactions starve readers.',
      verified: true
    });
    head.prepare(`
      UPDATE memories SET valid_from = ?, valid_to = ?, status = 'superseded', superseded_by_id = ? WHERE id = ?
    `).run('2026-01-01T00:00:00.000Z', '2026-01-02T00:00:00.000Z', newRule.id, oldRule.id);
    head.prepare('UPDATE memories SET valid_from = ? WHERE id = ?').run('2026-01-02T00:00:00.000Z', newRule.id);
    head.prepare('UPDATE memories SET valid_from = ? WHERE id = ?').run('2026-01-03T00:00:00.000Z', newTrap.id);

    const headJsonl = exportSnapshotJsonl(head, P, AT).jsonl;

    const failed = runMemoryCi({ baseJsonl, headJsonl, failOnNewTraps: true });
    expect(failed.diff.added.map((entry) => entry.id).sort()).toEqual([newRule.id, newTrap.id].sort());
    expect(failed.diff.superseded.map((entry) => entry.id)).toEqual([oldRule.id]);
    expect(failed.diff.superseded[0].superseded_by_id).toBe(newRule.id);
    expect(failed.newTrapIds).toEqual([newTrap.id]);
    expect(failed.failed).toBe(true);
    expect(failed.exitCode).toBe(1);
    expect(failed.markdown).toContain('## FastrMemory diff');
    expect(failed.markdown).toContain('New error traps');
    expect(failed.markdown).toContain(newTrap.id);

    const advisory = runMemoryCi({ baseJsonl, headJsonl, failOnNewTraps: false });
    expect(advisory.failed).toBe(false);
    expect(advisory.exitCode).toBe(0);
  });
});
