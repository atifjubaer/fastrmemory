/**
 * Engine descriptors for the cross-engine comparison.
 *
 * Each descriptor pins a package version, states how to start it over MCP stdio, how to
 * isolate its on-disk state, and how to map one marker document and one query onto its
 * tools. Nothing engine-specific lives outside this file.
 *
 * Isolation was verified by probing, not assumed:
 *   - fastrmemory honours `FASTR_HOME` for the global database and `--project` for the
 *     project database.
 *   - agentmemory ignores `AGENTMEMORY_DATA_DIR` and resolves `homedir()/.agentmemory`,
 *     so `USERPROFILE` and `HOME` both point at a fresh directory per case.
 *   - hippo's MCP server ignores `HIPPO_HOME` and writes to `~/.hippo` unless the working
 *     directory contains a `.hippo` store, so each case runs `hippo init` in its own
 *     project directory first and also gets a fresh home.
 */

import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { MarkerDoc } from './marker-corpus.js';
import type { McpServerSpec } from './mcp-stdio.js';

export interface CaseDirs {
  /** Root of the throwaway directory tree for this engine run. */
  root: string;
  /** Project directory handed to the engine. */
  project: string;
  /** Fresh home directory, so nothing escapes into the real user profile. */
  home: string;
}

export interface VsEngine {
  id: string;
  label: string;
  /** Pinned version, reported in the artifact. */
  version: string;
  /** Absolute path of the JavaScript entry point that is launched with `node`. */
  entry: string;
  bootstrap: (dirs: CaseDirs) => Promise<void>;
  spec: (dirs: CaseDirs) => McpServerSpec;
  rememberTool: string;
  rememberArgs: (doc: MarkerDoc) => Record<string, unknown>;
  recallTool: string;
  recallArgs: (query: string, budgetTokens: number) => Record<string, unknown>;
  /** True when the engine needs a project directory that already exists. */
  needsProjectDir: boolean;
}

export interface EngineEnvironment {
  repoRoot: string;
  /** Directory holding the pinned third-party installs. */
  externalDir: string;
}

function readVersion(packageJson: string): string {
  const parsed = JSON.parse(fs.readFileSync(packageJson, 'utf8')) as { version?: string };
  return parsed.version ?? 'unknown';
}

export function createVsEngines(environment: EngineEnvironment): VsEngine[] {
  const { repoRoot, externalDir } = environment;
  const fastrEntry = path.join(repoRoot, 'dist', 'bin', 'fastr.js');
  const agentmemoryEntry = path.join(externalDir, 'node_modules', '@agentmemory', 'mcp', 'bin.mjs');
  const hippoEntry = path.join(externalDir, 'node_modules', 'hippo-memory', 'bin', 'hippo.js');
  const fastrVersion = readVersion(path.join(repoRoot, 'package.json'));

  const engines: VsEngine[] = [
    {
      id: 'fastrmemory',
      label: 'FastrMemory',
      version: fastrVersion,
      entry: fastrEntry,
      needsProjectDir: true,
      bootstrap: async (dirs) => {
        fs.mkdirSync(dirs.project, { recursive: true });
        fs.mkdirSync(dirs.home, { recursive: true });
      },
      spec: (dirs) => ({
        command: process.execPath,
        args: [fastrEntry, 'mcp', '--project', dirs.project],
        cwd: dirs.project,
        env: { FASTR_HOME: dirs.home }
      }),
      rememberTool: 'fastr_remember',
      rememberArgs: (doc) => ({
        module: doc.system,
        kind: 'error_trap',
        title: `${doc.marker} ${doc.system} ${doc.problem}`,
        content: doc.content
      }),
      recallTool: 'fastr_recall',
      recallArgs: (query, budgetTokens) => ({ query, budgetTokens })
    },
    {
      id: 'agentmemory',
      label: 'agentmemory',
      version: readVersion(path.join(externalDir, 'node_modules', '@agentmemory', 'mcp', 'package.json')),
      entry: agentmemoryEntry,
      needsProjectDir: true,
      bootstrap: async (dirs) => {
        fs.mkdirSync(dirs.project, { recursive: true });
        fs.mkdirSync(dirs.home, { recursive: true });
      },
      spec: (dirs) => ({
        command: process.execPath,
        args: [agentmemoryEntry],
        cwd: dirs.project,
        env: { USERPROFILE: dirs.home, HOME: dirs.home }
      }),
      rememberTool: 'memory_save',
      rememberArgs: (doc) => ({
        content: doc.content,
        type: 'fact',
        project: doc.system
      }),
      recallTool: 'memory_recall',
      recallArgs: (query, budgetTokens) => ({ query, limit: 10, token_budget: budgetTokens })
    },
    {
      id: 'hippo',
      label: 'Hippo',
      version: readVersion(path.join(externalDir, 'node_modules', 'hippo-memory', 'package.json')),
      entry: hippoEntry,
      needsProjectDir: true,
      bootstrap: async (dirs) => {
        fs.mkdirSync(dirs.project, { recursive: true });
        fs.mkdirSync(dirs.home, { recursive: true });
        execFileSync(process.execPath, [hippoEntry, 'init', '--no-hooks', '--no-schedule', '--no-learn'], {
          cwd: dirs.project,
          env: { ...process.env, USERPROFILE: dirs.home, HOME: dirs.home },
          stdio: 'ignore',
          timeout: 120_000
        });
      },
      spec: (dirs) => ({
        command: process.execPath,
        args: [hippoEntry, 'mcp'],
        cwd: dirs.project,
        env: { USERPROFILE: dirs.home, HOME: dirs.home }
      }),
      rememberTool: 'hippo_remember',
      rememberArgs: (doc) => ({ text: doc.content }),
      recallTool: 'hippo_recall',
      recallArgs: (query, budgetTokens) => ({ query, budget: budgetTokens })
    }
  ];

  return engines;
}

/** Fails early with an actionable message instead of timing out inside the MCP handshake. */
export function assertEngineAvailable(engine: VsEngine, externalDir: string): void {
  if (!fs.existsSync(engine.entry)) {
    const hint =
      engine.id.startsWith('fastrmemory')
        ? 'run `npm run build:core`'
        : `run \`npm run bench:setup\` (installs the pinned engines into ${externalDir})`;
    throw new Error(`${engine.label} entry point is missing at ${engine.entry}; ${hint}`);
  }
}
