"use client";

import { useEffect, useRef, useState } from "react";
import RiseIn from "@/components/ui/RiseIn";
import { useScrollState } from "@/components/providers/ScrollProvider";

const DIGIT_GROUPS = ["$1", ",", "520", ",", "000"];

export default function BigNumber() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { funnelEvents } = useScrollState();

  // Split into individual characters so each digit animates independently.
  const chars = DIGIT_GROUPS.join("").split("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
          // As the last digit lands, pulse the funnel lattice behind it.
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const lastDelay = reduced ? 0 : chars.length * 60 + 500;
          setTimeout(() => funnelEvents.current.pulseLattice(), lastDelay);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="results" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-[1000px] px-6 text-center md:-translate-x-[8%] md:text-left">
        <RiseIn>
          <p className="font-mono text-s12 uppercase tracking-eyebrow text-signal">
            From Cold Traffic to Booked Revenue
          </p>
        </RiseIn>

        <div ref={ref} className="mt-8" aria-label="$1,520,000">
          <p
            className="tabular font-display font-light text-brass leading-[0.85] whitespace-nowrap"
            style={{
              fontSize: "clamp(56px, 12vw, 200px)",
              letterSpacing: "-0.04em",
            }}
            aria-hidden
          >
            {chars.map((c, i) => (
              <span
                key={i}
                className="inline-block will-change-transform"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(40px)",
                  filter: inView ? "blur(0px)" : "blur(8px)",
                  transition: `opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1), filter 500ms cubic-bezier(0.16,1,0.3,1)`,
                  // digits land one at a time, right to left
                  transitionDelay: `${(chars.length - 1 - i) * 60}ms`,
                }}
              >
                {c}
              </span>
            ))}
          </p>
        </div>

        <RiseIn delay={200}>
          <p className="mt-8 font-mono text-s14 text-mute" style={{ letterSpacing: "0.1em" }}>
            19 MONTHS · ONE SERVICE-BASED CLIENT · ONE SYSTEM
          </p>
        </RiseIn>

        <RiseIn delay={300}>
          <p className="mt-12 max-w-[52ch] font-body text-[18px] leading-[1.6] text-mute mx-auto md:mx-0">
            The Million Dollar Funnel™ turns cold prospects into booked,
            revenue-generating clients using AI and a multi-layered funnel
            framework. It runs in the background and delivers qualified
            bookings. You focus on delivery.
          </p>
        </RiseIn>

        <RiseIn delay={400}>
          <a
            href="#system"
            className="group relative mt-8 inline-block font-body text-s16 font-medium text-brass"
          >
            See how the system works →
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-0 bg-brass transition-[width] duration-[250ms] group-hover:w-full"
            />
          </a>
        </RiseIn>
      </div>
    </section>
  );
}
