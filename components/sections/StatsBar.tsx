"use client";

import { useEffect, useRef, useState } from "react";
import Counter from "@/components/ui/Counter";
import RiseIn from "@/components/ui/RiseIn";

const LABELS = [
  "Revenue Generated",
  "Businesses as Clients",
  "Dedicated Experts",
  "Service Businesses Scaled",
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [sweep, setSweep] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSweep(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-y border-bone/[0.06] backdrop-blur"
      style={{ background: "rgba(18,24,38,0.6)" }}
    >
      {/* brass progress sweep along the top border */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px bg-brass transition-[width] ease-out"
        style={{ width: sweep ? "100%" : "0%", transitionDuration: "1400ms" }}
      />
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4 py-12">
        {[
          <Counter key="a" value={100} prefix="$" suffix="M+" delay={0} />,
          <span key="b" className="tabular">2CC &amp; 9-Figure</span>,
          <Counter key="c" value={15} suffix="+" delay={200} />,
          <Counter key="d" value={500} suffix="+" delay={300} />,
        ].map((figure, i) => (
          <RiseIn
            key={i}
            delay={i * 100}
            className={`flex flex-col items-center px-4 py-4 md:py-0 ${
              i > 0 ? "md:border-l md:border-bone/[0.06]" : ""
            } ${i >= 2 ? "border-t border-bone/[0.06] md:border-t-0" : ""}`}
          >
            <span
              className={`font-display font-semibold text-brass ${
                i === 1
                  ? "text-[22px] md:text-[30px] leading-[52px]"
                  : "text-[36px] md:text-[52px]"
              }`}
            >
              {figure}
            </span>
            <span className="mt-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-mute text-center">
              {LABELS[i]}
            </span>
          </RiseIn>
        ))}
      </div>
    </section>
  );
}
