import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Pinyon_Script } from "next/font/google";
import "./globals.css";

/**
 * Three faces, three jobs — modelled on ERA Residence's pairing but with free
 * Google equivalents:
 *   display  Playfair Display  (Didone; stands in for Ambroise François)
 *   accent   Pinyon Script     (the single lowercase word inside a caps line)
 *   body     Montserrat        (the brand face from the Figma file)
 */
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const accent = Pinyon_Script({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
});

const body = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE = "https://skypixeldigitals-max.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Leona Properties — Villa Care on Sri Lanka's South Coast",
  description:
    "Property management, interior design, listing optimisation and content for villas from Hikkaduwa to Tangalle. Ask for a free earnings estimate — we reply within 24 hours.",
  openGraph: {
    title: "Leona Properties — Powering Ceylon Stays",
    description:
      "Villa management on Sri Lanka's south coast: upkeep, design, listings and content, done properly.",
    url: SITE,
    siteName: "Leona Properties",
    type: "website",
    locale: "en_LK",
  },
  twitter: { card: "summary_large_image" },
};

/** Local-business markup for Google; mirrors lib/content brand details. */
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Leona Properties",
  url: SITE,
  telephone: "+94740591853",
  email: "leonaproperties1@gmail.com",
  areaServed: ["Galle", "Unawatuna", "Ahangama", "Weligama", "Mirissa", "Hikkaduwa", "Tangalle", "Colombo"],
  address: { "@type": "PostalAddress", addressLocality: "Galle", addressCountry: "LK" },
  makesOffer: ["Property management", "Interior design & architecture", "Listing optimisation", "Content creation"].map(
    (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } }),
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${accent.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
