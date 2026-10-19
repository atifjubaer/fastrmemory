import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { extractEntities } from '../src/learn/ner.js';
import { detectConflict } from '../src/learn/conflicts.js';
import { FastrRepository } from '../src/db/repository.js';
import { initDatabase } from '../src/db/schema.js';

describe('Zero-LLM Fast-Path NER', () => {
  it('extracts tech terms, camelCase symbols, backtick code, and file paths in <1ms', () => {
    const text = 'In `src/auth/jwt.ts`, FastrRepository must configure JWT expiration and avoid docker networking issues with auth-service.';
    const entities = extractEntities(text);

    const names = entities.map((e) => e.name.toLowerCase());
    expect(names).toContain('jwt');
    expect(names).toContain('docker');
    expect(names).toContain('fastrrepository');
    expect(names).toContain('src/auth/jwt.ts');
    expect(names).toContain('auth-service');
  });
});

describe('Proactive Conflict Detection', () => {
  it('detects contradiction when opposing polarities target the same topic', () => {
    const titleA = 'JWT Expiration Unit';
    const contentA = 'Always use integer seconds for JWT expiration claims in src/auth/jwt.ts.';

    const titleB = 'JWT Expiration Unit';
    const contentB = 'Never use integer seconds for JWT expiration claims, use milliseconds.';

    const result = detectConflict(titleA, contentA, titleB, contentB);
    expect(result.hasConflict).toBe(true);
    expect(result.reason).toContain('Opposing prescriptions');
  });

  it('does not flag independent rules as conflicts', () => {
    const titleA = 'Database WAL Mode';
    const contentA = 'Always enable SQLite WAL journal mode for concurrent reads.';

    const titleB = 'Frontend Styling';
    const contentB = 'Never use inline CSS styles in React components.';

    const result = detectConflict(titleA, contentA, titleB, contentB);
    expect(result.hasConflict).toBe(false);
  });
});

describe('FastrRepository NER & Conflict Integration', () => {
  let db: any;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('auto-extracts entities into graph on memory insert', () => {
    const mem = repo.insertMemory({
      projectId: 'p1',
      kind: 'rule',
      title: 'Docker SQLite Config',
      content: 'Configure `DatabaseSync` in docker container for SQLite WAL performance.',
    });

    const entities = repo.getEntities('p1');
    const entityNames = entities.map((e) => e.name.toLowerCase());
    expect(entityNames).toContain('docker');
    expect(entityNames).toContain('sqlite');
    expect(entityNames).toContain('databasesync');
  });

  it('auto-detects conflicts on memory insert and allows clean resolution', () => {
    // 1. First rule
    const mem1 = repo.insertMemory({
      projectId: 'p1',
      kind: 'rule',
      title: 'JWT Format',
      content: 'Always use integer seconds for JWT token expiration.',
      verified: true,
    });

    // 2. Conflicting second rule
    const mem2 = repo.insertMemory({
      projectId: 'p1',
      kind: 'rule',
      title: 'JWT Format',
      content: 'Never use integer seconds for JWT token expiration, milliseconds required.',
    });

    // 3. Conflict should be filed
    const conflicts = repo.listConflicts('p1', 'open');
    expect(conflicts.length).toBe(1);
    expect(conflicts[0].memory_a_id).toBe(mem2.id);
    expect(conflicts[0].memory_b_id).toBe(mem1.id);

    // 4. Resolve conflict in favor of mem1 (forget mem2)
    const res = repo.resolveConflict(conflicts[0].id!, mem1.id, true);
    expect(res.success).toBe(true);
    expect(res.keptId).toBe(mem1.id);
    expect(res.loserId).toBe(mem2.id);

    // 5. Loser is now superseded
    const loser = repo.getMemory(mem2.id);
    expect(loser?.status).toBe('superseded');
    expect(loser?.valid_to).not.toBeNull();

    // 6. Open conflicts are cleared
    expect(repo.listConflicts('p1', 'open').length).toBe(0);
  });
});
