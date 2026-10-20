import { describe, expect, it } from 'vitest';
import { InMemoryTransport } from '@modelcontextprotocol/server';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createFastrMcpServer, createFastrServerContext } from '../src/mcp/server.js';
import {
  CORE_MCP_TOOL_NAMES,
  parseMcpToolProfile,
  type McpToolProfile
} from '../src/mcp/profiles.js';

async function listTools(profile: McpToolProfile): Promise<string[]> {
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

    const response = await rpc('tools/list');
    return response.result.tools.map((tool: any) => tool.name).sort();
  } finally {
    try { await client.close(); } catch {}
    try { await server.close(); } catch {}
    try { ctx.db.close(); } catch {}
    try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
  }
}

describe('MCP tool profiles', () => {
  it('exposes the 12-tool core profile and the complete full profile', async () => {
    expect(parseMcpToolProfile(undefined)).toBe('full');
    expect(parseMcpToolProfile(' CORE ')).toBe('core');
    expect(() => parseMcpToolProfile('tiny')).toThrow(/Unknown MCP tool profile/);

    const coreTools = await listTools('core');
    expect(coreTools).toHaveLength(12);
    expect(coreTools).toEqual([...CORE_MCP_TOOL_NAMES].sort());

    const fullTools = await listTools('full');
    expect(fullTools).toHaveLength(41);
    for (const toolName of CORE_MCP_TOOL_NAMES) {
      expect(fullTools).toContain(toolName);
    }
  }, 30_000);
});
