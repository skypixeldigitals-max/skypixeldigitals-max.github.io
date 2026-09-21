"use client";

import { useState } from "react";
import { locations } from "@/lib/content";

/**
 * Sits over the villa journey as a transparent bar, then picks up a solid
 * forest background once the journey is behind you.
 */
export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-0 z-40">
      {/* ---- rotating round logo, top-left (ERA's mark) ---- */}
      <a
        href="#top"
        aria-label="Leona Properties — back to top"
        className="pointer-events-auto absolute top-8 left-[3.5vw] grid h-[6.5rem] w-[6.5rem] place-items-center"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] fill-white"
          aria-hidden
        >
          <defs>
            <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text
            fontSize="9.2"
            letterSpacing="2.6"
            fontFamily="var(--font-montserrat)"
            fontWeight="600"
          >
            <textPath href="#ring">LEONA PROPERTIES · LEONA PROPERTIES ·</textPath>
          </text>
        </svg>
        <img
          src="/brand/logo-shield.png"
          alt=""
          className="relative h-[2.1rem] w-auto brightness-0 invert"
        />
      </a>

      {/* ---- top-right: serif primary, tracked secondaries ---- */}
      <nav className="pointer-events-auto absolute top-8 right-[3.5vw] flex flex-col items-end gap-4 text-white">
        <a
          href="#enquire"
          className="font-display text-right text-[1.45rem] leading-[1.05] uppercase transition-opacity hover:opacity-70"
        >
          Get an
          <br />
          estimate
        </a>
        <div className="flex flex-col items-end gap-1.5 text-[0.62rem] font-semibold tracking-[0.3em] uppercase">
          <a href="/dashboard" className="transition-opacity hover:opacity-70">
            Manage my property
          </a>
          <a href="#contact" className="transition-opacity hover:opacity-70">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

/**
 * The earnings band. Captures a lead only — no figure is shown on screen, so
 * nothing is promised that hasn't been checked by hand.
 */
export function Calculator() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const field =
    "h-14 w-full rounded-sm border border-white/20 bg-white/[0.04] px-4 text-body text-white transition placeholder:text-white/35 focus:border-blue-bright focus:bg-white/[0.07] focus:outline-none";

  return (
    <section id="enquire" data-chapter="03" data-tone="dark" className="bg-forest">
      <div className="wrap section">
        <div className="flex items-end justify-between gap-20">
          <div>
            <span className="eyebrow">
              Free · No obligation
            </span>
            <h2 className="h-display mt-6 text-white">
              How much can your
              <br />
              <span className="accent text-gold">rental</span> earn?
            </h2>
          </div>
          <p className="max-w-[24rem] pb-2 text-body leading-[1.75] text-white/75">
            Most villa rental owners earn{" "}
            <strong className="font-semibold text-white">30–40% less</strong>{" "}
            than they should be at the start. Find out what yours could make.
          </p>
        </div>

        <div className="mt-14 h-px w-full bg-white/12" />

        {sent ? (
          <p
            role="status"
            className="mt-14 max-w-[42rem] border-l-2 border-gold pl-6 text-body leading-[1.75] text-white/85"
          >
            Thank you — we have your details. We&apos;ll look at your property,
            check the market, and come back to you within 24 hours.
          </p>
        ) : (
          <form
            className="mt-14 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setError("");
              const data = Object.fromEntries(
                new FormData(e.currentTarget) as unknown as Iterable<
                  [string, string]
                >,
              );
              try {
                const res = await fetch("/api/enquiry", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...data, source: "calculator" }),
                });
                if (!res.ok) throw new Error();
                setSent(true);
              } catch {
                setError("Couldn't send that — please try again.");
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
              <input
                id="tel"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="+94 77 000 0000"
                className={field}
              />
            </Labelled>

            <Labelled label="Email" id="mail">
              <input
                id="mail"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={field}
              />
            </Labelled>

            <button
              type="submit"
              disabled={busy}
              className="h-14 cursor-pointer rounded-sm bg-blue px-12 text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-blue-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="swap">
                <span>{busy ? "Sending…" : "Get estimate"}</span>
                <span aria-hidden>{busy ? "Sending…" : "Get estimate"}</span>
              </span>
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="mt-5 text-body text-gold">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

function Labelled({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-3 block text-[0.68rem] font-semibold tracking-[0.24em] text-white/50 uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
