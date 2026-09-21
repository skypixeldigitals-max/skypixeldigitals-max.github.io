"use client";

import { useEffect, useState } from "react";

/**
 * ERA's corner counter: the current chapter number, a thin progress line,
 * and "SCROLL". Sections opt in with `data-chapter`. Uses an
 * IntersectionObserver so it costs nothing while idle; the progress line
 * is the only thing that updates on scroll, and it's transform-only.
 */
export default function ScrollCounter() {
  const [chapter, setChapter] = useState("01");
  const [total, setTotal] = useState(1);
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    setTotal(sections.length);

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible chapter rather than the first intersecting one,
        // so the number doesn't flicker at section boundaries.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const el = best.target as HTMLElement;
        setChapter(el.dataset.chapter ?? "01");
        setDark(el.dataset.tone !== "light");
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    sections.forEach((s) => io.observe(s));

    let raf = 0;
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const tone = dark ? "text-white/70" : "text-forest/60";
  const line = dark ? "bg-white/25" : "bg-forest/20";
  const fill = dark ? "bg-gold" : "bg-forest";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-8 left-[5vw] z-30 hidden flex-col items-center gap-4 transition-colors duration-500 lg:flex ${tone}`}
    >
      <span className="font-display text-[1.35rem] leading-none tabular-nums">
        {chapter}
        <span className="text-[0.7em] opacity-50">/{String(total).padStart(2, "0")}</span>
      </span>
      <span className={`relative block h-16 w-px overflow-hidden ${line}`}>
        <span
          className={`absolute inset-x-0 top-0 block origin-top ${fill}`}
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />
      </span>
      <span
        className="text-[0.6rem] font-medium tracking-[0.32em] uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        Scroll
      </span>
    </div>
  );
}
