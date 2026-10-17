import type { Metadata } from "next";
import { Footer } from "@/components/Closing";
import { WhatsAppIcon } from "@/components/Chrome";
import ConciergeForm from "@/components/ConciergeForm";
import Savings from "@/components/Savings";
import {
  audiences,
  conciergeWhatsApp,
  differences,
  faqs,
  languages,
  plans,
  sampleCall,
  steps,
} from "@/lib/concierge";

export const metadata: Metadata = {
  title: "Leona Concierge | 24/7 digital concierge for villas in Sri Lanka",
  description:
    "Leona Concierge answers your guests' calls day and night in 11 languages, sells airport pickups and tours, and only alerts you when something really needs you. Built by villa managers on Sri Lanka's south coast.",
  openGraph: {
    title: "Leona Concierge | Your guests, answered day and night",
    description:
      "A digital concierge for villas and boutique hotels in Sri Lanka. Answers guests 24/7, sells extras, alerts you only when it matters.",
    url: "/concierge/",
    siteName: "Leona Properties",
    type: "website",
    locale: "en_LK",
  },
};

const btnPrimary =
  "inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-blue px-10 text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-blue-bright";
const btnGhost =
  "inline-flex h-14 items-center justify-center rounded-sm border px-10 text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition";

function Heading({ eyebrow, children, tone = "light" }: { eyebrow: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={`h-display mt-6 ${tone === "dark" ? "text-white" : "text-blue-deep"}`}>{children}</h2>
    </div>
  );
}

