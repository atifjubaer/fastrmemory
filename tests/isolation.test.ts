import { afterEach, describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { loadConfig } from '../src/config.js';
import { createFastrServerContext, type ServerContext } from '../src/mcp/server.js';
import { TEST_HOME } from './setup.js';

const realGlobalDb = path.join(os.homedir(), '.fastr', 'global.db');

function statOrNull(file: string): { size: number; mtimeMs: number } | null {
  try {
    const stat = fs.statSync(file);
    return { size: stat.size, mtimeMs: stat.mtimeMs };
  } catch {
    return null;
  }
}

const contexts: ServerContext[] = [];

afterEach(() => {
  while (contexts.length > 0) {
    try {
      contexts.pop()!.db.close();
    } catch {}
  }
});

describe('test isolation', () => {
  it('resolves the global database inside FASTR_HOME', () => {
    const projectDir = path.join(TEST_HOME, 'project-a');
    const config = loadConfig(projectDir);
    expect(config.globalDbPath.startsWith(TEST_HOME)).toBe(true);
    expect(config.globalDbPath).not.toBe(realGlobalDb);
  });

  it('accepts an explicit home directory', () => {
    const customHome = path.join(TEST_HOME, 'explicit-home');
    const config = loadConfig(path.join(TEST_HOME, 'project-b'), customHome);
    expect(config.globalDbPath).toBe(path.join(customHome, '.fastr', 'global.db'));
  });

  it('writes global memories without touching the real home store', () => {
    const before = statOrNull(realGlobalDb);
    const ctx = createFastrServerContext(path.join(TEST_HOME, 'project-c'));
    contexts.push(ctx);

    expect(ctx.config.globalDbPath.startsWith(TEST_HOME)).toBe(true);
    expect(fs.existsSync(ctx.config.globalDbPath)).toBe(true);

    ctx.repo.insertMemory({
      projectId: ctx.config.projectId,
      module: 'isolation',
      kind: 'rule',
      title: 'Global Security Invariant',
      content: 'Isolation test sentinel. Never persisted outside the temporary home.',
      scope: 'global',
      verified: true
    });

    const globalRows = ctx.db.prepare(
      `SELECT COUNT(*) AS count FROM global_db.memories WHERE title = 'Global Security Invariant'`
    ).get() as { count: number };
    expect(globalRows.count).toBe(1);

    expect(statOrNull(realGlobalDb)).toEqual(before);
  });
});
