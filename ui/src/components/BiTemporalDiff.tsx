import React, { useMemo } from 'react';
import { GitCompare, Check, Trash2, ArrowRight } from 'lucide-react';
import type { ConflictItem, MemoryItem } from '../types';

interface BiTemporalDiffProps {
  conflict: ConflictItem;
  memoryA?: MemoryItem;
  memoryB?: MemoryItem;
  onResolve: (conflictId: number, keepMemoryId: string, forgetLoser: boolean) => void;
}

export const BiTemporalDiff: React.FC<BiTemporalDiffProps> = ({ conflict, memoryA, memoryB, onResolve }) => {
  // Simple word-level LCS token diff
  const diffTokens = useMemo(() => {
    const textA = (memoryA?.content || '').split(/\s+/);
    const textB = (memoryB?.content || '').split(/\s+/);

    const setB = new Set(textB);
    const setA = new Set(textA);

    return {
      deletedFromA: textA.filter((w) => !setB.has(w)),
      addedInB: textB.filter((w) => !setA.has(w)),
    };
  }, [memoryA, memoryB]);

  return (
    <div style={{ background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', padding: '18px', marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: 'var(--risk-weak)', color: 'var(--risk)' }}>
            CONTRADICTION # {conflict.id} ({(conflict.score * 100).toFixed(0)}% CONFLICT)
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{conflict.reason}</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{conflict.created_at}</span>
      </div>

      {/* Side by side cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
            MEMORY A: <code>{conflict.memory_a_id}</code>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{memoryA?.title || 'Memory A'}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {memoryA?.content || 'Loading content...'}
          </div>
        </div>

        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--risk)', marginBottom: '6px' }}>
            MEMORY B: <code>{conflict.memory_b_id}</code>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{memoryB?.title || 'Memory B'}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {memoryB?.content || 'Loading content...'}
          </div>
        </div>
      </div>

      {/* Word-level diff summary chips */}
      {(diffTokens.deletedFromA.length > 0 || diffTokens.addedInB.length > 0) && (
        <div style={{ fontSize: '12px', padding: '10px 14px', borderRadius: '6px', background: 'var(--bg-subtle)', border: '1px dashed var(--border)', marginBottom: '14px' }}>
          <span style={{ fontWeight: 600, marginRight: '8px' }}>Key Divergences:</span>
          {diffTokens.deletedFromA.slice(0, 5).map((w, i) => (
            <span key={i} style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', padding: '2px 6px', borderRadius: '4px', marginRight: '6px', fontSize: '11px', textDecoration: 'line-through' }}>
              {w}
            </span>
          ))}
          {diffTokens.addedInB.slice(0, 5).map((w, i) => (
            <span key={i} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', marginRight: '6px', fontSize: '11px' }}>
              +{w}
            </span>
          ))}
        </div>
      )}

      {/* 1-Click Resolution Toolbar */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onResolve(conflict.id, conflict.memory_a_id, true)}
          style={{
            background: 'var(--accent-weak)',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Check size={14} /> Keep {conflict.memory_a_id} (Deprecate B)
        </button>

        <button
          onClick={() => onResolve(conflict.id, conflict.memory_b_id, true)}
          style={{
            background: 'var(--risk-weak)',
            border: '1px solid var(--risk)',
            color: 'var(--risk)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Check size={14} /> Keep {conflict.memory_b_id} (Deprecate A)
        </button>

        <button
          onClick={() => onResolve(conflict.id, conflict.memory_a_id, false)}
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Keep Both (Weaken B Score)
        </button>
      </div>
    </div>
  );
};
