import { stats, platforms } from "@/lib/content";

/**
 * Frame 34's poolside band. The photograph keeps its 1512×1328 aspect ratio and
 * the stats card is positioned in percentages of that box, so the two stay
 * locked together at any width.
 */
export function Poolside() {
  return (
    <section className="shell relative aspect-[1512/1328] overflow-hidden">
      <img
        loading="lazy"
        decoding="async"
        src="/brand/poolside-band.webp"
        alt="A Leona host carrying drinks past the pool at a managed villa"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute top-[19.43%] left-[66.4%] flex h-[66.27%] w-[30.09%] flex-col justify-center rounded-[1.5rem] border-[0.19rem] border-gold bg-forest px-[3.875rem]">
        {stats.map((s) => (
          <div key={s.label} className="mb-[3.5rem] last:mb-0">
            <div className="text-[4.5rem] leading-[1.05] font-extrabold text-gold">
              {s.value}
            </div>
            <div className="mt-[0.25rem] text-[1.375rem] leading-[1.28] font-bold text-gold">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Green band, white knockout logos. */
export function PlatformBar() {
  return (
    <section className="bg-forest">
      <div className="shell flex h-[5rem] items-center justify-between px-[4.875rem] max-md:h-auto max-md:flex-wrap max-md:justify-center max-md:gap-6 max-md:px-5 max-md:py-6">
        <div className="flex items-center gap-[2.625rem] max-md:gap-6">
          <img
            loading="lazy"
            decoding="async"
            src={platforms[0].src}
            alt={platforms[0].name}
            className="h-[2.875rem] w-auto object-contain brightness-0 invert"
          />
          <img
            loading="lazy"
            decoding="async"
            src={platforms[1].src}
            alt={platforms[1].name}
            className="h-[2.125rem] w-auto object-contain brightness-0 invert"
          />
        </div>
        <div className="flex items-center gap-[2.5rem] max-md:gap-6">
          <img
            loading="lazy"
            decoding="async"
            src={platforms[2].src}
            alt={platforms[2].name}
            className="h-[2.625rem] w-auto object-contain brightness-0 invert"
          />
          <img
            loading="lazy"
            decoding="async"
            src={platforms[3].src}
            alt={platforms[3].name}
            className="h-[2.375rem] w-auto object-contain brightness-0 invert"
          />
        </div>
      </div>
    </section>
  );
}

