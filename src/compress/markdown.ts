import * as fs from 'node:fs';
import * as path from 'node:path';

export interface CompressOptions {
  preserveHeadings?: boolean;
  preserveUrls?: boolean;
  preserveCodeBlocks?: boolean;
  preserveTables?: boolean;
  dryRun?: boolean;
  /** compressFile only: files must resolve inside this directory (default: process.cwd()). */
  projectRoot?: string;
}

export interface CompressResult {
  success: boolean;
  originalChars: number;
  compressedChars: number;
  savingsRatio: number;
  content: string;
  backupPath?: string;
  error?: string;
  warnings?: string[];
}

const FILLER_PHRASES = [
  /^(?:in this section|as (?:we have )?mentioned (?:above|previously)|it is worth noting that|please note that|keep in mind that|as you can see|for the sake of completeness|needless to say)[,:]?\s*/gim,
  /^(?:in order to|with the aim of|with a view to)\s+/gim,
  /^(?:basically|essentially|obviously|clearly|actually|literally)\s+/gim
];

export function extractHeadings(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => /^#{1,6}\s+/.test(line));
}

export function extractUrls(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s)\]]+/g) || [];
  return Array.from(new Set(matches)).sort();
}

export function extractCodeBlocks(text: string): string[] {
  return text.match(/```[\s\S]*?```/g) || [];
}

export function validateCompression(original: string, compressed: string): string[] {
  const errors: string[] = [];

  const origHeadings = extractHeadings(original);
  const compHeadings = extractHeadings(compressed);
  for (const h of origHeadings) {
    if (!compHeadings.includes(h)) {
      errors.push(`Missing heading: "${h}"`);
    }
  }

  const origUrls = extractUrls(original);
  const compUrls = extractUrls(compressed);
  for (const u of origUrls) {
    if (!compUrls.includes(u)) {
      errors.push(`Missing URL: "${u}"`);
    }
  }

  const origBlocks = extractCodeBlocks(original);
  const compBlocks = extractCodeBlocks(compressed);
  if (origBlocks.length !== compBlocks.length) {
    errors.push(`Code block count mismatch: original ${origBlocks.length}, compressed ${compBlocks.length}`);
  } else {
    for (let i = 0; i < origBlocks.length; i++) {
      if (origBlocks[i].trim() !== compBlocks[i].trim()) {
        errors.push(`Code block ${i + 1} content was altered`);
        break;
      }
    }
  }

  return errors;
}

