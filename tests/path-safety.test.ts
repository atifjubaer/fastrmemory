import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import {
  slugifyModuleName,
  syncModulePage,
  syncAllModulePages
} from '../src/mirror/markdown-pages.js';
import { exportToObsidianVault, sanitizeNoteName } from '../src/export/obsidian.js';
import { parseBlameTarget } from '../src/git/blame.js';
import { normalizeRepoPath, repoPathMatches } from '../src/git/paths.js';
import { runTrapGuardian, isSafeGitRef } from '../src/ci/guardian.js';

describe('Module page path safety', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  let root: string;
  const projectId = 'proj_paths';

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-paths-'));
  });

  afterEach(() => {
    db.close();
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('slugifies module names to [a-z0-9_-] with a general fallback', () => {
    expect(slugifyModuleName('auth')).toBe('auth');
    expect(slugifyModuleName('Auth/JWT')).toBe('auth-jwt');
    expect(slugifyModuleName('../../README')).toBe('readme');
    expect(slugifyModuleName('C:\\Windows\\evil')).toBe('c-windows-evil');
    expect(slugifyModuleName('../..')).toBe('general');
    expect(slugifyModuleName('')).toBe('general');
    expect(slugifyModuleName('con')).toBe('con-module');
    expect(slugifyModuleName('my_mod-2')).toBe('my_mod-2');
  });

  it('never writes a module page outside .fastr/pages', () => {
    const readme = path.join(root, 'README.md');
    fs.writeFileSync(readme, 'original readme', 'utf-8');
    repo.insertMemory({ projectId, module: '../../README', kind: 'rule', title: 'Evil', content: 'pwned', verified: true });

    const target = syncModulePage(db, root, projectId, '../../README');
    const pagesDir = path.join(root, '.fastr', 'pages');
    expect(path.dirname(target)).toBe(pagesDir);
    expect(fs.readFileSync(readme, 'utf-8')).toBe('original readme');
    expect(fs.readFileSync(target, 'utf-8')).toContain('Evil');
  });

  it('writes nested and reserved module names as flat files without throwing', () => {
    repo.insertMemory({ projectId, module: 'auth/jwt', kind: 'rule', title: 'Nested', content: 'x', verified: true });
    repo.insertMemory({ projectId, module: 'auth-jwt', kind: 'rule', title: 'Flat', content: 'y', verified: true });
    repo.insertMemory({ projectId, module: 'nul', kind: 'rule', title: 'Reserved', content: 'z', verified: true });

    const files = syncAllModulePages(db, root, projectId);
    expect(files).toHaveLength(3);
    const names = files.map((f) => path.basename(f));
    expect(new Set(names).size).toBe(3);
    for (const f of files) {
      expect(path.dirname(f)).toBe(path.join(root, '.fastr', 'pages'));
      expect(path.basename(f)).toMatch(/^[a-z0-9_-]+\.md$/);
      expect(fs.existsSync(f)).toBe(true);
    }
    expect(names).toContain('auth-jwt.md');
  });
});

