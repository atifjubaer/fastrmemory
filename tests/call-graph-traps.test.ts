import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { indexProjectSymbols } from '../src/code/indexer.js';
import { runLifecycleHook } from '../src/hooks/runner.js';
import { SpoolManager } from '../src/db/spool.js';
import { RetrievalQueue } from '../src/db/retrieval-queue.js';

const PROJECT_ID = 'proj_call_graph_traps';

describe('Predictive 1-Hop Call-Graph Trap Propagation', () => {
  let tempDir: string;
  let db: DatabaseSync;
  let repo: FastrRepository;
  let spool: SpoolManager;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-calltraps-'));
    const srcDir = path.join(tempDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    // File 1: jwt.ts declares signToken
    fs.writeFileSync(
      path.join(srcDir, 'jwt.ts'),
      `export function signToken(payload: any): string {\n  return "token";\n}`,
      'utf8'
    );

    // File 2: api.ts calls signToken()
    fs.writeFileSync(
      path.join(srcDir, 'api.ts'),
      `import { signToken } from './jwt.ts';\nexport function handleLogin(user: string): string {\n  return signToken(user);\n}`,
      'utf8'
    );

    db = initDatabase(path.join(tempDir, 'test.db'));
    spool = new SpoolManager(path.join(tempDir, 'spool.jsonl'));
    const queue = new RetrievalQueue(path.join(tempDir, 'retrievals.jsonl'));
    repo = new FastrRepository(db, spool, { retrievalQueue: queue, projectRoot: tempDir });

    // Index code symbols & call graph
    indexProjectSymbols(db, PROJECT_ID, tempDir, {
      files: ['src/jwt.ts', 'src/api.ts']
    });
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('surfaces callee trap when editing caller file across module boundary', () => {
    // Log a trap directly on jwt.ts (callee)
    const trap = repo.insertMemory({
      projectId: PROJECT_ID,
      module: 'auth',
      kind: 'error_trap',
      title: 'Never Use Date.now() for JWT Exp',
      content: 'JWT exp expects integer seconds, Date.now() is milliseconds.',
      files: ['src/jwt.ts'],
      symbols: ['signToken'],
      verified: true
    });

    // 1. Direct file check on api.ts has 0 direct traps
    const directTraps = repo.getMemoriesForFile(PROJECT_ID, 'src/api.ts');
    expect(directTraps.length).toBe(0);

    // 2. 1-hop call-graph trap check on api.ts finds the trap from signToken()
    const callGraphTraps = repo.getCallGraphTrapsForFiles(PROJECT_ID, ['src/api.ts']);
    expect(callGraphTraps.length).toBe(1);
    expect(callGraphTraps[0].trap.id).toBe(trap.id);
    expect(callGraphTraps[0].calledSymbol).toBe('signToken');
    expect(callGraphTraps[0].callerFile).toBe('src/api.ts');
    expect(callGraphTraps[0].calleeFile).toBe('src/jwt.ts');

    // 3. PreToolUse hook warns the agent when editing api.ts
    const hookRes = runLifecycleHook(
      {
        db,
        repo,
        spool,
        config: {
          projectId: PROJECT_ID,
          projectName: 'test',
          projectRoot: tempDir,
          dbPath: path.join(tempDir, 'test.db'),
          globalDbPath: path.join(tempDir, 'global.db'),
          spoolPath: path.join(tempDir, 'spool.jsonl'),
          pagesDir: path.join(tempDir, 'pages')
        }
      },
      'pretooluse',
      {
        tool: 'Edit',
        tool_input: { file_path: 'src/api.ts' }
      }
    );

    expect(hookRes.handled).toBe(true);
    expect(hookRes.output).toContain('FASTRMEMORY CALL-GRAPH TRAP WARNING');
    expect(hookRes.output).toContain('src/api.ts calls signToken() in src/jwt.ts');
    expect(hookRes.output).toContain('Never Use Date.now() for JWT Exp');
  });
});
