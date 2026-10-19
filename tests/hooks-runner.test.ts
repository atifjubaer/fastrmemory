import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'os';
import { FastrRepository } from '../src/db/repository.js';
import { SpoolManager } from '../src/db/spool.js';
import { initDatabase } from '../src/db/schema.js';
import { runLifecycleHook, HookContext } from '../src/hooks/runner.js';

describe('Lifecycle Hooks Runner (sub-3ms WAL)', () => {
  let ctx: HookContext;
  let tempDir: string;
  const projectId = 'test-hooks-proj';

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-hooks-'));
    const dbPath = path.join(tempDir, 'fastrmemory.db');
    const spoolPath = path.join(tempDir, '.spool');
    const pagesDir = path.join(tempDir, 'pages');

    const db = initDatabase(dbPath);
    const spool = new SpoolManager(spoolPath);
    const repo = new FastrRepository(db, spool);

    ctx = {
      db,
      repo,
      spool,
      config: {
        projectId,
        projectName: 'Test Hooks Project',
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

  it('handles SessionStart and outputs latest handoff and DAG frontier', () => {
    // Record a handoff
    ctx.repo.saveHandoff({
      project_id: projectId,
      session_id: 'sess-1',
      task_title: 'Feature Implementation',
      summary: 'Completed Phase 1-3',
      next_step: 'Complete Phase 4 Action DAG',
      active_files: ['src/db/schema.ts'],
    });

    // Create an action
    ctx.repo.createAction({
      projectId,
      title: 'Wire MCP Tools',
      priority: 9,
    });

    const res = runLifecycleHook(ctx, 'SessionStart');
    expect(res.handled).toBe(true);
    expect(res.output).toContain('⚡ FastrMemory Active');
    expect(res.output).toContain('Complete Phase 4 Action DAG');
    expect(res.output).toContain('Wire MCP Tools');
  });

  it('handles PreToolUse and warns on active error traps', () => {
    ctx.repo.insertMemory({
      projectId,
      kind: 'error_trap',
      module: 'auth',
      title: 'Never store JWT in LocalStorage',
      content: 'Use HttpOnly Secure cookies to prevent XSS exfiltration.',
      files: ['src/auth/token.ts'],
      verified: true,
    });

    const resWithTrap = runLifecycleHook(ctx, 'PreToolUse', { files: ['src/auth/token.ts'] });
    expect(resWithTrap.handled).toBe(true);
    expect(resWithTrap.output).toContain('FASTRMEMORY TRAP WARNING');
    expect(resWithTrap.output).toContain('Never store JWT in LocalStorage');

    const resSafe = runLifecycleHook(ctx, 'PreToolUse', { files: ['src/utils/math.ts'] });
    expect(resSafe.handled).toBe(true);
    expect(resSafe.message).toContain('Safe to proceed');
  });

  it('handles PostToolUseFailure and buffers event in spool asynchronously', () => {
    const res = runLifecycleHook(ctx, 'PostToolUseFailure', {
      tool: 'build_test',
      error: 'Compilation failed with TS2339',
      file: 'src/api.ts',
    });
    expect(res.handled).toBe(true);
    expect(ctx.spool.hasPending()).toBe(true);
  });

  it('handles PreCompact by archiving a point-in-time snapshot', () => {
    // Add memory to archive
    ctx.repo.insertMemory({
      projectId,
      kind: 'rule',
      title: 'Snapshot Test Rule',
      content: 'Must persist across compaction.',
      verified: true,
    });

    const res = runLifecycleHook(ctx, 'PreCompact');
    expect(res.handled).toBe(true);
    expect(res.message).toContain('Captured pre-compact snapshot');

    const snapshots = ctx.repo.listSnapshots(projectId);
    expect(snapshots.length).toBe(1);
    expect(snapshots[0].tag).toContain('auto-precompact');
  });

  it('handles SessionEnd by draining spool and mirroring pages', () => {
    ctx.spool.append({
      project_id: projectId,
      session_id: 'sess-end',
      event_type: 'observation',
      raw_payload: 'test event',
      content_hash: 'hash123',
    });
    expect(ctx.spool.hasPending()).toBe(true);

    const res = runLifecycleHook(ctx, 'SessionEnd');
    expect(res.handled).toBe(true);
    expect(ctx.spool.hasPending()).toBe(false);
  });
});
