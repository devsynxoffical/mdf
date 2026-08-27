"use client";

import { useEffect, useRef, useState } from "react";
import Counter from "@/components/ui/Counter";
import RiseIn from "@/components/ui/RiseIn";

const STATS: {
  label: string;
  node: (delay: number) => React.ReactNode;
}[] = [
  {
    label: "Revenue generated",
    node: (d) => <Counter value={100} prefix="$" suffix="M+" delay={d} />,
  },
  {
    label: "2CC & 9-figure clients",
    node: () => <span className="tabular">2CC</span>,
  },
  {
    label: "Dedicated experts",
    node: (d) => <Counter value={15} suffix="+" delay={d} />,
  },
  {
    label: "Service businesses scaled",
    node: (d) => <Counter value={500} suffix="+" delay={d} />,
  },
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
    <section ref={ref} className="relative border-y border-bone/[0.06]">
      {/* mint progress sweep along the top border */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px bg-brass transition-[width] ease-out"
        style={{ width: sweep ? "100%" : "0%", transitionDuration: "1400ms" }}
      />
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <RiseIn
            key={s.label}
            delay={i * 100}
            className={`flex gap-5 px-8 py-10 md:px-12 ${
              i > 0 ? "md:border-l md:border-bone/[0.06]" : ""
            } ${i >= 2 ? "border-t border-bone/[0.06] md:border-t-0" : ""}`}
          >
            <span className="stat-tick" aria-hidden />
            <div>
              <span className="block font-display text-[32px] font-light text-bone md:text-[44px]">
                {s.node(i * 100)}
              </span>
              <span className="mt-1.5 block font-body text-[13px] text-mute">
                {s.label}
              </span>
            </div>
          </RiseIn>
        ))}
      </div>
    </section>
  );
}
