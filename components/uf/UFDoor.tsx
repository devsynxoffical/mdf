"use client";

import RiseIn from "@/components/ui/RiseIn";
import Magnetic from "./Magnetic";

/** (07) The door — the closing CTA, with the site footer folded in. */
export default function UFDoor() {
  return (
    <section id="door" className="uf-dark relative flex min-h-[86vh] flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <RiseIn>
          <p className="uf-eyebrow text-mint">( 09 ) — The Door</p>
        </RiseIn>
        <RiseIn delay={100}>
          <h2 className="mt-10 leading-[0.88]">
            <span className="font-condensed block text-bone text-[clamp(44px,8vw,120px)]">
              Built To Attract.
            </span>
            <span className="font-editorial block text-mint text-[clamp(36px,6.6vw,100px)]">
              Wired To Convert.
            </span>
          </h2>
        </RiseIn>
        <RiseIn delay={200}>
          <p className="mt-8 max-w-[44ch] font-body text-[17px] leading-[1.6] text-mute">
            A funnel has one job. This page exists to start that conversation.
          </p>
        </RiseIn>
        <RiseIn delay={300}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href="#" className="btn-gold">
                Book the call
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a href="/portfolio" className="btn-ghost">
                See the portfolio
              </a>
            </Magnetic>
          </div>
          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            Prefer to message?{" "}
            <a href="#" className="text-bone underline underline-offset-4 hover:text-mint">
              WhatsApp us
            </a>
          </p>
        </RiseIn>
      </div>

    </section>
  );
}
