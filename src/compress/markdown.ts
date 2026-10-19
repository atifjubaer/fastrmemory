import * as fs from 'node:fs';
import * as path from 'node:path';

export interface CompressOptions {
  preserveHeadings?: boolean;
  preserveUrls?: boolean;
  preserveCodeBlocks?: boolean;
  preserveTables?: boolean;
  dryRun?: boolean;
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
  let inCodeBlock = false;
  let prevLine = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check for fenced code block toggle
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      cleanedLines.push(rawLine);
      prevLine = rawLine;
      continue;
    }

    // Inside code block: preserve exactly verbatim
    if (inCodeBlock) {
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

export function compressFile(filePath: string, options: CompressOptions = {}): CompressResult {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    return {
      success: false,
      originalChars: 0,
      compressedChars: 0,
      savingsRatio: 0,
      content: '',
      error: `File not found: ${filePath}`
    };
  }

  const original = fs.readFileSync(resolved, 'utf-8');
  const result = compressContent(original, options);

  if (!result.success) {
    return result;
  }

  if (options.dryRun) {
    return result;
  }

  // Create .original.md backup
  const ext = path.extname(resolved);
  const base = path.basename(resolved, ext);
  const backupName = base.endsWith('.original') ? `${base}.backup${ext}` : `${base}.original${ext}`;
  const backupPath = path.join(path.dirname(resolved), backupName);

  fs.writeFileSync(backupPath, original, 'utf-8');
  fs.writeFileSync(resolved, result.content, 'utf-8');

  result.backupPath = backupPath;
  return result;
}
