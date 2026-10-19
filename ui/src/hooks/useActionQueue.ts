import { useState, useRef, useEffect, useCallback } from 'react';

export interface PendingAction {
  id: string;
  label: string;
  execute: () => Promise<void>;
  rollback: () => void;
}

export function useActionQueue() {
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [countdown, setCountdown] = useState(6);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    timerRef.current = null;
    countdownIntervalRef.current = null;
  };

  const enqueue = useCallback((label: string, execute: () => Promise<void>, rollback: () => void) => {
    // If an action is already pending, execute it immediately before queueing the new one
    if (pending) {
      pending.execute().catch(console.error);
    }
    clearTimers();

    const action: PendingAction = {
      id: Math.random().toString(36).substring(7),
      label,
      execute,
      rollback,
    };

    setPending(action);
    setCountdown(6);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    timerRef.current = setTimeout(async () => {
      clearTimers();
      setPending(null);
      try {
        await execute();
      } catch (err) {
        console.error('Failed to commit action:', err);
        rollback();
      }
    }, 6000);
  }, [pending]);

  const undo = useCallback(() => {
    if (!pending) return;
    clearTimers();
    pending.rollback();
    setPending(null);
  }, [pending]);

  // Keyboard shortcut Ctrl+Z / Cmd+Z to undo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (pending) {
          e.preventDefault();
          undo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pending, undo]);

  return {
    pendingAction: pending,
    countdown,
    enqueue,
    undo,
  };
}
