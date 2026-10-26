import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { createBranch, listBranches, mergeBranch, formatBranchMergeMarkdown } from '../src/branch/manager.js';

const P = 'proj_branch_merge';

describe('memory branches and merges', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    applySchema(db);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  function rule(title: string, content: string, files: string[] = []) {
    return repo.insertMemory({
      projectId: P,
      module: 'auth',
      kind: 'rule',
      title,
      content,
      files,
      verified: true
    });
  }

  it('creates, lists, and rejects duplicate or invalid branch names', () => {
    rule('Use HS256', 'Sign tokens with HS256.', ['src/auth/jwt.ts']);

    const branch = createBranch(db, repo, P, 'feature/auth', { description: 'Auth experiment' });
    expect(branch.name).toBe('feature/auth');
    expect(branch.memoryCount).toBe(1);
    expect(branch.head_snapshot_id).toBe(branch.base_snapshot_id);
    expect(branch.snapshotTag).toBe('branch/feature/auth');
    expect(branch.lastMergedAt).toBeNull();

    rule('Use RS256', 'Upgrade to RS256.', ['src/auth/jwt.ts']);
    const branches = listBranches(db, P);
    expect(branches).toHaveLength(1);
    expect(branches[0].memoryCount).toBe(1);

    const fromSnapshot = createBranch(db, repo, P, 'feature/from-snapshot', {
      fromSnapshotId: branch.head_snapshot_id
    });
    expect(fromSnapshot.memoryCount).toBe(1);
    expect(listBranches(db, P)).toHaveLength(2);

    expect(() => createBranch(db, repo, P, 'FEATURE/AUTH')).toThrow(/already exists/i);
    expect(() => createBranch(db, repo, P, 'bad name')).toThrow(/Branch names/i);
  });

  it('adds branch-only memories and preserves target-only memories', () => {
    const first = rule('Use HS256', 'Sign tokens with HS256.', ['src/auth/jwt.ts']);
    const second = rule('Rotate keys', 'Rotate signing keys quarterly.', ['src/auth/keys.ts']);
    const snapshot = repo.createSnapshot(P, 'before-branch', 'Snapshot used to create the branch');

    // Simulate a target that dropped the second memory while the branch snapshot kept it.
    db.prepare('DELETE FROM memories WHERE id = ?').run(second.id);
    const branch = createBranch(db, repo, P, 'restore-keys', { fromSnapshotId: snapshot.id });
    const targetOnly = rule('Audit tokens', 'Log every token audit event.');

    const report = mergeBranch(db, repo, P, branch.name);
    expect(report.applied).toBe(true);
    expect(report.counts.added).toBe(1);
    expect(report.counts.unchanged).toBe(1);
    expect(report.counts.conflicts).toBe(0);
    expect(report.counts.preserved).toBe(1);
    expect(report.appliedMemories[0].action).toBe('added');
    expect(report.preserved.map((entry) => entry.id)).toContain(targetOnly.id);

    const active = repo.listActiveMemories(P);
    expect(active).toHaveLength(3);
    expect(active.map((memory) => memory.title).sort()).toEqual(['Audit tokens', 'Rotate keys', 'Use HS256'].sort());
    const restored = active.find((memory) => memory.title === 'Rotate keys');
    expect(restored?.id).not.toBe(second.id);
    expect(restored?.content).toContain('quarterly');
    expect(repo.getFilesForMemory(restored!.id)).toContain('src/auth/keys.ts');

    const listed = listBranches(db, P).find((entry) => entry.name === branch.name);
    expect(listed?.lastMergedAt).not.toBeNull();
    const mergeLog = db.prepare('SELECT * FROM memory_branch_merges WHERE branch_id = ?').all(branch.id) as any[];
    expect(mergeLog).toHaveLength(1);
    expect(mergeLog[0].added_count).toBe(1);
  });

  it('reports supersession conflicts without losing history and can resolve toward the branch', () => {
    const original = rule('Use HS256', 'Sign tokens with HS256.', ['src/auth/jwt.ts']);
    const branch = createBranch(db, repo, P, 'hs256-branch');
    const updated = repo.supersedeMemory(
      original.id,
      'Use RS256',
      'Sign tokens with RS256 and 2048-bit keys.',
      'security review',
      ['src/auth/jwt.ts']
    );

    const blocked = mergeBranch(db, repo, P, branch.name);
    expect(blocked.applied).toBe(false);
    expect(blocked.counts.conflicts).toBe(1);
    expect(blocked.conflicts[0].type).toBe('inactive_on_target');
    expect(blocked.conflicts[0].target_memory?.id).toBe(updated.newMemory.id);
    expect(blocked.appliedMemories).toHaveLength(0);
    expect(repo.listActiveMemories(P)).toHaveLength(1);
    expect(repo.getMemory(updated.newMemory.id)?.status).toBe('verified');
    expect(formatBranchMergeMarkdown(blocked)).toContain('No memory changes were applied');

    const resolved = mergeBranch(db, repo, P, branch.name, { force: true, strategy: 'branch' });
    expect(resolved.applied).toBe(true);
    expect(resolved.counts.conflicts).toBe(1);
    expect(resolved.counts.applied).toBe(1);
    expect(resolved.appliedMemories[0].action).toBe('superseded');

    const active = repo.listActiveMemories(P);
    expect(active).toHaveLength(1);
    expect(active[0].title).toBe('Use HS256');
    expect(repo.getMemory(updated.newMemory.id)?.status).toBe('superseded');
    expect(repo.getMemory(updated.newMemory.id)?.superseded_by_id).toBe(active[0].id);
    expect(repo.getMemory(original.id)?.status).toBe('superseded');

    // created_at has one-second resolution, so two sequential merges can share it and
    // ORDER BY created_at would return them in arbitrary order. rowid is insertion order.
    const mergeLog = db.prepare('SELECT * FROM memory_branch_merges WHERE branch_id = ? ORDER BY rowid ASC').all(branch.id) as any[];
    expect(mergeLog).toHaveLength(2);
    expect(mergeLog[0].applied).toBe(0);
    expect(mergeLog[0].conflict_count).toBe(1);
    expect(mergeLog[1].applied).toBe(1);
  });
});
