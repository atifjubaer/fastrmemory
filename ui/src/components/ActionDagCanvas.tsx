import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Pause, Play, Sparkles } from 'lucide-react';
import type { ActionItem } from '../types';

interface ActionDagCanvasProps {
  actions: ActionItem[];
  edges: Array<{ source_action_id: string; target_action_id: string; edge_type: string }>;
  onSelectAction: (action: ActionItem) => void;
}

interface SimNode {
  id: string;
  action: ActionItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const ActionDagCanvas: React.FC<ActionDagCanvasProps> = ({ actions, edges, onSelectAction }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filter, setFilter] = useState<'all' | 'frontier' | 'active' | 'blocked' | 'done'>('all');
  const [isAwake, setIsAwake] = useState(true);

  const nodesRef = useRef<SimNode[]>([]);
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const dragRef = useRef<{
    isDragging: boolean;
    dragNode: SimNode | null;
    startMouse: { x: number; y: number };
    startTransform: { x: number; y: number };
  }>({
    isDragging: false,
    dragNode: null,
    startMouse: { x: 0, y: 0 },
    startTransform: { x: 0, y: 0 },
  });

  const wakePhysics = useCallback(() => {
    setIsAwake(true);
  }, []);

  // Initialize node layout
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const filtered = actions.filter((a) => {
      if (filter === 'all') return true;
      if (filter === 'frontier') return a.isFrontier;
      return a.status === filter;
    });

