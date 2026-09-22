"use client";

import { useEffect, useRef, useState } from "react";
import { establishing, services } from "@/lib/content";

const TOTAL_FRAMES = 97;
const framePath = (i: number) =>
  `/frames/hero/${String(i + 1).padStart(4, "0")}.webp`;

/**
 * ERA's hero, on Leona's establishing shot.
 *
 * A pinned section 200vh tall. The 4:3 photograph sits in a frame that is
 * taller than the viewport; at the top of the scroll you see mostly sky
 * (extended upward with a gradient sampled from the image's own top edge),
 * with the title stack over it. As you scroll, the frame translates up so
 * the pool and the people come into view, the title fades, and the hotspot
 * dots fade in. Transform-only, rAF-throttled, reduced-motion aware.
 */
export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !frame || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- frame sequence: first frame eagerly, the rest streamed in ----
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let ready = false;
    let disposed = false;
    let drawn = -1;
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => { images[i] = img; resolve(); };
        img.onerror = () => resolve();
        img.src = framePath(i);
      });
    (async () => {
      await loadOne(0);
      if (disposed) return;
      ready = true;
      render();
      let next = 1;
      await Promise.all(
        Array.from({ length: 6 }, async () => {
          while (next < TOTAL_FRAMES && !disposed) await loadOne(next++);
        }),
      );
    })();

    const paint = (index: number) => {
      let i = index;
      while (i > 0 && !images[i]) i--;
      const img = images[i];
      if (!img || i === drawn) return;
      drawn = i;
      const r = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (canvas.width !== cw * r || canvas.height !== ch * r) {
        canvas.width = cw * r; canvas.height = ch * r;
      }
      ctx.setTransform(r, 0, 0, r, 0, 0);
      ctx.drawImage(img, 0, 0, cw, ch);
    };

    let raf = 0;
    let queued = false;

    function render() {
      if (!wrap || !frame) return;
      const r = wrap.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / span));

      // The frame is square: the top quarter is extended sky baked into the
      // poster, the lower 4:3 is the photograph (and the video). It starts
      // flush with the viewport top and travels up until the bottom of the
      // photo meets the bottom of the viewport.
      const frameH = frame.offsetHeight;
      // At rest the photograph's top edge sits 18vh down; the extended sky
      // (the top quarter of the square) fills everything above it.
      const startTop = window.innerHeight * 0.18 - frameH * 0.25;
      const endTop = window.innerHeight - frameH;
      const top = reduced ? endTop : startTop + (endTop - startTop) * p;
      frame.style.transform = `translate3d(0, ${top}px, 0)`;

      // The clip plays out over the pin: frame 0 at rest, last frame when the
      // pool is fully revealed. Reduced-motion holds the first frame.
      if (ready) paint(reduced ? 0 : Math.round(p * (TOTAL_FRAMES - 1)));

      const t = reduced ? 0 : Math.max(0, 1 - p * 2.2);
      if (titleRef.current) {
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translate3d(0, ${-p * 60}px, 0)`;
      }
      // Dots are live from the first frame; only the CTA waits for the pan.
      const d = reduced ? 1 : Math.min(1, Math.max(0, (p - 0.45) * 2.5));
      if (ctaRef.current) ctaRef.current.style.opacity = String(d);
    }

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        render();
      });
    };
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={wrapRef}
      id="top"
      data-chapter="00"
      data-tone="dark"
      className="relative"
      style={{ height: "200vh" }}
      onClick={() => setOpen(null)}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #1f6cb0 0%, #2578ba 55%, #287bbe 100%)",
        }}
      >
        {/* ---- the photograph, with the dots locked to it ---- */}
        <div
          ref={frameRef}
          className="absolute inset-x-0 top-0 aspect-square w-full will-change-transform"
        >
          {/* Poster: the approved still with its sky extended to a square,
              paints instantly; the canvas takes over the lower 4:3 the
              moment the first frame has decoded. */}
          <img
            src="/brand/services/establishing-tall.webp"
            alt="A Leona team at work around a villa pool at golden hour"
            className="absolute inset-0 h-full w-full"
            decoding="async"
          />
          {/* The photograph proper. Dots are positioned against this box so
              their percentages stay relative to the 4:3 image. */}
          <div className="absolute inset-x-0 bottom-0 aspect-[4/3] w-full">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
          {/* Feather the (static) sky at the top of the video into the poster. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[14%]"
            style={{
              background:
                "linear-gradient(to bottom, #287bbe 0%, rgba(40,123,190,0.6) 40%, rgba(40,123,190,0) 100%)",
            }}
          />

          <div ref={dotsRef}>
            {establishing.dots.map((d, i) => {
              const s = services[d.service];
              const on = open === i;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label={`${s.title}: ${d.note}`}
                    aria-expanded={on}
                    onMouseEnter={() => setOpen(i)}
                    onFocus={() => setOpen(i)}
                    onClick={() => setOpen(on ? null : i)}
                    className="group relative -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-[16px] focus-visible:outline-none"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-1/2 h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80"
                    />
                    <span
                      aria-hidden
                      className={`relative block h-[6px] w-[6px] rounded-full bg-white transition-transform duration-200 ease-out group-hover:scale-150 group-focus-visible:scale-150 ${
                        on ? "scale-150" : ""
                      }`}
                    />
                  </button>
                  <a
                    href={`#service-${d.service + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-1/2 left-full flex w-max max-w-[16rem] -translate-y-1/2 items-center transition-all duration-300 ease-out ${
                      on
                        ? "pointer-events-auto translate-x-0 opacity-100"
                        : "pointer-events-none -translate-x-3 opacity-0"
                    }`}
                  >
                    <span aria-hidden className="mr-4 block h-px w-10 bg-white/70" />
                    <span className="text-left [text-shadow:0_1px_14px_rgba(0,20,40,0.55)]">
                      <span className="block text-eyebrow font-semibold tracking-[0.26em] text-gold">
                        {s.number}
                      </span>
                      <span className="mt-1 block font-display text-[1.5rem] leading-none text-white">
                        {s.title}
                      </span>
                      <span className="mt-2 block text-sm leading-snug text-white/85">
                        {d.note}
                      </span>
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
          </div>
        </div>

        {/* ---- title stack ---- */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 top-[7%] flex flex-col items-center text-center text-white will-change-transform"
        >
          <h1 className="font-display text-[8.4rem] leading-[0.88] tracking-[-0.03em] uppercase drop-shadow-[0_2px_24px_rgba(0,30,70,0.35)]">
            <span className="block">{establishing.title[0]}</span>
            <span className="block text-[0.72em]">{establishing.title[1]}</span>
          </h1>
          <span className="font-accent -mt-[0.18em] text-[4.4rem] leading-none text-gold drop-shadow-[0_2px_16px_rgba(0,30,70,0.35)]">
            {establishing.script}
          </span>

          <div className="mt-[2.6rem] flex items-center gap-10 font-display text-[1.45rem] tracking-[0.02em] uppercase">
            <span>{establishing.strap[0]}</span>
            <span className="h-px w-24 bg-white/60" aria-hidden />
            <span>{establishing.strap[1]}</span>
          </div>
        </div>

        {/* ---- circular CTA, bottom centre ---- */}
        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-[6vh] flex justify-center opacity-0"
        >
          <a
            href="#enquire"
            className="group grid h-[10.5rem] w-[10.5rem] place-items-center rounded-full border border-white/70 text-center text-eyebrow font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-[2px] transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            <span className="swap max-w-[7rem] leading-[1.5]">
              <span>{establishing.cta}</span>
              <span aria-hidden>{establishing.cta}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
