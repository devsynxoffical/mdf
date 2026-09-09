"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ContourBG from "@/components/uf/ContourBG";
import Reveal from "@/components/uf/Reveal";
import Magnetic from "@/components/uf/Magnetic";
import { playTick } from "@/components/audio/SoundToggle";
import { SITE_FAQ } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

interface FAQItem {
  id: string;
  category: "Fit & Target Clients" | "Funnel Scope & Tech" | "Ads & Conversions" | "Timeline & Guarantee";
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "Fit & Target Clients",
    q: "Who do you help with the Million Dollar Funnel™ System?",
    a: "High-ticket service providers, coaches, consultants, and agencies already generating revenue who need a predictable acquisition system — not just referrals and word of mouth. Best fit: teams ready to sell a low-ticket offer or VSL consistently so high-ticket can scale on a real foundation.",
  },
  {
    id: "faq-2",
    category: "Funnel Scope & Tech",
    q: "What’s included in your Million Dollar Funnel™ System?",
    a: "Everything needed for end-to-end client acquisition: custom landing architecture, offer & path mapping, A2P compliance, AI automations, SMS & email nurture sequences, voicemail drops, CRM setup, tracking pixels, and launch support — engineered and managed so you never touch the tech.",
  },
  {
    id: "faq-3",
    category: "Funnel Scope & Tech",
    q: "Do you handle the entire technical side of the funnel?",
    a: "Yes, 100% of it. Integrations, pixels, UTM attribution, A2P deliverability, CRM pipelines, and follow-up logic. You review the strategic messaging and creative direction; our team builds and operates the engine.",
  },
  {
    id: "faq-4",
    category: "Ads & Conversions",
    q: "Can you help me get more qualified bookings with paid ad funnels?",
    a: "Yes — that’s our primary core competency. Paid ads feed the funnel; the funnel qualifies and books appointments automatically. We engineer both sides so your ad creative, landing page, and CRM backend work together seamlessly.",
  },
  {
    id: "faq-5",
    category: "Funnel Scope & Tech",
    q: "Do you build custom funnels or customize existing platforms?",
    a: "Both. We audit your existing stack, preserve whatever converts, rebuild the leaky steps, and integrate full tracking so you can scale without guessing where revenue drops off.",
  },
  {
    id: "faq-6",
    category: "Timeline & Guarantee",
    q: "How fast does a full funnel install go live?",
    a: "Most custom installs are live on real traffic within 3 to 4 weeks. After launch, we monitor and optimize the numbers week after week until unit economics and booking rates compound.",
  },
  {
    id: "faq-7",
    category: "Fit & Target Clients",
    q: "Do I need a low-ticket offer first before doing high-ticket?",
    a: "If you're experiencing inconsistent sales or high customer acquisition costs, introducing a low-ticket front end pays for your ad spend while qualifying buyers for your high-ticket backend. We map out whichever structure fits your business best.",
  },
  {
    id: "faq-8",
    category: "Timeline & Guarantee",
    q: "What does the 1-on-1 strategy call actually cover?",
    a: "A focused 15–20 minute live diagnostic: we review your offer, audit your current funnel and tracking, pinpoint where leads are dropping off, and show you exactly how the Million Dollar Funnel™ architecture would run in your niche.",
  },
  {
    id: "faq-9",
    category: "Timeline & Guarantee",
    q: "Is the system performance-backed and risk-free?",
    a: "All engagements are clearly scoped in writing. We stand firmly behind our system architecture, execution speed, and conversion standards. We provide specific milestones and performance checkpoints for every client build.",
  },
  {
    id: "faq-10",
    category: "Fit & Target Clients",
    q: "Who is this NOT for?",
    a: "Complete beginners without a validated offer or business, businesses unwilling to invest in paid traffic or follow-up infrastructure, or anyone looking for a generic passive course rather than a professionally engineered client acquisition install.",
  },
];

const CATEGORIES = [
  "All FAQs",
  "Fit & Target Clients",
  "Funnel Scope & Tech",
  "Ads & Conversions",
  "Timeline & Guarantee",
] as const;

