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
    title: "High-Conversion Landing Architecture",
    body: "Conversion-optimized landing pages designed to capture attention, qualify leads, and move prospects seamlessly into your funnel.",
    tags: ["LANDING", "QUALIFY", "CONVERT"],
    expandBg: "#1254EC",
  },
  {
    id: "ai",
    num: "02",
    title: "AI-Led Automations & Workflows",
    body: "Smart, AI-powered workflows that respond instantly to lead behavior, ensuring speed, precision, and higher close rates without manual effort.",
    tags: ["AI", "WORKFLOWS", "SPEED"],
    expandBg: "#0B1437",
  },
  {
    id: "a2p",
    num: "03",
    title: "A2P Compliance & Infrastructure Setup",
    body: "Full A2P registration and compliance handled end-to-end, protecting deliverability and ensuring uninterrupted SMS performance at scale.",
    tags: ["A2P", "SMS", "COMPLIANCE"],
    expandBg: "#0F3332",
  },
  {
    id: "sequences",
    num: "04",
    title: "Multi-Touch SMS & Email Sequences",
    body: "Behavior-triggered messaging across SMS and email that nurtures, follows up, and converts leads into booked calls automatically.",
    tags: ["SMS", "EMAIL", "NURTURE"],
    expandBg: "#2D1B54",
  },
  {
    id: "voicemail",
    num: "05",
    title: "Voice Mail Drops for Follow-Up Amplification",
    body: "Strategic voicemail drops layered into follow-ups to increase response rates and cut through crowded inboxes.",
    tags: ["VOICEMAIL", "FOLLOW-UP", "RESPONSE"],
    expandBg: "#7C2D12",
  },
  {
    id: "crm",
    num: "06",
    title: "CRM Setup, Management & Optimization",
    body: "A fully optimized CRM ecosystem that tracks every lead, action, and conversion, giving you total visibility and control over your pipeline.",
    tags: ["CRM", "PIPELINE", "CONTROL"],
    expandBg: "#0C4A6E",
  },
] as const;

/**
 * ( 04 ) Million Dollar Funnel™ System — expandable layer rows, no images.
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
        <div className="max-w-[760px]">
          <p className="uf-eyebrow tracking-[0.18em] text-sky">( 04 ) — The System</p>
          <h2 className="mt-4">
            <Reveal as="span">
              <span className="block font-sans text-[clamp(28px,4.4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                The Million Dollar Funnel™ System
              </span>
            </Reveal>
            <Reveal as="span" delay={90}>
              <span className="mt-2 block font-sans text-[clamp(28px,4.4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-sky">
                Consistently Turns Traffic Into Million Dollar Results
              </span>
            </Reveal>
          </h2>
          <p className="mt-6 max-w-[58ch] font-sans text-[16px] leading-[1.7] text-slate-400 sm:text-[17px]">
            The Million Dollar Funnel™ System isn&apos;t just a funnel-building process.
            It&apos;s a proprietary, multi-layered growth framework strategically engineered
            to scale acquisition, conversions, and revenue with precision.
          </p>
          <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-[1.7] text-slate-400 sm:text-[17px]">
            Each layer works together to eliminate leaks, amplify conversions, and scale
            results — powered by AI and our expert oversight.
          </p>
        </div>

        <div className="mt-16 border-t border-white/10 sm:mt-20">
          {LAYERS.map((row) => {
            const isActive = activeId === row.id;

            return (
              <div
                key={row.id}
                onMouseEnter={() => handleActivate(row.id)}
                onClick={() => handleActivate(row.id)}
                className={`group relative cursor-pointer overflow-hidden border-b border-white/10 transition-all duration-500 ${
                  isActive ? "py-10 md:py-14" : "py-7 md:py-9 hover:bg-white/[0.02]"
                }`}
                style={{
                  backgroundColor: isActive ? row.expandBg : undefined,
                }}
              >
                <div className="mx-auto px-2 md:px-4">
                  <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[220px_1fr_180px] lg:grid-cols-[280px_1fr_200px]">
                    <div>
                      <p
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          isActive ? "text-white/75" : "text-sky/80"
                        }`}
                      >
                        Layer {row.num}
                      </p>
                      <h3 className="mt-2 font-sans text-[clamp(20px,2.2vw,28px)] font-extrabold tracking-[-0.02em] text-white">
                        {row.title}
                      </h3>
                    </div>

                    <div>
                      <p
                        className={`max-w-[560px] font-sans text-[15px] leading-[1.65] sm:text-[16px] ${
                          isActive ? "text-white/95" : "text-slate-400"
                        }`}
                      >
                        {row.body}
                      </p>
                      {isActive && (
                        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="font-serif text-[clamp(32px,4vw,48px)] italic leading-none text-white">
                            {row.num}
                          </p>
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                            of 06 · system layers
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-left md:text-right">
                      <div className="flex flex-col gap-1">
                        {row.tags.map((s) => (
                          <span
                            key={s}
                            className={`font-mono text-[10px] font-semibold tracking-[0.12em] ${
                              isActive ? "text-white/75" : "text-slate-500"
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-12 sm:mt-16">
          <p className="max-w-[42ch] text-center font-sans text-[15px] leading-relaxed text-slate-400">
            Six layers. One machine. Built, wired, and overseen by our team.
          </p>
          <Magnetic strength={0.14}>
            <Link href="/book" className="uf-pill">
              Walk me through it
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
