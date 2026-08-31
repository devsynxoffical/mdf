"use client";

type Shot = { src: string; alt?: string; label?: string; caption?: string };

type Props = {
  items: Shot[];
  /** mosaic | strip | duo | featured */
  layout?: "mosaic" | "strip" | "duo" | "featured";
  className?: string;
  tone?: "dark" | "light";
};

/**
 * Reusable photo layouts — images use object-contain so the full frame shows in the box.
 */
export default function PagePhotos({
  items,
  layout = "mosaic",
  className = "",
  tone = "dark",
}: Props) {
  if (!items.length) return null;

  const frame =
    tone === "light"
      ? "border-blue-200/80 bg-[#E8EEF8] shadow-[0_20px_50px_rgba(18,84,236,0.08)]"
      : "border-white/12 bg-[#0A1228]";

  const imgCls = "h-full w-full object-contain object-center";

  if (layout === "strip") {
    return (
      <div className={`flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}>
        {items.map((item) => (
          <figure
            key={item.src}
            className={`relative h-40 w-[220px] shrink-0 overflow-hidden rounded-2xl border sm:h-48 sm:w-[280px] ${frame}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || item.label || ""}
              className={imgCls}
              loading="lazy"
              decoding="async"
            />
            {item.label && (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                  {item.label}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  if (layout === "duo") {
    const [a, b] = items;
    return (
      <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
        {[a, b].filter(Boolean).map((item) => (
          <figure
            key={item.src}
            className={`relative aspect-[4/3] overflow-hidden rounded-[24px] border ${frame}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || ""}
              className={imgCls}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
    );
  }

  if (layout === "featured") {
    const [hero, ...rest] = items;
    return (
      <div className={`grid gap-3 md:grid-cols-[1.4fr_1fr] md:gap-4 ${className}`}>
        <figure className={`relative aspect-[16/11] overflow-hidden rounded-[24px] border md:aspect-auto md:min-h-[360px] ${frame}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.src}
            alt={hero.alt || ""}
            className={imgCls}
            loading="eager"
            decoding="async"
          />
          {(hero.label || hero.caption) && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 pb-5 pt-16">
              {hero.label && (
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
                  {hero.label}
                </p>
              )}
              {hero.caption && (
                <p className="mt-1 font-sans text-[16px] font-semibold text-white">{hero.caption}</p>
              )}
            </figcaption>
          )}
        </figure>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:grid-rows-2">
          {rest.slice(0, 2).map((item) => (
            <figure
              key={item.src}
              className={`relative aspect-[4/3] overflow-hidden rounded-[20px] border md:aspect-auto md:min-h-0 ${frame}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt || ""}
                className={imgCls}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    );
  }

  // mosaic default
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${className}`}>
      {items.map((item, i) => (
        <figure
          key={item.src}
          className={`relative overflow-hidden rounded-[20px] border ${frame} ${
            i === 0 ? "col-span-2 aspect-[21/9] sm:col-span-1 sm:aspect-[4/5] sm:row-span-2" : "aspect-[4/3]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt || item.label || ""}
            className={`${imgCls} transition duration-500 hover:scale-[1.02]`}
            loading="lazy"
            decoding="async"
          />
          {item.label && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                {item.label}
              </span>
              {item.caption && (
                <p className="mt-1 font-sans text-[12px] text-white/80">{item.caption}</p>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
