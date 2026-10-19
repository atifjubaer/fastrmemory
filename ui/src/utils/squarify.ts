export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TreemapTile extends Rect {
  key: string;
  count: number;
  data: any;
}

/** Squarified treemap (Bruls et al.): lays values into rectangular area with optimal aspect ratios */
export function squarify(vals: readonly number[], x: number, y: number, w: number, h: number): Rect[] {
  const n = vals.length;
  const out: Rect[] = [];
  if (!n) return out;
  let total = 0;
  for (const v of vals) total += v;
  if (total <= 0) return vals.map(() => ({ x, y, w: 0, h: 0 }));

  const a = vals.map((v) => (v * (w * h)) / total);
  const ratio = (s: number, mn: number, mx: number, sh: number) => {
    const s2 = s * s;
    const w2 = sh * sh;
    return Math.max((w2 * mx) / s2, s2 / (w2 * mn));
  };

  let i = 0;
  while (i < n) {
    const sh = Math.min(w, h);
    if (sh <= 0) {
      for (; i < n; i++) out.push({ x, y, w: 0, h: 0 });
      break;
    }
    let sum = a[i];
    let mn = a[i];
    let mx = a[i];
    let worst = ratio(sum, mn, mx, sh);
    let j = i + 1;
    while (j < n) {
      const s2 = sum + a[j];
      const mn2 = Math.min(mn, a[j]);
      const mx2 = Math.max(mx, a[j]);
      const w2 = ratio(s2, mn2, mx2, sh);
      if (w2 > worst) break;
      sum = s2;
      mn = mn2;
      mx = mx2;
      worst = w2;
      j++;
    }
    const th = sum / sh;
    if (w >= h) {
      let yy = y;
      for (let q = i; q < j; q++) {
        const hh = a[q] / th;
        out.push({ x, y: yy, w: th, h: hh });
        yy += hh;
      }
      x += th;
      w -= th;
    } else {
      let xx = x;
      for (let q = i; q < j; q++) {
        const ww = a[q] / th;
        out.push({ x: xx, y, w: ww, h: th });
        xx += ww;
      }
      y += th;
      h -= th;
    }
    i = j;
  }
  return out;
}
