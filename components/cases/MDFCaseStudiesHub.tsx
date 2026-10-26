"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { CASES, CaseItem } from "@/lib/data/cases";
import { LEADS, LeadItem } from "@/lib/data/leads";

type CaseStudy = CaseItem | LeadItem;

export default function MDFCaseStudiesHub() {
  const [activeTab, setActiveTab] = useState<"leadgen" | "ecom">("leadgen");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  const rawItems: CaseStudy[] = useMemo(() => {
    return activeTab === "leadgen" ? LEADS : CASES;
  }, [activeTab]);

  const mediaFolder = activeTab === "leadgen" ? "lg" : "cs2";

  // Reset pagination and filter when tab changes
  const switchTab = (tab: "leadgen" | "ecom") => {
    setActiveTab(tab);
    setFilter("all");
    setSearchQuery("");
    setVisibleCount(12);
  };

  // Extract unique niches for current tab
  const niches = useMemo(() => {
    const counts: Record<string, number> = {};
    rawItems.forEach((c) => {
      counts[c.nic] = (counts[c.nic] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([nic]) => nic);
  }, [rawItems]);

  const filterOptions = useMemo(() => {
    return [
      { id: "all", label: "All Cases", count: rawItems.length },
      {
        id: "video",
        label: "Video Proofs",
        count: rawItems.filter((c) => c.type === "video").length,
      },
      {
        id: "image",
        label: "Breakdowns",
        count: rawItems.filter((c) => c.type === "image").length,
      },
      ...niches.slice(0, 8).map((nic) => ({
        id: nic,
        label: nic,
        count: rawItems.filter((c) => c.nic === nic).length,
      })),
    ];
  }, [rawItems, niches]);

  // Filter & Search logic
  const filteredCases = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return rawItems.filter((c) => {
      const matchFilter =
        filter === "all" || c.type === filter || c.nic === filter;
      if (!matchFilter) return false;
      if (!q) return true;
      const haystack = `${c.t} ${c.nic} ${c.rev} ${c.ro || ""} ${c.cap}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [rawItems, filter, searchQuery]);

  const displayedCases = useMemo(() => {
    return filteredCases.slice(0, visibleCount);
  }, [filteredCases, visibleCount]);

  // Handle modal keyboard navigation
  useEffect(() => {
    if (!activeModalCase) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalCase(null);
      } else if (e.key === "ArrowLeft") {
        const curIdx = filteredCases.findIndex((c) => c.id === activeModalCase.id);
        if (curIdx > 0) {
          setActiveModalCase(filteredCases[curIdx - 1]);
        }
      } else if (e.key === "ArrowRight") {
        const curIdx = filteredCases.findIndex((c) => c.id === activeModalCase.id);
        if (curIdx >= 0 && curIdx < filteredCases.length - 1) {
          setActiveModalCase(filteredCases[curIdx + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeModalCase, filteredCases]);

  return (
    <section className="mdf-case-hub" id="cases">
      {/* Header */}
      <div className="mdf-case-header">
        <div className="mdf-case-tag">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
          Verified Track Record · 251+ Documented Builds
        </div>
        <h1 className="mdf-case-title">
          Real Funnels. <span className="it">Real Numbers.</span>
        </h1>
        <p className="mdf-case-desc">
          Two comprehensive libraries of battle-tested client acquisitions. Pick the
          engine that aligns with your business model.
        </p>
      </div>

      {/* Top Split Hero Cards (Lead Gen & eCommerce) */}
      <div className="mdf-hub-cards">
        {/* Card 1: Lead Gen */}
        <div
          className={`mdf-hc ${activeTab === "leadgen" ? "active" : ""}`}
          onClick={() => switchTab("leadgen")}
          role="button"
          tabIndex={0}
        >
          <div className="mdf-fan">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/lg/Dd9D3rnSCMT.webp"
              alt="Lead generation proof"
              loading="lazy"
              style={{ "--r": "-8deg", "--x": "-30%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/lg/DdN7bs-xSg7.webp"
              alt="Lead generation proof"
              loading="lazy"
              style={{ "--r": "0deg", "--x": "0%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/lg/DbHD8X3ksnz.webp"
              alt="Lead generation proof"
              loading="lazy"
              style={{ "--r": "8deg", "--x": "30%" } as React.CSSProperties}
            />
          </div>
          <div className="mdf-hb">
            <span className="mdf-ht">High-Ticket Client Acquisition</span>
            <h2>Lead Generation & Appointments</h2>
            <div className="mdf-hn">
              <b>125</b>
              <span>verified case studies</span>
            </div>
            <p>
              Booked calls, verified high-intent applications, and lower CPL for
              service businesses, coaching, B2B agencies, roofing, legal, and local trades.
            </p>
            <div className="mdf-hch">
              <span>Roofing</span>
              <span>Legal / MVA</span>
              <span>Mortgage</span>
              <span>MedSpa</span>
              <span>Coaching</span>
              <span>B2B & Agencies</span>
            </div>
            <span className="mdf-btn-primary mt-auto self-start">
              {activeTab === "leadgen" ? "Currently Viewing" : "Switch to Lead Gen"} <i>&#8599;</i>
            </span>
          </div>
        </div>

        {/* Card 2: eCommerce */}
        <div
          className={`mdf-hc ${activeTab === "ecom" ? "active" : ""}`}
          onClick={() => switchTab("ecom")}
          role="button"
          tabIndex={0}
        >
          <div className="mdf-fan">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C9b-l3yS6GW.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "-8deg", "--x": "-30%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C9RU-C9yhfU.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "0deg", "--x": "0%" } as React.CSSProperties}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cs2/C83tKltSXUp.webp"
              alt="eCommerce proof"
              loading="lazy"
              style={{ "--r": "8deg", "--x": "30%" } as React.CSSProperties}
            />
          </div>
          <div className="mdf-hb">
            <span className="mdf-ht">Direct-Response Creative Scaling</span>
            <h2>eCommerce & DTC Brands</h2>
            <div className="mdf-hn">
              <b>126</b>
              <span>verified case studies</span>
            </div>
            <p>
              High-converting video creative engines, paid ads optimization, and conversion
              funnels scaling consumer brands from 5 to 7 figures.
            </p>
            <div className="mdf-hch">
              <span>Apparel</span>
              <span>Supplements</span>
              <span>Beauty & Skincare</span>
              <span>Jewelry</span>
              <span>DTC Brands</span>
              <span>Dropshipping</span>
            </div>
            <span className="mdf-btn-primary mt-auto self-start">
              {activeTab === "ecom" ? "Currently Viewing" : "Switch to eCommerce"} <i>&#8599;</i>
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mdf-cfil">
        <div className="mdf-cchips">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={filter === opt.id ? "on" : ""}
              onClick={() => {
                setFilter(opt.id);
                setVisibleCount(12);
              }}
            >
              {opt.label}
              <b>{opt.count}</b>
            </button>
          ))}
        </div>

        <label className="mdf-csrch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search revenue, niche, or keyword..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(12);
            }}
          />
        </label>
      </div>

      {/* Grid of Case Cards */}
      <div className="mdf-cgrid">
        {displayedCases.map((c) => (
          <div
            key={c.id}
            className="mdf-ck"
            onClick={() => setActiveModalCase(c)}
            role="button"
            tabIndex={0}
          >
            <div className="mdf-ck-im">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="blur"
                src={`/img/${mediaFolder}/${c.id}.webp`}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mn"
                src={`/img/${mediaFolder}/${c.id}.webp`}
                alt={`${c.nic} proof`}
                loading="lazy"
              />
              {c.type === "video" && (
                <span className="vb">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Video
                </span>
              )}
            </div>

            <div className="mdf-ck-tx">
              <div>
                <span className="tg">{c.nic}</span>
                <h3>{c.t}</h3>
                {c.ro && (
                  <span className="text-xs text-slate-400 font-mono block mb-1">
                    {c.ro} {c.rol}
                  </span>
                )}
              </div>

              <div className="fig">
                <div>
                  <b>{c.rev}</b>
                  <span>{c.revl}</span>
                </div>
                <span className="text-cyan-400 text-sm font-semibold">Inspect →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-16 text-slate-400 font-sans">
          No case studies match that search term. Try another niche or keyword.
        </div>
      )}

      {/* Load More Pagination */}
      {filteredCases.length > 0 && (
        <div className="mdf-cmore">
          {visibleCount < filteredCases.length && (
            <button
              type="button"
              className="mdf-btn-primary"
              onClick={() => setVisibleCount((prev) => Math.min(filteredCases.length, prev + 12))}
            >
              Load more case studies <i>&#8599;</i>
            </button>
          )}
          <span className="font-mono text-xs text-slate-400">
            Showing {Math.min(visibleCount, filteredCases.length)} of {filteredCases.length} verified results
          </span>
        </div>
      )}

      {/* Lightbox Modal for Case Breakdown */}
      {activeModalCase && (
        <div
          className="mdf-modal-backdrop"
          onClick={() => setActiveModalCase(null)}
        >
          <div
            className="mdf-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mdf-modal-close"
              aria-label="Close modal"
              onClick={() => setActiveModalCase(null)}
            >
              ✕
            </button>

            <div className="mdf-modal-grid">
              {/* Media Player Column */}
              <div className="mdf-modal-media">
                {activeModalCase.type === "video" ? (
                  <video
                    src={`/vid/${mediaFolder}/${activeModalCase.id}.mp4`}
                    poster={`/img/${mediaFolder}/${activeModalCase.id}.webp`}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`/img/${mediaFolder}/${activeModalCase.id}.webp`}
                    alt={`${activeModalCase.nic} breakdown`}
                  />
                )}
              </div>

              {/* Breakdown Details Column */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block py-1 px-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      {activeModalCase.nic}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      Case #{String(activeModalCase.i).padStart(3, "0")}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-3">
                    {activeModalCase.t}
                  </h2>

                  {/* Metrics Row */}
                  <div className="mdf-modal-metrics">
                    <div>
                      <span>Verified Result</span>
                      <b>{activeModalCase.rev}</b>
                    </div>
                    <div>
                      <span>Efficiency / Scale</span>
                      <b>{activeModalCase.ro || (activeModalCase.type === "video" ? "Video Proof" : "Verified Dashboard")}</b>
                    </div>
                    <div>
                      <span>Niche Market</span>
                      <b className="text-sm text-slate-200">{activeModalCase.nic}</b>
                    </div>
                    <div>
                      <span>Architecture</span>
                      <b className="text-sm text-slate-200">{activeModalCase.sys}</b>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  {activeModalCase.pts && activeModalCase.pts.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-wider font-mono text-cyan-400 mb-2">
                        Key Architecture Elements:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {activeModalCase.pts.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">✦</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Narrative Caption */}
                  <div className="max-h-48 overflow-y-auto pr-2 text-xs text-slate-300 leading-relaxed space-y-2 border-t border-white/10 pt-3">
                    <p style={{ whiteSpace: "pre-line" }}>{activeModalCase.cap}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                  <Link
                    href="/book"
                    className="mdf-btn-primary flex-1 justify-center"
                    onClick={() => setActiveModalCase(null)}
                  >
                    Deploy this Architecture <i>&#8599;</i>
                  </Link>

                  {activeModalCase.ig && (
                    <a
                      href={activeModalCase.ig}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mdf-tag-pill"
                    >
                      Instagram Proof <i>&#8599;</i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
