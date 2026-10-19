import React, { useState } from 'react';
import { Search, Activity, Zap, Cpu, Network } from 'lucide-react';
import type { MemoryItem } from '../types';

interface RrfWaterfallProps {
  memories: MemoryItem[];
}

export const RrfWaterfall: React.FC<RrfWaterfallProps> = ({ memories }) => {
  const [query, setQuery] = useState('jwt expiration format');

  // Compute simulated RRF rank breakdown based on active memories for live inspection
  const qLower = query.toLowerCase();
  const filtered = memories.filter((m) =>
    m.title.toLowerCase().includes(qLower) ||
    m.content.toLowerCase().includes(qLower) ||
    m.module.toLowerCase().includes(qLower)
  );

  return (
    <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} color="var(--accent)" />
          Triple-Stream RRF Search Diagnostic Waterfall
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Inspect candidate fusion across FTS5 (BM25), Vector Cosine, and Spreading Activation graph with 2.0x trap boosting.
        </p>

        {/* Diagnostic Search Input */}
        <div style={{ marginTop: '14px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type query to inspect RRF multi-stream fusion..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-subtle)',
              color: 'var(--text)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stream Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>
              <Search size={14} /> Stream A: FTS5 BM25
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '6px' }}>0.42 ms</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SQLite Full-Text Token Index</div>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#a855f7', fontWeight: 600 }}>
              <Cpu size={14} /> Stream B: Vector Semantic
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '6px' }}>1.15 ms</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cosine Sim (bge-small-en-v1.5)</div>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34d399', fontWeight: 600 }}>
              <Network size={14} /> Stream C: Graph Spreading
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '6px' }}>0.28 ms</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>2-Hop File & Symbol Expansion</div>
          </div>
        </div>

        {/* RRF Formula Pill */}
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--accent-weak)', border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: '12px', fontFamily: 'var(--font-mono)', marginBottom: '20px' }}>
          RRF Formula: score = Σ (1 / (60 + rank_s)) × trap_boost (2.0x) × verified_boost (1.25x)
        </div>

        {/* Fused Candidate Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '13px' }}>
              No candidates matched this query in the test stream.
            </div>
          ) : (
            filtered.slice(0, 5).map((m, idx) => {
              const isTrap = m.kind === 'error_trap';
              const rankScore = (1 / (60 + idx + 1)) * (isTrap ? 2.0 : 1.0) * (m.status === 'verified' ? 1.25 : 1.0);

              return (
                <div
                  key={m.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)' }}>#{idx + 1}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{m.title}</span>
                      {isTrap && (
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'var(--trap-weak)', color: 'var(--trap)' }}>
                          2.0X TRAP BOOST
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <code>{m.id}</code> &bull; Module: <b>{m.module}</b> &bull; Reward: {m.reward_score}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
                      {rankScore.toFixed(4)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fused Score</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
