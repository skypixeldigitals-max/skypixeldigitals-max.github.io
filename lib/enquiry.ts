import { brand } from "@/lib/content";

/**
 * Static hosting (GitHub Pages) has no server, so enquiries open a pre-filled
 * email in the visitor's mail app. Swap this for a POST to /api/enquiry once
 * the site moves to a host that runs the route.
 */
export function sendEnquiry(
  data: Record<string, string>,
  source: "calculator" | "contact",
) {
  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v}`);
  const subject =
    source === "calculator" ? "Rental estimate request" : "Property enquiry";
  const body = `${lines.join("\n")}\n\n— sent from leona properties website`;
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
