import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner Dashboard — Leona Properties",
};

/**
 * Placeholder. Frame 31 in the Figma file has the real owner dashboard design
 * ("Welcome back, Peter De Siva") — build this out when that's in scope.
 */
export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-forest px-6 text-center">
      <img
        src="/brand/logo-shield.png"
        alt=""
        className="h-14 w-auto brightness-0 invert"
      />
      <h1 className="mt-8 text-3xl font-bold text-white">Owner Dashboard</h1>
      <p className="mt-4 max-w-md text-white/70">
        Coming soon. Your live revenue, bookings and maintenance log will live
        here.
      </p>
      <a
        href="/"
        className="mt-8 rounded-md bg-gold px-8 py-3 text-sm font-bold tracking-[0.12em] text-forest uppercase transition hover:bg-gold-bright"
      >
        Back to site
      </a>
    </main>
  );
}
