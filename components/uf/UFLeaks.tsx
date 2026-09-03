"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import FunnelLaptopMock from "@/components/funnels/FunnelLaptopMock";
import { FEATURED_FUNNELS, type FunnelDesign } from "@/lib/funnels";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CopyBlock({ funnel }: { funnel: FunnelDesign }) {
  return (
    <div className="max-w-[400px] text-left">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cobalt">
          {funnel.num}
        </span>
        <span className="h-px flex-1 max-w-[48px] bg-cobalt/25" aria-hidden />
      </div>
      <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {funnel.name}
      </p>
      <h3 className="mt-3 font-sans text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#070B1E]">
        {funnel.title}
      </h3>
      <p className="mt-4 font-sans text-[15px] leading-[1.65] text-slate-600 sm:text-[16px]">
        {funnel.body}
      </p>
    </div>
  );
}

/**
 * Homepage funnel preview — four featured builds in a zig-zag layout.
 */
export default function UFLeaks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = section.querySelectorAll<HTMLElement>("[data-funnel-row]");
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const media = row.querySelector("[data-funnel-media]");
        const copy = row.querySelector("[data-funnel-copy]");
        gsap.fromTo(
          [media, copy].filter(Boolean),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="funnels"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F5F7FB] py-[12vh] text-[#070B1E]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.07),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-[640px]">
          <p className="uf-eyebrow tracking-[0.18em] text-cobalt">( 02 ) — Funnel Systems</p>
          <h2 className="mt-4">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#070B1E]">
                Funnels that
                <span className="text-cobalt"> convert.</span>
              </span>
            </Reveal>
          </h2>
          <p className="mt-5 max-w-[44ch] font-sans text-[16px] leading-[1.65] text-slate-600 sm:text-[17px]">
            Real client architectures — each screen auto-scrolls through the full build as you browse.
          </p>
        </div>

        <div className="mt-16 border-t border-[#070B1E]/10 sm:mt-20">
          {FEATURED_FUNNELS.map((funnel, i) => {
            const mediaLeft = i % 2 === 0;
            return (
              <div
                key={funnel.id}
                data-funnel-row
                className="grid items-center gap-10 border-b border-[#070B1E]/10 py-14 sm:gap-12 sm:py-20 md:grid-cols-2 md:gap-10 lg:gap-16 lg:py-24"
              >
                <div
                  data-funnel-media
                  className={`${mediaLeft ? "md:order-1" : "md:order-2"} ${
                    mediaLeft ? "md:pr-6 lg:pr-10" : "md:pl-6 lg:pl-10"
                  }`}
                >
                  <FunnelLaptopMock funnel={funnel} />
                </div>

                <div
                  data-funnel-copy
                  className={`flex ${
                    mediaLeft
                      ? "md:order-2 md:justify-start"
                      : "md:order-1 md:justify-end"
                  }`}
                >
                  <CopyBlock funnel={funnel} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[#070B1E]/10 pt-12 sm:mt-16 sm:pt-14">
          <p className="max-w-[40ch] text-center font-sans text-[15px] leading-relaxed text-slate-600">
            Four featured builds — eight total architectures in the full library.
          </p>
          <Magnetic strength={0.14}>
            <Link
              href="/funnels"
              className="inline-flex items-center gap-2 rounded-full border border-[#070B1E]/12 bg-white px-7 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#070B1E] shadow-[0_8px_30px_rgba(7,11,30,0.08)] transition hover:border-cobalt/30 hover:text-cobalt hover:shadow-[0_12px_40px_rgba(18,84,236,0.15)] sm:px-9 sm:text-[13px]"
            >
              View all funnel designs
              <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
