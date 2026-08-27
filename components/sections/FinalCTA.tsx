"use client";

import RiseIn from "@/components/ui/RiseIn";

export default function FinalCTA() {
  return (
    <section id="book" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-[820px] px-6 text-center">
        <RiseIn>
          <p className="inline-flex items-center gap-2.5 font-mono text-s12 uppercase tracking-eyebrow text-signal">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            Accepting 4 clients this quarter
          </p>
        </RiseIn>
        <RiseIn delay={100}>
          <h2 className="mt-8 font-display text-[clamp(40px,7vw,104px)] font-bold leading-[0.95] tracking-display text-bone">
            You&apos;re one funnel away.
          </h2>
        </RiseIn>
        <RiseIn delay={200}>
          <p className="mx-auto mt-8 max-w-[50ch] font-body text-s20 leading-[1.6] text-mute">
            Book a call and we&apos;ll map your acquisition system on the spot.
            If we build it and it doesn&apos;t perform, we keep working until it
            does — at no management fee.
          </p>
        </RiseIn>
        <RiseIn delay={300}>
          <a
            href="#"
            className="mt-10 inline-block w-full rounded-full bg-brass px-12 py-5 font-body text-[18px] font-semibold text-ink transition-[filter,box-shadow] duration-200 hover:brightness-[1.08] hover:shadow-[0_0_40px_rgba(224,163,64,0.4)] sm:w-auto"
          >
            Reserve your spot
          </a>
          <p className="mt-5 font-mono text-s12 uppercase tracking-eyebrow text-mute">
            100% Risk-Free · Performance-Backed · No Obligation
          </p>
        </RiseIn>
      </div>
    </section>
  );
}
