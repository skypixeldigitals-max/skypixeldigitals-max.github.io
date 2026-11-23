import { process, processSection, team } from "@/lib/content";
import Drift from "@/components/Drift";

/**
 * "We don't just design beautiful spaces. We design spaces that rank." —
 * the team in their Leona polos on the left (a 3:4 portrait, so the column is
 * sized to keep it close to uncropped), green panel with the four numbered
 * steps on the right.
 */
export function Process() {
  return (
    <section data-chapter="05" data-tone="dark" className="bg-forest">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch max-md:grid-cols-1">
        {/* The frame keeps the photo's own tall shape (1440 × 2370), so the
            photo sets the section's height and shows uncropped. */}
        <div className="relative min-h-[82.3vw] max-md:aspect-[1440/2370] max-md:min-h-0">
          <img
            loading="lazy"
            decoding="async"
            src="/brand/team-leona-tops.webp"
            alt="Two of the Leona team at work on a property, in their Powering Ceylon Stays polo shirts"
            width={1440}
            height={2370}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-16 py-16 max-md:px-5 max-md:py-16">
          <span className="eyebrow">{processSection.kicker}</span>
          {/* Smaller than the site's other display headings so the panel
              fits beside the photo without cropping it. */}
          <h2 className="h-display mt-6 text-white" style={{ fontSize: "clamp(2.3rem, 3.4vw, 3.6rem)" }}>
            We don&apos;t just design
            <br />
            beautiful spaces.
            <br />
            We design spaces
            <br />
            <span className="accent text-gold">that rank.</span>
          </h2>
          <p className="copy mt-7 text-white/75">{processSection.body}</p>

          <ol className="mt-10 space-y-4">
            {process.steps.map((s) => (
              <li key={s.number} className="group flex gap-6">
                <span className="w-12 shrink-0 pt-1 text-lead font-semibold text-gold tabular-nums">
                  {s.number}
                </span>
                <div className="border-t border-white/15 pt-4 transition-colors group-hover:border-gold">
                  <h3 className="text-lead font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-body leading-[1.75] text-white/60">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * "Two siblings. One goal." The portraits carry a halftone treatment that
 * lives in the artwork itself, so they're placed as drawn rather than
 * restyled in CSS.
 */
export function Founders() {
  return (
    <section id="team" data-chapter="01" data-tone="dark" className="bg-forest">
      {/* ---- the founders: photograph left, story right ---- */}
      <div className="wrap section">
        <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-20 max-md:grid-cols-1 max-md:gap-10">
          <figure className="relative">
            <img
              loading="lazy"
              decoding="async"
              src="/brand/siblings.webp"
              alt="Devike and Devangi, the founders of Leona Properties"
              className="aspect-[4/5] w-full object-cover"
            />
            {/* Hairline frame offset from the photograph, like the Process image. */}
            <span aria-hidden className="pointer-events-none absolute -inset-3 border border-gold/40 max-md:-inset-2" />
          </figure>
          <div>
            <span className="eyebrow">The founders</span>
            <h2 className="h-display mt-6 text-white">
              Two siblings.
              <br />
              <span className="accent text-gold">one</span> goal.
            </h2>
            <div className="mt-8 space-y-5 border-l border-blue/40 pl-10 text-body leading-[1.8] text-white/75 max-md:pl-5">
              {team.story.map((para) => (
                <p key={para} className="max-w-[34rem]">
                  {para}
                </p>
              ))}
              <div className="flex items-end justify-between gap-6 pt-2">
                <p className="font-display text-[1.6rem] leading-none text-gold">
                  &mdash; {team.signoff}
                </p>
                {/* The king coconut from "our evenings were at the pool". */}
                <Drift distance={24} className="-mb-10 w-[9.5rem] shrink-0 max-md:-mb-4 max-md:w-24">
                  <img
                    src="/brand/king-coconut.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full -rotate-6 drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
                  />
                </Drift>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The four people, further down the page than the founders' story. */
export function Team() {
  return (
    <section id="people" data-chapter="06" data-tone="dark" className="bg-forest">
      <div className="wrap pt-[7.5rem] pb-[7.5rem] max-md:pt-20 max-md:pb-20">
        <div>
          <span className="eyebrow">The team</span>
          <h3 className="h-display mt-6 text-white">The people behind it</h3>
        </div>

        <div className="mt-16 grid grid-cols-4 gap-x-10 max-md:mt-10 max-md:grid-cols-2 max-md:gap-x-5 max-md:gap-y-12">
          {team.members.map((m) => {
            const [name, role] = m.name.split(" - ").map((s) => s.trim());
            return (
              <article key={m.name} className="group">
                {/* Monochrome cutouts on the section green, bottom-anchored
                    in a fixed box so the four heads sit on one baseline. */}
                <div className="relative h-[22rem] overflow-hidden max-md:h-[13rem]">
                  {/* Hover: a brand-blue glow rises from the floor behind the
                      figure and the figure lifts a touch. Transform/opacity only. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-[-20%] bottom-[-30%] h-[110%] translate-y-1/3 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(90,142,212,0.85) 0%, rgba(63,114,183,0.45) 40%, rgba(63,114,183,0) 72%)",
                    }}
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    src={m.img}
                    alt={name}
                    className="absolute bottom-0 left-1/2 h-full max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  />
                </div>

                <h4 className="mt-7 text-lead font-semibold text-white transition-colors duration-300 group-hover:text-blue-bright">
                  {name}
                </h4>
                <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.2em] text-blue-soft uppercase">
                  {role}
                </p>
                <span className="mt-5 block h-px w-8 bg-gold/50 transition-all duration-300 group-hover:w-14" />
                <p className="mt-5 text-body leading-[1.75] text-white/60">
                  {m.bio}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
