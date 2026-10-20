import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';

/**
 * Two complementary live-update channels:
 *  1. SSE (/api/stream) - instant, but only sees writes made through this dashboard process.
 *  2. Polling /api/version (PRAGMA data_version + counts) - catches writes from other processes
 *     such as the MCP server or the CLI. Polling pauses while the tab is hidden.
 */
export type SseState = 'connecting' | 'live' | 'offline';
export type SyncHealth = 'connecting' | 'live' | 'stale' | 'paused';

interface LiveSyncValue {
  health: SyncHealth;
  sse: SseState;
  lastSyncAt: number | null;
  lastChangeAt: number | null;
  lastError: string | null;
  pollingEnabled: boolean;
  intervalMs: number;
  setPollingEnabled: (v: boolean) => void;
  setIntervalMs: (v: number) => void;
  resync: () => void;
}

const LiveSyncContext = React.createContext<LiveSyncValue | null>(null);

const SSE_EVENTS = [
  'memory_created',
  'memory_updated',
  'trap_logged',
  'conflict_detected',
  'conflict_resolved',
  'action_created',
  'action_claimed',
  'action_completed',
  'action_updated',
  'sync_complete',
];

const STALE_AFTER_MS = 8000;

function readPref<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function writePref(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function LiveSyncProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();
  const [sse, setSse] = React.useState<SseState>('connecting');
  const [lastSyncAt, setLastSyncAt] = React.useState<number | null>(null);
  const [lastChangeAt, setLastChangeAt] = React.useState<number | null>(null);
  const [lastError, setLastError] = React.useState<string | null>(null);
  const [hidden, setHidden] = React.useState(() => document.hidden);
  const [pollingEnabled, setPollingEnabledState] = React.useState<boolean>(() => readPref('fastr-live-polling', true));
  const [intervalMs, setIntervalState] = React.useState<number>(() => readPref('fastr-live-interval', 2000));
  const [now, setNow] = React.useState(() => Date.now());
  const versionRef = React.useRef<string | null>(null);
  const invalidateTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sseGeneration, setSseGeneration] = React.useState(0);

  const scheduleInvalidate = React.useCallback(() => {
    if (invalidateTimer.current) return;
    invalidateTimer.current = setTimeout(() => {
      invalidateTimer.current = null;
      setLastChangeAt(Date.now());
      // Search Lab results are explicit user queries; re-running them on every write would be noisy.
      void qc.invalidateQueries({ predicate: (q) => q.queryKey[0] !== 'explain' });
    }, 150);
  }, [qc]);

  const poll = React.useCallback(async () => {
    try {
      const v = await api.version();
      setLastSyncAt(Date.now());
      setLastError(null);
      if (versionRef.current !== null && versionRef.current !== v.version) scheduleInvalidate();
      versionRef.current = v.version;
    } catch (err) {
      setLastError((err as Error).message);
    }
  }, [scheduleInvalidate]);

  // Visibility tracking: pause polling for background tabs, poll immediately on return.
  React.useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  React.useEffect(() => {
    if (!pollingEnabled || hidden) return;
    void poll();
    const t = setInterval(() => void poll(), Math.max(1000, intervalMs));
    return () => clearInterval(t);
  }, [pollingEnabled, hidden, intervalMs, poll]);

  // Tick once a second so the "stale" state is detected even when nothing else re-renders.
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // SSE channel
  React.useEffect(() => {
    let es: EventSource | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    const connect = () => {
      if (disposed) return;
      setSse('connecting');
      es = new EventSource('/api/stream');
      es.onopen = () => !disposed && setSse('live');
      es.onerror = () => {
        if (disposed) return;
        setSse('offline');
        es?.close();
        retry = setTimeout(connect, 3000);
      };
      for (const evt of SSE_EVENTS) {
        es.addEventListener(evt, (e: MessageEvent) => {
          let data: Record<string, unknown> = {};
          try {
            data = JSON.parse(e.data);
          } catch {
            // ignore malformed payloads
          }
          scheduleInvalidate();
          if (evt === 'trap_logged') toast.warning(`Error trap logged: ${String(data.title ?? 'untitled')}`);
          else if (evt === 'action_claimed') toast.info(`${String(data.claimedBy ?? 'An agent')} claimed ${String(data.title ?? data.actionId ?? 'a task')}`);
          else if (evt === 'action_completed') toast.success(`Action completed: ${String(data.title ?? data.actionId ?? '')}`);
          else if (evt === 'conflict_detected') toast.warning('New memory conflict detected');
        });
      }
    };
    connect();
    return () => {
      disposed = true;
      if (retry) clearTimeout(retry);
      es?.close();
    };
  }, [scheduleInvalidate, sseGeneration]);

  const resync = React.useCallback(() => {
    versionRef.current = null;
    setSseGeneration((g) => g + 1);
    void poll();
    void qc.invalidateQueries();
  }, [poll, qc]);

  const setPollingEnabled = React.useCallback((v: boolean) => {
    setPollingEnabledState(v);
    writePref('fastr-live-polling', v);
  }, []);
  const setIntervalMs = React.useCallback((v: number) => {
    setIntervalState(v);
    writePref('fastr-live-interval', v);
  }, []);

  let health: SyncHealth;
  if (!pollingEnabled || hidden) health = sse === 'live' ? 'live' : 'paused';
  else if (lastSyncAt === null) health = lastError ? 'stale' : 'connecting';
  else health = now - lastSyncAt > Math.max(STALE_AFTER_MS, intervalMs * 3) ? 'stale' : 'live';

  const value: LiveSyncValue = {
    health,
    sse,
    lastSyncAt,
    lastChangeAt,
    lastError,
    pollingEnabled,
    intervalMs,
    setPollingEnabled,
    setIntervalMs,
    resync,
  };
  return <LiveSyncContext.Provider value={value}>{children}</LiveSyncContext.Provider>;
}

export function useLiveSync(): LiveSyncValue {
  const ctx = React.useContext(LiveSyncContext);
  if (!ctx) throw new Error('useLiveSync must be used inside LiveSyncProvider');
  return ctx;
}
