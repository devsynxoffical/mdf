"use client";

import Magnetic from "./Magnetic";
import { CATEGORIES, VIDEOS } from "@/lib/videos";

const NAV = [
  ["The Problem", "/#top"],
  ["The Proof", "/#proof"],
  ["The Work", "/#work"],
  ["Portfolio", "/portfolio"],
  ["Questions", "/#faq"],
];

const SERVICES = [
  "Landing Architecture",
  "A2P Compliance & Setup",
  "AI Automations",
  "SMS & Email Sequences",
  "Voicemail Drops",
  "CRM Management",
];

const LEGAL = [
  ["Terms of Service", "#"],
  ["Privacy Policy", "#"],
  ["DMCA Policy", "#"],
  ["Income Disclosure", "#"],
];

const SOCIAL = [
  ["Instagram", "#"],
  ["LinkedIn", "#"],
  ["YouTube", "#"],
  ["X / Twitter", "#"],
];

export default function UFFooter() {
  return (
    <footer id="site-footer" className="uf-dark relative border-t rule-dark">
      {/* CTA banner */}
      <div className="border-b rule-dark">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <div>
            <p className="font-condensed text-[clamp(24px,3vw,42px)] leading-none text-bone">
              Still reading?
            </p>
            <p className="font-editorial mt-2 text-[clamp(20px,2.4vw,34px)] leading-none text-mint">
              Let&apos;s map your funnel.
            </p>
          </div>
          <Magnetic>
            <a href="#door" className="btn-gold">
              Book the call
            </a>
          </Magnetic>
        </div>
      </div>

      {/* columns */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-14">
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-4">
            <p className="font-condensed text-[22px] text-bone">
              Million Dollar Funnel
              <span className="text-mint">™</span>
            </p>
            <p className="mt-4 max-w-[34ch] font-body text-[14px] leading-[1.6] text-mute">
              A client acquisition system for high-ticket service providers.
              Built, launched, and managed end to end by our team.
            </p>

            <dl className="mt-8 space-y-3">
              {[
                ["Email", "hello@milliondollarfunnel.com"],
                ["Hours", "Mon–Fri · 9am–6pm EST"],
                ["Coverage", "US · UK · Canada · Australia"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4">
                  <dt className="w-[70px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.16em] text-mute/60">
                    {k}
                  </dt>
                  <dd className="font-body text-[13.5px] text-bone/85">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
              <span
                className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-mint"
                aria-hidden
              />
              Accepting 4 clients this quarter
            </p>
          </div>

          {/* navigate */}
          <nav className="md:col-span-2" aria-label="Footer">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/60">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="link-sweep font-body text-[13.5px] text-mute transition-colors duration-200 hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <div className="md:col-span-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/60">
              What We Build
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="font-body text-[13.5px] text-mute">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* legal + social */}
          <div className="md:col-span-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/60">
              Legal
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="link-sweep font-body text-[13.5px] text-mute transition-colors duration-200 hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-9 font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/60">
              Follow
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIAL.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="link-sweep font-body text-[13.5px] text-mute transition-colors duration-200 hover:text-bone"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* niches served */}
        <div className="mt-16 border-t rule-dark pt-10">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mute/60">
            Niches Served · {VIDEOS.length} Creatives Live
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a
                  href="/portfolio"
                  className="inline-block rounded-full border border-bone/10 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-mute transition-colors duration-200 hover:border-brass/50 hover:text-brass"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* disclaimer */}
        <p className="mt-14 max-w-[92ch] font-body text-[11.5px] leading-[1.65] text-mute/55">
          <span className="text-mute/75">Earnings disclaimer.</span> Results
          shown are from specific client engagements and are not typical.
          Individual results vary based on offer, market, ad spend, and
          execution. Nothing on this site is a guarantee of earnings or a
          promise of future performance. See our Income Disclosure for full
          details. This site is not part of, or endorsed by, Meta, Google, or
          any of their affiliates.
        </p>
      </div>

      {/* bottom bar */}
      <div className="border-t rule-dark">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row md:px-14">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-mute/70">
            © {new Date().getFullYear()} Million Dollar Funnel™ — All rights
            reserved
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-mute/70">
            Built for operators, not spectators
          </p>
        </div>
      </div>
    </footer>
  );
}
