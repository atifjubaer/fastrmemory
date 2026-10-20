import { describe, it, expect } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import {
  ACTIVE_TRAPS_SQL,
  buildTrapIndex,
  normalizeTrapPath,
  parseTrapListOutput,
  resolveCliInvocation,
  TrapRow,
} from '../extensions/vscode/src/traps.js';

describe('vscode extension: normalizeTrapPath', () => {
  it('matches Windows editor paths against forward-slash DB paths', () => {
    const root = 'C:\\Repo\\Proj';
    const editor = normalizeTrapPath('C:\\Repo\\Proj\\src\\DB\\Schema.ts', root, 'win32');
    expect(editor).toBe('src/db/schema.ts');
    expect(normalizeTrapPath('src/db/schema.ts', root, 'win32')).toBe(editor);
    expect(normalizeTrapPath('./src\\db\\schema.ts', root, 'win32')).toBe(editor);
  });

  it('keeps case on POSIX and relativizes absolute paths', () => {
    expect(normalizeTrapPath('/home/u/proj/src/A.ts', '/home/u/proj', 'linux')).toBe('src/A.ts');
    expect(normalizeTrapPath('/elsewhere/a.ts', '/home/u/proj', 'linux')).toBe('/elsewhere/a.ts');
  });
});

describe('vscode extension: trap query and index', () => {
  it('includes verified + staging traps and excludes superseded/dormant/closed', () => {
    const db = new DatabaseSync(':memory:');
    try {
      db.exec(`
        CREATE TABLE memories (id TEXT PRIMARY KEY, kind TEXT, status TEXT, title TEXT, content TEXT,
          module TEXT, reward_score REAL, valid_to TEXT);
        CREATE TABLE file_links (memory_id TEXT, file_path TEXT, symbol_name TEXT DEFAULT '');
        INSERT INTO memories VALUES
          ('v1','error_trap','verified','V','c','m',2.0,NULL),
          ('s1','error_trap','staging','S','c','m',NULL,NULL),
          ('x1','error_trap','superseded','X','c','m',2.0,NULL),
          ('d1','error_trap','dormant','D','c','m',2.0,NULL),
          ('c1','error_trap','verified','C','c','m',2.0,'2026-01-01'),
          ('r1','rule','verified','R','c','m',1.0,NULL);
        INSERT INTO file_links (memory_id, file_path) VALUES ('v1','src/a.ts'),('v1','src/b.ts'),('s1','src/a.ts');
      `);
      const rows = db.prepare(ACTIVE_TRAPS_SQL).all() as unknown as TrapRow[];
      const idx = buildTrapIndex(rows, '/root', 'linux');
      expect(idx.traps.map((t) => t.id).sort()).toEqual(['s1', 'v1']);
      expect(idx.traps.find((t) => t.id === 's1')?.status).toBe('staging');
      expect(idx.traps.find((t) => t.id === 'v1')?.filePaths).toEqual(['src/a.ts', 'src/b.ts']);
      expect(idx.byFile.get('src/a.ts')?.map((t) => t.id).sort()).toEqual(['s1', 'v1']);
    } finally {
      db.close();
    }
  });
});

describe('vscode extension: CLI fallback', () => {
  it('parses `fastrmemory trap list` output', () => {
    const out = [
      '',
      '=== FastrMemory Active Error Traps (2) ===',
      '- [abc-1] [VERIFIED] "Do not (re)open WAL" (db) • Recall Boost: 2.0x',
      '- [abc-2] [STAGING] "Learned trap" (general) • Recall Boost: 2.0x',
      '',
    ].join('\n');
    const traps = parseTrapListOutput(out);
    expect(traps).toHaveLength(2);
    expect(traps[0]).toMatchObject({ id: 'abc-1', status: 'verified', title: 'Do not (re)open WAL', module: 'db' });
    expect(traps[1]).toMatchObject({ id: 'abc-2', status: 'staging' });
  });

  it('resolves the CLI without needing a shell on Windows', () => {
    const files = new Set(['C:\\npm\\fastrmemory.cmd', 'C:\\npm\\node_modules\\fastrmemory\\dist\\bin\\fastr.js']);
    const inv = resolveCliInvocation({ platform: 'win32', workspaceRoot: 'C:\\ws', envPath: 'C:\\x;C:\\npm', exists: (p) => files.has(p) });
    expect(inv).toEqual({ command: 'node.exe', args: ['C:\\npm\\node_modules\\fastrmemory\\dist\\bin\\fastr.js'] });

    const local = resolveCliInvocation({
      platform: 'linux',
      workspaceRoot: '/ws',
      exists: (p) => p === '/ws/node_modules/fastrmemory/dist/bin/fastr.js',
    });
    expect(local).toEqual({ command: 'node', args: ['/ws/node_modules/fastrmemory/dist/bin/fastr.js'] });
    expect(resolveCliInvocation({ platform: 'linux', exists: () => false })).toEqual({ command: 'fastrmemory', args: [] });
    expect(resolveCliInvocation({ platform: 'linux', configuredPath: '/opt/f.js', exists: () => false })).toEqual({ command: 'node', args: ['/opt/f.js'] });
  });
});
