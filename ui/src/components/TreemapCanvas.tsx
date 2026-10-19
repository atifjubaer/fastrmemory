import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { LayoutGrid, Table as TableIcon, Pin, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
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

interface ItemCell extends Rect {
  item: MemoryItem;
  module: string;
}

export const TreemapCanvas: React.FC<TreemapCanvasProps> = ({ memories, onSelectMemory }) => {
  const [viewMode, setViewMode] = useState<'treemap' | 'table'>('treemap');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hoveredTile, setHoveredTile] = useState<TileInfo | null>(null);
  const [hoveredItem, setHoveredItem] = useState<ItemCell | null>(null);

  const tilesRef = useRef<TileInfo[]>([]);
  const itemCellsRef = useRef<ItemCell[]>([]);

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
  const renderCanvas = useCallback(() => {
    if (viewMode !== 'treemap') return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const logicalW = container.clientWidth || 800;
    const logicalH = 500;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(logicalW * dpr);
    canvas.height = Math.round(logicalH * dpr);
    canvas.style.width = `${logicalW}px`;
    canvas.style.height = `${logicalH}px`;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, logicalW, logicalH);

    if (moduleGroups.length === 0) {
      // Empty State
      ctx.fillStyle = '#64748b';
      ctx.font = '14px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No memory clusters indexed yet. Record a rule or run git-learn.', logicalW / 2, logicalH / 2);
      ctx.restore();
      return;
    }

    const PAD = 8;
    const counts = moduleGroups.map((g) => Math.max(1, g.count));
    const squarifiedRects = squarify(counts, PAD, PAD, logicalW - 2 * PAD, logicalH - 2 * PAD);

    tilesRef.current = moduleGroups.map((g, idx) => ({
      ...squarifiedRects[idx],
      module: g.module,
      items: g.items,
    }));

    const nextItemCells: ItemCell[] = [];

    for (const tile of tilesRef.current) {
      if (tile.w <= 4 || tile.h <= 4) continue;

      const isModuleHovered = hoveredTile?.module === tile.module;

      ctx.save();
      // Clip to tile boundary to prevent text overflow
      ctx.beginPath();
      ctx.rect(tile.x, tile.y, tile.w, tile.h);
      ctx.clip();

      // Tile module background
      ctx.fillStyle = isModuleHovered ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(tile.x, tile.y, tile.w, tile.h);

      // Tile module border
      ctx.strokeStyle = isModuleHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = isModuleHovered ? 2 : 1;
      ctx.strokeRect(tile.x, tile.y, tile.w, tile.h);

      // Module Header Bar
      const headerH = Math.min(26, Math.max(16, tile.h * 0.22));
      ctx.fillStyle = isModuleHovered ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(tile.x, tile.y, tile.w, headerH);

      ctx.fillStyle = isModuleHovered ? '#38bdf8' : '#e2e8f0';
      ctx.font = 'bold 11px -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      if (tile.w > 40) {
        const modTitle = tile.module.toUpperCase();
        ctx.fillText(`${modTitle} (${tile.items.length})`, tile.x + 8, tile.y + headerH / 2);
      }

      // Sub-partition individual memories
      const subAreaY = tile.y + headerH + 4;
      const subAreaH = tile.h - headerH - 8;
      const subAreaW = tile.w - 8;
      const subAreaX = tile.x + 4;

      if (subAreaH > 10 && subAreaW > 10 && tile.items.length > 0) {
        // Layout items squarified inside module
        const itemWeights = tile.items.map((it) => (it.pinned ? 2 : it.kind === 'error_trap' ? 1.5 : 1));
        const itemRects = squarify(itemWeights, subAreaX, subAreaY, subAreaW, subAreaH);

        tile.items.forEach((item, itemIdx) => {
          const ir = itemRects[itemIdx];
          if (!ir || ir.w <= 2 || ir.h <= 2) return;

          nextItemCells.push({
            ...ir,
            item,
            module: tile.module,
          });

          const isCellHovered = hoveredItem?.item.id === item.id;

          // Determine cell fill color
          let cellColor = '#10b981'; // green active
          if (item.pinned) {
            cellColor = '#8b5cf6'; // violet
          } else if (item.kind === 'error_trap') {
            cellColor = '#f59e0b'; // amber trap
          } else if (item.reward_score >= 0.7) {
            cellColor = '#0284c7'; // strong
          } else if (item.reward_score < 0.3) {
            cellColor = '#64748b'; // fading
          }

          ctx.save();
          ctx.beginPath();
          ctx.rect(ir.x + 1, ir.y + 1, ir.w - 2, ir.h - 2);
          ctx.clip();

          // Cell body
          ctx.fillStyle = isCellHovered ? cellColor : `${cellColor}33`; // alpha tint
          ctx.fillRect(ir.x + 1, ir.y + 1, ir.w - 2, ir.h - 2);

          // Cell outline
          ctx.strokeStyle = isCellHovered ? '#ffffff' : cellColor;
          ctx.lineWidth = isCellHovered ? 2 : 1;
          ctx.strokeRect(ir.x + 1, ir.y + 1, ir.w - 2, ir.h - 2);

          // Cell label if enough space
          if (ir.w > 65 && ir.h > 24) {
            ctx.fillStyle = isCellHovered ? '#ffffff' : '#f8fafc';
            ctx.font = '500 10px -apple-system, sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            const label = item.kind === 'error_trap' ? `⚠️ ${item.title}` : item.title;
            ctx.fillText(label, ir.x + 6, ir.y + 6, ir.w - 12);
          }

          ctx.restore();
        });
      }

      ctx.restore();
    }

    itemCellsRef.current = nextItemCells;
    ctx.restore();
  }, [viewMode, moduleGroups, hoveredTile, hoveredItem]);

  useEffect(() => {
    renderCanvas();
    const handleResize = () => renderCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderCanvas]);

  // Pointer hit testing
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check hit on specific item cell first
    const hitItem = itemCellsRef.current.find(
      (c) => x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h
    );

    if (hitItem) {
      setHoveredItem(hitItem);
      const parentTile = tilesRef.current.find((t) => t.module === hitItem.module);
      setHoveredTile(parentTile || null);
      return;
    }

    setHoveredItem(null);

    // Fallback hit on module tile
    const hitTile = tilesRef.current.find(
      (t) => x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.h
    );
    setHoveredTile(hitTile || null);
  };

  const handleClick = () => {
    if (hoveredItem) {
      onSelectMemory(hoveredItem.item);
    } else if (hoveredTile && hoveredTile.items.length > 0) {
      onSelectMemory(hoveredTile.items[0]);
    }
  };

  return (
    <div className="card-panel" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutGrid size={16} color="var(--accent)" />
            Nested Cognitive Memory Treemap
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Interactive nested squarified clusters: Pinned (violet), 2.0x Error Traps (amber), Strong (blue), Active (green), Fading (slate).
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
        <div ref={containerRef} style={{ width: '100%', height: '520px', position: 'relative', padding: '12px', boxSizing: 'border-box' }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setHoveredTile(null); setHoveredItem(null); }}
            onClick={handleClick}
            style={{ width: '100%', height: '100%', display: 'block', cursor: hoveredItem || hoveredTile ? 'pointer' : 'default' }}
          />

          {/* Interactive Inspection Card */}
          {(hoveredItem || hoveredTile) && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid var(--accent)',
                borderRadius: '8px',
                padding: '12px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                zIndex: 20,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {hoveredItem ? `${hoveredItem.module} &bull; ${hoveredItem.item.id}` : `${hoveredTile?.module} Module`}
                  </span>
                  {hoveredItem?.item.kind === 'error_trap' && (
                    <span className="badge-tag" style={{ background: 'var(--trap-weak)', color: 'var(--trap)' }}>2.0x TRAP</span>
                  )}
                  {hoveredItem?.item.pinned === 1 && (
                    <span className="badge-tag" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>PINNED</span>
                  )}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px', color: '#fff' }}>
                  {hoveredItem ? hoveredItem.item.title : `${hoveredTile?.items.length} Memories Cluster`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click to open inspector</span>
                {hoveredItem && <CopyButton text={hoveredItem.item.id} label="Copy ID" />}
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
