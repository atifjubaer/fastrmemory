import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import {
  extractImports,
  extractCallReferences,
  extractSymbols
} from '../src/code/symbol-extractor.js';
import {
  indexFileSymbols,
  indexProjectSymbols,
  indexFile,
  ensureProjectIndexed,
  isIndexableProjectRoot,
  countCodeEdges,
  getCallersForSymbols,
  getCalleesForSymbols,
  getGodNodes
} from '../src/code/indexer.js';

const PROJECT_ID = 'proj_code_graph_test';

describe('Code Graph & Relation Extraction', () => {
  let tempDir: string;
  let db: DatabaseSync;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-codegraph-'));
    db = initDatabase(path.join(tempDir, 'test.db'));
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('Import Extraction', () => {
    it('extracts TypeScript/JavaScript static, dynamic, and require imports', () => {
      const code = `
        import { signToken } from './auth.js';
        import * as db from '../db/repo.js';
        const config = require('./config.json');
        export { verifyToken } from './verify.js';
        import 'reflect-metadata';
      `;
      const imports = extractImports(code, 'src/api/login.ts');
      expect(imports).toContain('src/api/auth.js');
      expect(imports).toContain('src/db/repo.js');
      expect(imports).toContain('src/api/config.json');
      expect(imports).toContain('src/api/verify.js');
      expect(imports).toContain('reflect-metadata');
    });

    it('extracts Python imports and from-imports', () => {
      const code = `
        import os, sys
        from .utils import helper
        from core.db import get_session
      `;
      const imports = extractImports(code, 'pkg/service.py');
      expect(imports).toContain('os');
      expect(imports).toContain('sys');
      expect(imports).toContain('.utils');
      expect(imports).toContain('core.db');
    });

    it('extracts Go imports', () => {
      const code = `
        package main
        import "fmt"
        import (
          "net/http"
          "github.com/fastr/auth"
        )
      `;
      const imports = extractImports(code, 'cmd/main.go');
      expect(imports).toContain('fmt');
      expect(imports).toContain('net/http');
      expect(imports).toContain('github.com/fastr/auth');
    });

    it('extracts Rust use declarations', () => {
      const code = `
        use std::collections::HashMap;
        pub use crate::auth::sign_token;
      `;
      const imports = extractImports(code, 'src/main.rs');
      expect(imports).toContain('std::collections::HashMap');
      expect(imports).toContain('crate::auth::sign_token');
    });
  });

  describe('Call Reference Extraction', () => {
    it('detects calls to known symbols and ignores self-calls', () => {
      const known = new Set(['signToken', 'hashPassword', 'validateUser', 'otherFunc']);
      const body = `
        function loginUser(email, pass) {
          const valid = validateUser(email);
          const hash = hashPassword(pass);
          const token = signToken(valid.id);
          return loginUser(token); // recursive call should be excluded
        }
      `;
      const calls = extractCallReferences(body, known, 'loginUser');
      expect(calls).toContain('validateUser');
      expect(calls).toContain('hashPassword');
      expect(calls).toContain('signToken');
      expect(calls).not.toContain('loginUser');
      expect(calls).not.toContain('otherFunc');
    });
  });

  describe('Full Project Code Graph Indexing', () => {
    it('indexes files, links caller-callee edges, and computes in-degrees', () => {
      // Create a mock multi-file project
      const srcDir = path.join(tempDir, 'src');
      fs.mkdirSync(srcDir, { recursive: true });

      fs.writeFileSync(
        path.join(srcDir, 'jwt.ts'),
        `
        export function signToken(userId: string): string {
          return "jwt_" + userId;
        }
        `,
        'utf8'
      );

      fs.writeFileSync(
        path.join(srcDir, 'auth.ts'),
        `
        import { signToken } from './jwt.ts';
        export function authenticate(user: string): string {
          return signToken(user);
        }
        `,
        'utf8'
      );

      fs.writeFileSync(
        path.join(srcDir, 'api.ts'),
        `
        import { authenticate } from './auth.ts';
        import { signToken } from './jwt.ts';
        export function handleLogin(req: any): any {
          const auth = authenticate(req.user);
          return { token: auth };
        }
        export function handleRefresh(req: any): any {
          return signToken(req.id);
        }
        `,
        'utf8'
      );

      // Run project indexing
      const res = indexProjectSymbols(db, PROJECT_ID, tempDir, {
        files: ['src/jwt.ts', 'src/auth.ts', 'src/api.ts']
      });

      expect(res.files).toBe(3);
      expect(res.symbols).toBe(4); // signToken, authenticate, handleLogin, handleRefresh
      expect(res.callEdges).toBeGreaterThanOrEqual(3);
      expect(res.importEdges).toBeGreaterThanOrEqual(3);

      const edgeCounts = countCodeEdges(db, PROJECT_ID);
      expect(edgeCounts.calls).toBeGreaterThanOrEqual(3);
      expect(edgeCounts.imports).toBeGreaterThanOrEqual(3);

      // Verify signToken is called by authenticate and handleRefresh
      const signTokenSym = db.prepare(
        "SELECT id FROM symbols WHERE project_id = ? AND name = 'signToken'"
      ).get(PROJECT_ID) as any;
      expect(signTokenSym).toBeDefined();

      const callers = getCallersForSymbols(db, PROJECT_ID, [signTokenSym.id]);
      expect(callers.length).toBeGreaterThanOrEqual(2);
      const callerNames = callers.map((c) => c.callerName);
      expect(callerNames).toContain('authenticate');
      expect(callerNames).toContain('handleRefresh');

      // Verify God-Nodes ranking: signToken has the highest in-degree (called by multiple functions)
      const godNodes = getGodNodes(db, PROJECT_ID, 5);
      expect(godNodes.length).toBeGreaterThan(0);
      expect(godNodes[0].name).toBe('signToken');
      expect(godNodes[0].inDegree).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Incremental indexing', () => {
    it('re-indexes one file and preserves edges in the other files', () => {
      const srcDir = path.join(tempDir, 'src');
      fs.mkdirSync(srcDir, { recursive: true });
      fs.writeFileSync(
        path.join(srcDir, 'jwt.ts'),
        `
        export function signToken(user: string): string { return user; }
        export function verifyToken(token: string): string { return token; }
        `,
        'utf8'
      );
      fs.writeFileSync(
        path.join(srcDir, 'auth.ts'),
        `
        import { signToken } from './jwt.ts';
        export function authenticate(user: string): string { return signToken(user); }
        `,
        'utf8'
      );
      fs.writeFileSync(
        path.join(srcDir, 'api.ts'),
        `
        import { authenticate } from './auth.ts';
        export function handleLogin(req: any): any { return authenticate(req.user); }
        `,
        'utf8'
      );

      indexProjectSymbols(db, PROJECT_ID, tempDir, {
        files: ['src/jwt.ts', 'src/auth.ts', 'src/api.ts']
      });
      const before = countCodeEdges(db, PROJECT_ID).calls;
      expect(before).toBeGreaterThanOrEqual(2);

      // api.ts now also calls verifyToken from jwt.ts.
      fs.writeFileSync(
        path.join(srcDir, 'api.ts'),
        `
        import { authenticate } from './auth.ts';
        import { verifyToken } from './jwt.ts';
        export function handleLogin(req: any): any {
          verifyToken(req.token);
          return authenticate(req.user);
        }
        `,
        'utf8'
      );

      const res = indexFile(db, PROJECT_ID, tempDir, 'src/api.ts');
      expect(res.indexed).toBe(true);

      const verifySym = db
        .prepare("SELECT id FROM symbols WHERE project_id = ? AND name = 'verifyToken'")
        .get(PROJECT_ID) as any;
      const callers = getCallersForSymbols(db, PROJECT_ID, [verifySym.id]);
      expect(callers.map((c) => c.callerName)).toContain('handleLogin');

      // The auth.ts -> signToken edge survived the one-file rebuild.
      expect(countCodeEdges(db, PROJECT_ID).calls).toBeGreaterThanOrEqual(before);
    });

    it('builds the graph once with ensureProjectIndexed and then no-ops', () => {
      fs.writeFileSync(path.join(tempDir, 'package.json'), '{"name":"fixture"}', 'utf8');
      fs.writeFileSync(path.join(tempDir, 'index.ts'), 'export function boot(): number { return 1; }\n', 'utf8');

      expect(isIndexableProjectRoot(tempDir)).toBe(true);
      const first = ensureProjectIndexed(db, PROJECT_ID, tempDir);
      expect(first.indexed).toBe(true);
      expect(first.symbols).toBeGreaterThan(0);

      const second = ensureProjectIndexed(db, PROJECT_ID, tempDir);
      expect(second.indexed).toBe(false);
    });

    it('refuses to auto-index the home directory', () => {
      expect(isIndexableProjectRoot(os.homedir())).toBe(false);
    });
  });
});
