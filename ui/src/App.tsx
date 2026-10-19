import React, { useState, useEffect, useCallback } from 'react';
import {
  Zap,
  Brain,
  ShieldAlert,
  GitBranch,
  LayoutGrid,
  Activity,
  Search,
  Sun,
  Moon,
  RefreshCw,
  Plus,
  Pin,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { useFastrStream } from './hooks/useFastrStream';
import { useActionQueue } from './hooks/useActionQueue';
import { UndoToast } from './components/UndoToast';
import { ActionDagCanvas } from './components/ActionDagCanvas';
import { TreemapCanvas } from './components/TreemapCanvas';
import { RrfWaterfall } from './components/RrfWaterfall';
import { BiTemporalDiff } from './components/BiTemporalDiff';
import { CopyButton } from './components/CopyButton';
import { MarkdownView } from './components/MarkdownView';
import type { FastrStatus, MemoryItem, ActionItem, ConflictItem } from './types';

type TabType = 'overview' | 'memories' | 'traps' | 'dag' | 'treemap' | 'rrf' | 'conflicts';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('fastr-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<FastrStatus | null>(null);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [actionEdges, setActionEdges] = useState<any[]>([]);
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [activeModalMemory, setActiveModalMemory] = useState<MemoryItem | null>(null);
  const [activeModalAction, setActiveModalAction] = useState<ActionItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [liveNotification, setLiveNotification] = useState<string | null>(null);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newModule, setNewModule] = useState('general');
  const [newKind, setNewKind] = useState<'rule' | 'error_trap'>('rule');
  const [newFiles, setNewFiles] = useState('');

  const { pendingAction, countdown, enqueue, undo } = useActionQueue();

  // Load all snapshot data
  const loadAll = useCallback(async () => {
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
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch FastrMemory snapshot:', err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // URL Hash Routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (['overview', 'memories', 'traps', 'dag', 'treemap', 'rrf', 'conflicts'].includes(hash)) {
        setCurrentTab(hash as TabType);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const switchTab = (tab: TabType) => {
    setCurrentTab(tab);
    window.location.hash = `#/${tab}`;
  };

  // Real-Time Server-Sent Events (SSE) Multi-Agent Stream
  const { status: sseStatus, lastEventTime } = useFastrStream({
    onEvent: (evt, data) => {
      loadAll();
      if (evt === 'trap_logged') {
        setLiveNotification(`⚠️ Active Error Trap Logged: "${data?.title || 'Unknown Trap'}"`);
      } else if (evt === 'action_claimed') {
        setLiveNotification(`⚡ Agent [${data?.claimedBy || 'agent'}] claimed task: "${data?.title || data?.actionId}"`);
      } else if (evt === 'action_completed') {
        setLiveNotification(`✅ Action completed: "${data?.title || data?.actionId}"`);
      }
    },
  });

  useEffect(() => {
    if (!liveNotification) return;
    const t = setTimeout(() => setLiveNotification(null), 4500);
    return () => clearTimeout(t);
  }, [liveNotification]);

  // Theme switcher & persistence
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('fastr-theme', nextTheme);
    } catch {}
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA';
      if (e.key === '/' && !isInput) {
        e.preventDefault();
        document.getElementById('fastr-search-input')?.focus();
      } else if (e.key === 'Escape') {
        setActiveModalMemory(null);
        setActiveModalAction(null);
        setIsCreateModalOpen(false);
      } else if (!isInput) {
        if (e.key === '1') { setCurrentTab('overview'); window.location.hash = '#/overview'; }
        else if (e.key === '2') { setCurrentTab('memories'); window.location.hash = '#/memories'; }
        else if (e.key === '3') { setCurrentTab('traps'); window.location.hash = '#/traps'; }
        else if (e.key === '4') { setCurrentTab('dag'); window.location.hash = '#/dag'; }
        else if (e.key === '5') { setCurrentTab('treemap'); window.location.hash = '#/treemap'; }
        else if (e.key === '6') { setCurrentTab('rrf'); window.location.hash = '#/rrf'; }
        else if (e.key === '7') { setCurrentTab('conflicts'); window.location.hash = '#/conflicts'; }
        else if (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'c') { setIsCreateModalOpen(true); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Conflict resolution handler with optimistic 6s undo
  const handleResolveConflict = (conflictId: number, keepMemoryId: string, forgetLoser: boolean) => {
    const previousConflicts = [...conflicts];
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
        setConflicts(previousConflicts);
      }
    );
  };

  // Pin / Unpin handler
  const handleTogglePin = (memoryId: string, currentPinned: number) => {
    const nextPinned = currentPinned ? 0 : 1;
    setMemories((mems) => mems.map((m) => (m.id === memoryId ? { ...m, pinned: nextPinned } : m)));

    enqueue(
      `${nextPinned ? 'Pinned' : 'Unpinned'} rule ${memoryId}`,
      async () => {
        await fetch('/api/memories/pin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memoryId, pinned: Boolean(nextPinned) }),
        });
        loadAll();
      },
      () => {
        setMemories((mems) => mems.map((m) => (m.id === memoryId ? { ...m, pinned: currentPinned } : m)));
      }
    );
  };

  // Forget memory handler
  const handleForgetMemory = (memoryId: string) => {
    const target = memories.find((m) => m.id === memoryId);
    if (!target) return;

    setMemories((mems) => mems.filter((m) => m.id !== memoryId));
    setActiveModalMemory(null);

    enqueue(
      `Forgot memory [${memoryId}]`,
      async () => {
        await fetch('/api/memories/forget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memoryId, reason: 'User requested forget via Fastr Dashboard' }),
        });
        loadAll();
      },
      () => {
        setMemories((mems) => [...mems, target]);
      }
    );
  };

  // Create new memory handler
  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          module: newModule.trim() || 'general',
          kind: newKind,
          files: newFiles ? newFiles.split(',').map((f) => f.trim()).filter(Boolean) : [],
        }),
      });

      if (res.ok) {
        setIsCreateModalOpen(false);
        setNewTitle('');
        setNewContent('');
        setNewFiles('');
        loadAll();
      }
    } catch (err) {
      alert('Failed to create memory: ' + (err as any).message);
    }
  };

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
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 14px var(--accent-glow)' }}>
            <Zap size={22} fill="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚡ FastrMemory <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: 'var(--accent-weak)', color: 'var(--accent)' }}>Sovereign Hub</span>
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Node 24 WAL &bull; <code style={{ color: 'var(--accent)' }}>{status?.projectId || 'loading...'}</code>
            </p>
          </div>
        </div>

        {/* Live SSE Status & Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary"
            style={{ fontWeight: 600 }}
          >
            <Plus size={15} /> New Rule / Trap
          </button>

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

          <button onClick={toggleTheme} className="btn" title="Toggle light/dark theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button onClick={loadAll} className="btn" title="Refresh state">
            <RefreshCw size={15} />
          </button>
        </div>
      </header>

      {/* KPI Stats Bar */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div className="card-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{loading ? '—' : status?.activeCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Rules</div>
        </div>
        <div className="card-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--trap)' }}>{loading ? '—' : status?.trapsCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2.0x Error Traps</div>
        </div>
        <div className="card-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{loading ? '—' : status?.frontierCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ready Frontier Tasks</div>
        </div>
        <div className="card-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#38bdf8' }}>{loading ? '—' : status?.graphNodesCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Knowledge Nodes</div>
        </div>
        <div className="card-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--risk)' }}>{loading ? '—' : status?.conflictsCount ?? 0}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Contradictions</div>
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
            onClick={() => switchTab(tab.id as TabType)}
            className={`btn btn-pill ${currentTab === tab.id ? 'btn-primary' : ''}`}
            style={{ fontWeight: 600, border: 'none' }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main style={{ minHeight: '440px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="skeleton-box" style={{ height: '140px' }} />
            <div className="skeleton-box" style={{ height: '140px' }} />
            <div className="skeleton-box" style={{ height: '140px' }} />
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW */}
            {currentTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="card-panel" style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Cognitive Agent Memory System</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                    FastrMemory operates inside Node 24 with <b>zero external background daemons</b>. Rules, bug-fix traps, and architectural decisions are persisted via SQLite WAL mode, mirrored to <code>.fastr/pages/*.md</code> for Git pull requests, and fused via Triple-Stream RRF ($k=60$).
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => switchTab('traps')} className="btn btn-primary">
                      Inspect 2.0x Error Traps &rarr;
                    </button>
                    <button onClick={() => switchTab('dag')} className="btn">
                      Open Action DAG &rarr;
                    </button>
                  </div>
                </div>

                <div className="card-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>Instant CLI Shortcuts</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <code>fastrmemory status</code>
                      <CopyButton text="fastrmemory status" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <code>fastrmemory bench</code>
                      <CopyButton text="fastrmemory bench" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <code>fastrmemory learn</code>
                      <CopyButton text="fastrmemory learn" />
                    </div>
                  </div>
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
                      placeholder="Press / to search by keyword, file, or [mem_id]..."
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 36px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        background: 'var(--surface)',
                        color: 'var(--text)',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                    <button
                      onClick={() => setSelectedModule('all')}
                      className={`btn btn-pill ${selectedModule === 'all' ? 'btn-primary' : ''}`}
                    >
                      All Modules
                    </button>
                    {(status?.modules || []).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedModule(m)}
                        className={`btn btn-pill ${selectedModule === m ? 'btn-primary' : ''}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredMemories.length === 0 ? (
                  <div className="card-panel" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>No memories match your criteria</div>
                    <p style={{ fontSize: '12px', marginTop: '4px', maxWidth: '380px', margin: '4px auto 16px auto' }}>
                      Try adjusting your search query, selecting a different module filter, or record a new rule.
                    </p>
                    <button onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary" style={{ margin: '0 auto' }}>
                      <Plus size={14} /> Record New Rule
                    </button>
                  </div>
                ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                  {filteredMemories.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setActiveModalMemory(m)}
                      className="card-panel card-interactive"
                      style={{
                        padding: '16px',
                        borderLeft: `4px solid ${m.kind === 'error_trap' ? 'var(--trap)' : m.pinned ? '#8b5cf6' : 'var(--accent)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            [{m.id}] &bull; {m.module}
                          </span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {m.pinned === 1 && <span className="badge-tag" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>PINNED</span>}
                            <span
                              className="badge-tag"
                              style={{
                                background: m.kind === 'error_trap' ? 'var(--trap-weak)' : 'var(--accent-weak)',
                                color: m.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)',
                              }}
                            >
                              {m.kind.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '6px' }}>{m.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', maxHeight: '42px', overflow: 'hidden' }}>{m.content}</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                        <span>Files: {m.linked_files?.length || 0}</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <CopyButton text={m.id} label="ID" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTogglePin(m.id, m.pinned);
                            }}
                            className="btn"
                            style={{ padding: '3px 8px', fontSize: '11px' }}
                            title={m.pinned ? 'Unpin rule' : 'Pin rule'}
                          >
                            <Pin size={12} color={m.pinned ? '#8b5cf6' : 'var(--text-muted)'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* TAB 3: 2.0X ERROR TRAPS */}
            {currentTab === 'traps' && (
              <div>
                <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Error traps automatically receive a <b>2.0x boost</b> during recall to prevent AI agents from repeating known bugs.
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                  {traps.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setActiveModalMemory(m)}
                      className="card-panel card-interactive"
                      style={{
                        padding: '16px',
                        borderLeft: '5px solid var(--trap)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="badge-tag" style={{ background: 'var(--trap-weak)', color: 'var(--trap)' }}>
                          [TRAP 2.0X]
                        </span>
                        <CopyButton text={m.id} label="ID" />
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>{m.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{m.content}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span>Module: <b>{m.module}</b></span>
                        <span>Score: <b>{m.reward_score}</b></span>
                      </div>
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

            {/* TAB 5: SQUARIFIED TREEMAP CANVAS */}
            {currentTab === 'treemap' && (
              <TreemapCanvas
                memories={memories}
                onSelectMemory={(m) => setActiveModalMemory(m)}
              />
            )}

            {/* TAB 6: RRF WATERFALL DIAGNOSTICS */}
            {currentTab === 'rrf' && (
              <RrfWaterfall memories={memories} />
            )}

            {/* TAB 7: CONFLICTS & LINE DIFF */}
            {currentTab === 'conflicts' && (
              <div>
                <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Contradictions detected between active memories. Use 1-click resolution with optimistic 6-second rollback window.
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
          </>
        )}
      </main>

      {/* Floating Multi-Agent Real-Time Live Notification Banner */}
      {liveNotification && (
        <div style={{
          position: 'fixed',
          top: '16px',
          right: '24px',
          zIndex: 9999,
          background: 'var(--bg-panel)',
          border: '1px solid var(--accent)',
          borderRadius: '8px',
          padding: '10px 16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--text)'
        }}>
          <span>{liveNotification}</span>
          <button onClick={() => setLiveNotification(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
        </div>
      )}

      {/* Memory Detail Modal with Copy & Forget Actions */}
      {activeModalMemory && (
        <div
          onClick={() => setActiveModalMemory(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card-panel"
            style={{ width: '90%', maxWidth: '620px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{activeModalMemory.id}]</span>
                  {activeModalMemory.provenance_hash && (
                    <span className="badge-tag" style={{ fontSize: '10px', background: 'rgba(52, 211, 153, 0.15)', color: '#10b981', border: '1px solid rgba(52, 211, 153, 0.3)' }} title={`SHA-256 Provenance Signature: ${activeModalMemory.provenance_hash}`}>
                      🔒 prov_{activeModalMemory.provenance_hash.slice(0, 8)}
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>author: @{activeModalMemory.agent_id || 'default'}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>{activeModalMemory.title}</h3>
              </div>
              <button onClick={() => setActiveModalMemory(null)} className="btn" style={{ padding: '4px 8px' }}>✕</button>
            </div>

            {/* Structured Markdown Presentation */}
            <div style={{ marginTop: '16px', background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', maxHeight: '340px', overflowY: 'auto' }}>
              <MarkdownView content={activeModalMemory.content} />
            </div>

            {/* Linked Files */}
            {activeModalMemory.linked_files && activeModalMemory.linked_files.length > 0 && (
              <div style={{ marginTop: '14px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>Linked Files:</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {activeModalMemory.linked_files.map((f) => (
                    <span key={f} className="badge-tag" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <CopyButton text={activeModalMemory.content} label="Copy Content" />
                <CopyButton text={`fastrmemory recall "${activeModalMemory.title}"`} label="Copy CLI" />
                <button
                  onClick={() => handleTogglePin(activeModalMemory.id, activeModalMemory.pinned)}
                  className="btn"
                  style={{ fontSize: '12px' }}
                >
                  <Pin size={13} color={activeModalMemory.pinned ? '#8b5cf6' : 'var(--text-muted)'} />
                  {activeModalMemory.pinned ? 'Unpin' : 'Pin'}
                </button>
              </div>

              <button
                onClick={() => handleForgetMemory(activeModalMemory.id)}
                className="btn"
                style={{ borderColor: 'var(--risk)', color: 'var(--risk)', fontSize: '12px' }}
              >
                <Trash2 size={13} /> Forget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Task Detail Modal */}
      {activeModalAction && (
        <div
          onClick={() => setActiveModalAction(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card-panel"
            style={{ width: '90%', maxWidth: '580px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{activeModalAction.id}] &bull; P{activeModalAction.priority}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>{activeModalAction.title}</h3>
              </div>
              <button onClick={() => setActiveModalAction(null)} className="btn" style={{ padding: '4px 8px' }}>✕</button>
            </div>
            <div style={{ marginTop: '16px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              {activeModalAction.description || 'No detailed task description provided.'}
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Status: <b style={{ textTransform: 'capitalize' }}>{activeModalAction.status}</b></span>
              <span>Assignee: <b>{activeModalAction.assigned_to || 'Unassigned (Open)'}</b></span>
            </div>
          </div>
        </div>
      )}

      {/* Create Rule / Error Trap Dialog */}
      {isCreateModalOpen && (
        <div
          onClick={() => setIsCreateModalOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <form
            onSubmit={handleCreateMemory}
            onClick={(e) => e.stopPropagation()}
            className="card-panel"
            style={{ width: '90%', maxWidth: '540px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Record Memory / Error Trap</h3>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn" style={{ padding: '4px 8px' }}>✕</button>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Always Use BigEndian for Binary Protocol"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Rule Content</label>
              <textarea
                required
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Explain the pattern, gotcha, or fix in detail..."
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Module</label>
                <input
                  type="text"
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  placeholder="e.g. auth, api, db"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Type</label>
                <select
                  value={newKind}
                  onChange={(e) => setNewKind(e.target.value as any)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
                >
                  <option value="rule">Rule (Verified)</option>
                  <option value="error_trap">Error Trap [2.0x Boost]</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Linked Files (comma separated)</label>
              <input
                type="text"
                value={newFiles}
                onChange={(e) => setNewFiles(e.target.value)}
                placeholder="src/auth.ts, src/server.ts"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn">Cancel</button>
              <button type="submit" className="btn btn-primary">Save Memory</button>
            </div>
          </form>
        </div>
      )}

      {/* Floating 6-second Undo Toast */}
      <UndoToast pendingAction={pendingAction} countdown={countdown} onUndo={undo} />
    </div>
  );
};
