import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { diffSnapshots, replayAt } from '../src/replay/snapshot.js';

const P = 'proj_replay';

describe('bitemporal replay', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  afterEach(() => db.close());

  it('reconstructs exact active sets at three timestamps and diffs them', () => {
    const event = repo.insertRawEvent({
      id: 'evt_replay_1',
      project_id: P,
      session_id: 's1',
      agent_id: 'agent',
      event_type: 'user_prompt',
      raw_payload: 'original observation'
    });
    db.prepare('UPDATE raw_events SET created_at = ? WHERE id = ?')
      .run('2026-01-01T00:00:00.000Z', event.id);

    const first = repo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'rule',
      title: 'First rule',
      content: 'first content',
      sourceEventIds: [event.id],
      verified: true
    });
    const second = repo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'rule',
      title: 'Second rule',
      content: 'second content with a deliberately longer explanation so the token delta is visible',
      verified: true
    });
    const third = repo.insertMemory({
      projectId: P,
      module: 'api',
      kind: 'decision',
      title: 'Third decision',
      content: 'third content',
      verified: true
    });

    db.prepare(`UPDATE memories SET created_at = ?, valid_from = ?, valid_to = ?, status = 'superseded', superseded_by_id = ? WHERE id = ?`)
      .run('2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z', '2026-01-02T00:00:00.000Z', second.id, first.id);
    db.prepare('UPDATE memories SET created_at = ?, valid_from = ? WHERE id = ?')
      .run('2026-01-02T00:00:00.000Z', '2026-01-02T00:00:00.000Z', second.id);
    db.prepare('UPDATE memories SET created_at = ?, valid_from = ? WHERE id = ?')
      .run('2026-01-03T00:00:00.000Z', '2026-01-03T00:00:00.000Z', third.id);

    const t1 = replayAt(db, P, '2026-01-01T12:00:00Z');
    const t2 = replayAt(db, P, '2026-01-02T12:00:00Z');
    const t3 = replayAt(db, P, '2026-01-03T12:00:00Z');

    expect(t1.memories.map((m) => m.id)).toEqual([first.id]);
    expect(t1.history).toHaveLength(0);
    expect(t1.events.map((e) => e.id)).toEqual([event.id]);
    expect(t2.memories.map((m) => m.id)).toEqual([second.id]);
    expect(t2.history.map((m) => m.id)).toEqual([first.id]);
    expect(t3.memories.map((m) => m.id)).toEqual([second.id, third.id]);
    expect(t3.history.map((m) => m.id)).toEqual([first.id]);

    // Re-running the same timestamp must produce the same hash.
    const t1Again = replayAt(db, P, '2026-01-01T12:00:00.000Z');
    expect(t1Again.contentHash).toBe(t1.contentHash);

    const diff = diffSnapshots(t1, t2);
    expect(diff.added.map((entry) => entry.id)).toEqual([second.id]);
    expect(diff.superseded.map((entry) => entry.id)).toEqual([first.id]);
    expect(diff.superseded[0].superseded_by_id).toBe(second.id);
    expect(diff.stillActive).toHaveLength(0);
    expect(diff.tokenDelta).not.toBe(0);

    const before = replayAt(db, P, '2025-12-31T23:59:59Z');
    expect(before.memories).toHaveLength(0);
    expect(before.events).toHaveLength(0);
  });
});
