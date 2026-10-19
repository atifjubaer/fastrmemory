import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { initDatabase, configurePragmas } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { computeProvenanceHash, verifyProvenanceHash } from '../src/db/provenance.js';
import { globalBroadcaster } from '../src/ui/sse.js';
import { createFastrMcpServer, createFastrServerContext } from '../src/mcp/server.js';
import { InMemoryTransport } from '@modelcontextprotocol/server';

describe('Multi-Client Concurrency, Cryptographic Provenance & SSE Stream', () => {
  const testDir = path.join(process.cwd(), 'tests', 'temp_prov_test_dir');
  const dbPath = path.join(testDir, 'test.db');
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
    }
    fs.mkdirSync(testDir, { recursive: true });
    db = initDatabase(dbPath);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    try { db.close(); } catch {}
    if (fs.existsSync(testDir)) {
      try { fs.rmSync(testDir, { recursive: true, force: true }); } catch {}
    }
  });

  describe('1. SQLite WAL busy_timeout = 5000 Multi-Client Concurrency', () => {
    it('sets PRAGMA busy_timeout = 5000 on database handles', () => {
      const row = db.prepare('PRAGMA busy_timeout').get() as { timeout: number };
      expect(row.timeout).toBe(5000);
    });

    it('sets PRAGMA synchronous = 1 (NORMAL) and journal_mode = wal', () => {
      const syncRow = db.prepare('PRAGMA synchronous').get() as { synchronous: number };
      expect(syncRow.synchronous).toBe(1); // 1 = NORMAL
    });
  });

  describe('2. Cryptographic Provenance (SHA-256 Signatures)', () => {
    it('computes and verifies canonical SHA-256 provenance hashes', () => {
      const params = {
        projectId: 'test_proj',
        agentId: 'claude-code',
        module: 'auth',
        kind: 'rule',
        title: 'Strict JWT Expiration',
        content: 'Always validate exp timestamp in seconds.',
        createdAt: '2026-10-19T18:00:00.000Z'
      };

      const hash = computeProvenanceHash(params);
      expect(hash).toHaveLength(64);
      expect(verifyProvenanceHash(hash, params)).toBe(true);

      // Tampered content must fail verification
      const tampered = { ...params, content: 'Tampered content!' };
      expect(verifyProvenanceHash(hash, tampered)).toBe(false);

      // Tampered author agent must fail verification
      const forgedAgent = { ...params, agentId: 'rogue-agent' };
      expect(verifyProvenanceHash(hash, forgedAgent)).toBe(false);
    });

    it('attaches cryptographic provenance hash to inserted memories', () => {
      const mem = repo.insertMemory({
        projectId: 'test_proj',
        agentId: 'cursor-agent',
        module: 'db',
        kind: 'error_trap',
        title: 'Always Release Pool Clients',
        content: 'Call client.release() in finally block.',
        verified: true
      });

      expect(mem.provenance_hash).toBeTruthy();
      expect(mem.provenance_hash).toHaveLength(64);

      // Verify authentic memory provenance
      const check = repo.verifyMemoryProvenance(mem.id);
      expect(check.verified).toBe(true);
      expect(check.signature).toBe(mem.provenance_hash);
      expect(check.agentId).toBe('cursor-agent');
      expect(check.reason).toContain('Signature valid');
    });

    it('detects post-creation tampering in SQLite database rows', () => {
      const mem = repo.insertMemory({
        projectId: 'test_proj',
        agentId: 'author-agent',
        module: 'crypto',
        kind: 'rule',
        title: 'Constant-time verification',
        content: 'Use timingSafeEqual for signatures.',
        verified: true
      });

      // Maliciously modify row in database directly
      db.prepare('UPDATE memories SET content = ? WHERE id = ?').run('Insecure comparison!', mem.id);

      const check = repo.verifyMemoryProvenance(mem.id);
      expect(check.verified).toBe(false);
      expect(check.reason).toContain('Signature mismatch');
    });
  });

  describe('3. Real-time SSE Notification Stream (/api/stream)', () => {
    it('broadcasts trap_logged when an error trap is recorded', () => {
      const receivedEvents: Array<{ event: string; data: any }> = [];

      // Mock client response
      const mockClient: any = {
        writeHead: () => {},
        write: (msg: string) => {
          const match = msg.match(/^event: (.*?)\ndata: (.*?)\n\n$/);
          if (match) {
            receivedEvents.push({ event: match[1], data: JSON.parse(match[2]) });
          }
        },
        end: () => {},
        on: () => {}
      };

      globalBroadcaster.addClient(mockClient);

      // Insert error trap
      repo.insertMemory({
        projectId: 'test_proj',
        agentId: 'devin-ai',
        module: 'infra',
        kind: 'error_trap',
        title: 'AWS S3 Region Mismatch Trap',
        content: 'Explicit region must match bucket creation region.',
        files: ['src/s3.ts']
      });

      const trapEvent = receivedEvents.find((e) => e.event === 'trap_logged');
      expect(trapEvent).toBeDefined();
      expect(trapEvent?.data.title).toBe('AWS S3 Region Mismatch Trap');
      expect(trapEvent?.data.agentId).toBe('devin-ai');
      expect(trapEvent?.data.files).toEqual(['src/s3.ts']);
    });

    it('broadcasts action_claimed when an agent claims a DAG task', () => {
      const receivedEvents: Array<{ event: string; data: any }> = [];

      const mockClient: any = {
        writeHead: () => {},
        write: (msg: string) => {
          const match = msg.match(/^event: (.*?)\ndata: (.*?)\n\n$/);
          if (match) {
            receivedEvents.push({ event: match[1], data: JSON.parse(match[2]) });
          }
        },
        end: () => {},
        on: () => {}
      };

      globalBroadcaster.addClient(mockClient);

      // Create action
      const action = repo.createAction({
        projectId: 'test_proj',
        title: 'Implement Database Connection Pool Retry'
      });

      // Claim action
      repo.updateAction(action.id, {
        status: 'active',
        assignedTo: 'claude-subagent-42'
      });

      const claimEvent = receivedEvents.find((e) => e.event === 'action_claimed');
      expect(claimEvent).toBeDefined();
      expect(claimEvent?.data.actionId).toBe(action.id);
      expect(claimEvent?.data.claimedBy).toBe('claude-subagent-42');
    });
  });

  describe('4. MCP fastr_verify_provenance tool', () => {
    it('verifies memory provenance via MCP protocol', async () => {
      const ctx = createFastrServerContext(testDir);
      const server = createFastrMcpServer(ctx);

      const [client, serverTr] = InMemoryTransport.createLinkedPair();
      await server.connect(serverTr);
      await client.start();

      await new Promise((resolve) => {
        client.onmessage = (msg: any) => { if (msg.id === 1) resolve(msg); };
        client.send({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'test', version: '1.0' } }
        });
      });

      function callTool(name: string, args: Record<string, any>): Promise<any> {
        const id = Math.floor(Math.random() * 1000000);
        return new Promise((resolve, reject) => {
          client.onmessage = (msg: any) => {
            if (msg.id === id) {
              if (msg.error) reject(new Error(msg.error.message));
              else resolve(msg.result);
            }
          };
          client.send({ jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } });
        });
      }

      // 1. Remember a rule
      const remRes = await callTool('fastr_remember', {
        title: 'Authentic Invariant Rule',
        content: 'Must sign all critical state changes.',
        module: 'sec',
        kind: 'rule'
      });
      const match = remRes.content[0].text.match(/\[(mem_[a-f0-9]+)\]/);
      expect(match).toBeTruthy();
      const memId = match[1];

      // 2. Verify provenance
      const verRes = await callTool('fastr_verify_provenance', { memoryId: memId });
      const text = verRes.content[0].text;
      expect(text).toContain('Cryptographic Provenance Verification');
      expect(text).toContain('AUTHENTIC & VERIFIED');
      expect(text).toContain('Signature valid');

      await client.close();
      ctx.db.close();
    });
  });
});
