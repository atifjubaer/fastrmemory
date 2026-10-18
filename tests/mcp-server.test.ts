import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InMemoryTransport } from '@modelcontextprotocol/server';
import { createFastrMcpServer, createFastrServerContext } from '../src/mcp/server.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('MCP v2 Server (Tools & Resources)', () => {
  const testDir = path.join(process.cwd(), 'tests', 'temp_mcp_test_dir');
  let ctx: any;
  let server: any;
  let clientTransport: any;

  beforeEach(async () => {
    if (fs.existsSync(testDir)) {
      try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
    }
    fs.mkdirSync(testDir, { recursive: true });

    ctx = createFastrServerContext(testDir);
    server = createFastrMcpServer(ctx);

    const [client, serverTr] = InMemoryTransport.createLinkedPair();
    clientTransport = client;

    await server.connect(serverTr);
    await clientTransport.start();

    // Handshake
    let msgId = 1;
    await new Promise((resolve) => {
      clientTransport.onmessage = (msg: any) => {
        if (msg.id === 1) resolve(msg);
      };
      clientTransport.send({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-03-26',
          capabilities: {},
          clientInfo: { name: 'test-runner', version: '1.0.0' }
        }
      });
    });
  });

  afterEach(async () => {
    if (clientTransport) {
      try { await clientTransport.close(); } catch {}
    }
    if (ctx && ctx.db) {
      try { ctx.db.close(); } catch {}
    }
    if (fs.existsSync(testDir)) {
      try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
    }
  });

  function callTool(name: string, args: Record<string, any>): Promise<any> {
    const id = Math.floor(Math.random() * 1000000);
    return new Promise((resolve) => {
      const handler = (msg: any) => {
        if (msg.id === id) {
          clientTransport.onmessage = null;
          resolve(msg.result);
        }
      };
      clientTransport.onmessage = handler;
      clientTransport.send({
        jsonrpc: '2.0',
        id,
        method: 'tools/call',
        params: { name, arguments: args }
      });
    });
  }

  it('exposes all 8 core MCP tools', async () => {
    const id = 999;
    const res: any = await new Promise((resolve) => {
      clientTransport.onmessage = (msg: any) => {
        if (msg.id === id) resolve(msg.result);
      };
      clientTransport.send({
        jsonrpc: '2.0',
        id,
        method: 'tools/list',
        params: {}
      });
    });

    const toolNames = res.tools.map((t: any) => t.name);
    expect(toolNames).toContain('fastr_recall');
    expect(toolNames).toContain('fastr_drill');
    expect(toolNames).toContain('fastr_file_history');
    expect(toolNames).toContain('fastr_remember');
    expect(toolNames).toContain('fastr_supersede');
    expect(toolNames).toContain('fastr_feedback');
    expect(toolNames).toContain('fastr_handoff');
    expect(toolNames).toContain('fastr_status');
  });

  it('records, recalls, rates, supersedes, and checks file history via MCP', async () => {
    // 1. fastr_remember
    const rememberRes = await callTool('fastr_remember', {
      module: 'auth',
      kind: 'rule',
      title: 'Token Algorithm',
      content: 'Always use RS256 for signing tokens.',
      files: ['src/auth/jwt.ts'],
      verified: true
    });
    expect(rememberRes.content[0].text).toContain('Recorded memory');
    expect(rememberRes.content[0].text).toContain('[mem_');

    // Extract memory ID
    const match = rememberRes.content[0].text.match(/\[(mem_[a-f0-9]+)\]/);
    const memId = match ? match[1] : '';
    expect(memId).toBeTruthy();

    // 2. fastr_recall
    const recallRes = await callTool('fastr_recall', {
      query: 'signing tokens algorithm',
      files: ['src/auth/jwt.ts']
    });
    expect(recallRes.content[0].text).toContain(memId);
    expect(recallRes.content[0].text).toContain('Token Algorithm');

    // 3. fastr_feedback
    const feedbackRes = await callTool('fastr_feedback', {
      memoryId: memId,
      outcome: 'good'
    });
    expect(feedbackRes.content[0].text).toContain('reward_score = 1.2');

    // 4. fastr_file_history
    const fileHistRes = await callTool('fastr_file_history', {
      filePath: 'src/auth/jwt.ts'
    });
    expect(fileHistRes.content[0].text).toContain(memId);
    expect(fileHistRes.content[0].text).toContain('Token Algorithm');

    // 5. fastr_supersede
    const supersedeRes = await callTool('fastr_supersede', {
      oldMemoryId: memId,
      newTitle: 'Token Algorithm Ed25519',
      newContent: 'Upgraded to Ed25519 for faster verification.',
      reason: 'Modern cryptographic upgrade'
    });
    expect(supersedeRes.content[0].text).toContain('Superseded');
    expect(supersedeRes.content[0].text).toContain('Modern cryptographic upgrade');

    // 6. fastr_status
    const statusRes = await callTool('fastr_status', {});
    expect(statusRes.content[0].text).toContain('**Active Memories**: 1');
    expect(statusRes.content[0].text).toContain('**Superseded History**: 1');
  });

  it('saves and retrieves cross-agent session handoffs via MCP', async () => {
    const saveRes = await callTool('fastr_handoff', {
      action: 'save',
      taskTitle: 'Database Migration',
      summary: 'Schema updated and validated',
      nextStep: 'Run integration test suite',
      activeFiles: ['src/db/schema.ts'],
      verifyStaging: true
    });
    expect(saveRes.content[0].text).toContain('Saved session handoff');

    const getRes = await callTool('fastr_handoff', {
      action: 'latest'
    });
    expect(getRes.content[0].text).toContain('Database Migration');
    expect(getRes.content[0].text).toContain('Run integration test suite');
  });
});
