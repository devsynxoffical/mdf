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
    <footer id="site-footer" className="uf-dark relative bg-[#020926] text-white border-t border-white/10">
      {/* CTA banner */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <div>
            <p className="font-sans text-[clamp(24px,3vw,42px)] leading-none text-white font-extrabold tracking-tight">
              Still reading?
            </p>
            <p className="font-sans mt-2 text-[clamp(20px,2.4vw,34px)] leading-none text-sky font-bold">
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
            <p className="font-sans text-[22px] text-white font-extrabold tracking-tight">
              Million Dollar Funnel
              <span className="text-sky">™</span>
            </p>
            <p className="mt-4 max-w-[30ch] font-sans text-[14px] leading-[1.6] text-slate-400">
              Client acquisition for high-ticket service providers.
            </p>

            <a
              href="mailto:hello@milliondollarfunnel.com"
              className="link-sweep mt-6 inline-block font-sans text-[14px] text-white/90 hover:text-sky transition-colors font-medium"
            >
              hello@milliondollarfunnel.com
            </a>

            <p className="mt-7 inline-flex items-center gap-2.5 font-sans text-[12px] text-slate-400 font-medium">
              <span
                className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_8px_#38BDF8]"
                aria-hidden
              />
              Accepting 4 clients this quarter
            </p>
          </div>

          {/* navigate */}
          <nav className="md:col-span-2" aria-label="Footer">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-400">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="link-sweep font-body text-[13.5px] text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <div className="md:col-span-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-400">
              What We Build
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="font-body text-[13.5px] text-slate-400">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* legal + social */}
          <div className="md:col-span-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-400">
              Legal
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="link-sweep font-body text-[13.5px] text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-9 font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-400">
              Follow
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIAL.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="link-sweep font-body text-[13.5px] text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* niches served */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-400">
            Niches Served
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <a
                  href="/#door"
                  className="inline-block rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-slate-400 transition-colors duration-200 hover:border-cobalt hover:text-sky"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* disclaimer */}
        <p className="mt-14 max-w-[80ch] font-body text-[11.5px] leading-[1.6] text-slate-500">
          <span className="text-slate-400">Earnings disclaimer.</span> Results
          shown are from specific client engagements and are not typical.
          Individual results vary and nothing here guarantees earnings. See our
          Income Disclosure. Not affiliated with or endorsed by Meta or Google.
        </p>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row md:px-14">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate-400">
            © {new Date().getFullYear()} Million Dollar Funnel™ — All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
