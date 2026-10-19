import React, { useState, useMemo } from 'react';
import { LayoutGrid, Table as TableIcon, ShieldAlert, Pin, Sparkles } from 'lucide-react';
import type { MemoryItem } from '../types';

interface TreemapCanvasProps {
  memories: MemoryItem[];
  onSelectMemory: (mem: MemoryItem) => void;
}

interface ModuleBand {
  module: string;
  items: MemoryItem[];
  pinnedCount: number;
  strongCount: number;
  fadingCount: number;
  atRiskCount: number;
}

export const TreemapCanvas: React.FC<TreemapCanvasProps> = ({ memories, onSelectMemory }) => {
  const [viewMode, setViewMode] = useState<'treemap' | 'table'>('treemap');
  const [hoveredMemory, setHoveredMemory] = useState<MemoryItem | null>(null);

  // Group memories into modules and strength bands
  const moduleBands = useMemo<ModuleBand[]>(() => {
    const map = new Map<string, MemoryItem[]>();
    for (const m of memories) {
      const mod = m.module || 'general';
      if (!map.has(mod)) map.set(mod, []);
      map.get(mod)!.push(m);
    }

    return Array.from(map.entries()).map(([module, items]) => {
      let pinnedCount = 0;
      let strongCount = 0;
      let fadingCount = 0;
      let atRiskCount = 0;

      for (const item of items) {
        if (item.pinned) {
          pinnedCount++;
        } else if (item.kind === 'error_trap' || item.reward_score < 0) {
          atRiskCount++;
        } else if (item.reward_score >= 0.7) {
          strongCount++;
        } else {
          fadingCount++;
        }
      }

      return { module, items, pinnedCount, strongCount, fadingCount, atRiskCount };
    });
  }, [memories]);

  const getStrengthColor = (m: MemoryItem) => {
    if (m.pinned) return '#8b5cf6'; // Violet: Pinned
    if (m.kind === 'error_trap') return '#fbbf24'; // Amber: Error Trap 2.0x
    if (m.reward_score >= 0.7) return '#3b82f6'; // Blue: Strong
    if (m.reward_score >= 0.3) return '#64748b'; // Slate: Fading
    return '#f43f5e'; // Rose: At-Risk
  };

  return (
    <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
      {/* Header toolbar */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutGrid size={16} color="var(--accent)" />
            Memory Strength & Decay Bands
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Visualizing cognitive decay bands: Pinned (permanent), Strong (&gt;0.7), Fading (0.3-0.7), and 2.0x Error Traps.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewMode('treemap')}
            style={{
              background: viewMode === 'treemap' ? 'var(--accent)' : 'var(--bg-subtle)',
              color: viewMode === 'treemap' ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LayoutGrid size={14} /> Treemap View
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              background: viewMode === 'table' ? 'var(--accent)' : 'var(--bg-subtle)',
              color: viewMode === 'table' ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <TableIcon size={14} /> Table Twin
          </button>
        </div>
      </div>

      {viewMode === 'treemap' ? (
        <div style={{ padding: '20px' }}>
          {/* Treemap Grid Container */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {moduleBands.map((band) => (
              <div
                key={band.module}
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {band.module}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {band.items.length} items
                  </span>
                </div>

                {/* Micro-cell cluster representing memories */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {band.items.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => onSelectMemory(m)}
                      onMouseEnter={() => setHoveredMemory(m)}
                      onMouseLeave={() => setHoveredMemory(null)}
                      title={`${m.title} (${m.kind}) - Score: ${m.reward_score}`}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: getStrengthColor(m),
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        transition: 'transform 0.1s ease, filter 0.1s ease',
                        border: hoveredMemory?.id === m.id ? '2px solid #fff' : '1px solid rgba(0,0,0,0.2)',
                        transform: hoveredMemory?.id === m.id ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      {m.pinned ? <Pin size={12} /> : m.kind === 'error_trap' ? <ShieldAlert size={12} /> : null}
                    </div>
                  ))}
                </div>

                {/* Sub-band summary */}
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', paddingTop: '4px', borderTop: '1px dashed var(--border)' }}>
                  {band.pinnedCount > 0 && <span style={{ color: '#8b5cf6' }}>{band.pinnedCount} Pinned</span>}
                  {band.strongCount > 0 && <span style={{ color: '#3b82f6' }}>{band.strongCount} Strong</span>}
                  {band.atRiskCount > 0 && <span style={{ color: '#fbbf24' }}>{band.atRiskCount} Traps/Risk</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Hover preview tooltip */}
          {hoveredMemory && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'var(--surface-hover)',
                border: '1px solid var(--accent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{hoveredMemory.id}]</span>
                <span style={{ fontSize: '13px', fontWeight: 600, marginLeft: '8px' }}>{hoveredMemory.title}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Score: <b>{hoveredMemory.reward_score}</b> &bull; Status: <span style={{ textTransform: 'capitalize' }}>{hoveredMemory.status}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Accessible Table Twin */
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }} aria-rowcount={memories.length}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>ID</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Title</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Module</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Kind</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Reward Score</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {memories.map((m, idx) => (
                <tr
                  key={m.id}
                  onClick={() => onSelectMemory(m)}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    background: idx % 2 === 0 ? 'transparent' : 'var(--bg-subtle)',
                  }}
                >
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{m.id}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 500 }}>{m.title}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>{m.module}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: m.kind === 'error_trap' ? 'var(--trap-weak)' : 'var(--accent-weak)',
                        color: m.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)',
                      }}
                    >
                      {m.kind.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)' }}>{m.reward_score}</td>
                  <td style={{ padding: '10px 16px', textTransform: 'capitalize' }}>{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
