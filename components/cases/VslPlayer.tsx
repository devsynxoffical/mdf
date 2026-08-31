"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  posterHint?: string;
  onProgress?: (pct: number) => void;
};

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Cinema-style VSL player — play overlay, scrub, mute, progress callback.
 */
export default function VslPlayer({ src, onProgress }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      const d = v.duration || 0;
      const t = v.currentTime || 0;
      setCurrent(t);
      setDuration(d);
      const pct = d ? (t / d) * 100 : 0;
      setProgress(pct);
      onProgress?.(pct);
    };
    const onMeta = () => setDuration(v.duration || 0);
    const onPlay = () => {
      setPlaying(true);
      setStarted(true);
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      onProgress?.(100);
    };

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, [onProgress]);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    void v.play();
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (clientX: number) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
  };

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden bg-[#010618] md:rounded-[28px] md:border md:border-white/15 md:shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        playsInline
        preload="auto"
        onClick={started ? togglePlay : play}
      />

      {/* Soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,9,38,0.55)_100%)]"
      />

      {/* Start overlay */}
      {!started && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#020926]/50 backdrop-blur-[2px] transition hover:bg-[#020926]/35"
          aria-label="Play VSL"
        >
          <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full border border-white/25 bg-white text-[#070B1E] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <div className="text-center">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.22em] text-white">
              Click to watch first
            </p>
            <p className="mt-2 font-sans text-[14px] text-blue-100/80">
              Full case breakdown · sound on
            </p>
          </div>
        </button>
      )}

      {/* Controls */}
      {started && (
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-16 transition-opacity duration-300 md:px-6 md:pb-5 ${
            hovering || !playing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div
            ref={barRef}
            className="h-1.5 cursor-pointer rounded-full bg-white/20"
            onClick={(e) => seek(e.clientX)}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Video progress"
            tabIndex={0}
            onKeyDown={(e) => {
              const v = videoRef.current;
              if (!v) return;
              if (e.key === "ArrowRight") v.currentTime = Math.min(v.duration, v.currentTime + 5);
              if (e.key === "ArrowLeft") v.currentTime = Math.max(0, v.currentTime - 5);
            }}
          >
            <div
              className="relative h-full rounded-full bg-sky shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute -right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H3v6h3l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <span className="font-mono text-[11px] tabular-nums text-white/80">
                {formatTime(current)} / {formatTime(duration)}
              </span>
            </div>
            <p className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-sky sm:block">
              Million Dollar Funnel™ VSL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
