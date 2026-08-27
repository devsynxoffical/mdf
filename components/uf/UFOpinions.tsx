"use client";

import { useState } from "react";
import WordReveal from "./WordReveal";
import Reveal from "./Reveal";
import CreativeCard from "@/components/ui/CreativeCard";
import VideoModal from "@/components/ui/VideoModal";
import { VIDEOS, vimeoThumb, type PortfolioVideo } from "@/lib/videos";

const CHIP_IDS = ["1203105527", "1203105308", "1203808485", "1203816135"];
const THUMB_IDS = ["1203105580", "1203818782", "1203812402", "1203819145"];

const QUOTES = [
  {
    quote:
      "They rebuilt the backend in three weeks. The calendar hasn't had an empty week since.",
    name: "Sarah K.",
    role: "Med Spa · Texas",
  },
  {
    quote:
      "First team that treated follow-up as the product instead of an afterthought.",
    name: "Daniel R.",
    role: "Roofing · Florida",
  },
  {
    quote:
      "I stopped guessing which campaign worked. Now I can see the whole pipeline.",
    name: "Priya S.",
    role: "Legal · United Kingdom",
  },
];

/** (05) Second opinions — statement, client quotes, and proof clips. */
export default function UFOpinions() {
  const [openVideo, setOpenVideo] = useState<PortfolioVideo | null>(null);
  const thumbs = THUMB_IDS.map((id) => VIDEOS.find((v) => v.id === id)!);

  return (
    <section className="uf-dark relative py-[20vh]">
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <p className="uf-eyebrow mb-10 text-mint">( 05 ) — Second Opinions</p>
        <WordReveal
          className="font-body text-[clamp(22px,2.9vw,38px)] font-medium leading-[1.5] text-bone"
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
      </div>

      {/* quotes */}
      <div className="mx-auto mt-20 grid max-w-[1280px] gap-px bg-bone/10 px-6 md:grid-cols-3 md:px-14">
        {QUOTES.map((q, i) => (
          <Reveal as="div" key={q.name} delay={i * 110}>
            <figure className="h-full bg-inkdeep px-7 py-9">
              <span
                aria-hidden
                className="font-editorial block text-[36px] leading-none text-mint/50"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 font-body text-[16px] leading-[1.55] text-bone/90">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 border-t rule-dark pt-4">
                <span className="block font-condensed text-[15px] text-bone">
                  {q.name}
                </span>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                  {q.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* proof clips */}
      <div className="mx-auto mt-16 flex max-w-[1280px] flex-wrap items-start justify-center gap-4 px-6">
        {thumbs.map((v, i) => (
          <div key={v.id} className="w-[142px] sm:w-[160px] md:w-[176px]">
            <CreativeCard video={v} index={i} onOpen={setOpenVideo} />
          </div>
        ))}
      </div>

      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </section>
  );
}
