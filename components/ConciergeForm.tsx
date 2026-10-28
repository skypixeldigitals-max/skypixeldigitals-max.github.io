"use client";

import { useState } from "react";
import { sendEnquiry } from "@/lib/enquiry";
import { Labelled, WhatsAppFallback } from "@/components/Chrome";

/** Demo request. Same mailto route as the main site's forms. */
export default function ConciergeForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const field =
    "h-14 w-full rounded-sm border border-white/20 bg-white/[0.04] px-4 text-body text-white transition placeholder:text-white/50 focus:border-blue-bright focus:bg-white/[0.07]";

  if (sent) {
    return (
      <p role="status" className="mt-14 max-w-[42rem] border-l-2 border-gold pl-6 text-body leading-[1.75] text-white/85">
        Thank you. We&apos;ll message you within 24 hours to set up a short demo call
        with a concierge trained on a real property.
      </p>
    );
  }

  return (
    <>
      <form
        className="mt-14 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-5 max-md:grid-cols-1"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          const data = Object.fromEntries(
            new FormData(e.currentTarget) as unknown as Iterable<[string, string]>,
          );
          try {
            sendEnquiry(data, "concierge");
            setSent(true);
          } catch {
            setError("Couldn't open your mail app. Use WhatsApp below instead.");
          }
        }}
      >
        <Labelled label="Business and area" id="c-prop">
          <input id="c-prop" name="property" required placeholder="Hotel, villa or tour company, area" className={field} />
        </Labelled>
        <Labelled label="Rooms or vehicles" id="c-rooms">
          <input id="c-rooms" name="rooms" type="number" min={1} inputMode="numeric" placeholder="4" className={field} />
        </Labelled>
        <Labelled label="Phone or WhatsApp" id="c-tel">
          <input id="c-tel" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+94 77 000 0000" className={field} />
        </Labelled>
        <button
          type="submit"
          className="h-14 cursor-pointer rounded-sm bg-blue px-12 text-[0.78rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-blue-bright"
        >
          <span className="swap">
            <span>Book a demo</span>
            <span aria-hidden>Book a demo</span>
          </span>
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-5 text-body text-gold">
          {error}
        </p>
      )}
      <WhatsAppFallback />
    </>
  );
}
