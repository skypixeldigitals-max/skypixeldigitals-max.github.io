"use client";

import { useEffect, useRef } from "react";

/**
 * Moves its child a few pixels against the scroll while it crosses the
 * viewport — enough to feel placed rather than pasted. Transform only,
 * rAF-throttled, still for reduced-motion visitors.
 */
export default function Drift({
  children,
  distance = 40,
  className = "",
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let queued = false;
    const render = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 as it enters at the bottom, +1 as it leaves at the top.
      const p = Math.min(1, Math.max(-1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      el.style.transform = `translate3d(0, ${(-p * distance).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
