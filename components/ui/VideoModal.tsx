"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type PortfolioVideo, categoryLabel, vimeoEmbed } from "@/lib/videos";

/** Full-screen Vimeo player overlay. Escape / click-outside closes. */
export default function VideoModal({
  video,
  onClose,
}: {
  video: PortfolioVideo | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!video) {
      lastFocused.current?.focus();
      return;
    }
    lastFocused.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            initial={{ y: 32, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate font-body text-[15px] font-medium text-bone">
                  {video.title}
                </p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-eyebrow text-mute">
                  {categoryLabel(video.category)} · {video.duration}s
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close video"
                className="shrink-0 rounded-full border border-bone/[0.14] p-2.5 text-mute transition-colors hover:border-brass/50 hover:text-bone"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div
              className="relative w-full overflow-hidden rounded-[16px] border bg-ink"
              style={{ aspectRatio: "16/9", borderColor: "rgba(63,224,176,0.25)" }}
            >
              <iframe
                src={vimeoEmbed(video.id)}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
