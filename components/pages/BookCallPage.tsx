"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import { playTick } from "@/components/audio/SoundToggle";
import { SITE } from "@/lib/site";
import { WORK_PROOF } from "@/lib/workproof";

const REVENUE = [
  "Under $10k / month",
  "$10k – $30k / month",
  "$30k – $100k / month",
  "$100k+ / month",
];

const BOTTLENECKS = [
  "Low-ticket front end not converting",
  "Traffic is expensive / leads not booking calls",
  "No CRM tracking / attribution chaos",
  "Paid ads not scaling profitably",
  "Need complete full-funnel rebuild & install",
];

const SLOTS = ["Morning (9am - 12pm)", "Afternoon (12pm - 4pm)", "Evening (4pm - 8pm)"];

interface VideoProof {
  id: string;
  name: string;
  role: string;
  headline: string;
  metric: string;
  videoUrl: string;
}

const FEATURED_VIDEOS: VideoProof[] = [
  {
    id: "mohanded",
    name: "Mohanded",
    role: "Agency Owner Germany",
    headline: "Massive ROAS Growth Across eCommerce, Skincare & Supplements",
    metric: "3.8x+ ROAS",
    videoUrl: "/testimonials/portrait-1.mp4",
  },
  {
    id: "edgar",
    name: "Edgar",
    role: "Agency Founder",
    headline: "Landed a $4,500 High-Ticket Client at Just $7 Cost Per Lead",
    metric: "$4,500 Won · $7 CPL",
    videoUrl: "/testimonials/portrait-2.mp4",
  },
  {
    id: "giulia",
    name: "Giulia",
    role: "Founder, MVA Agency",
    headline: "From 1 Lead in 3 Months to 2 Verified MVA Leads in Under 24 Hours",
    metric: "2 Leads in 24 Hrs",
    videoUrl: "/testimonials/landscape-3.mp4",
  },
  {
    id: "marie",
    name: "Marie Grace Berg",
    role: "Author & High-Ticket Coach",
    headline: "Generated 2,000+ Online Summit Registrations on Autopilot",
    metric: "2,000+ Registrations",
    videoUrl: "/testimonials/landscape-1.mp4",
  },
];

// Highlight 6 top screenshot receipts
const HIGHLIGHT_RECEIPTS = WORK_PROOF.slice(0, 6);

