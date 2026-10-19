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

    const result = compressFile(testFile);
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

    const result = compressFile(testFile, { dryRun: true });
    expect(result.success).toBe(true);
    expect(result.backupPath).toBeUndefined();
    expect(fs.readFileSync(testFile, 'utf-8')).toBe(content);
  });
});
