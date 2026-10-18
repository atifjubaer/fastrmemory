import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { learnFromGitHistory } from '../src/learn/git-learner.js';

describe('FastrMemory Git-History Auto-Learner', () => {
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

  it('scans git history and extracts fix/trap lessons into staging', () => {
    const result = learnFromGitHistory(repo, 'git_learn_test', { limit: 15 });

    expect(result.commitsInspected).toBeGreaterThanOrEqual(1);
    expect(result.trapsExtracted).toBeGreaterThanOrEqual(0);

    const stagingMemories = repo.getStatus('git_learn_test');
    expect(stagingMemories.stagingCount).toBe(result.trapsExtracted);
  });
});
