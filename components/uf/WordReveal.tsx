"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playTypingClick } from "@/components/audio/SoundToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealPart =
  | { text: string; accent?: boolean }
  | { img: string; alt?: string };

/**
 * Large statement text whose words light up one by one as the user scrolls
 * through the section. Emits the tactile typing "crick-crick" sound from
 * hire.unickfunnel.com as words illuminate.
 */
export default function WordReveal({
  parts,
  className = "",
}: {
  parts: RevealPart[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const lastProgressRef = useRef(0);

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
        end: "bottom 38%",
        scrub: 0.4,
        onUpdate: (self) => {
          const delta = Math.abs(self.progress - lastProgressRef.current);
          if (delta > 0.015) {
            lastProgressRef.current = self.progress;
            playTypingClick(0.85);
          }
        },
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
          className={`wr-word inline ${
            part.accent
              ? "text-[#38BDF8] font-bold drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]"
              : "text-white"
          }`}
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
