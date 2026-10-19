import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'os';
import { FastrRepository } from '../src/db/repository.js';
import { initDatabase } from '../src/db/schema.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

describe('Multi-Repository Organization Federation (ATTACH DATABASE)', () => {
  let tempDir: string;
  let projectDbPath: string;
  let globalDbPath: string;
  let db: any;
  let repo: FastrRepository;
  const projectId = 'test-proj-fed';

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-fed-'));
    projectDbPath = path.join(tempDir, 'project.db');
    globalDbPath = path.join(tempDir, 'global.db');

    db = initDatabase(projectDbPath);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    try {
      if (db) db.close();
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  });

  it('attaches global database and verifies federation readiness', () => {
    expect(repo.hasGlobalDb()).toBe(false);

    const attached = repo.attachGlobalDatabase(globalDbPath);
    expect(attached).toBe(true);
    expect(repo.hasGlobalDb()).toBe(true);
  });

  it('stores global memories in global_db and recalls them across project queries', async () => {
    repo.attachGlobalDatabase(globalDbPath);

    // 1. Insert local project memory
    const localMem = repo.insertMemory({
      projectId,
      scope: 'project',
      kind: 'rule',
      module: 'auth',
      title: 'Local Project Auth Cookie',
      content: 'Local service uses auth_cookie token for session management.',
      verified: true,
    });

    // 2. Insert organization-wide global memory
    const globalTrap = repo.insertMemory({
      projectId,
      scope: 'global',
      kind: 'error_trap',
      module: 'security',
      title: 'Never Hardcode Secrets in Source Code',
      content: 'Always load private keys and database passwords from environment variables or Vault.',
      verified: true,
    });

    // 3. Query active memories for local project
    const allActive = repo.listActiveMemories(projectId);
    expect(allActive.length).toBe(2);
    expect(allActive.some((m) => m.id === localMem.id)).toBe(true);
    expect(allActive.some((m) => m.id === globalTrap.id)).toBe(true);

    // 4. Query traps: global trap should protect the project
    const traps = repo.listTraps(projectId);
    expect(traps.length).toBe(1);
    expect(traps[0].id).toBe(globalTrap.id);

    // 5. Query hybrid RRF: global memory is recalled
    const searchRes = await searchMemories(db, {
      projectId,
      query: 'private keys passwords security',
    });
    expect(searchRes.memories.length).toBeGreaterThan(0);
    expect(searchRes.memories.some((m) => m.memory.id === globalTrap.id)).toBe(true);

    // 6. List global memories
    const globals = repo.listGlobalMemories();
    expect(globals.length).toBe(1);
    expect(globals[0].id).toBe(globalTrap.id);
  });
});
