/**
 * Pinned public dataset metadata shared by the internal and external benchmark runners.
 *
 * Every runner verifies the SHA-256 before measuring and writes the pin into its raw JSON.
 * Dataset files live in bench/data and are never committed.
 */

import * as crypto from 'node:crypto';
import * as fs from 'node:fs';

export interface DatasetPin {
  file: string;
  revision: string;
  sha256: string;
  url: string;
  source: string;
}

export type PinnedDatasetName = 'longmemeval' | 'locomo';

export const PUBLIC_DATASET_PINS: Record<PinnedDatasetName, DatasetPin> = {
  longmemeval: {
    file: 'longmemeval_s.json',
    revision: '2ec2a557f339b6c0369619b1ed5793734cc87533',
    sha256: '08D8DAD4BE43EE2049A22FF5674EB86725D0CE5FF434CDE2627E5E8E7E117894',
    url: 'https://huggingface.co/datasets/xiaowu0162/longmemeval',
    source: 'huggingface:xiaowu0162/longmemeval'
  },
  locomo: {
    file: 'locomo10.json',
    revision: '3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376',
    sha256: '79FA87E90F04081343B8C8DEBECB80A9A6842B76A7AA537DC9FDF651EA698FF4',
    url: 'https://github.com/snap-research/locomo',
    source: 'github:snap-research/locomo'
  }
};

export function sha256File(file: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase();
}

export function verifyDatasetPin(pin: DatasetPin, file: string, allowMismatch: boolean): string {
  if (!fs.existsSync(file)) {
    throw new Error(
      `Missing dataset file: ${file}\nDownload it from ${pin.url} at revision ${pin.revision} and place it at ${file}`
    );
  }
  const actual = sha256File(file);
  if (actual !== pin.sha256 && !allowMismatch) {
    throw new Error(
      `Dataset hash mismatch for ${file}\nExpected ${pin.sha256}\nActual   ${actual}\nUse --allow-mismatch only for a documented revision change.`
    );
  }
  return actual;
}

export function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
