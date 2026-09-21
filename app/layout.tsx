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

export const metadata: Metadata = {
  title: "Leona Properties — Sri Lanka's Property Care Specialists",
  description:
    "Most villa rental owners earn 30–40% less than they should be at the start. Find out what yours could make.",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
