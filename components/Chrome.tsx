"use client";

import { sendEnquiry } from "@/lib/enquiry";
import { useEffect, useState } from "react";
import { brand, locations } from "@/lib/content";

const SECTIONS: [string, string][] = [
  ["#services", "What we do"],
  ["#locations", "Where we work"],
  ["#team", "Who we are"],
  ["#enquire", "Get an estimate"],
  ["#contact", "Contact"],
];

/** WhatsApp glyph, single path, inherits currentColor. */
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28" />
    </svg>
  );
}

/**
 * ERA's chrome: rotating mark top-left, serif primary top-right with tracked
 * secondaries. Phones get a menu button instead of the secondaries and a
 * sticky bar once the hero is gone.
 */
export function Nav() {
  const [menu, setMenu] = useState(false);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const top = document.getElementById("top");
    if (!top) return;
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(top);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className="pointer-events-none fixed inset-0 z-40">
      {/* ---- rotating round logo, top-left (ERA's mark) ---- */}
      <a
        href="#top"
        aria-label="Leona Properties · Leona Properties · back to top"
        className="pointer-events-auto absolute top-8 left-[3.5vw] z-10 grid h-[6.5rem] w-[6.5rem] place-items-center max-md:top-4 max-md:left-4 max-md:h-16 max-md:w-16"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] fill-white"
          aria-hidden
        >
          <defs>
            <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text fontSize="9.2" letterSpacing="2.6" fontFamily="var(--font-montserrat)" fontWeight="600">
            <textPath href="#ring">LEONA PROPERTIES · LEONA PROPERTIES ·</textPath>
          </text>
        </svg>
        <img src="/brand/logo-shield.webp" alt="" className="relative h-[2.1rem] w-auto brightness-0 invert max-md:h-5" />
      </a>

      {/* ---- top-right: serif primary, tracked secondaries ---- */}
      <nav
        aria-label="Primary"
        className="pointer-events-auto absolute top-8 right-[3.5vw] z-10 flex flex-col items-end gap-3 text-white max-md:top-4 max-md:right-4 max-md:flex-row max-md:items-center max-md:gap-4"
      >
        <a
          href="#enquire"
          className="font-display text-right text-[1.45rem] leading-[1.05] uppercase transition-opacity hover:opacity-70 max-md:text-[0.95rem] max-md:leading-none"
        >
          Get an
          <br className="max-md:hidden" /> estimate
        </a>
        <div className="flex flex-col items-end text-[0.62rem] font-semibold tracking-[0.3em] uppercase max-md:hidden">
          <a href={brand.whatsapp} target="_blank" rel="noopener" className="inline-flex min-h-8 items-center gap-2 transition-opacity hover:opacity-70">
            <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <a href="/dashboard" className="inline-flex min-h-8 items-center transition-opacity hover:opacity-70">
            Manage my property
          </a>
          <a href="#contact" className="inline-flex min-h-8 items-center transition-opacity hover:opacity-70">
            Contact
          </a>
        </div>
        <button
          type="button"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="menu"
          onClick={() => setMenu((m) => !m)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/50 md:hidden"
        >
          <span className="relative block h-3 w-4" aria-hidden>
            <span className={`absolute inset-x-0 top-0 h-px bg-white transition-transform ${menu ? "translate-y-[5.5px] rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-[5.5px] h-px bg-white transition-opacity ${menu ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-px bg-white transition-transform ${menu ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* ---- phone menu ---- */}
      <div
        id="menu"
        hidden={!menu}
        className="pointer-events-auto absolute inset-0 flex flex-col justify-end bg-forest-deep/95 px-6 pt-28 pb-10 text-white backdrop-blur-sm md:hidden"
        onClick={() => setMenu(false)}
      >
        <ul className="space-y-1" onClick={(e) => e.stopPropagation()}>
          {SECTIONS.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setMenu(false)}
                className="block border-b border-white/15 py-4 font-display text-[1.75rem] leading-none"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="/dashboard" onClick={() => setMenu(false)} className="block border-b border-white/15 py-4 font-display text-[1.75rem] leading-none">
              Owner dashboard
            </a>
          </li>
        </ul>
        <div className="mt-8 flex gap-3" onClick={(e) => e.stopPropagation()}>
          <a href={brand.phoneHref} className="flex h-12 flex-1 items-center justify-center rounded-sm border border-white/40 text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
            Call
          </a>
          <a href={brand.whatsapp} target="_blank" rel="noopener" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-blue text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      {/* ---- phone sticky bar, after the hero ---- */}
      <div
        className={`pointer-events-auto absolute inset-x-0 bottom-0 flex gap-2 border-t border-white/10 bg-forest-deep/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 md:hidden ${
          past && !menu ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a href="#enquire" className="flex h-12 flex-1 items-center justify-center rounded-sm bg-blue text-[0.72rem] font-semibold tracking-[0.2em] text-white uppercase">
          Get an estimate
        </a>
        <a href={brand.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp us" className="grid h-12 w-12 place-items-center rounded-sm border border-white/30 text-white">
          <WhatsAppIcon />
        </a>
      </div>
    </header>
  );
}

/** "Or reach us on WhatsApp" — under every submit, because mailto: is unreliable on phones. */
export function WhatsAppFallback({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const c = tone === "dark" ? "text-white/70 hover:text-white" : "text-muted hover:text-forest";
  return (
    <p className={`mt-5 text-sm ${c}`}>
      Prefer to message?{" "}
      <a href={brand.whatsapp} target="_blank" rel="noopener" className="inline-flex min-h-6 items-center gap-1.5 font-semibold underline underline-offset-4">
        <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
      </a>{" "}
      or call{" "}
      <a href={brand.phoneHref} className="font-semibold underline underline-offset-4">
        {brand.phone}
      </a>
      .
    </p>
  );
}

/**
 * The earnings band. Captures a lead only — the figure comes back by hand
 * within 24 hours, and the copy says exactly that.
 */
export function Calculator() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const field =
    "h-14 w-full rounded-sm border border-white/20 bg-white/[0.04] px-4 text-body text-white transition placeholder:text-white/50 focus:border-blue-bright focus:bg-white/[0.07]";

  return (
    <section id="enquire" data-chapter="03" data-tone="dark" className="scroll-mt-16 bg-forest">
      <div className="wrap section">
        <div className="flex items-end justify-between gap-20 max-md:flex-col max-md:items-start max-md:gap-8">
          <div>
            <span className="eyebrow">Free estimate · reply within 24 hours</span>
            <h2 className="h-display mt-6 text-white">
              How much can your
              <br />
              <span className="accent text-gold">rental</span> earn?
            </h2>
          </div>
          <p className="max-w-[24rem] pb-2 text-body leading-[1.75] text-white/75">
            Most villa rental owners earn{" "}
            <strong className="font-semibold text-white">30–40% less</strong>{" "}
            than they should be at the start. Tell us where yours is and we&apos;ll
            send a figure checked by hand — not a calculator guess.
          </p>
        </div>

        <div className="mt-14 h-px w-full bg-white/12" />

        {sent ? (
          <p role="status" className="mt-14 max-w-[42rem] border-l-2 border-gold pl-6 text-body leading-[1.75] text-white/85">
            Thank you — we have your details. We&apos;ll look at your property,
            check the market, and come back to you within 24 hours.
          </p>
        ) : (
          <form
            className="mt-14 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-5 max-md:grid-cols-1"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setError("");
              const data = Object.fromEntries(
                new FormData(e.currentTarget) as unknown as Iterable<[string, string]>,
              );
              try {
                sendEnquiry(data, "calculator");
                setSent(true);
              } catch {
                setError("Couldn't open your mail app — use WhatsApp below, or email us directly.");
              } finally {
                setBusy(false);
              }
            }}
          >
            <Labelled label="Location" id="loc">
              <select id="loc" name="location" required className={field}>
                <option value="">Select…</option>
                {locations.map((l) => (
                  <option key={l} className="text-ink">
                    {l}
                  </option>
                ))}
              </select>
            </Labelled>

            <Labelled label="Phone" id="tel">
              <input id="tel" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+94 77 000 0000" className={field} />
            </Labelled>

            <Labelled label="Email" id="mail">
              <input id="mail" name="email" type="email" inputMode="email" autoComplete="email" required placeholder="you@example.com" className={field} />
            </Labelled>

            <button
              type="submit"
              disabled={busy}
              className="h-14 cursor-pointer rounded-sm bg-blue px-12 text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-blue-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="swap">
                <span>{busy ? "Sending…" : "Request my estimate"}</span>
                <span aria-hidden>{busy ? "Sending…" : "Request my estimate"}</span>
              </span>
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="mt-5 text-body text-gold">
            {error}
          </p>
        )}
        {!sent && <WhatsAppFallback />}
      </div>
    </section>
  );
}

export function Labelled({
  label,
  id,
  children,
  tone = "dark",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className={`mb-3 block text-[0.68rem] font-semibold tracking-[0.24em] uppercase ${
          tone === "dark" ? "text-white/60" : "text-muted"
        }`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
