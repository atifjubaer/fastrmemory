/**
 * Installer for the optional static semantic model (model2vec `potion-base-8M`).
 *
 * The 30 MB asset is never downloaded implicitly: `fastr model install` is an explicit
 * operator action, the download is pinned to a revision and verified by SHA-256, and a
 * failed verification leaves no partial model behind.
 */

import { createHash } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { resolveFastrHome } from '../config.js';
import { POTION_BASE_8M, loadStaticModel } from './static-model.js';

const RESOLVE_BASE = `https://huggingface.co/${POTION_BASE_8M.name}/resolve/${POTION_BASE_8M.revision}`;

export interface StaticModelFilePin {
  file: string;
  bytes: number;
  sha256: string;
}

export const STATIC_MODEL_FILES: StaticModelFilePin[] = [
  { file: POTION_BASE_8M.modelFile, bytes: POTION_BASE_8M.modelBytes, sha256: POTION_BASE_8M.modelSha256 },
  { file: POTION_BASE_8M.tokenizerFile, bytes: POTION_BASE_8M.tokenizerBytes, sha256: POTION_BASE_8M.tokenizerSha256 }
];

export function staticModelDir(homeDir: string = resolveFastrHome()): string {
  return path.join(homeDir, '.fastr', 'models', 'potion-base-8M');
}

export interface StaticModelStatus {
  installed: boolean;
  dir: string;
  bytes: number;
  missing: string[];
}

/** Reports whether a complete, loadable model is present. Never downloads. */
export function staticModelStatus(homeDir: string = resolveFastrHome()): StaticModelStatus {
  const dir = staticModelDir(homeDir);
  const missing: string[] = [];
  let bytes = 0;
  for (const pin of STATIC_MODEL_FILES) {
    const file = path.join(dir, pin.file);
    if (!fs.existsSync(file) || fs.statSync(file).size !== pin.bytes) {
      missing.push(pin.file);
      continue;
    }
    bytes += pin.bytes;
  }
  return { installed: missing.length === 0, dir, bytes, missing };
}

function sha256File(file: string): string {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

async function download(file: string, url: string, expectedBytes: number, onProgress?: (received: number, total: number) => void): Promise<void> {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok || !response.body) {
    throw new Error(`download failed: ${response.status} ${response.statusText} (${url})`);
  }
  const total = Number(response.headers.get('content-length')) || expectedBytes;
  const temp = `${file}.part`;
  const handle = fs.openSync(temp, 'w');
  let received = 0;
  let lastReported = 0;
  try {
    for await (const chunk of response.body as unknown as AsyncIterable<Uint8Array>) {
      fs.writeSync(handle, chunk);
      received += chunk.byteLength;
      if (onProgress && (received - lastReported >= 4_000_000 || received === total)) {
        lastReported = received;
        onProgress(received, total);
      }
    }
  } finally {
    fs.closeSync(handle);
  }
  if (received !== expectedBytes) {
    fs.rmSync(temp, { force: true });
    throw new Error(`${path.basename(file)} is ${received} bytes, expected ${expectedBytes}`);
  }
  fs.renameSync(temp, file);
}

export interface InstallStaticModelOptions {
  homeDir?: string;
  /** Re-download even when a valid copy is present. */
  force?: boolean;
  onProgress?: (message: string) => void;
  /** Injectable for tests; defaults to the pinned HuggingFace URLs. */
  urlFor?: (file: string) => string;
}

export interface InstallStaticModelResult {
  dir: string;
  downloaded: string[];
  alreadyPresent: boolean;
}

/**
 * Downloads and verifies the static model. Idempotent: a verified existing copy is reused
 * unless `force` is set. Any hash/size mismatch aborts and deletes the partial file.
 */
export async function installStaticModel(options: InstallStaticModelOptions = {}): Promise<InstallStaticModelResult> {
  const dir = staticModelDir(options.homeDir);
  const log = options.onProgress ?? (() => {});
  const urlFor = options.urlFor ?? ((file: string) => `${RESOLVE_BASE}/${file}?download=true`);

  fs.mkdirSync(dir, { recursive: true });
  const downloaded: string[] = [];

  for (const pin of STATIC_MODEL_FILES) {
    const target = path.join(dir, pin.file);
    const valid = fs.existsSync(target)
      && fs.statSync(target).size === pin.bytes
      && sha256File(target) === pin.sha256;

    if (valid && !options.force) {
      log(`${pin.file}: already installed (${pin.bytes} bytes, sha256 verified)`);
      continue;
    }

    log(`${pin.file}: downloading ${(pin.bytes / 1_000_000).toFixed(1)} MB from ${POTION_BASE_8M.name}@${POTION_BASE_8M.revision}`);
    await download(target, urlFor(pin.file), pin.bytes, (received, total) => {
      log(`${pin.file}: ${((received / Math.max(1, total)) * 100).toFixed(0)}%`);
    });

    const actual = sha256File(target);
    if (actual !== pin.sha256) {
      fs.rmSync(target, { force: true });
      throw new Error(`${pin.file} sha256 ${actual} does not match the pin ${pin.sha256}`);
    }
    log(`${pin.file}: sha256 verified`);
    downloaded.push(pin.file);
  }

  // Load once so a corrupt-but-correct-size file fails here, not inside recall.
  const model = loadStaticModel(dir);
  log(`model ready: ${model.vocabSize} x ${model.dim} float32`);

  return { dir, downloaded, alreadyPresent: downloaded.length === 0 };
}

let activePrefetch: Promise<InstallStaticModelResult | null> | null = null;

/**
 * Triggers non-blocking background prefetch/download of the static semantic model if not already present.
 * Safe to fire from `fastr init --with-model` or during server start when `FASTR_AUTO_PREFETCH=1`
 * or `project.json` `model.autoInstall: true`.
 * Does nothing under test runners (`NODE_ENV=test`) or when `FASTR_DISABLE_STATIC_MODEL=1`.
 * Never throws — failures log to progress/debug without interrupting the caller.
 */
export function prefetchStaticModelInBackground(options: InstallStaticModelOptions = {}): Promise<InstallStaticModelResult | null> {
  if (activePrefetch) return activePrefetch;
  if (process.env.NODE_ENV === 'test' || process.env.FASTR_DISABLE_STATIC_MODEL === '1') {
    return Promise.resolve(null);
  }

  const status = staticModelStatus(options.homeDir);
  if (status.installed) {
    return Promise.resolve({ dir: status.dir, downloaded: [], alreadyPresent: true });
  }

  activePrefetch = installStaticModel(options)
    .catch(() => {
      activePrefetch = null;
      return null;
    });

  return activePrefetch;
}

/** Removes the installed model. Returns true when something was deleted. */
export function removeStaticModel(homeDir: string = resolveFastrHome()): boolean {
  const dir = staticModelDir(homeDir);
  if (!fs.existsSync(dir)) return false;
  fs.rmSync(dir, { recursive: true, force: true });
  return true;
}
