"use client";

import { useState } from "react";
import CreativeCard from "@/components/ui/CreativeCard";
import VideoModal from "@/components/ui/VideoModal";
import { VIDEOS, type PortfolioVideo } from "@/lib/videos";

// One strong creative from each of ten niches.
const REEL_IDS = [
  "1203105527",
  "1203828901",
  "1203808485",
  "1203816135",
  "1203819145",
  "1203812402",
  "1203818782",
  "1203812276",
  "1203105308",
  "1203827387",
  "1203105467",
  "1203105582",
];

/** Live reel — a full-bleed strip of creatives playing as you scroll past. */
export default function UFReel() {
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);
  const reel = REEL_IDS.map((id) => VIDEOS.find((v) => v.id === id)!);

  return (
    <section className="uf-dark relative overflow-hidden py-16 md:py-20">
      {/* label row */}
      <div className="mx-auto mb-8 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 md:px-14">
        <p className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          <span
            className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-brass"
            aria-hidden
          />
          Live reel — {VIDEOS.length} creatives running right now
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute/60">
          Scroll the strip →
        </p>
      </div>

      {/* strip */}
      <div
        className="flex snap-x gap-4 overflow-x-auto px-6 pb-4 md:px-14"
        style={{ scrollbarWidth: "thin" }}
      >
        {reel.map((v, i) => (
          <div
            key={v.id}
            className="w-[150px] shrink-0 snap-start sm:w-[172px] md:w-[196px]"
          >
            <CreativeCard video={v} index={i} onOpen={setOpenVideo} />
          </div>
        ))}
      </div>

      {/* edge fades */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24"
        style={{ background: "linear-gradient(to right, #0D0C0A, transparent)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24"
        style={{ background: "linear-gradient(to left, #0D0C0A, transparent)" }}
      />

      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}
