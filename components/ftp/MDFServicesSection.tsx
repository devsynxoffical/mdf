"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "./useReveal";

export const SERVICES: { id: number; title: string; desc: string; category: "build" | "system"; badge: string }[] = [
  {
    id: 0,
    title: "AC Funnels",
    desc: "Move prospects from initial interest to application and booked call.",
    category: "build",
    badge: "01",
  },
  {
    id: 1,
    title: "Landing Pages",
    desc: "Focused pages built around one offer and one conversion objective.",
    category: "build",
    badge: "02",
  },
  {
    id: 2,
    title: "VSL Funnels",
    desc: "Use video-led selling to educate prospects and move them toward action.",
    category: "build",
    badge: "03",
  },
  {
    id: 3,
    title: "Low-Ticket Funnels",
    desc: "Convert cold traffic into buyers with strategically structured offers, checkout flows, upsells and downsells.",
    category: "build",
    badge: "04",
  },
  {
    id: 4,
    title: "Bridge Funnels",
    desc: "Warm and pre-frame cold traffic before sending prospects to your primary offer.",
    category: "build",
    badge: "05",
  },
  {
    id: 5,
    title: "Application Funnels",
    desc: "Collect the information your sales team needs while filtering for better-fit prospects.",
    category: "build",
    badge: "06",
  },
  {
    id: 6,
    title: "Email & SMS Workflows",
    desc: "Automated sequences for new leads, nurturing, reminders, follow-ups and reactivation.",
    category: "system",
    badge: "07",
  },
  {
    id: 7,
    title: "CRM Automation",
    desc: "Move leads through your pipeline automatically based on their actions.",
    category: "system",
    badge: "08",
  },
  {
    id: 8,
    title: "Appointment Workflows",
    desc: "Confirmation, reminders, rescheduling and no-show follow-up.",
    category: "system",
    badge: "09",
  },
  {
    id: 9,
    title: "AI Calling Agent",
    desc: "Automatically engage new leads, ask qualifying questions, answer common questions and help move qualified prospects toward an appointment.",
    category: "system",
    badge: "10",
  },
];

/**
 * ( 03 ) What we do — ported from Funnels That Print and re-themed for MDF.
 * Styles live in app/ftp-sections.css, scoped under `.mdf-ftp`.
 */
const CYCLE_MS = 5200;
const slug = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");

