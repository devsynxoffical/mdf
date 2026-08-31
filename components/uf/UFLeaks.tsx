"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Chassis = {
  body: string;
  bodyEdge: string;
  lid: string;
  lidEdge: string;
  keyboard: string;
};

type Stage = {
  num: string;
  title: string;
  body: string;
  accent: string;
  screen: string;
  chassis: Chassis;
};

const CHASSIS = {
  rose: {
    body: "linear-gradient(180deg, #f0d0c2 0%, #d9a894 100%)",
    bodyEdge: "#c99482",
    lid: "linear-gradient(180deg, #f6ddd2 0%, #e4b7a4 100%)",
    lidEdge: "#d4a08e",
    keyboard: "#c9a090",
  },
  midnight: {
    body: "linear-gradient(180deg, #2a3850 0%, #121a2a 100%)",
    bodyEdge: "#080c14",
    lid: "linear-gradient(180deg, #33425c 0%, #1a2438 100%)",
    lidEdge: "#10182a",
    keyboard: "#141c2c",
  },
  silver: {
    body: "linear-gradient(180deg, #e8eaee 0%, #b4b9c2 100%)",
    bodyEdge: "#959ba4",
    lid: "linear-gradient(180deg, #f2f3f5 0%, #c5cad2 100%)",
    lidEdge: "#b0b5bd",
    keyboard: "#b6bac2",
  },
  skyblue: {
    body: "linear-gradient(180deg, #7eb8d6 0%, #3d7fa8 100%)",
    bodyEdge: "#2c6688",
    lid: "linear-gradient(180deg, #9ecce8 0%, #5a9ec4 100%)",
    lidEdge: "#4a8eb4",
    keyboard: "#4a8eb4",
  },
} as const;

