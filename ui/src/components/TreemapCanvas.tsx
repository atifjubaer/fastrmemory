import React, { useRef, useEffect, useState, useMemo } from 'react';
import { LayoutGrid, Table as TableIcon, Pin, ShieldAlert } from 'lucide-react';
import { squarify, Rect } from '../utils/squarify';
import { CopyButton } from './CopyButton';
import type { MemoryItem } from '../types';

interface TreemapCanvasProps {
  memories: MemoryItem[];
  onSelectMemory: (mem: MemoryItem) => void;
}

interface TileInfo extends Rect {
  module: string;
  items: MemoryItem[];
}

export const TreemapCanvas: React.FC<TreemapCanvasProps> = ({ memories, onSelectMemory }) => {
  const [viewMode, setViewMode] = useState<'treemap' | 'table'>('treemap');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredTile, setHoveredTile] = useState<TileInfo | null>(null);
  const tilesRef = useRef<TileInfo[]>([]);

  // Group memories into modules
  const moduleGroups = useMemo(() => {
    const map = new Map<string, MemoryItem[]>();
    for (const m of memories) {
      const mod = m.module || 'general';
      if (!map.has(mod)) map.set(mod, []);
      map.get(mod)!.push(m);
    }
    return Array.from(map.entries())
      .map(([module, items]) => ({ module, items, count: items.length }))
      .sort((a, b) => b.count - a.count);
  }, [memories]);

  // High-DPI Canvas Rendering
  useEffect(() => {
    if (viewMode !== 'treemap') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const logicalW = rect.width;
      const logicalH = rect.height;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, logicalW, logicalH);

      const PAD = 10;
      const counts = moduleGroups.map((g) => g.count);
      const squarifiedRects = squarify(counts, PAD, PAD, logicalW - 2 * PAD, logicalH - 2 * PAD);

      tilesRef.current = moduleGroups.map((g, idx) => ({
        ...squarifiedRects[idx],
        module: g.module,
        items: g.items,
      }));

      for (const tile of tilesRef.current) {
        if (tile.w <= 0 || tile.h <= 0) continue;

        const isHovered = hoveredTile?.module === tile.module;

        // Tile base background
        ctx.fillStyle = isHovered ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(tile.x, tile.y, tile.w, tile.h);

        // Tile border
        ctx.strokeStyle = isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.strokeRect(tile.x, tile.y, tile.w, tile.h);

        // Module Label Header
        ctx.fillStyle = isHovered ? '#38bdf8' : '#e2e8f0';
        ctx.font = 'bold 12px -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${tile.module.toUpperCase()} (${tile.items.length})`, tile.x + 8, tile.y + 20);

        // Sub-partition: strength bands bar inside the tile
        const barY = tile.y + 28;
        const barH = Math.max(4, Math.min(12, tile.h - 38));
        const barW = tile.w - 16;

        if (barH > 4 && barW > 10) {
          let currX = tile.x + 8;
          for (const item of tile.items) {
            const itemW = barW / tile.items.length;
            ctx.fillStyle = item.pinned
              ? '#8b5cf6'
              : item.kind === 'error_trap'
              ? '#fbbf24'
              : item.reward_score >= 0.7
              ? '#3b82f6'
              : item.reward_score >= 0.3
              ? '#64748b'
              : '#f43f5e';
            ctx.fillRect(currX, barY, Math.max(1, itemW - 1), barH);
            currX += itemW;
          }
        }
      }

      ctx.restore();
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [viewMode, moduleGroups, hoveredTile]);

  // Pointer hit testing
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hit = tilesRef.current.find((t) => x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.h);
    setHoveredTile(hit || null);
  };

  const handleClick = () => {
    if (hoveredTile && hoveredTile.items.length > 0) {
      onSelectMemory(hoveredTile.items[0]);
    }
  };

  return (
    <div className="card-panel" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutGrid size={16} color="var(--accent)" />
            Squarified Memory Strength Treemap
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            High-DPI area-proportional partition: Pinned (violet), Strong (blue), Fading (slate), and 2.0x Error Traps (amber).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewMode('treemap')}
            className={`btn btn-pill ${viewMode === 'treemap' ? 'btn-primary' : ''}`}
          >
            <LayoutGrid size={13} /> Treemap Canvas
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`btn btn-pill ${viewMode === 'table' ? 'btn-primary' : ''}`}
          >
            <TableIcon size={13} /> Table Twin
          </button>
        </div>
      </div>

      {viewMode === 'treemap' ? (
        <div style={{ padding: '16px', position: 'relative' }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredTile(null)}
            onClick={handleClick}
            style={{ width: '100%', height: '480px', display: 'block', cursor: hoveredTile ? 'pointer' : 'default' }}
          />

          {hoveredTile && (
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid var(--accent)',
                borderRadius: '8px',
                padding: '12px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {hoveredTile.module} Module
                </span>
                <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
                  {hoveredTile.items.length} Memories &bull; Click to inspect top rule
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <CopyButton text={`fastrmemory recall "${hoveredTile.module}"`} label="Copy Recall CLI" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }} aria-rowcount={memories.length}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>ID</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Title</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Module</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Kind</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Score</th>
                <th style={{ padding: '10px 16px', color: 'var(--text-muted)' }}>Actions</th>
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
                      className="badge-tag"
                      style={{
                        background: m.kind === 'error_trap' ? 'var(--trap-weak)' : 'var(--accent-weak)',
                        color: m.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)',
                      }}
                    >
                      {m.kind.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)' }}>{m.reward_score}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <CopyButton text={m.id} label="ID" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