describe('Obsidian export safety', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  let vault: string;
  const projectId = 'proj_obsidian_safety';

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
    vault = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-vault-'));
  });

  afterEach(() => {
    db.close();
    fs.rmSync(vault, { recursive: true, force: true });
  });

  it('sanitizes note names including Windows reserved names', () => {
    expect(sanitizeNoteName('../../etc/passwd')).toBe('_.._etc_passwd');
    expect(sanitizeNoteName('con')).toBe('_con');
    expect(sanitizeNoteName('COM1')).toBe('_COM1');
    expect(sanitizeNoteName('aux.txt')).toBe('_aux.txt');
    expect(sanitizeNoteName('   ')).toBe('untitled');
    expect(sanitizeNoteName('Title [[x]] | y')).toBe('Title __x__ _ y');
  });

  it('does not overwrite same-title notes and quotes YAML frontmatter', () => {
    const a = repo.insertMemory({ projectId, kind: 'rule', module: 'core', title: 'Same Title', content: 'first body', verified: true });
    const b = repo.insertMemory({ projectId, kind: 'rule', module: 'core', title: 'Same Title', content: 'second body', verified: true });
    repo.insertMemory({ projectId, kind: 'rule', module: 'weird: module # x', title: 'nul', content: 'reserved', verified: true });

    exportToObsidianVault(db, projectId, vault);
    const ruleFiles = fs.readdirSync(path.join(vault, 'rules'));
    expect(ruleFiles).toHaveLength(3);

    const bodies = ruleFiles.map((f) => fs.readFileSync(path.join(vault, 'rules', f), 'utf-8'));
    expect(bodies.some((c) => c.includes('first body'))).toBe(true);
    expect(bodies.some((c) => c.includes('second body'))).toBe(true);
    const suffixed = ruleFiles.find((f) => f.includes(a.id) || f.includes(b.id));
    expect(suffixed).toBeDefined();
    expect(ruleFiles).toContain('_nul.md');

    const reserved = fs.readFileSync(path.join(vault, 'rules', '_nul.md'), 'utf-8');
    expect(reserved).toContain('module: "weird: module # x"');
    expect(reserved).toContain('title: "nul"');
    expect(reserved).toMatch(/reward_score: [0-9.]+\n/);
  });

  it('does not nest wikilinks for overlapping entity names', () => {
    db.prepare('INSERT INTO entities (id, project_id, name, entity_type) VALUES (?, ?, ?, ?)').run('ent_a', projectId, 'Gateway', 'service');
    db.prepare('INSERT INTO entities (id, project_id, name, entity_type) VALUES (?, ?, ?, ?)').run('ent_b', projectId, 'Gateway Router', 'service');
    repo.insertMemory({
      projectId,
      kind: 'decision',
      module: 'net',
      title: 'Routing decision',
      content: 'Use the Gateway Router in front of the Gateway. Keep `Gateway` in code untouched.',
      verified: true
    });

    exportToObsidianVault(db, projectId, vault);
    const files = fs.readdirSync(path.join(vault, 'decisions'));
    const content = fs.readFileSync(path.join(vault, 'decisions', files[0]), 'utf-8');
    expect(content).not.toContain('[[[[');
    expect(content).not.toMatch(/\[\[[^\]]*\[\[/);
    expect(content).toContain('[[Gateway Router]]');
    expect(content).toContain('the [[Gateway]].');
    expect(content).toContain('`Gateway`');
  });
});

describe('Git path helpers', () => {
  it('parses blame targets using the last numeric colon segment', () => {
    expect(parseBlameTarget('C:\\repo\\a.ts:42')).toEqual({ filePath: 'C:\\repo\\a.ts', line: 42 });
    expect(parseBlameTarget('C:\\repo\\a.ts')).toEqual({ filePath: 'C:\\repo\\a.ts' });
    expect(parseBlameTarget('src/a.ts:7')).toEqual({ filePath: 'src/a.ts', line: 7 });
    expect(parseBlameTarget('src/a.ts')).toEqual({ filePath: 'src/a.ts' });
    expect(parseBlameTarget('weird:name.ts')).toEqual({ filePath: 'weird:name.ts' });
  });

  it('matches repo paths exactly (no basename or substring matches)', () => {
    expect(repoPathMatches('src/auth/index.ts', 'src/auth/index.ts')).toBe(true);
    expect(repoPathMatches('.\\src\\Auth\\index.ts', 'src/auth/index.ts')).toBe(true);
    expect(repoPathMatches('src/auth/jwt.ts', 'src/auth')).toBe(true);
    expect(repoPathMatches('src/ui/index.ts', 'src/auth/index.ts')).toBe(false);
    expect(repoPathMatches('src/a.tsx', 'src/a.ts')).toBe(false);
    expect(repoPathMatches('src/a.ts', 'src/a.tsx')).toBe(false);
    expect(repoPathMatches('src/auth-old/x.ts', 'src/auth')).toBe(false);
    expect(normalizeRepoPath(path.join(os.tmpdir(), 'r', 'src', 'x.ts'), path.join(os.tmpdir(), 'r'))).toBe('src/x.ts');
  });

  it('rejects option-like git refs', () => {
    expect(isSafeGitRef('origin/main')).toBe(true);
    expect(isSafeGitRef('--output=/tmp/x')).toBe(false);
    expect(isSafeGitRef('main; rm -rf /')).toBe(false);
    expect(isSafeGitRef('')).toBe(false);
  });

  it('guardian does not match traps by basename or substring', () => {
    const db = initDatabase(':memory:');
    const repo = new FastrRepository(db);
    const projectId = 'proj_guardian_paths';
    repo.insertMemory({ projectId, module: 'auth', kind: 'error_trap', title: 'Auth index trap', content: 'x', files: ['src/auth/index.ts'] });
    repo.insertMemory({ projectId, module: 'ui', kind: 'error_trap', title: 'A trap', content: 'y', files: ['src/a.ts'] });

    const unrelated = runTrapGuardian({ db, projectId, customFiles: ['src/ui/index.ts', 'src/a.tsx'], strict: true });
    expect(unrelated.matches).toHaveLength(0);
    expect(unrelated.success).toBe(true);

    const related = runTrapGuardian({ db, projectId, customFiles: ['src\\auth\\index.ts', 'src/a.ts'], strict: true });
    expect(related.matches.map((m) => m.title).sort()).toEqual(['A trap', 'Auth index trap']);
    expect(related.success).toBe(false);
    db.close();
  });
});
