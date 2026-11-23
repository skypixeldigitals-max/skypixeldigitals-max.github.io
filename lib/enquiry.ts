import { brand } from "@/lib/content";

/**
 * Static hosting (GitHub Pages) has no server, so an enquiry opens WhatsApp
 * with the visitor's details already typed into a message to Leona. They
 * press send there. Works on phones (the app) and laptops (WhatsApp Web).
 * Throws if the browser refused to open anything, so the form can say so.
 */
export function sendEnquiry(
  data: Record<string, string>,
  source: "calculator" | "contact" | "concierge",
) {
  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${LABELS[k] ?? k[0].toUpperCase() + k.slice(1)}: ${v}`);
  const subject = {
    calculator: "Rental estimate request",
    contact: "Property enquiry",
    concierge: "Leona Concierge demo request",
  }[source];
  const text = `${subject}\n\n${lines.join("\n")}\n\n(sent from the Leona website)`;
  const number = brand.phoneHref.replace(/\D/g, "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  const w = window.open(url, "_blank");
  if (w) {
    w.opener = null;
    return;
  }
  // Pop-up blocked: open it in this tab instead.
  window.location.href = url;
}

/** Field names → the labels a person reads in the WhatsApp message. */
const LABELS: Record<string, string> = {
  contact: "Phone or email",
  location: "Location",
  name: "Name",
  message: "Message",
  property: "Business and area",
  rooms: "Rooms or vehicles",
  phone: "Phone",
};
