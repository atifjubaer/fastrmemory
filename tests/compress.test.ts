import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import {
  compressContent,
  compressFile,
  extractHeadings,
  extractUrls,
  extractCodeBlocks,
  validateCompression
} from '../src/compress/markdown.js';

describe('Markdown Token Compressor', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-compress-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('extractHeadings, extractUrls, and extractCodeBlocks work correctly', () => {
    const md = `# Main Title\n\nSome text with https://github.com/atifjubaer/fastrmemory link.\n\n## Subheading\n\n\`\`\`typescript\nconst x = 1;\n\`\`\``;
    
    expect(extractHeadings(md)).toEqual(['# Main Title', '## Subheading']);
    expect(extractUrls(md)).toEqual(['https://github.com/atifjubaer/fastrmemory']);
    expect(extractCodeBlocks(md).length).toBe(1);
  });

  it('compressContent preserves headings, URLs, and code blocks', () => {
    const md = [
      '# Architectural Design',
      '',
      'In this section we will explore the core design.',
      'Check documentation at https://fastrmemory.org/docs for details.',
      '',
      '- First item',
      '- First item',
      '- Second item',
      '',
      '```typescript',
      'export function hello() {',
      '  return "world";',
      '}',
      '```',
      '',
      '## Verification',
      '',
      'Basically everything is working cleanly.'
    ].join('\n');

    const result = compressContent(md);
    expect(result.success).toBe(true);
    expect(result.compressedChars).toBeLessThan(result.originalChars);
    expect(result.content).toContain('# Architectural Design');
    expect(result.content).toContain('## Verification');
    expect(result.content).toContain('https://fastrmemory.org/docs');
    expect(result.content).toContain('export function hello()');
    // duplicate bullet should be pruned
    const firstItemCount = (result.content.match(/- First item/g) || []).length;
    expect(firstItemCount).toBe(1);
  });

  it('validateCompression verifies structural invariants', () => {
    const orig = `# Title\nhttps://example.com\n\`\`\`code\`\`\``;
    const missingHeading = `https://example.com\n\`\`\`code\`\`\``;
    const errors = validateCompression(orig, missingHeading);
    expect(errors.some(e => e.includes('Missing heading'))).toBe(true);
  });

  it('compressFile creates .original.md backup and overwrites target', () => {
    const testFile = path.join(tmpDir, 'DOCS.md');
    const content = '# Title\n\nBasically this is a test.\n\nhttps://example.com\n\n```\nval\n```';
    fs.writeFileSync(testFile, content, 'utf-8');

    const result = compressFile(testFile, { projectRoot: tmpDir });
    expect(result.success).toBe(true);
    expect(result.backupPath).toBeDefined();
    expect(fs.existsSync(result.backupPath!)).toBe(true);
    expect(fs.readFileSync(result.backupPath!, 'utf-8')).toBe(content);
    expect(fs.readFileSync(testFile, 'utf-8')).not.toBe(content);
  });

  it('compressFile respects dryRun: true', () => {
    const testFile = path.join(tmpDir, 'DRYRUN.md');
    const content = '# Title\n\nBasically testing dry run.\n\nhttps://example.com\n';
    fs.writeFileSync(testFile, content, 'utf-8');

    const result = compressFile(testFile, { dryRun: true, projectRoot: tmpDir });
    expect(result.success).toBe(true);
    expect(result.backupPath).toBeUndefined();
    expect(fs.readFileSync(testFile, 'utf-8')).toBe(content);
  });

  it('compressFile refuses paths outside the project root', () => {
    const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-compress-outside-'));
    try {
      const outsideFile = path.join(outsideDir, 'README.md');
      const content = '# Title\n\nBasically outside.\n';
      fs.writeFileSync(outsideFile, content, 'utf-8');

      const abs = compressFile(outsideFile, { projectRoot: tmpDir });
      expect(abs.success).toBe(false);
      expect(abs.error).toMatch(/outside the project root/);

      const rel = compressFile(path.relative(tmpDir, outsideFile), { projectRoot: tmpDir });
      expect(rel.success).toBe(false);
      expect(rel.error).toMatch(/outside the project root/);

      expect(fs.readFileSync(outsideFile, 'utf-8')).toBe(content);
      expect(fs.readdirSync(outsideDir)).toEqual(['README.md']);
    } finally {
      fs.rmSync(outsideDir, { recursive: true, force: true });
    }
  });

  it('compressFile refuses non-markdown/text extensions', () => {
    const testFile = path.join(tmpDir, 'config.json');
    fs.writeFileSync(testFile, '{"a": 1}', 'utf-8');
    const result = compressFile(testFile, { projectRoot: tmpDir });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Unsupported file type/);
    expect(fs.readFileSync(testFile, 'utf-8')).toBe('{"a": 1}');

    const txt = path.join(tmpDir, 'notes.txt');
    fs.writeFileSync(txt, 'Basically text.\n\n\n\nMore.\n', 'utf-8');
    expect(compressFile(txt, { projectRoot: tmpDir }).success).toBe(true);
  });

  it('compressFile never overwrites an existing backup', () => {
    const testFile = path.join(tmpDir, 'GUIDE.md');
    const v1 = '# Guide\n\nBasically version one.\n\n\n\nEnd.\n';
    fs.writeFileSync(testFile, v1, 'utf-8');

    const first = compressFile(testFile, { projectRoot: tmpDir });
    expect(first.success).toBe(true);
    expect(path.basename(first.backupPath!)).toBe('GUIDE.original.md');

    const v2 = '# Guide\n\nEssentially version two.\n\n\n\nEnd.\n';
    fs.writeFileSync(testFile, v2, 'utf-8');
    const second = compressFile(testFile, { projectRoot: tmpDir });
    expect(second.success).toBe(true);
    expect(path.basename(second.backupPath!)).toBe('GUIDE.original.1.md');

    expect(fs.readFileSync(path.join(tmpDir, 'GUIDE.original.md'), 'utf-8')).toBe(v1);
    expect(fs.readFileSync(path.join(tmpDir, 'GUIDE.original.1.md'), 'utf-8')).toBe(v2);
  });

  it('filler stripping never touches fenced code blocks (``` or ~~~, nested fences)', () => {
    const md = [
      '# Title',
      '',
      'Basically this prose line loses its filler.',
      '',
      '````markdown',
      'Basically keep me',
      '```',
      'In order to keep me too',
      '```',
      'Essentially still code',
      '````',
      '',
      '~~~',
      'Obviously verbatim',
      '- dup',
      '- dup',
      '',
      '',
      '~~~',
      ''
    ].join('\n');
    const result = compressContent(md);
    expect(result.content).toContain('this prose line loses its filler.');
    expect(result.content).not.toContain('Basically this prose');
    expect(result.content).toContain('Basically keep me');
    expect(result.content).toContain('In order to keep me too');
    expect(result.content).toContain('Essentially still code');
    expect(result.content).toContain('Obviously verbatim\n- dup\n- dup\n\n\n~~~');
  });
});
