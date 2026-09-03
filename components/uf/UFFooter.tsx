"use client";

import ContourBG from "./ContourBG";
import { CASE_STUDIES } from "@/lib/cases";
import { SITE } from "@/lib/site";

const casesHref =
  CASE_STUDIES.length === 1
    ? `/cases/${CASE_STUDIES[0].slug}`
    : "/cases";

const casesLabel =
  CASE_STUDIES.length === 1 ? CASE_STUDIES[0].navLabel : "Cases";

const EXPLORE = [
  ["Home", "/"],
  [casesLabel, casesHref],
  ["Work Proof", "/work-proof"],
  ["Funnel Designs", "/funnels"],
  ["Process", "/process"],
] as const;

const COMPANY = [
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["Book a call", "/book"],
] as const;

const LEGAL = [
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Income Disclosure", "/income-disclosure"],
  ["DMCA", "/dmca"],
] as const;

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 font-sans text-[14px] text-slate-400 transition-colors hover:text-white"
    >
      <span className="h-px w-0 bg-sky transition-all duration-300 group-hover:w-3" aria-hidden />
      {children}
    </a>
  );
}

/**
 * Site footer — brand-forward close, clear columns, cobalt atmosphere.
 */
export default function UFFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="uf-dark relative overflow-hidden bg-[#020926] text-white"
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(18,84,236,0.22),transparent_45%),radial-gradient(ellipse_at_90%_100%,rgba(56,189,248,0.08),transparent_40%)]"
      />
      <ContourBG tone="dark" />

      {/* Link grid */}
      <div className="relative mx-auto max-w-[1180px] px-4 py-14 sm:px-6 md:px-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky/40 bg-sky/10 shadow-[0_0_16px_rgba(56,189,248,0.35)]">
                <span className="h-2 w-2 rounded-full bg-sky" />
              </span>
              <span className="font-sans text-[18px] font-extrabold tracking-tight text-white">
                MDF<span className="text-sky">™</span>
              </span>
            </a>
            <p className="mt-4 max-w-[28ch] font-sans text-[14px] leading-[1.65] text-slate-400">
              Predictable high-ticket client acquisition — built, launched, and managed
              for you.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-block font-sans text-[14px] font-medium text-white transition hover:text-sky"
            >
              {SITE.email}
            </a>
            <p className="mt-5 inline-flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span
                className="live-dot h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_10px_#38BDF8]"
                aria-hidden
              />
              Accepting 4 clients this quarter
            </p>
          </div>

          <nav aria-label="Explore">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky/80">
              Explore
            </p>
            <ul className="mt-5 space-y-3.5">
              {EXPLORE.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky/80">
              Company
            </p>
            <ul className="mt-5 space-y-3.5">
              {COMPANY.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sky/80">
              Legal
            </p>
            <ul className="mt-5 space-y-3.5">
              {LEGAL.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Giant brand mark */}
      <div className="relative overflow-hidden border-t border-white/10" aria-hidden>
        <p className="select-none px-4 py-6 text-center font-sans text-[clamp(48px,14vw,160px)] font-black leading-none tracking-[-0.06em] text-white/[0.04] sm:px-6 md:px-14 md:py-8">
          MDF™
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
            © {year} {SITE.brand} — All rights reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Built for operators who measure revenue
          </p>
        </div>
      </div>
    </footer>
  );
}
