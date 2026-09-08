"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { playTick } from "@/components/audio/SoundToggle";

interface SystemLayer {
  id: string;
  num: string;
  step: string;
  plain: string;
  title: string;
  body: string;
  tags: string[];
  accent: string;
  badgeBg: string;
  glowColor: string;
  icon: React.ReactNode;
  microVisual: React.ReactNode;
}

const LAYERS: SystemLayer[] = [
  {
    id: "landing",
    num: "01",
    step: "Step 01",
    plain: "The front door",
    title: "Landing pages that convert",
    body: "We build the page that turns ad clicks into real leads — clear offer, strong call-to-action, and a path that qualifies people before they waste your time.",
    tags: ["PAGES", "LEADS", "CONVERT"],
    accent: "#38BDF8",
    badgeBg: "rgba(56, 189, 248, 0.12)",
    glowColor: "rgba(56, 189, 248, 0.28)",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    microVisual: (
      <div className="flex items-center gap-1.5 rounded-full border border-sky/30 bg-sky/10 px-2.5 py-0.5 text-[11px] font-mono text-sky">
        <span className="h-1.5 w-1.5 rounded-full bg-sky animate-ping" />
        <span>42.8% Opt-in</span>
      </div>
    ),
  },
  {
    id: "ai",
    num: "02",
    step: "Step 02",
    plain: "Instant follow-up",
    title: "AI that replies in seconds",
    body: "When someone opts in, AI answers right away — asks the right questions, books the call, and keeps warm leads moving without you hiring a setter.",
    tags: ["AI", "SPEED", "BOOKINGS"],
    accent: "#818CF8",
    badgeBg: "rgba(129, 140, 248, 0.12)",
    glowColor: "rgba(129, 140, 248, 0.28)",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    microVisual: (
      <div className="flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-mono text-indigo-300">
        <span className="flex gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
        <span className="ml-0.5">&lt; 3s response</span>
      </div>
    ),
  },
  {
    id: "a2p",
    num: "03",
    step: "Step 03",
    plain: "Compliant texting",
    title: "SMS setup done for you",
    body: "We handle carrier registration and SMS compliance so your texts actually deliver. No blocked numbers. No guesswork. Ready to scale.",
    tags: ["SMS", "SETUP", "DELIVER"],
    accent: "#34D399",
    badgeBg: "rgba(52, 211, 153, 0.12)",
    glowColor: "rgba(52, 211, 153, 0.28)",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    microVisual: (
      <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>100% 10DLC Verified</span>
      </div>
    ),
  },
  {
    id: "sequences",
    num: "04",
    step: "Step 04",
    plain: "Stay in the inbox",
    title: "Texts & emails on autopilot",
    body: "If they don’t book on the first try, smart SMS and email sequences follow up for you — until they schedule or opt out.",
    tags: ["SMS", "EMAIL", "FOLLOW-UP"],
    accent: "#C084FC",
    badgeBg: "rgba(192, 132, 252, 0.12)",
    glowColor: "rgba(192, 132, 252, 0.28)",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
    microVisual: (
      <div className="flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-mono text-purple-300">
        <svg className="h-3 w-3 animate-spin text-purple-300" style={{ animationDuration: "3s" }} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span>9x Follow-up Loop</span>
      </div>
    ),
  },
  {
    id: "voicemail",
    num: "05",
    step: "Step 05",
    plain: "Cut through noise",
    title: "Voicemail drops that get heard",
    body: "We drop short voicemails into the follow-up so you stand out when texts get ignored — more replies, more booked calls.",
    tags: ["VOICE", "REACH", "REPLIES"],
    accent: "#FB923C",
    badgeBg: "rgba(251, 146, 60, 0.12)",
    glowColor: "rgba(251, 146, 60, 0.28)",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    microVisual: (
      <div className="flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-mono text-orange-300">
        <span className="flex items-end gap-[2px] h-3">
          <span className="w-0.5 bg-orange-400 animate-pulse h-2" style={{ animationDuration: "0.6s" }} />
          <span className="w-0.5 bg-orange-400 animate-pulse h-3" style={{ animationDuration: "0.4s" }} />
          <span className="w-0.5 bg-orange-400 animate-pulse h-1.5" style={{ animationDuration: "0.8s" }} />
          <span className="w-0.5 bg-orange-400 animate-pulse h-2.5" style={{ animationDuration: "0.5s" }} />
        </span>
        <span>Voice Drop Active</span>
      </div>
    ),
  },
  {
    id: "crm",
    num: "06",
    step: "Step 06",
    plain: "One scoreboard",
    title: "CRM that shows the whole pipeline",
    body: "Every lead, message, and booking lives in one place. You see what’s working, what’s stuck, and what’s closed — without digging through tools.",
    tags: ["CRM", "TRACK", "CONTROL"],
    accent: "#60A5FA",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    glowColor: "rgba(96, 165, 250, 0.28)",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75M15 6.75v6" />
      </svg>
    ),
    microVisual: (
      <div className="flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-mono text-blue-300">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span>$480k+ Pipeline</span>
      </div>
    ),
  },
];

/**
 * Single Interactive 3D Tilt & Spotlight Bento Card
 */