export default function MDFServicesSection() {
  const [selectedId, setSelectedId] = useState(0);
  const [paused, setPaused] = useState(false);
  const revealRef = useReveal<HTMLElement>();
  const inViewRef = useRef(false);

  // Auto-cycle through the services while the section is on screen.
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      inViewRef.current = e.isIntersecting;
    });
    io.observe(el);
    const id = window.setInterval(() => {
      if (inViewRef.current && !paused) {
        setSelectedId((i) => (i + 1) % SERVICES.length);
      }
    }, CYCLE_MS);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [paused, revealRef]);

  const buildServices = SERVICES.filter((s) => s.category === "build");
  const systemServices = SERVICES.filter((s) => s.category === "system");
  const currentService = SERVICES[selectedId] || SERVICES[0];

  const renderMgContent = (id: number) => {
    switch (id) {
      case 0:
        return (
          <div className="sc">
            <div className="fun">
              <i />
              <i />
              <i />
            </div>
            <span className="dot" style={{ "--d": "0s", "--x": "-70px" } as React.CSSProperties} />
            <span className="dot" style={{ "--d": "1.4s", "--x": "60px" } as React.CSSProperties} />
            <span className="dot" style={{ "--d": "2.8s", "--x": "-20px" } as React.CSSProperties} />
            <span className="ch o">Call booked, Thu 14:30</span>
          </div>
        );
      case 1:
        return (
          <div className="sc">
            <div className="br">
              <div className="ln" style={{ "--lw": "82%", "--d": "0s" } as React.CSSProperties} />
              <div className="ln" style={{ "--lw": "60%", "--d": ".15s" } as React.CSSProperties} />
              <div className="ln s" style={{ "--lw": "90%", "--d": ".4s" } as React.CSSProperties} />
              <div className="ln s" style={{ "--lw": "74%", "--d": ".5s" } as React.CSSProperties} />
              <div className="ln s" style={{ "--lw": "84%", "--d": ".6s" } as React.CSSProperties} />
              <span className="bt">Book a call</span>
            </div>
            <svg className="cur" viewBox="0 0 24 24">
              <path
                d="M4 2l16 9-7 2-4 7z"
                fill="#141414"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
      case 2:
        return (
          <div className="sc">
            <div className="pl">
              <div className="pg">
                <i />
              </div>
            </div>
            <div className="wv">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <i
                  key={i}
                  style={{ "--d": `-${(i * 0.13).toFixed(2)}s` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="sc">
            <div className="cd">
              <div className="rw">
                <b>Front-end offer</b>
                <span>$47</span>
              </div>
              <div className="rw a" style={{ "--d": "1.2s" } as React.CSSProperties}>
                <b>Order bump</b>
                <span>+$19</span>
              </div>
              <div className="rw a" style={{ "--d": "2.4s" } as React.CSSProperties}>
                <b>Upsell</b>
                <span>+$197</span>
              </div>
              <div className="tot">
                Total
                <span>
                  <s style={{ "--d": "0s" } as React.CSSProperties}>$47</s>
                  <s style={{ "--d": "1.2s" } as React.CSSProperties}>$66</s>
                  <s style={{ "--d": "2.4s" } as React.CSSProperties}>$263</s>
                  <s style={{ "--d": "3.6s" } as React.CSSProperties}>$263</s>
                  <s style={{ "--d": "4.8s" } as React.CSSProperties}>$263</s>
                </span>
              </div>
            </div>
            <span className="ch o">Buyer, follow-up started</span>
          </div>
        );
      case 4:
        return (
          <div className="sc">
            <div className="ln" />
            <div className="nd hot" style={{ left: "8%", "--d": "0s" } as React.CSSProperties}>
              AD
            </div>
            <div className="nd b hot" style={{ left: "50%", "--d": "1.6s" } as React.CSSProperties}>
              BRIDGE
            </div>
            <div className="nd hot" style={{ left: "92%", "--d": "3.4s" } as React.CSSProperties}>
              OFFER
            </div>
            <span className="lb" style={{ left: "8%" }}>
              Cold click
            </span>
            <span className="lb" style={{ left: "50%" }}>
              Pre-frame
            </span>
            <span className="lb" style={{ left: "92%" }}>
              Warm arrival
            </span>
            <div className="dot" />
            <span className="ch">Trust built before the pitch</span>
          </div>
        );
      case 5:
        return (
          <div className="sc">
            <div className="cd">
              <div className="fd" data-l="What do you sell?">
                <i style={{ "--lw": "58%", "--d": "0s" } as React.CSSProperties} />
              </div>
              <div className="fd" data-l="Monthly revenue">
                <i style={{ "--lw": "36%", "--d": "1s" } as React.CSSProperties} />
              </div>
              <div className="fd" data-l="Main traffic source">
                <i style={{ "--lw": "48%", "--d": "2s" } as React.CSSProperties} />
              </div>
              <div className="fd" data-l="Start date">
                <i style={{ "--lw": "42%", "--d": "3s" } as React.CSSProperties} />
              </div>
              <div className="pr">
                Progress
                <b>
                  <i />
                </b>
                4 / 4
              </div>
            </div>
            <span className="ch o">Qualified, routed to sales</span>
          </div>
        );
      case 6:
        return (
          <div className="sc">
            <div className="ph">
              <div className="bb" style={{ "--d": "0s" } as React.CSSProperties}>
                <b>Day 0, email</b>Welcome. Here is what happens next.
              </div>
              <div className="bb o" style={{ "--d": "1.3s" } as React.CSSProperties}>
                <b>Day 1, SMS</b>Reminder: your call is tomorrow 14:30.
              </div>
              <div className="bb" style={{ "--d": "2.6s" } as React.CSSProperties}>
                <b>Day 4, email</b>Still thinking it over? Reply and we will help.
              </div>
              <div className="bb o" style={{ "--d": "3.9s" } as React.CSSProperties}>
                <b>Day 7, SMS</b>Your spot is open until Friday.
              </div>
            </div>
            <div className="env" />
          </div>
        );
      case 7:
        return (
          <div className="sc">
            <div className="col" data-l="NEW" style={{ left: 0 }}>
              <i />
              <i />
            </div>
            <div className="col" data-l="QUALIFIED" style={{ left: "35%" }}>
              <i />
            </div>
            <div className="col" data-l="BOOKED" style={{ left: "70%" }}>
              <i />
              <i />
              <i />
            </div>
            <div className="mv">Sarah M.</div>
            <span className="ch o">Stage updated automatically</span>
          </div>
        );
      case 8:
        return (
          <div className="sc">
            <div className="cal">
              {Array.from({ length: 21 }, (_, i) => (
                <i key={i} className={i === 16 ? "on" : ""} />
              ))}
            </div>
            <div className="bell">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" />
              </svg>
            </div>
            <span className="ch">Reminder sent, 24h before</span>
          </div>
        );
      case 9:
        return (
          <div className="sc">
            <span className="lb">AGENT ON THE LINE</span>
            <div className="ring">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" />
              </svg>
            </div>
            <div className="wv">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <i
                  key={i}
                  style={{ "--d": `-${(i * 0.09).toFixed(2)}s` } as React.CSSProperties}
                />
              ))}
            </div>
            <span className="ch o">Qualifying: budget, timeline, fit</span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPvContent = (id: number) => {
    switch (id) {
      case 0:
        return (
          <>
            <div className="f o">
              <b>Application</b>3 of 5 questions answered
            </div>
            <div className="f">
              <b>Qualified</b>Budget, timeline and fit confirmed
            </div>
            <div className="f">
              <b>Book a call</b>Thu 14:30, 30 min
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="f o">
              <b>One offer. One action.</b>Headline, proof, CTA
            </div>
            <div className="bars">
              <s />
              <s />
              <s />
              <s />
              <s />
              <s />
              <s />
            </div>
            <div className="f">
              <b>Conversion</b>Single objective tracked
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="f o">
              <b>Video sales letter</b>Prospects educated before the ask
            </div>
            <div className="f">
              <b>Watch time</b>Tracked to the second
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="f">
              <b>Sales page</b>Offer stack
            </div>
            <div className="f o">
              <b>Checkout</b>Order bump, upsell, downsell
            </div>
            <div className="f">
              <b>Buyer</b>Follow-up sequence starts
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="f">
              <b>Cold traffic</b>Ad click
            </div>
            <div className="f o">
              <b>Bridge page</b>Pre-frame and trust
            </div>
            <div className="f">
              <b>Primary offer</b>Warm arrival
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="f o">
              <b>Application form</b>Information your sales team needs
            </div>
            <div className="f">
              <b>Filter</b>Better-fit prospects only
            </div>
          </>
        );
      case 6:
        return (
          <>
            <div className="f">
              <b>Day 0</b>Welcome email
            </div>
            <div className="f o">
              <b>Day 1</b>SMS reminder
            </div>
            <div className="f">
              <b>Day 4</b>Reactivation
            </div>
          </>
        );
      case 7:
        return (
          <>
            <div className="f">
              <b>New lead</b>Stage 1
            </div>
            <div className="f o">
              <b>Action: booked</b>Moved to Stage 3
            </div>
            <div className="f">
              <b>Pipeline</b>Updated automatically
            </div>
          </>
        );
      case 8:
        return (
          <>
            <div className="f o">
              <b>Confirmed</b>Calendar invite sent
            </div>
            <div className="f">
              <b>Reminder</b>24h and 1h before
            </div>
            <div className="f">
              <b>No-show</b>Reschedule link sent
            </div>
          </>
        );
      case 9:
        return (
          <>
            <div className="chat">
              Hi, this is the assistant from Million Dollar Funnel™. Do you have two minutes?
            </div>
            <div className="chat me">Sure.</div>
            <div className="chat">
              What are you selling, and roughly what budget are you working with?
            </div>
            <div className="chat me">Coaching, about 5k.</div>
            <div className="chat">
              That fits. I can book you with the team on Thursday. Does 14:30 work?
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderRow = (svc: (typeof SERVICES)[number]) => {
    const on = selectedId === svc.id;
    return (
      <div
        key={svc.id}
        className={`row ${on ? "on" : ""}`}
        data-i={svc.id}
        tabIndex={0}
        onClick={() => setSelectedId(svc.id)}
        onMouseEnter={() => setSelectedId(svc.id)}
        onFocus={() => setSelectedId(svc.id)}
      >
        <span className="n">{svc.badge}</span>
        <div>
          <h3>{svc.title}</h3>
          <p>
            <span>{svc.desc}</span>
          </p>
        </div>
        <span className="ar">&#8599;</span>
        {on && <i key={`bar-${svc.id}`} className={`rbar ${paused ? "hold" : ""}`} />}
      </div>
    );
  };

  return (
    <div className="mdf-ftp mdf-svc-v2">
    <section ref={revealRef} className="sec box" id="services">
      <div className="mhead">
        <div className="rv">
          <div className="eyebrow mono">( 03 ) — What we do</div>
          <h2 className="mh2">
            <span>Traffic In.</span>
            <span className="sky">Customers Out.</span>
          </h2>
        </div>
        <div className="rv" style={{ "--rv": 2 } as React.CSSProperties}>
          <p className="lead">
            Your funnel is more than a landing page. We build the complete
            conversion journey, from the first click to the booked appointment:
            strategy, funnel development, automation, qualification and follow-up.
          </p>
          <div className="mstats">
            <span><b>{SERVICES.length}</b> services</span>
            <span><b>1</b> team</span>
            <span><b>0</b> hand-offs</span>
          </div>
        </div>
      </div>

      <div
        className="svc"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Live preview inside an MDF device frame */}
        <aside
          className="prev rv"
          style={{ "--rv": 3 } as React.CSSProperties}
          id="prev"
          data-c={selectedId % 4}
          aria-label="Service Visual Preview"
        >
          <div className="pt">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="url">mdf.build/<b>{slug(currentService.title)}</b></span>
            <span className="live">Live</span>
          </div>

          <div className="pb" id="pvb">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className={`pv ${selectedId === svc.id ? "on" : ""}`}
                data-k={svc.id}
              >
                <div className={`mg m${svc.id}`}>
                  {renderMgContent(svc.id)}
                </div>
                {renderPvContent(svc.id)}
              </div>
            ))}
          </div>

          <div className="pfoot">
            <span>{currentService.badge} / {String(SERVICES.length).padStart(2, "0")}</span>
            <span>{currentService.category === "build" ? "Build" : "Automate"}</span>
          </div>
        </aside>

        <div className="rv" style={{ "--rv": 4 } as React.CSSProperties}>
          <div className="grp">
            <div className="gt">
              <span className="gchip">Build</span>
              <span className="big">Funnel &amp; page builds</span>
              <span className="mono">{String(buildServices.length).padStart(2, "0")} formats</span>
            </div>
            <div id="g1">{buildServices.map(renderRow)}</div>
          </div>

          <div className="grp">
            <div className="gt">
              <span className="gchip">Automate</span>
              <span className="big">Automation &amp; follow-up</span>
              <span className="mono">{String(systemServices.length).padStart(2, "0")} systems</span>
            </div>
            <div id="g2">{systemServices.map(renderRow)}</div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
