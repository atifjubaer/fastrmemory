import { useEffect, useState, useRef } from 'react';

export type SseConnectionStatus = 'connecting' | 'live' | 'offline';

export interface UseFastrStreamOptions {
  onEvent?: (event: string, data: any) => void;
}

export function useFastrStream(options: UseFastrStreamOptions = {}) {
  const [status, setStatus] = useState<SseConnectionStatus>('connecting');
  const [lastEventTime, setLastEventTime] = useState<string | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    let es: EventSource | null = null;
    let retryTimer: NodeJS.Timeout | null = null;
    let isDisposed = false;

    function connect() {
      if (isDisposed) return;
      setStatus('connecting');

      try {
        es = new EventSource('/api/stream');

        es.onopen = () => {
          if (!isDisposed) setStatus('live');
        };

        es.onerror = () => {
          if (!isDisposed) {
            setStatus('offline');
            es?.close();
            retryTimer = setTimeout(connect, 3000);
          }
        };

        // Listen for standard Fastr events
        const eventNames = [
          'memory_created',
          'memory_updated',
          'trap_logged',
          'conflict_detected',
          'conflict_resolved',
          'action_created',
          'action_updated',
          'sync_complete'
        ];

        eventNames.forEach((evt) => {
          es?.addEventListener(evt, (e: MessageEvent) => {
            try {
              const data = JSON.parse(e.data);
              setLastEventTime(new Date().toLocaleTimeString());
              optionsRef.current.onEvent?.(evt, data);
            } catch {
              // ignore parse errors
            }
          });
        });
      } catch {
        setStatus('offline');
        retryTimer = setTimeout(connect, 3000);
      }
    }

    connect();

    return () => {
      isDisposed = true;
      if (retryTimer) clearTimeout(retryTimer);
      if (es) es.close();
    };
  }, []);

  return { status, lastEventTime };
}
