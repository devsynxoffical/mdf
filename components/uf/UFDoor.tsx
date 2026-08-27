"use client";

import RiseIn from "@/components/ui/RiseIn";

/** (07) The door — the closing CTA, with the site footer folded in. */
export default function UFDoor() {
  return (
    <section id="door" className="uf-dark relative flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <RiseIn>
          <p className="uf-eyebrow text-mint">( 07 ) — The Door</p>
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
          <a href="#" className="uf-pill mt-10">
            Book the call
          </a>
          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            Prefer to message?{" "}
            <a href="#" className="text-bone underline underline-offset-4 hover:text-mint">
              WhatsApp us
            </a>
          </p>
        </RiseIn>
      </div>

      {/* footer */}
      <footer id="site-footer" className="border-t border-bone/[0.09] px-6 pb-8 pt-8 md:px-14">
        <p className="mx-auto max-w-[86ch] text-center font-body text-[11px] leading-[1.5] text-mute/60">
          Results shown are from specific client engagements and are not
          typical. Individual results vary based on offer, market, ad spend,
          and execution. Nothing here is a guarantee of earnings. See our
          Income Disclosure for details.
        </p>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            © 2026 MDF Growth Systems
          </p>
          <div className="flex gap-8">
            {["Instagram", "Facebook", "Email"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute transition-colors hover:text-mint"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            Million Dollar Funnel™
          </p>
        </div>
      </footer>
    </section>
  );
}
