import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { PendingAction } from '../hooks/useActionQueue';

interface UndoToastProps {
  pendingAction: PendingAction | null;
  countdown: number;
  onUndo: () => void;
}

export const UndoToast: React.FC<UndoToastProps> = ({ pendingAction, countdown, onUndo }) => {
  if (!pendingAction) return null;

  return (
    <div
      className="toast-slide"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        zIndex: 9999,
        background: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: '12px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        color: 'var(--text)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse 1s infinite',
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: 500 }}>{pendingAction.label}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Auto-committing in {countdown}s
        </span>
        <button
          onClick={onUndo}
          style={{
            background: 'var(--accent-weak)',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          <RotateCcw size={13} />
          Undo (Ctrl+Z)
        </button>
      </div>
    </div>
  );
};
