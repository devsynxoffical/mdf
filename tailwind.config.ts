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
        ink: "#061335",
        slate2: "#0B2052",
        navy: "#061335",
        "navy-dark": "#020926",
        "navy-rich": "#072151",
        "navy-surface": "#0B2256",
        cobalt: "#1254EC",
        "cobalt-deep": "#0B3BB3",
        sky: "#38BDF8",
        ice: "#EBF2FC",
        // Halo Lab mapped tokens
        brass: "#1254EC",
        "brass-lo": "#0B3BB3",
        signal: "#60A5FA",
        mint: "#38BDF8",
        "mint-deep": "#1254EC",
        cream: "#0B2256",
        inkdeep: "#061335",
        violet: "#6366F1",
        "violet-lo": "#4F46E5",
        bone: "#FFFFFF",
        mute: "#8E9EC6",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        anton: ["Anton", "Plus Jakarta Sans", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        editorial: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        condensed: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
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
