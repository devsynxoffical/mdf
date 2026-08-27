"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    plain: "Map The",
    italic: "Offer",
    body: "Who it's for, what it promises, the one action it must cause.",
  },
  {
    num: "02",
    plain: "Architect The",
    italic: "Path",
    body: "Mapped in words first. A pretty page on a broken path stays broken.",
  },
  {
    num: "03",
    plain: "Build The",
    italic: "Pages",
    body: "Landing architecture that qualifies on entry.",
  },
  {
    num: "04",
    plain: "Wire The",
    italic: "Follow-Up",
    body: "A2P, SMS, email, voicemail — answering in seconds.",
  },
  {
    num: "05",
    plain: "Launch &",
    italic: "Compound",
    body: "Live on real traffic, tightened week after week.",
  },
];

/** (06) The process — five steps in a pinned horizontal scroll, with a
 *  squiggle that travels along the top line as you move through them. */
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
    <section ref={sectionRef} className="uf-dark relative overflow-hidden">
      <div className="flex h-auto flex-col py-[12vh] md:h-screen md:py-0">
        {/* header + progress line */}
        <div className="px-6 pt-0 md:px-14 md:pt-16">
          <p className="uf-eyebrow text-mint">( 07 ) — The Process</p>
          <h2 className="mt-5 leading-[0.86]">
            <span className="font-condensed block text-bone text-[clamp(40px,5.4vw,72px)]">
              Start To
            </span>
            <span className="font-editorial block text-mint text-[clamp(32px,4.2vw,58px)]">
              Finish.
            </span>
          </h2>
          {/* traveling squiggle */}
          <div className="relative mt-8 hidden h-10 md:block">
            <span className="absolute left-0 right-0 top-1/2 h-px bg-bone/15" />
            <div
              ref={squiggleRef}
              className="absolute top-0 h-10 w-[140px] -translate-x-1/2 transition-[left] duration-150 ease-linear"
              style={{ left: "8%" }}
            >
              <svg viewBox="0 0 140 40" fill="none" className="h-full w-full">
                <path
                  d="M0,20 C12,20 14,6 24,6 C36,6 36,34 48,34 C60,34 60,10 70,10 C80,10 80,30 92,30 C104,30 104,14 116,14 C128,14 130,20 140,20"
                  stroke="#D9A441"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* horizontal track (vertical stack on mobile) */}
        <div className="mt-10 flex-1 md:mt-2">
          <div
            ref={trackRef}
            className="flex flex-col gap-16 px-6 md:h-full md:flex-row md:items-center md:gap-0 md:px-0 md:will-change-transform"
          >
            {STEPS.map((s) => (
              <article
                key={s.num}
                className="shrink-0 md:flex md:h-full md:w-[62vw] md:items-center md:px-[6vw]"
              >
                <div className="relative">
                  <span
                    aria-hidden
                    className="font-condensed block leading-[0.8] text-mint text-[clamp(110px,22vh,230px)]"
                  >
                    {s.num}
                  </span>
                  <h3 className="mt-2 whitespace-nowrap leading-none">
                    <span className="font-condensed text-bone text-[clamp(30px,4.6vw,64px)]">
                      {s.plain}{" "}
                    </span>
                    <span className="font-editorial text-bone/90 text-[clamp(26px,4.2vw,58px)]">
                      {s.italic}
                    </span>
                  </h3>
                  <p className="mt-6 max-w-[46ch] font-body text-[15px] leading-[1.65] text-mute">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}

            {/* end slide */}
            <article className="shrink-0 md:flex md:h-full md:w-[70vw] md:items-center md:px-[8vw]">
              <div>
                <h3 className="leading-[0.86]">
                  <span className="font-condensed block text-bone text-[clamp(40px,6vw,88px)]">
                    One Funnel
                  </span>
                  <span className="font-editorial block text-mint text-[clamp(32px,4.8vw,70px)]">
                    At A Time.
                  </span>
                </h3>
                <a href="#door" className="btn-gold mt-8">
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
