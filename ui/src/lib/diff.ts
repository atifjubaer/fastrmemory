/**
 * Small LCS-based diff used for supersession version diffs and conflict comparison.
 * Tokens are words plus the whitespace that follows them, so joining tokens reproduces the text.
 */

export type DiffOp = { type: 'same' | 'added' | 'removed'; text: string };

const MAX_CELLS = 4_000_000; // ~2000 x 2000 tokens; beyond that we fall back to a coarse diff

function tokenize(text: string): string[] {
  return text.match(/\s+|[^\s]+/g) ?? [];
}

function lcsDiff(a: string[], b: string[]): DiffOp[] {
  // Trim common prefix/suffix first: cheap and keeps the DP table small for typical edits.
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }

  const prefix = a.slice(0, start);
  const suffix = a.slice(endA);
  const midA = a.slice(start, endA);
  const midB = b.slice(start, endB);
  const n = midA.length;
  const m = midB.length;

  const ops: DiffOp[] = [];
  const push = (type: DiffOp['type'], text: string) => {
    const last = ops[ops.length - 1];
    if (last && last.type === type) last.text += text;
    else ops.push({ type, text });
  };

  prefix.forEach((t) => push('same', t));

  if ((n + 1) * (m + 1) > MAX_CELLS) {
    midA.forEach((t) => push('removed', t));
    midB.forEach((t) => push('added', t));
  } else {
    // dp[i][j] = LCS length of midA[i..] and midB[j..]
    const dp: Uint32Array[] = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = midA[i] === midB[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (midA[i] === midB[j]) {
        push('same', midA[i]);
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        push('removed', midA[i++]);
      } else {
        push('added', midB[j++]);
      }
    }
    while (i < n) push('removed', midA[i++]);
    while (j < m) push('added', midB[j++]);
  }

  suffix.forEach((t) => push('same', t));
  return ops;
}

export function wordDiff(before: string, after: string): DiffOp[] {
  return lcsDiff(tokenize(before ?? ''), tokenize(after ?? ''));
}

export function diffStats(ops: DiffOp[]): { added: number; removed: number } {
  let added = 0;
  let removed = 0;
  for (const op of ops) {
    const words = op.text.trim() ? op.text.trim().split(/\s+/).length : 0;
    if (op.type === 'added') added += words;
    if (op.type === 'removed') removed += words;
  }
  return { added, removed };
}
