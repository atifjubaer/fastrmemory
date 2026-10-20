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
    expect(rememberRes.content[0].text).toContain('Recorded');
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

    // 7. fastr_graph_query
    const graphRes = await callTool('fastr_graph_query', {
      filePath: 'src/auth/jwt.ts',
      depth: 2
    });
    expect(graphRes.content[0].text).toContain('Connected Files');

    // 8. fastr_timeline
    const timelineRes = await callTool('fastr_timeline', {
      limit: 10
    });
    expect(timelineRes.content[0].text).toContain('Chronological Timeline');
    expect(timelineRes.content[0].text).toContain('Token Algorithm');
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

  it('detects and resolves conflicts via fastr_conflicts and fastr_resolve', async () => {
    // 1. Remember rule A
    await callTool('fastr_remember', {
      title: 'CORS Credentials Policy',
      content: 'Always allow credentials on CORS requests for auth routes.',
      module: 'auth',
      kind: 'rule'
    });

    // 2. Remember conflicting rule B
    await callTool('fastr_remember', {
      title: 'CORS Credentials Policy',
      content: 'Never allow credentials on CORS requests for auth routes.',
      module: 'auth',
      kind: 'rule'
    });

    // 3. Query conflicts
    const conflictsRes = await callTool('fastr_conflicts', { status: 'open' });
    expect(conflictsRes.content[0].text).toContain('Conflict #');
    expect(conflictsRes.content[0].text).toContain('Opposing prescriptions');

    // Extract conflict ID
    const match = conflictsRes.content[0].text.match(/Conflict #(\d+)/);
    expect(match).not.toBeNull();
    const conflictId = parseInt(match![1], 10);

    // Extract memory A ID
    const memMatch = conflictsRes.content[0].text.match(/Memory A \[([^\]]+)\]/);
    expect(memMatch).not.toBeNull();
    const keepId = memMatch![1];

    // 4. Resolve conflict
    const resolveRes = await callTool('fastr_resolve', {
      conflictId,
      keepId,
      forgetLoser: true,
      reason: 'Security review confirmed credentials required'
    });
    expect(resolveRes.content[0].text).toContain('Resolved Conflict');
    expect(resolveRes.content[0].text).toContain('superseded');
  });

  it('records, closes, and computes baserate via fastr_predict and fastr_predict_baserate', async () => {
    // 1. Create prediction
    const createRes = await callTool('fastr_predict', {
      action: 'create',
      classTag: 'migration',
      claimText: 'Database migration will take 2 hours',
      estimateValue: 2,
      estimateUnit: 'hours'
    });
    expect(createRes.content[0].text).toContain('Recorded Prediction #');

    const predIdMatch = createRes.content[0].text.match(/Recorded Prediction #(\d+)/);
    const predId = parseInt(predIdMatch![1], 10);

    // 2. Close prediction
    const closeRes = await callTool('fastr_predict', {
      action: 'close',
      predictionId: predId,
      actualValue: 4
    });
    expect(closeRes.content[0].text).toContain('Closed Prediction #');
    expect(closeRes.content[0].text).toContain('2.00x');

    // 3. Query baserate
    const baserateRes = await callTool('fastr_predict_baserate', { classTag: 'migration' });
    expect(baserateRes.content[0].text).toContain('Reference Class Calibration: [migration]');
    expect(baserateRes.content[0].text).toContain('2.00x');
  });

  it('manages Action DAG frontier and claims via fastr_action_create, fastr_frontier, and fastr_next', async () => {
    // 1. Create task 1
    const t1 = await callTool('fastr_action_create', {
      title: 'Scaffold auth schemas',
      priority: 8
    });
    expect(t1.content[0].text).toContain('Created Action [act_');
    const t1Id = t1.content[0].text.match(/\[(act_[^\]]+)\]/)![1];

    // 2. Create task 2 requiring task 1
    const t2 = await callTool('fastr_action_create', {
      title: 'Implement OAuth routes',
      priority: 7,
      requires: [t1Id]
    });
    const t2Id = t2.content[0].text.match(/\[(act_[^\]]+)\]/)![1];

    // 3. Check frontier (only task 1 should be unblocked)
    const frontierRes = await callTool('fastr_frontier', {});
    expect(frontierRes.content[0].text).toContain(t1Id);
    expect(frontierRes.content[0].text).not.toContain(t2Id);

    // 4. Claim next task
    const nextRes = await callTool('fastr_next', { agentId: 'agent-oauth' });
    expect(nextRes.content[0].text).toContain(t1Id);
    expect(nextRes.content[0].text).toContain('active');

    // 5. Complete task 1
    await callTool('fastr_action_update', { id: t1Id, status: 'done' });

    // 6. Frontier now has task 2
    const frontierRes2 = await callTool('fastr_frontier', {});
    expect(frontierRes2.content[0].text).toContain(t2Id);
  });

  it('manages bounded working memory slots via fastr_slot_set, fastr_slot_get, and fastr_slot_list', async () => {
    // 1. Set slot
    const setRes = await callTool('fastr_slot_set', {
      slotKey: 'active_plan',
      content: 'Phase 4 and Phase 5 integration in progress'
    });
    expect(setRes.content[0].text).toContain('Updated Slot [active_plan]');

    // 2. Get slot
    const getRes = await callTool('fastr_slot_get', { slotKey: 'active_plan' });
    expect(getRes.content[0].text).toContain('Phase 4 and Phase 5 integration in progress');

    // 3. List slots
    const listRes = await callTool('fastr_slot_list', {});
    expect(listRes.content[0].text).toContain('[active_plan]');
  });

  it('manages cross-repository federation via fastr_federate and global memories', async () => {
    // 1. Check federation status
    const fedStatus = await callTool('fastr_federate', { action: 'status' });
    expect(fedStatus.content[0].text).toContain('Cross-Repository Federation Status');

    // 2. Remember global memory
    const rememberGlobal = await callTool('fastr_remember', {
      title: 'Global Security Invariant',
      content: 'Never store plain-text passwords in configuration.',
      scope: 'global',
      kind: 'rule',
      module: 'security'
    });
    expect(rememberGlobal.content[0].text).toContain('Recorded global memory');

    // 3. List global memories
    const listGlobal = await callTool('fastr_federate', { action: 'list_global' });
    expect(listGlobal.content[0].text).toContain('Global Security Invariant');
  });

  it('assembles dynamic token-budgeted prompt context via fastr_assemble', async () => {
    // 1. Seed a trap linked to a file
    await callTool('fastr_remember', {
      title: 'Always Check JWT Exp Seconds',
      content: 'JWT exp expects integer seconds, not ms.',
      module: 'auth',
      kind: 'error_trap',
      files: ['src/auth/jwt.ts']
    });

    // 2. Assemble context for task
    const assembleRes = await callTool('fastr_assemble', {
      taskDescription: 'Refactor auth expiration handling',
      targetFiles: ['src/auth/jwt.ts'],
      budgetTokens: 2000,
      agentId: 'claude-test'
    });

    const text = assembleRes.content[0].text;
    expect(text).toContain('Assembled Agent Context');
    expect(text).toContain('<fastr_context');
    expect(text).toContain('Always Check JWT Exp Seconds');
    expect(text).toContain('</fastr_context>');
  });

  it('predicts file failure risk base-rate via fastr_risk_predict', async () => {
    // 1. Seed a trap linked to file
    await callTool('fastr_remember', {
      title: 'Active Trap for JWT',
      content: 'Never use weak secret for JWT signature.',
      module: 'auth',
      kind: 'error_trap',
      files: ['src/auth/jwt.ts']
    });

    // 2. Predict risk on file with active trap
    const predictRes = await callTool('fastr_risk_predict', {
      targetFiles: ['src/auth/jwt.ts']
    });

    const text = predictRes.content[0].text;
    expect(text).toContain('Predictive Failure Base-Rate Analysis');
    expect(text).toContain('Risk Level');
    expect(text).toContain('**Active Error Traps**: 1');
  });

  it('compresses markdown content via fastr_compress', async () => {
    const md = '# Title\n\nBasically this is a test.\n\nhttps://example.com\n\n```ts\nconst x = 1;\n```';
    const res = await callTool('fastr_compress', { content: md });
    const text = res.content[0].text;
    expect(text).toContain('Fastr Compression Summary');
    expect(text).toContain('Token Savings');
    expect(text).toContain('# Title');
  });

  it('runs database health diagnostics and self-healing via fastr_diagnose and fastr_heal', async () => {
    const diagRes = await callTool('fastr_diagnose', {});
    const diagText = diagRes.content[0].text;
    expect(diagText).toContain('FastrMemory Database Health Diagnostic');
    expect(diagText).toContain('Overall Status');

    const healRes = await callTool('fastr_heal', { dryRun: true });
    const healText = healRes.content[0].text;
    expect(healText).toContain('FastrMemory Self-Healing Doctor');
    expect(healText).toContain('DRY RUN');
  });

  it('tags and searches visual screenshots via fastr_vision_tag and fastr_vision_search', async () => {
    // Vision assets must exist inside the project root
    const screenshot = path.join(testDir, 'screenshots', 'login-error.png');
    fs.mkdirSync(path.dirname(screenshot), { recursive: true });
    fs.writeFileSync(screenshot, 'png');

    const tagRes = await callTool('fastr_vision_tag', {
      filePath: screenshot,
      description: 'Modal dialog showing HTTP 401 Unauthorized alert on login',
      ocrText: 'HTTP 401 Unauthorized'
    });
    const tagText = tagRes.content[0].text;
    expect(tagText).toContain('Multimodal Vision Asset Tagged');
    expect(tagText).toContain('Vector Indexing');

    const searchRes = await callTool('fastr_vision_search', {
      query: 'modal error login 401'
    });
    const searchText = searchRes.content[0].text;
    expect(searchText).toContain('Visual Search Results');
    expect(searchText).toContain('login-error.png');
  });
});


