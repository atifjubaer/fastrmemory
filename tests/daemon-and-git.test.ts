import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { getDaemonPidFile, isPidAlive, getDaemonStatus } from '../src/daemon/service.js';
import { parseGitBlamePorcelain, cognitiveBlame } from '../src/git/blame.js';
import { checkStagedTraps, synthesizeCommitMessage } from '../src/git/commit.js';

describe('Daemon Service & Process Lifecycle', () => {
  it('correctly resolves daemon pidfile path in project .fastr directory', () => {
    const pidFile = getDaemonPidFile(process.cwd());
    expect(pidFile).toContain('.fastr');
    expect(pidFile.endsWith('daemon.json')).toBe(true);
  });

  it('correctly reports current node process is alive', () => {
    expect(isPidAlive(process.pid)).toBe(true);
  });

  it('returns running: false when no daemon.json exists', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-daemon-test-'));
    const status = await getDaemonStatus(tmpDir);
    expect(status.running).toBe(false);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});

describe('Memory-Aware Git Intelligence', () => {
  it('parses git blame porcelain output into structured metadata', () => {
    const sampleBlame = `4a8f9c1b2c3d4e5f 1 1 1
author Jane Doe
author-mail <jane@example.com>
author-time 1700000000
author-tz +0000
committer Jane Doe
committer-mail <jane@example.com>
committer-time 1700000000
committer-tz +0000
summary feat(db): enforce sqlite wal mode with 5000ms busy timeout
filename src/db/schema.ts
\t  db.exec("PRAGMA journal_mode = WAL;");
`;
    const parsed = parseGitBlamePorcelain(sampleBlame);
    expect(parsed.commitHash).toBe('4a8f9c1b2c3d4e5f');
    expect(parsed.author).toBe('Jane Doe');
    expect(parsed.summary).toBe('feat(db): enforce sqlite wal mode with 5000ms busy timeout');
    expect(parsed.lineContent).toBe('  db.exec("PRAGMA journal_mode = WAL;");');
    expect(parsed.authorTime).toContain('2023-11');
  });

  it('synthesizes conventional commit messages for staged files', () => {
    const uiMsg = synthesizeCommitMessage(['ui/src/App.tsx']);
    expect(uiMsg).toContain('ui');

    const mcpMsg = synthesizeCommitMessage(['src/mcp/server.ts']);
    expect(mcpMsg).toContain('mcp');

    const skillsMsg = synthesizeCommitMessage(['skills/fastr-trap/SKILL.md']);
    expect(skillsMsg).toContain('skills');
  });

  it('runs cognitive blame on existing tracked file without throwing', () => {
    // package.json is tracked by git in this repo
    const blame = cognitiveBlame('package.json', 1, process.cwd());
    expect(blame.filePath).toBe('package.json');
    expect(blame.lineNumber).toBe(1);
    expect(blame.commitHash).toBeDefined();
    expect(blame.author).toBeDefined();
    expect(blame.cognitiveRationale).toBeDefined();
  });
});
