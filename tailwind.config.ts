import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07090E",
        slate2: "#121826",
        // Vesper palette: mint is the primary accent (money, conversion,
        // CTAs); violet is the secondary (live/system states, processing).
        // Legacy token names kept so existing classes keep working.
        brass: "#3FE0B0",
        "brass-lo": "#6B5BD6",
        signal: "#8E7BFF",
        mint: "#3FE0B0",
        violet: "#8E7BFF",
        "violet-lo": "#4A3F8C",
        bone: "#F2EFE8",
        mute: "#7C879B",
      },
      fontFamily: {
        display: ["General Sans", "system-ui", "sans-serif"],
        body: ["Satoshi", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // strict type scale: 12 / 14 / 16 / 20 / 28 / 40 / 64 / 96 / 140
        s12: "12px",
        s14: "14px",
        s16: "16px",
        s20: "20px",
        s28: "28px",
        s40: "40px",
        s64: "64px",
        s96: "96px",
        s140: "140px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
        display: "-0.03em",
      },
      transitionTimingFunction: {
        rise: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
