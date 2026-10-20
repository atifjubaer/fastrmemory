/**
 * MCP tool profiles keep the default surface complete while offering a smaller
 * schema for clients that only need the daily memory loop.
 */
export const MCP_TOOL_PROFILE_NAMES = ['full', 'core'] as const;

export type McpToolProfile = (typeof MCP_TOOL_PROFILE_NAMES)[number];

export const DEFAULT_MCP_TOOL_PROFILE: McpToolProfile = 'full';

/**
 * The core profile is the 12-tool daily loop:
 * read (recall/get/timeline/status), write (remember/traps/handoff),
 * recover (diff/replay), compress, and diagnose.
 */
export const CORE_MCP_TOOL_NAMES = [
  'fastr_recall',
  'fastr_remember',
  'fastr_handoff',
  'fastr_trap_recall',
  'fastr_trap_log',
  'fastr_status',
  'fastr_get',
  'fastr_timeline',
  'fastr_diff',
  'fastr_replay',
  'fastr_compress',
  'fastr_diagnose'
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
