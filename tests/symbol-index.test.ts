import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { initDatabase } from '../src/db/schema.js';
import { extractSymbols } from '../src/code/symbol-extractor.js';
import {
  countSymbols,
  findSymbolsByName,
  getSymbolAtLine,
  getSymbolsForFile,
  indexFileSymbols,
  indexProjectSymbols
} from '../src/code/indexer.js';

const TS_SOURCE = `import { x } from './x';

export interface TokenOptions {
  expiresIn: number;
}

type Token = string;

export enum Algorithm {
  HS256 = 'HS256',
}

export class TokenService {
  sign(): Token {
    return 'x';
  }
}

export function createToken(options: TokenOptions): Token {
  return 'x';
}

function helper() {
  return 1;
}

export const verifyToken = (token: Token): boolean => {
  return token.length > 0;
};

export const asyncLoad = async () => {
  return 1;
};
`;

describe('symbol extraction', () => {
  it('finds TypeScript declarations with kinds and export state', () => {
    const symbols = extractSymbols(TS_SOURCE, 'src/auth/tokens.ts');

    expect(symbols.map((s) => s.name)).toEqual([
      'TokenOptions',
      'Token',
      'Algorithm',
      'TokenService',
      'createToken',
      'helper',
      'verifyToken',
      'asyncLoad'
    ]);

    expect(symbols.map((s) => s.kind)).toEqual([
      'interface',
      'type',
      'enum',
      'class',
      'function',
      'function',
      'const',
      'const'
    ]);

    // `type Token = string;` carries no export keyword, so it is not exported.
    expect(symbols.map((s) => s.exported)).toEqual([true, false, true, true, true, false, true, true]);
  });

  it('keeps declaration order and non-overlapping line ranges', () => {
    const symbols = extractSymbols(TS_SOURCE, 'tokens.ts');

    for (let index = 0; index < symbols.length; index++) {
      expect(symbols[index].lineEnd).toBeGreaterThanOrEqual(symbols[index].lineStart);
      if (index > 0) {
        expect(symbols[index].lineStart).toBeGreaterThan(symbols[index - 1].lineEnd);
      }
    }
  });

  it('captures the signature without the body', () => {
    const symbols = extractSymbols(TS_SOURCE, 'tokens.ts');
    const createToken = symbols.find((s) => s.name === 'createToken');

    expect(createToken?.signature).toBe('export function createToken(options: TokenOptions): Token');
    expect(createToken?.signature).not.toContain('{');
  });

  it('ignores declarations inside line and block comments', () => {
    const commented = `// export function fake() {}
/* export class Ghost {}
   export interface Ghost2 {} */
export function real() {}
`;
    const symbols = extractSymbols(commented, 'guarded.ts');
    expect(symbols.map((s) => s.name)).toEqual(['real']);
  });

  it('extracts Python functions and marks indented definitions as methods', () => {
    const source = `def top_level():
    def nested():
        pass
    return 1

def _private():
    pass
`;
    const symbols = extractSymbols(source, 'app/service.py');

    expect(symbols.map((s) => s.name)).toEqual(['top_level', 'nested', '_private']);
    expect(symbols.map((s) => s.kind)).toEqual(['function', 'method', 'function']);
    expect(symbols.map((s) => s.exported)).toEqual([true, true, false]);
  });

  it('uses capitalization as the Go export signal', () => {
    const source = `func Exported() {}
func unexported() {}
func (s *Service) Method() {}
`;
    const symbols = extractSymbols(source, 'cmd/main.go');

    expect(symbols.map((s) => s.name)).toEqual(['Exported', 'unexported', 'Method']);
    expect(symbols.map((s) => s.exported)).toEqual([true, false, true]);
  });

  it('reads pub for Rust visibility', () => {
    const source = `pub fn exported() {}
fn private() {}
pub(crate) fn crate_visible() {}
`;
    const symbols = extractSymbols(source, 'src/lib.rs');

    expect(symbols.map((s) => s.exported)).toEqual([true, false, true]);
  });

  it('returns nothing for extensions it does not understand', () => {
    expect(extractSymbols('export function nope() {}', 'notes.md')).toEqual([]);
    expect(extractSymbols('', 'empty.ts')).toEqual([]);
  });
});

