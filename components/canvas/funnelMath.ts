// Shared funnel dimensions — the single source of truth for the 3D scene.
export const FUNNEL_TOP = 7; // mouth y
export const FUNNEL_BOTTOM = -7; // spout y
export const FUNNEL_HEIGHT = FUNNEL_TOP - FUNNEL_BOTTOM; // 14 units
export const MOUTH_RADIUS = 4.2;
export const SPOUT_RADIUS = 0.45;
export const MASS_Y = -8.4; // where converted particles accumulate

/** Funnel wall radius at height y — tightens toward the spout. */
export function funnelRadius(y: number) {
  const t = Math.min(1, Math.max(0, (y - FUNNEL_BOTTOM) / FUNNEL_HEIGHT));
  return SPOUT_RADIUS + (MOUTH_RADIUS - SPOUT_RADIUS) * Math.pow(t, 1.6);
}

/** Six stage-marker ring heights, top-of-funnel first (pillar 01 → 06). */
export const STAGE_RING_YS = [4.6, 2.8, 1.0, -0.8, -2.6, -4.4];
