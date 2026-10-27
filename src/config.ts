import * as path from 'node:path';
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import * as os from 'node:os';

export interface FastrConfig {
  projectId: string;
  projectName: string;
  projectRoot: string;
  dbPath: string;
  globalDbPath: string;
  spoolPath: string;
  /**
   * Where recall counters are queued, off the read path.
   *
   * Optional so a hand-built config (tests, embedders) keeps working; it defaults to a
   * sibling of the spool.
   */
  retrievalQueuePath?: string;
  pagesDir: string;
  write?: WriteConfig;
}

/**
 * Conflict analysis runs either inline (legacy), from the deferred queue (default), or not
 * at all. 'deferred' keeps the feature but moves the 50-window scan off the write path.
 */
export type ConflictMode = 'sync' | 'deferred' | 'off';

/** Entity extraction runs inline ('sync') or from the deferred analysis queue ('deferred'). */
export type NerMode = 'sync' | 'deferred';

/** Full-text indexing runs inline ('sync') or from the deferred index queue ('deferred'). */
export type FtsMode = 'sync' | 'deferred';

export interface WriteConfig {
  conflictMode: ConflictMode;
  nerMode: NerMode;
  ftsMode: FtsMode;
}

const CONFLICT_MODES: ReadonlySet<string> = new Set(['sync', 'deferred', 'off']);
const NER_MODES: ReadonlySet<string> = new Set(['sync', 'deferred']);
const FTS_MODES: ReadonlySet<string> = new Set(['sync', 'deferred']);

export function parseConflictMode(value: unknown): ConflictMode | null {
  const normalized = String(value ?? '').trim().toLowerCase();
  return CONFLICT_MODES.has(normalized) ? (normalized as ConflictMode) : null;
}

export function parseNerMode(value: unknown): NerMode | null {
  const normalized = String(value ?? '').trim().toLowerCase();
  return NER_MODES.has(normalized) ? (normalized as NerMode) : null;
}

export function parseFtsMode(value: unknown): FtsMode | null {
  const normalized = String(value ?? '').trim().toLowerCase();
  return FTS_MODES.has(normalized) ? (normalized as FtsMode) : null;
}

/**
 * Resolves write.conflictMode. Precedence: FASTR_CONFLICT_MODE, then
 * `.fastr/project.json` -> `write.conflictMode`, then 'deferred'.
 */
export function resolveConflictMode(projectRoot?: string): ConflictMode {
  const fromEnv = parseConflictMode(process.env.FASTR_CONFLICT_MODE);
  if (fromEnv) return fromEnv;

  try {
    const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
    const file = path.join(root, '.fastr', 'project.json');
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const fromFile = parseConflictMode(data?.write?.conflictMode);
      if (fromFile) return fromFile;
    }
  } catch {}

  return 'deferred';
}

/**
 * Resolves write.nerMode. Precedence: FASTR_NER_MODE, then
 * `.fastr/project.json` -> `write.nerMode`, then 'deferred'.
 */
export function resolveNerMode(projectRoot?: string): NerMode {
  const fromEnv = parseNerMode(process.env.FASTR_NER_MODE);
  if (fromEnv) return fromEnv;

  try {
    const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
    const file = path.join(root, '.fastr', 'project.json');
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const fromFile = parseNerMode(data?.write?.nerMode);
      if (fromFile) return fromFile;
    }
  } catch {}

  return 'deferred';
}

/**
 * Resolves write.ftsMode. Precedence: FASTR_FTS_MODE, then
 * `.fastr/project.json` -> `write.ftsMode`, then 'deferred'.
 */
export function resolveFtsMode(projectRoot?: string): FtsMode {
  const fromEnv = parseFtsMode(process.env.FASTR_FTS_MODE);
  if (fromEnv) return fromEnv;

  try {
    const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
    const file = path.join(root, '.fastr', 'project.json');
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const fromFile = parseFtsMode(data?.write?.ftsMode);
      if (fromFile) return fromFile;
    }
  } catch {}

  return 'deferred';
}

export function findProjectRoot(startDir: string = process.cwd()): string {
  let cur = path.resolve(startDir);
  while (true) {
    if (
      fs.existsSync(path.join(cur, '.git')) ||
      fs.existsSync(path.join(cur, '.fastr')) ||
      fs.existsSync(path.join(cur, 'package.json'))
    ) {
      return cur;
    }
    const parent = path.dirname(cur);
    if (parent === cur) {
      return startDir;
    }
    cur = parent;
  }
}

export function resolveFastrHome(homeDir?: string): string {
  return homeDir ?? process.env.FASTR_HOME ?? os.homedir();
}

/**
 * The path where recall counters are queued.
 *
 * Falls back to a sibling of the spool file, so a config built without the field still
 * queues counters next to the rest of the project's deferred work.
 */
export function resolveRetrievalQueuePath(config: Pick<FastrConfig, 'spoolPath' | 'retrievalQueuePath'>): string {
  return config.retrievalQueuePath ?? path.join(path.dirname(config.spoolPath), 'retrievals.jsonl');
}

export function loadConfig(customRoot?: string, homeDir?: string): FastrConfig {
  const projectRoot = customRoot ? path.resolve(customRoot) : findProjectRoot();
  const fastrDir = path.join(projectRoot, '.fastr');
  const projectConfigFile = path.join(fastrDir, 'project.json');

  let projectId = '';
  let projectName = path.basename(projectRoot);

  if (fs.existsSync(projectConfigFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(projectConfigFile, 'utf-8'));
      if (data.projectId) projectId = data.projectId;
      if (data.projectName) projectName = data.projectName;
    } catch {}
  }

  if (!projectId) {
    // Generate deterministic projectId based on projectRoot path
    projectId = `proj_${crypto.createHash('sha256').update(projectRoot).digest('hex').slice(0, 12)}`;
    if (!fs.existsSync(fastrDir)) {
      fs.mkdirSync(fastrDir, { recursive: true });
    }
    fs.writeFileSync(
      projectConfigFile,
      JSON.stringify({ projectId, projectName }, null, 2),
      'utf-8'
    );
  }

  return {
    projectId,
    projectName,
    projectRoot,
    dbPath: path.join(fastrDir, 'fastr.db'),
    globalDbPath: path.join(resolveFastrHome(homeDir), '.fastr', 'global.db'),
    spoolPath: path.join(fastrDir, 'spool', 'pending.jsonl'),
    retrievalQueuePath: path.join(fastrDir, 'spool', 'retrievals.jsonl'),
    pagesDir: path.join(fastrDir, 'pages'),
    write: {
      conflictMode: resolveConflictMode(projectRoot),
      nerMode: resolveNerMode(projectRoot),
      ftsMode: resolveFtsMode(projectRoot)
    }
  };
}