export function compressContent(content: string, options: CompressOptions = {}): CompressResult {
  const {
    preserveHeadings = true,
    preserveUrls = true,
    preserveCodeBlocks = true,
    preserveTables = true
  } = options;

  const originalChars = content.length;
  if (!content.trim()) {
    return {
      success: true,
      originalChars: 0,
      compressedChars: 0,
      savingsRatio: 0,
      content: ''
    };
  }

  // Process lines with a strict state machine for code fences
  const lines = content.split('\n');
  const cleanedLines: string[] = [];
  // Open fence marker (e.g. "```" or "~~~~") while inside a fenced code block, else null
  let openFence: string | null = null;
  let prevLine = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Fenced code blocks (``` or ~~~, CommonMark rules): a block closes only on a fence
    // of the same character that is at least as long as the opening one.
    const fenceMatch = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(rawLine.trimEnd());
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (openFence === null) {
        if (!(marker[0] === '`' && fenceMatch[2].includes('`'))) {
          openFence = marker;
          cleanedLines.push(rawLine);
          prevLine = rawLine;
          continue;
        }
      } else if (marker[0] === openFence[0] && marker.length >= openFence.length && fenceMatch[2].trim() === '') {
        openFence = null;
        cleanedLines.push(rawLine);
        prevLine = rawLine;
        continue;
      }
    }

    // Inside code block: preserve exactly verbatim (no filler stripping, dedupe or collapsing)
    if (openFence !== null) {
      cleanedLines.push(rawLine);
      prevLine = rawLine;
      continue;
    }

    // Heading preservation
    if (preserveHeadings && /^#{1,6}\s+/.test(trimmed)) {
      cleanedLines.push(rawLine.trimEnd());
      prevLine = rawLine.trimEnd();
      continue;
    }

    // Deduplicate consecutive identical bullet items
    if (/^[-*+]\s+/.test(trimmed)) {
      if (trimmed === prevLine.trim()) {
        continue; // skip duplicate bullet
      }
    }

    // Collapse consecutive empty lines
    if (trimmed === '' && prevLine.trim() === '') {
      continue;
    }

    // Prose cleaning: remove conversational filler phrases
    let line = rawLine.trimEnd();
    for (const filler of FILLER_PHRASES) {
      line = line.replace(filler, '');
    }

    cleanedLines.push(line);
    prevLine = line;
  }

  const compressed = cleanedLines.join('\n').trim() + '\n';
  const validationErrors = validateCompression(content, compressed);

  if (validationErrors.length > 0) {
    // If aggressive compression failed structural invariant, fall back to safe whitespace compacting
    const safeLines = content
      .split('\n')
      .map(l => l.trimEnd())
      .filter((l, idx, arr) => !(l.trim() === '' && arr[idx - 1]?.trim() === ''));
    const safeCompressed = safeLines.join('\n').trim() + '\n';

    return {
      success: true,
      originalChars,
      compressedChars: safeCompressed.length,
      savingsRatio: Math.max(0, (originalChars - safeCompressed.length) / (originalChars || 1)),
      content: safeCompressed,
      warnings: validationErrors
    };
  }

  const compressedChars = compressed.length;
  const savingsRatio = Math.max(0, (originalChars - compressedChars) / (originalChars || 1));

  return {
    success: true,
    originalChars,
    compressedChars,
    savingsRatio,
    content: compressed
  };
}

const ALLOWED_COMPRESS_EXTENSIONS = new Set(['.md', '.markdown', '.txt']);
const MAX_BACKUP_SUFFIX = 1000;

function failure(error: string): CompressResult {
  return {
    success: false,
    originalChars: 0,
    compressedChars: 0,
    savingsRatio: 0,
    content: '',
    error
  };
}

function isInsideDir(child: string, parent: string): boolean {
  const rel = path.relative(parent, child);
  return rel !== '' && rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel);
}

/**
 * Writes `content` to the first free backup slot (`X.original.md`, `X.original.1.md`, ...).
 * Uses exclusive-create so an existing backup is never overwritten.
 */
function writeBackup(resolved: string, content: string): string {
  const ext = path.extname(resolved);
  const base = path.basename(resolved, ext);
  const dir = path.dirname(resolved);

  for (let i = 0; i <= MAX_BACKUP_SUFFIX; i++) {
    const suffix = i === 0 ? '' : `.${i}`;
    const candidate = path.join(dir, `${base}.original${suffix}${ext}`);
    try {
      fs.writeFileSync(candidate, content, { encoding: 'utf-8', flag: 'wx' });
      return candidate;
    } catch (err: any) {
      if (err?.code !== 'EEXIST') throw err;
    }
  }
  throw new Error(`Refusing to compress: too many existing backups for ${path.basename(resolved)}`);
}

/**
 * Compresses a markdown/text file in place after writing a non-clobbering backup.
 * The file must be a `.md`, `.markdown` or `.txt` file inside `options.projectRoot`
 * (defaults to `process.cwd()`); relative paths are resolved against that root.
 */
export function compressFile(filePath: string, options: CompressOptions = {}): CompressResult {
  const root = path.resolve(options.projectRoot || process.cwd());
  const resolved = path.resolve(root, filePath);

  const ext = path.extname(resolved).toLowerCase();
  if (!ALLOWED_COMPRESS_EXTENSIONS.has(ext)) {
    return failure(`Unsupported file type "${ext || '(none)'}": only .md, .markdown and .txt files can be compressed`);
  }

  if (!fs.existsSync(resolved)) {
    return failure(`File not found: ${filePath}`);
  }

  // Resolve symlinks on both sides so a link inside the root cannot point outside it
  let realFile: string;
  let realRoot: string;
  try {
    realFile = fs.realpathSync(resolved);
    realRoot = fs.realpathSync(root);
  } catch (err: any) {
    return failure(`Cannot resolve path ${filePath}: ${err.message}`);
  }
  if (!isInsideDir(realFile, realRoot)) {
    return failure(`Refusing to compress ${filePath}: path is outside the project root ${root}`);
  }
  if (!fs.statSync(realFile).isFile()) {
    return failure(`Not a regular file: ${filePath}`);
  }

  const original = fs.readFileSync(realFile, 'utf-8');
  const result = compressContent(original, options);

  if (!result.success) {
    return result;
  }

  if (options.dryRun) {
    return result;
  }

  let backupPath: string;
  try {
    backupPath = writeBackup(realFile, original);
  } catch (err: any) {
    return failure(err.message);
  }
  fs.writeFileSync(realFile, result.content, 'utf-8');

  result.backupPath = backupPath;
  return result;
}
