import React, { useState, useEffect, useCallback } from 'react';
import {
  Zap,
  Search,
  Sun,
  Moon,
  RefreshCw,
  Plus,
  Pin,
  Trash2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useFastrStream } from './hooks/useFastrStream';
import { useActionQueue } from './hooks/useActionQueue';
import { UndoToast } from './components/UndoToast';
import { ActionDagCanvas } from './components/ActionDagCanvas';
import { TreemapCanvas } from './components/TreemapCanvas';
import { RrfWaterfall } from './components/RrfWaterfall';
import { BiTemporalDiff } from './components/BiTemporalDiff';
import { CopyButton } from './components/CopyButton';
import { MemoryDrawer } from './components/MemoryDrawer';
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
  }, [theme]);

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
    if (activeModalMemory && activeModalMemory.id === memoryId) {
      setActiveModalMemory({ ...activeModalMemory, pinned: nextPinned });
    }

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
        if (activeModalMemory && activeModalMemory.id === memoryId) {
          setActiveModalMemory({ ...activeModalMemory, pinned: currentPinned });
        }
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
        setNewTitle('');
        setNewContent('');
        setNewFiles('');
        setIsCreateModalOpen(false);
        loadAll();
      }
    } catch (err) {
      console.error('Failed to create memory:', err);
    }
  };

  const filteredMemories = memories.filter((m) => {
    const matchMod = selectedModule === 'all' || m.module.toLowerCase() === selectedModule.toLowerCase();
    const matchQ =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMod && matchQ;
  });

  const traps = memories.filter((m) => m.kind === 'error_trap');

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Precision Instrument Top Bar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '10px 16px',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '4px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '14px'
          }}>
            ⚡
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.2px', fontFamily: 'var(--font-mono)' }}>
                FASTR<span style={{ color: 'var(--accent)' }}>MEMORY</span>
              </span>
              <span className="badge-tag" style={{ background: 'var(--accent-weak)', color: 'var(--accent)' }}>
                NODE 24 WAL
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '1px' }}>
              {status?.projectId || 'loading...'}
            </div>
          </div>
        </div>

        {/* Global Omnibar Search */}
        <div style={{ flex: 1, maxWidth: '440px', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '8px', color: 'var(--text-faint)' }} />
          <input
            id="fastr-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, error traps, files (Press /)..."
            style={{
              width: '100%',
              padding: '6px 32px 6px 30px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontSize: '12px',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <kbd style={{
            position: 'absolute',
            right: '8px',
            top: '6px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '1px 5px',
            borderRadius: '3px',
            color: 'var(--text-faint)'
          }}>
            /
          </kbd>
        </div>

        {/* Control Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary"
            title="Create new rule or error trap (Hotkey: N)"
          >
            <Plus size={13} /> New Rule
          </button>

          <div
            title={`Real-Time SSE: ${sseStatus} (Last event: ${lastEventTime || 'none'})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 9px',
              borderRadius: '4px',
              background: sseStatus === 'live' ? 'var(--success-weak)' : 'var(--risk-weak)',
              border: `1px solid ${sseStatus === 'live' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              color: sseStatus === 'live' ? 'var(--success)' : 'var(--risk)',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: sseStatus === 'live' ? 'var(--success)' : 'var(--risk)' }} />
            <span>{sseStatus === 'live' ? 'LIVE SSE' : 'OFFLINE'}</span>
          </div>

          <button onClick={toggleTheme} className="btn" style={{ padding: '5px 8px' }} title="Toggle light/dark theme">
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          <button onClick={loadAll} className="btn" style={{ padding: '5px 8px' }} title="Refresh snapshot">
            <RefreshCw size={13} />
          </button>
        </div>
      </header>

      {/* Precision KPI Ribbon */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        <div className="card-panel" style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.05em' }}>ACTIVE RULES</div>
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: '2px', color: 'var(--text)' }}>
            {loading ? '—' : status?.activeCount ?? 0}
          </div>
        </div>
        <div className="card-panel" style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.05em' }}>2.0X ERROR TRAPS</div>
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--trap)', marginTop: '2px' }}>
            {loading ? '—' : status?.trapsCount ?? 0}
          </div>
        </div>
        <div className="card-panel" style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.05em' }}>FRONTIER TASKS</div>
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent)', marginTop: '2px' }}>
            {loading ? '—' : status?.frontierCount ?? 0}
          </div>
        </div>
        <div className="card-panel" style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.05em' }}>KNOWLEDGE NODES</div>
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: '2px', color: 'var(--text)' }}>
            {loading ? '—' : status?.graphNodesCount ?? 0}
          </div>
        </div>
        <div className="card-panel" style={{ padding: '12px 16px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.05em' }}>CONTRADICTIONS</div>
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: (status?.conflictsCount ?? 0) > 0 ? 'var(--risk)' : 'var(--text)', marginTop: '2px' }}>
            {loading ? '—' : status?.conflictsCount ?? 0}
          </div>
        </div>
      </section>

      {/* Precision Segmented Tab Bar */}
      <nav style={{
        display: 'flex',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '3px',
        gap: '4px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'overview', label: 'OVERVIEW', count: null },
          { id: 'memories', label: 'RULES & TRAPS', count: memories.length },
          { id: 'traps', label: '2.0X TRAPS', count: traps.length },
          { id: 'dag', label: 'ACTION DAG', count: actions.length },
          { id: 'treemap', label: 'TREEMAP', count: null },
          { id: 'rrf', label: 'RRF TRACE', count: null },
          { id: 'conflicts', label: 'CONTRADICTIONS', count: conflicts.length },
        ].map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id as TabType)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-mono)',
                border: 'none',
                background: isActive ? 'var(--accent-weak)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  background: isActive ? 'var(--accent)' : 'var(--bg-subtle)',
                  color: isActive ? '#fff' : 'var(--text-faint)'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main style={{ minHeight: '440px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div className="card-panel" style={{ height: '140px', background: 'var(--surface)' }} />
            <div className="card-panel" style={{ height: '140px', background: 'var(--surface)' }} />
            <div className="card-panel" style={{ height: '140px', background: 'var(--surface)' }} />
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW */}
            {currentTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="card-panel" style={{ padding: '20px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Sovereign Cognitive Agent Memory Engine</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>
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

                <div className="card-panel" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-faint)', letterSpacing: '0.04em', marginBottom: '12px' }}>
                    CLI Shortcuts
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <code style={{ color: 'var(--accent)' }}>fastrmemory status</code>
                      <CopyButton text="fastrmemory status" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <code style={{ color: 'var(--accent)' }}>fastrmemory bench</code>
                      <CopyButton text="fastrmemory bench" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <code style={{ color: 'var(--accent)' }}>fastrmemory sync</code>
                      <CopyButton text="fastrmemory sync" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HIGH-DENSITY RULES & TRAPS TABLE */}
            {currentTab === 'memories' && (
              <div>
                {/* Filter Toolbar */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
                    <button
                      onClick={() => setSelectedModule('all')}
                      className={`btn ${selectedModule === 'all' ? 'btn-primary' : ''}`}
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      All Modules ({memories.length})
                    </button>
                    {(status?.modules || []).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedModule(m)}
                        className={`btn ${selectedModule === m ? 'btn-primary' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                    Showing {filteredMemories.length} item(s) &bull; Click row to inspect
                  </div>
                </div>

                {filteredMemories.length === 0 ? (
                  <div className="card-panel" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>No memories match criteria</div>
                    <p style={{ fontSize: '12px', marginTop: '4px' }}>Adjust search query or select another module.</p>
                  </div>
                ) : (
                  <div className="card-panel" style={{ overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px',
                      columnGap: '12px',
                      padding: '8px 14px',
                      background: 'var(--bg-subtle)',
                      borderBottom: '1px solid var(--border)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: 'var(--text-faint)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      <div>ID</div>
                      <div>KIND</div>
                      <div>MODULE</div>
                      <div>TITLE</div>
                      <div>PROVENANCE</div>
                      <div>REWARD</div>
                      <div style={{ textAlign: 'right' }}>PIN</div>
                    </div>

                    {/* Table Rows */}
                    <div style={{ maxHeight: '640px', overflowY: 'auto' }}>
                      {filteredMemories.map((m) => {
                        const isSelected = activeModalMemory?.id === m.id;
                        return (
                          <div
                            key={m.id}
                            onClick={() => setActiveModalMemory(m)}
                            className={`instrument-row ${isSelected ? 'active' : ''}`}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px',
                              columnGap: '12px',
                              alignItems: 'center',
                              fontSize: '12px'
                            }}
                          >
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.id}>
                              {m.id}
                            </div>
                            <div>
                              <span
                                className="badge-tag"
                                style={{
                                  background: m.kind === 'error_trap' ? 'var(--trap-weak)' : 'var(--accent-weak)',
                                  color: m.kind === 'error_trap' ? 'var(--trap)' : 'var(--accent)',
                                }}
                              >
                                {m.kind === 'error_trap' ? 'TRAP' : m.kind.toUpperCase()}
                              </span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '11.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.module}>
                              {m.module}
                            </div>
                            <div style={{ fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '6px' }} title={m.title}>
                              {m.title}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {m.provenance_hash ? (
                                <span className="badge-tag" style={{ background: 'rgba(52, 211, 153, 0.15)', color: 'var(--success)' }}>
                                  🔒 prov_{m.provenance_hash.slice(0, 6)}
                                </span>
                              ) : (
                                <span style={{ fontSize: '10px', color: 'var(--text-faint)' }}>legacy</span>
                              )}
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>@{m.agent_id || 'default'}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '11.5px' }}>
                              {m.reward_score.toFixed(2)}x
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTogglePin(m.id, m.pinned);
                                }}
                                className="btn"
                                style={{ padding: '2px 6px', fontSize: '10px' }}
                                title={m.pinned ? 'Unpin' : 'Pin'}
                              >
                                <Pin size={11} color={m.pinned ? '#8b5cf6' : 'var(--text-muted)'} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: 2.0X ERROR TRAPS DEDICATED TABLE */}
            {currentTab === 'traps' && (
              <div>
                <div style={{
                  padding: '10px 14px',
                  background: 'var(--trap-weak)',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--trap)',
                  fontSize: '12px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <ShieldAlert size={15} />
                  <span>
                    Error traps receive an automatic <b>2.0x recall boost</b> to proactively prevent AI agents from repeating known bugs.
                  </span>
                </div>

                <div className="card-panel" style={{ overflow: 'hidden' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(160px, 1.2fr) 120px 2fr 160px 100px',
                    columnGap: '12px',
                    padding: '8px 14px',
                    background: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--text-faint)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <div>TRAP ID</div>
                    <div>MODULE</div>
                    <div>WARNING HEADLINE</div>
                    <div>LINKED FILES</div>
                    <div style={{ textAlign: 'right' }}>RECALL BOOST</div>
                  </div>

                  <div style={{ maxHeight: '640px', overflowY: 'auto' }}>
                    {traps.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setActiveModalMemory(m)}
                        className="instrument-row"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'minmax(160px, 1.2fr) 120px 2fr 160px 100px',
                          columnGap: '12px',
                          alignItems: 'center',
                          fontSize: '12px'
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--trap)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.id}>
                          {m.id}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.module}>
                          {m.module}
                        </div>
                        <div style={{ fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '6px' }} title={m.title}>
                          {m.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={m.linked_files && m.linked_files.length > 0 ? m.linked_files.join(', ') : 'project-wide'}>
                          {m.linked_files && m.linked_files.length > 0 ? m.linked_files.join(', ') : 'project-wide'}
                        </div>
                        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--trap)', fontWeight: 600 }}>
                          2.0x BOOST
                        </div>
                      </div>
                    ))}
                  </div>
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
                <div style={{ marginBottom: '12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  Contradictions detected between active memories. Use 1-click resolution with optimistic 6-second rollback window.
                </div>
                {conflicts.length === 0 ? (
                  <div className="card-panel" style={{ padding: '36px', textAlign: 'center', color: 'var(--success)' }}>
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
        <div className="floating-alert">
          <span>{liveNotification}</span>
          <button onClick={() => setLiveNotification(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
        </div>
      )}

      {/* Linear & Hippo Style Slide-Over Drawer */}
      <MemoryDrawer
        memory={activeModalMemory}
        onClose={() => setActiveModalMemory(null)}
        onTogglePin={handleTogglePin}
        onForget={handleForgetMemory}
      />

      {/* Action Task Detail Modal */}
      {activeModalAction && (
        <div
          onClick={() => setActiveModalAction(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card-panel"
            style={{ width: '90%', maxWidth: '540px', padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{activeModalAction.id}] &bull; P{activeModalAction.priority}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>{activeModalAction.title}</h3>
              </div>
              <button onClick={() => setActiveModalAction(null)} className="btn" style={{ padding: '3px 7px' }}>✕</button>
            </div>
            <div style={{ marginTop: '14px', fontSize: '12.5px', lineHeight: '1.5', color: 'var(--text-muted)' }}>
              {activeModalAction.description || 'No detailed task description provided.'}
            </div>
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)' }}>
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}
        >
          <form
            onSubmit={handleCreateMemory}
            onClick={(e) => e.stopPropagation()}
            className="card-panel"
            style={{ width: '90%', maxWidth: '520px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Record Memory / Error Trap</h3>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn" style={{ padding: '3px 7px' }}>✕</button>
            </div>

            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, display: 'block', marginBottom: '3px', color: 'var(--text-muted)' }}>Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Always Use BigEndian for Binary Protocol"
                style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '12px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, display: 'block', marginBottom: '3px', color: 'var(--text-muted)' }}>Rule Content</label>
              <textarea
                required
                rows={4}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Explain the pattern, gotcha, or fix in detail..."
                style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '12px', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, display: 'block', marginBottom: '3px', color: 'var(--text-muted)' }}>Module</label>
                <input
                  type="text"
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  placeholder="e.g. auth, api, db"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '12px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, display: 'block', marginBottom: '3px', color: 'var(--text-muted)' }}>Type</label>
                <select
                  value={newKind}
                  onChange={(e) => setNewKind(e.target.value as any)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '12px', outline: 'none' }}
                >
                  <option value="rule">Rule (Verified)</option>
                  <option value="error_trap">Error Trap [2.0x Boost]</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, display: 'block', marginBottom: '3px', color: 'var(--text-muted)' }}>Linked Files (comma separated)</label>
              <input
                type="text"
                value={newFiles}
                onChange={(e) => setNewFiles(e.target.value)}
                placeholder="src/auth.ts, src/server.ts"
                style={{ width: '100%', padding: '7px 10px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '12px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
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
