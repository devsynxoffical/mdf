"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FunnelScrollBlock from "@/components/funnels/FunnelScrollBlock";
import { FEATURED_FUNNELS, FUNNEL_DESIGNS } from "@/lib/funnels";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COL_TILT = [1.15, -1.4, 0.9];

const STACK_TICKER = Array.from(new Set(FUNNEL_DESIGNS.flatMap((f) => f.stack)));

/**
 * Homepage funnel gallery — six builds in a 3-column grid,
 * dual marquees, and auto-panning screenshots that keep moving on hover.
 */
export default function UFLeaks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    const ctx = gsap.context(() => {
      const lines = section.querySelectorAll<HTMLElement>("[data-funnel-line]");
      const fades = section.querySelectorAll<HTMLElement>("[data-funnel-fade]");
      const items = section.querySelectorAll<HTMLElement>("[data-funnel-item]");
      const rail = section.querySelector<HTMLElement>("[data-funnel-rail]");
      const marquee = section.querySelector<HTMLElement>("[data-funnel-marquee]");

      if (reduced) {
        gsap.set([lines, fades, items], { clearProps: "all", opacity: 1, y: 0, yPercent: 0 });
        if (rail) gsap.set(rail, { scaleX: 1 });
        if (marquee) gsap.set(marquee, { opacity: 1 });
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

      if (marquee) {
        gsap.fromTo(
          marquee,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.9,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          }
        );
      }

      if (rail) {
        gsap.fromTo(
          rail,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.45,
            },
          }
        );
      }

      items.forEach((item, i) => {
        const media = item.querySelector<HTMLElement>("[data-funnel-media]");
        const copy = item.querySelector<HTMLElement>("[data-funnel-copy]");

        if (desktop) {
          const cols = window.innerWidth >= 1024 ? 3 : 2;
          const col = i % cols;
          const fromY = cols === 3 ? [24, 56, 40][col] : [28, 52][col];
          const toY = cols === 3 ? [-10, -32, -18][col] : [-12, -28][col];
          gsap.fromTo(
            item,
            { y: fromY },
            {
              y: toY,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
              },
            }
          );
        }

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(100% 0 0 0)", rotate: COL_TILT[i % 3] },
            {
              clipPath: "inset(0% 0 0 0)",
              rotate: 0,
              duration: 1.15,
              delay: (i % 3) * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 86%", once: true },
            }
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.1 + (i % 3) * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 86%", once: true },
            }
          );
        }
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(18,84,236,0.07),transparent_48%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:max-w-[1280px] lg:px-12 xl:px-14">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(200px,260px)] lg:gap-x-16">
          <div>
            <p
              data-funnel-fade
              className="uf-eyebrow tracking-[0.18em] text-cobalt"
            >
              ( 02 ) — Funnel Systems
            </p>
            <h2 className="mt-5 max-w-[12ch] font-sans text-[clamp(40px,6.4vw,76px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#070B1E]">
              <span className="block overflow-hidden">
                <span data-funnel-line className="block">
                  Funnels that
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-funnel-line className="block text-cobalt">
                  convert.
                </span>
              </span>
            </h2>
          </div>
          <p
            data-funnel-fade
            className="max-w-[36ch] font-sans text-[11px] font-medium uppercase leading-[1.7] tracking-[0.14em] text-slate-500 lg:mt-11 lg:max-w-none lg:text-right"
          >
            Real client architectures — each screen auto-scrolls through the full
            build as you browse.
          </p>
        </div>

        <div className="mt-8 h-px overflow-hidden bg-[#070B1E]/10 sm:mt-10">
          <div
            data-funnel-rail
            className="h-px origin-left scale-x-0 bg-cobalt"
          />
        </div>
      </div>

      <div
        data-funnel-marquee
        className="marquee-row funnel-marquee relative mt-10 sm:mt-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F7FB] to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F7FB] to-transparent sm:w-28"
        />
        <div
          className="marquee-track-left flex w-max items-center border-y border-[#070B1E]/8 py-4"
          style={{ "--marquee-duration": "38s" } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 || undefined}
            >
              {FUNNEL_DESIGNS.map((funnel) => (
                <span key={`${copy}-${funnel.id}`} className="flex items-center">
                  <span className="font-mono text-[11px] font-semibold text-cobalt">
                    {funnel.num}
                  </span>
                  <span className="ml-3 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-[#070B1E] sm:text-[14px]">
                    {funnel.name}
                  </span>
                  <span
                    aria-hidden
                    className="mx-6 inline-block h-1.5 w-1.5 rotate-45 bg-cobalt sm:mx-8"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-row funnel-marquee relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F7FB] to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F7FB] to-transparent sm:w-28"
        />
        <div
          className="marquee-track-right flex w-max items-center py-3"
          style={{ "--marquee-duration": "46s" } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 || undefined}
            >
              {STACK_TICKER.map((tag) => (
                <span key={`${copy}-${tag}`} className="flex items-center">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {tag}
                  </span>
                  <span
                    aria-hidden
                    className="mx-5 inline-block h-px w-6 bg-cobalt/40 sm:mx-7"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:max-w-[1280px] lg:px-12 xl:px-14">
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {FEATURED_FUNNELS.map((funnel, i) => (
            <Link
              key={funnel.id}
              href={`/funnels#${funnel.id}`}
              data-funnel-item
              className="group block will-change-transform outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cobalt"
            >
              <div
                data-funnel-media
                className="overflow-hidden rounded-[10px] sm:rounded-[12px]"
              >
                <FunnelScrollBlock
                  src={funnel.image}
                  duration={funnel.scrollDuration}
                  label={funnel.name}
                  priority={i < 3}
                  shineDelay={i * 0.7}
                />
              </div>
              <div data-funnel-copy>
                <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {funnel.stack.join(" • ")}
                </p>
                <h3 className="mt-2 font-sans text-[clamp(18px,1.7vw,24px)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#070B1E] transition-colors duration-300 group-hover:text-cobalt group-focus-visible:text-cobalt">
                  {funnel.name}
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
            className="link-sweep shrink-0 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-[#070B1E] transition-colors hover:text-cobalt"
          >
            View all <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
