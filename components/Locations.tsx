"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/lib/content";

/** "20+" → [20, "+"], "40%" → [40, "%"]. */
const parsed = stats.map((s) => {
  const m = s.value.match(/^(\d+)(.*)$/);
  return { ...s, to: m ? Number(m[1]) : 0, suffix: m ? m[2] : s.value };
});

/**
 * The south coast from the air, full-bleed, with the three numbers along the
 * foot of the photograph. Each one counts up from zero once, the first time
 * the row scrolls into view. No card or panel behind them: the photograph's
 * own scrim carries the contrast.
 */
export default function Locations() {
  const rowRef = useRef<HTMLDListElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const set = (k: number) =>
      parsed.forEach((s, i) => {
        const el = numRefs.current[i];
        if (el) el.textContent = `${Math.round(s.to * k)}${s.suffix}`;
      });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }
    set(0);

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const DURATION = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          set(1 - Math.pow(1 - t, 3)); // ease-out
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(row);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="locations"
      data-chapter="02"
      data-tone="dark"
      className="relative h-screen min-h-[40rem] overflow-hidden bg-forest-deep max-md:h-auto max-md:min-h-[100svh]"
    >
      <picture>
        <source media="(max-width: 767px)" srcSet="/brand/aerial-m.webp" />
        <img
          src="/brand/aerial.webp"
          alt="The south coast of Sri Lanka from the air"
          width={2752}
          height={1536}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-forest-deep/80 via-forest-deep/25 to-transparent max-md:h-[75%]" />

      <div className="wrap relative flex h-full items-end pb-20 text-white max-md:min-h-[100svh] max-md:pt-32 max-md:pb-28">
        <dl
          ref={rowRef}
          className="grid w-full grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-12"
        >
          {parsed.map((s, i) => (
            <div key={s.label} className="flex flex-col-reverse items-center text-center">
              <dt className="mx-auto mt-5 max-w-[13rem] text-[0.78rem] leading-[1.6] font-medium tracking-[0.18em] uppercase">
                {s.label}
              </dt>
              <dd className="flex flex-col items-center">
                <span
                  ref={(el) => {
                    numRefs.current[i] = el;
                  }}
                  className="text-[5rem] leading-none font-semibold text-white tabular-nums drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] max-md:text-[3.4rem]"
                >
                  {s.value}
                </span>
                <span aria-hidden className="mt-5 block h-px w-10 bg-white/40" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
