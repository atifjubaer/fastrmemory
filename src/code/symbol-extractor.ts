import * as path from 'node:path';
import type { ExtractedSymbol, SymbolKind } from './types.js';

/**
 * Regex-based symbol extraction.
 *
 * This is deliberately not a parser. It runs on every index without a native dependency,
 * which is the constraint the package has held since 0.1.0 (3 runtime dependencies, no
 * binaries, no tree-sitter). It recognises declarations, not scopes: a method defined with
 * a keyword inside another body is found, a class field arrow function is not. That is
 * enough to anchor a memory to a named thing and to notice when that thing moves.
 */

type Language = 'ts' | 'python' | 'go' | 'rust';

interface Matcher {
  regex: RegExp;
  kind: SymbolKind;
  /** Capture group holding the symbol name. */
  nameGroup: number;
  /** Capture group that is non-empty when the symbol is exported. */
  exportGroup?: number;
  /** Go convention: a capitalised identifier is exported. */
  exportedWhenCapitalised?: boolean;
  /** Python convention: a leading underscore marks a non-public name. */
  exportedWhenPublic?: boolean;
  /** Python has no keyword for methods; indentation is the signal. */
  methodWhenIndented?: boolean;
}

const TS_MATCHERS: Matcher[] = [
  {
    regex: /^\s*(export\s+)?(?:default\s+)?(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)/,
    kind: 'function',
    nameGroup: 2,
    exportGroup: 1
  },
  {
    regex: /^\s*(export\s+)?(?:default\s+)?(?:abstract\s+)?class\s+([A-Za-z_$][\w$]*)/,
    kind: 'class',
    nameGroup: 2,
    exportGroup: 1
  },
  {
    regex: /^\s*(export\s+)?interface\s+([A-Za-z_$][\w$]*)/,
    kind: 'interface',
    nameGroup: 2,
    exportGroup: 1
  },
  {
    regex: /^\s*(export\s+)?type\s+([A-Za-z_$][\w$]*)\s*(?:<[^=]*>)?\s*=/,
    kind: 'type',
    nameGroup: 2,
    exportGroup: 1
  },
  {
    regex: /^\s*(export\s+)?(?:const\s+)?enum\s+([A-Za-z_$][\w$]*)/,
    kind: 'enum',
    nameGroup: 2,
    exportGroup: 1
  },
  {
    regex: /^\s*(export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*(?::\s*[^=]+)?=>/,
    kind: 'const',
    nameGroup: 2,
    exportGroup: 1
  },
  {
    regex: /^\s*(export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*(?:async\s+)?function\b/,
    kind: 'const',
    nameGroup: 2,
    exportGroup: 1
  }
];

const PYTHON_MATCHERS: Matcher[] = [
  {
    regex: /^(\s*)(?:async\s+)?def\s+([A-Za-z_]\w*)\s*\(/,
    kind: 'function',
    nameGroup: 2,
    methodWhenIndented: true,
    exportedWhenPublic: true
  }
];

const GO_MATCHERS: Matcher[] = [
  {
    regex: /^func\s+(?:\([^)]*\)\s*)?([A-Za-z_]\w*)\s*\(/,
    kind: 'function',
    nameGroup: 1,
    exportedWhenCapitalised: true
  }
];

const RUST_MATCHERS: Matcher[] = [
  {
    regex: /^\s*(pub(?:\([^)]*\))?\s+)?(?:async\s+)?fn\s+([A-Za-z_]\w*)/,
    kind: 'function',
    nameGroup: 2,
    exportGroup: 1
  }
];

const TS_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.mts', '.cts']);

export function detectLanguage(filePath: string): Language | null {
  const ext = path.extname(filePath).toLowerCase();
  if (TS_EXTENSIONS.has(ext)) return 'ts';
  if (ext === '.py') return 'python';
  if (ext === '.go') return 'go';
  if (ext === '.rs') return 'rust';
  return null;
}

function matchersFor(language: Language): Matcher[] {
  switch (language) {
    case 'ts':
      return TS_MATCHERS;
    case 'python':
      return PYTHON_MATCHERS;
    case 'go':
      return GO_MATCHERS;
    case 'rust':
      return RUST_MATCHERS;
  }
}

/**
 * Marks lines that are comments so a `// function foo()` never becomes a symbol.
 * Blanking preserves line count, which keeps every reported line number correct.
 */
function codeLineMask(lines: string[], language: Language): boolean[] {
  const mask = new Array<boolean>(lines.length).fill(true);
  let inBlockComment = false;

  for (let index = 0; index < lines.length; index++) {
    const trimmed = lines[index].trim();

    if (inBlockComment) {
      mask[index] = false;
      if (trimmed.includes('*/')) inBlockComment = false;
      continue;
    }

    if (language === 'python') {
      if (trimmed.startsWith('#')) mask[index] = false;
      continue;
    }

    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      mask[index] = false;
      if (trimmed.startsWith('/*') && !trimmed.includes('*/')) inBlockComment = true;
    }
  }

  return mask;
}

function applyMatcher(matcher: Matcher, line: string): { name: string; kind: SymbolKind; exported: boolean } | null {
  const match = matcher.regex.exec(line);
  if (!match) return null;

  const name = match[matcher.nameGroup];
  if (!name) return null;

  let kind = matcher.kind;
  if (matcher.methodWhenIndented) {
    const indent = /^(\s*)/.exec(line)?.[1].length ?? 0;
    if (indent > 0) kind = 'method';
  }

  let exported = matcher.exportGroup !== undefined ? Boolean(match[matcher.exportGroup]) : false;
  if (matcher.exportedWhenCapitalised) exported = /^[A-Z]/.test(name);
  if (matcher.exportedWhenPublic) exported = !name.startsWith('_');

  return { name, kind, exported };
}

/** Declaration text up to the body, whitespace-collapsed, used to detect signature changes. */
function signatureOf(line: string): string {
  const brace = line.indexOf('{');
  const head = brace >= 0 ? line.slice(0, brace) : line;
  return head.replace(/\s+/g, ' ').trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Masks the symbol's own name inside its source region.
 *
 * This is what makes an anchor survive a rename: `signToken` and `signJwt` have the same
 * body once their own name is removed. The name is also masked in recursive calls, so a
 * function that calls itself still matches after being renamed.
 */
function normalizeBody(source: string, name: string): string {
  const masked = name ? source.replace(new RegExp(`\\b${escapeRegExp(name)}\\b`, 'g'), '*') : source;
  return masked.replace(/\s+/g, ' ').trim();
}

function lastContentLine(lines: string[], fromIndex: number): number {
  for (let index = lines.length - 1; index >= fromIndex; index--) {
    if (lines[index].trim().length > 0) return index + 1;
  }
  return fromIndex + 1;
}

/**
 * Last line of a declaration's body.
 *
 * Brace languages are matched by counting braces, so a nested block does not end the
 * declaration early. Python has no braces, so the body ends at the first non-empty line
 * indented no further than the declaration itself.
 */
function findBodyEnd(lines: string[], startIndex: number, language: Language): number {
  const declaration = lines[startIndex];
  const declIndent = /^(\s*)/.exec(declaration)?.[1].length ?? 0;

  if (language === 'python') {
    for (let index = startIndex + 1; index < lines.length; index++) {
      const line = lines[index];
      if (!line.trim()) continue;
      const indent = /^(\s*)/.exec(line)?.[1].length ?? 0;
      if (indent <= declIndent) return index;
    }
    return lines.length;
  }

  let depth = 0;
  let opened = false;
  for (let index = startIndex; index < lines.length; index++) {
    const line = lines[index];
    for (const char of line) {
      if (char === '{') {
        depth++;
        opened = true;
      } else if (char === '}') {
        depth--;
        if (opened && depth <= 0) return index + 1;
      }
    }
  }
  return lastContentLine(lines, startIndex);
}

export function extractSymbols(content: string, filePath: string): ExtractedSymbol[] {
  const language = detectLanguage(filePath);
  if (!language || !content) return [];

  const lines = content.split(/\r?\n/);
  const codeMask = codeLineMask(lines, language);
  const matchers = matchersFor(language);

  const found: ExtractedSymbol[] = [];
  const seen = new Set<string>();

  for (let index = 0; index < lines.length; index++) {
    if (!codeMask[index]) continue;
    const line = lines[index];
    if (!line.trim()) continue;

    for (const matcher of matchers) {
      const result = applyMatcher(matcher, line);
      if (!result) continue;

      const key = `${result.name}::${result.kind}`;
      if (seen.has(key)) break;
      seen.add(key);

      found.push({
        name: result.name,
        kind: result.kind,
        lineStart: index + 1,
        lineEnd: index + 1,
        exported: result.exported,
        signature: signatureOf(line),
        normalizedBody: ''
      });
      break;
    }
  }

  found.sort((a, b) => a.lineStart - b.lineStart);
  for (const symbol of found) {
    const startIndex = symbol.lineStart - 1;
    const endIndex = findBodyEnd(lines, startIndex, language);
    symbol.lineEnd = Math.max(symbol.lineStart, endIndex);
    const body = lines.slice(startIndex, endIndex).join('\n');
    symbol.normalizedBody = normalizeBody(body, symbol.name);
  }

  return found;
}
