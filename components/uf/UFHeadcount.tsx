"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContourBG from "./ContourBG";
import PixelShatter from "./PixelShatter";
import { playWindMove, stopWind } from "@/components/audio/SoundToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIRES = [
  {
    role: "Media Buyer",
    line: "Paid traffic that converts.",
    tag: "01",
    label: "Hire 01",
    skill: "Acquisition",
    // Left — peeks beside the hero
    rest: { x: "-42%", y: 8, r: -8 },
  },
  {
    role: "Funnel Builder",
    line: "Pages, tracking, integrations.",
    tag: "02",
    label: "Hire 02",
    skill: "Conversion",
    // Right — peeks beside the hero
    rest: { x: "42%", y: -4, r: 8 },
  },
  {
    role: "Automation Engineer",
    line: "Follow-up that never sleeps.",
    tag: "03",
    label: "Hire 03",
    skill: "Retention",
    // Top center — sits ABOVE the hero so it stays visible
    rest: { x: "0%", y: -56, r: -2 },
  },
];

/**
 * (03) The Headcount — three hire cards land into place,
 * then the unified “one team” card resolves the story.
 */
export default function UFHeadcount() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cursor wind — only while the pointer is actively moving over this section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      // Require real screen-space movement (ignore scroll-under-cursor events)
      if (lastTime && dist > 2) {
        const dt = Math.max(8, now - lastTime);
        const speed = Math.min(4.5, dist / dt);
        if (speed > 0.14) {
          const panNorm = (e.clientX / window.innerWidth - 0.5) * 2;
          playWindMove(speed, panNorm);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => stopWind(), 120);
    };

    const onPointerLeave = () => {
      stopWind();
      lastTime = 0;
      if (idleTimer) clearTimeout(idleTimer);
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      if (idleTimer) clearTimeout(idleTimer);
      stopWind();
    };
  }, []);

  // Landing + float + hero reveal + pointer parallax — replays on every enter
  useEffect(() => {
    const stage = stageRef.current;
    const hero = heroRef.current;
    const section = sectionRef.current;
    if (!stage || !hero || !section) return;

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-card]")
    );
    const bars = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-bar]")
    );
    const chips = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-chip]")
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      cards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      hero.style.opacity = "1";
      hero.style.transform = "none";
      return;
    }

    let floatTweens: gsap.core.Tween[] = [];
    let playTl: gsap.core.Timeline | null = null;

    const killFloats = () => {
      floatTweens.forEach((t) => t.kill());
      floatTweens = [];
    };

    const resetScene = () => {
      killFloats();
      playTl?.kill();
      playTl = null;
      gsap.set(cards, {
        yPercent: -280,
        x: 0,
        y: 0,
        rotation: (i) => [-32, 28, -18][i],
        opacity: 0,
        scale: 0.88,
        filter: "blur(6px)",
      });
      gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(hero, { opacity: 0, y: 56, scale: 0.94, x: 0, filter: "blur(8px)" });
      gsap.set(chips, { opacity: 0, y: 12 });
    };

    const startFloats = () => {
      killFloats();
      cards.forEach((card, i) => {
        floatTweens.push(
          gsap.to(card, {
            y: `+=${i === 2 ? 9 : 13}`,
            rotation: `+=${i === 1 ? 1.6 : -1.4}`,
            duration: 2.6 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );
      });
    };

    const playIntro = () => {
      resetScene();

      playTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: startFloats,
      });

      // Cards tumble in from above
      playTl.to(cards, {
        yPercent: 0,
        rotation: (i) => HIRES[i].rest.r,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "expo.out",
        stagger: { each: 0.14, from: "start" },
      });

      // Soft impact settle
      playTl.to(
        cards,
        {
          scale: 1.03,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          stagger: 0.06,
        },
        "-=0.28"
      );

      // Progress bars fill after land
      playTl.to(
        bars,
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.35"
      );

      // Hero card resolves the chaos
      playTl.to(
        hero,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
        },
        "-=0.45"
      );

      // Chips cascade in
      playTl.to(
        chips,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.35"
      );
    };

    resetScene();

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      end: "bottom 28%",
      onEnter: playIntro,
      onEnterBack: playIntro,
      onLeave: resetScene,
      onLeaveBack: resetScene,
    });

    const onMove = (e: PointerEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      cards.forEach((card, i) => {
        gsap.to(card, {
          x: nx * (12 + i * 7),
          duration: 0.5,
          ease: "power2.out",
          overwrite: false,
        });
      });

      gsap.to(hero, {
        x: nx * 8,
        duration: 0.6,
        ease: "power2.out",
        overwrite: false,
      });

      // Keep hero from fighting float — only nudge x from parallax;
      // y is owned by intro/float. Use a small additional y via CSS var? skip y.
      void ny;

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: nx * 32,
          y: ny * 20,
          duration: 0.75,
          ease: "power2.out",
          overwrite: false,
        });
      }
    };

    const onLeavePointer = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          x: 0,
          duration: 0.65,
          ease: "power3.out",
          overwrite: false,
        });
      });
      gsap.to(hero, {
        x: 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: false,
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 0,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          overwrite: false,
        });
      }
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeavePointer);

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeavePointer);
      killFloats();
      playTl?.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="uf-light relative overflow-hidden bg-gradient-to-b from-[#EBF2FC] via-[#F5F8FD] to-[#FFFFFF] py-[16vh] text-[#070B1E]"
    >
      <ContourBG tone="light" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="uf-eyebrow font-sans font-bold tracking-[0.16em] text-cobalt">
          ( 03 ) — The Headcount
        </p>

        <h2 className="mt-4 leading-[0.92] text-[#070B1E]">
          <span className="block font-sans text-[clamp(42px,7.5vw,98px)] font-black uppercase tracking-[-0.04em]">
            Who It Usually
          </span>
          <span className="block font-sans text-[clamp(42px,7.5vw,98px)] font-black uppercase tracking-[-0.04em] text-cobalt/90">
            Takes.
          </span>
        </h2>

        <p className="mt-6 max-w-[46ch] font-sans text-[17px] font-normal leading-[1.55] text-slate-600 sm:text-[19px]">
          Building this takes{" "}
          <span className="font-semibold text-[#070B1E]">three hires</span>.
          Watch them land.
        </p>

        {/* Stage */}
        <div ref={stageRef} className="relative mx-auto mt-20 max-w-[1040px]">
          {/* Ambient glow that tracks pointer */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-1/2 top-[48%] h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(18,84,236,0.1)_40%,transparent_70%)] blur-2xl"
            aria-hidden
          />

          {/* Scattered hire cards — fan around the hero so all three stay readable */}
          <div className="relative h-[360px] w-full pt-16 sm:h-[400px] sm:pt-20">
            {HIRES.map((h, i) => (
              <article
                key={h.role}
                data-card
                className="group absolute left-1/2 top-16 w-[240px] -translate-x-1/2 will-change-transform sm:top-20 sm:w-[280px]"
                style={{
                  marginLeft: h.rest.x,
                  marginTop: h.rest.y,
                  zIndex: i === 2 ? 4 : i + 1,
                  opacity: 0,
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#D7E3F5] bg-white/95 p-5 shadow-[0_18px_50px_rgba(18,84,236,0.1),0_2px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-md transition-[box-shadow,border-color] duration-300 group-hover:border-cobalt/30 group-hover:shadow-[0_24px_60px_rgba(18,84,236,0.18)] sm:p-6">
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cobalt/50 to-transparent opacity-70" />

                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cobalt/15 bg-[#F0F5FF] px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cobalt text-[9px] text-white">
                        {h.tag}
                      </span>
                      {h.label}
                    </span>
                    <span className="rounded-md bg-slate-50 px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      {h.skill}
                    </span>
                  </div>

                  <h3 className="mt-4 font-sans text-[18px] font-extrabold tracking-tight text-[#070B1E] sm:text-[21px]">
                    {h.role}
                  </h3>
                  <p className="mt-1.5 font-sans text-[13px] leading-snug text-slate-500">
                    {h.line}
                  </p>

                  <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-slate-100">
                    <div
                      data-bar
                      className="h-full origin-left rounded-full bg-gradient-to-r from-cobalt to-sky"
                      style={{ width: `${28 + i * 18}%`, transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Central resolution card — overlaps lower half only */}
          <div
            ref={heroRef}
            className="relative z-20 mx-auto -mt-24 max-w-[680px] sm:-mt-28"
            style={{ opacity: 0 }}
          >
            {/* Soft outer glow ring */}
            <div
              className="pointer-events-none absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-sky/50 via-cobalt/30 to-transparent opacity-80 blur-[1px]"
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#020926] p-8 text-white shadow-[0_40px_80px_rgba(2,9,38,0.5)] sm:p-11">
              {/* Inner sheen */}
              <div
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2)_0%,transparent_70%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(18,84,236,0.25)_0%,transparent_70%)]"
                aria-hidden
              />

              <p className="relative z-[1] font-sans text-[13px] leading-relaxed text-slate-400 sm:text-[14px]">
                Three invoices. Three timelines. Everyone pointing at someone
                else&apos;s step. Or —
              </p>

              <h3 className="relative z-[1] mt-5 font-sans text-[clamp(28px,4.4vw,50px)] font-black leading-[1.08] tracking-[-0.03em] text-white">
                One team holds{" "}
                <span className="bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC] bg-clip-text text-transparent">
                  the whole path.
                </span>
              </h3>

              {/* Merged role chips */}
              <div className="relative z-[1] mt-6 flex flex-wrap items-center gap-2">
                {["Architecture", "Media Buying", "AI Automation"].map(
                  (label, i) => (
                    <span
                      key={label}
                      data-chip
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200/90"
                      style={{ opacity: 0 }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background:
                            i === 0
                              ? "#38BDF8"
                              : i === 1
                                ? "#60A5FA"
                                : "#A78BFA",
                        }}
                      />
                      {label}
                    </span>
                  )
                )}
              </div>

              <p className="relative z-[1] mt-7 border-t border-white/10 pt-5 font-sans text-[13.5px] leading-relaxed text-slate-300 sm:text-[14.5px]">
                One timeline. One invoice. One person accountable for the same
                revenue number you&apos;re looking at.
              </p>

              {/* Cursor pixel shatter — Unick-style */}
              <PixelShatter className="z-[2]" />
            </div>
          </div>
        </div>

        <p className="mt-14 text-center font-sans text-[13.5px] font-medium text-slate-600">
          Move faster with{" "}
          <span className="font-bold text-cobalt">
            one dedicated partner · zero finger-pointing
          </span>
        </p>
      </div>
    </section>
  );
}
