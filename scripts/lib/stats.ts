/**
 * Paired statistics for retrieval benchmarks.
 *
 * Every published delta in this repo is reported with a confidence interval, and every
 * strict-recall comparison uses an exact McNemar test, because the two engines are run on
 * the same cases and the correct comparison is the discordant pairs, not two independent
 * proportions.
 */

/** Wilson score interval for a binomial proportion, in percentage points. */
export function wilson(successes: number, n: number, z = 1.96): [number, number] {
  if (n === 0) return [0, 0];
  const p = successes / n;
  const denom = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / denom;
  const spread = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / denom;
  return [
    Math.round(Math.max(0, center - spread) * 1000) / 10,
    Math.round(Math.min(1, center + spread) * 1000) / 10
  ];
}

function logChoose(n: number, k: number): number {
  let sum = 0;
  for (let i = 1; i <= k; i++) sum += Math.log(n - k + i) - Math.log(i);
  return sum;
}

/**
 * Two-sided exact McNemar test on discordant pairs.
 * `b` = baseline correct / candidate wrong, `c` = baseline wrong / candidate correct.
 * Returns the exact binomial p-value; when b + c is 0 the result is p = 1.
 */
export function mcnemarExact(b: number, c: number): number {
  const n = b + c;
  if (n === 0) return 1;
  const k = Math.min(b, c);
  let tail = 0;
  for (let i = 0; i <= k; i++) tail += Math.exp(logChoose(n, i) - n * Math.LN2);
  return Math.min(1, Math.round(tail * 2 * 1e6) / 1e6);
}

/**
 * Paired bootstrap over per-case differences.
 * Resamples case indices with replacement, so the interval reflects case-level variance
 * rather than the variance of two independent samples.
 */
export function pairedBootstrap(
  diffs: number[],
  options: { iterations?: number; seed?: number } = {}
): { mean: number; low: number; high: number; iterations: number } {
  const iterations = options.iterations ?? 10_000;
  if (diffs.length === 0) return { mean: 0, low: 0, high: 0, iterations };
  const mean = diffs.reduce((sum, value) => sum + value, 0) / diffs.length;
  // Deterministic LCG so a published interval is reproducible without a seed file.
  let state = options.seed ?? 0x9e3779b9;
  const next = (): number => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
  const means: number[] = [];
  for (let i = 0; i < iterations; i++) {
    let sum = 0;
    for (let j = 0; j < diffs.length; j++) sum += diffs[Math.floor(next() * diffs.length)];
    means.push(sum / diffs.length);
  }
  means.sort((a, b) => a - b);
  const at = (q: number): number => means[Math.min(means.length - 1, Math.max(0, Math.floor(q * means.length)))];
  return {
    mean: Math.round(mean * 1000) / 1000,
    low: Math.round(at(0.025) * 1000) / 1000,
    high: Math.round(at(0.975) * 1000) / 1000,
    iterations
  };
}

/** Convenience wrapper: paired comparison of two per-case 0/1 vectors keyed by case id. */
export function pairedCompare(
  baseline: Map<string, number>,
  candidate: Map<string, number>
): { n: number; fixed: number; broken: number; unchanged: number; mcnemarP: number; bootstrap: ReturnType<typeof pairedBootstrap> } {
  const ids = [...baseline.keys()].filter((id) => candidate.has(id));
  let fixed = 0;
  let broken = 0;
  const diffs: number[] = [];
  for (const id of ids) {
    const a = baseline.get(id)!;
    const b = candidate.get(id)!;
    if (a === 0 && b === 1) fixed++;
    else if (a === 1 && b === 0) broken++;
    diffs.push(b - a);
  }
  return {
    n: ids.length,
    fixed,
    broken,
    unchanged: ids.length - fixed - broken,
    mcnemarP: mcnemarExact(broken, fixed),
    bootstrap: pairedBootstrap(diffs)
  };
}
