"use client";

import { useEffect, useRef } from "react";
import { services, stats } from "@/lib/content";

const TOTAL_FRAMES = 121;
const framePath = (i: number) =>
  `/frames/journey/${String(i + 1).padStart(4, "0")}.webp`;

/** Frames finish here; the rest of the scroll holds on the interior. */
const FRAME_END = 0.86;

/** 0 before `a`, 1 between `b` and `c`, 0 after `d`. */
function ramp(p: number, a: number, b: number, c: number, d: number) {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p <= c) return 1;
  return 1 - (p - c) / (d - c);
}

/**
 * The opening journey. A pinned canvas plays the villa flythrough scrubbed by
 * scroll across 600vh — about six screen-heights, so the camera moves at a
 * deliberate walking pace rather than racing.
 *
 * Overlays are written straight to the DOM inside the rAF loop rather than
 * through React state, so scrubbing never triggers a re-render.
 */
export default function VillaJourney() {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const actRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(
      null,
    );
    let ready = false;
    let disposed = false;
    let drawn = -1;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(i);
      });

    (async () => {
      await loadOne(0);
      if (disposed) return;
      ready = true;
      loaderRef.current?.style.setProperty("opacity", "0");
      render();
      let next = 1;
      await Promise.all(
        Array.from({ length: 6 }, async () => {
          while (next < TOTAL_FRAMES && !disposed) await loadOne(next++);
        }),
      );
    })();

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    function paint(index: number) {
      if (!canvas || !ctx) return;
      let i = index;
      while (i > 0 && !images[i]) i--;
      const img = images[i];
      if (!img || i === drawn) return;
      drawn = i;
      const r = dpr();
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const scale = Math.max(cw / img.width, ch / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.setTransform(r, 0, 0, r, 0, 0);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    function show(el: HTMLElement | null, o: number, lift = 0) {
      if (!el) return;
      el.style.opacity = String(o);
      el.style.transform = `translate3d(0, ${lift}px, 0)`;
    }

    function render() {
      if (!wrap || !canvas || !ctx) return;
      const r = dpr();
      if (
        canvas.width !== canvas.clientWidth * r ||
        canvas.height !== canvas.clientHeight * r
      ) {
        canvas.width = canvas.clientWidth * r;
        canvas.height = canvas.clientHeight * r;
        drawn = -1;
      }

      const rect = wrap.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / span));

      if (ready) paint(Math.round(Math.min(1, p / FRAME_END) * (TOTAL_FRAMES - 1)));

      // Opening title, then the four services, then the proof.
      const t = ramp(p, -0.1, 0, 0.06, 0.14);
      show(titleRef.current, t, (1 - t) * -30);
      show(hintRef.current, ramp(p, -0.1, 0, 0.03, 0.08));

      const windows: [number, number, number, number][] = [
        [0.16, 0.21, 0.29, 0.34],
        [0.35, 0.40, 0.48, 0.53],
        [0.54, 0.59, 0.67, 0.72],
        [0.73, 0.78, 0.84, 0.88],
      ];
      windows.forEach((w, i) => {
        const o = ramp(p, ...w);
        show(actRefs.current[i], o, (1 - o) * 26);
      });

      const s = ramp(p, 0.89, 0.94, 1, 1.1);
      show(statsRef.current, s, (1 - s) * 26);

      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    }

    let raf = 0;
    let queued = false;
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

  return (
    <section ref={wrapRef} data-chapter="01" data-tone="dark" className="relative" style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-forest-deep">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Legibility: darken the left third and both edges without flattening
            the image. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35" />

        <div
          ref={loaderRef}
          className="absolute inset-0 z-20 flex items-center justify-center bg-forest-deep transition-opacity duration-1000"
        >
          <img
            src="/brand/logo-shield.png"
            alt=""
            className="h-14 w-auto animate-pulse brightness-0 invert"
          />
        </div>

        {/* ---- opening title ---- */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0"
        >
          <div className="flex items-center gap-4">
            <img
              src="/brand/logo-shield.png"
              alt=""
              className="h-9 w-auto brightness-0 invert"
            />
            <span className="text-[0.95rem] font-semibold tracking-[0.42em] text-blue-bright">
              LEONA PROPERTIES
            </span>
          </div>
          <h1 className="h-display mt-9 max-w-[70rem] text-[7rem] text-white">
            Sri Lanka&apos;s
            <br />
            <span className="accent text-gold">property care</span>
            <br />
            Specialists
          </h1>
          <div className="mt-10 h-px w-24 bg-gradient-to-r from-blue-bright via-gold to-blue-bright" />
        </div>

        <div
          ref={hintRef}
          className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 opacity-0"
        >
          <span className="text-[0.7rem] font-medium tracking-[0.32em] text-white/60 uppercase">
            Scroll to walk through
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>

        {/* ---- the four services ---- */}
        {services.map((s, i) => (
          <div
            key={s.number}
            ref={(el) => {
              actRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center opacity-0"
          >
            <div className="w-full px-[8vw]">
              <div className="max-w-[34rem]">
                <span className="text-[0.72rem] font-semibold tracking-[0.4em] text-gold">
                  {s.number} — {s.title.toUpperCase()}
                </span>
                <h2 className="mt-6 text-[3.1rem] leading-[1.1] font-semibold tracking-[-0.015em] text-white">
                  {s.title}
                </h2>
                <div className="mt-7 h-px w-14 bg-gold/60" />
                <p className="mt-7 text-[1.06rem] leading-[1.72] text-white/85">
                  {s.body}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* ---- the proof: numbers over a scrim so gold reads on any frame ---- */}
        <div
          ref={statsRef}
          className="absolute inset-0 flex items-center justify-center bg-forest-deep/60 px-8 opacity-0"
        >
          <div className="flex w-full max-w-[62rem] justify-between">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[4.6rem] leading-none font-semibold text-gold">
                  {s.value}
                </div>
                <div className="mx-auto mt-5 h-px w-10 bg-white/25" />
                <div className="mt-5 max-w-[11rem] text-[0.78rem] leading-[1.6] font-medium tracking-[0.18em] text-white uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- progress ---- */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <span
            ref={barRef}
            className="block h-full origin-left scale-x-0 bg-gold"
          />
        </div>

      </div>
    </section>
  );
}
