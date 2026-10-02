import Drift from "@/components/Drift";

/**
 * A breath before the contact form: the veranda, the lounger, a king
 * coconut on the table and the sea beyond. One line, one quiet link.
 */
export default function Veranda() {
  return (
    <section className="relative h-[82vh] min-h-[34rem] overflow-hidden bg-forest-deep max-md:h-[78svh]">
      <Drift distance={50} className="absolute -inset-y-[8%] inset-x-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/brand/tropical-veranda-m.webp" />
          <img
            src="/brand/tropical-veranda.webp"
            alt="A rattan lounger and a king coconut on a shaded villa veranda facing the beach"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[38%_60%]"
          />
        </picture>
      </Drift>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />

      <div className="wrap relative flex h-full flex-col justify-end pb-16 text-white max-md:pb-28">
        <h2 className="h-display">
          Your villa,
          <br />
          <span className="accent text-gold">ready</span> when you are.
        </h2>
        <p className="copy mt-6 text-white/85">
          Swept, stocked and checked before every arrival. You hear about it in
          your report, never from a guest.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-eyebrow font-semibold tracking-[0.24em] text-gold uppercase transition-[gap] duration-200 hover:gap-4"
        >
          Tell us about yours <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
