"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LEAKS = [
  {
    num: "01",
    title: "Slow first response",
    body: "An hour late is a lead lost.",
  },
  {
    num: "02",
    title: "Message without a path",
    body: "Pages that impress, then lead nowhere.",
  },
  {
    num: "03",
    title: "Follow-up that gives up",
    body: "Two touches, then silence.",
  },
  {
    num: "04",
    title: "A pipeline nobody tracks",
    body: "No numbers, no levers.",
  },
];

/** (02) Where funnels leak — items brighten one at a time on scroll. */
export default function UFLeaks() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("li");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((i) => (i.style.opacity = "1"));
      return;
    }
    const tween = gsap.fromTo(
      items,
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.8,
        scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 45%", scrub: 0.4 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="uf-dark relative pb-[24vh] pt-[10vh]">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <p className="uf-eyebrow text-mint">( 02 ) — The Leaks</p>
        <h2 className="mt-6 leading-[0.86] text-bone">
          <span className="font-condensed block text-[clamp(44px,7vw,96px)]">
            Where Funnels
          </span>
          <span className="font-editorial block text-mint text-[clamp(36px,5.6vw,78px)]">
            Leak.
          </span>
        </h2>

        <ol ref={listRef} className="mt-16">
          {LEAKS.map((l) => (
            <li
              key={l.num}
              className="grid grid-cols-[52px_1fr] gap-6 border-t border-bone/[0.09] py-8 md:grid-cols-[90px_1fr]"
              style={{ opacity: 0.14 }}
            >
              <span className="font-mono text-[13px] text-mint pt-1.5">{l.num}</span>
              <div>
                <h3 className="font-body text-[20px] md:text-[24px] font-semibold text-bone">
                  {l.title}
                </h3>
                <p className="mt-2 max-w-[52ch] font-body text-[16px] leading-[1.55] text-mute">
                  {l.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