    nodesRef.current = filtered.map((a, i) => {
      const angle = (i / Math.max(1, filtered.length)) * Math.PI * 2;
      const radius = 120 + (i % 3) * 60;
      return {
        id: a.id,
        action: a,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: a.isFrontier ? 20 : 16,
      };
    });
    wakePhysics();
  }, [actions, filter, wakePhysics]);

  // High-DPI canvas loop with physics sleeping
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      wakePhysics();
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const nodes = nodesRef.current;
      const t = transformRef.current;
      const dpr = window.devicePixelRatio || 1;
      const logicalWidth = canvas.width / dpr;
      const logicalHeight = canvas.height / dpr;

      let maxVelocity = 0;

      if (isPlaying && isAwake) {
        // Node repulsion
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 200) {
              const f = ((200 - dist) / dist) * 0.4;
              nodes[i].vx -= dx * f * 0.05;
              nodes[i].vy -= dy * f * 0.05;
              nodes[j].vx += dx * f * 0.05;
              nodes[j].vy += dy * f * 0.05;
            }
          }
        }

        // Edge attraction
        for (const edge of edges) {
          const s = nodes.find((n) => n.id === edge.source_action_id);
          const tNode = nodes.find((n) => n.id === edge.target_action_id);
          if (s && tNode) {
            const dx = tNode.x - s.x;
            const dy = tNode.y - s.y;
            const spring = edge.edge_type === 'conflicts_with' ? 0.001 : 0.0035;
            s.vx += dx * spring;
            s.vy += dy * spring;
            tNode.vx -= dx * spring;
            tNode.vy -= dy * spring;
          }
        }

        // Apply friction and compute max velocity
        for (const n of nodes) {
          if (n !== dragRef.current.dragNode) {
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.85;
            n.vy *= 0.85;
            const v = Math.hypot(n.vx, n.vy);
            if (v > maxVelocity) maxVelocity = v;
          }
        }

        // Sleep physics when settled
        if (maxVelocity < 0.04 && !dragRef.current.isDragging) {
          setIsAwake(false);
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.translate(t.x, t.y);
      ctx.scale(t.k, t.k);

      // Draw edges
      for (const edge of edges) {
        const s = nodes.find((n) => n.id === edge.source_action_id);
        const tNode = nodes.find((n) => n.id === edge.target_action_id);
        if (s && tNode) {
          ctx.beginPath();
          if (edge.edge_type === 'conflicts_with') {
            ctx.setLineDash([5, 4]);
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tNode.x, tNode.y);
            ctx.stroke();
            ctx.setLineDash([]);
          } else {
            ctx.setLineDash([]);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.8;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tNode.x, tNode.y);
            ctx.stroke();

            // Arrow head
            const angle = Math.atan2(s.y - tNode.y, s.x - tNode.x);
            const arrowDist = s.radius + 3;
            const arrowX = s.x - Math.cos(angle) * arrowDist;
            const arrowY = s.y - Math.sin(angle) * arrowDist;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - 8 * Math.cos(angle - Math.PI / 6), arrowY - 8 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(arrowX - 8 * Math.cos(angle + Math.PI / 6), arrowY - 8 * Math.sin(angle + Math.PI / 6));
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const a = n.action;

        // Glowing pulsating aura for unblocked Frontier tasks
        if (a.isFrontier) {
          const pulse = (Math.sin(Date.now() / 240) + 1) * 4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + pulse + 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.fill();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Node circle fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        if (a.isFrontier) {
          ctx.fillStyle = '#0284c7';
        } else if (a.status === 'done') {
          ctx.fillStyle = '#10b981';
        } else if (a.status === 'active') {
          ctx.fillStyle = '#3b82f6';
        } else if (a.status === 'blocked') {
          ctx.fillStyle = '#64748b';
        } else {
          ctx.fillStyle = '#8b5cf6';
        }
        ctx.fill();
        ctx.strokeStyle = '#090d16';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Node label
        ctx.fillStyle = '#f8fafc';
        ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        const label = `[P${a.priority}] ${a.title}`;
        const truncated = label.length > 20 ? label.slice(0, 18) + '...' : label;
        ctx.fillText(truncated, n.x, n.y + n.radius + 14);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [edges, isPlaying, isAwake, wakePhysics]);

  // Pointer interactions
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    wakePhysics();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - transformRef.current.x) / transformRef.current.k;
    const mouseY = (e.clientY - rect.top - transformRef.current.y) / transformRef.current.k;

    const hit = nodesRef.current.find((n) => Math.hypot(n.x - mouseX, n.y - mouseY) < n.radius + 6);

    dragRef.current = {
      isDragging: true,
      dragNode: hit || null,
      startMouse: { x: e.clientX, y: e.clientY },
      startTransform: { ...transformRef.current },
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { isDragging, dragNode, startMouse, startTransform } = dragRef.current;
    if (!isDragging) return;
    wakePhysics();

    if (dragNode) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dragNode.x = (e.clientX - rect.left - transformRef.current.x) / transformRef.current.k;
      dragNode.y = (e.clientY - rect.top - transformRef.current.y) / transformRef.current.k;
      dragNode.vx = 0;
      dragNode.vy = 0;
    } else {
      transformRef.current.x = startTransform.x + (e.clientX - startMouse.x);
      transformRef.current.y = startTransform.y + (e.clientY - startMouse.y);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { dragNode, startMouse } = dragRef.current;
    const dist = Math.hypot(e.clientX - startMouse.x, e.clientY - startMouse.y);

    if (dragNode && dist < 6) {
      onSelectAction(dragNode.action);
    }

    dragRef.current.isDragging = false;
    dragRef.current.dragNode = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    wakePhysics();
    const factor = e.deltaY < 0 ? 1.15 : 0.88;
    transformRef.current.k = Math.max(0.25, Math.min(3.5, transformRef.current.k * factor));
  };

  const zoom = (factor: number) => {
    wakePhysics();
    transformRef.current.k = Math.max(0.25, Math.min(3.5, transformRef.current.k * factor));
  };

  const resetView = () => {
    wakePhysics();
    transformRef.current = { x: 0, y: 0, k: 1 };
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '580px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
      {/* Controls Header */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, pointerEvents: 'none' }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          {(['all', 'frontier', 'active', 'blocked', 'done'] as const).map((st) => (
            <button
              key={st}
              onClick={() => { setFilter(st); wakePhysics(); }}
              className={`btn btn-pill ${filter === st ? 'btn-primary' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {st === 'frontier' && <Sparkles size={12} />}
              {st}
            </button>
          ))}
        </div>

        {/* Zoom & Physics Controls */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          <button
            onClick={() => { setIsPlaying(!isPlaying); wakePhysics(); }}
            className="btn"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => zoom(1.2)} className="btn" title="Zoom in">
            <ZoomIn size={14} />
          </button>
          <button onClick={() => zoom(0.8)} className="btn" title="Zoom out">
            <ZoomOut size={14} />
          </button>
          <button onClick={resetView} className="btn" title="Reset view">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
      />

      {/* Legend Footer */}
      <div style={{ position: 'absolute', bottom: '14px', left: '16px', display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-muted)', zIndex: 10, background: 'rgba(0,0,0,0.5)', padding: '6px 14px', borderRadius: '8px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7', boxShadow: '0 0 8px #38bdf8' }} />
          <span>Frontier (Unblocked)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />
          <span>Active</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#64748b' }} />
          <span>Blocked</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          <span>Done</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>- - -</span>
          <span>Mutex Lock</span>
        </div>
      </div>
    </div>
  );
};
