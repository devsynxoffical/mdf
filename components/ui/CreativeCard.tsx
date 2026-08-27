"use client";

import { useEffect, useRef, useState } from "react";
import {
  categoryLabel,
  vimeoBackground,
  vimeoThumb,
  type PortfolioVideo,
} from "@/lib/videos";

/**
 * Vertical creative card. Shows a poster at rest; on hover (or when it
 * becomes the active card on touch) it swaps in a muted, looping Vimeo
 * background player. The "Click for sound" pill opens the full player.
 * Only the hovered card mounts an iframe, so the grid stays light.
 */
export default function CreativeCard({
  video,
  onOpen,
  index = 0,
}: {
  video: PortfolioVideo;
  onOpen: (v: PortfolioVideo) => void;
  index?: number;
}) {
  const [preview, setPreview] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fade/lift the card in as it enters view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enter = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    hoverTimer.current = setTimeout(() => setPreview(true), 180);
  };
  const leave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setPreview(false);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="group relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 55, 420)}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${Math.min(index * 55, 420)}ms`,
      }}
    >
      <div
        className="relative overflow-hidden rounded-[14px] border border-bone/[0.1] bg-[#141210] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:border-brass/45 group-hover:shadow-[0_22px_60px_-18px_rgba(217,164,65,0.35)]"
        style={{ aspectRatio: "9/16" }}
      >
        {/* poster */}
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vimeoThumb(video.id)}
            alt=""
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(120% 80% at 20% 0%, rgba(217,164,65,0.22), transparent 60%), radial-gradient(120% 90% at 90% 100%, rgba(192,180,154,0.14), transparent 55%), #17140f`,
            }}
          >
            <span className="font-condensed rotate-[-8deg] px-4 text-center text-[26px] leading-[0.95] text-bone/25">
              {categoryLabel(video.category)}
            </span>
          </span>
        )}

        {/* muted looping preview on hover */}
        {preview && (
          <iframe
            src={vimeoBackground(video.id)}
            title={`${video.title} preview`}
            tabIndex={-1}
            aria-hidden
            allow="autoplay; picture-in-picture"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[104%] w-[178%] -translate-x-1/2 -translate-y-1/2 border-0"
            style={{ objectFit: "cover" }}
          />
        )}

        {/* legibility gradients */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(to bottom, rgba(10,9,8,0.72), transparent)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
          style={{ background: "linear-gradient(to top, rgba(10,9,8,0.9), transparent)" }}
        />

        {/* badges */}
        <span className="absolute left-3 top-3 rounded-full border border-bone/20 bg-inkdeep/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/85 backdrop-blur-sm">
          {categoryLabel(video.category)}
        </span>
        <span className="tnum absolute right-3 top-3 rounded-full bg-inkdeep/70 px-2 py-1 font-mono text-[9px] text-bone/80 backdrop-blur-sm">
          {video.duration}s
        </span>

        {/* title + sound pill */}
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="mb-3 line-clamp-2 font-body text-[12.5px] font-medium leading-snug text-bone/95">
            {video.title}
          </p>
          <button
            onClick={() => onOpen(video)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-brass/60 bg-inkdeep/70 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brass backdrop-blur-sm transition-colors duration-300 hover:bg-brass hover:text-inkdeep"
            aria-label={`Play ${video.title} with sound`}
          >
            <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden>
              <path d="M0 0.5v10l9-5-9-5z" />
            </svg>
            Click for sound
          </button>
        </div>
      </div>
    </div>
  );
}
