/**
 * Fetches the pinned benchmark inputs that are never committed.
 *
 *   bench/data/*.json             the public retrieval datasets (277 MB for LongMemEval-s)
 *   bench/external/potion-base-8M the optional static semantic model (30 MB)
 *   bench/external/node_modules   the pinned third-party engines
 *
 * Every download is verified against the SHA-256 in the pin before it is moved into place,
 * so a truncated or substituted file fails loudly instead of silently changing a number.
 *
 * Usage:
 *   npx tsx scripts/fetch-bench-data.ts            # datasets
 *   npx tsx scripts/fetch-bench-data.ts --model    # datasets + static model
 *   npx tsx scripts/fetch-bench-data.ts --engines  # pinned third-party engines
 *   npx tsx scripts/fetch-bench-data.ts --all      # everything
 *   npx tsx scripts/fetch-bench-data.ts --check    # verify what is already on disk
 */

import { spawnSync } from 'node:child_process';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { POTION_BASE_8M } from '../src/search/static-model.js';

interface DownloadPin {
  /** Absolute destination path. */
  destination: string;
  url: string;
  sha256: string;
  bytes?: number;
  label: string;
}

export const BENCH_ENGINE_PINS: Record<string, string> = {
  '@agentmemory/mcp': '0.9.30',
  'hippo-memory': '2.1.0',
  '@modelcontextprotocol/server-memory': '2.0.0'
};

const LONG_MEM_EVAL_REVISION = '98d7416c24c778c2fee6e6f3006e7a073259d48f';
const LOCOMO_REVISION = '3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376';

function datasetPins(repoRoot: string): DownloadPin[] {
  const dataDir = path.join(repoRoot, 'bench', 'data');
  return [
    {
      label: 'longmemeval_s_cleaned.json',
      destination: path.join(dataDir, 'longmemeval_s_cleaned.json'),
      url: `https://huggingface.co/datasets/xiaowu0162/longmemeval-cleaned/resolve/${LONG_MEM_EVAL_REVISION}/longmemeval_s_cleaned.json`,
      sha256: 'D6F21EA9D60A0D56F34A05B609C79C88A451D2AE03597821EA3D5A9678C3A442'
    },
    {
      label: 'locomo10.json',
      destination: path.join(dataDir, 'locomo10.json'),
      url: `https://raw.githubusercontent.com/snap-research/locomo/${LOCOMO_REVISION}/data/locomo10.json`,
      sha256: '79FA87E90F04081343B8C8DEBECB80A9A6842B76A7AA537DC9FDF651EA698FF4'
    }
  ];
}

function modelPins(repoRoot: string): DownloadPin[] {
  const modelDir = path.join(repoRoot, 'bench', 'external', 'potion-base-8M');
  const base = `https://huggingface.co/${POTION_BASE_8M.name}/resolve/${POTION_BASE_8M.revision}`;
  return [
    {
      label: POTION_BASE_8M.modelFile,
      destination: path.join(modelDir, POTION_BASE_8M.modelFile),
      url: `${base}/${POTION_BASE_8M.modelFile}`,
      sha256: POTION_BASE_8M.modelSha256,
      bytes: POTION_BASE_8M.modelBytes
    },
    {
      label: POTION_BASE_8M.tokenizerFile,
      destination: path.join(modelDir, POTION_BASE_8M.tokenizerFile),
      url: `${base}/${POTION_BASE_8M.tokenizerFile}`,
      sha256: POTION_BASE_8M.tokenizerSha256,
      bytes: POTION_BASE_8M.tokenizerBytes
    }
  ];
}

export function sha256File(file: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase();
}

