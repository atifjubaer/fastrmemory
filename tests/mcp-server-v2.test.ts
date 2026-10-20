import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InMemoryTransport } from '@modelcontextprotocol/server';
import { createFastrMcpServer, createFastrServerContext, encodeListCursor, decodeListCursor } from '../src/mcp/server.js';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('MCP server hardening (errors, bounds, annotations, new tools, prompts)', () => {
  const testDir = path.join(process.cwd(), 'tests', 'temp_mcp_v2_test_dir');
  let ctx: any;
  let server: any;
  let transport: any;
  let nextId = 1;
  const pending = new Map<number, (msg: any) => void>();

  function rpc(method: string, params: Record<string, any> = {}): Promise<any> {
    const id = nextId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      transport.send({ jsonrpc: '2.0', id, method, params });
    });
  }

  async function call(name: string, args: Record<string, any> = {}): Promise<any> {
    const msg = await rpc('tools/call', { name, arguments: args });
    return msg.result;
  }

  function text(res: any): string {
    return res.content.map((c: any) => c.text).join('\n');
  }

  async function remember(overrides: Record<string, any> = {}): Promise<string> {
    const res = await call('fastr_remember', {
      module: 'auth',
      kind: 'rule',
      title: 'Use RS256',
      content: 'Always sign tokens with RS256.',
      files: ['src/auth/jwt.ts'],
      verified: true,
      ...overrides
    });
    expect(res.isError).toBeFalsy();
    const m = text(res).match(/\[(mem_[a-f0-9]+)\]/);
    expect(m).toBeTruthy();
    return m![1];
  }

  beforeEach(async () => {
    if (fs.existsSync(testDir)) {
      try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
    }
    fs.mkdirSync(testDir, { recursive: true });

    ctx = createFastrServerContext(testDir);
    server = createFastrMcpServer(ctx);

    const [client, serverTr] = InMemoryTransport.createLinkedPair();
    transport = client;
    transport.onmessage = (msg: any) => {
      const resolve = pending.get(msg.id);
      if (resolve) {
        pending.delete(msg.id);
        resolve(msg);
      }
    };
    await server.connect(serverTr);
    await transport.start();

    await rpc('initialize', {
      protocolVersion: '2025-03-26',
      capabilities: {},
      clientInfo: { name: 'test-runner', version: '1.0.0' }
    });
  });

  afterEach(async () => {
    try { await transport?.close(); } catch {}
    try { ctx?.db?.close(); } catch {}
    if (fs.existsSync(testDir)) {
      try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
    }
  });

  it('advertises annotations with correct hints', async () => {
    const res = (await rpc('tools/list')).result;
    const byName = Object.fromEntries(res.tools.map((t: any) => [t.name, t]));
    for (const ro of ['fastr_recall', 'fastr_get', 'fastr_list', 'fastr_status', 'fastr_diagnose', 'fastr_assemble']) {
      expect(byName[ro].annotations.readOnlyHint, ro).toBe(true);
    }
    for (const d of ['fastr_heal', 'fastr_rollback', 'fastr_compress', 'fastr_obsidian_export', 'fastr_federate', 'fastr_supersede', 'fastr_resolve', 'fastr_forget']) {
      expect(byName[d].annotations.destructiveHint, d).toBe(true);
    }
    expect(byName.fastr_pin.annotations.idempotentHint).toBe(true);
    expect(byName.fastr_remember.annotations.destructiveHint).toBe(false);
    // Inputs are published as JSON Schema objects with bounds.
    expect(byName.fastr_timeline.inputSchema.properties.limit.maximum).toBe(200);
  });

  it('rejects out-of-range numeric and oversized string inputs', async () => {
    expect((await call('fastr_timeline', { limit: -1 })).isError).toBe(true);
    expect((await call('fastr_timeline', { limit: 1.5 })).isError).toBe(true);
    expect((await call('fastr_recall', { query: 'x', budgetTokens: 10 })).isError).toBe(true);
    expect((await call('fastr_graph_query', { depth: 5 })).isError).toBe(true);
    expect((await call('fastr_slot_set', { slotKey: 'k', content: 'x', sizeLimit: 1_000_000 })).isError).toBe(true);
    expect((await call('fastr_vision_search', { query: 'x', limit: 0 })).isError).toBe(true);
    expect((await call('fastr_remember', { kind: 'rule', title: 'x'.repeat(301), content: 'c' })).isError).toBe(true);
    expect((await call('fastr_remember', { kind: 'rule', title: 't', content: 'c'.repeat(20_001) })).isError).toBe(true);
    expect((await call('fastr_file_history', { filePath: 'a'.repeat(1025) })).isError).toBe(true);
    expect((await call('fastr_list', { limit: 201 })).isError).toBe(true);
  });

  it('returns isError on every handled failure path', async () => {
    const memId = await remember();

    expect((await call('fastr_resolve', { conflictId: 9999, keepId: memId })).isError).toBe(true);
    expect((await call('fastr_predict', { action: 'close' })).isError).toBe(true);
    expect((await call('fastr_predict', { action: 'close', predictionId: 9999, actualValue: 1 })).isError).toBe(true);
    expect((await call('fastr_predict', { action: 'create' })).isError).toBe(true);
    expect((await call('fastr_action_update', { id: 'act_missing', status: 'done' })).isError).toBe(true);
    expect((await call('fastr_slot_set', { slotKey: 'k', content: 'x'.repeat(50), sizeLimit: 10 })).isError).toBe(true);
    expect((await call('fastr_federate', { action: 'attach' })).isError).toBe(true);
    expect((await call('fastr_compress', {})).isError).toBe(true);
    expect((await call('fastr_feedback', { memoryId: 'mem_missing', outcome: 'good' })).isError).toBe(true);
    expect((await call('fastr_verify_provenance', { memoryId: 'mem_missing' })).isError).toBe(true);
    expect((await call('fastr_supersede', { oldMemoryId: 'mem_missing', newTitle: 't', newContent: 'c', reason: 'r' })).isError).toBe(true);
    expect((await call('fastr_rollback', { snapshotId: 'snap_missing' })).isError).toBe(true);
    expect((await call('fastr_drill', {})).isError).toBe(true);

    // Successful calls are not flagged.
    expect((await call('fastr_feedback', { memoryId: memId, outcome: 'good', note: 'saved me an hour' })).isError).toBeFalsy();
  });

  it('includes the feedback note in the response', async () => {
    const memId = await remember();
    const res = await call('fastr_feedback', { memoryId: memId, outcome: 'good', note: 'saved me an hour' });
    expect(text(res)).toContain('saved me an hour');
  });

  it('fastr_get returns full detail and errors on unknown ids', async () => {
    const memId = await remember();
    const res = await call('fastr_get', { id: memId });
    expect(res.isError).toBeFalsy();
    const detail = JSON.parse(text(res));
    expect(detail.id).toBe(memId);
    expect(detail.content).toBe('Always sign tokens with RS256.');
    expect(detail.files).toContain('src/auth/jwt.ts');
    expect(detail.status).toBe('verified');
    expect(detail.valid_from).toBeTruthy();
    expect(detail.valid_to).toBeNull();
    expect(detail).toHaveProperty('superseded_by', null);

    expect((await call('fastr_get', { id: 'mem_nope' })).isError).toBe(true);
  });

  it('fastr_list filters and paginates with an opaque cursor', async () => {
    const ids: string[] = [];
    for (let i = 0; i < 5; i++) {
      ids.push(await remember({ title: `Rule ${i}`, module: i < 3 ? 'auth' : 'db' }));
    }
    await remember({ kind: 'error_trap', title: 'Trap', module: 'auth' });

    const p1 = JSON.parse(text(await call('fastr_list', { limit: 2 })));
    expect(p1.items).toHaveLength(2);
    expect(p1.nextCursor).toBeTruthy();
    expect(Object.keys(p1.items[0]).sort()).toEqual(['id', 'kind', 'module', 'reward_score', 'status', 'title']);

    const seen = new Set<string>(p1.items.map((i: any) => i.id));
    let cursor = p1.nextCursor;
    while (cursor) {
      const page = JSON.parse(text(await call('fastr_list', { limit: 2, cursor })));
      for (const it of page.items) {
        expect(seen.has(it.id)).toBe(false);
        seen.add(it.id);
      }
      cursor = page.nextCursor;
    }
    expect(seen.size).toBe(6);

    const db = JSON.parse(text(await call('fastr_list', { module: 'db' })));
    expect(db.items).toHaveLength(2);
    expect(db.nextCursor).toBeNull();

    const traps = JSON.parse(text(await call('fastr_list', { kind: 'error_trap' })));
    expect(traps.items.map((i: any) => i.title)).toEqual(['Trap']);

    expect((await call('fastr_list', { cursor: '!!notacursor' })).isError).toBe(true);
  });

  it('cursor helpers round-trip', () => {
    const c = encodeListCursor('2026-01-01T00:00:00.000Z', 'mem_abc');
    expect(decodeListCursor(c)).toEqual({ createdAt: '2026-01-01T00:00:00.000Z', id: 'mem_abc' });
    expect(decodeListCursor('garbage')).toBeNull();
  });

  it('fastr_forget retires a memory and fastr_pin toggles pinning', async () => {
    const memId = await remember();

    const pinRes = await call('fastr_pin', { id: memId, pinned: true });
    expect(pinRes.isError).toBeFalsy();
    expect(JSON.parse(text(await call('fastr_get', { id: memId }))).pinned).toBe(true);
    await call('fastr_pin', { id: memId, pinned: false });
    expect(JSON.parse(text(await call('fastr_get', { id: memId }))).pinned).toBe(false);
    expect((await call('fastr_pin', { id: 'mem_missing', pinned: true })).isError).toBe(true);

    const forgetRes = await call('fastr_forget', { id: memId, reason: 'obsolete' });
    expect(forgetRes.isError).toBeFalsy();
    const detail = JSON.parse(text(await call('fastr_get', { id: memId })));
    expect(detail.status).toBe('superseded');
    expect(detail.valid_to).toBeTruthy();
    expect(detail.superseded_reason).toBe('obsolete');

    const active = JSON.parse(text(await call('fastr_list', {})));
    expect(active.items.map((i: any) => i.id)).not.toContain(memId);
    const superseded = JSON.parse(text(await call('fastr_list', { status: 'superseded' })));
    expect(superseded.items.map((i: any) => i.id)).toContain(memId);

    expect((await call('fastr_forget', { id: 'mem_missing' })).isError).toBe(true);
  });

  it('fastr_trap_log succeeds with a warning when the markdown mirror fails', async () => {
    const pagesPath = path.join(testDir, '.fastr', 'pages');
    fs.rmSync(pagesPath, { recursive: true, force: true });
    fs.writeFileSync(pagesPath, 'not a directory');

    const res = await call('fastr_trap_log', {
      title: 'Mirror trap',
      content: 'Something broke',
      files: ['src/a.ts'],
      module: 'core'
    });
    expect(res.isError).toBeFalsy();
    expect(text(res)).toContain('Logged Error Trap');
    expect(text(res)).toContain('Warning');

    const traps = JSON.parse(text(await call('fastr_list', { kind: 'error_trap' })));
    expect(traps.items).toHaveLength(1);
  });

  it('labels dormant memories correctly in the timeline', async () => {
    const memId = await remember();
    ctx.db.prepare(`UPDATE memories SET status = 'dormant' WHERE id = ?`).run(memId);
    const res = await call('fastr_timeline', {});
    expect(text(res)).toContain('DORMANT');
    expect(text(res)).not.toContain('STAGING');
  });

  it('fastr_frontier honours its status filter', async () => {
    await call('fastr_action_create', { title: 'Task A', priority: 5 });
    await call('fastr_action_create', { title: 'Task B', priority: 4 });
    await call('fastr_next', { agentId: 'agent-1' }); // claims Task A -> active

    const active = text(await call('fastr_frontier', { status: 'active' }));
    expect(active).toContain('Task A');
    expect(active).not.toContain('Task B');

    const pendingOnly = text(await call('fastr_frontier', { status: 'pending' }));
    expect(pendingOnly).toContain('Task B');
    expect(pendingOnly).not.toContain('Task A');
  });

  it('fastr_diagnose filters issues by category', async () => {
    const res = await call('fastr_diagnose', { category: 'fts5' });
    expect(res.isError).toBeFalsy();
    expect(text(res)).toContain('category: fts5');
    expect(text(res)).not.toMatch(/\[(INTEGRITY|FILE_LINKS|ACTIONS|STORAGE)\]/);
    expect((await call('fastr_diagnose', { category: 'bogus' })).isError).toBe(true);
  });

  it('overview resource reports the trap count, not the active count', async () => {
    await remember();
    await remember({ title: 'Rule 2' });
    await call('fastr_trap_log', { title: 'Trap 1', content: 'boom', files: ['src/x.ts'] });

    const msg = await rpc('resources/read', { uri: 'fastr://project/overview' });
    const overview = msg.result.contents[0].text;
    expect(overview).toContain('Traps: 1');
    expect(overview).toContain('Active rules: 3');
  });

  it('serves fastr://memory/{id} via resource template', async () => {
    const memId = await remember();
    const templates = (await rpc('resources/templates/list')).result.resourceTemplates;
    expect(templates.map((t: any) => t.uriTemplate)).toContain('fastr://memory/{id}');

    const msg = await rpc('resources/read', { uri: `fastr://memory/${memId}` });
    const detail = JSON.parse(msg.result.contents[0].text);
    expect(detail.id).toBe(memId);
    expect(detail.files).toContain('src/auth/jwt.ts');

    const missing = await rpc('resources/read', { uri: 'fastr://memory/mem_missing' });
    expect(missing.error).toBeDefined();
  });

  it('serves fastr://memory/{id}/envelope with metadata, provenance, links, and conflict state', async () => {
    const event = ctx.repo.insertRawEvent({
      id: 'evt_envelope',
      project_id: ctx.config.projectId,
      session_id: 'sess_envelope',
      agent_id: 'default',
      event_type: 'tool_use',
      tool_name: 'edit',
      file_path: 'src/auth/jwt.ts',
      raw_payload: '{"source":"test"}'
    });
    const mem = ctx.repo.insertMemory({
      projectId: ctx.config.projectId,
      module: 'auth',
      kind: 'rule',
      title: 'Use RS256',
      content: 'Always sign tokens with RS256.',
      files: ['src/auth/jwt.ts'],
      verified: true,
      sourceEventIds: [event.id]
    });
    const other = ctx.repo.insertMemory({
      projectId: ctx.config.projectId,
      module: 'auth',
      kind: 'rule',
      title: 'Use HS256',
      content: 'Always sign tokens with HS256.',
      verified: true
    });
    ctx.db.prepare(`
      INSERT INTO memory_conflicts (project_id, memory_a_id, memory_b_id, reason, score)
      VALUES (?, ?, ?, ?, ?)
    `).run(ctx.config.projectId, mem.id, other.id, 'Conflicting signing algorithms', 0.93);
    ctx.db.prepare(`
      INSERT INTO graph_edges (id, project_id, source_id, target_id, edge_type, weight)
      VALUES (?, ?, ?, ?, 'association', ?)
    `).run('edge_envelope', ctx.config.projectId, mem.id, 'ent_envelope', 0.8);

    const templates = (await rpc('resources/templates/list')).result.resourceTemplates;
    expect(templates.map((t: any) => t.uriTemplate)).toContain('fastr://memory/{id}/envelope');

    const msg = await rpc('resources/read', { uri: `fastr://memory/${mem.id}/envelope` });
    expect(msg.error).toBeUndefined();
    const envelope = JSON.parse(msg.result.contents[0].text);
    expect(envelope.metadata.title).toBe('Use RS256');
    expect(envelope.metadata.content).toContain('RS256');
    expect(envelope.metadata.is_active).toBe(true);
    expect(envelope.provenance.verified).toBe(true);
    expect(envelope.provenance.source_event_ids).toEqual([event.id]);
    expect(envelope.provenance.source_events[0].id).toBe(event.id);
    expect(envelope.links.files).toContain('src/auth/jwt.ts');
    expect(envelope.links.graph.find((edge: any) => edge.id === 'edge_envelope')).toMatchObject({
      direction: 'outgoing',
      edge_type: 'association'
    });
    expect(envelope.conflicts.open_count).toBeGreaterThanOrEqual(1);
    const conflict = envelope.conflicts.open.find((entry: any) => entry.other_memory_id === other.id);
    expect(conflict?.reason).toBe('Conflicting signing algorithms');

    const missing = await rpc('resources/read', { uri: 'fastr://memory/mem_missing/envelope' });
    expect(missing.error).toBeDefined();
  });

  it('registers pre-edit-check and session-wrap-up prompts', async () => {
    const list = (await rpc('prompts/list')).result.prompts;
    const names = list.map((p: any) => p.name);
    expect(names).toEqual(expect.arrayContaining(['pre-edit-check', 'session-wrap-up']));
    const pre = list.find((p: any) => p.name === 'pre-edit-check');
    expect(pre.arguments.map((a: any) => a.name)).toEqual(['files']);

    const got = (await rpc('prompts/get', { name: 'pre-edit-check', arguments: { files: 'src/a.ts, src/b.ts' } })).result;
    const body = got.messages[0].content.text;
    expect(body).toContain('fastr_trap_recall');
    expect(body).toContain('fastr_recall');
    expect(body).toContain('["src/a.ts","src/b.ts"]');

    const wrap = (await rpc('prompts/get', { name: 'session-wrap-up' })).result;
    const wrapText = wrap.messages[0].content.text;
    for (const s of ['fastr_trap_log', 'fastr_supersede', 'fastr_feedback', 'fastr_handoff', 'verifyStaging']) {
      expect(wrapText).toContain(s);
    }
  });
});
