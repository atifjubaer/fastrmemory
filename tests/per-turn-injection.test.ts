import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'os';
import { FastrRepository } from '../src/db/repository.js';
import { SpoolManager } from '../src/db/spool.js';
import { initDatabase } from '../src/db/schema.js';
import { runLifecycleHook, toClaudeHookStdout, HookContext } from '../src/hooks/runner.js';
import { buildPerTurnContext, fitToBudget, PER_TURN_TOKEN_BUDGET } from '../src/hooks/per-turn.js';
import { FILE_EDIT_HISTORY } from '../src/db/spool.js';
import { estimateTokens } from '../src/search/budget.js';

describe('Per-turn memory injection', () => {
  let ctx: HookContext;
  let tempDir: string;
  const projectId = 'test-per-turn-proj';

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-perturn-'));
    const dbPath = path.join(tempDir, 'fastrmemory.db');
    const spoolPath = path.join(tempDir, '.spool');
    const pagesDir = path.join(tempDir, 'pages');

    const db = initDatabase(dbPath);
    const spool = new SpoolManager(spoolPath);
    const repo = new FastrRepository(db, spool, { conflictMode: 'sync' });

    ctx = {
      db,
      repo,
      spool,
      config: {
        projectId,
        projectName: 'Per Turn Test',
        dbPath,
        projectRoot: tempDir,
        pagesDir,
        spoolPath,
        useLocalEmbeddings: false,
        ftsTokenizer: 'porter unicode61',
        scoringWeights: {
          bm25: 1.0,
          vector: 1.0,
          graph: 1.0,
          rewardWeight: 0.2,
          decayRatePerDay: 0.05,
        },
      },
    };
  });

  afterEach(() => {
    try {
      if (ctx && ctx.db) ctx.db.close();
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  });

  /** Records an edit the way the PreToolUse hook does, then drains it into the database. */
  function recordEdit(files: string[]) {
    ctx.spool.append({
      project_id: projectId,
      session_id: 'sess-1',
      agent_id: 'default',
      event_type: 'tool_edit',
      tool_name: 'Edit',
      file_path: files[0] ?? null,
      raw_payload: JSON.stringify({ files }),
      content_hash: files.join('|'),
    });
    ctx.spool.drain(ctx.db);
  }

  it('injects a block on every user prompt', () => {
    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'add a login endpoint' });

    expect(res.handled).toBe(true);
    expect(res.output).toContain('<fastr_memory>');
    expect(res.output).toContain('add a login endpoint');
  });

  it('emits the additionalContext contract Claude Code expects', () => {
    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'hello' });
    const stdout = toClaudeHookStdout('UserPromptSubmit', res);

    expect(stdout).toBeTruthy();
    const parsed = JSON.parse(stdout!);
    expect(parsed.hookSpecificOutput.hookEventName).toBe('UserPromptSubmit');
    expect(parsed.hookSpecificOutput.additionalContext).toContain('<fastr_memory>');
  });

  it('includes the next step from the latest handoff', () => {
    ctx.repo.saveHandoff({
      project_id: projectId,
      session_id: 'sess-1',
      task_title: 'Phase 3',
      summary: 'Building per-turn injection',
      next_step: 'Wire the UserPromptSubmit hook into the installer',
      active_files: ['src/hooks/per-turn.ts'],
    });

    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'continue' });
    expect(res.output).toContain('Wire the UserPromptSubmit hook');
  });

  it('includes traps for the files being edited', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      title: 'Never use Date.now for token expiry',
      content: 'Use the injected clock so tests stay deterministic.',
      files: ['src/auth/jwt.ts'],
      verified: true,
    });
    recordEdit(['src/auth/jwt.ts']);

    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'edit the jwt' });
    expect(res.output).toContain('Never use Date.now');
  });

  it('does not include traps for files that are not being edited', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      title: 'Unrelated trap about the database',
      content: 'Always close the connection.',
      files: ['src/db/schema.ts'],
      verified: true,
    });
    recordEdit(['src/auth/jwt.ts']);

    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'edit the jwt' });
    expect(res.output).not.toContain('Unrelated trap about the database');
  });

  it('counts open conflicts', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Always use integer seconds for JWT token expiration.',
      verified: true,
    });
    ctx.repo.insertMemory({
      projectId,
      kind: 'rule',
      title: 'JWT expiration unit',
      content: 'Never use integer seconds for JWT token expiration; use milliseconds.',
      verified: true,
    });

    const conflicts = ctx.repo.listConflicts(projectId, 'open');
    expect(conflicts.length).toBeGreaterThan(0);

    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'hi' });
    expect(res.output).toContain('<conflicts');
  });

  it('stays within the token budget', () => {
    for (let index = 0; index < 20; index++) {
      ctx.repo.insertMemory({
        projectId,
        kind: 'error_trap',
        title: `Trap number ${index} about a very long topic that needs a lot of explanation`,
        content: 'x'.repeat(400),
        files: ['src/a.ts'],
        verified: true,
      });
    }
    recordEdit(['src/a.ts']);

    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'p'.repeat(1000) });
    expect(estimateTokens(res.output!)).toBeLessThanOrEqual(PER_TURN_TOKEN_BUDGET);
  });

  it('drops the prompt echo before dropping a trap', () => {
    const long = 'y'.repeat(2000);
    const text = fitToBudget(
      [
        '<fastr_memory>',
        '  <next_step>short step</next_step>',
        '  <traps count="1">',
        '    <trap title="t">short trap</trap>',
        '  </traps>',
        `  <prompt>${long}</prompt>`,
        '</fastr_memory>',
      ].join('\n'),
      40
    );

    expect(text).not.toContain('<prompt>');
    expect(text).toContain('<trap');
    expect(text).toContain('<next_step>');
  });

  it('drops traps before dropping the next step', () => {
    const long = 'z'.repeat(2000);
    const text = fitToBudget(
      [
        '<fastr_memory>',
        '  <next_step>short step</next_step>',
        '  <traps count="1">',
        `    <trap title="t">${long}</trap>`,
        '  </traps>',
        '</fastr_memory>',
      ].join('\n'),
      40
    );

    expect(text).not.toContain('<trap');
    expect(text).toContain('<next_step>');
  });

  it('returns an empty block when there is nothing to say', () => {
    const result = buildPerTurnContext(ctx.db, ctx.repo, projectId, { prompt: 'hi' });
    expect(result.trapCount).toBe(0);
    expect(result.conflictCount).toBe(0);
  });

  it('escapes XML in memory content', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      title: 'Avoid <script> in output',
      content: 'Never emit <script> tags & always escape "quotes".',
      files: ['src/x.ts'],
      verified: true,
    });
    recordEdit(['src/x.ts']);

    const res = runLifecycleHook(ctx, 'UserPromptSubmit', { prompt: 'hi' });
    // The raw tag must not survive; it has to come out as an escaped entity.
    expect(res.output).not.toContain('<script>');
    expect(res.output).toContain('&lt;script&gt;');
    expect(res.output).toContain('&amp;');
    expect(res.output).toContain('&quot;');
  });

  it('tracks the files from the most recent edits', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      title: 'Trap on the first file',
      content: 'Do not do the first thing.',
      files: ['src/first.ts'],
      verified: true,
    });
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      title: 'Trap on the second file',
      content: 'Do not do the second thing.',
      files: ['src/second.ts'],
      verified: true,
    });

    recordEdit(['src/first.ts']);
    recordEdit(['src/second.ts']);

    const result = buildPerTurnContext(ctx.db, ctx.repo, projectId, {});
    // The last two edits are both in scope, newest first.
    expect(result.recentFiles).toEqual(['src/second.ts', 'src/first.ts']);
    expect(result.trapCount).toBe(2);
  });

  it('ignores edits older than the last two', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      title: 'Trap on the old file',
      content: 'Do not do the old thing.',
      files: ['src/old.ts'],
      verified: true,
    });

    recordEdit(['src/old.ts']);
    recordEdit(['src/newer.ts']);
    recordEdit(['src/newest.ts']);

    const result = buildPerTurnContext(ctx.db, ctx.repo, projectId, {});
    expect(result.recentFiles).not.toContain('src/old.ts');
    expect(result.recentFiles).toContain('src/newest.ts');
  });

  it('keeps edits out of raw_events', () => {
    recordEdit(['src/a.ts']);
    recordEdit(['src/b.ts']);

    const rawEvents = ctx.db.prepare('SELECT COUNT(*) as c FROM raw_events').get() as { c: number };
    expect(rawEvents.c).toBe(0);

    const edits = ctx.db.prepare('SELECT COUNT(*) as c FROM file_edits').get() as { c: number };
    expect(edits.c).toBe(2);
  });

  it('bounds the number of retained edits', () => {
    for (let index = 0; index < FILE_EDIT_HISTORY + 15; index++) {
      recordEdit([`src/file${index}.ts`]);
    }

    const edits = ctx.db.prepare('SELECT COUNT(*) as c FROM file_edits').get() as { c: number };
    expect(edits.c).toBeLessThanOrEqual(FILE_EDIT_HISTORY);

    // The newest edit is the one that survives.
    const result = buildPerTurnContext(ctx.db, ctx.repo, projectId, {});
    expect(result.recentFiles[0]).toBe(`src/file${FILE_EDIT_HISTORY + 14}.ts`);
  });
});