describe('symbol index storage', () => {
  const dbPath = path.join(process.cwd(), 'tests', 'temp_symbols.db');
  let db: ReturnType<typeof initDatabase>;

  beforeEach(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    db = initDatabase(dbPath);
  });

  afterEach(() => {
    try {
      db.close();
    } catch {
      // already closed
    }
    for (const suffix of ['', '-wal', '-shm']) {
      const file = `${dbPath}${suffix}`;
      if (fs.existsSync(file)) {
        try {
          fs.unlinkSync(file);
        } catch {
          // locked on Windows
        }
      }
    }
  });

  it('stores one row per declaration and is idempotent', () => {
    const first = indexFileSymbols(db, 'proj_test', 'src/auth/tokens.ts', TS_SOURCE);
    expect(first.symbols).toBe(8);
    expect(first.removed).toBe(0);

    const second = indexFileSymbols(db, 'proj_test', 'src/auth/tokens.ts', TS_SOURCE);
    expect(second.symbols).toBe(8);
    expect(second.removed).toBe(0);
    expect(countSymbols(db, 'proj_test')).toBe(8);
  });

  it('removes declarations that vanished from the file', () => {
    indexFileSymbols(db, 'proj_test', 'src/auth/tokens.ts', 'export function alpha() {}\n');
    expect(findSymbolsByName(db, 'proj_test', 'alpha')).toHaveLength(1);

    const result = indexFileSymbols(db, 'proj_test', 'src/auth/tokens.ts', 'export function beta() {}\n');

    expect(result.removed).toBe(1);
    expect(findSymbolsByName(db, 'proj_test', 'alpha')).toHaveLength(0);
    expect(findSymbolsByName(db, 'proj_test', 'beta')).toHaveLength(1);
  });

  it('normalises Windows separators so paths match file_links', () => {
    indexFileSymbols(db, 'proj_test', 'src\\auth\\tokens.ts', TS_SOURCE);

    const symbols = getSymbolsForFile(db, 'proj_test', 'src/auth/tokens.ts');
    expect(symbols).toHaveLength(8);
    expect(symbols[0].file_path).toBe('src/auth/tokens.ts');
  });

  it('resolves the innermost symbol containing a line', () => {
    indexFileSymbols(db, 'proj_test', 'src/auth/tokens.ts', TS_SOURCE);
    const createToken = findSymbolsByName(db, 'proj_test', 'createToken')[0];

    const atDeclaration = getSymbolAtLine(db, 'proj_test', 'src/auth/tokens.ts', createToken.line_start);
    const insideBody = getSymbolAtLine(db, 'proj_test', 'src/auth/tokens.ts', createToken.line_start + 1);

    expect(atDeclaration?.name).toBe('createToken');
    expect(insideBody?.name).toBe('createToken');
    expect(getSymbolAtLine(db, 'proj_test', 'src/auth/tokens.ts', 0)).toBeNull();
    expect(getSymbolAtLine(db, 'proj_test', 'src/other.ts', 1)).toBeNull();
  });

  it('orders exact name matches before substring matches', () => {
    indexFileSymbols(db, 'proj_test', 'src/a.ts', 'export function Token() {}\nexport function TokenService() {}\n');

    const exact = findSymbolsByName(db, 'proj_test', 'Token');
    expect(exact[0].name).toBe('Token');

    const partial = findSymbolsByName(db, 'proj_test', 'Token');
    expect(partial).toHaveLength(2);
  });

  it('indexes a project directory and skips non-code files', () => {
    const projectRoot = path.join(process.cwd(), 'tests', 'temp-symbol-project');
    fs.rmSync(projectRoot, { recursive: true, force: true });
    fs.mkdirSync(path.join(projectRoot, 'src'), { recursive: true });
    fs.writeFileSync(path.join(projectRoot, 'src', 'one.ts'), 'export function one() {}\n', 'utf8');
    fs.writeFileSync(path.join(projectRoot, 'src', 'two.py'), 'def two():\n    pass\n', 'utf8');
    fs.writeFileSync(path.join(projectRoot, 'README.md'), '# not code\n', 'utf8');

    try {
      const result = indexProjectSymbols(db, 'proj_test', projectRoot);

      expect(result.files).toBe(2);
      expect(result.symbols).toBe(2);
      expect(countSymbols(db, 'proj_test')).toBe(2);
      expect(getSymbolsForFile(db, 'proj_test', 'src/two.py')[0].name).toBe('two');
    } finally {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  });
});
