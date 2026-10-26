"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FUNNELS_LIST } from "../data/siteContent";

export default function PortfolioFoldfolio() {
  const [funnelIndex, setFunnelIndex] = useState(0);
  const [clockTime, setClockTime] = useState("14:32");
  const [isTalking, setIsTalking] = useState(false);
  const [callTime, setCallTime] = useState("00:00");
  const [formDone, setFormDone] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["AC Funnel"]);

  const slideRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartRef = useRef<number>(0);

  // Keep live clock accurate
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
    const interval = setInterval(updateClock, 20000);
    return () => clearInterval(interval);
  }, []);

  // Connected call timer
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

      // Focus name input if not done
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
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTalking, formDone]);

  // Handle open call
  const openCall = useCallback(() => {
    setIsTalking(true);
  }, []);

  // Hang up
  const hangUp = useCallback(() => {
    setIsTalking(false);
    if (knobRef.current) {
      knobRef.current.style.transform = "translateX(0)";
    }
    if (slideRef.current) {
      slideRef.current.setAttribute("aria-valuenow", "0");
    }
    setTimeout(() => {
      setFormDone(false);
      setFormError("");
    }, 700);
  }, []);

  // Slide-to-talk widget interaction
  useEffect(() => {
    const sl = slideRef.current;
    const k = knobRef.current;
    if (!sl || !k) return;

    let dx = 0;
    let st = 0;
    let dr = false;
    let done = false;
    let moved = false;

    const max = () => sl.clientWidth - k.offsetWidth - 12;

    const go = () => {
      if (done) return;
      done = true;
      dr = false;
      sl.classList.remove("drag");
      k.style.transform = `translateX(${max()}px)`;
      openCall();
      setTimeout(() => {
        done = false;
        dx = 0;
      }, 900);
    };

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      dr = true;
      moved = false;
      st = e.clientX - dx;
      try {
        sl.setPointerCapture(e.pointerId);
      } catch (_) {}
      sl.classList.add("drag");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dr) return;
      dx = Math.max(0, Math.min(max(), e.clientX - st));
      if (dx > 4) moved = true;
      k.style.transform = `translateX(${dx}px)`;
      sl.setAttribute("aria-valuenow", String(Math.round((dx / max()) * 100)));
      if (dx > max() * 0.6) {
        go();
      }
    };

    const end = () => {
      if (!dr) return;
      dr = false;
      sl.classList.remove("drag");
      if (!moved || dx > max() * 0.35) {
        go();
      } else {
        dx = 0;
        k.style.transform = "translateX(0)";
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        go();
      }
    };

    sl.addEventListener("pointerdown", onPointerDown);
    sl.addEventListener("pointermove", onPointerMove);
    sl.addEventListener("pointerup", end);
    sl.addEventListener("pointercancel", end);
    sl.addEventListener("lostpointercapture", end);
    sl.addEventListener("keydown", onKeyDown);

    return () => {
      sl.removeEventListener("pointerdown", onPointerDown);
      sl.removeEventListener("pointermove", onPointerMove);
      sl.removeEventListener("pointerup", end);
      sl.removeEventListener("pointercancel", end);
      sl.removeEventListener("lostpointercapture", end);
      sl.removeEventListener("keydown", onKeyDown);
    };
  }, [openCall]);

  const goOpen = useCallback(() => {
    const pw = document.getElementById("portwrap");
    if (!pw) return;
    const top = Math.round(
      pw.getBoundingClientRect().top +
        window.scrollY +
        0.17 * (pw.offsetHeight - window.innerHeight)
    );
    const from = window.scrollY;
    const inside =
      from > top && from < top + pw.offsetHeight - window.innerHeight;

    const globalLenis = (window as unknown as {
      lenis?: { scrollTo: (y: number, opts: object) => void };
    }).lenis;

    if (globalLenis) {
      globalLenis.scrollTo(top, {
        duration: inside ? 1.1 : 1.4,
        force: true,
        lock: true,
      });
      return;
    }

    const t0 = performance.now();
    const D = inside ? 1000 : 1300;
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

  const handleNeedToggle = (value: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const site = (formData.get("site") as string)?.trim() || "";
    const spend = (formData.get("spend") as string) || "";
    const msg = (formData.get("msg") as string)?.trim() || "";

    const nameInput = form.elements.namedItem("name") as HTMLElement;
    const emailInput = form.elements.namedItem("email") as HTMLElement;

    nameInput?.classList.remove("bad");
    emailInput?.classList.remove("bad");

    let bad = "";
    if (!name) {
      nameInput?.classList.add("bad");
      bad = "Please add your name.";
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      emailInput?.classList.add("bad");
      bad = bad || "Please add a valid email.";
    }

    setFormError(bad);
    if (bad) return;

    const body = `Name: ${name}\nEmail: ${email}\nWebsite: ${site}\nMonthly ad spend: ${spend}\nNeeds: ${selectedNeeds.join(
      ", "
    )}\n\n${msg}`;

    window.location.href = `mailto:info@funnelsthatprint.com?subject=${encodeURIComponent(
      "New funnel enquiry from " + name
    )}&body=${encodeURIComponent(body)}`;

    setFormDone(true);
  };

  const currentFunnel = FUNNELS_LIST[funnelIndex];

  return (
    <div id="portwrap">
      <section className="port" id="work">
        <div className="top">
          <div>
            <div className="eyebrow mono">Portfolio</div>
            <h2 className="h3 d">Funnels we built. Live, not mockups.</h2>
          </div>
          <span
            className="mono"
            style={{ textAlign: "right", maxWidth: "30ch" }}
          >
            Scroll to unfold, then pick any of the {FUNNELS_LIST.length} funnels below.
          </span>
        </div>

        <div className="giant" aria-hidden="true">
          <span id="gl">FTP</span>
          <span id="gr">Work</span>
        </div>

        <div className="fstage">
          <div className="fshadow" id="fsh" />
          <div className="fold" id="dev">
            <div className="pane pr" id="pr">
              <div className="scr">
                <div className="site" id="site2">
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

            <div className="pane pl" id="pl">
              <div className="scr">
                <div className="site" id="site">
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

            <div className={`cover ${isTalking ? "talk" : ""}`} id="cover">
              <div className="cin">
                <img
                  className="cph"
                  src="/img/hero/agent.webp"
                  alt=""
                  loading="lazy"
                />
                <div className="clock" id="clock">
                  {clockTime}
                </div>
                <div className="sub">Funnels That Print &middot; Portfolio</div>
                <div className="notifs">
                  <div className="notif">
                    <img src="/img/funnels/f8-t.webp" alt="" />
                    <div>
                      <b>Mortgage AI System is live</b>
                      <span className="mono">WEBINAR FUNNEL &middot; NOW</span>
                    </div>
                  </div>
                  <div className="notif">
                    <img src="/img/funnels/f7-t.webp" alt="" />
                    <div>
                      <b>Rowan Security, 41 calls booked</b>
                      <span className="mono">
                        HIGH-TICKET FUNNEL &middot; 2H AGO
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cf">
                  <a href="#foot" aria-label="Instagram">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                    </svg>
                  </a>
                  <span>Scroll to unfold</span>
                  <a href="#foot" aria-label="X">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z" />
                    </svg>
                  </a>
                </div>

                <div className="ccall">
                  <div className="cn">Funnels That Print</div>
                  <div className="cs">
                    Incoming call &middot; about your next funnel
                  </div>
                  <div className="cav">
                    <img src="/img/team/gaurav.webp" alt="Gaurav Kapoor" />
                  </div>
                  <div
                    ref={slideRef}
                    className="slide"
                    id="slide"
                    role="slider"
                    aria-label="Slide to talk"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={0}
                    tabIndex={0}
                  >
                    <span ref={knobRef} className="sk" id="sk">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#fff"
                      >
                        <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" />
                      </svg>
                    </span>
                    <span className="st">slide to talk</span>
                  </div>
                  <a className="cm" href="mailto:info@funnelsthatprint.com">
                    INFO@FUNNELSTHATPRINT.COM
                  </a>
                </div>

                {/* In-Phone Contact Form */}
                <div
                  className="cform"
                  id="pcall"
                  data-lenis-prevent
                  aria-hidden={!isTalking}
                >
                  <div className="cfh">
                    <span className="cfl">
                      <i />Connected <b id="ctime">{callTime}</b>
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
                    <div className="cfa">
                      <img src="/img/team/gaurav.webp" alt="Gaurav Kapoor" />
                      <div>
                        <b>Gaurav Kapoor</b>
                        <span>Founder &middot; on the line</span>
                      </div>
                      <span className="wave" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                    <h3>Tell me about your funnel.</h3>
                    <form
                      ref={formRef}
                      id="pform"
                      className="pform"
                      noValidate
                      onSubmit={handleFormSubmit}
                      hidden={formDone}
                    >
                      <fieldset>
                        <legend>What do you need?</legend>
                        <div className="pch">
                          {[
                            "AC Funnel",
                            "VSL Funnel",
                            "Landing page",
                            "Automation",
                            "AI calling",
                          ].map((item) => (
                            <label key={item}>
                              <input
                                type="checkbox"
                                name="need"
                                value={item}
                                checked={selectedNeeds.includes(item)}
                                onChange={() => handleNeedToggle(item)}
                              />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <div className="pg2">
                        <label>
                          <span>Name</span>
                          <input
                            ref={nameInputRef}
                            name="name"
                            autoComplete="name"
                            placeholder="Jane Smith"
                            required
                          />
                        </label>
                        <label>
                          <span>Email</span>
                          <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jane@company.com"
                            required
                          />
                        </label>
                      </div>
                      <div className="pg2">
                        <label>
                          <span>Website</span>
                          <input name="site" placeholder="company.com" />
                        </label>
                        <label>
                          <span>Monthly ad spend</span>
                          <select name="spend" defaultValue="Not running ads yet">
                            <option value="Not running ads yet">
                              Not running ads yet
                            </option>
                            <option value="Under $5K">Under $5K</option>
                            <option value="$5K to $20K">$5K to $20K</option>
                            <option value="$20K to $50K">$20K to $50K</option>
                            <option value="$50K+">$50K+</option>
                          </select>
                        </label>
                      </div>
                      <label>
                        <span>What are you selling?</span>
                        <textarea
                          name="msg"
                          rows={3}
                          placeholder="Offer, price point, audience, and what is not working right now."
                        />
                      </label>
                      <button type="submit" className="psend">
                        Send to Gaurav <i>&#8599;</i>
                      </button>
                      {formError && (
                        <p className="perr" id="perr" role="alert">
                          {formError}
                        </p>
                      )}
                    </form>

                    {formDone && (
                      <div className="pdone" id="pdone">
                        <span className="ok">&#10003;</span>
                        <b>Message ready to send</b>
                        <p>
                          Your email app opened with everything filled in. Press
                          send and we reply within one business day.
                        </p>
                        <button
                          type="button"
                          className="psend"
                          id="pagain"
                          onClick={() => setFormDone(false)}
                        >
                          Back to the call
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flab" id="flab">
              <button
                type="button"
                id="fprev"
                aria-label="Previous funnel"
                onClick={() => selectFunnel(funnelIndex - 1)}
              >
                &larr;
              </button>
              <span>
                <b id="fnum">{`0${funnelIndex + 1} / 0${FUNNELS_LIST.length}`}</b>
                <em id="fname" style={{ fontStyle: "normal" }}>
                  {currentFunnel.name}
                </em>
              </span>
              <button
                type="button"
                id="fnext"
                aria-label="Next funnel"
                onClick={() => selectFunnel(funnelIndex + 1)}
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        <span className="hint">Pick a funnel</span>
        <div className="fsel" id="fsel" role="tablist" aria-label="Funnels">
          {FUNNELS_LIST.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              data-n={`0${i + 1}`}
              data-i={i}
              aria-label={f.name}
              title={f.name}
              className={funnelIndex === i ? "on" : ""}
              onClick={() => selectFunnel(i)}
            >
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
