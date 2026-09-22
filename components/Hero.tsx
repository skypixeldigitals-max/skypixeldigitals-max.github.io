"use client";

import { useEffect, useRef, useState } from "react";
import { establishing, services } from "@/lib/content";

const TOTAL_FRAMES = 49;
const MOBILE = "(max-width: 767px)";
const framePath = (i: number, mobile: boolean) =>
  `/frames/${mobile ? "hero-m" : "hero"}/${String(i + 1).padStart(4, "0")}.webp`;

/**
 * On phones the 4:3 photograph is cropped to 3:4 — the middle 56.25% of
 * its width. Hotspot x-positions are mapped into that window.
 */
const MOBILE_CROP = 0.5625;
const mobileX = (x: number) =>
  Math.min(94, Math.max(6, ((x - (100 - 100 * MOBILE_CROP) / 2) / MOBILE_CROP) * 1));

/**
 * ERA's hero, on Leona's establishing shot.
 *
 * Desktop: a pinned section 200vh tall. The square poster (photo + extended
 * sky) sits in a frame taller than the viewport; scrolling pans it up while
 * the frame sequence scrubs. Phone: no pan — the photo is cropped portrait
 * and anchored to the bottom of the viewport, the scrub still plays, and a
 * tapped hotspot opens a sheet instead of a side label.
 *
 * Transform-only, rAF-throttled, reduced-motion aware. Frames start loading
 * after the window `load` event so they never compete with the poster (LCP).
 */
