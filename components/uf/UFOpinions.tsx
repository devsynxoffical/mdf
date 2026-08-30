"use client";

import WordReveal from "./WordReveal";
import Reveal from "./Reveal";
import { vimeoThumb } from "@/lib/videos";

const CHIP_IDS = ["1203105527", "1203105308", "1203808485", "1203816135"];

const QUOTES = [
  {
    quote:
      "Rebuilt in three weeks. The calendar hasn't been empty since.",
    name: "Sarah K.",
    role: "Med Spa · Texas",
  },
  {
    quote:
      "First team to treat follow-up as the product.",
    name: "Daniel R.",
    role: "Roofing · Florida",
  },
  {
    quote:
      "I stopped guessing. Now I see the whole pipeline.",
    name: "Priya S.",
    role: "Legal · United Kingdom",
  },
];

/** (05) Second opinions — statement and client quotes. */
export default function UFOpinions() {
  return (
    <section className="uf-dark relative bg-gradient-to-b from-[#072151] via-[#05163F] to-[#04112E] py-[22vh]">
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <p className="uf-eyebrow mb-10 text-sky tracking-[0.16em] font-sans">( 05 ) — Second Opinions</p>
        <WordReveal
          className="font-sans text-[clamp(22px,2.9vw,38px)] font-semibold leading-[1.5] text-white"
          parts={[
            { text: "Enough from us. The rest comes from the owners" },
            { img: vimeoThumb(CHIP_IDS[0]) },
            { img: vimeoThumb(CHIP_IDS[1]) },
            { text: "who hired us." },
            { text: "In their own words.", accent: true },
          ]}
        />
      </div>

      {/* quotes */}
      <div className="mx-auto mt-20 grid max-w-[1280px] gap-6 px-6 md:grid-cols-3 md:px-14">
        {QUOTES.map((q, i) => (
          <Reveal as="div" key={q.name} delay={i * 110}>
            <figure className="h-full rounded-2xl border border-sky/20 bg-[#0B2256]/90 p-8 backdrop-blur-md transition-all duration-300 hover:border-cobalt/60 hover:shadow-[0_0_30px_rgba(18,84,236,0.25)]">
              <span
                aria-hidden
                className="font-serif block text-[40px] leading-none text-sky"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 font-sans text-[16px] font-normal leading-[1.55] text-slate-200">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <span className="block font-sans text-[16px] text-white font-bold tracking-tight">
                  {q.name}
                </span>
                <span className="mt-0.5 block font-sans text-[12px] text-slate-400 font-normal">
                  {q.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
