import React, { useMemo } from 'react';
import { Check, ShieldAlert } from 'lucide-react';
import { CopyButton } from './CopyButton';
import type { ConflictItem, MemoryItem } from '../types';

interface BiTemporalDiffProps {
  conflict: ConflictItem;
  memoryA?: MemoryItem;
  memoryB?: MemoryItem;
  onResolve: (conflictId: number, keepMemoryId: string, forgetLoser: boolean) => void;
}

export const BiTemporalDiff: React.FC<BiTemporalDiffProps> = ({ conflict, memoryA, memoryB, onResolve }) => {
  // Line-by-line unified diff
  const lineDiff = useMemo(() => {
    const linesA = (memoryA?.content || '').split('\n');
    const linesB = (memoryB?.content || '').split('\n');
    const diff: Array<{ type: 'same' | 'added' | 'removed'; text: string }> = [];

    const maxLen = Math.max(linesA.length, linesB.length);
    for (let i = 0; i < maxLen; i++) {
      const a = linesA[i];
      const b = linesB[i];
      if (a === b) {
        if (a !== undefined) diff.push({ type: 'same', text: a });
      } else {
        if (a !== undefined) diff.push({ type: 'removed', text: a });
        if (b !== undefined) diff.push({ type: 'added', text: b });
      }
    }
    return diff;
  }, [memoryA, memoryB]);

  return (
    <div className="card-panel" style={{ padding: '18px', marginBottom: '14px', borderLeft: '4px solid var(--risk)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-tag" style={{ background: 'var(--risk-weak)', color: 'var(--risk)' }}>
            <ShieldAlert size={12} /> CONFLICT #{conflict.id} ({(conflict.score * 100).toFixed(0)}%)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{conflict.reason}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{conflict.created_at}</span>
          <CopyButton text={`# Conflict ${conflict.id}\nMemory A: ${conflict.memory_a_id}\nMemory B: ${conflict.memory_b_id}\nReason: ${conflict.reason}`} label="Copy Report" />
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)' }}>
              MEMORY A: <code>{conflict.memory_a_id}</code>
            </span>
            <CopyButton text={conflict.memory_a_id} label="ID" />
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{memoryA?.title || 'Memory A'}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {memoryA?.content || 'Loading content...'}
          </div>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--risk)' }}>
              MEMORY B: <code>{conflict.memory_b_id}</code>
            </span>
            <CopyButton text={conflict.memory_b_id} label="ID" />
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{memoryB?.title || 'Memory B'}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {memoryB?.content || 'Loading content...'}
          </div>
        </div>
      </div>

      {/* Line-level diff view */}
      <div style={{ background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)', padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '14px', maxHeight: '160px', overflowY: 'auto' }}>
        {lineDiff.map((d, i) => (
          <div
            key={i}
            style={{
              padding: '2px 8px',
              borderRadius: '2px',
              background: d.type === 'added' ? 'rgba(34, 197, 94, 0.12)' : d.type === 'removed' ? 'rgba(244, 63, 94, 0.12)' : 'transparent',
              color: d.type === 'added' ? '#4ade80' : d.type === 'removed' ? '#fb7185' : 'var(--text-muted)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <span style={{ userSelect: 'none', width: '16px', color: 'var(--text-faint)' }}>
              {d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}
            </span>
            <span>{d.text}</span>
          </div>
        ))}
      </div>

      {/* 1-Click Resolution Toolbar */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onResolve(conflict.id, conflict.memory_a_id, true)}
          className="btn btn-primary"
        >
          <Check size={14} /> Keep A ({conflict.memory_a_id})
        </button>

        <button
          onClick={() => onResolve(conflict.id, conflict.memory_b_id, true)}
          className="btn"
          style={{ borderColor: 'var(--risk)', color: 'var(--risk)' }}
        >
          <Check size={14} /> Keep B ({conflict.memory_b_id})
        </button>

        <button
          onClick={() => onResolve(conflict.id, conflict.memory_a_id, false)}
          className="btn"
        >
          Keep Both (Weaken B Score)
        </button>
      </div>
    </div>
  );
};