export default function BookCallPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoProof | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<typeof WORK_PROOF[0] | null>(null);

  // Close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setActiveReceipt(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setSubmitting(true);
    playTick();

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
      `Notes: ${payload.notes || "None"}`,
    ].join("\n");

    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
      "Million Dollar Funnel™ — Strategy Call Booking"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="bg-[#020926] text-white">
      {/* ─── 1. TOP SECTION: BOOKING INFO & FORM ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.35),transparent_65%)]" />
        <ContourBG tone="dark" />

        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 md:px-10 lg:grid-cols-[1.1fr_1.1fr] lg:gap-16">
          {/* Left Column: What to Expect & Session Details */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-sky">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky" />
              1-on-1 Funnel Strategy Session
            </div>

            <h1 className="mt-5 font-sans text-[clamp(36px,4.5vw,58px)] font-extrabold leading-[1.08] tracking-tight text-white">
              <Reveal as="span">
                <span className="block">Engineer Your</span>
              </Reveal>
              <Reveal as="span" delay={90}>
                <span className="block bg-gradient-to-r from-sky via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  Million-Dollar Funnel.
                </span>
              </Reveal>
            </h1>

            <p className="mt-5 max-w-[48ch] font-sans text-[16px] leading-[1.7] text-slate-300 sm:text-[17px]">
              100% risk-free. No aggressive sales pitch. On this call we map your offer, audit your current customer journey, and engineer the exact acquisition path for your niche.
            </p>

            {/* Session Roadmap Bullets */}
            <div className="mt-8 space-y-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
                What Happens on the 20-Min Call:
              </p>
              {[
                "Complete diagnostic of your offer, economics, and conversion gates",
                "Traffic & CRM leak inspection to see where revenue is slipping",
                "Custom 6-layer Million Dollar Funnel™ architecture mapped for your business",
                "Direct review with our systems team (Strictly 4 client installs/quarter)",
              ].map((item, i) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/20 text-sky text-xs font-mono font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="font-sans text-[14.5px] text-slate-200 leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-center">
                <p className="font-mono text-[18px] font-bold text-sky">15–20m</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Duration</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-center">
                <p className="font-mono text-[18px] font-bold text-amber-300">Zero</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Sales Pressure</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-center col-span-2 sm:col-span-1">
                <p className="font-mono text-[18px] font-bold text-emerald-400">4 Slots</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Cap / Quarter</p>
              </div>
            </div>

            <p className="mt-8 font-sans text-[13px] text-slate-400">
              Prefer direct email?{" "}
              <a href={`mailto:${SITE.email}`} className="text-sky font-semibold hover:underline">
                {SITE.email}
              </a>
            </p>
          </div>

          {/* Right Column: Interactive Booking / Application Form */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8 md:p-10 shadow-2xl">
            {sent ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="mt-6 font-sans text-[28px] font-extrabold tracking-tight text-white">
                  Strategy Session Requested
                </h2>
                <p className="mt-3 max-w-[34ch] font-sans text-[15px] leading-[1.6] text-slate-300">
                  Please complete sending the email that opened, or our team will reach out directly at your email address to confirm calendar availability.
                </p>
                <Link
                  href="/cases/coaching-lto"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-5 py-2.5 font-sans text-[13px] font-bold text-sky hover:bg-sky/20 transition"
                >
                  <span>Watch the 1:1 Case Study VSL</span>
                  <span>→</span>
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-sans text-[20px] font-bold text-white">
                    Apply for a Strategy Session
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mt-1">
                    Fill in your details so we can prepare your audit beforehand.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" name="name" required placeholder="Alex Morgan" />
                  <Field label="Work Email" name="email" type="email" required placeholder="you@company.com" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone / WhatsApp" name="phone" type="tel" required placeholder="+1 (555) 000-0000" />
                  <Field label="Company / Brand" name="business" required placeholder="Acme Systems" />
                </div>

                <Field label="Your Niche & Offer" name="niche" required placeholder="High-ticket coaching, roofing agency, SaaS..." />

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                    Current Monthly Revenue
                  </label>
                  <select
                    name="revenue"
                    required
                    className="w-full rounded-xl border border-white/15 bg-[#030922] px-4 py-3 font-sans text-[14px] text-white outline-none transition focus:border-sky"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select monthly revenue
                    </option>
                    {REVENUE.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                    Biggest Growth Bottleneck
                  </label>
                  <select
                    name="bottleneck"
                    required
                    className="w-full rounded-xl border border-white/15 bg-[#030922] px-4 py-3 font-sans text-[14px] text-white outline-none transition focus:border-sky"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select primary challenge
                    </option>
                    {BOTTLENECKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {SLOTS.map((slot) => (
                      <label key={slot} className="cursor-pointer">
                        <input type="radio" name="slot" value={slot} required className="peer sr-only" />
                        <span className="flex items-center justify-center rounded-xl border border-white/15 bg-[#030922] px-2 py-2.5 text-center font-mono text-[11px] font-semibold text-slate-300 transition peer-checked:border-sky peer-checked:bg-sky/20 peer-checked:text-white">
                          {slot.split(" ")[0]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                    Additional Context / Links (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Current website, funnel URL, ad budget, or main goal..."
                    className="w-full resize-none rounded-xl border border-white/15 bg-[#030922] px-4 py-2.5 font-sans text-[14px] text-white outline-none transition placeholder:text-slate-500 focus:border-sky"
                  />
                </div>

                <div className="pt-2">
                  <Magnetic strength={0.15}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full justify-center !py-3.5 !text-[15px] shadow-[0_10px_35px_rgba(234,179,8,0.35)] disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? "Opening Booking Request..." : "Request 1-on-1 Strategy Session →"}
                    </button>
                  </Magnetic>
                  <p className="mt-2.5 text-center font-mono text-[10.5px] text-slate-400">
                    🔒 Strict confidentiality. 100% private discussion.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── 2. BOTTOM SECTION: CLIENT TESTIMONIALS & RESULTS ─── */}
      <section className="relative py-20 sm:py-28 bg-[#030922] overflow-hidden border-b border-white/10">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 lg:px-14">
          {/* Header */}
          <div className="text-center max-w-[700px] mx-auto">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
              Verified Client Outcomes
            </span>
            <h2 className="mt-3 font-sans text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight text-white leading-tight">
              Testimonials & Proven Results
            </h2>
            <p className="mt-3 font-sans text-[16px] text-slate-300 leading-relaxed">
              Real agency owners, high-ticket coaches, and service founders sharing their unfiltered Million Dollar Funnel™ installs.
            </p>
          </div>

          {/* 4 Video Testimonial Cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_VIDEOS.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] transition-all duration-300 hover:border-sky/40 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_rgba(18,84,236,0.15)]"
              >
                {/* Video Viewport */}
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                  <video
                    src={item.videoUrl}
                    playsInline
                    muted
                    loop
                    onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030922] via-transparent to-black/40" />

                  {/* Top Metric Badge */}
                  <div className="absolute top-3 left-3 rounded-full border border-sky/30 bg-black/75 px-3 py-1 font-mono text-[10px] font-bold text-sky backdrop-blur-md">
                    {item.metric}
                  </div>

                  {/* Play Button Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      playTick();
                      setActiveVideo(item);
                    }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    aria-label={`Watch ${item.name}'s testimonial`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 transition-transform group-hover:scale-110 shadow-lg">
                      ▶
                    </span>
                  </button>
                </div>

                {/* Card Text Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans text-[15px] font-bold text-white">
                      {item.name}
                    </h3>
                    <p className="font-mono text-[11px] text-cyan-300">
                      {item.role}
                    </p>
                    <p className="mt-2 font-sans text-[13px] text-slate-300 line-clamp-2 leading-snug">
                      &ldquo;{item.headline}&rdquo;
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playTick();
                      setActiveVideo(item);
                    }}
                    className="mt-3 text-left font-mono text-[11px] font-bold text-sky hover:underline cursor-pointer"
                  >
                    Watch Full Video Review →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Live Metric Stats Bar */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="font-serif text-[clamp(28px,3.5vw,38px)] italic font-bold text-sky">3.8x+</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-300">Ecom & Scale ROAS</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="font-serif text-[clamp(28px,3.5vw,38px)] italic font-bold text-amber-300">$7 CPL</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-300">$4,500 Client Won</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="font-serif text-[clamp(28px,3.5vw,38px)] italic font-bold text-emerald-400">2,000+</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-300">Summit Registrations</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="font-serif text-[clamp(28px,3.5vw,38px)] italic font-bold text-cyan-300">50%</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-300">Lower Acquisition Cost</p>
            </div>
          </div>

          {/* Screenshot Receipts Highlights */}
          <div className="mt-16 border-t border-white/10 pt-14">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-sans text-[22px] font-bold text-white">
                  Live Meta Ads & CRM Receipts
                </h3>
                <p className="font-mono text-[12px] text-slate-400 mt-0.5">
                  Verified ad account metrics from active client campaigns.
                </p>
              </div>
              <Link
                href="/work-proof"
                onClick={() => playTick()}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky/30 bg-sky/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-sky hover:bg-sky/20 transition"
              >
                <span>View All 59 Receipts</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHT_RECEIPTS.map((r) => (
                <div
                  key={r.src}
                  onClick={() => {
                    playTick();
                    setActiveReceipt(r);
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#020617] p-3 transition-all duration-300 hover:border-sky/40 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.src}
                      alt={r.metricLabel}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="font-sans text-[13px] font-bold text-white">
                        {r.metric} <span className="text-cyan-300 text-[11px]">{r.metricLabel}</span>
                      </span>
                      <span className="rounded bg-sky/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-sky">
                        {r.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Video Modal Lightbox ─── */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setActiveVideo(null)}
        >
          <div className="absolute top-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/25 transition cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex max-h-[92vh] max-w-[840px] w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#030922] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
              <div>
                <h3 className="font-sans text-[17px] font-bold text-white">
                  {activeVideo.name}
                </h3>
                <p className="font-mono text-[12px] text-cyan-300">
                  {activeVideo.role}
                </p>
              </div>
              <span className="rounded-full border border-sky/30 bg-sky/10 px-3 py-1 font-mono text-[11px] font-bold text-sky">
                {activeVideo.metric}
              </span>
            </div>

            <div className="relative w-full aspect-[16/9] bg-black">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            <div className="p-4 border-t border-white/10 bg-[#020617]">
              <p className="font-sans text-[14.5px] font-semibold text-white">
                {activeVideo.headline}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Receipt Modal Lightbox ─── */}
      {activeReceipt && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setActiveReceipt(null)}
        >
          <div className="absolute top-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setActiveReceipt(null)}
              className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/25 transition cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#030922] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex w-full items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-sans text-[17px] font-bold text-white">
                  {activeReceipt.metric} <span className="text-cyan-300 text-[13px]">{activeReceipt.metricLabel}</span>
                </h3>
                <p className="font-mono text-[12px] text-slate-400">
                  {activeReceipt.niche} · {activeReceipt.tag}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 font-mono text-[11px] font-bold text-emerald-300">
                ✓ Verified
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeReceipt.src}
              alt={activeReceipt.metricLabel}
              className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
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
      <label className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-[#030922] px-4 py-3 font-sans text-[14px] text-white outline-none transition placeholder:text-slate-500 focus:border-sky"
      />
    </div>
  );
}
