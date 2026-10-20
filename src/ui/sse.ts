import type { ServerResponse } from 'node:http';

export interface SseEvent {
  type: string;
  data: Record<string, any>;
  timestamp: string;
}

export class SseBroadcaster {
  private clients = new Set<ServerResponse>();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, 15000);
    this.heartbeatInterval.unref();
  }

  addClient(res: ServerResponse): void {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    res.write(`: connected\n\n`);
    this.clients.add(res);

    res.on('close', () => {
      this.clients.delete(res);
    });
  }

  broadcast(eventType: string, data: Record<string, any> = {}): void {
    const payload = `event: ${eventType}\ndata: ${JSON.stringify({ ...data, _ts: new Date().toISOString() })}\n\n`;
    for (const client of this.clients) {
      try {
        client.write(payload);
      } catch {
        this.clients.delete(client);
      }
    }
  }

  private sendHeartbeat(): void {
    for (const client of this.clients) {
      try {
        client.write(`: heartbeat ${Date.now()}\n\n`);
      } catch {
        this.clients.delete(client);
      }
    }
  }

  getClientCount(): number {
    return this.clients.size;
  }

  close(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    for (const client of this.clients) {
      try {
        client.end();
      } catch {}
    }
    this.clients.clear();
  }
}

export const globalBroadcaster = new SseBroadcaster();
