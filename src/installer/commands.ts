import { resolveMcpCommand } from './setup.js';

function quoteArg(arg: string): string {
  // Hooks may run under Git Bash on Windows, where unquoted backslashes are eaten. Node accepts
  // forward slashes on every platform, so normalise paths and always quote them.
  if (/[\\/]/.test(arg)) return `"${arg.replace(/\\/g, '/').replace(/"/g, '\\"')}"`;
  return /[\s"]/.test(arg) ? `"${arg.replace(/"/g, '\\"')}"` : arg;
}

/** Shell command an agent runs for a lifecycle event, using the same entry point as the MCP server. */
export function buildHookCommand(
  event: string,
  platform: NodeJS.Platform = process.platform,
  format: 'claude' | 'gemini' | 'copilot' = 'claude'
): string {
  const target = resolveMcpCommand(platform);
  // Hook commands run through a shell, so npx needs no `cmd /c` wrapper here.
  const base = target.command === 'cmd' ? target.args.slice(1) : [target.command, ...target.args];
  const withoutMcp = base[base.length - 1] === 'mcp' ? base.slice(0, -1) : base;
  const args = [...withoutMcp, 'hook', 'run', event];
  if (format !== 'claude') args.push('--format', format);
  return args.map(quoteArg).join(' ');
}
