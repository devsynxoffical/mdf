"use client";

import Link from "next/link";
import { useState } from "react";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { playTick } from "@/components/audio/SoundToggle";

const LAYERS = [
  {
    id: "landing",
    num: "01",
    title: "Landing pages that convert",
    plain: "The front door",
    body: "We build the page that turns ad clicks into real leads — clear offer, strong call-to-action, and a path that qualifies people before they waste your time.",
    tags: ["PAGES", "LEADS", "CONVERT"],
    expandBg: "#1254EC",
  },
  {
    id: "ai",
    num: "02",
    title: "AI that replies in seconds",
    plain: "Instant follow-up",
    body: "When someone opts in, AI answers right away — asks the right questions, books the call, and keeps warm leads moving without you hiring a setter.",
    tags: ["AI", "SPEED", "BOOKINGS"],
    expandBg: "#0B1437",
  },
  {
    id: "a2p",
    num: "03",
    title: "SMS setup done for you",
    plain: "Compliant texting",
    body: "We handle carrier registration and SMS compliance so your texts actually deliver. No blocked numbers. No guesswork. Ready to scale.",
    tags: ["SMS", "SETUP", "DELIVER"],
    expandBg: "#0F3332",
  },
  {
    id: "sequences",
    num: "04",
    title: "Texts & emails on autopilot",
    plain: "Stay in the inbox",
    body: "If they don’t book on the first try, smart SMS and email sequences follow up for you — until they schedule or opt out.",
    tags: ["SMS", "EMAIL", "FOLLOW-UP"],
    expandBg: "#2D1B54",
  },
  {
    id: "voicemail",
    num: "05",
    title: "Voicemail drops that get heard",
    plain: "Cut through noise",
    body: "We drop short voicemails into the follow-up so you stand out when texts get ignored — more replies, more booked calls.",
    tags: ["VOICE", "REACH", "REPLIES"],
    expandBg: "#7C2D12",
  },
  {
    id: "crm",
    num: "06",
    title: "CRM that shows the whole pipeline",
    plain: "One scoreboard",
    body: "Every lead, message, and booking lives in one place. You see what’s working, what’s stuck, and what’s closed — without digging through tools.",
    tags: ["CRM", "TRACK", "CONTROL"],
    expandBg: "#0C4A6E",
  },
] as const;

/**
 * ( 04 ) The System — six clear layers, plain language.
 */
export default function UFProof() {
  const [activeId, setActiveId] = useState<string>(LAYERS[0].id);

  const handleActivate = (id: string) => {
    if (activeId !== id) {
      setActiveId(id);
      playTick();
    }
  };

  return (
    <section
      id="system"
      className="uf-dark relative overflow-hidden bg-[#020926] py-[12vh] text-white"
    >
      <div id="proof" aria-hidden className="absolute top-0 h-px w-px" />
      <ContourBG tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(18,84,236,0.14),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-[640px]">
          <p className="uf-eyebrow tracking-[0.18em] text-sky">( 04 ) — The System</p>
          <h2 className="mt-4">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(30px,4.6vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                How we turn traffic
              </span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="mt-1 block font-sans text-[clamp(30px,4.6vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-sky">
                into booked revenue.
              </span>
            </Reveal>
          </h2>
          <p className="mt-6 max-w-[48ch] font-sans text-[16px] leading-[1.7] text-slate-400 sm:text-[17px]">
            The Million Dollar Funnel™ is six connected layers — from the first page click
            to a booked call on your calendar. We build it. We run it. You close.
          </p>
          <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sky/80">
            Hover a layer to read what it does
          </p>
        </div>

        <div className="mt-14 border-t border-white/10 sm:mt-16">
          {LAYERS.map((row) => {
            const isActive = activeId === row.id;

            return (
              <button
                key={row.id}
                type="button"
                onMouseEnter={() => handleActivate(row.id)}
                onFocus={() => handleActivate(row.id)}
                onClick={() => handleActivate(row.id)}
                className={`group relative block w-full overflow-hidden border-b border-white/10 text-left transition-all duration-500 ${
                  isActive ? "py-9 md:py-12" : "py-6 md:py-8 hover:bg-white/[0.02]"
                }`}
                style={{
                  backgroundColor: isActive ? row.expandBg : undefined,
                }}
                aria-expanded={isActive}
              >
                <div className="px-1 md:px-3">
                  <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_120px] md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_140px]">
                    <div>
                      <p
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          isActive ? "text-white/70" : "text-sky/80"
                        }`}
                      >
                        Step {row.num} · {row.plain}
                      </p>
                      <h3 className="mt-2 font-sans text-[clamp(20px,2.4vw,28px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                        {row.title}
                      </h3>
                    </div>

                    <div>
                      <p
                        className={`max-w-[52ch] font-sans text-[15px] leading-[1.65] sm:text-[16px] ${
                          isActive ? "text-white/95" : "text-slate-400"
                        }`}
                      >
                        {row.body}
                      </p>
                      {isActive && (
                        <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
                          {row.num} of 06
                        </p>
                      )}
                    </div>

                    <div className="hidden md:block md:text-right">
                      <div className="flex flex-col gap-1.5">
                        {row.tags.map((s) => (
                          <span
                            key={s}
                            className={`font-mono text-[10px] font-semibold tracking-[0.12em] ${
                              isActive ? "text-white/70" : "text-slate-500"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/10 pt-12 sm:mt-16">
          <p className="max-w-[40ch] text-center font-sans text-[16px] leading-relaxed text-slate-400">
            Six steps. One system. Built and managed by us — so you never touch the tech.
          </p>
          <Magnetic strength={0.14}>
            <Link href="/book" className="uf-pill">
              Book a walkthrough
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
