"use client";

export default function PlayButton({ size = 72 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="play-ring absolute inset-0 rounded-full border border-brass" />
      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-brass">
        <svg
          width={size * 0.28}
          height={size * 0.28}
          viewBox="0 0 20 20"
          fill="none"
          style={{ marginLeft: size * 0.04 }}
        >
          <path d="M4 2.5v15l13-7.5L4 2.5z" fill="#07090E" />
        </svg>
      </span>
    </span>
  );
}