const STAGES: Stage[] = [
  {
    num: "01",
    title: "Slow first response.",
    body: "An hour late is a lead lost. Dashboards mean nothing if nobody answers in the first sixty seconds.",
    accent: "#E11D8F",
    screen: "/images/showreel/shot_05_kanban.jpg",
    chassis: CHASSIS.rose,
  },
  {
    num: "02",
    title: "Message without a path.",
    body: "Pages that impress, then lead nowhere. Beautiful brands still leak when the next click is missing.",
    accent: "#7C3AED",
    screen: "/images/shots/shot1.webp",
    chassis: CHASSIS.midnight,
  },
  {
    num: "03",
    title: "Follow-up that gives up.",
    body: "Two touches, then silence. The stack stops mid-sequence and the deal evaporates.",
    accent: "#0EA5E9",
    screen: "/images/showreel/shot_16_crm_nodes.png",
    chassis: CHASSIS.silver,
  },
  {
    num: "04",
    title: "A pipeline nobody tracks.",
    body: "No numbers, no levers. Without telemetry, every campaign is a guess.",
    accent: "#1254EC",
    screen: "/images/showreel/shot_10_roas_curve.png",
    chassis: CHASSIS.skyblue,
  },
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function stackOffset(progress: number, index: number, total: number) {
  return progress * (total - 1) - index;
}

/** Flat laptop mockup — screen always faces camera (no 3D hinge). */
function LaptopCard({
  stage,
  cardRef,
  style,
}: {
  stage: Stage;
  cardRef: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
}) {
  const c = stage.chassis;
  return (
    <div
      ref={cardRef}
      className="uf-leak-card absolute inset-x-0 top-0 flex justify-center will-change-transform"
      style={style}
    >
      <div className="relative w-full max-w-[540px] px-2">
        <div className="pointer-events-none absolute -bottom-3 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-[#061335]/[0.16] blur-xl" />

        {/* Lid + screen */}
        <div
          className="relative w-full overflow-hidden rounded-[12px] border-[3px] shadow-[0_20px_50px_rgba(6,19,53,0.15)]"
          style={{
            background: c.lid,
            borderColor: c.lidEdge,
          }}
        >
          {/* Camera notch bar */}
          <div
            className="relative flex h-4 w-full items-center justify-center"
            style={{ background: c.lid }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
          </div>

          {/* THE SCREEN — explicit block img so it always has height */}
          <div className="relative mx-[10px] mb-[10px] overflow-hidden rounded-[6px] bg-[#0a0e14]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stage.screen}
              alt=""
              className="block h-auto w-full"
              draggable={false}
            />
          </div>
        </div>

        {/* Hinge */}
        <div
          className="mx-auto h-[6px] w-[92%] rounded-b-[2px]"
          style={{
            background: `linear-gradient(180deg, ${c.lidEdge}, ${c.bodyEdge})`,
          }}
        />

        {/* Base */}
        <div
          className="relative mx-auto h-11 w-[98%] overflow-hidden rounded-b-[14px] border border-t-0 shadow-[0_16px_30px_rgba(6,19,53,0.12)]"
          style={{
            background: c.body,
            borderColor: c.bodyEdge,
          }}
        >
          <div
            className="absolute inset-x-[12%] top-[20%] h-[30%] rounded-[2px]"
            style={{ background: c.keyboard }}
          />
          <div className="absolute bottom-[14%] left-1/2 h-[28%] w-[22%] -translate-x-1/2 rounded-[3px] border border-black/10 bg-black/[0.06]" />
        </div>
      </div>
    </div>
  );
}

/**
 * (02) Where funnels leak — Apple-style stacked laptops:
 * current laptop exits up; next rises from below with a new screen.
 */
export default function UFLeaks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    if (isMobile || reduced) {
      const list = mobileListRef.current;
      if (!list) return;
      const items = list.querySelectorAll<HTMLElement>("li");
      items.forEach((el) => {
        el.style.opacity = "1";
      });
      if (reduced) return;
      const tween = gsap.fromTo(
        items,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.55,
          scrollTrigger: {
            trigger: list,
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.4,
          },
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    const total = STAGES.length;

    const apply = (progress: number) => {
      const p = clamp(progress, 0, 1);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const o = stackOffset(p, i, total);
        // 0 = center, -1 = waiting below, +1 = exited above
        // Positive Y = down. So upcoming (negative o) must move down.
        const yvh = 8 - o * 72;
        const scale = 1 - Math.abs(o) * 0.05;

        let opacity = 1;
        if (o <= -1) opacity = 0;
        else if (o >= 1.1) opacity = 0;
        else if (o < 0) opacity = 0.35 + 0.65 * smoothstep(1 + o); // peek → full
        else opacity = clamp(1 - (o - 0.2) * 1.5, 0, 1);

        card.style.opacity = String(opacity);
        card.style.zIndex = String(Math.round(30 - Math.abs(o) * 10));
        card.style.transform = `translate3d(0, ${yvh}vh, 0) scale(${scale})`;
      });

      const pos = p * (total - 1);
      copyRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(pos - i);
        const opacity = clamp(1 - dist * 1.05, 0, 1);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(pos - i) * -18}px)`;
      });

      if (railRef.current) railRef.current.style.height = `${p * 100}%`;
    };

    apply(0);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=380%",
      pin: true,
      scrub: 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => apply(self.progress),
    });

    const imgs = section.querySelectorAll("img");
    let pending = imgs.length;
    const ready = () => {
      pending -= 1;
      if (pending <= 0) ScrollTrigger.refresh();
    };
    imgs.forEach((img) => {
      if (img.complete) ready();
      else {
        img.addEventListener("load", ready, { once: true });
        img.addEventListener("error", ready, { once: true });
      }
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="leaks"
      ref={sectionRef}
      className="uf-leaks relative overflow-hidden bg-gradient-to-b from-white via-[#F7F9FC] to-[#EBF2FC] text-[#070B1E]"
    >
      {/* Desktop */}
      <div className="relative mx-auto hidden h-screen max-w-[1400px] grid-cols-[minmax(280px,0.9fr)_minmax(340px,1.15fr)] items-center gap-8 px-6 md:grid md:px-12 lg:px-16">
        <div className="relative z-10 flex h-full max-w-[420px] flex-col justify-center py-16">
          <p className="uf-eyebrow tracking-[0.16em] text-[#38BDF8]">
            ( 02 ) — The Leaks
          </p>
          <h2 className="mt-4 font-sans text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.05] tracking-tight">
            Where Funnels{" "}
            <span className="bg-gradient-to-r from-[#1254EC] to-[#38BDF8] bg-clip-text text-transparent">
              Leak.
            </span>
          </h2>

          <div className="relative mt-10 min-h-[230px]">
            <div className="absolute -left-6 top-0 hidden h-[210px] w-[2px] overflow-hidden rounded-full bg-black/[0.06] lg:block">
              <div
                ref={railRef}
                className="w-full origin-top rounded-full bg-gradient-to-b from-[#E11D8F] via-[#7C3AED] to-[#1254EC]"
                style={{ height: "0%" }}
              />
            </div>

            {STAGES.map((stage, i) => (
              <div
                key={stage.num}
                ref={(el) => {
                  copyRefs.current[i] = el;
                }}
                className="absolute inset-x-0 top-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p
                  className="font-sans text-[12px] font-bold tracking-[0.14em]"
                  style={{ color: stage.accent }}
                >
                  {stage.num}
                </p>
                <h3
                  className="mt-2 font-sans text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.08] tracking-[-0.02em]"
                  style={{ color: stage.accent }}
                >
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-[38ch] font-sans text-[16px] leading-[1.55] text-[#3A4660]">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stacked laptops — no 3D, screens always visible */}
        <div className="relative flex h-full items-center justify-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,rgba(124,58,237,0.06)_45%,transparent_70%)] blur-2xl" />

          <div className="relative h-[min(78vh,620px)] w-full max-w-[560px]">
            {STAGES.map((stage, i) => (
              <LaptopCard
                key={stage.num}
                stage={stage}
                style={{
                  // First paint: hero + next peeking underneath
                  transform:
                    i === 0
                      ? "translate3d(0, 8vh, 0) scale(1)"
                      : `translate3d(0, ${8 + i * 72}vh, 0) scale(${1 - i * 0.05})`,
                  opacity: i === 0 ? 1 : i === 1 ? 0.55 : 0,
                  zIndex: 30 - i,
                }}
                cardRef={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-auto max-w-[900px] px-6 py-[12vh] md:hidden">
        <p className="uf-eyebrow tracking-[0.16em] text-[#38BDF8]">
          ( 02 ) — The Leaks
        </p>
        <h2 className="mt-5 leading-[0.96]">
          <span className="block font-sans text-[clamp(40px,10vw,64px)] font-extrabold tracking-tight">
            Where Funnels
          </span>
          <span className="block font-sans text-[clamp(34px,8vw,52px)] font-bold tracking-tight text-[#1254EC]">
            Leak.
          </span>
        </h2>

        <div className="mx-auto mt-10 w-full max-w-[380px]">
          <div
            className="overflow-hidden rounded-[12px] border-[3px]"
            style={{
              background: STAGES[0].chassis.lid,
              borderColor: STAGES[0].chassis.lidEdge,
            }}
          >
            <div className="flex h-3 items-center justify-center">
              <span className="h-1 w-1 rounded-full bg-black/30" />
            </div>
            <div className="mx-2 mb-2 overflow-hidden rounded-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={STAGES[0].screen}
                alt=""
                className="block h-auto w-full"
              />
            </div>
          </div>
          <div
            className="mx-auto h-9 w-[98%] rounded-b-[12px] border border-t-0"
            style={{
              background: STAGES[0].chassis.body,
              borderColor: STAGES[0].chassis.bodyEdge,
            }}
          />
        </div>

        <ol ref={mobileListRef} className="mt-12">
          {STAGES.map((l) => (
            <li
              key={l.num}
              className="grid grid-cols-[48px_1fr] gap-4 border-t border-black/[0.08] py-7"
              style={{ opacity: 0.2 }}
            >
              <span
                className="pt-1 font-sans text-[13px] font-bold"
                style={{ color: l.accent }}
              >
                {l.num}
              </span>
              <div>
                <h3
                  className="font-sans text-[20px] font-bold tracking-tight"
                  style={{ color: l.accent }}
                >
                  {l.title}
                </h3>
                <p className="mt-2 max-w-[52ch] font-sans text-[15px] leading-[1.55] text-[#3A4660]">
                  {l.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
