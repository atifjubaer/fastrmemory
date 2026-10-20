import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Every test worker gets its own throwaway home directory. `loadConfig` resolves
 * `globalDbPath` from `FASTR_HOME`, so the suite can never write to the
 * developer's real `~/.fastr/global.db`.
 */
export const TEST_HOME = path.join(repoRoot, 'tests', '.tmp-home', `pid-${process.pid}`);

fs.rmSync(TEST_HOME, { recursive: true, force: true });
fs.mkdirSync(TEST_HOME, { recursive: true });
process.env.FASTR_HOME = TEST_HOME;