function SystemBentoCard({
  card,
  index,
  isAutoActive,
  onHover,
}: {
  card: SystemLayer;
  index: number;
  isAutoActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setCoords({ x, y });
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(card.id);
    playTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
    setRotate({ x: 0, y: 0 });
  };

  const active = isHovered || isAutoActive;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${active ? 1.02 : 1}, ${active ? 1.02 : 1}, 1)`,
        transition: isHovered
          ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s",
      }}
      className={`group relative flex flex-col justify-between rounded-[26px] border p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
        active
          ? "border-white/35 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-[#040d30]/90 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
          : "border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-[#040d30]/80 shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
      }`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : isAutoActive ? 0.4 : 0,
          background: isHovered
            ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${card.glowColor}, transparent 70%)`
            : `radial-gradient(300px circle at 80% 20%, ${card.glowColor}, transparent 70%)`,
        }}
      />

      {/* Top ambient glow orb */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl transition-opacity duration-500"
        style={{
          backgroundColor: card.accent,
          opacity: active ? 0.25 : 0.06,
        }}
      />

      {/* Card Content Top */}
      <div className="relative z-10">
        {/* Top Bar: Badge + Micro Visual + Icon */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundColor: card.badgeBg,
                color: card.accent,
                boxShadow: active ? `0 0 16px ${card.glowColor}` : "none",
              }}
            >
              {card.step}
            </span>
            <span className="font-sans text-[12px] font-medium text-slate-400">
              · {card.plain}
            </span>
          </div>

          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/10"
            style={{
              color: card.accent,
              boxShadow: active ? `0 0 20px ${card.glowColor}` : "none",
            }}
          >
            {card.icon}
          </div>
        </div>

        {/* Live Micro Visual Pill */}
        <div className="mt-4 flex items-center">
          {card.microVisual}
        </div>

        {/* Card Title */}
        <h3 className="mt-4 font-sans text-[21px] sm:text-[23px] font-extrabold leading-[1.2] tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-white">
          {card.title}
        </h3>

        {/* Card Body */}
        <p className="mt-3 font-sans text-[14px] sm:text-[14.5px] leading-[1.65] text-slate-300 transition-colors duration-200 group-hover:text-slate-200">
          {card.body}
        </p>
      </div>

      {/* Bottom Row: Tags + Layer Counter */}
      <div className="relative z-10 mt-7 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-slate-300 transition-all duration-200 group-hover:border-white/20 group-hover:text-white group-hover:bg-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="font-mono text-[11px] font-bold tracking-widest text-slate-400 shrink-0 transition-colors duration-200 group-hover:text-white">
          {card.num} / 06
        </span>
      </div>

      {/* Animated Bottom Border Active Beam */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
          opacity: active ? 1 : 0,
          transform: active ? "scaleX(1)" : "scaleX(0.2)",
        }}
      />
    </div>
  );
}

/**
 * ( 04 ) The System — Six Connected Layers in an interactive modern Cards Grid
 */
export default function UFProof() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Periodic pipeline flow pulse (cycles 0 -> 5 every 2.4s if not hovering)
  useEffect(() => {
    if (hoveredCard !== null) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % LAYERS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [hoveredCard]);

  return (
    <section
      id="system"
      className="uf-dark relative overflow-hidden bg-[#020926] py-[14vh] text-white select-none"
    >
      <div id="proof" aria-hidden className="absolute top-0 h-px w-px" />
      <ContourBG tone="dark" />

      {/* Background Animated Ambient Glowing Blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(18,84,236,0.22),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(56,189,248,0.15),transparent_50%)] animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      
      {/* Flowing Grid Line Accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent blur-sm"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-[700px]">
            <p className="uf-eyebrow tracking-[0.18em] text-[#38BDF8] font-mono text-[12px] uppercase font-semibold">
              ( 04 ) — The System
            </p>
            <h2 className="mt-4">
              <Reveal as="span">
                <span className="block font-sans text-[clamp(32px,4.8vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
                  How we turn traffic
                </span>
              </Reveal>
              <Reveal as="span" delay={80}>
                <span className="mt-1 block font-sans text-[clamp(32px,4.8vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em] bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent">
                  into booked revenue.
                </span>
              </Reveal>
            </h2>
            <p className="mt-6 max-w-[50ch] font-sans text-[16px] leading-[1.7] text-slate-300 sm:text-[17px]">
              The Million Dollar Funnel™ is six connected layers — from the first page click
              to a booked call on your calendar. We build it. We run it. You close.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              6-Layer Live Architecture
            </span>
          </div>
        </div>

        {/* 6-Card Modern Interactive Bento Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {LAYERS.map((card, i) => (
            <SystemBentoCard
              key={card.id}
              card={card}
              index={i}
              isAutoActive={hoveredCard === null && activeStepIndex === i}
              onHover={setHoveredCard}
            />
          ))}
        </div>

        {/* Bottom CTA Footer */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-12 text-center">
          <p className="max-w-[44ch] font-sans text-[16px] sm:text-[17px] leading-relaxed text-slate-300">
            Six steps. One fully managed system. Built and run by our team — so you never touch the tech.
          </p>
          <Magnetic strength={0.15}>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-8 py-3.5 font-sans text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(18,84,236,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(18,84,236,0.6)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>Book a System Walkthrough</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
