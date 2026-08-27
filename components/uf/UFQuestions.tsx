"use client";

import { useState } from "react";
import ContourBG from "./ContourBG";
import Reveal from "./Reveal";

const QA = [
  {
    q: "Who is this actually for?",
    a: "High-ticket service providers already generating revenue who need a predictable system instead of referrals.",
  },
  {
    q: "What's included in the build?",
    a: "Landing architecture, A2P, AI automations, SMS and email, voicemail drops, and CRM — built and managed by us.",
  },
  {
    q: "Do you handle the technical side?",
    a: "All of it. You review the work; you never touch the tooling.",
  },
  {
    q: "Can you run the ads as well as the funnel?",
    a: "Yes, and we prefer it — both sides get built for each other.",
  },
  {
    q: "Will you work on my existing platform?",
    a: "Usually. We keep what converts and rebuild what leaks.",
  },
  {
    q: "How fast does it go live?",
    a: "Live on real traffic in three to four weeks.",
  },
];

/** (08) The questions — editorial accordion, one open at a time. */
export default function UFQuestions() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="uf-light relative overflow-hidden py-[16vh]">
      <ContourBG tone="light" />
      <div className="relative mx-auto max-w-[1100px] px-6 md:px-14">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="uf-eyebrow text-mint-deep">( 08 ) — The Questions</p>
            <h2 className="type-lg mt-6 text-inkdeep">
              <Reveal as="span">
                <span className="font-condensed block text-[clamp(36px,4.6vw,68px)]">
                  Before You
                </span>
              </Reveal>
              <Reveal as="span" delay={110}>
                <span className="font-editorial block text-mint-deep text-[clamp(30px,3.8vw,56px)]">
                  Book.
                </span>
              </Reveal>
            </h2>
          </div>

          <div>
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b rule-light">
                  <button
                    className="group flex w-full items-start justify-between gap-8 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`q-panel-${i}`}
                    id={`q-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="flex gap-5">
                      <span className="tnum mt-1 font-mono text-[11px] text-inkdeep/40">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-body text-[17px] font-medium leading-[1.4] transition-colors duration-300 md:text-[19px] ${
                          isOpen ? "text-mint-deep" : "text-inkdeep"
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-1.5 h-3 w-3 shrink-0"
                      style={{
                        transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                        transition: "transform 380ms cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-inkdeep/60" />
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-inkdeep/60" />
                    </span>
                  </button>
                  <div
                    id={`q-panel-${i}`}
                    role="region"
                    aria-labelledby={`q-btn-${i}`}
                    className="grid transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="max-w-[58ch] overflow-hidden pl-10 font-body text-[15px] leading-[1.68] text-inkdeep/65">
                      <span className="block pb-7">{item.a}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
