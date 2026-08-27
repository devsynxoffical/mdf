"use client";

import { useRef, useState } from "react";
import RiseIn from "@/components/ui/RiseIn";

const QA = [
  {
    q: "Who do you help with the Million Dollar Funnel™?",
    a: "High-ticket service providers, coaches, and agencies already generating revenue who need a predictable acquisition system rather than referrals and word of mouth.",
  },
  {
    q: "What's included in the system?",
    a: "Landing architecture, A2P compliance and setup, AI automations, multi-touch SMS and email, voicemail drops, and full CRM setup and management. Built, launched, and managed by our team.",
  },
  {
    q: "Do you handle the technical side?",
    a: "Yes — all of it. Integrations, tracking, deliverability, CRM. You don't touch tech.",
  },
  {
    q: "Can you help me get more bookings with ad funnels?",
    a: "That's the whole point of the system. Ads feed the funnel; the funnel qualifies and books. We manage both sides so they're built for each other.",
  },
  {
    q: "Do you work on my existing platform?",
    a: "Usually yes. We audit what you have, keep what converts, and rebuild what leaks.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="faq" className="mx-auto max-w-[860px] px-6 py-32">
      <RiseIn>
        <p className="bracket-label">Questions</p>
      </RiseIn>
      <RiseIn delay={80}>
        <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,44px)] font-light text-bone">
          Before you book the call
        </h2>
      </RiseIn>

      <div className="mt-12">
        {QA.map((item, i) => {
          const isOpen = open === i;
          const panel = panelRefs.current[i];
          const height = isOpen && panel ? panel.scrollHeight : 0;
          return (
            <div key={i} className="relative border-b border-bone/[0.08]">
              <button
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span
                  className={`font-body text-[19px] font-medium transition-colors duration-[250ms] ${
                    isOpen ? "text-brass" : "text-bone"
                  }`}
                >
                  {item.q}
                </span>
                {/* 20px square toggle — plus rotates 45° to × */}
                <span
                  aria-hidden
                  className="flex h-5 w-5 shrink-0 items-center justify-center border border-mute/40 transition-transform duration-[250ms]"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M5 0v10M0 5h10" stroke="#7C879B" strokeWidth="1" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="overflow-hidden transition-[max-height,opacity] duration-[350ms] ease-out"
                style={{ maxHeight: height, opacity: isOpen ? 1 : 0 }}
              >
                <p className="max-w-[62ch] pb-7 pt-1 font-body text-[17px] leading-[1.6] text-mute">
                  {item.a}
                </p>
              </div>
              {/* brass line draws along the bottom border when open */}
              <span
                aria-hidden
                className={`faq-underline absolute bottom-[-1px] left-0 h-px w-full bg-brass ${
                  isOpen ? "open" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
