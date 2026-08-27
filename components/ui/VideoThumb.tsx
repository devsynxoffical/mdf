"use client";

import { useState } from "react";
import PlayButton from "@/components/ui/PlayButton";
import { type PortfolioVideo, vimeoThumb } from "@/lib/videos";

/**
 * Poster card for a Vimeo creative: thumbnail (with a gradient fallback if
 * the CDN is unreachable), play affordance, and a mono duration chip.
 * The iframe only loads when the video is opened in the modal.
 */
export default function VideoThumb({
  video,
  playSize = 48,
  seed = 0,
}: {
  video: PortfolioVideo;
  playSize?: number;
  seed?: number;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <span className="absolute inset-0 block overflow-hidden">
      {/* gradient fallback / underlay */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 90% at ${25 + (seed % 3) * 25}% 20%, rgba(${
            seed % 2 ? "142,123,255" : "63,224,176"
          },0.12), transparent), #121826`,
        }}
      />
      {imgOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={vimeoThumb(video.id)}
          alt=""
          loading="lazy"
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span aria-hidden className="absolute inset-0 bg-ink/35 transition-colors duration-[250ms] group-hover:bg-ink/20" />
      <span className="absolute inset-0 flex items-center justify-center">
        <PlayButton size={playSize} />
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-bone backdrop-blur-sm">
        {video.duration}s
      </span>
    </span>
  );
}
