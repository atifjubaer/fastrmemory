import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PACKAGE_VERSION } from '../version.js';
import { McpServerEntry } from './json-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Locate the CLI that belongs to this package copy. */
export function findOwnCliPath(): string | null {
  const candidates = [
    path.resolve(__dirname, '..', '..', 'bin', 'fastr.js'),         // dist/src/installer -> dist/bin/fastr.js
    path.resolve(__dirname, '..', '..', 'dist', 'bin', 'fastr.js'), // src/installer -> dist/bin/fastr.js
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

/**
 * The command MCP clients should spawn. MCP clients launch servers without a shell, so on Windows
 * the `fastrmemory.cmd` npm shim cannot be executed directly. Pointing `node` at the package's own
 * CLI works on every platform; `npx` (wrapped in `cmd /c` on Windows) is the fallback when this
 * copy lives in a throwaway npx cache.
 */
export function resolveMcpCommand(
  platform: NodeJS.Platform = process.platform,
  cliPath: string | null = findOwnCliPath()
): McpServerEntry {
  const isEphemeral = cliPath !== null && /[\\/]_npx[\\/]/.test(cliPath);
  if (cliPath && !isEphemeral) {
    return { command: 'node', args: [cliPath, 'mcp'] };
  }
  // Pin the registry package and version: npx cache paths are throwaway, and a GitHub
  // default-branch reference would silently change the server under existing configs.
  const npxArgs = ['-y', `fastrmemory@${PACKAGE_VERSION}`, 'mcp'];
  return platform === 'win32'
    ? { command: 'cmd', args: ['/c', 'npx', ...npxArgs] }
    : { command: 'npx', args: npxArgs };
}

/** Pin a user-scoped MCP entry to a project root so the client's launch directory cannot change the database. */
export function withProjectRoot(entry: McpServerEntry, projectRoot: string): McpServerEntry {
  return { ...entry, args: [...entry.args, '--project', path.resolve(projectRoot)] };
}

export type McpCommandOrigin = 'source' | 'installed' | 'registry';

/**
 * Classify where an MCP entry will load its CLI from. A `node` entry inside the
 * current checkout is source; one outside it, or under node_modules, is installed.
 */
export function classifyMcpCommand(
  entry: McpServerEntry,
  projectRoot?: string
): McpCommandOrigin {
  if (entry.command !== 'node') return 'registry';
  const cliPath = entry.args[0];
  if (!cliPath || !projectRoot) return 'installed';

  const root = path.resolve(projectRoot);
  const cli = path.resolve(cliPath);
  const relative = path.relative(root, cli);
  const inside = relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
  if (!inside) return 'installed';
  if (relative.split(path.sep).includes('node_modules')) return 'installed';
  return 'source';
}
