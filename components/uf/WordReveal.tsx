"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealPart =
  | { text: string; accent?: boolean }
  | { img: string; alt?: string };

/**
 * Large statement text whose words light up one by one as the user scrolls
 * through the section (scrubbed, not time-based). Accent words render in
 * mint; parts with `img` render as small inline photo chips that reveal
 * in sequence with the words.
 */
export default function WordReveal({
  parts,
  className = "",
}: {
  parts: RevealPart[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".wr-word");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }
    const tween = gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.6,
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 42%",
        scrub: 0.4,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const rendered: ReactNode[] = [];
  parts.forEach((part, pi) => {
    if ("img" in part) {
      rendered.push(
        <span
          key={`img-${pi}`}
          className="wr-word mx-1 inline-block h-[0.82em] w-[1.7em] overflow-hidden rounded-full align-middle"
          style={{
            background:
              "linear-gradient(120deg, rgba(217,164,65,0.5), rgba(192,180,154,0.5))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={part.img}
            alt={part.alt ?? ""}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            className="block h-full w-full object-cover"
          />
        </span>
      );
      rendered.push(" ");
      return;
    }
    part.text.split(" ").forEach((word, wi) => {
      rendered.push(
        <span
          key={`${pi}-${wi}`}
          className={`wr-word inline ${part.accent ? "text-mint" : ""}`}
        >
          {word}
        </span>
      );
      rendered.push(" ");
    });
  });

  return (
    <p ref={ref} className={className}>
      {rendered}
    </p>
  );
}
