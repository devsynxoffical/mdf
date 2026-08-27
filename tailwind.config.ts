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
        ink: "#0A0908",
        slate2: "#1A1712",
        // Vesper palette: mint is the primary accent (money, conversion,
        // CTAs); violet is the secondary (live/system states, processing).
        // Legacy token names kept so existing classes keep working.
        brass: "#D9A441",
        "brass-lo": "#8A7440",
        signal: "#C0B49A",
        mint: "#D9A441",
        "mint-deep": "#8C6420",
        cream: "#F0EBE2",
        inkdeep: "#0D0C0A",
        violet: "#C0B49A",
        "violet-lo": "#6E5A2E",
        bone: "#F0EBE2",
        mute: "#8F887C",
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
