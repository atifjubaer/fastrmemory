import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { consolidateMemories } from '../src/db/consolidate.js';

const P = 'proj_consolidate';

describe('non-lossy consolidation', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  afterEach(() => db.close());

  it('writes a linked summary and keeps every original memory and raw event', () => {
    const eventA = repo.insertRawEvent({
      id: 'evt_consolidate_a',
      project_id: P,
      session_id: 's1',
      agent_id: 'agent',
      event_type: 'tool_error',
      raw_payload: 'first observation'
    });
    const eventB = repo.insertRawEvent({
      id: 'evt_consolidate_b',
      project_id: P,
      session_id: 's1',
      agent_id: 'agent',
      event_type: 'git_commit',
      raw_payload: 'second observation'
    });

    const first = repo.insertMemory({
      projectId: P,
      module: 'payments',
      kind: 'error_trap',
      title: 'Retry idempotently',
      content: 'Stripe retries need an idempotency key.',
      sourceEventIds: [eventA.id],
      verified: true
    });
    const second = repo.insertMemory({
      projectId: P,
      module: 'payments',
      kind: 'rule',
      title: 'Refund window',
      content: 'Refunds are allowed for 30 days.',
      sourceEventIds: [eventB.id],
      verified: true
    });
    const other = repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title: 'Token expiry',
      content: 'Use short-lived access tokens.',
      verified: true
    });

    db.prepare('UPDATE memories SET created_at = ? WHERE id = ?').run('2026-01-01T00:00:00.000Z', first.id);
    db.prepare('UPDATE memories SET created_at = ? WHERE id = ?').run('2026-01-02T00:00:00.000Z', second.id);
    db.prepare('UPDATE memories SET created_at = ? WHERE id = ?').run('2026-01-03T00:00:00.000Z', other.id);

    const result = consolidateMemories(db, repo, { projectId: P, module: 'payments' });

    expect(result.dryRun).toBe(false);
    expect(result.summaryId).toBeTruthy();
    expect(result.sourceMemoryIds).toEqual([first.id, second.id]);
    expect(result.sourceEventIds).toEqual([eventA.id, eventB.id]);
    expect(result.activeMemoryCountBefore).toBe(3);
    expect(result.activeMemoryCountAfter).toBe(4); // three originals + one summary
    expect(result.rawEventCountBefore).toBe(2);
    expect(result.rawEventCountAfter).toBe(2); // no raw event deleted or mutated

    const summary = repo.getMemory(result.summaryId!)!;
    expect(summary.kind).toBe('workflow');
    expect(summary.module).toBe('payments');
    expect(summary.title).toBe('Consolidated memory: payments');
    expect(summary.content).toContain(first.id);
    expect(summary.content).toContain(second.id);
    expect(JSON.parse(summary.source_event_ids)).toEqual([eventA.id, eventB.id]);

    // Originals remain active and byte-for-byte intact.
    expect(repo.getMemory(first.id)?.status).toBe('verified');
    expect(repo.getMemory(second.id)?.status).toBe('verified');
    expect(repo.getMemory(other.id)?.status).toBe('verified');
    expect(repo.getRawEventsForMemory(first.id)).toHaveLength(1);
    expect(repo.getRawEventsForMemory(second.id)).toHaveLength(1);
  });

  it('supports a dry run without writing a summary', () => {
    repo.insertMemory({
      projectId: P,
      module: 'payments',
      kind: 'rule',
      title: 'Refund window',
      content: 'Refunds are allowed for 30 days.',
      verified: true
    });

    const result = consolidateMemories(db, repo, { projectId: P, module: 'payments', dryRun: true });
    expect(result.dryRun).toBe(true);
    expect(result.summaryId).toBeNull();
    expect(result.activeMemoryCountAfter).toBe(result.activeMemoryCountBefore);
    const count = db.prepare('SELECT COUNT(*) AS count FROM memories').get() as any;
    expect(Number(count.count)).toBe(1);
  });
});
