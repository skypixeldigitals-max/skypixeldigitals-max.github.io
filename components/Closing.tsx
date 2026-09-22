"use client";

import { sendEnquiry } from "@/lib/enquiry";
import { useEffect, useRef, useState } from "react";
import { dashboard, alaCarte, contact, brand, locations } from "@/lib/content";
import { Labelled, WhatsAppFallback, WhatsAppIcon } from "@/components/Chrome";

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
        <div className="grid grid-cols-2 items-start gap-24 max-md:grid-cols-1 max-md:gap-8">
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
              loading="lazy"
              decoding="async"
              src="/brand/dashboard-mock.webp"
              alt="The Leona owner dashboard showing revenue, occupancy, upcoming bookings and maintenance"
              className="w-full"
            />
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-3 gap-x-14 gap-y-12 max-md:grid-cols-1 max-md:gap-y-8">
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

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches; // no lane on phones
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
        <div className="flex items-end justify-between gap-16 max-md:flex-col max-md:items-start max-md:gap-6">
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

      <div ref={laneRef} className="relative mt-12 h-[20rem] max-md:hidden">
        <img
          ref={carRef}
          src="/brand/car.webp"
          alt="A Leona Properties branded vehicle"
          className="absolute right-[6vw] bottom-0 w-[46rem] max-w-none"
          style={{ opacity: 0, transform: "translateX(68vw)" }}
        />
      </div>

      <div className="wrap pb-[7.5rem] max-md:pt-12 max-md:pb-20">
        <div className="grid grid-cols-3 gap-x-12 max-md:grid-cols-1 max-md:gap-y-14">
          {alaCarte.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="group flex h-full flex-col">
                <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-sm bg-forest-deep">
                  <img
                    loading="lazy"
                    decoding="async"
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
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase transition group-hover:gap-4"
                >
                  Ask about this
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
    "h-14 w-full rounded-sm border border-forest/15 bg-white px-4 text-body text-ink transition placeholder:text-ink/55 focus:border-blue";

  return (
    <section id="contact" data-chapter="10" data-tone="light" className="bg-paper">
      <div className="wrap section grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-12">
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
            <dl className="mt-14 space-y-7 max-md:mt-10">
              {[
                ["Phone", brand.phone, brand.phoneHref],
                ["WhatsApp", brand.phone, brand.whatsapp],
                ["Email", brand.email, `mailto:${brand.email}`],
                ["Response time", brand.responseTime, ""],
              ].map(([k, v, href]) => (
                <div key={k}>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.24em] text-muted uppercase">
                    {k}
                  </dt>
                  <dd className="mt-2 text-body text-forest">
                    {href ? (
                      <a
                        href={href}
                        className="inline-flex min-h-8 items-center gap-2 underline-offset-4 hover:underline"
                        {...(k === "WhatsApp" ? { target: "_blank", rel: "noopener" } : {})}
                      >
                        {k === "WhatsApp" && <WhatsAppIcon className="h-4 w-4" />}
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
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
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <Labelled label="Your name" id="c-name" tone="light">
                  <input id="c-name" name="name" autoComplete="name" required placeholder="Your name" className={field} />
                </Labelled>
                <Labelled label="Phone or email" id="c-contact" tone="light">
                  <input id="c-contact" name="contact" autoComplete="tel" required placeholder="+94 77 000 0000" className={field} />
                </Labelled>
              </div>
              <Labelled label="Where is your property?" id="c-loc" tone="light">
                <select id="c-loc" name="location" className={field}>
                  <option value="">Select…</option>
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </Labelled>
              <Labelled label="Tell us about it" id="c-msg" tone="light">
                <textarea
                  id="c-msg"
                  name="message"
                  rows={5}
                  placeholder="Bedrooms, how it's run today, what you'd like to change"
                  className="w-full rounded-sm border border-forest/15 bg-white px-4 py-4 text-body text-ink transition placeholder:text-ink/55 focus:border-blue"
                />
              </Labelled>
              <button
                type="submit"
                disabled={busy}
                className="h-14 w-full cursor-pointer rounded-sm bg-blue text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-blue-bright disabled:opacity-60"
              >
                {busy ? "Sending…" : contact.submitLabel}
              </button>
              <WhatsAppFallback tone="light" />
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Footer() {
  const links: [string, string][] = [
    ["#services", "What we do"],
    ["#locations", "Where we work"],
    ["#team", "Who we are"],
    ["#enquire", "Get an estimate"],
    ["/dashboard", "Owner dashboard"],
  ];
  return (
    <footer className="bg-forest-deep max-md:pb-24">
      <div className="wrap grid grid-cols-[auto_1fr_auto] items-start gap-16 py-[3.5rem] max-md:grid-cols-1 max-md:gap-10">
        <div>
          <img loading="lazy" src="/brand/logo-shield.webp" alt="Leona Properties" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-[16rem] text-sm leading-[1.7] text-white/55">
            Villa care on Sri Lanka&apos;s south coast. Powering Ceylon stays.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 max-md:grid-cols-1">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="inline-flex min-h-9 items-center text-sm text-white/70 transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="text-sm text-white/70">
          <a href={brand.phoneHref} className="inline-flex min-h-9 items-center hover:text-white">{brand.phone}</a>
          <br />
          <a href={`mailto:${brand.email}`} className="inline-flex min-h-9 items-center hover:text-white">{brand.email}</a>
          <br />
          <a href={brand.whatsapp} target="_blank" rel="noopener" className="inline-flex min-h-9 items-center gap-2 hover:text-white">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
      <div className="wrap border-t border-white/10 py-6 text-[0.8rem] text-white/60">
        © {new Date().getFullYear()} Leona Group (Pvt) Ltd. All rights reserved.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Proof. Off until there are real numbers — the placeholders are obvious on
 * purpose so nothing invented can ship by accident. Flip SHOW_PROOF and
 * replace the values when a case study or an owner quote exists.
 */
export const SHOW_PROOF = false;

export function Proof() {
  if (!SHOW_PROOF) return null;
  const stats: [string, string][] = [
    ["XX%", "occupancy after 6 months"],
    ["LKR XX,XXX", "average nightly rate"],
    ["X.X", "guest review score"],
  ];
  return (
    <section data-chapter="02" data-tone="light" className="bg-bone">
      <div className="wrap section grid grid-cols-[1fr_1.1fr] gap-20 max-md:grid-cols-1 max-md:gap-10">
        <div>
          <span className="eyebrow">Villa E32 · Ahangama</span>
          <h2 className="h-display mt-6 text-forest">
            What changed
            <br />
            <span className="accent text-gold">in six months</span>
          </h2>
          <dl className="mt-12 grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {stats.map(([v, l]) => (
              <div key={l} className="border-t border-rule pt-5">
                <dd className="font-display text-[2.4rem] leading-none text-forest tabular-nums">{v}</dd>
                <dt className="mt-3 text-sm text-muted">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
        <blockquote className="border-l-2 border-gold pl-8 max-md:pl-6">
          <p className="font-display text-[1.6rem] leading-[1.35] text-forest">
            &ldquo;Owner quote goes here — one or two sentences in their own words.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-muted">Owner name, Villa E32</footer>
        </blockquote>
      </div>
    </section>
  );
}
