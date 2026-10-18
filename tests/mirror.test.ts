import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { renderModuleMarkdown, syncModulePage } from '../src/mirror/markdown-pages.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Two-Zone Markdown Mirror', () => {
  const testDbPath = path.join(process.cwd(), 'tests', 'temp_mirror_test.db');
  const tempProjectRoot = path.join(process.cwd(), 'tests', 'temp_mirror_project');
  let db: any;
  let repo: FastrRepository;

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
    if (fs.existsSync(tempProjectRoot)) fs.rmSync(tempProjectRoot, { recursive: true, force: true });

    db = initDatabase(testDbPath);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    if (db) db.close();
    if (fs.existsSync(testDbPath)) {
      try { fs.unlinkSync(testDbPath); } catch {}
    }
    if (fs.existsSync(tempProjectRoot)) {
      try { fs.rmSync(tempProjectRoot, { recursive: true, force: true }); } catch {}
    }
  });

  it('renders Two-Zone layout with Compiled Truth on top and Timeline on bottom', () => {
    // 1. Insert active rule
    const mem1 = repo.insertMemory({
      projectId: 'proj_mirror',
      module: 'database',
      kind: 'rule',
      title: 'WAL Mode Requirement',
      content: 'Always set PRAGMA journal_mode = WAL on connection.',
      files: ['src/db.ts'],
      verified: true
    });

    // 2. Insert error trap
    repo.insertMemory({
      projectId: 'proj_mirror',
      module: 'database',
      kind: 'error_trap',
      title: 'Busy Timeout Trap',
      content: 'Failure to set busy_timeout causes SQLITE_BUSY crashes under load.',
      files: ['src/db.ts'],
      verified: true
    });

    // 3. Supersede mem1
    repo.supersedeMemory(
      mem1.id,
      'WAL Mode Requirement v2',
      'Always set PRAGMA journal_mode = WAL and synchronous = NORMAL.',
      'Performance optimization for bulk writes'
    );

    const markdown = renderModuleMarkdown(db, 'proj_mirror', 'database');

    // Check sections exist
    expect(markdown).toContain('# Module: database');
    expect(markdown).toContain('## Compiled Truth (Active Rules & Traps)');
    expect(markdown).toContain('## Append-Only Timeline (History & Superseded)');

    // Compiled Truth must contain the active v2 and the trap
    expect(markdown).toContain('WAL Mode Requirement v2');
    expect(markdown).toContain('[TRAP] Busy Timeout Trap');

    // Timeline must contain the superseded v1 rule
    expect(markdown).toContain('[EXPIRED');
    expect(markdown).toContain('WAL Mode Requirement');
    expect(markdown).toContain('Performance optimization for bulk writes');
  });

  it('syncs markdown file to .fastr/pages/<module>.md', () => {
    repo.insertMemory({
      projectId: 'proj_mirror',
      module: 'auth',
      kind: 'rule',
      title: 'Cookie SameSite',
      content: 'Set SameSite=Lax for auth cookies.',
      verified: true
    });

    const targetFile = syncModulePage(db, tempProjectRoot, 'proj_mirror', 'auth');
    expect(fs.existsSync(targetFile)).toBe(true);

    const writtenContent = fs.readFileSync(targetFile, 'utf-8');
    expect(writtenContent).toContain('Cookie SameSite');
  });
});
