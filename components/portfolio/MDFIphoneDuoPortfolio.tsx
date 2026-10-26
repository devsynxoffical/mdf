"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const FUNNELS_LIST = [
  { id: 8, name: "Mortgage AI System", desc: "Webinar funnel, mortgage leads" },
  { id: 7, name: "Rowan Security", desc: "Executive protection, high-ticket application" },
  { id: 6, name: "Inventiv", desc: "Invention showcase, lead funnel" },
  { id: 5, name: "Pluto CRM", desc: "Insurance CRM, free trial funnel" },
  { id: 4, name: "Bio-Optimization Made Easy", desc: "Long-form VSL sales letter" },
  { id: 2, name: "Growth Foundry", desc: "Local SEO audit, lead funnel" },
];

export default function MDFIphoneDuoPortfolio() {
  const [funnelIndex, setFunnelIndex] = useState(0);
  const [clockTime, setClockTime] = useState("21:05");
  const [isTalking, setIsTalking] = useState(false);
  const [callTime, setCallTime] = useState("00:00");
  const [formDone, setFormDone] = useState(false);
  const [formError, setFormError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartRef = useRef<number>(0);

  // Live Digital Clock
  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setClockTime(
        String(d.getHours()).padStart(2, "0") +
          ":" +
          String(d.getMinutes()).padStart(2, "0")
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 15000);
    return () => clearInterval(interval);
  }, []);

  // Connected Call Timer
  useEffect(() => {
    if (isTalking) {
      timerStartRef.current = Date.now();
      setCallTime("00:00");
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        const s = Math.floor((Date.now() - timerStartRef.current) / 1000);
        const mins = String(Math.floor(s / 60)).padStart(2, "0");
        const secs = String(s % 60).padStart(2, "0");
        setCallTime(`${mins}:${secs}`);
      }, 1000);

      setTimeout(() => {
        if (!formDone && nameInputRef.current) {
          nameInputRef.current.focus({ preventScroll: true });
        }
      }, 400);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTalking, formDone]);

  const openCall = useCallback(() => {
    setIsTalking(true);
  }, []);

  const hangUp = useCallback(() => {
    setIsTalking(false);
    setTimeout(() => {
      setFormDone(false);
      setFormError("");
    }, 600);
  }, []);

  // Smooth scroll trigger to open fold
  const goOpen = useCallback(() => {
    const pw = document.getElementById("portwrap");
    if (!pw) return;
    const top = Math.round(
      pw.getBoundingClientRect().top +
        window.scrollY +
        0.24 * (pw.offsetHeight - window.innerHeight)
    );
    const from = window.scrollY;
    const inside =
      from > top && from < top + pw.offsetHeight - window.innerHeight;

    const globalLenis = (window as unknown as {
      lenis?: { scrollTo: (y: number, opts: object) => void };
    }).lenis;

    if (globalLenis && typeof globalLenis.scrollTo === "function") {
      globalLenis.scrollTo(top, {
        duration: inside ? 1.0 : 1.3,
        force: true,
        lock: true,
      });
      return;
    }

    const t0 = performance.now();
    const D = inside ? 900 : 1200;
    (function st(t) {
      const k = Math.min(1, (t - t0) / D);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      window.scrollTo(0, from + (top - from) * e);
      if (k < 1) requestAnimationFrame(st);
    })(t0);
  }, []);

  const selectFunnel = (i: number) => {
    const nextIdx = (i + FUNNELS_LIST.length) % FUNNELS_LIST.length;
    setFunnelIndex(nextIdx);
    goOpen();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const business = (formData.get("business") as string)?.trim() || "";
    const revenue = (formData.get("revenue") as string) || "";
    const bottleneck = (formData.get("bottleneck") as string) || "";
    const notes = (formData.get("notes") as string)?.trim() || "";

    let bad = "";
    if (!name) bad = "Please enter your name.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) bad = "Please enter a valid email address.";

    setFormError(bad);
    if (bad) return;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || "Not provided"}`,
      `Company / Brand: ${business || "Not provided"}`,
      `Monthly Revenue: ${revenue}`,
      `Primary Bottleneck: ${bottleneck}`,
      "",
      `Notes / Context: ${notes || "None"}`,
    ].join("\n");

    window.location.href = `mailto:info@milliondollarfunnel.com?subject=${encodeURIComponent(
      "Million Dollar Funnel™ — Strategy Call Booking from " + name
    )}&body=${encodeURIComponent(body)}`;

    setFormDone(true);
  };

  // 3D Perspective Scroll Unfold Animation
  useEffect(() => {
    const ptw = document.getElementById("portwrap");
    const dev = document.getElementById("dev");
    const cover = document.getElementById("cover");
    const pl = document.getElementById("pl");
    const pr = document.getElementById("pr");
    const fsh = document.getElementById("fsh");
    const gl = document.getElementById("gl");
    const gr = document.getElementById("gr");
    const ptop = document.getElementById("port-top");
    const sites = [
      document.getElementById("site"),
      document.getElementById("site2"),
    ].filter(Boolean) as HTMLElement[];
    const scr = document.querySelector("#pl .scr");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!ptw || !dev || !cover || !pl || !pr || prefersReducedMotion) return;

    const cl = (v: number) => Math.max(0, Math.min(1, v));
    let tick = false;
    let lastE = -1;
    let lastYY = -1;

    function updateFold() {
      tick = false;
      if (!ptw || !dev || !cover || !pl || !pr) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rt = ptw.getBoundingClientRect();

      if (rt.top < vh && rt.bottom > 0) {
        const p = cl(-rt.top / (ptw.offsetHeight - vh));
        // Smooth opening between 4% and 20% scroll
        const op = cl((p - 0.04) / 0.16);
        // Closing point: smoothly folds back shut between 85% and 96% scroll
        const cs = cl((p - 0.85) / 0.11);
        const o2 = op * (1 - cs);
        const e = o2 * o2 * (3 - 2 * o2);
        // Always measure width from pr, never from cover which toggles visibility
        const P = pr.offsetWidth || (dev.offsetWidth / 2);
        const mob = vw <= 980;

        if (e !== lastE) {
          lastE = e;
          if (!mob) {
            if (e >= 0.98) {
              dev.style.transform = "none";
              pl.style.transform = "none";
            } else {
              dev.style.transform = `translate3d(${((-P / 2) * (1 - e)).toFixed(1)}px, 0, 0)`;
              pl.style.transform = `rotateY(${(180 - 180 * e).toFixed(2)}deg)`;
            }
            cover.style.transform = `rotateY(${(-180 * e).toFixed(2)}deg)`;
            cover.style.visibility = e >= 0.5 ? "hidden" : "visible";
            cover.style.pointerEvents = e >= 0.5 ? "none" : "auto";
            cover.style.opacity = e >= 0.5 ? "0" : "1";
            cover.style.setProperty("--sh", Math.min(1, e * 1.8).toFixed(2));
            pl.style.visibility = e <= 0.5 ? "hidden" : "visible";
          } else {
            cover.style.transform = "none";
            cover.style.opacity = String(Math.max(0, 1 - e * 3.5));
            cover.style.visibility = e >= 0.28 ? "hidden" : "visible";
            cover.style.pointerEvents = e >= 0.28 ? "none" : "auto";
          }
          dev.classList.toggle("half", e > 0.5);
          if (ptop) ptop.style.opacity = Math.max(0, 1 - e * 1.6).toFixed(3);
          if (!mob && fsh) {
            fsh.style.transform = `translateX(-50%) scaleX(${(0.5 + 0.5 * e).toFixed(3)})`;
          }
          dev.classList.toggle("open", e > 0.92);

          const spread = e * vw * 0.42;
          if (gl) {
            gl.style.transform = `translate3d(${-spread}px, 0, 0)`;
            gl.style.opacity = String(Math.max(0, 1 - e * 0.85));
          }
          if (gr) {
            gr.style.transform = `translate3d(${spread}px, 0, 0)`;
            gr.style.opacity = String(Math.max(0, 1 - e * 0.85));
          }
        }

        if (sites.length && scr) {
          const siteMax = Math.max(0, sites[0].scrollHeight - scr.clientHeight);
          const sc = cl((p - 0.20) / 0.64);
          const yy = Math.round(sc * siteMax);
          if (yy !== lastYY) {
            lastYY = yy;
            sites.forEach((x) => {
              x.style.transform = `translate3d(0, ${-yy}px, 0)`;
            });
          }
        }
      }
    }

    function onScroll() {
      if (!tick) {
        tick = true;
        requestAnimationFrame(updateFold);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const globalLenis = (window as unknown as {
      lenis?: { on: (ev: string, cb: () => void) => void; off: (ev: string, cb: () => void) => void };
    }).lenis;

    if (globalLenis && typeof globalLenis.on === "function") {
      globalLenis.on("scroll", onScroll);
    }

    updateFold();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (globalLenis && typeof globalLenis.off === "function") {
        globalLenis.off("scroll", onScroll);
      }
    };
  }, []);

  const currentFunnel = FUNNELS_LIST[funnelIndex];

  return (
    <div id="portwrap">
      <section className="port" id="work">
        {/* Top Header */}
        <div className="top" id="port-top">
          <div>
            <div className="eyebrow mono">
              Portfolio
            </div>
            <h2 className="h3 d">Funnels we built. Live, not mockups.</h2>
          </div>
          <span className="mono sub-hint">
            Scroll to unfold, or pick a funnel below.
          </span>
        </div>

        {/* Giant Dynamic Background Typography */}
        <div className="giant" aria-hidden="true">
          <span id="gl">MDF</span>
          <span id="gr">WORK</span>
        </div>

        {/* 3D Perspective Stage */}
        <div className="fstage">
          <div className="fshadow" id="fsh" />

          {/* Foldable Dual-Screen iPhone Mockup */}
          <div className="fold" id="dev">
            {/* Right Screen Pane */}
            <div className="pane pr" id="pr">
              <div className="scr">
                <div className="site" id="site2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="fimg"
                    id="fimg2"
                    src={`/img/funnels/f${currentFunnel.id}.webp`}
                    alt=""
                    decoding="async"
                  />
                </div>
                <span className="sb r">
                  5G<i />
                </span>
              </div>
            </div>

            {/* Left Screen Pane */}
            <div className="pane pl" id="pl">
              <div className="scr">
                <div className="site" id="site">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="fimg"
                    id="fimg"
                    src={`/img/funnels/f${currentFunnel.id}.webp`}
                    alt={`${currentFunnel.name} funnel`}
                    decoding="async"
                  />
                </div>
                <span className="sb l">09:41</span>
              </div>
            </div>

            {/* Front Cover Display */}
            <div className={`cover ${isTalking ? "talk" : ""}`} id="cover">
              <div className="cin">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="cph"
                  src="/images/mdf-wallpaper.jpg"
                  alt="Million Dollar Funnel™ 3D Crystal"
                  loading="lazy"
                />

                <div className="clock" id="clock">
                  {clockTime}
                </div>
                <div className="sub">Million Dollar Funnel™ &middot; Portfolio</div>

                {/* Notifications */}
                <div className="notifs">
                  <div className="notif">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/funnels/f8-t.webp" alt="" />
                    <div>
                      <b>Mortgage AI System is live</b>
                      <span className="mono">WEBINAR FUNNEL &middot; NOW</span>
                    </div>
                  </div>
                  <div className="notif">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/funnels/f7-t.webp" alt="" />
                    <div>
                      <b>Rowan Security, 41 calls booked</b>
                      <span className="mono">HIGH-TICKET FUNNEL &middot; 2H AGO</span>
                    </div>
                  </div>
                </div>

                {/* Cover Footer */}
                <div className="cf">
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      goOpen();
                    }}
                    aria-label="Instagram"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                    </svg>
                  </a>
                  <button type="button" className="unfold-btn" onClick={goOpen}>
                    Scroll to unfold
                  </button>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      openCall();
                    }}
                    aria-label="Call Strategy Team"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z" />
                    </svg>
                  </a>
                </div>

                {/* In-Phone Connected Consultation Form */}
                <div className="cform" id="pcall" aria-hidden={!isTalking}>
                  <div className="cfh">
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>
                      Connected <b id="ctime" className="text-white ml-1">{callTime}</b>
                    </span>
                    <button
                      type="button"
                      className="cend"
                      id="cend"
                      aria-label="End call"
                      onClick={hangUp}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                        <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85a1 1 0 0 1-1.41-.02L.29 13.08a1 1 0 0 1 0-1.4C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.68a1 1 0 0 1 0 1.4l-2.48 2.48a1 1 0 0 1-1.41.02 11.2 11.2 0 0 0-2.67-1.85 1 1 0 0 1-.56-.9v-3.1A15 15 0 0 0 12 9z" />
                      </svg>
                    </button>
                  </div>
                  <div className="cfw">
                    {!formDone ? (
                      <form
                        id="pform"
                        className="pform"
                        noValidate
                        onSubmit={handleFormSubmit}
                      >
                        <div className="pg2 grid grid-cols-2 gap-2">
                          <label>
                            <span>Full Name</span>
                            <input
                              ref={nameInputRef}
                              name="name"
                              placeholder="Jane Smith"
                              required
                            />
                          </label>
                          <label>
                            <span>Work Email</span>
                            <input
                              name="email"
                              type="email"
                              placeholder="jane@company.com"
                              required
                            />
                          </label>
                        </div>

                        <div className="pg2 grid grid-cols-2 gap-2" style={{ marginTop: "4px" }}>
                          <label>
                            <span>Phone / WhatsApp</span>
                            <input
                              name="phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                            />
                          </label>
                          <label>
                            <span>Company / Brand</span>
                            <input
                              name="business"
                              placeholder="Acme Systems"
                            />
                          </label>
                        </div>

                        <label style={{ marginTop: "4px" }}>
                          <span>Current Monthly Revenue</span>
                          <select name="revenue" defaultValue="$30k – $100k / month">
                            <option value="Under $10k / month">Under $10k / month</option>
                            <option value="$10k – $30k / month">$10k – $30k / month</option>
                            <option value="$30k – $100k / month">$30k – $100k / month</option>
                            <option value="$100k+ / month">$100k+ / month</option>
                          </select>
                        </label>

                        <label style={{ marginTop: "4px" }}>
                          <span>Biggest Growth Bottleneck</span>
                          <select name="bottleneck" defaultValue="Traffic is expensive / leads not booking calls">
                            <option value="Traffic is expensive / leads not booking calls">Traffic is expensive / leads not booking calls</option>
                            <option value="Low-ticket front end not converting">Low-ticket front end not converting</option>
                            <option value="No CRM tracking / attribution chaos">No CRM tracking / attribution chaos</option>
                            <option value="Paid ads not scaling profitably">Paid ads not scaling profitably</option>
                            <option value="Need complete full-funnel rebuild & install">Need complete full-funnel rebuild & install</option>
                          </select>
                        </label>

                        <label style={{ marginTop: "4px" }}>
                          <span>Additional Notes / Context</span>
                          <textarea
                            name="notes"
                            rows={2}
                            placeholder="Current website, funnel URL, or main goal..."
                          />
                        </label>

                        <button type="submit" className="psend">
                          Request 1-on-1 Strategy Session <i>&#8599;</i>
                        </button>
                        {formError && (
                          <p className="perr text-red-400 text-xs mt-1" role="alert">
                            {formError}
                          </p>
                        )}
                      </form>
                    ) : (
                      <div className="text-center py-6 px-3 bg-white/[0.04] rounded-2xl border border-white/10 mt-2">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1254EC]/20 text-[#38BDF8] text-lg font-bold mb-2 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                          ✓
                        </span>
                        <b className="block text-white text-sm">Strategy Request Configured</b>
                        <p className="text-xs text-slate-300 mt-1 mb-4">
                          Opening your email client to connect directly with the Million Dollar Funnel™ strategy leads.
                        </p>
                        <button
                          type="button"
                          className="psend w-full"
                          onClick={() => setFormDone(false)}
                        >
                          Back to call
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Prev / Next Navigator Under Phone */}
            <div className="flab" id="flab">
              <button
                type="button"
                aria-label="Previous funnel"
                onClick={() => selectFunnel(funnelIndex - 1)}
              >
                &larr;
              </button>
              <span>
                <b id="fnum">{`0${funnelIndex + 1} / 0${FUNNELS_LIST.length}`}</b>
                <em id="fname">{currentFunnel.name}</em>
              </span>
              <button
                type="button"
                aria-label="Next funnel"
                onClick={() => selectFunnel(funnelIndex + 1)}
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Circular Selector Tabs */}
        <div className="fsel" id="fsel" role="tablist" aria-label="Funnels">
          {FUNNELS_LIST.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              data-n={`0${i + 1}`}
              aria-label={f.name}
              title={f.name}
              className={funnelIndex === i ? "on" : ""}
              onClick={() => selectFunnel(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/img/funnels/f${f.id}-t.webp`}
                alt=""
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
