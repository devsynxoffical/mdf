"use client";

import { useEffect, useRef } from "react";
import LivingWave from "./LivingWave";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    plain: "Map The",
    italic: "Offer",
    funnel: "Offer → conversion",
    body: PROCESS_STEPS[0].body,
    details: PROCESS_STEPS[0].details,
  },
  {
    num: "02",
    plain: "Architect The",
    italic: "Path",
    funnel: "Funnel blueprint",
    body: PROCESS_STEPS[1].body,
    details: PROCESS_STEPS[1].details,
  },
  {
    num: "03",
    plain: "Build The",
    italic: "Pages",
    funnel: "Landing · VSL · app",
    body: PROCESS_STEPS[2].body,
    details: PROCESS_STEPS[2].details,
  },
  {
    num: "04",
    plain: "Wire The",
    italic: "Follow-Up",
    funnel: "SMS · email · CRM",
    body: PROCESS_STEPS[3].body,
    details: PROCESS_STEPS[3].details,
  },
  {
    num: "05",
    plain: "Launch &",
    italic: "Compound",
    funnel: "Traffic → booked calls",
    body: PROCESS_STEPS[4].body,
    details: PROCESS_STEPS[4].details,
  },
] as const;

/**
 * (06) The process — five funnel-build steps in a pinned horizontal scroll.
 */
export default function UFProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const squiggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 768
    )
      return;

    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const sq = squiggleRef.current;
          if (sq) sq.style.left = `calc(${8 + self.progress * 78}% )`;
        },
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="uf-dark relative overflow-hidden bg-gradient-to-b from-[#020926] via-[#05163F] to-[#072151]"
    >
      <div className="flex h-auto flex-col py-[12vh] md:h-screen md:py-0">
        <div className="px-4 pt-0 sm:px-6 md:px-14 md:pt-16">
          <p className="uf-eyebrow tracking-[0.16em] text-sky">( 06 ) — The Process</p>
          <h2 className="mt-5 leading-[0.96]">
            <span className="block font-sans text-[clamp(40px,5.4vw,72px)] font-extrabold tracking-tight text-white">
              Start To
            </span>
            <span className="block font-sans text-[clamp(32px,4.2vw,58px)] font-bold tracking-tight text-sky">
              Finish.
            </span>
          </h2>
          <p className="mt-5 max-w-[52ch] font-sans text-[15px] leading-[1.65] text-slate-400 sm:text-[16px]">
            How we install a Million Dollar Funnel™ — from offer clarity to live traffic —
            so the pages, follow-up, and CRM run as one acquisition machine.
          </p>

          <div className="relative mt-8 hidden h-11 md:block">
            <span className="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-gradient-to-r from-sky-400/10 via-sky-400/25 to-sky-400/10" />
            <span className="absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 bg-sky-400/5 blur-sm" />
            <div
              ref={squiggleRef}
              className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-linear"
              style={{ left: "8%" }}
            >
              <LivingWave width={180} height={44} />
            </div>
          </div>
        </div>

        <div className="mt-10 flex-1 md:mt-2">
          <div
            ref={trackRef}
            className="flex flex-col gap-14 px-4 sm:gap-16 sm:px-6 md:h-full md:flex-row md:items-center md:gap-0 md:px-0 md:will-change-transform"
          >
            {STEPS.map((s) => (
              <article
                key={s.num}
                className="shrink-0 md:flex md:h-full md:w-[68vw] md:items-center md:px-[6vw] lg:w-[62vw]"
              >
                <div className="relative max-w-[560px]">
                  <span
                    aria-hidden
                    className="block select-none font-sans text-[clamp(72px,18vw,230px)] font-black leading-[0.8] text-cobalt/30"
                  >
                    {s.num}
                  </span>
                  <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-sky">
                    {s.funnel}
                  </p>
                  <h3 className="mt-3 leading-none sm:whitespace-nowrap">
                    <span className="font-sans text-[clamp(30px,4.6vw,64px)] font-extrabold tracking-tight text-white">
                      {s.plain}{" "}
                    </span>
                    <span className="font-sans text-[clamp(26px,4.2vw,58px)] font-bold tracking-tight text-sky">
                      {s.italic}
                    </span>
                  </h3>
                  <p className="mt-5 max-w-[46ch] font-sans text-[15px] font-normal leading-[1.65] text-slate-300 sm:text-[16px]">
                    {s.body}
                  </p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 font-sans text-[13px] leading-snug text-slate-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            <article className="shrink-0 md:flex md:h-full md:w-[70vw] md:items-center md:px-[8vw]">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-sky">
                  Next step
                </p>
                <h3 className="mt-3 leading-[0.96]">
                  <span className="block font-sans text-[clamp(40px,6vw,88px)] font-extrabold tracking-tight text-white">
                    One Funnel
                  </span>
                  <span className="block font-sans text-[clamp(32px,4.8vw,70px)] font-bold tracking-tight text-sky">
                    At A Time.
                  </span>
                </h3>
                <p className="mt-5 max-w-[40ch] font-sans text-[15px] leading-[1.65] text-slate-400">
                  We map your offer, path, and follow-up — then install the Million Dollar
                  Funnel™ stack so traffic turns into booked calls, not leaked leads.
                </p>
                <a href="/book" className="btn-gold mt-8">
                  Walk me through it
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
