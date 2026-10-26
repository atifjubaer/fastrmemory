import { describe, expect, it } from 'vitest';
import { InMemoryTransport } from '@modelcontextprotocol/server';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createFastrMcpServer, createFastrServerContext } from '../src/mcp/server.js';
import {
  CORE_MCP_TOOL_NAMES,
  DEFAULT_MCP_TOOL_PROFILE,
  parseMcpToolProfile,
  type McpToolProfile
} from '../src/mcp/profiles.js';

interface ToolSurface {
  tools: Array<{ name: string; description?: string; inputSchema?: unknown }>;
  call: (name: string, args?: Record<string, unknown>) => Promise<any>;
}

async function withTools<T>(profile: McpToolProfile, fn: (surface: ToolSurface) => Promise<T>): Promise<T> {
  const testDir = path.join(
    process.cwd(),
    'tests',
    `temp_mcp_profile_${profile}_${process.pid}_${Date.now()}`
  );
  fs.mkdirSync(testDir, { recursive: true });

  const ctx = createFastrServerContext(testDir);
  const server = createFastrMcpServer(ctx, { profile });
  const [client, serverTransport] = InMemoryTransport.createLinkedPair();
  const pending = new Map<number, (message: any) => void>();
  let nextId = 1;

  client.onmessage = (message: any) => {
    const resolve = pending.get(message.id);
    if (resolve) {
      pending.delete(message.id);
      resolve(message);
    }
  };

  const rpc = (method: string, params: Record<string, unknown> = {}): Promise<any> =>
    new Promise((resolve) => {
      const id = nextId++;
      pending.set(id, resolve);
      client.send({ jsonrpc: '2.0', id, method, params });
    });

  try {
    await server.connect(serverTransport);
    await client.start();
    await rpc('initialize', {
      protocolVersion: '2025-03-26',
      capabilities: {},
      clientInfo: { name: 'core-profile-test', version: '1.0.0' }
    });

    const listed = await rpc('tools/list');
    return await fn({
      tools: listed.result.tools,
      call: (name, args = {}) => rpc('tools/call', { name, arguments: args })
    });
  } finally {
    try { await client.close(); } catch {}
    try { await server.close(); } catch {}
    try { ctx.db.close(); } catch {}
    try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
  }
}

function toolNames(surface: ToolSurface): string[] {
  return surface.tools.map((tool) => tool.name).sort();
}

function textOf(response: any): string {
  return response?.result?.content?.[0]?.text ?? '';
}

describe('MCP tool profiles', () => {
  it('defaults to the 12-tool core profile and keeps the complete full profile', async () => {
    expect(DEFAULT_MCP_TOOL_PROFILE).toBe('core');
    expect(parseMcpToolProfile(undefined)).toBe('core');
    expect(parseMcpToolProfile(' CORE ')).toBe('core');
    expect(parseMcpToolProfile('full')).toBe('full');
    expect(() => parseMcpToolProfile('tiny')).toThrow(/Unknown MCP tool profile/);

    await withTools('core', async (core) => {
      const names = toolNames(core);
      expect(names).toHaveLength(12);
      expect(names).toEqual([...CORE_MCP_TOOL_NAMES].sort());
      expect(names).toContain('fastr_tools');
      expect(names).toContain('fastr_call');
      // Reachable through fastr_call, but not part of the core schema surface.
      expect(names).not.toContain('fastr_timeline');
      expect(names).not.toContain('fastr_diff');
    });

    await withTools('full', async (full) => {
      const names = toolNames(full);
      expect(names).toHaveLength(44);
      for (const toolName of CORE_MCP_TOOL_NAMES) {
        expect(names).toContain(toolName);
      }
    });
  }, 30_000);

  it('keeps the core tools/list payload under 10 KB', async () => {
    await withTools('core', async (core) => {
      const bytes = Buffer.byteLength(JSON.stringify(core.tools), 'utf8');
      expect(bytes).toBeLessThanOrEqual(10 * 1024);
    });
  }, 30_000);

  it('lists hidden tools with their schemas via fastr_tools', async () => {
    await withTools('core', async (core) => {
      const response = await core.call('fastr_tools', { query: 'timeline', limit: 5 });
      expect(response.result.isError).toBeFalsy();

      const payload = JSON.parse(textOf(response));
      expect(payload.total).toBeGreaterThanOrEqual(1);
      expect(payload.tools.map((tool: any) => tool.name)).toContain('fastr_timeline');

      const timeline = payload.tools.find((tool: any) => tool.name === 'fastr_timeline');
      expect(timeline.inputSchema).toBeTruthy();
      expect(timeline.inputSchema.type).toBe('object');
      expect(Object.keys(timeline.inputSchema.properties ?? {})).toContain('limit');
    });
  }, 30_000);

  it('runs a tool outside the core profile through fastr_call', async () => {
    await withTools('core', async (core) => {
      const response = await core.call('fastr_call', {
        tool: 'fastr_list',
        args: { limit: 5 }
      });
      expect(response.result.isError).toBeFalsy();

      const payload = JSON.parse(textOf(response));
      expect(Array.isArray(payload.items)).toBe(true);
    });
  }, 30_000);

  it('rejects unknown tools, meta-tools, and invalid arguments in fastr_call', async () => {
    await withTools('core', async (core) => {
      const unknown = await core.call('fastr_call', { tool: 'fastr_nope', args: {} });
      expect(unknown.result.isError).toBe(true);
      expect(textOf(unknown)).toContain('Unknown tool');

      const meta = await core.call('fastr_call', { tool: 'fastr_call', args: {} });
      expect(meta.result.isError).toBe(true);
      expect(textOf(meta)).toContain('cannot invoke');

      const invalid = await core.call('fastr_call', { tool: 'fastr_list', args: { limit: 9999 } });
      expect(invalid.result.isError).toBe(true);
      expect(textOf(invalid)).toContain('Invalid arguments for fastr_list');
    });
  }, 30_000);
});
