"use client";

/**
 * Decorative flowing contour lines, like topographic map curves.
 * tone="light" for bone sections (dark hairlines), "dark" for ink sections.
 */
export default function ContourBG({ tone = "light" }: { tone?: "light" | "dark" | "cobalt" }) {
  const stroke =
    tone === "light"
      ? "rgba(18,84,236,0.08)"
      : tone === "cobalt"
      ? "rgba(255,255,255,0.12)"
      : "rgba(56,189,248,0.06)";
  const paths = [
    "M-100,120 C250,40 480,220 760,140 C1040,60 1240,200 1540,120",
    "M-100,260 C200,180 520,340 800,250 C1080,160 1280,320 1540,240",
    "M-100,420 C260,340 460,500 780,410 C1100,320 1300,470 1540,390",
    "M-100,580 C220,500 540,650 820,560 C1100,470 1320,620 1540,540",
    "M-100,740 C240,660 500,810 790,720 C1080,630 1300,780 1540,700",
    "M-100,60 C300,140 560,-20 860,70 C1160,160 1340,20 1540,90",
    "M-100,900 C280,820 520,960 810,880 C1100,800 1320,930 1540,860",
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 960"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={stroke} strokeWidth="1.2" />
      ))}
    </svg>
  );
}
