"use client";

import { useEffect } from "react";

/**
 * StartScreen: ensures boot classes are cleanly cleared with zero extra DOM overhead.
 */
export default function StartScreen() {
  useEffect(() => {
    try {
      document.documentElement.classList.remove("mdf-booting");
      document.body.style.overflow = "";
      sessionStorage.setItem("mdf-intro-seen", "1");
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
