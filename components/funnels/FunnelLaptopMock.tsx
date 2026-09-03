"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  FUNNEL_CHASSIS,
  type FunnelChassis,
  type FunnelDesign,
} from "@/lib/funnels";

function AnimatedFunnelScreen({
  src,
  duration,
  label,
}: {
  src: string;
  duration: number;
  label: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const sync = () => el.style.setProperty("--viewH", `${el.clientHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="funnel-screen-viewport relative aspect-[16/10] w-full overflow-hidden bg-[#050508]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        className="funnel-auto-scroll pointer-events-none block h-auto w-full select-none"
        style={{ "--funnel-dur": `${duration}s` } as CSSProperties}
      />
    </div>
  );
}

export default function FunnelLaptopMock({
  funnel,
  className = "",
}: {
  funnel: Pick<FunnelDesign, "name" | "image" | "scrollDuration" | "chassis">;
  className?: string;
}) {
  const c = FUNNEL_CHASSIS[funnel.chassis as FunnelChassis];

  return (
    <div className={`relative mx-auto w-full max-w-[560px] ${className}`}>
      <div className="pointer-events-none absolute -bottom-4 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-black/[0.08] blur-2xl" />

      <div
        className="relative w-full overflow-hidden rounded-[14px] border-[3px] shadow-[0_28px_60px_rgba(0,0,0,0.12)]"
        style={{ background: c.lid, borderColor: c.lidEdge }}
      >
        <div
          className="relative flex h-4 w-full items-center justify-center sm:h-5"
          style={{ background: c.lid }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
        </div>
        <div className="relative mx-[9px] mb-[9px] overflow-hidden rounded-[7px] bg-[#0a0e14] sm:mx-[11px] sm:mb-[11px]">
          <AnimatedFunnelScreen
            src={funnel.image}
            duration={funnel.scrollDuration}
            label={funnel.name}
          />
        </div>
      </div>

      <div
        className="mx-auto h-[5px] w-[92%] rounded-b-[2px]"
        style={{
          background: `linear-gradient(180deg, ${c.lidEdge}, ${c.bodyEdge})`,
        }}
      />

      <div
        className="relative mx-auto h-10 w-[98%] overflow-hidden rounded-b-[16px] border border-t-0 shadow-[0_18px_36px_rgba(0,0,0,0.1)] sm:h-12"
        style={{ background: c.body, borderColor: c.bodyEdge }}
      >
        <div
          className="absolute inset-x-[12%] top-[22%] h-[28%] rounded-[2px]"
          style={{ background: c.keyboard }}
        />
        <div className="absolute bottom-[16%] left-1/2 h-[26%] w-[20%] -translate-x-1/2 rounded-[3px] border border-black/10 bg-black/[0.06]" />
      </div>
    </div>
  );
}
