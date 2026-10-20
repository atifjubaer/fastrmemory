import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { loadConfig } from '../src/config.js';
import { initDatabase, applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { executeMemoryCommit, TrapBlockedError } from '../src/git/commit.js';
import { cognitiveBlame } from '../src/git/blame.js';
import { learnFromGitHistory } from '../src/learn/git-learner.js';

function git(cwd: string, args: string[]): string {
  return execFileSync('git', args, { cwd, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function makeRepo(): string {
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-git-sec-')));
  git(dir, ['init', '-q']);
  git(dir, ['config', 'user.name', 'Fastr Test']);
  git(dir, ['config', 'user.email', 'fastr-test@example.invalid']);
  git(dir, ['config', 'commit.gpgsign', 'false']);
  git(dir, ['config', 'core.hooksPath', path.join(dir, '.no-hooks')]);
  fs.writeFileSync(path.join(dir, '.gitignore'), '.fastr/\n');
  fs.writeFileSync(path.join(dir, 'README.md'), 'hello\n');
  git(dir, ['add', '.']);
  git(dir, ['commit', '-q', '-m', 'init']);
  return dir;
}

function commitFile(dir: string, rel: string, content: string, message: string): void {
  const abs = path.join(dir, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  git(dir, ['add', rel]);
  git(dir, ['commit', '-q', '-m', message]);
}

describe('Git command injection hardening', () => {
  let dir: string;

  beforeEach(() => {
    dir = makeRepo();
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('commits messages with shell metacharacters verbatim without executing them', () => {
    fs.writeFileSync(path.join(dir, 'a.txt'), 'a\n');
    git(dir, ['add', 'a.txt']);

    const message = 'fix: $(touch pwned) `touch pwned2` "quoted" & echo hi > pwned3; %PATH% \'single\'';
    const res = executeMemoryCommit({ message, projectRoot: dir });

    expect(res.summary).toBe(message);
    expect(git(dir, ['log', '-1', '--format=%B']).trim()).toBe(message);
    for (const f of ['pwned', 'pwned2', 'pwned3']) {
      expect(fs.existsSync(path.join(dir, f))).toBe(false);
      expect(fs.existsSync(path.join(process.cwd(), f))).toBe(false);
    }
  });

  it('blocks commits on files governed by active error traps unless forced', () => {
    const config = loadConfig(dir);
    const db = initDatabase(config.dbPath);
    const repo = new FastrRepository(db);
    repo.insertMemory({
      projectId: config.projectId,
      module: 'src',
      kind: 'error_trap',
      title: 'Guarded file',
      content: 'Do not break a.ts',
      files: ['src/a.ts']
    });
    db.close();

    // A sibling with a similar name must not trip the trap
    fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'src', 'a.tsx'), 'x\n');
    git(dir, ['add', 'src/a.tsx']);
    const ok = executeMemoryCommit({ message: 'feat: tsx', projectRoot: dir });
    expect(ok.trapWarnings).toHaveLength(0);

    fs.writeFileSync(path.join(dir, 'src', 'a.ts'), 'x\n');
    git(dir, ['add', 'src/a.ts']);
    const headBefore = git(dir, ['rev-parse', 'HEAD']).trim();

    let thrown: unknown;
    try {
      executeMemoryCommit({ message: 'feat: touch guarded', projectRoot: dir });
    } catch (err) {
      thrown = err;
    }
    expect(thrown).toBeInstanceOf(TrapBlockedError);
    expect((thrown as Error).message).toContain('Guarded file');
    expect((thrown as Error).message).toContain('--force');
    expect((thrown as TrapBlockedError).trapWarnings).toHaveLength(1);
    expect(git(dir, ['rev-parse', 'HEAD']).trim()).toBe(headBefore);

    const forced = executeMemoryCommit({ message: 'feat: touch guarded', force: true, projectRoot: dir });
    expect(forced.trapWarnings).toHaveLength(1);
    expect(forced.commitHash).not.toBe(headBefore);
  });

  it('cognitive blame accepts absolute Windows-style paths with a :line suffix', () => {
    commitFile(dir, 'src/b.ts', 'line1\nline2\nline3\n', 'feat: add b');
    const abs = path.join(dir, 'src', 'b.ts');
    const res = cognitiveBlame(`${abs}:2`, undefined, dir);
    expect(res.filePath).toBe('src/b.ts');
    expect(res.lineNumber).toBe(2);
    expect(res.lineContent).toBe('line2');
    expect(res.summary).toBe('feat: add b');
  });

  it('blame passes file names as data, not shell syntax', () => {
    expect(() => cognitiveBlame('$(touch pwned).ts:1', undefined, dir)).toThrow(/Git blame failed/);
    expect(fs.existsSync(path.join(dir, 'pwned'))).toBe(false);
  });
});

describe('Git learner hardening', () => {
  let dir: string;
  let db: DatabaseSync;
  let repo: FastrRepository;
  const projectId = 'learn_sec';

  beforeEach(() => {
    dir = makeRepo();
    db = new DatabaseSync(':memory:');
    applySchema(db);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    db.close();
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('does not insert duplicate traps when learn is re-run', () => {
    commitFile(dir, 'src/auth/jwt.ts', 'a\n', 'fix: jwt expiry off by 1000');
    commitFile(dir, 'src/db/pool.ts', 'b\n', 'fix(db): release pool client');

    const first = learnFromGitHistory(repo, projectId, { cwd: dir });
    expect(first.trapsExtracted).toBe(2);

    const second = learnFromGitHistory(repo, projectId, { cwd: dir });
    expect(second.trapsExtracted).toBe(0);
    expect(repo.listTraps(projectId)).toHaveLength(2);

    commitFile(dir, 'src/auth/jwt.ts', 'c\n', 'fix: another jwt bug');
    const third = learnFromGitHistory(repo, projectId, { cwd: dir });
    expect(third.trapsExtracted).toBe(1);
    expect(repo.listTraps(projectId)).toHaveLength(3);
  });

  it('scrubs secrets from the stored trap content as well as the title', () => {
    const secret = 'sk-proj-ABCDEFGHIJKLMNOPQRSTUVWX123456';
    commitFile(dir, 'src/config.ts', 'x\n', `fix: remove leaked key ${secret}`);

    learnFromGitHistory(repo, projectId, { cwd: dir });
    const traps = repo.listTraps(projectId);
    expect(traps).toHaveLength(1);
    expect(traps[0].title).not.toContain(secret);
    expect(traps[0].content).not.toContain(secret);
    expect(traps[0].content).toContain('[REDACTED_OPENAI_KEY]');
  });

  it('treats the days option as data (no shell interpolation)', () => {
    commitFile(dir, 'src/x.ts', 'x\n', 'fix: x');
    const res = learnFromGitHistory(repo, projectId, { cwd: dir, days: '1"; touch pwned; echo "' as any });
    expect(fs.existsSync(path.join(dir, 'pwned'))).toBe(false);
    expect(res.commitsInspected).toBeGreaterThanOrEqual(0);
  });
});