async function download(pin: DownloadPin, force: boolean): Promise<void> {
  if (fs.existsSync(pin.destination) && !force) {
    const actual = sha256File(pin.destination);
    if (actual === pin.sha256.toUpperCase()) {
      console.log(`  ${pin.label}: present, sha256 verified`);
      return;
    }
    console.log(`  ${pin.label}: present but hash mismatch, re-downloading`);
  }

  fs.mkdirSync(path.dirname(pin.destination), { recursive: true });
  const partial = `${pin.destination}.part`;
  console.log(`  ${pin.label}: downloading ${pin.url}`);
  const response = await fetch(pin.url, { redirect: 'follow' });
  if (!response.ok || !response.body) {
    throw new Error(`GET ${pin.url} -> ${response.status} ${response.statusText}`);
  }
  const expected = pin.bytes ?? Number(response.headers.get('content-length') ?? 0);
  let received = 0;
  let nextReport = 32 * 1024 * 1024;
  const stream = Readable.fromWeb(response.body as Parameters<typeof Readable.fromWeb>[0]);
  stream.on('data', (chunk: Buffer) => {
    received += chunk.length;
    if (received >= nextReport) {
      console.log(`    ${(received / 1024 / 1024).toFixed(1)} MB`);
      nextReport += 32 * 1024 * 1024;
    }
  });
  await pipeline(stream, fs.createWriteStream(partial));

  if (expected > 0 && received !== expected) {
    fs.rmSync(partial, { force: true });
    throw new Error(`${pin.label}: expected ${expected} bytes, received ${received}`);
  }
  const actual = sha256File(partial);
  if (actual !== pin.sha256.toUpperCase()) {
    fs.rmSync(partial, { force: true });
    throw new Error(`${pin.label}: sha256 ${actual} does not match pin ${pin.sha256}`);
  }
  fs.renameSync(partial, pin.destination);
  console.log(`  ${pin.label}: ${(received / 1024 / 1024).toFixed(1)} MB, sha256 verified`);
}

function check(pin: DownloadPin): boolean {
  if (!fs.existsSync(pin.destination)) {
    console.log(`  ${pin.label}: MISSING`);
    return false;
  }
  const actual = sha256File(pin.destination);
  if (actual !== pin.sha256.toUpperCase()) {
    console.log(`  ${pin.label}: HASH MISMATCH (${actual})`);
    return false;
  }
  const bytes = fs.statSync(pin.destination).size;
  console.log(`  ${pin.label}: ok, ${(bytes / 1024 / 1024).toFixed(1)} MB, sha256 verified`);
  return true;
}

function installEngines(repoRoot: string): void {
  const externalDir = path.join(repoRoot, 'bench', 'external');
  fs.mkdirSync(externalDir, { recursive: true });
  const packageJson = path.join(externalDir, 'package.json');
  fs.writeFileSync(
    packageJson,
    `${JSON.stringify(
      {
        name: 'fastrmemory-bench-engines',
        private: true,
        description:
          'Pinned third-party engines used by the cross-engine benchmark. Generated by scripts/fetch-bench-data.ts; this directory is gitignored.',
        dependencies: BENCH_ENGINE_PINS
      },
      null,
      2
    )}\n`,
    'utf8'
  );
  console.log(`  wrote ${path.relative(repoRoot, packageJson)}`);
  const result = spawnSync('npm', ['install', '--prefix', externalDir, '--no-package-lock'], {
    cwd: repoRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  if (result.status !== 0) throw new Error('npm install for bench/external failed');
  for (const [name, pinned] of Object.entries(BENCH_ENGINE_PINS)) {
    const installed = JSON.parse(
      fs.readFileSync(path.join(externalDir, 'node_modules', name, 'package.json'), 'utf8')
    ) as { version?: string };
    if (installed.version !== pinned) {
      throw new Error(`${name}: installed ${installed.version}, pinned ${pinned}`);
    }
    console.log(`  ${name}@${installed.version}`);
  }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const flags = new Set(argv);
  const checkOnly = flags.has('--check');
  const force = flags.has('--force');
  const all = flags.has('--all');
  const withModel = all || flags.has('--model');
  const withEngines = all || flags.has('--engines');
  const withDatasets = all || flags.has('--dataset') || (!withModel && !withEngines);

  const repoRoot = process.cwd();
  const pins: DownloadPin[] = [];
  if (withDatasets) pins.push(...datasetPins(repoRoot));
  if (withModel) pins.push(...modelPins(repoRoot));

  if (checkOnly) {
    let ok = true;
    for (const pin of pins) ok = check(pin) && ok;
    if (!ok) {
      console.log('\nsome inputs are missing or corrupt; run `npm run bench:fetch -- --all`');
      process.exit(1);
    }
    console.log('\nall pinned inputs verified');
    return;
  }

  if (pins.length > 0) {
    console.log(`fetching ${pins.length} pinned file(s) into bench/`);
    for (const pin of pins) await download(pin, force);
  }
  if (withEngines) {
    console.log('installing pinned third-party engines into bench/external/');
    installEngines(repoRoot);
  }
  console.log('\ndone');
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
