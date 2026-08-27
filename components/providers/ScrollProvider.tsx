"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FunnelEvents = {
  /** Registered by the 3D scene; fires a brass emissive pulse through the lattice. */
  pulseLattice: () => void;
  /** Registered by the 3D scene; pulses a specific stage ring (0–5). */
  pulseRing: (index: number) => void;
};

type ScrollContextValue = {
  /** Whole-page scroll progress 0→1, updated every frame. Read inside rAF/useFrame. */
  progressRef: MutableRefObject<number>;
  /** Index of the active pillar stage (0–5), or -1 outside the pillars section. */
  activeStage: number;
  setActiveStage: (i: number) => void;
  /** Event sink registered by the canvas so 2D sections can trigger 3D moments. */
  funnelEvents: MutableRefObject<FunnelEvents>;
  reducedMotion: boolean;
  isMobile: boolean;
  /** True once the client has determined mobile/reduced-motion state. */
  ready: boolean;
};

const noopEvents: FunnelEvents = { pulseLattice: () => {}, pulseRing: () => {} };

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollState() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollState must be used inside ScrollProvider");
  return ctx;
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const progressRef = useRef(0);
  const funnelEvents = useRef<FunnelEvents>({ ...noopEvents });
  const [activeStage, setActiveStage] = useState(-1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const lowMemory =
      typeof (navigator as any).deviceMemory === "number" &&
      (navigator as any).deviceMemory < 4;

    const update = () => {
      setReducedMotion(mqMotion.matches);
      setIsMobile(mqMobile.matches || lowMemory);
    };
    update();
    setReady(true);
    mqMotion.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqMotion.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      // Instant scroll; still track raw progress for readouts.
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({ lerp: 0.08 });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({
      progressRef,
      activeStage,
      setActiveStage,
      funnelEvents,
      reducedMotion,
      isMobile,
      ready,
    }),
    [activeStage, reducedMotion, isMobile, ready]
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
