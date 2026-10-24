import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'os';
import { FastrRepository } from '../src/db/repository.js';
import { initDatabase } from '../src/db/schema.js';
import { exportToObsidianVault } from '../src/export/obsidian.js';

describe('Obsidian Vault Exporter', () => {
  let db: any;
  let repo: FastrRepository;
  let tempDir: string;
  const projectId = 'obsidian-test-proj';

  beforeEach(() => {
    db = initDatabase(':memory:');
    // Entities are exported from the graph, so this suite pins inline NER.
    repo = new FastrRepository(db, undefined, { nerMode: 'sync' });
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-obsidian-'));
  });

  afterEach(() => {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  });

  it('exports active memories with YAML frontmatter, wikilinks, and MOC.md', () => {
    // Insert rule
    repo.insertMemory({
      projectId,
      kind: 'rule',
      module: 'auth',
      title: 'Enforce JWT Expiration Invariants',
      content: 'Always check jwt.verify and ensure AuthService validates token timestamp before querying PostgresDB.',
      files: ['src/auth/jwt.ts', 'src/auth/service.ts'],
      verified: true,
    });

    // Insert error trap
    repo.insertMemory({
      projectId,
      kind: 'error_trap',
      module: 'db',
      title: 'Postgres Connection Pool Saturation',
      content: 'Never initialize new client without pool release inside finally block when calling PostgresDB.',
      files: ['src/db/pool.ts'],
      verified: true,
    });

    const res = exportToObsidianVault(db, projectId, tempDir);
    expect(res.exportedCount).toBe(2);
    expect(res.entitiesCount).toBeGreaterThan(0);

    // Verify folders created
    expect(fs.existsSync(path.join(tempDir, 'rules'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'error_traps'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'MOC.md'))).toBe(true);

    // Verify MOC content
    const mocContent = fs.readFileSync(path.join(tempDir, 'MOC.md'), 'utf-8');
    expect(mocContent).toContain('FastrMemory Knowledge Graph (MOC)');
    expect(mocContent).toContain('[[Enforce JWT Expiration Invariants]]');
    expect(mocContent).toContain('[[Postgres Connection Pool Saturation]]');

    // Verify wikilink insertion into memory note
    const ruleFiles = fs.readdirSync(path.join(tempDir, 'rules'));
    expect(ruleFiles.length).toBe(1);
    const ruleContent = fs.readFileSync(path.join(tempDir, 'rules', ruleFiles[0]), 'utf-8');
    expect(ruleContent).toContain('---');
    expect(ruleContent).toContain('id: "mem_');
    expect(ruleContent).toContain('title: "Enforce JWT Expiration Invariants"');
    // Notice PostgresDB or AuthService is linked if extracted as entity
    expect(ruleContent).toContain('### Linked Code Files');
    expect(ruleContent).toContain('src/auth/jwt.ts');
  });
});
