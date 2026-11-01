import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { computePrBlastRadius, runTrapGuardian } from '../src/ci/guardian.js';
import { indexProjectSymbols } from '../src/code/indexer.js';
import { FastrRepository } from '../src/db/repository.js';

const PROJECT_ID = 'proj_blast_radius_test';

describe('PR Blast Radius & Knowledge Graph Guardian', () => {
  let tempDir: string;
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-blastradius-'));
    const srcDir = path.join(tempDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    // File 1: Core database service (target of calls)
    fs.writeFileSync(
      path.join(srcDir, 'db.ts'),
      `export function executeQuery(sql: string): any[] {\n  return [];\n}`,
      'utf8'
    );

    // File 2: User service calls executeQuery
    fs.writeFileSync(
      path.join(srcDir, 'user.ts'),
      `import { executeQuery } from './db.ts';\nexport function findUser(id: string) {\n  return executeQuery("SELECT " + id);\n}`,
      'utf8'
    );

    // File 3: Auth service calls executeQuery
    fs.writeFileSync(
      path.join(srcDir, 'auth.ts'),
      `import { executeQuery } from './db.ts';\nexport function verifyUserToken(token: string) {\n  return executeQuery("SELECT " + token);\n}`,
      'utf8'
    );

    db = initDatabase(path.join(tempDir, 'test.db'));
    repo = new FastrRepository(db, undefined, { projectRoot: tempDir });

    // Index code symbols & call graph
    indexProjectSymbols(db, PROJECT_ID, tempDir, {
      files: ['src/db.ts', 'src/user.ts', 'src/auth.ts']
    });
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('computes downstream callers and impacted files when core file is modified', () => {
    const impact = computePrBlastRadius(db, PROJECT_ID, ['src/db.ts']);

    expect(impact.directFiles).toContain('src/db.ts');
    expect(impact.impactedFiles).toContain('src/user.ts');
    expect(impact.impactedFiles).toContain('src/auth.ts');
    expect(impact.impactedCallersCount).toBeGreaterThanOrEqual(2);
    expect(impact.riskScore).toBeGreaterThanOrEqual(4);

    const callerNames = impact.impactedCallers.map((c) => c.callerName);
    expect(callerNames).toContain('findUser');
    expect(callerNames).toContain('verifyUserToken');
  });

  it('generates markdown report with blast radius section in runTrapGuardian', () => {
    // Add a trap on db.ts
    repo.insertMemory({
      projectId: PROJECT_ID,
      module: 'db',
      kind: 'error_trap',
      title: 'Always Sanitize Query Parameters',
      content: 'Never concatenate user input directly into SQL strings.',
      files: ['src/db.ts'],
      verified: true
    });

    const res = runTrapGuardian({
      db,
      projectId: PROJECT_ID,
      projectRoot: tempDir,
      customFiles: ['src/db.ts'],
      strict: false
    });

    expect(res.hasViolations).toBe(true);
    expect(res.matches.length).toBe(1);
    expect(res.blastRadius).toBeDefined();
    expect(res.blastRadius?.impactedCallersCount).toBeGreaterThanOrEqual(2);
    expect(res.markdownReport).toContain('Knowledge Graph Blast Radius & Impact');
    expect(res.markdownReport).toContain('**Direct Files**: 1');
    expect(res.markdownReport).toContain('**Downstream Callers Impacted**: 2 function(s)');
  });
});
