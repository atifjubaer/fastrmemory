// Shared, deterministic manifest helpers for the tracked UI bundle.
//
// The manifest records normalized SHA-256 hashes of every UI build input and
// every emitted file. Text files are hashed with CRLF normalized to LF so a
// Windows checkout and a Linux checkout agree on freshness.
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const UI_ROOT = path.join(ROOT, 'ui');
export const OUTPUT_ROOT = path.join(ROOT, 'dist-ui');
export const MANIFEST_REL = 'dist-ui/build-manifest.json';
export const MANIFEST_PATH = path.join(ROOT, MANIFEST_REL);
export const MANIFEST_SCHEMA_VERSION = 1;

const SOURCE_ROOT_FILES = [
  'index.html',
  'vite.config.ts',
  'tsconfig.json',
  'package.json',
  'package-lock.json',
  'components.json'
];

const SOURCE_DIRECTORIES = ['src'];

const TEXT_EXTENSIONS = new Set([
  '.cjs',
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.map',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml'
]);

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function normalizeText(value) {
  // Vite can emit mixed CR/LF on Windows. Collapse CR runs before LF so the
  // same logical file hashes identically on Windows, macOS, and Linux.
  return value.replace(/\r+\n/g, '\n').replace(/\r/g, '\n');
}

function hashFile(file) {
  const data = fs.readFileSync(file);
  if (TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) {
    const text = normalizeText(data.toString('utf8'));
    return sha256(Buffer.from(text, 'utf8'));
  }
  return sha256(data);
}

function walkFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(absolute));
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }
  return files;
}

function collectSourceFiles() {
  const files = [];
  for (const rel of SOURCE_ROOT_FILES) {
    const absolute = path.join(UI_ROOT, rel);
    if (!fs.existsSync(absolute)) {
      throw new Error(`missing UI build input: ui/${rel}`);
    }
    files.push(absolute);
  }
  for (const rel of SOURCE_DIRECTORIES) {
    const absolute = path.join(UI_ROOT, rel);
    if (!fs.existsSync(absolute)) {
      throw new Error(`missing UI source directory: ui/${rel}`);
    }
    files.push(...walkFiles(absolute));
  }
  return files.sort((left, right) => toPosix(left).localeCompare(toPosix(right), 'en'));
}

export function collectSourceHashes() {
  const hashes = {};
  for (const absolute of collectSourceFiles()) {
    const rel = toPosix(path.relative(ROOT, absolute));
    hashes[rel] = hashFile(absolute);
  }
  return hashes;
}

export function collectOutputHashes() {
  if (!fs.existsSync(OUTPUT_ROOT)) {
    throw new Error('dist-ui is missing; run npm run build:ui');
  }
  const hashes = {};
  for (const absolute of walkFiles(OUTPUT_ROOT)) {
    const rel = toPosix(path.relative(OUTPUT_ROOT, absolute));
    if (rel === 'build-manifest.json') continue;
    hashes[rel] = hashFile(absolute);
  }
  const sorted = {};
  for (const rel of Object.keys(hashes).sort((left, right) => left.localeCompare(right, 'en'))) {
    sorted[rel] = hashes[rel];
  }
  return sorted;
}

export function normalizeOutputLineEndings() {
  let changed = 0;
  for (const absolute of walkFiles(OUTPUT_ROOT)) {
    const rel = toPosix(path.relative(OUTPUT_ROOT, absolute));
    if (rel === 'build-manifest.json') continue;
    if (!TEXT_EXTENSIONS.has(path.extname(absolute).toLowerCase())) continue;
    const text = fs.readFileSync(absolute, 'utf8');
    const normalized = normalizeText(text);
    if (normalized !== text) {
      fs.writeFileSync(absolute, normalized, 'utf8');
      changed += 1;
    }
  }
  return changed;
}

export function computeSourceHash(sources) {
  const hash = crypto.createHash('sha256');
  for (const rel of Object.keys(sources).sort((left, right) => left.localeCompare(right, 'en'))) {
    hash.update(rel);
    hash.update('\0');
    hash.update(sources[rel]);
    hash.update('\n');
  }
  return hash.digest('hex');
}

export function buildManifest() {
  const sources = collectSourceHashes();
  const files = collectOutputHashes();
  if (Object.keys(files).length === 0) {
    throw new Error('dist-ui contains no build output; run npm run build:ui');
  }
  return {
    schemaVersion: MANIFEST_SCHEMA_VERSION,
    generator: 'scripts/build-dist-ui-manifest.mjs',
    uiRoot: 'ui',
    outputRoot: 'dist-ui',
    sourceHash: computeSourceHash(sources),
    sources,
    files
  };
}

export function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

export function writeManifest(manifest) {
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}
