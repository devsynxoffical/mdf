"use client";

import { useState, type FormEvent } from "react";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import ResultsLogos from "@/components/uf/ResultsLogos";
import { SITE } from "@/lib/site";
import { ABOUT_PEOPLE, BOOK_VISUALS } from "@/lib/media";

const REVENUE = [
  "Under $10k / month",
  "$10k – $30k / month",
  "$30k – $100k / month",
  "$100k+ / month",
];

const BOTTLENECKS = [
  "Low-ticket not converting",
  "Leads not booking calls",
  "No tracking / CRM chaos",
  "Ads not scaling profitably",
  "Need full funnel rebuild",
];

const SLOTS = ["Morning", "Afternoon", "Evening"];

export default function BookCallPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setSubmitting(true);

    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Business: ${payload.business}`,
      `Niche: ${payload.niche}`,
      `Revenue: ${payload.revenue}`,
      `Bottleneck: ${payload.bottleneck}`,
      `Preferred time: ${payload.slot}`,
      "",
      String(payload.notes || ""),
    ].join("\n");

    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
      "Million Dollar Funnel™ — Strategy Call"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="bg-[#020926] text-white">
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.35),transparent_55%)]" />
        <ContourBG tone="dark" />

        <div className="relative mx-auto grid max-w-[1180px] gap-14 px-4 sm:px-6 md:px-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left copy */}
          <div>
            <p className="uf-eyebrow text-sky">( Book ) — Strategy Call</p>
            <h1 className="mt-5 max-w-[14ch] font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.05] tracking-tight">
              <Reveal as="span">
                <span className="block">Get My Million-</span>
              </Reveal>
              <Reveal as="span" delay={90}>
                <span className="block text-sky">Dollar Funnel</span>
              </Reveal>
            </h1>
            <p className="mt-6 max-w-[40ch] font-sans text-[16px] leading-[1.65] text-slate-300">
              100% risk-free. Performance-backed. On this call we map your offer, diagnose
              leaks, and show exactly how the Million Dollar Funnel™ system would run in your
              niche.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "15–20 minute strategy session",
                "Funnel + tracking audit of your current stack",
                "Clear next step — only if we’re a fit",
                "Accepting 4 clients this quarter",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-[15px] text-slate-200">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-3 gap-2">
              {BOOK_VISUALS.map((v) => (
                <div
                  key={v.src}
                  className="relative aspect-square overflow-hidden rounded-xl border border-white/12"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.src} alt={v.alt} className="h-full w-full object-cover" loading="lazy" />
                  {v.label && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                      {v.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-y-2">
              <div className="flex -space-x-3">
                {ABOUT_PEOPLE.slice(0, 5).map((p) => (
                  <div
                    key={p.src}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#020926] sm:h-10 sm:w-10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <span className="pl-3 font-sans text-[12px] text-slate-400 sm:pl-4">
                Join operators already scaling
              </span>
            </div>

            <p className="mt-8 font-sans text-[13px] text-slate-500">
              Or email{" "}
              <a href={`mailto:${SITE.email}`} className="text-sky hover:underline">
                {SITE.email}
              </a>
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-md sm:rounded-[28px] sm:p-8 md:p-10">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sky/20 text-sky">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="mt-6 font-sans text-[28px] font-extrabold tracking-tight">
                  Request sent
                </h2>
                <p className="mt-3 max-w-[32ch] font-sans text-[15px] leading-[1.6] text-slate-400">
                  Finish sending the email that opened, or we’ll follow up at the address you
                  provided. Talk soon.
                </p>
                <a href="/cases/coaching-lto" className="mt-8 font-sans text-[13px] font-semibold text-sky hover:underline">
                  Watch the case study VSL →
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" required placeholder="Alex Morgan" />
                  <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" required placeholder="+1…" />
                  <Field label="Business name" name="business" required placeholder="Acme Coaching" />
                </div>
                <Field label="Niche / offer" name="niche" required placeholder="Coaching, roofing, SaaS…" />

                <div>
                  <label className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Monthly revenue
                  </label>
                  <select
                    name="revenue"
                    required
                    className="w-full rounded-xl border border-white/15 bg-[#04103A] px-4 py-3.5 font-sans text-[15px] text-white outline-none transition focus:border-sky"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    {REVENUE.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Biggest bottleneck
                  </label>
                  <select
                    name="bottleneck"
                    required
                    className="w-full rounded-xl border border-white/15 bg-[#04103A] px-4 py-3.5 font-sans text-[15px] text-white outline-none transition focus:border-sky"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {BOTTLENECKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Preferred call time
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {SLOTS.map((slot) => (
                      <label
                        key={slot}
                        className="cursor-pointer"
                      >
                        <input type="radio" name="slot" value={slot} required className="peer sr-only" />
                        <span className="flex items-center justify-center rounded-xl border border-white/15 bg-[#04103A] px-1 py-3 text-center font-sans text-[11px] font-medium text-slate-300 transition peer-checked:border-sky peer-checked:bg-sky/15 peer-checked:text-white sm:px-2 sm:text-[13px]">
                          {slot}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Anything else?
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Current stack, ad spend, goals…"
                    className="w-full resize-none rounded-xl border border-white/15 bg-[#04103A] px-4 py-3.5 font-sans text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-sky"
                  />
                </div>

                <Magnetic strength={0.15}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full justify-center disabled:opacity-60"
                  >
                    {submitting ? "Opening…" : "Book My Strategy Call"}
                  </button>
                </Magnetic>
                <p className="text-center font-sans text-[12px] text-slate-500">
                  No spam. We’ll only use this to confirm your call.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-[#020926] py-20 md:py-24">
        <ContourBG tone="dark" />
        <div className="relative px-4 sm:px-6 md:px-14">
          <ResultsLogos tone="dark" />
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-[#04103A] px-4 py-3.5 font-sans text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-sky"
      />
    </div>
  );
}
