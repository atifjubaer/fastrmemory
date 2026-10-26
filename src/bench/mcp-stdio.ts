/**
 * Minimal MCP stdio client.
 *
 * The cross-engine comparison drives every engine over MCP stdio on purpose. Accuracy,
 * ingest cost, and returned-context size are measured through the surface an agent
 * actually uses, not through three unrelated internal APIs that would each need their own
 * adapter assumptions. The only shared contract is JSON-RPC 2.0 over newline-delimited
 * stdio, which is what the MCP stdio transport specifies.
 *
 * Deliberately small: `initialize`, `notifications/initialized`, `tools/call`, `close`.
 * Anything an engine prints to stdout that is not JSON is skipped, because at least one of
 * them writes a banner before the first response.
 */

import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';

export interface McpServerSpec {
  /** Executable, always `node` in this harness. */
  command: string;
  args: string[];
  cwd: string;
  env?: Record<string, string>;
}

export interface McpCallResult {
  /** Concatenated text content blocks. This is the context the agent would receive. */
  text: string;
  /** Raw result object, kept for diagnostics. */
  raw: unknown;
  /** Wall-clock duration of the tools/call round trip, in milliseconds. */
  durationMs: number;
}

interface Pending {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timer: NodeJS.Timeout;
}

export class McpStdioClient {
  private readonly child: ChildProcessWithoutNullStreams;
  private readonly pending = new Map<number, Pending>();
  private buffer = '';
  private nextId = 1;
  private stderr = '';
  private closed = false;
  readonly serverInfo: { name?: string; version?: string };

  private constructor(child: ChildProcessWithoutNullStreams, serverInfo: { name?: string; version?: string }) {
    this.child = child;
    this.serverInfo = serverInfo;
  }

  static async connect(spec: McpServerSpec, options: { initTimeoutMs?: number } = {}): Promise<McpStdioClient> {
    const child = spawn(spec.command, spec.args, {
      cwd: spec.cwd,
      env: { ...process.env, ...spec.env },
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true
    });

    const client = new McpStdioClient(child, {});
    client.attach();

    const result = (await client.request(
      'initialize',
      {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'fastrmemory-bench', version: '1.0.0' }
      },
      options.initTimeoutMs ?? 120_000
    )) as { serverInfo?: { name?: string; version?: string } };

    client.serverInfo.name = result?.serverInfo?.name;
    client.serverInfo.version = result?.serverInfo?.version;
    client.notify('notifications/initialized', {});
    return client;
  }

  private attach(): void {
    this.child.stdout.setEncoding('utf8');
    this.child.stderr.setEncoding('utf8');
    this.child.stderr.on('data', (chunk: string) => {
      // Keep the tail only; some engines log every write.
      this.stderr = (this.stderr + chunk).slice(-8_000);
    });
    this.child.stdout.on('data', (chunk: string) => {
      this.buffer += chunk;
      let index = this.buffer.indexOf('\n');
      while (index >= 0) {
        const line = this.buffer.slice(0, index).trim();
        this.buffer = this.buffer.slice(index + 1);
        if (line) this.handleLine(line);
        index = this.buffer.indexOf('\n');
      }
    });
    this.child.on('exit', (code) => {
      this.closed = true;
      const error = new Error(`mcp server exited with code ${code}: ${this.stderr.slice(-400)}`);
      for (const [, entry] of this.pending) {
        clearTimeout(entry.timer);
        entry.reject(error);
      }
      this.pending.clear();
    });
  }

  private handleLine(line: string): void {
    let message: { id?: unknown; result?: unknown; error?: unknown };
    try {
      message = JSON.parse(line) as typeof message;
    } catch {
      return;
    }
    if (typeof message.id !== 'number') return;
    const entry = this.pending.get(message.id);
    if (!entry) return;
    this.pending.delete(message.id);
    clearTimeout(entry.timer);
    if (message.error) entry.reject(new Error(JSON.stringify(message.error)));
    else entry.resolve(message.result);
  }

  private notify(method: string, params: unknown): void {
    if (this.closed) return;
    this.child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`);
  }

  private request(method: string, params: unknown, timeoutMs = 60_000): Promise<unknown> {
    if (this.closed) return Promise.reject(new Error('mcp server is closed'));
    const id = this.nextId++;
    return new Promise<unknown>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out after ${timeoutMs} ms`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
    });
  }

  async callTool(name: string, args: Record<string, unknown>, timeoutMs = 120_000): Promise<McpCallResult> {
    const started = performance.now();
    const result = (await this.request('tools/call', { name, arguments: args }, timeoutMs)) as {
      content?: Array<{ type?: string; text?: string }>;
      isError?: boolean;
    };
    const durationMs = performance.now() - started;
    const text = (result?.content ?? [])
      .filter((block) => block?.type === 'text' && typeof block.text === 'string')
      .map((block) => block.text as string)
      .join('\n');
    if (result?.isError) {
      throw new Error(`tool ${name} returned an error: ${text.slice(0, 400)}`);
    }
    return { text, raw: result, durationMs };
  }

  async listTools(timeoutMs = 60_000): Promise<Array<{ name: string; description?: string }>> {
    const result = (await this.request('tools/list', {}, timeoutMs)) as {
      tools?: Array<{ name: string; description?: string }>;
    };
    return result?.tools ?? [];
  }

  async close(graceMs = 2_000): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.child.stdin.end();
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        this.child.kill('SIGKILL');
        resolve();
      }, graceMs);
      this.child.once('exit', () => {
        clearTimeout(timer);
        resolve();
      });
    });
  }
}
