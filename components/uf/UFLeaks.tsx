"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FunnelScrollBlock from "@/components/funnels/FunnelScrollBlock";
import { FEATURED_FUNNELS } from "@/lib/funnels";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Funnel Systems — Lusion-style featured work grid:
 * two columns, category line, title, hover arrow + image scale.
 */
export default function UFLeaks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const lines = section.querySelectorAll<HTMLElement>("[data-funnel-line]");
      const fades = section.querySelectorAll<HTMLElement>("[data-funnel-fade]");
      const items = section.querySelectorAll<HTMLElement>("[data-funnel-item]");

      if (reduced) {
        gsap.set([lines, fades, items], { clearProps: "all", opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      gsap.fromTo(
        lines,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        fades,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );

      items.forEach((item, i) => {
        const media = item.querySelector<HTMLElement>("[data-funnel-media]");
        const copy = item.querySelector<HTMLElement>("[data-funnel-copy]");

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(12% 0 0 0)", y: 28, opacity: 0.6 },
            {
              clipPath: "inset(0% 0 0 0)",
              y: 0,
              opacity: 1,
              duration: 1.05,
              delay: (i % 2) * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
            }
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              delay: 0.12 + (i % 2) * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
            }
          );
        }
      });
    }, section);

    return () => {
      // kill() without args = stop tweens, do NOT revert inline styles / DOM
      // (ctx.revert() races React and throws removeChild NotFoundError).
      try {
        ctx.kill();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <section
      id="funnels"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F5F7FB] py-[12vh] text-[#070B1E]"
    >
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_minmax(220px,340px)] lg:gap-x-16">
          <div>
            <p
              data-funnel-fade
              className="uf-eyebrow tracking-[0.18em] text-cobalt"
            >
              ( 02 ) — Funnel Systems
            </p>
            <h2 className="mt-5 font-sans text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#070B1E]">
              <span className="block overflow-hidden">
                <span data-funnel-line className="block">
                  Featured Work
                </span>
              </span>
            </h2>
          </div>
          <p
            data-funnel-fade
            className="max-w-[36ch] font-sans text-[14px] leading-[1.7] text-slate-500 lg:mb-2 lg:max-w-none lg:text-right"
          >
            Real client architectures — each screen auto-scrolls through the full
            build. Hover a title to open it.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:mt-20 lg:gap-x-8 lg:gap-y-[72px]">
          {FEATURED_FUNNELS.map((funnel, i) => (
            <Link
              key={funnel.id}
              href={`/funnels#${funnel.id}`}
              data-funnel-item
              className="group block outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cobalt"
            >
              <div
                data-funnel-media
                className="overflow-hidden rounded-[12px] sm:rounded-[14px]"
              >
                <div className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-focus-visible:scale-[1.035]">
                  <FunnelScrollBlock
                    src={funnel.image}
                    duration={funnel.scrollDuration}
                    label={funnel.name}
                    priority={i < 2}
                    shineDelay={i * 0.7}
                  />
                </div>
              </div>

              <div data-funnel-copy className="mt-4 sm:mt-5">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 sm:text-[12px]">
                  {funnel.stack.join(" • ")}
                </p>
                <h3 className="mt-2 flex items-center font-sans text-[clamp(22px,2.2vw,32px)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#070B1E]">
                  <span
                    aria-hidden
                    className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mr-2.5 group-hover:w-[1.05em] group-hover:opacity-100 group-focus-visible:mr-2.5 group-focus-visible:w-[1.05em] group-focus-visible:opacity-100"
                  >
                    →
                  </span>
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {funnel.name}
                  </span>
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div
          data-funnel-fade
          className="mt-16 flex items-baseline justify-between gap-6 border-t border-[#070B1E]/10 pt-8 sm:mt-20"
        >
          <p className="font-sans text-[14px] text-slate-500">
            Six featured — eight in the full library.
          </p>
          <Link
            href="/funnels"
            className="group/all inline-flex items-center font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-[#070B1E] transition-colors hover:text-cobalt"
          >
            <span
              aria-hidden
              className="mr-0 inline-block w-0 overflow-hidden opacity-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/all:mr-2 group-hover/all:w-[1em] group-hover/all:opacity-100"
            >
              →
            </span>
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
