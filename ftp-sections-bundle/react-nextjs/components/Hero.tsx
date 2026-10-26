"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { HERO_WORDS } from "../data/siteContent";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  // Word-by-word reveal for lead text matching ftp 4
  useEffect(() => {
    const hl = leadRef.current;
    if (!hl) return;
    const text = hl.textContent || "";
    hl.innerHTML = text
      .split(/\s+/)
      .map((w, i) => `<span style="--i:${i}">${w}</span>`)
      .join(" ");
  }, []);

  // Typewriter rotation with auto-measured minWidth so "We build funnels that print" remains completely static
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const W = HERO_WORDS;
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
          timeoutId = setTimeout(step, 2200);
          return;
        }
        timeoutId = setTimeout(step, 70);
      }
    }

    timeoutId = setTimeout(step, 3800);

    return () => {
      window.removeEventListener("resize", fit);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <video
        className="hbg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/img/hero/bg.webm" type="video/webm" />
        <source src="/img/hero/bg.mp4" type="video/mp4" />
      </video>

      <div className="box">
        <h1 className="h1 d">
          We build funnels that print{" "}
          <span className="type" id="type" ref={typeRef}>
            booked calls.
          </span>
        </h1>

        <p className="lead hl" id="hlead" ref={leadRef}>
          Define the offer, connect your traffic, and let the funnel, the follow-up
          and the AI agent do the work while you focus on closing.
        </p>

        <div
          className="hcta rise"
          style={{ "--rd": ".3s" } as React.CSSProperties}
        >
          <a className="btn grad" href="#robo">
            Build my funnel <i>&#8599;</i>
          </a>
          <Link className="tag" href="/case-studies">
            <i>&#9679;</i> Backed by <b>275+</b> case studies{" "}
            <span className="tg2">
              See results <i>&#8599;</i>
            </span>
          </Link>
        </div>

        <div className="stage" id="stage">
          <div
            className="agent rise"
            style={{ "--rd": ".4s" } as React.CSSProperties}
          >
            <video
              poster="/img/hero/agent.webp"
              autoPlay
              muted
              loop
              playsInline
              aria-label="AI agent"
            >
              <source src="/img/hero/agent.webm" type="video/webm" />
              <source src="/img/hero/agent.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            className="ui lead"
            style={{ left: 0, top: "14%", "--d": "1s" } as React.CSSProperties}
            data-m="22"
          >
            <div className="uh">
              <b>Live funnel</b>
              <span className="pl">
                <i>&#9679;</i> Running
              </span>
            </div>
            <div className="fs">
              <div
                className="fr"
                style={{ "--w": "100%", "--d": "0s" } as React.CSSProperties}
              >
                <span>Ad clicks</span>
                <i />
                <b>1,284</b>
              </div>
              <div
                className="fr"
                style={{ "--w": "72%", "--d": ".15s" } as React.CSSProperties}
              >
                <span>Page views</span>
                <i />
                <b>912</b>
              </div>
              <div
                className="fr"
                style={{ "--w": "40%", "--d": ".3s" } as React.CSSProperties}
              >
                <span>Applications</span>
                <i />
                <b>163</b>
              </div>
              <div
                className="fr"
                style={{ "--w": "24%", "--d": ".45s" } as React.CSSProperties}
              >
                <span>AI qualified</span>
                <i />
                <b>74</b>
              </div>
              <div
                className="fr hot"
                style={{ "--w": "16%", "--d": ".6s" } as React.CSSProperties}
              >
                <span>Booked calls</span>
                <i />
                <b>41</b>
              </div>
            </div>
            <div className="fe">
              <div className="ev1">
                <i>AI</i>
                <span>
                  <b>Lead qualified by the agent</b>Call booked, Thu 14:30
                </span>
                <em>now</em>
              </div>
              <div className="ev1">
                <i className="f">&#10003;</i>
                <span>
                  <b>Application submitted</b>Coaching offer, $3K
                </span>
                <em>2m</em>
              </div>
            </div>
          </div>

          <div
            className="ui src"
            style={{ right: 0, top: "8%", "--d": "1.2s" } as React.CSSProperties}
            data-m="-20"
          >
            <b style={{ fontSize: 16, marginBottom: 4 }}>Connected</b>
            <div className="rw">
              <i>CRM</i>GoHighLevel
            </div>
            <div className="rw">
              <i style={{ background: "#2d4fe6" }}>CAL</i>Calendar + reminders
            </div>
            <div className="rw add">+ Add source(s)</div>
          </div>

          <div
            className="ui chip"
            style={{
              left: "10%",
              bottom: "10%",
              "--d": "1.5s",
            } as React.CSSProperties}
            data-m="14"
          >
            <i>&#9679;</i>Qualifies, books, follows up
          </div>

          <div
            className="ui tools"
            style={{
              right: "4%",
              bottom: "8%",
              "--d": "1.7s",
            } as React.CSSProperties}
            data-m="-14"
          >
            <b>Stack and automations</b>
            <div className="ic">
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
    </header>
  );
}
