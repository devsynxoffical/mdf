"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Mask reveal: the child wipes up from a clipped edge when it enters view.
 * `as` keeps the semantics right (span inside headings, div elsewhere).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t = setTimeout(() => el.classList.add("in"), delay);
        return () => clearTimeout(t);
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={`mask-up ${className}`}>
      <span>{children}</span>
    </Comp>
  );
}