export default function Concierge() {
  return (
    <>
      {/* ---- top bar ---- */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="wrap flex h-24 items-center justify-between max-md:h-20">
          <a href="/" className="flex items-center gap-3 text-white">
            <img src="/brand/logo-shield.webp" alt="" className="h-9 w-auto brightness-0 invert max-md:h-7" />
            <span className="text-[0.7rem] font-semibold tracking-[0.36em] uppercase max-md:text-[0.62rem]">
              Leona Properties
            </span>
          </a>
          <nav aria-label="Concierge" className="flex items-center gap-8 text-[0.68rem] font-semibold tracking-[0.24em] text-white uppercase">
            <a href="#how" className="max-md:hidden hover:opacity-70">How it works</a>
            <a href="#savings" className="max-md:hidden hover:opacity-70">Savings</a>
            <a href="#packages" className="max-md:hidden hover:opacity-70">Packages</a>
            <a href="#faq" className="max-md:hidden hover:opacity-70">FAQ</a>
            <a href="#demo" className="rounded-sm border border-white/50 px-5 py-3 hover:bg-white hover:text-forest">Book a demo</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ---- hero ---- */}
        <section id="top" data-tone="dark" className="bg-forest">
          <div className="wrap grid grid-cols-[1.15fr_1fr] items-center gap-20 pt-[11rem] pb-[7.5rem] max-md:grid-cols-1 max-md:gap-14 max-md:pt-32 max-md:pb-16">
            <div>
              <span className="eyebrow">Leona Concierge · Digital concierge for villas</span>
              <h1 className="h-display mt-6 text-white">
                Your guests, answered
                <br />
                <span className="accent text-gold">day and night</span>
              </h1>
              <p className="copy mt-8 text-lead leading-[1.6] text-white/80">
                Leona Concierge picks up when your guests call, in their own language, at any
                hour. It sorts their questions, sells the airport pickup, and only reaches you
                when something really needs you.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#demo" className={btnPrimary}>Book a demo</a>
                <a href="#packages" className={`${btnGhost} border-white/40 text-white hover:bg-white hover:text-forest`}>
                  See packages
                </a>
              </div>
              <p className="mt-8 text-sm text-white/60">
                From Rs 19,900 a month, under a quarter of a receptionist&apos;s salary ·{" "}
                {languages.length} languages · Built in Galle
              </p>
            </div>

            {/* sample call */}
            <figure className="rounded-sm border border-white/15 bg-forest-deep p-7 max-md:p-5" aria-label="A real test call, trimmed">
              <figcaption className="flex items-center justify-between border-b border-white/10 pb-4 text-[0.68rem] font-semibold tracking-[0.24em] text-white/60 uppercase">
                <span>Guest line · Seaview Villa</span>
                <span className="text-gold">Live call</span>
              </figcaption>
              <ul className="mt-5 space-y-3">
                {sampleCall.map((m, i) =>
                  m.who === "alert" ? (
                    <li key={i} className="border-l-2 border-gold bg-white/[0.04] px-4 py-2.5 text-[0.8rem] leading-[1.5] text-gold">
                      {m.text}
                    </li>
                  ) : (
                    <li key={i} className={`flex ${m.who === "guest" ? "justify-end" : ""}`}>
                      <span
                        className={`max-w-[85%] rounded-sm px-4 py-2.5 text-sm leading-[1.55] ${
                          m.who === "guest" ? "bg-blue text-white" : "bg-white/[0.08] text-white/90"
                        }`}
                      >
                        {m.text}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </figure>
          </div>
        </section>

        {/* ---- the problem ---- */}
        <section data-tone="light" className="bg-bone">
          <div className="wrap section grid grid-cols-[1fr_1fr] gap-20 max-md:grid-cols-1 max-md:gap-10">
            <Heading eyebrow="The 3 am problem">
              Locked out.
              <br />
              <span className="accent">Who</span> picks up?
            </Heading>
            <div className="copy space-y-5 self-end text-muted">
              <p>
                Guests don&apos;t keep office hours. The keypad dies at midnight, the flight is
                at 6 am, someone wants to know if the beach is walkable in the rain. Every one
                of those lands on your phone, or goes unanswered.
              </p>
              <p>
                Leave them and you get a three-star review. Answer them all yourself and you
                never really switch off. Hire someone and you&apos;re paying a full salary for
                a phone that rings a few times a night.
              </p>
              <p className="font-semibold text-ink">
                Leona Concierge takes those calls. You only hear about the ones that need you.
              </p>
            </div>
          </div>
        </section>

        {/* ---- cost vs a receptionist ---- */}
        <section id="savings" data-tone="light" className="scroll-mt-10 bg-white">
          <div className="wrap section">
            <div className="flex items-end justify-between gap-20 max-md:flex-col max-md:items-start max-md:gap-6">
              <Heading eyebrow="What it costs you now">
                A receptionist,
                <br />
                minus the <span className="accent">payroll</span>
              </Heading>
              <p className="max-w-[26rem] pb-2 text-body leading-[1.75] text-muted">
                An experienced receptionist who speaks a few languages costs Rs 80,000 to
                150,000 a month, before EPF and ETF. One person covers one shift. Answering
                guests at night means hiring three.
              </p>
            </div>
            <Savings />
          </div>
        </section>

        {/* ---- how it works ---- */}
        <section id="how" data-tone="light" className="scroll-mt-10 bg-white">
          <div className="wrap section">
            <Heading eyebrow="How it works">
              Live in <span className="accent">three</span> steps
            </Heading>
            <ol className="mt-16 grid grid-cols-3 gap-px border border-rule bg-rule max-md:grid-cols-1">
              {steps.map((s, i) => (
                <li key={s.title} className="bg-white p-10 max-md:p-7">
                  <span className="font-display text-title text-gold-text">0{i + 1}</span>
                  <h3 className="h-title mt-6 text-blue-deep">{s.title}</h3>
                  <p className="mt-4 text-body leading-[1.75] text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- who it's for ---- */}
        <section data-tone="light" className="bg-paper">
          <div className="wrap section grid grid-cols-[1fr_1.4fr] gap-20 max-md:grid-cols-1 max-md:gap-10">
            <Heading eyebrow="Who it's for">
              Made for <span className="accent">small</span> stays
            </Heading>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-10 max-md:grid-cols-1 max-md:gap-y-8">
              {audiences.map((a) => (
                <li key={a.title} className="border-t border-rule pt-6">
                  <h3 className="text-lead font-semibold text-ink">{a.title}</h3>
                  <p className="mt-3 text-body leading-[1.7] text-muted">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- why different / built by ---- */}
        <section data-tone="dark" className="bg-forest">
          <div className="wrap section">
            <div className="flex items-end justify-between gap-20 max-md:flex-col max-md:items-start max-md:gap-8">
              <Heading eyebrow="Why Leona Concierge" tone="dark">
                Built by people
                <br />
                who <span className="accent text-gold">run</span> villas
              </Heading>
              <p className="max-w-[26rem] pb-2 text-body leading-[1.75] text-white/75">
                Leona Properties manages villas on Sri Lanka&apos;s south coast. We built the
                concierge for the villas we look after, and now we offer it to other owners.
              </p>
            </div>
            <ul className="mt-16 grid grid-cols-3 gap-px bg-white/10 max-md:grid-cols-1">
              {differences.map((d) => (
                <li key={d.title} className="bg-forest p-9 max-md:px-0 max-md:py-7">
                  <h3 className="text-lead font-semibold text-white">{d.title}</h3>
                  <p className="mt-3 text-body leading-[1.7] text-white/70">{d.text}</p>
                </li>
              ))}
              <li className="flex flex-col justify-between bg-forest-deep p-9 max-md:p-7">
                <p className="font-display text-title leading-[1.2] text-white">Hear it for yourself.</p>
                <a href="#demo" className={`${btnPrimary} mt-8 self-start`}>Book a demo</a>
              </li>
            </ul>
          </div>
        </section>

        {/* ---- packages ---- */}
        <section id="packages" data-tone="light" className="scroll-mt-10 bg-bone">
          <div className="wrap section">
            <div className="flex items-end justify-between gap-20 max-md:flex-col max-md:items-start max-md:gap-6">
              <Heading eyebrow="Packages · prices in LKR">
                Pick your <span className="accent">plan</span>
              </Heading>
              <p className="max-w-[24rem] pb-2 text-body leading-[1.75] text-muted">
                Every plan includes the voice concierge, Sinhala on WhatsApp and instant owner
                alerts. Lower rates from May to October.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {plans.map((p) => (
                <article
                  key={p.name}
                  className={`flex flex-col rounded-sm border p-9 max-md:p-7 ${
                    p.featured ? "border-forest bg-forest text-white" : "border-rule bg-white"
                  }`}
                >
                  <span
                    className={`self-start rounded-[2px] px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.2em] uppercase ${
                      p.featured ? "bg-gold text-forest-deep" : "invisible"
                    }`}
                  >
                    Most popular
                  </span>
                  <h3 className="mt-4 font-display text-title tracking-[0.04em] uppercase">{p.name}</h3>
                  <p className={`mt-2 text-sm ${p.featured ? "text-white/70" : "text-muted"}`}>{p.forWho}</p>
                  <div className={`mt-7 border-t pt-6 ${p.featured ? "border-white/15" : "border-rule"}`}>
                    <p>
                      <span className="text-[2.4rem] font-semibold tracking-tight">Rs {p.price}</span>
                      <span className={`ml-1 text-sm ${p.featured ? "text-white/70" : "text-muted"}`}>/ month</span>
                    </p>
                    <p className={`mt-2 text-sm ${p.featured ? "text-white/70" : "text-muted"}`}>
                      Rs {p.low} / month May to Oct · Setup Rs {p.setup}
                    </p>
                  </div>
                  <ul className="mt-7 space-y-3.5">
                    {p.intro && (
                      <li className={`text-sm font-semibold ${p.featured ? "text-gold" : "text-gold-text"}`}>{p.intro}</li>
                    )}
                    {p.items.map((it) => (
                      <li key={it.text} className="flex gap-3 text-body leading-[1.5]">
                        <span aria-hidden className="mt-[0.45rem] h-2 w-2 shrink-0 rotate-45 border-[1.5px] border-gold" />
                        <span>
                          {it.text}
                          {it.soon && (
                            <span className={`ml-2 text-[0.62rem] font-semibold tracking-[0.16em] uppercase ${p.featured ? "text-gold" : "text-gold-text"}`}>
                              Soon
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <a
                      href="#demo"
                      className={`${btnGhost} w-full ${
                        p.featured
                          ? "border-gold bg-gold text-forest-deep hover:bg-gold-bright"
                          : "border-forest text-forest hover:bg-forest hover:text-white"
                      }`}
                    >
                      Start with {p.name}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-[1fr_auto] items-center gap-8 border-t border-rule pt-8 max-md:grid-cols-1">
              <p className="text-body text-ink">
                <strong className="font-semibold">Founding offer:</strong> the first 3 properties get 50% off
                setup and the first month free.
              </p>
              <p className="text-sm text-muted">
                Extra call minutes Rs 65 · Extra WhatsApp replies Rs 20 · <span className="text-gold-text font-semibold">Soon</span> = launching with WhatsApp
              </p>
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section id="faq" data-tone="light" className="scroll-mt-10 bg-white">
          <div className="wrap section grid grid-cols-[1fr_1.6fr] gap-20 max-md:grid-cols-1 max-md:gap-10">
            <Heading eyebrow="Questions owners ask">
              Good to <span className="accent">know</span>
            </Heading>
            <div className="border-t border-rule">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-rule">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lead text-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <span aria-hidden className="text-title leading-none text-gold-text transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="copy pb-6 text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- demo request ---- */}
        <section id="demo" data-tone="dark" className="scroll-mt-10 bg-forest">
          <div className="wrap section">
            <div className="flex items-end justify-between gap-20 max-md:flex-col max-md:items-start max-md:gap-8">
              <Heading eyebrow="Free demo · reply within 24 hours" tone="dark">
                Call it. Then
                <br />
                <span className="accent text-gold">decide</span>.
              </Heading>
              <div className="max-w-[24rem] pb-2">
                <p className="text-body leading-[1.75] text-white/75">
                  Tell us about your property and we&apos;ll set up a short demo where you call
                  the concierge yourself, lockout, airport run and all.
                </p>
                <a href={conciergeWhatsApp} target="_blank" rel="noopener" className={`${btnGhost} mt-6 gap-2 border-white/40 text-white hover:bg-white hover:text-forest`}>
                  <WhatsAppIcon className="h-4 w-4" /> Message us instead
                </a>
              </div>
            </div>
            <div className="mt-14 h-px w-full bg-white/12" />
            <ConciergeForm />
            <p className="mt-10 text-sm text-white/50">
              Leona Concierge is a digital assistant. It tells guests so, and hands anything it
              can&apos;t handle to you or your team.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
