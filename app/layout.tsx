import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

/**
 * Two faces, two jobs, both free on Google Fonts:
 *   display  Playfair Display  (Didone; stands in for Ambroise François; gold accent words too)
 *   body     Montserrat        (the brand face from the Figma file)
 */
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const body = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE = "https://leonamanagement.com";

/** Phone browsers tint their address bar with this: the brand's deep forest. */
export const viewport: Viewport = {
  themeColor: "#133026",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Villa & Airbnb Management in Sri Lanka | Leona Properties",
  description:
    "Villa and Airbnb management in Galle, Mirissa, Weligama and along Sri Lanka's south coast. Guests, upkeep, listings and design. Free estimate within 24 hours.",
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

/**
 * Business details for Google; mirrors lib/content brand details. A service-
 * area business: no base address, just the places Leona covers.
 */
const AREAS = ["Galle", "Unawatuna", "Ahangama", "Weligama", "Mirissa", "Hikkaduwa", "Tangalle", "Colombo"];
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#business`,
  name: "Leona Properties",
  // Other names people search for, and the company behind the brand.
  alternateName: ["Leona", "Leona Management", "Leona Properties Sri Lanka"],
  legalName: "Leona Group (Pvt) Ltd",
  slogan: "Powering Ceylon Stays",
  url: SITE,
  logo: `${SITE}/icon.png`,
  image: `${SITE}/opengraph-image.jpg`,
  telephone: "+94740591853",
  email: "hello@leonamanagement.com",
  founder: [
    { "@type": "Person", name: "Devike" },
    { "@type": "Person", name: "Devangi" },
  ],
  areaServed: [
    ...AREAS.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "Country", name: "Sri Lanka" } })),
  ],
  makesOffer: ["Villa management", "Interior design & architecture", "Listing optimisation", "Content creation"].map(
    (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: "Sri Lanka" } }),
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
      className={`${display.variable} ${body.variable} h-full antialiased`}
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
