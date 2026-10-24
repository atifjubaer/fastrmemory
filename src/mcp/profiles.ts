/**
 * MCP tool profiles. `core` is the default surface: the daily memory loop plus two
 * meta-tools that can discover and run anything in the `full` profile.
 */
export const MCP_TOOL_PROFILE_NAMES = ['full', 'core'] as const;

export type McpToolProfile = (typeof MCP_TOOL_PROFILE_NAMES)[number];

export const DEFAULT_MCP_TOOL_PROFILE: McpToolProfile = 'core';

/**
 * The core profile is 10 daily tools plus discovery/dispatch:
 * read (recall/get/status), write (remember/traps/handoff),
 * recover (replay), compress, diagnose, fastr_tools, and fastr_call.
 *
 * `fastr_timeline` and `fastr_diff` stay in the full profile and remain reachable
 * through `fastr_call`, which keeps the core `tools/list` payload small.
 */
export const CORE_MCP_TOOL_NAMES = [
  'fastr_recall',
  'fastr_remember',
  'fastr_handoff',
  'fastr_trap_recall',
  'fastr_trap_log',
  'fastr_status',
  'fastr_get',
  'fastr_replay',
  'fastr_compress',
  'fastr_diagnose',
  'fastr_tools',
  'fastr_call'
] as const;

const CORE_MCP_TOOL_SET: ReadonlySet<string> = new Set(CORE_MCP_TOOL_NAMES);

export function parseMcpToolProfile(value?: string): McpToolProfile {
  const normalized = (value ?? '').trim().toLowerCase();
  if (!normalized) return DEFAULT_MCP_TOOL_PROFILE;
  if (normalized === 'full' || normalized === 'core') return normalized;
  throw new Error(`Unknown MCP tool profile "${value}". Use "full" or "core".`);
}

export function isMcpToolEnabled(profile: McpToolProfile, toolName: string): boolean {
  return profile === 'full' || CORE_MCP_TOOL_SET.has(toolName);
}
