import * as os from 'node:os';
import * as path from 'node:path';
import { PACKAGE_VERSION } from '../version.js';
import {
  JsonUpdateResult,
  McpServerEntry,
  updateJsonConfig,
  upsertMcpServer,
} from './json-config.js';
import { resolveOpenCodeConfigPath, upsertOpenCodeMcpServer } from './opencode.js';
import { getAntigravityConfigPath, getClaudeDesktopConfigPath } from './setup.js';
import { resolveMcpCommand, withProjectRoot } from './mcp-command.js';

export const MCP_CLIENTS = [
  'claude',
  'cursor',
  'vscode',
  'opencode',
  'gemini',
  'copilot',
  'windsurf',
  'antigravity',
  'claude-desktop',
  'codex',
] as const;

export type McpClientId = (typeof MCP_CLIENTS)[number];
export type McpScope = 'project' | 'user';
export type McpChannel = 'latest' | 'pinned';
export type McpRunner = 'npx' | 'pnpm' | 'yarn' | 'bunx';
export type McpSource = 'registry' | 'local';

export interface McpInitOptions {
  clients: McpClientId[];
  scope?: McpScope;
  projectRoot?: string;
  homeDir?: string;
  channel?: McpChannel;
  runner?: McpRunner;
  profile?: 'full' | 'core';
  /** registry (portable npx) or local (the active CLI, with an absolute project root). */
  source?: McpSource;
  /** Overrides the active CLI path (tests and sandboxes). */
  cliPath?: string | null;
  dryRun?: boolean;
  platform?: NodeJS.Platform;
}

export interface McpInitResult {
  client: McpClientId;
  label: string;
  scope: McpScope;
  filePath: string;
  entry: McpServerEntry;
  source: McpSource;
  changed: boolean;
  created: boolean;
  backupPath?: string;
  dryRun: boolean;
  manual?: string;
  skipped?: string;
}

interface ClientSpec {
  label: string;
  scopes: McpScope[];
}

const CLIENT_SPECS: Record<McpClientId, ClientSpec> = {
  claude: { label: 'Claude Code', scopes: ['project', 'user'] },
  cursor: { label: 'Cursor', scopes: ['project', 'user'] },
  vscode: { label: 'VS Code', scopes: ['project', 'user'] },
  opencode: { label: 'OpenCode', scopes: ['project'] },
  gemini: { label: 'Gemini CLI', scopes: ['project', 'user'] },
  copilot: { label: 'GitHub Copilot CLI', scopes: ['project'] },
  windsurf: { label: 'Windsurf', scopes: ['user'] },
  antigravity: { label: 'Antigravity', scopes: ['user'] },
  'claude-desktop': { label: 'Claude Desktop', scopes: ['user'] },
  codex: { label: 'Codex', scopes: ['user'] },
};

export const PROJECT_ALL_CLIENTS: McpClientId[] = [
  'claude',
  'cursor',
  'vscode',
  'opencode',
  'gemini',
  'copilot',
];

export const USER_ALL_CLIENTS: McpClientId[] = [
  'claude',
  'cursor',
  'vscode',
  'gemini',
  'windsurf',
  'antigravity',
  'claude-desktop',
  'codex',
];

export class McpInitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'McpInitError';
  }
}

export function parseMcpClients(value: string, scope: McpScope = 'project'): McpClientId[] {
  const requested = value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (requested.length === 0) {
    throw new McpInitError(`Choose a client: ${MCP_CLIENTS.join(', ')}, or all.`);
  }

  const expanded = requested.flatMap((item) => {
    if (item === 'all') return scope === 'user' ? USER_ALL_CLIENTS : PROJECT_ALL_CLIENTS;
    if (!(MCP_CLIENTS as readonly string[]).includes(item)) {
      throw new McpInitError(
        `Unknown client "${item}". Choose from: ${MCP_CLIENTS.join(', ')}, or all.`
      );
    }
    return [item as McpClientId];
  });

  return [...new Set(expanded)];
}

export function parseMcpScope(value: string): McpScope {
  if (value === 'project' || value === 'user') return value;
  throw new McpInitError('Scope must be "project" or "user".');
}

export function parseMcpChannel(value: string): McpChannel {
  if (value === 'latest' || value === 'pinned') return value;
  throw new McpInitError('Channel must be "latest" or "pinned".');
}

export function parseMcpRunner(value: string): McpRunner {
  if (value === 'npx' || value === 'pnpm' || value === 'yarn' || value === 'bunx') return value;
  throw new McpInitError('Runner must be "npx", "pnpm", "yarn", or "bunx".');
}

export function parseMcpSource(value: string): McpSource {
  if (value === 'registry' || value === 'local') return value;
  throw new McpInitError('Source must be "registry" or "local".');
}

