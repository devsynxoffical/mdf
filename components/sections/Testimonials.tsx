"use client";

import RiseIn from "@/components/ui/RiseIn";
import PlayButton from "@/components/ui/PlayButton";

function VideoCard({
  name,
  role,
  result,
  seed,
  className = "",
  delay = 0,
}: {
  name: string;
  role: string;
  result: string;
  seed: number;
  className?: string;
  delay?: number;
}) {
  return (
    <RiseIn delay={delay} className={className}>
      <button
        className="group relative block w-full overflow-hidden rounded-[20px] border border-bone/[0.08] bg-slate2 transition-colors duration-[250ms] hover:border-brass/30"
        style={{ aspectRatio: "16/9" }}
        aria-label={`Play testimonial from ${name}`}
      >
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(90% 90% at ${20 + seed * 25}% 20%, rgba(${
              seed % 2 ? "63,224,176" : "224,163,64"
            },0.08), transparent), #121826`,
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-ink/35 transition-colors duration-[250ms] group-hover:bg-ink/25"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <PlayButton size={56} />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-brass px-3 py-1 font-mono text-s12 text-ink">
          {result}
        </span>
        <span className="absolute bottom-4 left-5 text-left">
          <span className="block font-body text-[15px] font-semibold text-bone">{name}</span>
          <span className="block font-mono text-s12 text-mute">{role}</span>
        </span>
      </button>
    </RiseIn>
  );
}

function Quote({
  quote,
  attribution,
  delay = 0,
}: {
  quote: string;
  attribution: string;
  delay?: number;
}) {
  return (
    <RiseIn delay={delay}>
      <figure className="flex h-full gap-5 rounded-[20px] bg-slate2/50 p-6">
        <span aria-hidden className="w-0.5 shrink-0 self-stretch bg-brass" />
        <div>
          <blockquote className="font-display text-[20px] md:text-[22px] font-medium leading-[1.4] text-bone">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 font-mono text-s12 text-mute">{attribution}</figcaption>
        </div>
      </figure>
    </RiseIn>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-32 md:px-12">
      <RiseIn>
        <p className="eyebrow">What Clients Say</p>
      </RiseIn>
      <RiseIn delay={80}>
        <h2 className="mt-5 font-display text-[clamp(30px,3.6vw,48px)] font-semibold tracking-display text-bone">
          The system, in their words.
        </h2>
      </RiseIn>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Large video — columns 1–7 */}
        <VideoCard
          className="md:col-span-7"
          name="Marcus T."
          role="COACHING · US"
          result="3.32 ROAS"
          seed={0}
          delay={0}
        />
        {/* Two stacked quotes — columns 8–12 */}
        <div className="flex flex-col gap-6 md:col-span-5">
          <Quote
            delay={70}
            quote="They rebuilt the backend in three weeks. The calendar hasn't had an empty week since."
            attribution="SARAH K. · MED SPA OWNER"
          />
          <Quote
            delay={140}
            quote="First agency that treated follow-up as the product, not an afterthought."
            attribution="DANIEL R. · ROOFING"
          />
        </div>
        {/* Offset second row — deliberately starts lower so the grid never resolves neat */}
        <div className="hidden md:col-span-2 md:block" aria-hidden />
        <VideoCard
          className="md:col-span-5 md:mt-10"
          name="Priya S."
          role="LEGAL · UK"
          result="2.95 ROAS"
          seed={1}
          delay={210}
        />
        <VideoCard
          className="md:col-span-5 md:mt-10"
          name="James W."
          role="HVAC · CANADA"
          result="3.90 ROAS"
          seed={2}
          delay={280}
        />
      </div>
    </section>
  );
}
