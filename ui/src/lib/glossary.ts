/** Short explanations surfaced through the <Term> tooltip component. */
export const GLOSSARY = {
  trap: 'An error trap records a bug and its fix. Traps get a 2.0x recall boost so agents see them before repeating the mistake.',
  staging:
    'Staging memories were recorded by an agent but not yet verified. They graduate to verified when an agent calls fastr_handoff with verifyStaging: true.',
  verified: 'Verified memories are trusted rules. They get a 1.25x multiplier in recall ranking.',
  superseded: 'Superseded memories were replaced by a newer version (or forgotten). They stay in history but are no longer recalled.',
  reward:
    'Reward score starts at 1.0 and moves with fastr_feedback (+0.2 good, -0.5 bad, range 0.1 to 3.0). It multiplies recall ranking; at 0.2 or below a memory goes dormant.',
  recall: 'How many times agents retrieved this memory through fastr_recall.',
  rrf: 'Reciprocal Rank Fusion merges three ranked lists (BM25 keywords, vector similarity, graph spreading) with score = sum of 1/(60 + rank).',
  frontier: 'Frontier tasks are actions whose dependencies are all done, so an agent can claim them right now.',
  conflict: 'A conflict is a pair of active memories that contradict each other. Resolve it by keeping one, or keep both and lower the other reward.',
  provenance: 'A SHA-256 signature over the memory author, content and timestamp. Verification fails if the stored text was edited outside FastrMemory.',
  embedding: 'Share of memories with a local vector embedding. Memories without one can only be found by keywords and graph links.',
  spool: 'When the database is locked, writes are queued in a spool file and committed on the next successful write.',
  pinned: 'Pinned memories sort to the top of memory lists so they stay in view.',
  supersession: 'Each superseded version points to the memory that replaced it. The chain shows how a rule evolved.',
} as const;

export type GlossaryKey = keyof typeof GLOSSARY;
