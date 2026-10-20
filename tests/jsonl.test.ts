import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { exportSnapshotJsonl, importSnapshotJsonl, snapshotFromJsonl } from '../src/replay/jsonl.js';

const P = 'proj_jsonl';
const EXPORTED_AT = '2026-01-04T00:00:00.000Z';

describe('portable JSONL snapshots', () => {
  let source: DatabaseSync;
  let target: DatabaseSync;

  beforeEach(() => {
    source = initDatabase(':memory:');
    target = initDatabase(':memory:');
  });

  afterEach(() => {
    source.close();
    target.close();
  });

  it('round-trips memories, events, links, and provenance hashes', () => {
    const repo = new FastrRepository(source);
    const event = repo.insertRawEvent({
      id: 'evt_jsonl_1',
      project_id: P,
      session_id: 's1',
      agent_id: 'agent',
      event_type: 'tool_error',
      tool_name: 'shell',
      file_path: 'src/db/schema.ts',
      raw_payload: 'SQLITE_BUSY from a concurrent write'
    });
    db(source, 'UPDATE raw_events SET created_at = ? WHERE id = ?', '2026-01-01T00:00:00.000Z', event.id);

    const memory = repo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'error_trap',
      title: 'Retry SQLITE_BUSY',
      content: 'Use a bounded busy timeout.',
      files: ['src/db/schema.ts'],
      sourceEventIds: [event.id],
      verified: true
    });
    db(source, 'UPDATE memories SET valid_from = ? WHERE id = ?', '2026-01-01T00:00:00.000Z', memory.id);

    const exported = exportSnapshotJsonl(source, P, EXPORTED_AT);
    expect(exported.memories).toBe(1);
    expect(exported.events).toBe(1);
    expect(exported.fileLinks).toBe(1);

    const imported = importSnapshotJsonl(target, exported.jsonl);
    expect(imported.memories).toBe(1);
    expect(imported.events).toBe(1);
    expect(imported.fileLinks).toBe(1);
    expect(imported.contentHash).toBe(exported.contentHash);

    const targetRepo = new FastrRepository(target);
    const restored = targetRepo.getMemory(memory.id)!;
    expect(restored.title).toBe('Retry SQLITE_BUSY');
    expect(restored.provenance_hash).toBe(memory.provenance_hash);
    expect(targetRepo.getFilesForMemory(memory.id)).toEqual(['src/db/schema.ts']);
    expect(targetRepo.getRawEvent(event.id)?.raw_payload).toContain('SQLITE_BUSY');

    const replay = snapshotFromJsonl(exported.jsonl);
    expect(replay.memories.map((entry) => entry.id)).toEqual([memory.id]);
    expect(replay.memories[0].source_event_ids).toEqual([event.id]);

    // Re-exporting the imported database must produce the same record hash.
    const reExported = exportSnapshotJsonl(target, P, EXPORTED_AT);
    expect(reExported.contentHash).toBe(exported.contentHash);
  });

  it('rejects tampered records before writing anything', () => {
    const repo = new FastrRepository(source);
    repo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'rule',
      title: 'Original title',
      content: 'Original content',
      verified: true
    });
    const exported = exportSnapshotJsonl(source, P, EXPORTED_AT);
    const tampered = exported.jsonl.replace('Original title', 'Tampered title');

    expect(() => importSnapshotJsonl(target, tampered)).toThrow(/hash mismatch/);
    const count = target.prepare('SELECT COUNT(*) AS count FROM memories').get() as any;
    expect(Number(count.count)).toBe(0);
  });

  it('supports a dry run without mutating the target', () => {
    const repo = new FastrRepository(source);
    repo.insertMemory({ projectId: P, module: 'db', kind: 'rule', title: 'Rule', content: 'Body', verified: true });
    const exported = exportSnapshotJsonl(source, P, EXPORTED_AT);

    const dry = importSnapshotJsonl(target, exported.jsonl, { dryRun: true });
    expect(dry.dryRun).toBe(true);
    expect(dry.memories).toBe(1);
    const count = target.prepare('SELECT COUNT(*) AS count FROM memories').get() as any;
    expect(Number(count.count)).toBe(0);
  });
});

function db(database: DatabaseSync, sql: string, ...params: any[]): void {
  database.prepare(sql).run(...params);
}
