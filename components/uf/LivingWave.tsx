"use client";

import { useEffect, useRef } from "react";

interface LivingWaveProps {
  className?: string;
  width?: number;
  height?: number;
  glowColor?: string;
  strokeColor?: string;
}

export default function LivingWave({
  className = "",
  width = 180,
  height = 44,
  glowColor = "#38BDF8",
  strokeColor = "#38BDF8",
}: LivingWaveProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const orbRef = useRef<SVGCircleElement>(null);
  const orbGlowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let animId: number;
    let time = 0;

    const midY = height / 2;
    const pointsCount = 42;

    const render = () => {
      time += 0.045;

      let d = "";
      let peakX = width * 0.5;
      let peakY = midY;
      let minDisplacementY = 999;

      for (let i = 0; i <= pointsCount; i++) {
        const t = i / pointsCount;
        const x = t * width;

        // Smooth Hanning/Sine window so wave tapers cleanly to flat line at ends (0 and width)
        const envelope = Math.sin(t * Math.PI);

        // Harmonic dual-sine undulation
        const wave1 = Math.sin(t * 11 + time * 3.2) * 13;
        const wave2 = Math.sin(t * 22 - time * 4.8) * 5.5;
        const wave3 = Math.cos(t * 16 + time * 2.1) * 3;

        const y = midY - envelope * (wave1 + wave2 + wave3);

        if (i === 0) {
          d += `M ${x.toFixed(2)},${y.toFixed(2)}`;
        } else {
          d += ` L ${x.toFixed(2)},${y.toFixed(2)}`;
        }

        // Track the highest crest for the floating energy orb
        if (y < minDisplacementY) {
          minDisplacementY = y;
          peakX = x;
          peakY = y;
        }
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", d);
      }
      if (glowPathRef.current) {
        glowPathRef.current.setAttribute("d", d);
      }
      if (orbRef.current && orbGlowRef.current) {
        orbRef.current.setAttribute("cx", peakX.toFixed(2));
        orbRef.current.setAttribute("cy", peakY.toFixed(2));
        orbGlowRef.current.setAttribute("cx", peakX.toFixed(2));
        orbGlowRef.current.setAttribute("cy", peakY.toFixed(2));
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, height]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          {/* Luminous Neon Gradient */}
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="1" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>

          {/* Core Electric Glow Filter */}
          <filter id="waveNeonGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="7" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Soft Glow Layer */}
        <path
          ref={glowPathRef}
          stroke={glowColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          filter="url(#waveNeonGlow)"
        />

        {/* Crisp Laser Foreground Wave */}
        <path
          ref={pathRef}
          stroke="url(#waveGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="drop-shadow(0 0 6px rgba(56,189,248,0.7))"
        />

        {/* Energy Orb Crest Pulse */}
        <circle
          ref={orbGlowRef}
          r="6"
          fill="#38BDF8"
          opacity="0.4"
          className="animate-ping"
        />
        <circle
          ref={orbRef}
          r="3"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="1.5"
          filter="drop-shadow(0 0 4px #38BDF8)"
        />
      </svg>
    </div>
  );
}
