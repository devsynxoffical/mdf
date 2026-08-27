"use client";

/**
 * Caps how many Vimeo background players run at once.
 *
 * Every card that scrolls into view registers here; the manager grants
 * playback to the N cards nearest the centre of the viewport and parks the
 * rest on their poster. Without this, a filtered portfolio view would try to
 * start sixty-plus players at once.
 */

type Entry = {
  id: string;
  el: HTMLElement;
  onChange: (playing: boolean) => void;
  playing: boolean;
};

const registry = new Map<string, Entry>();
let scheduled = false;

function maxPlayers() {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  // Fewer concurrent players on phones: less data, less decode pressure.
  if (window.matchMedia("(pointer: coarse)").matches) return 4;
  const mem = (navigator as any).deviceMemory;
  if (typeof mem === "number" && mem < 4) return 4;
  return 10;
}

function recompute() {
  scheduled = false;
  const cap = maxPlayers();
  const mid = window.innerHeight / 2;

  const ranked = Array.from(registry.values())
    .map((entry) => {
      const r = entry.el.getBoundingClientRect();
      return { entry, dist: Math.abs(r.top + r.height / 2 - mid) };
    })
    .sort((a, b) => a.dist - b.dist);

  ranked.forEach(({ entry }, i) => {
    const shouldPlay = i < cap;
    if (shouldPlay !== entry.playing) {
      entry.playing = shouldPlay;
      entry.onChange(shouldPlay);
    }
  });
}

function schedule() {
  if (scheduled || typeof window === "undefined") return;
  scheduled = true;
  requestAnimationFrame(recompute);
}

export function joinBudget(
  id: string,
  el: HTMLElement,
  onChange: (playing: boolean) => void
) {
  registry.set(id, { id, el, onChange, playing: false });
  schedule();
}

export function leaveBudget(id: string) {
  const entry = registry.get(id);
  if (entry?.playing) entry.onChange(false);
  registry.delete(id);
  schedule();
}

/** Re-rank on scroll so the cards you are looking at are the ones playing. */
if (typeof window !== "undefined") {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}
