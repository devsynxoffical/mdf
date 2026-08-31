"use client";

import Magnetic from "./Magnetic";
import { CASE_STUDIES } from "@/lib/cases";

const casesHref =
  CASE_STUDIES.length === 1
    ? `/cases/${CASE_STUDIES[0].slug}`
    : "/cases";

const NAV = [
  ["Home", "/"],
  ["Cases", casesHref],
  ["Process", "/process"],
  ["About", "/about"],
  ["FAQ", "/faq"],
];

const LEGAL = [
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Income Disclosure", "/income-disclosure"],
];

export default function UFFooter() {
  return (
    <footer id="site-footer" className="uf-dark relative border-t border-white/10 bg-[#020926] text-white">
      {/* CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-6 px-4 py-12 sm:px-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:px-14 md:py-14">
          <div>
            <p className="font-sans text-[clamp(24px,3vw,40px)] font-extrabold leading-none tracking-tight text-white">
              Still reading?
            </p>
            <p className="mt-2 font-sans text-[clamp(20px,2.4vw,32px)] font-bold leading-none text-sky">
              Let&apos;s map your funnel.
            </p>
          </div>
          <Magnetic>
            <a href="/book" className="btn-gold">
              Book the call
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 md:py-14 md:px-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-sans text-[20px] font-extrabold tracking-tight text-white">
              Million Dollar Funnel<span className="text-sky">™</span>
            </p>
            <p className="mt-3 max-w-[32ch] font-sans text-[14px] leading-[1.6] text-slate-400">
              Client acquisition for high-ticket service providers.
            </p>
            <a
              href="mailto:hello@milliondollarfunnel.com"
              className="mt-5 inline-block font-sans text-[14px] font-medium text-white/90 transition-colors hover:text-sky"
            >
              hello@milliondollarfunnel.com
            </a>
            <p className="mt-5 inline-flex items-center gap-2 font-sans text-[12px] font-medium text-slate-400">
              <span
                className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_8px_#38BDF8]"
                aria-hidden
              />
              Accepting 4 clients this quarter
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-sans text-[14px] text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500">
              Legal
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-sans text-[14px] text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1180px] px-6 py-5 md:px-14">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate-500">
            © {new Date().getFullYear()} Million Dollar Funnel™ — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
