import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { runTrapGuardian } from '../src/ci/guardian.js';

describe('GitHub Action Pre-Merge Trap Guardian', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  const projectId = 'test-proj-guardian';

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('passes cleanly when modified files have zero active traps', () => {
    const result = runTrapGuardian({
      db,
      projectId,
      customFiles: ['src/utils/helpers.ts', 'README.md'],
      strict: true
    });

    expect(result.success).toBe(true);
    expect(result.hasViolations).toBe(false);
    expect(result.matches.length).toBe(0);
    expect(result.markdownReport).toContain('Zero active regression traps violated');
  });

  it('detects active error traps protecting modified files', () => {
    // Record an active error trap linked to src/auth/jwt.ts
    repo.insertMemory({
      projectId,
      agentId: 'agent-1',
      module: 'auth',
      kind: 'error_trap',
      title: 'Never Use Milliseconds in JWT Expiration',
      content: 'Always use Math.floor(Date.now() / 1000).',
      files: ['src/auth/jwt.ts']
    });

    // Check PR touching src/auth/jwt.ts in non-strict mode
    const resAdvisory = runTrapGuardian({
      db,
      projectId,
      customFiles: ['src/auth/jwt.ts', 'src/server.ts'],
      strict: false
    });

    expect(resAdvisory.hasViolations).toBe(true);
    expect(resAdvisory.success).toBe(true); // advisory mode passes
    expect(resAdvisory.matches.length).toBe(1);
    expect(resAdvisory.matches[0].title).toContain('Never Use Milliseconds in JWT Expiration');
    expect(resAdvisory.markdownReport).toContain('Found 1 active error trap warning');
    expect(resAdvisory.markdownReport).toContain('Math.floor(Date.now() / 1000)');

    // Check in strict mode -> fails
    const resStrict = runTrapGuardian({
      db,
      projectId,
      customFiles: ['src/auth/jwt.ts'],
      strict: true
    });

    expect(resStrict.hasViolations).toBe(true);
    expect(resStrict.success).toBe(false); // strict mode fails CI
    expect(resStrict.markdownReport).toContain('CI Status**: Blocked');
  });

  it('ignores superseded or dormant error traps', () => {
    const mem = repo.insertMemory({
      projectId,
      agentId: 'agent-1',
      module: 'db',
      kind: 'error_trap',
      title: 'Old SQLite pragma',
      content: 'Outdated rule',
      files: ['src/db.ts']
    });

    // Mark trap as dormant/retired
    db.prepare("UPDATE memories SET status = 'dormant' WHERE id = ?").run(mem.id);

    const result = runTrapGuardian({
      db,
      projectId,
      customFiles: ['src/db.ts'],
      strict: true
    });

    expect(result.hasViolations).toBe(false);
    expect(result.success).toBe(true);
  });
});
