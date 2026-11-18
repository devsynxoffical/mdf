import { WORK_PROOF } from "@/lib/workproof";

/** Cost-per-lead figures stated on the receipts themselves (no estimates). */
export type CplRow = { id: string; niche: string; result: string; cpl: number; note: string; src: string };

export const CPL_ROWS: CplRow[] = WORK_PROOF.flatMap((w) => {
  const text = `${w.metric} ${w.metricLabel}`;
  if (!/CPL/.test(text)) return [];
  const m = text.match(/\$([\d.]+)\s*CPL/) ?? (w.metric.startsWith("$") ? [w.metric, w.metric.slice(1)] : null);
  if (!m) return [];
  return [{ id: w.id, niche: w.niche, result: `${w.metric} ${w.metricLabel}`, cpl: Number(m[1]), note: w.note, src: w.src }];
}).sort((a, b) => a.cpl - b.cpl);

const sorted = CPL_ROWS.map((r) => r.cpl);
const mid = Math.floor(sorted.length / 2);

export const CPL_SUMMARY = {
  count: CPL_ROWS.length,
  receipts: WORK_PROOF.length,
  min: sorted[0],
  max: sorted[sorted.length - 1],
  median: sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2,
};

/** Range of CPLs for receipts whose niche matches the pattern. */
export function cplRange(pattern: RegExp) {
  const v = CPL_ROWS.filter((r) => pattern.test(r.niche)).map((r) => r.cpl);
  return v.length ? { count: v.length, min: Math.min(...v), max: Math.max(...v) } : null;
}

export const usd = (n: number) => `$${n.toFixed(2)}`;
