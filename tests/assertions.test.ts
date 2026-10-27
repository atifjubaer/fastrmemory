import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { healDatabase } from '../src/db/doctor.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { indexFileSymbols } from '../src/code/indexer.js';
import {
  clearAssertionCache,
  evaluateAssertion,
  evaluateMemoryAssertion,
  filterByAssertion,
  parseAssertion
} from '../src/db/assertions.js';

const PROJECT_ID = 'proj_assertions';

describe('memory assertions', () => {
  let tempDir: string;
  let projectRoot: string;
  let db: DatabaseSync;
  let repo: FastrRepository;

  function write(rel: string, content: string): void {
    const absolute = path.join(projectRoot, rel);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, content, 'utf8');
    clearAssertionCache();
  }

  function remove(rel: string): void {
    fs.rmSync(path.join(projectRoot, rel), { force: true });
    clearAssertionCache();
  }

  /** The trap a developer logged while fixing the JWT expiry bug. */
  function logJwtTrap(): string {
    const memory = repo.insertMemory({
      projectId: PROJECT_ID,
      module: 'auth',
      kind: 'error_trap',
      title: 'Never Use Date.now() for JWT Exp',
      content: 'Date.now() returns milliseconds; jwt exp is in seconds. Use Math.floor(Date.now() / 1000).',
      files: ['src/auth/jwt.ts'],
      verified: true,
      assertion: 'text_present:src/auth/jwt.ts::Date.now()'
    });
    return memory.id;
  }

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-assertions-'));
    projectRoot = path.join(tempDir, 'project');
    fs.mkdirSync(projectRoot, { recursive: true });
    db = initDatabase(path.join(tempDir, 'fastr.db'));
    repo = new FastrRepository(db, undefined, { projectRoot, ftsMode: 'immediate' });
    write('src/auth/jwt.ts', 'export const exp = () => Date.now();\n');
  });

  afterEach(() => {
    clearAssertionCache();
    try {
      db.close();
    } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('grammar', () => {
    it('parses all three assertion kinds', () => {
      expect(parseAssertion('text_present:src/a.ts::Date.now()')).toEqual({
        kind: 'text_present',
        file: 'src/a.ts',
        needle: 'Date.now()',
        raw: 'text_present:src/a.ts::Date.now()'
      });
      expect(parseAssertion('symbol_present:src/a.ts::signToken')).toMatchObject({
        kind: 'symbol_present',
        file: 'src/a.ts',
        needle: 'signToken'
      });
      expect(parseAssertion('file_present:src/a.ts')).toMatchObject({
        kind: 'file_present',
        file: 'src/a.ts'
      });
    });

    it('splits on the first :: so the needle may contain ::', () => {
      expect(parseAssertion('text_present:src/a.ts::a::b')).toMatchObject({
        file: 'src/a.ts',
        needle: 'a::b'
      });
    });

    it('rejects malformed assertions', () => {
      for (const raw of [
        '',
        '   ',
        'text_present:src/a.ts',
        'text_present::needle',
        'text_present:src/a.ts::',
        'file_present:',
        'regex:src/a.ts::x',
        'nonsense'
      ]) {
        expect(parseAssertion(raw), raw).toBeNull();
      }
    });
  });

  describe('evaluation', () => {
    it('refuses to store a malformed assertion', () => {
      expect(() =>
        repo.insertMemory({
          projectId: PROJECT_ID,
          module: 'auth',
          kind: 'rule',
          title: 'Bad assertion',
          content: 'Should never be stored.',
          assertion: 'regex:src/a.ts::x'
        })
      ).toThrow(/Unrecognised assertion/);
    });

    it('holds while the asserted text is present and fails after it is gone', () => {
      const parsed = parseAssertion('text_present:src/auth/jwt.ts::Date.now()')!;
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, parsed).verdict).toBe('holds');

      write('src/auth/jwt.ts', 'export const exp = () => Math.floor(new Date().getTime() / 1000);\n');
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, parsed).verdict).toBe('fails');
    });

    it('tracks file_present', () => {
      const parsed = parseAssertion('file_present:src/auth/jwt.ts')!;
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, parsed).verdict).toBe('holds');

      remove('src/auth/jwt.ts');
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, parsed).verdict).toBe('fails');
    });

    it('tracks symbol_present against the symbol index', () => {
      write('src/auth/jwt.ts', 'export function signToken() { return 1; }\n');
      indexFileSymbols(db, PROJECT_ID, 'src/auth/jwt.ts', 'export function signToken() { return 1; }\n');
      const parsed = parseAssertion('symbol_present:src/auth/jwt.ts::signToken')!;
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, parsed).verdict).toBe('holds');

      const renamed = 'export function createToken() { return 1; }\n';
      write('src/auth/jwt.ts', renamed);
      indexFileSymbols(db, PROJECT_ID, 'src/auth/jwt.ts', renamed);
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, parsed).verdict).toBe('fails');
    });

    it('returns unknown, never fails, when the check cannot be made', () => {
      const parsed = parseAssertion('text_present:src/auth/jwt.ts::Date.now()')!;

      // No project root.
      expect(evaluateAssertion(db, PROJECT_ID, undefined, parsed).verdict).toBe('unknown');
      // Path outside the project.
      const escaped = parseAssertion('text_present:../../etc/passwd::root')!;
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, escaped).verdict).toBe('unknown');
      // File is not readable.
      const missing = parseAssertion('text_present:src/nope.ts::anything')!;
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, missing).verdict).toBe('unknown');
      // Symbol index has never run for this project.
      const symbol = parseAssertion('symbol_present:src/auth/jwt.ts::signToken')!;
      expect(evaluateAssertion(db, PROJECT_ID, projectRoot, symbol).verdict).toBe('unknown');
    });

    it('treats a memory without an assertion as still holding', () => {
      expect(evaluateMemoryAssertion(db, { project_id: PROJECT_ID, assertion: null }, projectRoot)).toMatchObject({
        verdict: 'holds'
      });
    });

    it('filters a list without mutating it', () => {
      const kept = repo.insertMemory({
        projectId: PROJECT_ID,
        module: 'auth',
        kind: 'rule',
        title: 'Keep me',
        content: 'still true',
        verified: true
      });
      const spent = repo.insertMemory({
        projectId: PROJECT_ID,
        module: 'auth',
        kind: 'error_trap',
        title: 'Spend me',
        content: 'no longer true',
        files: ['src/auth/jwt.ts'],
        verified: true,
        assertion: 'text_present:src/auth/jwt.ts::Date.now()'
      });
      write('src/auth/jwt.ts', 'export const exp = () => 1;\n');

      const rows = [kept, spent] as any[];
      const live = filterByAssertion(db, rows, projectRoot);
      expect(live.map((m: any) => m.id)).toEqual([kept.id]);
      // Read side never writes.
      const status = db.prepare('SELECT status FROM memories WHERE id = ?').get(spent.id) as any;
      expect(status.status).toBe('verified');
      // Without a project root nothing is filtered.
      expect(filterByAssertion(db, rows, undefined)).toHaveLength(2);
    });
  });

  describe('the trap lifecycle', () => {
    it('retires a trap the moment its premise is fixed', async () => {
      const id = logJwtTrap();

      // 1. The trap is live.
      expect(repo.listTraps(PROJECT_ID).map((t) => t.id)).toContain(id);
      const before = await searchMemories(db, {
        projectId: PROJECT_ID,
        query: 'JWT expiry Date.now',
        projectRoot,
        backfill: false
      });
      expect(before.memories.map((m) => m.memory.id)).toContain(id);

      // 2. The bug is fixed.
      write('src/auth/jwt.ts', 'export const exp = () => Math.floor(new Date().getTime() / 1000);\n');

      // 3. Recall stops surfacing it — without writing anything.
      expect(repo.listTraps(PROJECT_ID).map((t) => t.id)).not.toContain(id);
      const after = await searchMemories(db, {
        projectId: PROJECT_ID,
        query: 'JWT expiry Date.now',
        projectRoot,
        backfill: false
      });
      expect(after.memories.map((m) => m.memory.id)).not.toContain(id);
      const untouched = db.prepare('SELECT status FROM memories WHERE id = ?').get(id) as any;
      expect(untouched.status).toBe('verified');

      // 4. Heal persists the dormancy.
      const healed = healDatabase(db, PROJECT_ID, { projectRoot });
      expect(healed.actionsTaken.join('\n')).toContain('Retired 1 memory');
      const retired = db.prepare('SELECT status, superseded_reason FROM memories WHERE id = ?').get(id) as any;
      expect(retired.status).toBe('dormant');
      expect(retired.superseded_reason).toContain('Assertion no longer holds');

      // 5. A second heal is a no-op, and the trap stays gone.
      const again = healDatabase(db, PROJECT_ID, { projectRoot });
      expect(again.actionsTaken.join('\n')).not.toContain('Retired');
      expect(repo.listTraps(PROJECT_ID).map((t) => t.id)).not.toContain(id);
    });

    it('keeps a trap whose check cannot be evaluated', () => {
      const id = logJwtTrap();
      // A checkout without the file: unknown, so the trap must survive.
      remove('src/auth/jwt.ts');
      expect(repo.listTraps(PROJECT_ID).map((t) => t.id)).toContain(id);
      expect(repo.dormantFailedAssertions(PROJECT_ID, projectRoot)).toHaveLength(0);
    });

    it('keeps a trap when the project root is unavailable', () => {
      const id = logJwtTrap();
      write('src/auth/jwt.ts', 'export const exp = () => Math.floor(new Date().getTime() / 1000);\n');
      const repoWithoutRoot = new FastrRepository(db);
      expect(repoWithoutRoot.listTraps(PROJECT_ID).map((t) => t.id)).toContain(id);
      expect(repoWithoutRoot.dormantFailedAssertions(PROJECT_ID, undefined)).toHaveLength(0);
    });

    it('also filters file-scoped lookups', () => {
      const id = logJwtTrap();
      expect(repo.getMemoriesForFile(PROJECT_ID, 'src/auth/jwt.ts').map((m) => m.id)).toContain(id);

      write('src/auth/jwt.ts', 'export const exp = () => 1;\n');
      expect(repo.getMemoriesForFile(PROJECT_ID, 'src/auth/jwt.ts').map((m) => m.id)).not.toContain(id);
    });
  });
});
