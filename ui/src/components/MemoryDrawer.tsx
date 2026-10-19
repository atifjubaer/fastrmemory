import React, { useEffect } from 'react';
import { Pin, Trash2 } from 'lucide-react';
import { MemoryItem } from '../types.js';
import { CopyButton } from './CopyButton.js';
import { MarkdownView } from './MarkdownView.js';

export interface MemoryDrawerProps {
  memory: MemoryItem | null;
  onClose: () => void;
  onTogglePin: (memoryId: string, currentPinned: number) => void;
  onForget: (memoryId: string) => void;
}

export const MemoryDrawer: React.FC<MemoryDrawerProps> = ({
  memory,
  onClose,
  onTogglePin,
  onForget,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!memory) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                [{memory.id}]
              </span>
              <span
                className="badge-tag"
                style={{
                  background: memory.kind === 'error_trap' ? 'var(--trap-weak)' : 'var(--accent-weak)',
                  color: memory.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)',
                }}
              >
                {memory.kind.toUpperCase()}
              </span>
              <span className="badge-tag" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                {memory.status.toUpperCase()}
              </span>
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', lineHeight: '1.4' }}>
              {memory.title}
            </h2>
          </div>
          <button onClick={onClose} className="btn" style={{ padding: '4px 8px', color: 'var(--text-muted)' }} title="Close (Esc)">
            ✕
          </button>
        </div>

        {/* Provenance & Author Strip */}
        <div style={{ padding: '10px 20px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Author:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)', fontWeight: 600 }}>
              @{memory.agent_id || 'default'}
            </span>
          </div>
          {memory.provenance_hash ? (
            <span
              className="badge-tag"
              style={{ background: 'rgba(52, 211, 153, 0.15)', color: 'var(--success)' }}
              title={`SHA-256 Authentic Provenance: ${memory.provenance_hash}`}
            >
              🔒 prov_{memory.provenance_hash.slice(0, 10)}
            </span>
          ) : (
            <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>legacy unsigned</span>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Memory Content
            </div>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px' }}>
              <MarkdownView content={memory.content} />
            </div>
          </div>

          {/* Linked Files */}
          {memory.linked_files && memory.linked_files.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Linked Files ({memory.linked_files.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {memory.linked_files.map((f) => (
                  <span key={f} className="badge-tag" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
            <div style={{ background: 'var(--bg)', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-faint)' }}>MODULE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '12px', marginTop: '2px' }}>
                {memory.module}
              </div>
            </div>
            <div style={{ background: 'var(--bg)', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-faint)' }}>REWARD</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '12px', marginTop: '2px', color: 'var(--accent)' }}>
                {memory.reward_score.toFixed(2)}x
              </div>
            </div>
            <div style={{ background: 'var(--bg)', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-faint)' }}>CREATED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px', color: 'var(--text-muted)' }}>
                {new Date(memory.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CopyButton text={memory.content} label="Copy Rule" />
            <CopyButton text={`fastrmemory recall "${memory.title}"`} label="CLI" />
            <button
              onClick={() => onTogglePin(memory.id, memory.pinned)}
              className="btn"
              style={{ fontSize: '11.5px' }}
            >
              <Pin size={12} color={memory.pinned ? '#8b5cf6' : 'var(--text-muted)'} />
              {memory.pinned ? 'Unpin' : 'Pin'}
            </button>
          </div>
          <button
            onClick={() => onForget(memory.id)}
            className="btn"
            style={{ borderColor: 'var(--risk)', color: 'var(--risk)', fontSize: '11.5px' }}
          >
            <Trash2 size={12} /> Forget
          </button>
        </div>
      </div>
    </>
  );
};