export function parseMcpProfile(value: string): 'full' | 'core' {
  if (value === 'full' || value === 'core') return value;
  throw new McpInitError('Profile must be "full" or "core".');
}

/**
 * Build a portable MCP entry. The generated config names the package instead of embedding an
 * absolute CLI path, so a project config can be committed and shared across machines.
 */
export function buildRegistryMcpEntry(options: {
  channel?: McpChannel;
  runner?: McpRunner;
  profile?: 'full' | 'core';
  platform?: NodeJS.Platform;
  packageVersion?: string;
} = {}): McpServerEntry {
  const channel = options.channel ?? 'latest';
  const runner = options.runner ?? 'npx';
  const profile = options.profile ?? 'full';
  const packageSpec = channel === 'pinned'
    ? `fastrmemory@${options.packageVersion ?? PACKAGE_VERSION}`
    : 'fastrmemory@latest';

  let args: string[];
  switch (runner) {
    case 'npx':
      args = ['-y', packageSpec, 'mcp'];
      break;
    case 'pnpm':
      args = ['dlx', packageSpec, 'mcp'];
      break;
    case 'yarn':
      args = ['dlx', packageSpec, 'mcp'];
      break;
    case 'bunx':
      // `bunx` honors the package's Node shebang; `--bun` would force Bun, which
      // does not provide `node:sqlite`, the engine FastrMemory depends on.
      args = [packageSpec, 'mcp'];
      break;
  }

  if (profile === 'core') args.push('--profile', 'core');

  if ((options.platform ?? process.platform) === 'win32') {
    // MCP clients spawn servers without a shell; npm/pnpm/yarn/bunx shims are .cmd files.
    return { command: 'cmd', args: ['/c', runner, ...args] };
  }
  return { command: runner, args };
}

/**
 * Build a non-portable MCP entry that points at the active CLI. This avoids npx cold starts
 * and is the right choice for a globally installed CLI or a local development checkout.
 */
export function buildLocalMcpEntry(options: {
  profile?: 'full' | 'core';
  platform?: NodeJS.Platform;
  cliPath?: string | null;
} = {}): McpServerEntry {
  const entry = resolveMcpCommand(options.platform ?? process.platform, options.cliPath);
  if ((options.profile ?? 'full') === 'core') {
    entry.args.push('--profile', 'core');
  }
  return entry;
}

function resolveVsCodeUserConfig(homeDir: string, platform: NodeJS.Platform): string {
  if (platform === 'win32') {
    const appData = homeDir === os.homedir() && process.env.APPDATA
      ? process.env.APPDATA
      : path.join(homeDir, 'AppData', 'Roaming');
    return path.join(appData, 'Code', 'User', 'mcp.json');
  }
  if (platform === 'darwin') {
    return path.join(homeDir, 'Library', 'Application Support', 'Code', 'User', 'mcp.json');
  }
  return path.join(homeDir, '.config', 'Code', 'User', 'mcp.json');
}

function resolveClientPath(
  client: McpClientId,
  scope: McpScope,
  projectRoot: string,
  homeDir: string,
  platform: NodeJS.Platform
): string {
  switch (client) {
    case 'claude':
      return scope === 'project'
        ? path.join(projectRoot, '.mcp.json')
        : path.join(homeDir, '.claude.json');
    case 'cursor':
      return scope === 'project'
        ? path.join(projectRoot, '.cursor', 'mcp.json')
        : path.join(homeDir, '.cursor', 'mcp.json');
    case 'vscode':
      return scope === 'project'
        ? path.join(projectRoot, '.vscode', 'mcp.json')
        : resolveVsCodeUserConfig(homeDir, platform);
    case 'opencode':
      return resolveOpenCodeConfigPath(projectRoot).filePath;
    case 'gemini':
      return scope === 'project'
        ? path.join(projectRoot, '.gemini', 'settings.json')
        : path.join(homeDir, '.gemini', 'settings.json');
    case 'copilot':
      return path.join(projectRoot, '.github', 'mcp.json');
    case 'windsurf':
      return path.join(homeDir, '.codeium', 'windsurf', 'mcp_config.json');
    case 'antigravity':
      return getAntigravityConfigPath(homeDir);
    case 'claude-desktop':
      return getClaudeDesktopConfigPath(homeDir);
    case 'codex':
      return path.join(homeDir, '.codex', 'config.toml');
  }
}

function buildCodexToml(entry: McpServerEntry): string {
  const args = entry.args.map((arg) => JSON.stringify(arg)).join(', ');
  return [
    '[mcp_servers.fastrmemory]',
    `command = ${JSON.stringify(entry.command)}`,
    `args = [${args}]`,
    '',
  ].join('\n');
}

