"use client";

import { sendEnquiry } from "@/lib/enquiry";
import { useEffect, useRef, useState } from "react";
import { dashboard, alaCarte, contact, brand, locations } from "@/lib/content";

/** Fades a block up the first time it enters view. */
function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.style.transitionDelay = `${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "none";
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(26px)",
        transition: "opacity .8s cubic-bezier(.2,.7,.3,1), transform .8s cubic-bezier(.2,.7,.3,1)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Dashboard() {
  return (
    <section data-chapter="08" data-tone="light" className="bg-bone">
      <div className="wrap section">
        <div className="grid grid-cols-2 items-start gap-24">
          <Reveal>
            <span className="eyebrow">
              Full transparency
            </span>
            <h2 className="h-display mt-6 text-forest">
              Villa owners,
              <br />
              <span className="accent text-gold">this one&apos;s</span>
              <br />
              for you.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-6 pt-2">
              {dashboard.paragraphs.map((p) => (
                <p key={p} className="text-body leading-[1.75] text-muted">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="mt-20 overflow-hidden rounded-lg border border-rule shadow-[0_24px_60px_-24px_rgba(20,35,29,0.25)]">
            <img
              src="/brand/dashboard-mock.png"
              alt="The Leona owner dashboard showing revenue, occupancy, upcoming bookings and maintenance"
              className="w-full"
            />
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-3 gap-x-14 gap-y-12">
          {dashboard.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="border-t border-rule pt-6">
                <h3 className="text-lead font-medium text-forest">
                  {f.title}
                </h3>
                <p className="mt-3 text-body leading-[1.75] text-muted">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The à la carte block. The branded Clio drives in from the left as the
 * section enters view, then settles — motion tied to arrival, not decoration.
 */
/** Card artwork: two generated scenes, and the branded car for transfers. */
const ALACARTE_ART = [
  "/brand/services/05-villa-consultation.webp",
  "/brand/services/07-airport-transfer.webp",
  "/brand/services/06-photography-launch.webp",
];

export function AlaCarte() {
  const carRef = useRef<HTMLImageElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);

  /**
   * The car is driven by scroll position rather than a one-shot observer: it
   * tracks in from the left as the lane crosses the viewport and parks when
   * centred. Scroll-linked means it also reverses if you scroll back up, and
   * it can't get stuck half-animated the way a fire-once observer can.
   */
  useEffect(() => {
    const car = carRef.current;
    const lane = laneRef.current;
    if (!car || !lane) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      car.style.transform = "translateX(0)";
      car.style.opacity = "1";
      return;
    }

    // Transition only smooths out the gaps between scroll frames.
    car.style.transition = "transform .35s linear, opacity .4s ease";

    let raf = 0;
    let queued = false;

    const render = () => {
      const r = lane.getBoundingClientRect();
      // 0 when the lane's top hits the bottom of the viewport, 1 once it has
      // travelled roughly two thirds of the way up.
      const travel = window.innerHeight * 0.75;
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / travel));
      const eased = 1 - Math.pow(1 - p, 3);
      // The vehicle faces left, so it must travel right-to-left. Flipping the
      // image instead would mirror the door branding and read backwards.
      car.style.transform = `translateX(${(1 - eased) * 68}vw)`;
      car.style.opacity = String(Math.min(1, p * 3));
    };

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
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section data-chapter="09" data-tone="dark" className="overflow-hidden bg-forest">
      <div className="wrap pt-[7.5rem]">
        <div className="flex items-end justify-between gap-16">
          <Reveal>
            <span className="eyebrow">
              One-off services
            </span>
            <h2 className="h-display mt-6 text-white">
              Need help at a
              <br />
              <span className="accent text-gold">specific</span> stage?
            </h2>
          </Reveal>
          <p className="pb-3 text-body text-white/65">
            {alaCarte.subtitle}
          </p>
        </div>
      </div>

      <div ref={laneRef} className="relative mt-12 h-[20rem]">
        <img
          ref={carRef}
          src="/brand/car.png"
          alt="A Leona Properties branded vehicle"
          className="absolute right-[6vw] bottom-0 w-[46rem] max-w-none"
          style={{ opacity: 0, transform: "translateX(68vw)" }}
        />
      </div>

      <div className="wrap pb-[7.5rem]">
        <div className="grid grid-cols-3 gap-x-12">
          {alaCarte.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="group flex h-full flex-col">
                <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-sm bg-forest-deep">
                  <img
                    src={ALACARTE_ART[i]}
                    alt=""
                    className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${
                      "object-cover"
                    }`}
                  />
                </div>
                <h3 className="text-lead leading-[1.3] font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-body leading-[1.75] text-white/65">
                  {item.body}
                </p>
                <a
                  href="#enquire"
                  className="mt-8 inline-flex items-center gap-2 self-start text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase transition group-hover:gap-4"
                >
                  {item.cta}
                  <span aria-hidden>→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const field =
    "h-14 w-full rounded-sm border border-forest/15 bg-white px-4 text-body text-ink transition placeholder:text-ink/35 focus:border-blue focus:outline-none";

  return (
    <section id="contact" data-chapter="10" data-tone="light" className="bg-paper">
      <div className="wrap section grid grid-cols-2 gap-16">
        <Reveal>
          <div>
            <h2 className="h-display text-forest">
              Tell us about
              <br />
              <span className="accent text-gold">your</span> property.
            </h2>
            <p className="mt-8 max-w-[26rem] text-body leading-[1.75] text-muted">
              {contact.body}
            </p>
            <dl className="mt-14 space-y-7">
              {[
                ["Phone", brand.phone],
                ["Email", brand.email],
                ["Response time", brand.responseTime],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.24em] text-muted uppercase">
                    {k}
                  </dt>
                  <dd className="mt-2 text-body text-forest">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div className="border-l-2 border-gold pl-6 text-body leading-[1.75] text-forest">
              Thank you — we&apos;ll be in touch within 24 hours.
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                const data = Object.fromEntries(
                  new FormData(e.currentTarget) as unknown as Iterable<
                    [string, string]
                  >,
                );
                sendEnquiry(data, "contact");
                setBusy(false);
                setSent(true);
              }}
            >
              <div className="grid grid-cols-2 gap-5">
                <input name="name" required placeholder="Your name" className={field} />
                <input
                  name="contact"
                  required
                  placeholder="Phone or email"
                  className={field}
                />
              </div>
              <select name="location" className={field}>
                <option value="">Where is your property?</option>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your property"
                className="w-full rounded-sm border border-forest/15 bg-white px-4 py-4 text-body text-ink transition placeholder:text-ink/35 focus:border-blue focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy}
                className="h-14 w-full cursor-pointer rounded-sm bg-blue text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-blue-bright disabled:opacity-60"
              >
                {busy ? "Sending…" : contact.submitLabel}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="bg-forest-deep">
      <div className="wrap flex items-center justify-between py-[3.5rem]">
        <img
          src="/brand/logo-shield.png"
          alt="Leona Properties"
          className="h-10 w-auto brightness-0 invert"
        />
        <p className="text-[0.85rem] text-white/45">
          © {new Date().getFullYear()} Leona Group (Pvt) Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
