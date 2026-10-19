import React, { useState, useEffect } from 'react';
import {
  Zap,
  Brain,
  ShieldAlert,
  GitBranch,
  LayoutGrid,
  Activity,
  Swords,
  Search,
  Sun,
  Moon,
  RefreshCw,
  ExternalLink,
  Pin,
  CheckCircle,
  FileCode,
  Tag,
} from 'lucide-react';
import { useFastrStream } from './hooks/useFastrStream';
import { useActionQueue } from './hooks/useActionQueue';
import { UndoToast } from './components/UndoToast';
import { ActionDagCanvas } from './components/ActionDagCanvas';
import { TreemapCanvas } from './components/TreemapCanvas';
import { RrfWaterfall } from './components/RrfWaterfall';
import { BiTemporalDiff } from './components/BiTemporalDiff';
import type { FastrStatus, MemoryItem, ActionItem, ConflictItem } from './types';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentTab, setCurrentTab] = useState<'overview' | 'memories' | 'traps' | 'dag' | 'treemap' | 'rrf' | 'conflicts'>('overview');
  
  const [status, setStatus] = useState<FastrStatus | null>(null);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [actionEdges, setActionEdges] = useState<any[]>([]);
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [activeModalMemory, setActiveModalMemory] = useState<MemoryItem | null>(null);
  const [activeModalAction, setActiveModalAction] = useState<ActionItem | null>(null);

  const { pendingAction, countdown, enqueue, undo } = useActionQueue();

  // Load initial data
  const loadAll = async () => {
    try {
      const [resStatus, resMem, resAct, resConf] = await Promise.all([
        fetch('/api/status').then((r) => r.json()),
        fetch('/api/memories').then((r) => r.json()),
        fetch('/api/actions').then((r) => r.json()),
        fetch('/api/conflicts').then((r) => r.json()),
      ]);

      setStatus(resStatus);
      setMemories(resMem);
      setActions(resAct.actions || []);
      setActionEdges(resAct.edges || []);
      setConflicts(resConf || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Connect Real-Time Server-Sent Events (SSE)
  const { status: sseStatus, lastEventTime } = useFastrStream({
    onEvent: () => {
      loadAll();
    },
  });

  // Theme switcher
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('fastr-search-input')?.focus();
      } else if (e.key === 'Escape') {
        setActiveModalMemory(null);
        setActiveModalAction(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Conflict resolution handler with 6-second undo
  const handleResolveConflict = (conflictId: number, keepMemoryId: string, forgetLoser: boolean) => {
    const previousConflicts = [...conflicts];
    // Optimistic UI update
    setConflicts((c) => c.filter((x) => x.id !== conflictId));

    enqueue(
      `Resolved conflict #${conflictId} (Kept ${keepMemoryId})`,
      async () => {
        await fetch('/api/conflicts/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conflictId, keepMemoryId, forgetLoser, reason: 'Resolved via Fastr Dashboard' }),
        });
        loadAll();
      },
      () => {
        // Rollback
        setConflicts(previousConflicts);
      }
    );
  };

  // Filter memories
  const filteredMemories = memories.filter((m) => {
    const matchMod = selectedModule === 'all' || m.module === selectedModule;
    const matchQ =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMod && matchQ;
  });

  const traps = memories.filter((m) => m.kind === 'error_trap');

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Brand Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 14px var(--accent-glow)' }}>
            <Zap size={22} fill="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚡ FastrMemory <span style={{ fontSize: '12px', fontWeight: 500, padding: '2px 8px', borderRadius: '6px', background: 'var(--accent-weak)', color: 'var(--accent)' }}>Hub</span>
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Node 24 WAL &bull; <code style={{ color: 'var(--accent)' }}>{status?.projectId || 'connecting...'}</code>
            </p>
          </div>
        </div>

        {/* Live SSE Status & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            title={`Real-Time SSE: ${sseStatus} (Last event: ${lastEventTime || 'none'})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: sseStatus === 'live' ? 'var(--success-weak)' : 'var(--risk-weak)',
              border: `1px solid ${sseStatus === 'live' ? 'var(--success)' : 'var(--risk)'}`,
              color: sseStatus === 'live' ? 'var(--success)' : 'var(--risk)',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: sseStatus === 'live' ? 'var(--success)' : 'var(--risk)' }} />
            <span>{sseStatus === 'live' ? 'Live SSE' : 'Offline'}</span>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <button
            onClick={loadAll}
            title="Refresh snapshot"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 10px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </header>

      {/* KPI Stats Bar */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>{status?.activeCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Rules</div>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--trap)' }}>{status?.trapsCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2.0x Error Traps</div>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{status?.frontierCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ready Frontier Tasks</div>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#38bdf8' }}>{status?.graphNodesCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Knowledge Nodes</div>
        </div>
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--risk)' }}>{status?.conflictsCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Open Contradictions</div>
        </div>
      </section>

      {/* Nav Tabs Bar */}
      <nav style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'memories', label: `🧠 Memories (${memories.length})` },
          { id: 'traps', label: `⚠️ 2.0x Traps (${traps.length})` },
          { id: 'dag', label: `🔀 Action DAG (${actions.length})` },
          { id: 'treemap', label: '🗺️ Treemap' },
          { id: 'rrf', label: '⏱️ RRF Diagnostics' },
          { id: 'conflicts', label: `⚔️ Contradictions (${conflicts.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as any)}
            style={{
              background: currentTab === tab.id ? 'var(--accent)' : 'transparent',
              color: currentTab === tab.id ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Areas */}
      <main style={{ minHeight: '400px' }}>
        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Cognitive Agent Architecture</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                FastrMemory runs natively in Node 24 with <b>zero external background daemons</b>. Rules, error traps, and decisions are indexed via SQLite WAL mode, mirrored to <code>.fastr/pages/*.md</code> for Git pull requests, and fused via Triple-Stream RRF ($k=60$).
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setCurrentTab('traps')}
                  style={{ background: 'var(--trap-weak)', border: '1px solid var(--trap)', color: 'var(--trap)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Inspect 2.0x Error Traps &rarr;
                </button>
                <button
                  onClick={() => setCurrentTab('dag')}
                  style={{ background: 'var(--accent-weak)', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Open Action DAG &rarr;
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>CLI Shortcuts</h3>
              <ul style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '2', listStyle: 'none' }}>
                <li><code>fastrmemory status</code> &bull; Health overview</li>
                <li><code>fastrmemory bench</code> &bull; Hit@5 benchmarks</li>
                <li><code>fastrmemory recall &lt;q&gt;</code> &bull; RRF search</li>
                <li><code>fastrmemory learn</code> &bull; Git history extractor</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: ALL MEMORIES */}
        {currentTab === 'memories' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
                <input
                  id="fastr-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Press / to instant search by keyword, file, or [mem_id]..."
                  style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
                />
              </div>

              {/* Module Filter Pills */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                <button
                  onClick={() => setSelectedModule('all')}
                  style={{
                    background: selectedModule === 'all' ? 'var(--accent)' : 'var(--surface)',
                    color: selectedModule === 'all' ? '#fff' : 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  All Modules
                </button>
                {(status?.modules || []).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedModule(m)}
                    style={{
                      background: selectedModule === m ? 'var(--accent)' : 'var(--surface)',
                      color: selectedModule === m ? '#fff' : 'var(--text-muted)',
                      border: '1px solid var(--border)',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Memories Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {filteredMemories.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActiveModalMemory(m)}
                  style={{
                    padding: '16px',
                    background: 'var(--surface)',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    borderLeft: `4px solid ${m.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'transform 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        [{m.id}] &bull; {m.module}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: m.kind === 'error_trap' ? 'var(--trap-weak)' : 'var(--accent-weak)',
                          color: m.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)',
                        }}
                      >
                        {m.kind.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '6px', color: 'var(--text)' }}>{m.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', maxHeight: '42px', overflow: 'hidden' }}>{m.content}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                    <span>Files: {m.linked_files?.length || 0}</span>
                    <span>Score: <b>{m.reward_score}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 2.0X ERROR TRAPS */}
        {currentTab === 'traps' && (
          <div>
            <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
              Error traps receive a <b>2.0x recall boost</b> during query fusion to prevent repeated coding errors.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {traps.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActiveModalMemory(m)}
                  style={{
                    padding: '16px',
                    background: 'var(--surface)',
                    borderRadius: '10px',
                    border: '1px solid var(--trap)',
                    borderLeft: '5px solid var(--trap)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--trap)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>[TRAP 2.0X]</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.module}</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '6px' }}>{m.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{m.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACTION DAG CANVAS */}
        {currentTab === 'dag' && (
          <ActionDagCanvas
            actions={actions}
            edges={actionEdges}
            onSelectAction={(action) => setActiveModalAction(action)}
          />
        )}

        {/* TAB 5: TREEMAP */}
        {currentTab === 'treemap' && (
          <TreemapCanvas
            memories={memories}
            onSelectMemory={(m) => setActiveModalMemory(m)}
          />
        )}

        {/* TAB 6: RRF WATERFALL */}
        {currentTab === 'rrf' && (
          <RrfWaterfall memories={memories} />
        )}

        {/* TAB 7: CONFLICTS & MYERS DIFF */}
        {currentTab === 'conflicts' && (
          <div>
            <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
              Active contradictions detected across rules. Use 1-click resolution with optimistic 6-second rollback window.
            </div>
            {conflicts.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', color: 'var(--success)' }}>
                ✨ Zero open contradictions detected. Knowledge base is 100% consistent!
              </div>
            ) : (
              conflicts.map((c) => (
                <BiTemporalDiff
                  key={c.id}
                  conflict={c}
                  memoryA={memories.find((m) => m.id === c.memory_a_id)}
                  memoryB={memories.find((m) => m.id === c.memory_b_id)}
                  onResolve={handleResolveConflict}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Memory Detail Modal */}
      {activeModalMemory && (
        <div
          onClick={() => setActiveModalMemory(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '90%', maxWidth: '580px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{activeModalMemory.id}]</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>{activeModalMemory.title}</h3>
              </div>
              <button onClick={() => setActiveModalMemory(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ marginTop: '16px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {activeModalMemory.content}
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Module: <b>{activeModalMemory.module}</b></span>
              <span>Reward: <b>{activeModalMemory.reward_score}</b></span>
            </div>
          </div>
        </div>
      )}

      {/* Action Detail Modal */}
      {activeModalAction && (
        <div
          onClick={() => setActiveModalAction(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '90%', maxWidth: '580px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{activeModalAction.id}] &bull; P{activeModalAction.priority}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>{activeModalAction.title}</h3>
              </div>
              <button onClick={() => setActiveModalAction(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ marginTop: '16px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {activeModalAction.description || 'No extended task description provided.'}
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Status: <b style={{ textTransform: 'capitalize' }}>{activeModalAction.status}</b></span>
              <span>Assignee: <b>{activeModalAction.assigned_to || 'Unassigned (Open)'}</b></span>
            </div>
          </div>
        </div>
      )}

      {/* Floating 6-second Undo Toast */}
      <UndoToast pendingAction={pendingAction} countdown={countdown} onUndo={undo} />
    </div>
  );
};
