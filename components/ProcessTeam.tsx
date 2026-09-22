import { process, processSection, team } from "@/lib/content";

/**
 * "We don't just design beautiful spaces. We design spaces that rank." —
 * black-and-white photograph on the left, green panel with the four numbered
 * steps on the right.
 */
export function Process() {
  return (
    <section data-chapter="06" data-tone="dark" className="bg-forest">
      <div className="grid grid-cols-[52.4%_1fr] items-stretch">
        <img
          src="/brand/process-bw.png"
          alt="A Leona designer reviewing plans on site during a villa fit-out"
          className="h-full w-full object-cover"
        />

        <div className="flex flex-col justify-center px-16 py-[7.5rem]">
          <span className="eyebrow">{processSection.kicker}</span>
          <h2 className="h-display mt-6 text-white">
            We don&apos;t just design
            <br />
            beautiful spaces.
            <br />
            We design spaces
            <br />
            <span className="accent text-gold">that rank.</span>
          </h2>
          <p className="copy mt-7 text-white/75">{processSection.body}</p>

          <ol className="mt-12 space-y-5">
            {process.steps.map((s) => (
              <li key={s.number} className="group flex gap-6">
                <span className="w-12 shrink-0 pt-1 text-lead font-semibold text-gold/70 tabular-nums">
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
export function Team() {
  return (
    <section id="team" data-chapter="07" data-tone="dark" className="bg-forest">
      <div className="wrap section">
        <div className="grid grid-cols-[auto_1fr] items-start gap-20">
          <h2 className="h-display text-white">
            Two siblings.
            <br />
            <span className="accent text-gold">one</span> goal.
          </h2>
          <p className="border-l border-blue/40 pt-2 pl-10 text-body leading-[1.75] text-white/70">
            {team.story}
          </p>
        </div>

        <div className="mt-24 grid grid-cols-4 gap-x-10">
          {team.members.map((m) => {
            const [name, role] = m.name.split(" - ").map((s) => s.trim());
            return (
              <article key={m.name} className="group">
                {/* Monochrome cutouts on the section green, bottom-anchored
                    in a fixed box so the four heads sit on one baseline. */}
                <div className="relative h-[22rem] overflow-hidden">
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
                    src={m.img}
                    alt={name}
                    className="absolute bottom-0 left-1/2 h-full max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="mt-7 text-lead font-semibold text-white transition-colors duration-300 group-hover:text-blue-bright">
                  {name}
                </h3>
                <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.2em] text-blue-bright uppercase">
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
