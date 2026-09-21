"use client";

import { useEffect, useRef } from "react";
import { services } from "@/lib/content";

/** One accent word per service, dropped into script inside the caps title. */
const ACCENT: Record<string, [string, string]> = {
  "Property Management": ["Property", "management"],
  "Interior Design & Architecture": ["Interior design &", "architecture"],
  "Listing Optimisation": ["Listings that", "rank"],
  "Content Creation": ["Content that", "sells"],
};

/**
 * The four services, in detail. This is where the establishing-frame dots
 * land, so each row carries an id. Rows stagger in as they enter view;
 * the establishing shot already did the visual work, so this is type-led.
 */
export default function ServiceDetail() {
  const rows = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.current.forEach((r) => r && (r.style.opacity = "1"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }),
      { threshold: 0.25 },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" data-chapter="04" data-tone="light" className="bg-bone">
      <div className="wrap section">
        <div className="flex items-end justify-between gap-16">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 className="h-display mt-6 text-forest">
              Four things,
              <br />
              <span className="accent text-gold">done properly</span>
            </h2>
          </div>
          <p className="copy max-w-[22rem] pb-3 text-muted">
            Every villa we take on gets all four. Most owners only ever had one.
          </p>
        </div>

        <ol className="mt-24">
          {services.map((s, i) => {
            const [pre, script] = ACCENT[s.title] ?? [s.title, ""];
            return (
              <li
                key={s.number}
                id={`service-${i + 1}`}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="group grid scroll-mt-32 grid-cols-[6rem_1fr_1.3fr] items-start gap-10 border-t border-rule py-14 transition-[opacity,transform] duration-700 ease-out last:border-b"
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span className="pt-2 font-display text-[2rem] leading-none text-gold/70 tabular-nums">
                  {s.number}
                </span>
                <h3 className="h-display text-[2.6rem] text-forest">
                  {pre}
                  {script && (
                    <>
                      <br />
                      <span className="accent text-gold">{script}</span>
                    </>
                  )}
                </h3>
                <div>
                  <p className="copy text-muted">{s.body}</p>
                  <a
                    href="#enquire"
                    className="mt-7 inline-flex items-center gap-2 text-eyebrow font-semibold tracking-[0.22em] text-blue uppercase transition-[gap,color] duration-200 hover:gap-4 hover:text-blue-bright"
                  >
                    Ask about this
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