export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !frame || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia(MOBILE).matches;

    // ---- frame sequence: first frame, then the rest, after `load` ----
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let ready = false;
    let disposed = false;
    let drawn = -1;
    let loaded = 0;
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[i] = img;
          loaded++;
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${loaded / TOTAL_FRAMES})`;
            if (loaded === TOTAL_FRAMES) barRef.current.style.opacity = "0";
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(i, mobile);
      });
    const start = async () => {
      await loadOne(0);
      if (disposed) return;
      ready = true;
      render();
      if (reduced) return; // the first frame is all a reduced-motion visitor sees
      let next = 1;
      await Promise.all(
        Array.from({ length: 4 }, async () => {
          while (next < TOTAL_FRAMES && !disposed) await loadOne(next++);
        }),
      );
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", () => start(), { once: true });

    // Cover-crop draw: exact fit on desktop (the box is 4:3), centre crop on
    // phones (the box is 3:4).
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
      const s = Math.max(cw / img.width, ch / img.height);
      const w = img.width * s, h = img.height * s;
      ctx.setTransform(r, 0, 0, r, 0, 0);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    let raf = 0;
    let queued = false;

    function render() {
      if (!wrap || !frame) return;
      const r = wrap.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / span));

      if (!mobile) {
        // The frame is square: the top quarter is extended sky baked into the
        // poster, the lower 4:3 is the photograph (and the video). At rest
        // the photograph's top edge sits 18vh down; it travels up until the
        // bottom of the photo meets the bottom of the viewport.
        const frameH = frame.offsetHeight;
        const startTop = window.innerHeight * 0.18 - frameH * 0.25;
        const endTop = window.innerHeight - frameH;
        const top = reduced ? endTop : startTop + (endTop - startTop) * p;
        frame.style.transform = `translate3d(0, ${top}px, 0)`;
      }

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

  const current = open === null ? null : establishing.dots[open];

  return (
    <section
      ref={wrapRef}
      id="top"
      data-chapter="00"
      data-tone="dark"
      className="relative h-[200vh] max-md:h-[160vh]"
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
          className="absolute inset-x-0 top-0 aspect-square w-full will-change-transform max-md:aspect-auto max-md:h-full"
        >
          {/* Poster: the approved still with its sky extended to a square,
              paints instantly; the canvas takes over the lower 4:3 the
              moment the first frame has decoded. Hidden on phones, where the
              first frame is the poster. */}
          <img
            src="/brand/services/establishing-tall.webp"
            alt="A Leona team at work around a villa pool at golden hour"
            className="absolute inset-0 h-full w-full max-md:hidden"
            decoding="async"
            fetchPriority="high"
          />
          {/* The photograph proper. Dots are positioned against this box so
              their percentages stay relative to the image. */}
          <div className="absolute inset-x-0 bottom-0 aspect-[4/3] w-full max-md:aspect-[3/4]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
            {/* Feather the (static) sky at the top of the video into the poster. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[14%] max-md:h-[32%]"
              style={{
                background:
                  "linear-gradient(to bottom, #287bbe 0%, rgba(40,123,190,0.6) 40%, rgba(40,123,190,0) 100%)",
              }}
            />

            <div>
              {establishing.dots.map((d, i) => {
                const s = services[d.service];
                const on = open === i;
                return (
                  <div
                    key={i}
                    className="absolute max-md:hidden"
                    style={{ left: `${d.x}%`, top: `${d.y}%` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Dot on={on} label={`${s.title}: ${d.note}`} i={i} setOpen={setOpen} />
                    <a
                      href={`#service-${d.service + 1}`}
                      onClick={(e) => e.stopPropagation()}
                      tabIndex={on ? 0 : -1}
                      className={`absolute top-1/2 left-full flex w-max max-w-[18rem] -translate-y-1/2 items-center transition-all duration-300 ease-out ${
                        on
                          ? "pointer-events-auto translate-x-0 opacity-100"
                          : "pointer-events-none -translate-x-3 opacity-0"
                      }`}
                    >
                      <span aria-hidden className="mr-4 block h-px w-10 bg-white/70" />
                      {/* A soft shadow behind the words rather than a card. */}
                      <span className="-my-3 rounded-sm py-3 pr-6 pl-4 text-left [background:linear-gradient(90deg,rgba(26,41,66,0.62),rgba(26,41,66,0.35)_70%,rgba(26,41,66,0))]">
                        <span className="block text-eyebrow font-semibold tracking-[0.26em] text-gold-bright">
                          {s.number}
                        </span>
                        <span className="mt-1 block font-display text-[1.5rem] leading-none text-white">
                          {s.title}
                        </span>
                        <span className="mt-2 block text-sm leading-snug text-white/90">
                          {d.note}
                        </span>
                      </span>
                    </a>
                  </div>
                );
              })}
              {/* Phone: same dots, remapped into the portrait crop. */}
              {establishing.dots.map((d, i) => {
                const s = services[d.service];
                return (
                  <div
                    key={`m${i}`}
                    className="absolute md:hidden"
                    style={{ left: `${mobileX(d.x)}%`, top: `${d.y}%` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Dot on={open === i} label={`${s.title}: ${d.note}`} i={i} setOpen={setOpen} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---- phone sheet for the open hotspot ---- */}
        <div
          role="dialog"
          aria-label={current ? services[current.service].title : "Service details"}
          aria-hidden={!current}
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-x-4 bottom-4 z-10 rounded-sm bg-blue-deep/85 p-5 text-white backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out md:hidden ${
            current ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          {current && (
            <>
              <span className="block text-eyebrow font-semibold tracking-[0.26em] text-gold-bright">
                {services[current.service].number}
              </span>
              <span className="mt-1 block font-display text-[1.5rem] leading-none">
                {services[current.service].title}
              </span>
              <span className="mt-2 block text-sm leading-snug text-white/90">{current.note}</span>
              <a
                href={`#service-${current.service + 1}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-eyebrow font-semibold tracking-[0.22em] text-gold-bright uppercase"
              >
                Read more <span aria-hidden>→</span>
              </a>
            </>
          )}
        </div>

        {/* ---- title stack ---- */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 top-[7%] flex flex-col items-center text-center text-white will-change-transform max-md:top-[12%]"
        >
          <h1 className="font-display text-[8.4rem] leading-[0.88] tracking-[-0.03em] uppercase drop-shadow-[0_2px_24px_rgba(0,30,70,0.35)] max-md:text-[3.9rem]">
            <span className="block">{establishing.title[0]}</span>
            <span className="block text-[0.72em]">{establishing.title[1]}</span>
          </h1>
          <span className="font-accent -mt-[0.12em] text-[3.6rem] leading-none whitespace-nowrap text-gold drop-shadow-[0_2px_16px_rgba(0,30,70,0.35)] max-md:text-[1.9rem]">
            {establishing.script}
          </span>

          <div className="mt-[2.6rem] flex items-center gap-10 font-display text-[1.45rem] tracking-[0.02em] uppercase max-md:mt-5 max-md:gap-4 max-md:text-[0.85rem]">
            <span>{establishing.strap[0]}</span>
            <span className="h-px w-24 bg-white/60 max-md:w-8" aria-hidden />
            <span>{establishing.strap[1]}</span>
          </div>
        </div>

        {/* ---- circular CTA, bottom centre (desktop; phones use the sticky bar) ---- */}
        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-[6vh] flex justify-center opacity-0 max-md:hidden"
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

        {/* ---- frame-loading hairline ---- */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <span
            ref={barRef}
            className="block h-full origin-left scale-x-0 bg-gold transition-opacity duration-700"
          />
        </div>
      </div>
    </section>
  );
}

function Dot({
  on,
  label,
  i,
  setOpen,
}: {
  on: boolean;
  label: string;
  i: number;
  setOpen: (v: number | null | ((p: number | null) => number | null)) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={on}
      onMouseEnter={() => setOpen(i)}
      onFocus={() => setOpen(i)}
      onClick={() => setOpen(i)} // focus already opened it; closing is outside-click or Escape
      className="group relative -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-[19px]"
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
  );
}
