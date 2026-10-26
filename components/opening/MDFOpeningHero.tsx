"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const ROTATING_WORDS = [
  "booked calls.",
  "qualified leads.",
  "high-ticket clients.",
  "pipeline revenue.",
];

const CAPABILITIES = [
  {
    num: "01",
    title: "The Funnel Engine",
    subtitle: "UX/UI, High-Ticket VSL, Architecture",
    href: "#funnels",
    iconSrc: "/images/hero-link-ico1.png",
  },
  {
    num: "02",
    title: "Media & Traffic",
    subtitle: "Meta, Google & High-Ticket Ads",
    href: "/work-proof",
    iconSrc: "/images/hero-link-ico2.png",
  },
  {
    num: "03",
    title: "AI Qualification",
    subtitle: "60s Response & CRM Pipeline",
    href: "#system",
    iconSrc: "/images/hero-link-ico3.png",
  },
] as const;

export default function MDFOpeningHero() {
  const typeRef = useRef<HTMLSpanElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  // Word-by-word reveal for lead text
  useEffect(() => {
    const hl = leadRef.current;
    if (!hl) return;
    const text = hl.textContent || "";
    hl.innerHTML = text
      .split(/\s+/)
      .map((w, i) => `<span style="--i:${i}">${w}</span>`)
      .join(" ");
  }, []);

  // Typewriter rotation with auto-measured minWidth to prevent layout shift
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const W = ROTATING_WORDS;
    let wi = 0;
    let ci = W[0].length;
    let del = true;
    let timeoutId: NodeJS.Timeout;

    const fit = () => {
      if (!el) return;
      const cur = el.textContent;
      el.style.minWidth = "0";
      let m = 0;
      W.forEach((w) => {
        el.textContent = w;
        m = Math.max(m, el.getBoundingClientRect().width);
      });
      el.textContent = cur;
      if (window.innerWidth <= 600) {
        el.style.minWidth = "0px";
      } else {
        el.style.minWidth = Math.ceil(m) + "px";
      }
    };

    fit();
    window.addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit);
    }

    function step() {
      if (!el) return;
      const w = W[wi];
      if (del) {
        ci--;
        el.textContent = w.slice(0, ci) || "\u200b";
        if (ci === 0) {
          del = false;
          wi = (wi + 1) % W.length;
          timeoutId = setTimeout(step, 300);
          return;
        }
        timeoutId = setTimeout(step, 45);
      } else {
        ci++;
        el.textContent = W[wi].slice(0, ci);
        if (ci === W[wi].length) {
          del = true;
          timeoutId = setTimeout(step, 2400);
          return;
        }
        timeoutId = setTimeout(step, 70);
      }
    }

    timeoutId = setTimeout(step, 3500);

    return () => {
      window.removeEventListener("resize", fit);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      window.location.assign(href);
      return;
    }
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="mdf-hero" id="top">
      {/* Background Video with Obsidian Vignette */}
      <video
        className="mdf-hero-bg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/img/hero/bg.webm" type="video/webm" />
        <source src="/img/hero/bg.mp4" type="video/mp4" />
      </video>
      <div className="mdf-hero-vignette" />

      {/* Main Top Header Block */}
      <div className="mdf-hero-container">
        <div className="mdf-badge">
          <i />
          <span>Award-Winning Client Acquisition Architecture · Est. 2024</span>
        </div>

        <h1 className="mdf-h1">
          We build funnels that print{" "}
          <span className="mdf-type" ref={typeRef}>
            booked calls.
          </span>
        </h1>

        <p className="mdf-lead hl" ref={leadRef}>
          Define the offer, deploy high-intent traffic, and let the funnel,
          automated follow-up, and AI qualification agent book qualified prospects
          into your calendar while you focus on closing.
        </p>

        {/* CTA Row */}
        <div className="mdf-cta-row">
          <Link className="mdf-btn-primary" href="/book">
            Build my funnel <i>&#8599;</i>
          </Link>
          <Link className="mdf-tag-pill" href="/cases">
            <i>&#9679;</i> Backed by <b>251+</b> case studies{" "}
            <span className="tg2">
              See results <i>&#8599;</i>
            </span>
          </Link>
        </div>

        {/* 3D Interactive Stage */}
        <div className="mdf-stage" id="stage">
          {/* Central AI Agent Avatar */}
          <div className="mdf-agent-wrapper">
            <div className="mdf-agent-glow" />
            <video
              className="mdf-agent-video"
              poster="/img/hero/agent.webp"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Million Dollar Funnel AI Agent"
            >
              <source src="/img/hero/agent.webm" type="video/webm" />
              <source src="/img/hero/agent.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Card 1: Live Funnel Telemetry */}
          <div className="mdf-telemetry mdf-card-funnel">
            <div className="mdf-uh">
              <b>Live Funnel Engine</b>
              <span className="pl">
                <i /> Running
              </span>
            </div>
            <div className="mdf-fs">
              <div className="mdf-fr" style={{ "--w": "100%", "--d": "0s" } as React.CSSProperties}>
                <span>Ad clicks</span>
                <i />
                <b>1,284</b>
              </div>
              <div className="mdf-fr" style={{ "--w": "72%", "--d": ".15s" } as React.CSSProperties}>
                <span>Page views</span>
                <i />
                <b>912</b>
              </div>
              <div className="mdf-fr" style={{ "--w": "40%", "--d": ".3s" } as React.CSSProperties}>
                <span>Applications</span>
                <i />
                <b>163</b>
              </div>
              <div className="mdf-fr" style={{ "--w": "24%", "--d": ".45s" } as React.CSSProperties}>
                <span>AI qualified</span>
                <i />
                <b>74</b>
              </div>
              <div className="mdf-fr hot" style={{ "--w": "16%", "--d": ".6s" } as React.CSSProperties}>
                <span>Booked calls</span>
                <i />
                <b>41</b>
              </div>
            </div>
            <div className="mdf-fe">
              <div className="mdf-ev">
                <i>AI</i>
                <span>
                  <b>Lead qualified by agent</b>Call booked, Thu 14:30
                </span>
                <em>now</em>
              </div>
              <div className="mdf-ev">
                <i className="f">&#10003;</i>
                <span>
                  <b>Application submitted</b>Coaching offer, $5K
                </span>
                <em>2m</em>
              </div>
            </div>
          </div>

          {/* Card 2: Connected Integrations */}
          <div className="mdf-telemetry mdf-card-conn">
            <b className="title">Connected Ecosystem</b>
            <div className="mdf-rw">
              <i>CRM</i> GoHighLevel Custom
            </div>
            <div className="mdf-rw">
              <i>CAL</i> Calendar + SMS AI
            </div>
            <div className="mdf-rw add" onClick={() => scrollToSection("#contact")}>
              + Add integration(s)
            </div>
          </div>

          {/* Card 3: Floating Micro Chip */}
          <div className="mdf-telemetry mdf-card-chip">
            <i /> Qualifies, books & follows up in 60s
          </div>

          {/* Card 4: Stack & Automations */}
          <div className="mdf-telemetry mdf-card-tools">
            <b>Stack & Automations</b>
            <div className="mdf-tool-icons">
              <span title="HighLevel">
                <img src="/img/tools/highlevel.webp" alt="HighLevel" />
              </span>
              <span title="ClickFunnels">
                <img src="/img/tools/clickfunnels.webp" alt="ClickFunnels" />
              </span>
              <span title="Zapier">
                <img src="/img/tools/zapier.svg" alt="Zapier" />
              </span>
              <span title="OpenAI">
                <img src="/img/tools/openai.svg" alt="OpenAI" />
              </span>
              <span title="Twilio">
                <img src="/img/tools/twilio.svg" alt="Twilio" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Bottom Bar */}
      <div className="mdf-cap-bar">
        <div className="mdf-cap-grid">
          {CAPABILITIES.map((c) => (
            <a
              key={c.title}
              href={c.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(c.href);
              }}
              className="mdf-cap-card group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 transition-transform duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.iconSrc} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="mdf-cap-num">{c.num}</div>
                  <div className="mdf-cap-title">{c.title}</div>
                  <div className="mdf-cap-sub">{c.subtitle}</div>
                </div>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 group-hover:border-sky-400/40 group-hover:bg-sky-400/10 group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
