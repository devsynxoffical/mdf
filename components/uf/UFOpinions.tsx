"use client";

import { useState } from "react";
import WordReveal from "./WordReveal";
import VideoThumb from "@/components/ui/VideoThumb";
import VideoModal from "@/components/ui/VideoModal";
import { VIDEOS, vimeoThumb, type PortfolioVideo } from "@/lib/videos";

const CHIP_IDS = ["1203105527", "1203105308", "1203808485", "1203816135"];
const THUMB_IDS = ["1203105580", "1203818782", "1203812402", "1203819145"];

/** (04) Second opinions — statement with inline photo chips, then proof clips. */
export default function UFOpinions() {
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);
  const thumbs = THUMB_IDS.map((id) => VIDEOS.find((v) => v.id === id)!);

  return (
    <section className="uf-dark relative py-[26vh]">
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <p className="uf-eyebrow mb-10 text-mint">( 04 ) — Second Opinions</p>
        <WordReveal
          className="font-body text-[clamp(24px,3.2vw,42px)] font-medium leading-[1.45] text-bone"
          parts={[
            { text: "That's enough from us. The rest comes from clients" },
            { img: vimeoThumb(CHIP_IDS[0]) },
            { text: "who hired us, owners" },
            { img: vimeoThumb(CHIP_IDS[1]) },
            { text: "who scaled past seven figures, and the niches" },
            { img: vimeoThumb(CHIP_IDS[2]) },
            { img: vimeoThumb(CHIP_IDS[3]) },
            { text: "we did it in." },
            { text: "All in their own work.", accent: true },
          ]}
        />

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {thumbs.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setOpenVideo(v)}
              aria-label={`Play ${v.title}`}
              className="group relative h-[72px] w-[120px] overflow-hidden rounded-[10px] border border-bone/[0.12] transition-transform duration-200 hover:scale-105 md:h-[86px] md:w-[148px]"
            >
              <VideoThumb video={v} seed={i} playSize={28} />
            </button>
          ))}
        </div>
      </div>
      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}
