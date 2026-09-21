"use client";

import { useState } from "react";
import { locations } from "@/lib/content";

/**
 * "Where we work" — the south-coast coverage map, as a typographic index
 * rather than a photo grid. There are no location photographs in the Figma
 * file and none may be invented, so hovering a name reveals a frame from the
 * villa film instead: real footage, honestly used.
 */
const PLACES = locations.filter((l) => l !== "Other");

/** Distinct frames from the flythrough, one per place. */
const FRAME_FOR = [4, 22, 40, 58, 74, 92, 108, 118];

export default function Locations() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="locations" data-chapter="05" data-tone="light" className="bg-bone">
      <div className="wrap section">
        <div className="flex items-end justify-between gap-16">
          <div>
            <span className="eyebrow">Where we work</span>
            <h2 className="h-display mt-6 text-forest">
              The south coast,
              <br />
              <span className="accent text-gold">end to end</span>
            </h2>
          </div>
          <p className="copy max-w-[22rem] pb-2 text-muted">
            We manage villas across Sri Lanka&apos;s southern belt — close
            enough to be there the same day, every day.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-[1.1fr_1fr] gap-20">
          <ul>
            {PLACES.map((place, i) => (
              <li key={place}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                  className="group flex w-full items-baseline gap-6 border-b border-rule py-6 text-left transition-colors hover:border-forest focus-visible:border-forest focus-visible:outline-none"
                >
                  <span className="w-8 shrink-0 text-eyebrow font-semibold tracking-[0.2em] text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-title flex-1 text-forest transition-transform duration-500 group-hover:translate-x-2">
                    {place}
                  </span>
                  <span
                    aria-hidden
                    className="text-lead text-forest/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold"
                  >
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Preview panel — holds its shape so the row never reflows. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-forest">
            {FRAME_FOR.map((f, i) => (
              <img
                key={f}
                src={`/frames/journey/${String(f).padStart(4, "0")}.webp`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="text-eyebrow font-semibold tracking-[0.24em] text-white/70 uppercase">
                {active === null ? "Hover a location" : PLACES[active]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
