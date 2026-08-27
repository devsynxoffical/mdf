"use client";

/**
 * A stylised mock of a funnel landing page, drawn in SVG — placeholder for
 * real funnel screenshots. Each variant shifts the layout slightly so the
 * row reads as nine distinct builds.
 */
export default function GalleryCard({ seed, label }: { seed: number; label: string }) {
  const heroH = 60 + (seed % 3) * 14;
  const accent = seed % 2 === 0 ? "#E0A340" : "#3FE0B0";
  return (
    <svg viewBox="0 0 300 400" className="h-full w-full" aria-hidden>
      <rect width="300" height="400" rx="12" fill="#121826" />
      <rect width="300" height="400" rx="12" fill="none" stroke="rgba(242,239,232,0.08)" />
      {/* nav */}
      <rect x="20" y="18" width="52" height="8" rx="4" fill="#7C879B" opacity="0.7" />
      <rect x="200" y="16" width="80" height="12" rx="6" fill={accent} opacity="0.9" />
      {/* hero */}
      <rect x="20" y="48" width="180" height="14" rx="4" fill="#F2EFE8" opacity="0.85" />
      <rect x="20" y="70" width={140 + (seed % 4) * 20} height="14" rx="4" fill={accent} />
      <rect x="20" y="94" width="200" height="6" rx="3" fill="#7C879B" opacity="0.5" />
      <rect x="20" y="106" width="170" height="6" rx="3" fill="#7C879B" opacity="0.5" />
      <rect x="20" y="128" width="96" height="20" rx="10" fill={accent} />
      {/* hero media */}
      <rect x="20" y={168} width="260" height={heroH} rx="8" fill="#07090E" />
      <circle cx="150" cy={168 + heroH / 2} r="14" fill={accent} opacity="0.9" />
      {/* stats row */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 90} y={250 + (seed % 3) * 8} width="80" height="34" rx="6" fill="#07090E" />
          <rect x={30 + i * 90} y={260 + (seed % 3) * 8} width="36" height="8" rx="3" fill={accent} opacity="0.85" />
          <rect x={30 + i * 90} y={272 + (seed % 3) * 8} width="52" height="4" rx="2" fill="#7C879B" opacity="0.5" />
        </g>
      ))}
      {/* form */}
      <rect x="20" y="310" width="260" height="60" rx="8" fill="#0B0F17" />
      <rect x="32" y="322" width="150" height="10" rx="4" fill="#7C879B" opacity="0.4" />
      <rect x="32" y="340" width="110" height="16" rx="8" fill={accent} />
      <text
        x="270"
        y="392"
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#7C879B"
      >
        {label}
      </text>
    </svg>
  );
}