export default function FaqPage() {
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-2"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All FAQs");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (id: string) => {
    playTick();
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    playTick();
    setOpenIds(FAQ_DATA.map((f) => f.id));
  };

  const collapseAll = () => {
    playTick();
    setOpenIds([]);
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedCategory === "All FAQs") return true;
      return item.category === selectedCategory;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#020926] text-white">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/10">
        <ContourBG tone="dark" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,84,236,0.3),transparent_65%)]" />

        <div className="relative mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10">
          <p className="uf-eyebrow text-sky">( FAQ ) — Direct Answers</p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 className="font-sans text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.08] tracking-tight text-white">
                <Reveal as="span">
                  <span className="block">Everything You Need to Know</span>
                </Reveal>
                <Reveal as="span" delay={90}>
                  <span className="block bg-gradient-to-r from-sky via-cyan-300 to-amber-300 bg-clip-text text-transparent">
                    Before Booking.
                  </span>
                </Reveal>
              </h1>
              <p className="mt-5 max-w-[50ch] font-sans text-[16px] leading-[1.7] text-slate-300 sm:text-[17px]">
                Transparent, unfiltered answers on client fit, funnel deliverables, tech integrations, ad management, and launch timelines.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md">
              <div className="flex-1 min-w-[110px]">
                <p className="font-serif text-[28px] italic leading-none text-sky">
                  10 Key Q&apos;s
                </p>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Covered Below
                </p>
              </div>
              <div className="h-8 w-px bg-white/15" aria-hidden />
              <div className="flex-1 min-w-[110px]">
                <p className="font-serif text-[28px] italic leading-none text-amber-300">
                  3–4 Wks
                </p>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Go-Live Speed
                </p>
              </div>
            </div>
          </div>

          {/* ─── Search & Category Filters Bar ─── */}
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playTick();
                      setSelectedCategory(cat);
                    }}
                    className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-sky text-[#020926] shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                        : "bg-white/[0.06] text-slate-300 hover:bg-white/15 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px] sm:w-[260px]">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 pl-8 font-sans text-[13px] text-white placeholder-slate-400 outline-none transition focus:border-sky focus:bg-white/[0.1]"
              />
              <span className="absolute left-3 top-2 text-slate-400 text-xs">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1.5 font-mono text-[11px] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Expand / Collapse Controls */}
          <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Showing {filteredFAQs.length} questions</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-sky transition cursor-pointer"
              >
                Expand All
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-sky transition cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FAQ ACCORDION LIST ─── */}
      <section className="relative py-16 sm:py-20">
        <ContourBG tone="dark" />
        <div className="relative mx-auto max-w-[1040px] px-4 sm:px-6 md:px-10">
          {filteredFAQs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="font-sans text-[18px] text-slate-300">
                No questions match &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All FAQs");
                }}
                className="mt-4 text-sky hover:underline font-mono text-xs uppercase font-bold"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => {
                const isOpen = openIds.includes(item.id);
                const num = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-sky/40 bg-white/[0.06] shadow-[0_10px_30px_rgba(18,84,236,0.15)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(item.id)}
                      className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                        <span className="font-mono text-[12px] font-bold text-sky mt-0.5 shrink-0">
                          {num}
                        </span>
                        <div>
                          <div className="mb-1.5 flex items-center gap-2">
                            <span className="rounded-full bg-sky/10 border border-sky/20 px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-sky">
                              {item.category}
                            </span>
                          </div>
                          <h2
                            className={`font-sans text-[16.5px] sm:text-[18px] font-bold leading-snug transition-colors ${
                              isOpen ? "text-white" : "text-slate-200"
                            }`}
                          >
                            {item.q}
                          </h2>
                        </div>
                      </div>

                      {/* Animated Toggle Icon */}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-sky bg-sky text-[#020926] rotate-45"
                            : "border-white/20 bg-white/5 text-slate-300"
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>

                    {/* Accordion Content */}
                    <div
                      className="grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/10 px-5 pt-4 pb-6 sm:px-6 sm:pt-4 sm:pb-6 pl-11 sm:pl-14">
                          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.7] text-slate-300">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── 3. STILL HAVE A QUESTION CTA CARD ─── */}
          <div className="mt-16 rounded-3xl border border-white/15 bg-gradient-to-r from-[#07133D] via-[#09184D] to-[#040C29] p-8 sm:p-10 md:p-12 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-amber-300">
                Custom Question?
              </span>
              <h3 className="mt-2 font-sans text-[clamp(22px,3vw,32px)] font-extrabold text-white">
                Have a unique offer or custom funnel question?
              </h3>
              <p className="mt-2 max-w-[46ch] font-sans text-[15px] text-slate-300">
                Book a 15–20 minute strategy call — we’ll analyze your exact setup live.
              </p>
            </div>
            <Magnetic strength={0.2}>
              <Link
                href={ROUTES.book}
                onClick={() => playTick()}
                className="btn-gold shadow-[0_10px_35px_rgba(234,179,8,0.35)] shrink-0 self-start md:self-auto"
              >
                Book a Strategy Call →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
