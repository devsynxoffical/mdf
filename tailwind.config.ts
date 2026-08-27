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
        brass: "#E0A340",
        "brass-lo": "#8A6224",
        signal: "#3FE0B0",
        bone: "#F2EFE8",
        mute: "#7C879B",
      },
      fontFamily: {
        display: ["Clash Display", "system-ui", "sans-serif"],
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
