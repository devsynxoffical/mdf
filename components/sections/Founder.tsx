"use client";

import Counter from "@/components/ui/Counter";
import RiseIn from "@/components/ui/RiseIn";

const COUNTERS = [
  { value: 500, suffix: "+", label: "Businesses Scaled" },
  { value: 100, suffix: "+", label: "Founders Mentored" },
  { value: 35, prefix: "$", suffix: "M+", label: "Facebook Ad Spend" },
  { value: 11, label: "Years Running Ads" },
];

export default function Founder() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-32 md:px-12">
      <div className="grid items-center gap-14 md:grid-cols-[42%_1fr]">
        {/* Portrait */}
        <RiseIn>
          <div className="relative">
            {/* brass wireframe torus behind the portrait — the subject stands inside the system */}
            <svg
              viewBox="0 0 400 400"
              className="absolute -left-10 -top-10 h-[120%] w-[120%] opacity-60"
              aria-hidden
            >
              <g fill="none" stroke="#8A6224" strokeWidth="0.8">
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i / 12) * 180;
                  return (
                    <ellipse
                      key={i}
                      cx="200"
                      cy="200"
                      rx="170"
                      ry="60"
                      transform={`rotate(${a} 200 200)`}
                      opacity={0.5}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`${a} 200 200`}
                        to={`${a + 360} 200 200`}
                        dur="60s"
                        repeatCount="indefinite"
                      />
                    </ellipse>
                  );
                })}
              </g>
            </svg>
            <div
              className="relative overflow-hidden rounded-[24px]"
              style={{ aspectRatio: "4/5" }}
            >
              {/* duotone placeholder portrait — swap for the real photo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #121826 0%, #07090E 55%), radial-gradient(60% 50% at 70% 30%, rgba(224,163,64,0.25), transparent)",
                  backgroundBlendMode: "screen",
                }}
              />
              <svg viewBox="0 0 400 500" className="relative h-full w-full" aria-label="Portrait of Gaurav Kapoor (placeholder)">
                <rect width="400" height="500" fill="#0B0F17" />
                {/* abstract figure */}
                <circle cx="200" cy="180" r="70" fill="#121826" />
                <path d="M80 500 Q90 330 200 320 Q310 330 320 500 Z" fill="#121826" />
                {/* brass rim light on the right edge */}
                <path d="M258 130 Q276 175 262 228" stroke="#E0A340" strokeWidth="3" fill="none" opacity="0.7" />
                <path d="M300 340 Q316 410 318 500" stroke="#E0A340" strokeWidth="3" fill="none" opacity="0.5" />
                <text x="200" y="470" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#7C879B">
                  PORTRAIT — GAURAV KAPOOR
                </text>
              </svg>
            </div>
          </div>
        </RiseIn>

        {/* Content */}
        <div>
          <RiseIn>
            <p className="eyebrow">Who Builds It</p>
          </RiseIn>
          <RiseIn delay={80}>
            <h2 className="mt-4 font-display text-[clamp(32px,3.5vw,44px)] font-bold text-bone">
              Gaurav Kapoor
            </h2>
          </RiseIn>
          <RiseIn delay={140}>
            <p
              className="mt-2 font-mono text-[13px] uppercase text-signal"
              style={{ letterSpacing: "0.14em" }}
            >
              Founder · Million Dollar Funnel™
            </p>
          </RiseIn>
          <RiseIn delay={200}>
            <p className="mt-6 max-w-[46ch] font-body text-[17px] leading-[1.6] text-mute">
              Eleven years and $35M+ in Facebook ad spend across the US, UK,
              Canada, and Australia — in tight, competitive niches. 500+ service
              businesses scaled. 100+ founders mentored.
            </p>
          </RiseIn>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {COUNTERS.map((c, i) => (
              <RiseIn
                key={c.label}
                delay={i * 100}
                className="rounded-2xl border border-bone/[0.08] p-6"
              >
                <span className="font-display text-[30px] md:text-s40 font-semibold text-brass">
                  <Counter value={c.value} prefix={c.prefix} suffix={c.suffix} delay={i * 100} />
                </span>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-mute">
                  {c.label}
                </p>
              </RiseIn>
            ))}
          </div>

          <RiseIn delay={200}>
            <a
              href="#book"
              className="mt-10 block rounded-full bg-brass px-8 py-[18px] text-center font-body text-s16 font-semibold text-ink transition-[filter,box-shadow] duration-200 hover:brightness-[1.08] hover:shadow-[0_0_32px_rgba(224,163,64,0.35)]"
            >
              Get my Million Dollar Funnel
            </a>
            <p className="mt-4 text-center font-mono text-s12 uppercase tracking-eyebrow text-mute">
              100% Risk-Free · Performance-Backed
            </p>
          </RiseIn>
        </div>
      </div>
    </section>
  );
}
