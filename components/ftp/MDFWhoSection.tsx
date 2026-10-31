"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const WHO = [
  {
    name: "Agencies",
    desc: "Generate better-fit prospects and turn marketing traffic into qualified discovery calls.",
    out: "Discovery calls",
    journey: [
      { label: "Ad click", icon: "↗" },
      { label: "Case-study page", icon: "▤" },
      { label: "Qualifier form", icon: "✓" },
      { label: "Discovery call", icon: "☎" },
    ],
    chips: ["Strategy", "Copy", "Landing page", "CRM routing"],
  },
  {
    name: "Coaches & Consultants",
    desc: "Build a structured journey that turns interest into applications and sales conversations.",
    out: "Applications",
    journey: [
      { label: "Content", icon: "▶" },
      { label: "VSL page", icon: "▷" },
      { label: "Application", icon: "✎" },
      { label: "Sales call", icon: "☎" },
    ],
    chips: ["VSL funnel", "Application form", "Automated follow-up"],
  },
  {
    name: "High-Ticket Service Providers",
    desc: "Present your offer, qualify prospects and get serious buyers onto your calendar.",
    out: "Calendar",
    journey: [
      { label: "Ad or referral", icon: "↗" },
      { label: "Offer page", icon: "▤" },
      { label: "Pre-call survey", icon: "✓" },
      { label: "Booked calendar", icon: "▦" },
    ],
    chips: ["AC Funnel", "Qualification quiz", "Calendar booking"],
  },
  {
    name: "B2B Companies",
    desc: "Create a conversion path designed to engage and qualify potential clients before the sales team steps in.",
    out: "Qualification",
    journey: [
      { label: "LinkedIn & search", icon: "↗" },
      { label: "Solution page", icon: "▤" },
      { label: "Lead scoring", icon: "≡" },
      { label: "Sales handoff", icon: "⇄" },
    ],
    chips: ["Whitepaper funnel", "Email nurture", "Lead scoring"],
  },
  {
    name: "Professional Services",
    desc: "Turn expertise and credibility into a predictable path toward consultation bookings.",
    out: "Consultations",
    journey: [
      { label: "Local search", icon: "⌖" },
      { label: "Credibility page", icon: "★" },
      { label: "Intake form", icon: "✎" },
      { label: "Consultation", icon: "☎" },
    ],
    chips: ["Consultation funnel", "Intake automation", "SMS reminders"],
  },
  {
    name: "Information & Education",
    desc: "Use VSLs, low-ticket offers, bridge funnels and automated journeys to turn attention into customers.",
    out: "Customers",
    journey: [
      { label: "Social video", icon: "▶" },
      { label: "Low-ticket offer", icon: "$" },
      { label: "Email nurture", icon: "✉" },
      { label: "Customer", icon: "♥" },
    ],
    chips: ["Bridge funnel", "Order bump & OTO", "Email sequence"],
  },
];

/**
 * ( 04 ) Who we work with — ported from Funnels That Print and re-themed for MDF.
 * Styles live in app/ftp-sections.css, scoped under `.mdf-ftp`.
 */
export default function MDFWhoSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  const setWho = useCallback((i: number) => {
    setSelectedIdx(i);
    setAnimKey((prev) => prev + 1);
  }, []);

  // Intersection observer & timer (4.2 seconds)
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const io = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
        if (entries[0].isIntersecting) sec.classList.add("in");
      },
      { threshold: 0.3 }
    );
    io.observe(sec);

    const interval = setInterval(() => {
      if (isVisibleRef.current && !isHovered) {
        setSelectedIdx((prev) => (prev + 1) % WHO.length);
        setAnimKey((prev) => prev + 1);
      }
    }, 4200);

    return () => {
      io.disconnect();
      clearInterval(interval);
    };
  }, [isHovered]);

  // Pointer light tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = cardRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    b.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const current = WHO[selectedIdx];
  const numStr = String(selectedIdx + 1).padStart(2, "0");

  return (
    <div className="mdf-ftp mdf-who-v2">
    <section
      ref={sectionRef}
      className="sec box"
      id="who"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mhead">
        <div className="rv">
          <div className="eyebrow mono">( 04 ) — Who we work with</div>
          <h2 className="mh2">
            <span>Built For</span>
            <span className="sky">Conversations.</span>
          </h2>
        </div>
        <p className="lead rv" style={{ "--rv": 2 } as React.CSSProperties}>
          Our funnels are for businesses where generating the right sales
          conversation matters more than cheap clicks or cheap leads.
        </p>
      </div>

      {/* Business-type rail */}
      <div className="wrail rv" role="tablist" style={{ "--rv": 3 } as React.CSSProperties}>
        {WHO.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={selectedIdx === index}
            className={selectedIdx === index ? "on" : ""}
            onClick={() => setWho(index)}
            onMouseEnter={() => setWho(index)}
            onFocus={() => setWho(index)}
          >
            <span className="n">{String(index + 1).padStart(2, "0")}</span>
            <b>{item.name}</b>
            <em>{item.out}</em>
            {selectedIdx === index && (
              <i key={`prog-${animKey}`} className={`tprog ${isHovered ? "hold" : ""}`} />
            )}
          </button>
        ))}
      </div>

      {/* Detail board */}
      <div
        ref={cardRef}
        className="wboard rv"
        style={{ "--rv": 4 } as React.CSSProperties}
        onPointerMove={handlePointerMove}
      >
        <span key={`big-${animKey}`} className="wbig go" aria-hidden="true">
          {numStr}
        </span>

        <div className="wleft">
          <span className="wt">
            <b>{numStr}</b> / 06 &middot; {current.name}
          </span>
          <p key={`p-${animKey}`} className="wdesc go">
            {current.desc.split(" ").map((w, k) => (
              <span key={k} style={{ "--k": k } as React.CSSProperties}>
                {w}
                {k < current.desc.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>
          <div className="wch">
            {current.chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <Link className="btn g" href={ROUTES.book}>
            Map my funnel <i>&#8599;</i>
          </Link>
        </div>

        <ol key={`wj-${animKey}`} className="wtimeline" aria-label="Typical funnel journey">
          {current.journey.map((step, k) => (
            <li key={k} style={{ "--k": k } as React.CSSProperties}>
              <span className="wi">{step.icon}</span>
              <div>
                <small>Step {String(k + 1).padStart(2, "0")}</small>
                <em>{step.label}</em>
              </div>
            </li>
          ))}
          <li className="wres" style={{ "--k": current.journey.length } as React.CSSProperties}>
            <span className="wi">&#10003;</span>
            <div>
              <small>Outcome</small>
              <em>{current.out}</em>
            </div>
          </li>
        </ol>
      </div>
    </section>
    </div>
  );
}
