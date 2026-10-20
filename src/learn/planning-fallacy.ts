/**
 * Kahneman Planning Fallacy & Base-Rate Calibrator
 * Detects forward-looking estimation claims and calculates reference-class track records.
 */

export interface ForwardClaimMatch {
  matched: boolean;
  phrase: string;
  estimateValue?: number;
  estimateUnit?: string;
}

const FORWARD_CLAIM_PATTERNS = [
  /(?:will take|should take|takes? about|takes? around)\s+(\d+(?:\.\d+)?)\s*(hours?|hrs?|days?|mins?|minutes?|points?)/i,
  /(?:estimated (?:at|to be|around))\s+(\d+(?:\.\d+)?)\s*(hours?|hrs?|days?|mins?|minutes?|points?)/i,
  /(?:should be (?:done|completed|finished|ready) in)\s+(\d+(?:\.\d+)?)\s*(hours?|hrs?|days?|mins?|minutes?)/i,
  /(?:effort|estimate):\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|days?|mins?|minutes?|points?)/i,
];

export function detectForwardClaim(text: string): ForwardClaimMatch {
  if (!text || typeof text !== 'string') return { matched: false, phrase: '' };

  for (const pattern of FORWARD_CLAIM_PATTERNS) {
    const match = pattern.exec(text);
    if (match) {
      const val = parseFloat(match[1]);
      const unit = match[2]?.toLowerCase() || 'units';
      return {
        matched: true,
        phrase: match[0],
        estimateValue: isNaN(val) ? undefined : val,
        estimateUnit: unit,
      };
    }
  }

  return { matched: false, phrase: '' };
}

export interface PredictionBaserate {
  classTag: string;
  count: number;
  meanEstimate: number;
  meanActual: number;
  meanRatio: number;
  medianRatio: number;
  mae: number;
  summary: string;
}

export interface ClosedPredictionRow {
  estimate_value: number | null;
  actual_value: number | null;
}

export function calculateBaserate(
  classTag: string,
  closedPredictions: ClosedPredictionRow[]
): PredictionBaserate | null {
  const valid = closedPredictions.filter(
    (p) => p.estimate_value !== null && p.actual_value !== null && !isNaN(p.estimate_value) && !isNaN(p.actual_value)
  );

  if (valid.length === 0) return null;

  let totalEstimate = 0;
  let totalActual = 0;
  let totalMae = 0;
  const ratios: number[] = [];

  for (const p of valid) {
    const est = p.estimate_value!;
    const act = p.actual_value!;

    totalEstimate += est;
    totalActual += act;
    totalMae += Math.abs(act - est);

    if (est > 0) {
      ratios.push(act / est);
    }
  }

  const count = valid.length;
  const meanEstimate = totalEstimate / count;
  const meanActual = totalActual / count;
  const mae = totalMae / count;

  let meanRatio = 1.0;
  let medianRatio = 1.0;

  if (ratios.length > 0) {
    meanRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    ratios.sort((a, b) => a - b);
    const mid = Math.floor(ratios.length / 2);
    medianRatio = ratios.length % 2 !== 0 ? ratios[mid] : (ratios[mid - 1] + ratios[mid]) / 2;
  }

  const summary = `Last ${count} closed predictions in class [${classTag}] averaged ${meanRatio.toFixed(2)}x actual vs estimated (p50: ${medianRatio.toFixed(2)}x, MAE: ${mae.toFixed(1)}).`;

  return {
    classTag,
    count,
    meanEstimate,
    meanActual,
    meanRatio,
    medianRatio,
    mae,
    summary,
  };
}
