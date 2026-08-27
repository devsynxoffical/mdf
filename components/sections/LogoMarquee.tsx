"use client";

import RiseIn from "@/components/ui/RiseIn";

// Placeholder wordmarks — swap for real client logo SVGs before launch.
const ROW_1 = [
  "Northline Roofing",
  "Apex Coaching Co.",
  "Vantage Legal",
  "Summit HVAC",
  "Clearpath Dental",
  "Ironclad Fitness",
];
const ROW_2 = [
  "BlueOak Realty",
  "Meridian Med Spa",
  "Forge Consulting",
  "Atlas Solar",
  "Crestview Ortho",
  "Halden & Co.",
];

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row relative overflow-hidden py-5">
      <div
        className={`flex w-max items-center gap-16 ${
          direction === "left" ? "marquee-track-left" : "marquee-track-right"
        }`}
        style={{ "--marquee-duration": direction === "left" ? "40s" : "55s" } as React.CSSProperties}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="h-8 shrink-0 whitespace-nowrap font-display text-[22px] font-normal leading-8 text-mute opacity-45 grayscale transition-all duration-200 hover:text-bone hover:opacity-100 hover:grayscale-0"
            aria-hidden={i >= items.length}
          >
            {name}
          </span>
        ))}
      </div>
      {/* edge masks */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[180px]"
        style={{ background: "linear-gradient(to right, #0A0908, transparent)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[180px]"
        style={{ background: "linear-gradient(to left, #0A0908, transparent)" }}
      />
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="py-[120px]">
      <RiseIn>
        <p className="bracket-label mb-10 text-center">
          Trusted by 2CC winners and high-ticket service providers
        </p>
      </RiseIn>
      <Row items={ROW_1} direction="left" />
      <Row items={ROW_2} direction="right" />
    </section>
  );
}
