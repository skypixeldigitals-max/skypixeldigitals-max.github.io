import { faq } from "@/lib/content";

/**
 * Questions owners ask. Plain <details> rows, so it needs no JavaScript and
 * every answer is in the page for search engines. The matching FAQPage
 * markup describes the same questions to Google and AI search tools.
 */
export default function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq" data-tone="dark" className="bg-forest">
      <div className="wrap section grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-20 max-md:grid-cols-1 max-md:gap-10">
        <div>
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 className="h-display mt-6 text-white">{faq.title}</h2>
        </div>

        <div className="border-t border-white/15">
          {faq.items.map(({ q, a }) => (
            <details key={q} className="group border-b border-white/15">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lead font-medium text-white [&::-webkit-details-marker]:hidden">
                <h3 className="text-left">{q}</h3>
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30 text-gold transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[40rem] pb-6 text-body leading-[1.75] text-white/75">{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
