import { locations } from "@/lib/content";

const PLACES = locations.filter((l) => l !== "Other");

/**
 * "Where we work" — the south coast from the air, full-bleed, with the
 * heading bottom-left and the eight places as a quiet numbered index on
 * the right. No pins: the photograph is a mood, not a map.
 */
export default function Locations() {
  return (
    <section
      id="locations"
      data-chapter="05"
      data-tone="dark"
      className="relative h-screen min-h-[48rem] overflow-hidden bg-forest-deep max-md:h-auto max-md:min-h-[100svh]"
    >
      <img
        src="/brand/aerial.webp"
        alt="The south coast of Sri Lanka from the air"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {/* Scrims: a foot for the heading, a right-hand column for the list. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-forest-deep/80 via-forest-deep/25 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-forest-deep/70 via-forest-deep/20 to-transparent max-md:inset-x-0 max-md:w-auto max-md:bg-none max-md:bg-forest-deep/55" />

      <div className="wrap relative flex h-full items-end justify-between gap-16 pb-14 text-white max-md:min-h-[100svh] max-md:flex-col max-md:items-start max-md:justify-end max-md:gap-10 max-md:pt-32 max-md:pb-32">
        <div>
          <span className="eyebrow">Where we work</span>
          <h2 className="h-display mt-6">
            The south coast,
            <br />
            <span className="accent text-gold">end to end</span>
          </h2>
          <p className="copy mt-8 text-white/80">
            Villas across Sri Lanka&apos;s southern belt — close enough to be
            there the same day, every day.
          </p>
        </div>

        <ol className="w-[22rem] shrink-0 pb-2 max-md:w-full">
          {PLACES.map((place, i) => (
            <li
              key={place}
              className="flex items-baseline gap-5 border-t border-white/20 py-[0.85rem]"
            >
              <span className="w-7 text-eyebrow font-semibold tracking-[0.2em] text-gold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.6rem] leading-none">{place}</span>
            </li>
          ))}
          <li className="border-t border-white/20 pt-4 text-eyebrow font-semibold tracking-[0.3em] text-white/60 uppercase">
            And by arrangement, elsewhere
          </li>
        </ol>
      </div>
    </section>
  );
}
