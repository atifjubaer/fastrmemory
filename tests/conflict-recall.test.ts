import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

const P = 'proj_conflict_recall';

describe('Conflict-aware recall', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it('marks both sides of an open conflict in recall text and metadata', async () => {
    const first = repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Always use integer seconds for JWT token expiration.',
      verified: true
    });
    const second = repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Never use integer seconds for JWT token expiration; use milliseconds.',
      verified: true
    });

    const conflicts = repo.listConflicts(P, 'open');
    expect(conflicts).toHaveLength(1);
    const conflictId = conflicts[0].id!;

    const result = await searchMemories(db, {
      projectId: P,
      query: 'JWT expiration integer seconds',
      budgetTokens: 2000,
      backfill: false
    });

    const firstResult = result.memories.find((item) => item.memory.id === first.id);
    const secondResult = result.memories.find((item) => item.memory.id === second.id);
    expect(firstResult).toBeDefined();
    expect(secondResult).toBeDefined();

    expect(firstResult?.conflict).toMatchObject({
      conflictId,
      withMemoryId: second.id,
      withTitle: 'JWT expiration unit'
    });
    expect(secondResult?.conflict).toMatchObject({
      conflictId,
      withMemoryId: first.id,
      withTitle: 'JWT expiration unit'
    });

    expect(result.text).toContain(`OPEN CONFLICT #${conflictId}`);
    expect(result.text).toContain('fastr conflict resolve');
    expect(result.text).toContain(`--keep ${first.id}`);
    expect(result.text).toContain(`--keep ${second.id}`);
  });

  it('removes the marker after the conflict is resolved', async () => {
    const keep = repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Always use integer seconds for JWT token expiration.',
      verified: true
    });
    const lose = repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Never use integer seconds for JWT token expiration; use milliseconds.',
      verified: true
    });

    const conflict = repo.listConflicts(P, 'open')[0];
    repo.resolveConflict(conflict.id!, keep.id, true);

    const result = await searchMemories(db, {
      projectId: P,
      query: 'JWT expiration integer seconds',
      budgetTokens: 2000,
      backfill: false
    });
    expect(result.memories.every((item) => item.conflict === undefined)).toBe(true);
    expect(result.text).not.toContain('OPEN CONFLICT');
    expect(result.memories.some((item) => item.memory.id === lose.id)).toBe(false);
  });

  it('rejects a keep id that is not part of the conflict', () => {
    repo.insertMemory({
      projectId: P,
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Always use integer seconds for JWT token expiration.',
      verified: true
    });
    repo.insertMemory({
      projectId: P,
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Never use integer seconds for JWT token expiration; use milliseconds.',
      verified: true
    });
    const conflict = repo.listConflicts(P, 'open')[0];

    expect(() => repo.resolveConflict(conflict.id!, 'mem_not_in_conflict')).toThrow(
      /not part of conflict/
    );
  });

  it('rejects resolving the same conflict twice', () => {
    const keep = repo.insertMemory({
      projectId: P,
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Always use integer seconds for JWT token expiration.',
      verified: true
    });
    repo.insertMemory({
      projectId: P,
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Never use integer seconds for JWT token expiration; use milliseconds.',
      verified: true
    });
    const conflict = repo.listConflicts(P, 'open')[0];
    repo.resolveConflict(conflict.id!, keep.id);

    expect(() => repo.resolveConflict(conflict.id!, keep.id)).toThrow(/already resolved/);
  });
});