function applyClientConfig(client: McpClientId, filePath: string, entry: McpServerEntry): JsonUpdateResult {
  if (client === 'vscode') {
    return updateJsonConfig(filePath, (config) => {
      if (!config.servers || typeof config.servers !== 'object' || Array.isArray(config.servers)) {
        config.servers = {};
      }
      config.servers.fastrmemory = entry;
    });
  }
  if (client === 'opencode') {
    return updateJsonConfig(filePath, (config) => upsertOpenCodeMcpServer(config, entry));
  }
  if (client === 'copilot') {
    return updateJsonConfig(filePath, (config) => {
      upsertMcpServer(config, 'fastrmemory', { type: 'local', ...entry } as McpServerEntry);
    });
  }
  return updateJsonConfig(filePath, (config) => upsertMcpServer(config, 'fastrmemory', entry));
}

/**
 * Configure one or more MCP clients. Existing JSON is merged, backed up once, and never
 * overwritten when it cannot be parsed. Codex is printed as TOML because a safe rewrite of a
 * user-owned TOML file needs a dedicated parser.
 */
export function initMcpClients(options: McpInitOptions): McpInitResult[] {
  const scope = options.scope ?? 'project';
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd());
  const homeDir = options.homeDir ?? os.homedir();
  const platform = options.platform ?? process.platform;
  const dryRun = options.dryRun ?? false;
  const source = options.source ?? 'registry';
  const baseEntry = source === 'local'
    ? buildLocalMcpEntry({ profile: options.profile, platform, cliPath: options.cliPath })
    : buildRegistryMcpEntry({
        channel: options.channel,
        runner: options.runner,
        profile: options.profile,
        platform,
      });
  // Local entries always pin the project root. Registry project configs stay portable.
  const entry = source === 'local' || scope === 'user'
    ? withProjectRoot(baseEntry, projectRoot)
    : baseEntry;
  const entrySource: McpSource = entry.command === 'node' ? 'local' : 'registry';

  // Validate every requested client before the first write so a bad scope cannot leave a
  // half-configured set of clients behind.
  const specs = options.clients.map((client) => {
    const spec = CLIENT_SPECS[client];
    if (!spec) throw new McpInitError(`Unknown client "${client}".`);
    if (!spec.scopes.includes(scope)) {
      throw new McpInitError(
        `${spec.label} does not support ${scope}-scoped MCP config. Supported scope: ${spec.scopes.join(' or ')}.`
      );
    }
    return { client, spec };
  });

  return specs.map(({ client, spec }) => {
    const filePath = resolveClientPath(client, scope, projectRoot, homeDir, platform);
    const result: McpInitResult = {
      client,
      label: spec.label,
      scope,
      filePath,
      entry,
      source: entrySource,
      changed: false,
      created: false,
      dryRun,
    };

    if (client === 'codex') {
      result.manual = buildCodexToml(entry);
      return result;
    }

    if (client === 'opencode' && resolveOpenCodeConfigPath(projectRoot).jsonc) {
      result.skipped = `OpenCode config is JSONC (${filePath}); add the fastrmemory MCP server manually`;
      return result;
    }

    if (dryRun) return result;

    const write = applyClientConfig(client, filePath, entry);
    return {
      ...result,
      changed: write.changed,
      created: write.created,
      backupPath: write.backupPath,
    };
  });
}

export function formatMcpInitResult(result: McpInitResult): string {
  if (result.skipped) return `${result.label}: skipped — ${result.skipped}`;
  if (result.manual) {
    return `${result.label}: add this to ${result.filePath}\n\n${result.manual}`;
  }
  if (result.dryRun) {
    return `${result.label}: would write ${result.filePath}`;
  }
  if (result.created) return `${result.label}: created ${result.filePath}`;
  if (result.changed) {
    const backup = result.backupPath ? ` (backup: ${path.basename(result.backupPath)})` : '';
    return `${result.label}: updated ${result.filePath}${backup}`;
  }
  return `${result.label}: already up to date (${result.filePath})`;
}

/** Ensure a client id is usable in generated docs/tests without importing the CLI command tree. */
export function isMcpClient(value: string): value is McpClientId {
  return (MCP_CLIENTS as readonly string[]).includes(value);
}

/** Small helper for tests and dry-run output. */
export function mcpEntryCommand(entry: McpServerEntry): string {
  return [entry.command, ...entry.args].map((part) => (/\s/.test(part) ? JSON.stringify(part) : part)).join(' ');
}

/** True when the generated entry points at the package registry rather than a local checkout. */
export function isPortableRegistryEntry(entry: McpServerEntry): boolean {
  return entry.args.some((arg) => /^fastrmemory@(?:latest|\d+\.\d+\.\d+)/.test(arg));
}
