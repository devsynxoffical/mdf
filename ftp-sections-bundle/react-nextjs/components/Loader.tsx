"use client";

import { useEffect, useRef, useState } from "react";
import { LOADER_WORDS } from "../data/siteContent";

export default function Loader() {
  const [wordIndex, setWordIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const pixRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsRemoved(true);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= LOADER_WORDS.length) {
        clearInterval(interval);
        setPercent(100);

        setTimeout(() => {
          // Trigger Pixel Dissolve Transition Matrix
          const P = pixRef.current;
          const L = loaderRef.current;
          if (!P || !L) {
            setIsRemoved(true);
            return;
          }

          const c = window.innerWidth < 700 ? 8 : 16;
          const rws = Math.max(
            4,
            Math.round((c * window.innerHeight) / window.innerWidth)
          );
          P.style.setProperty("--c", `${c}`);
          P.style.setProperty("--rws", `${rws}`);

          const tints = [
            "#ff5a1f",
            "#ff7a45",
            "#ff9a6e",
            "#ffb08a",
            "#ff5a1f",
            "#ff6b35",
          ];

          let tilesHtml = "";
          for (let r = 0; r < rws; r++) {
            for (let k = 0; k < c; k++) {
              const d = (r / rws) * 0.55 + Math.random() * 0.6;
              const bg = tints[Math.floor(Math.random() * tints.length)];
              tilesHtml += `<i style="--d:${d.toFixed(
                2
              )}s;background:${bg}"></i>`;
            }
          }

          P.innerHTML = tilesHtml;
          P.hidden = false;
          L.style.opacity = "0";
          L.style.transition = "opacity .25s";

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              P.classList.add("go");
            });
          });

          setTimeout(() => {
            setIsRemoved(true);
          }, 1700);
        }, 250);

        return;
      }

      setWordIndex(i);
      const pct = Math.round((i / (LOADER_WORDS.length - 1)) * 100);
      setPercent(pct);
    }, 260);

    return () => clearInterval(interval);
  }, []);

  if (isRemoved) return null;

  return (
    <>
      <div id="pix" ref={pixRef} aria-hidden="true" hidden />
      <div id="loader" ref={loaderRef} aria-hidden="true">
        <div className="wd" id="lw">
          {LOADER_WORDS[wordIndex]}
        </div>
        <div className="l">Funnels That Print &nbsp;/&nbsp; Loading</div>
        <div className="n" id="ln">
          {percent}%
        </div>
        <div className="bar">
          <i id="lb" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </>
  );
}
