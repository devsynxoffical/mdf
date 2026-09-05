"use client";

import { useState } from "react";
import Reveal from "./Reveal";

interface FunnelItem {
  id: string;
  name: string;
  category: string;
  image: string;
  scrollDuration: number; // in seconds based on length
}

const FUNNELS: FunnelItem[] = [
  {
    id: "mortgage-ai",
    name: "AI Mortgage System 2.0",
    category: "Self-Filling Mortgage Pipeline",
    image: "/images/funnels/funnel-01.webp",
    scrollDuration: 12,
  },
  {
    id: "rowan-security",
    name: "ROWAN Executive Protection",
    category: "Discreet Veteran-Led Security",
    image: "/images/funnels/funnel-02.webp",
    scrollDuration: 14,
  },
  {
    id: "love-my-invention",
    name: "Love My Invention",
    category: "Invention Launchpad & Licensing",
    image: "/images/funnels/funnel-03.webp",
    scrollDuration: 20,
  },
  {
    id: "pluto-policies",
    name: "Pluto Insurance",
    category: "Automated Policy Acquisition Engine",
    image: "/images/funnels/funnel-04.webp",
    scrollDuration: 18,
  },
  {
    id: "scalewithads-b2b",
    name: "ScaleWithAds Client Acquisition",
    category: "High-Ticket B2B Scaling Funnel",
    image: "/images/funnels/funnel-05.webp",
    scrollDuration: 26,
  },
  {
    id: "lead-gen-funnel",
    name: "Direct-Response Pipeline",
    category: "High-Converting Lead Gen Funnel",
    image: "/images/funnels/funnel-06.webp",
    scrollDuration: 8,
  },
  {
    id: "summit-mastery",
    name: "Global Summit & Course Funnel",
    category: "2,000+ Attendee Summit Architecture",
    image: "/images/funnels/funnel-07.webp",
    scrollDuration: 22,
  },
  {
    id: "mdf-flagship",
    name: "Million Dollar Funnel™ Core",
    category: "High-Ticket Client Acquisition Standard",
    image: "/images/funnels/funnel-08.webp",
    scrollDuration: 17,
  },
];

export default function UFFunnelDesigns() {
  const [activeModal, setActiveModal] = useState<FunnelItem | null>(null);

  return (
    <section
      id="funnel-designs"
      className="relative bg-[#05060A] py-[16vh] text-white overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/2 h-[500px] w-[700px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-600/[0.05] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-6 sm:px-8 md:px-12">
        {/* Eyebrow & Master Heading */}
        <div className="mx-auto max-w-[1100px] text-center mb-16 sm:mb-20">
          <p className="uf-eyebrow mb-6 text-red-500 tracking-[0.2em] font-sans font-semibold text-[13px] uppercase">
            ( 06 ) — PROVEN FUNNEL DESIGNS
          </p>

          <h2 className="font-sans text-[clamp(28px,4.2vw,56px)] font-black uppercase tracking-tight leading-[1.1] text-white">
            <span className="text-[#ED1C24] drop-shadow-[0_0_35px_rgba(237,28,36,0.45)]">
              THE RESULTS WE BRING
            </span>{" "}
            ARE PROVEN THROUGH OUR FUNNEL DESIGNS
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] font-sans text-[16px] sm:text-[18px] text-white/60 font-normal leading-relaxed">
            Hover over any funnel to scroll through the full architecture from top
            to bottom. Click any card to inspect the complete design in high-definition.
          </p>
        </div>

        {/* 8 Funnels 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2">
          {FUNNELS.map((item, idx) => (
            <Reveal as="div" key={item.id} delay={idx * 80}>
              <div
                onClick={() => setActiveModal(item)}
                className="group relative flex flex-col rounded-[22px] border-[3px] border-[#ECECEC]/90 bg-[#0A0A0C] p-0 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:border-white hover:shadow-[0_25px_70px_rgba(237,28,36,0.22)] cursor-pointer overflow-hidden"
              >
                {/* Browser Device Header Bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#121216] px-5 py-3.5 select-none">
                  {/* Window Action Dots */}
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                    <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                  </div>

                  {/* Title / URL display */}
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1 text-[11px] font-mono text-white/70">
                    <span className="text-red-400 font-bold">🔒</span>
                    <span className="truncate max-w-[220px] sm:max-w-[320px]">
                      {item.name}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="hidden sm:inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    {item.category}
                  </span>
                </div>

                {/* Funnel Scroll Viewport */}
                <div
                  className="funnel-viewport relative h-[480px] sm:h-[540px] md:h-[580px] w-full overflow-hidden bg-black"
                  style={
                    {
                      "--viewH": "540px",
                      "--time": `${item.scrollDuration}s`,
                    } as React.CSSProperties
                  }
                >
                  {/* The Long Full-Length Funnel Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-auto block select-none pointer-events-none transition-transform duration-[var(--time)] ease-linear group-hover:[transform:translateY(calc(-100%+var(--viewH)))]"
                  />

                  {/* Floating Action Badge */}
                  <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-30">
                    <span className="h-2 w-2 rounded-full bg-[#ED1C24] animate-ping" />
                    <span className="font-mono text-[11px] font-medium text-white/90">
                      Hover to scroll ↓
                    </span>
                  </div>

                  {/* Click to Enlarge Hover Prompt */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full border border-white/30 bg-black/80 px-5 py-2.5 shadow-2xl backdrop-blur-md">
                      <span className="font-sans text-[13px] font-bold tracking-wider uppercase text-white flex items-center gap-2">
                        <span>🔍</span> Click to Expand Full Funnel
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* High-Resolution Full-Screen Modal Lightbox */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative flex flex-col h-[90vh] w-full max-w-[1100px] overflow-hidden rounded-2xl border border-white/20 bg-[#08080C] shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#121218] px-6 py-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-red-500 font-semibold">
                  {activeModal.category}
                </span>
                <h3 className="font-sans text-[18px] font-bold text-white tracking-tight">
                  {activeModal.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Funnel Body */}
            <div className="relative flex-1 overflow-y-auto bg-black p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModal.image}
                alt={activeModal.name}
                className="w-full h-auto mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
