"use client";

/**
 * Inline illustrations for the six pillars — brass-lo wireframe with signal
 * accents, drawn as animated SVG line work in the same visual language as the
 * 3D lattice. (These are the documented lightweight fallback style, used on
 * all viewports to keep the shared canvas budget for the funnel itself.)
 */

const STROKE = "#8A7440";
const ACCENT = "#C0B49A";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 220 220"
      width="220"
      height="220"
      fill="none"
      className="max-w-full"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/* 01 — a flat plane folding into an intake shape */
export function MiniIntake() {
  return (
    <Frame>
      <g stroke={STROKE} strokeWidth="1">
        <path d="M30 60 L190 60 L160 110 L60 110 Z" />
        <path d="M60 110 L160 110 L135 150 L85 150 Z" />
        <path d="M85 150 L135 150 L118 180 L102 180 Z" />
        <path d="M30 60 L60 110 M190 60 L160 110" opacity="0.5" />
      </g>
      <circle cx="110" cy="185" r="3" fill={ACCENT}>
        <animate attributeName="cy" values="50;185;185" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </Frame>
  );
}

/* 02 — a shield lattice assembling from fragments */
export function MiniShield() {
  return (
    <Frame>
      <g stroke={STROKE} strokeWidth="1">
        <path d="M110 35 L170 60 V115 C170 150 145 175 110 190 C75 175 50 150 50 115 V60 Z" />
        <path d="M110 35 V190 M50 60 L170 60 M50 88 H170 M55 116 H165 M65 144 H155" opacity="0.5" />
      </g>
      <path
        d="M88 112 L104 128 L136 92"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="70"
        strokeDashoffset="70"
      >
        <animate attributeName="stroke-dashoffset" values="70;0;0;70" dur="3s" repeatCount="indefinite" />
      </path>
    </Frame>
  );
}

/* 03 — three nodes firing pulses between each other */
export function MiniNodes() {
  return (
    <Frame>
      <g stroke={STROKE} strokeWidth="1">
        <line x1="60" y1="70" x2="160" y2="70" />
        <line x1="160" y1="70" x2="110" y2="160" />
        <line x1="110" y1="160" x2="60" y2="70" />
        <circle cx="60" cy="70" r="12" />
        <circle cx="160" cy="70" r="12" />
        <circle cx="110" cy="160" r="12" />
      </g>
      {[
        { from: [60, 70], to: [160, 70], begin: "0s" },
        { from: [160, 70], to: [110, 160], begin: "0.8s" },
        { from: [110, 160], to: [60, 70], begin: "1.6s" },
      ].map((p, i) => (
        <circle key={i} r="3" fill={ACCENT}>
          <animate
            attributeName="cx"
            values={`${p.from[0]};${p.to[0]}`}
            dur="0.8s"
            begin={p.begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values={`${p.from[1]};${p.to[1]}`}
            dur="0.8s"
            begin={p.begin}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </Frame>
  );
}

/* 04 — two offset waveforms interleaving */
export function MiniWaves() {
  const wave = (offset: number) => {
    let d = `M10 ${110 + offset}`;
    for (let x = 10; x <= 210; x += 10) {
      const y = 110 + offset + Math.sin((x / 200) * Math.PI * 4 + offset) * 28;
      d += ` L${x} ${y}`;
    }
    return d;
  };
  return (
    <Frame>
      <path d={wave(0)} stroke={STROKE} strokeWidth="1" />
      <path d={wave(2.2)} stroke={ACCENT} strokeWidth="1" opacity="0.8">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
      </path>
      <g stroke={STROKE} opacity="0.3">
        <line x1="10" y1="110" x2="210" y2="110" strokeDasharray="2 4" />
      </g>
    </Frame>
  );
}

/* 05 — a sound wave collapsing into a dot then expanding */
export function MiniVoicemail() {
  return (
    <Frame>
      {[18, 36, 54, 72].map((r, i) => (
        <circle key={i} cx="110" cy="110" r={r} stroke={STROKE} strokeWidth="1" fill="none">
          <animate
            attributeName="r"
            values={`${r};4;${r}`}
            dur="3s"
            begin={`${i * 0.12}s`}
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="3s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="110" cy="110" r="4" fill={ACCENT} />
    </Frame>
  );
}

/* 06 — a grid of cells filling row by row with signal */
export function MiniCRM() {
  const cells: { x: number; y: number; i: number }[] = [];
  let i = 0;
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++) cells.push({ x: 45 + c * 28, y: 45 + r * 28, i: i++ });
  return (
    <Frame>
      {cells.map((c) => (
        <g key={c.i}>
          <rect x={c.x} y={c.y} width="22" height="22" rx="3" stroke={STROKE} strokeWidth="1" fill="none" />
          <rect x={c.x + 4} y={c.y + 4} width="14" height="14" rx="2" fill={ACCENT} opacity="0">
            <animate
              attributeName="opacity"
              values="0;0.85;0.85;0"
              keyTimes="0;0.15;0.8;1"
              dur="5s"
              begin={`${c.i * 0.12}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
    </Frame>
  );
}

export const PILLAR_MINIS = [
  MiniIntake,
  MiniShield,
  MiniNodes,
  MiniWaves,
  MiniVoicemail,
  MiniCRM,
];
