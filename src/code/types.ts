/** Symbol kinds the index understands. Mirrors the CHECK constraint on `symbols.kind`. */
export type SymbolKind = 'function' | 'class' | 'method' | 'interface' | 'type' | 'enum' | 'const';

export const SYMBOL_KINDS: readonly SymbolKind[] = [
  'function',
  'class',
  'method',
  'interface',
  'type',
  'enum',
  'const'
] as const;

/** A symbol as found in one file, before it is persisted. Lines are 1-based and inclusive. */
export interface ExtractedSymbol {
  name: string;
  kind: SymbolKind;
  lineStart: number;
  lineEnd: number;
  exported: boolean;
  /** Declaration text with the body stripped, used to detect a signature change. */
  signature: string;
  /**
   * The declaration's source region with the symbol's own name masked out and whitespace
   * collapsed. Two declarations with the same normalized body are the same declaration
   * regardless of what they are called or which file they live in.
   */
  normalizedBody: string;
}

/** A row from the `symbols` table. */
export interface CodeSymbol {
  id: string;
  project_id: string;
  file_path: string;
  name: string;
  kind: SymbolKind;
  line_start: number;
  line_end: number;
  exported: number;
  signature_hash: string;
  updated_at: string;
}
