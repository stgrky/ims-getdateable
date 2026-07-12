"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/Container";
import { EASE_EDITORIAL } from "@/components/motion/easings";
import { Float } from "@/components/motion/Float";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { SanityImg } from "@/components/SanityImg";
import type { HomePage } from "@/sanity/types";

type Props = {
  home: HomePage;
};

export function HomeHero({ home }: Props) {
  const reduceMotion = useReducedMotion();
  const hasImage = Boolean(home.heroImage?.asset);

  const imageReveal = reduceMotion
    ? {}
    : {
        initial: { clipPath: "inset(50% 0% 50% 0%)" },
        animate: { clipPath: "inset(0% 0% 0% 0%)" },
        transition: { duration: 1.4, ease: EASE_EDITORIAL, delay: 0.15 },
      };

  const copy = (
    <div className={hasImage ? "" : "max-w-3xl"}>
      {home.heroEyebrow ? (
        <Reveal delay={0.05} distance={12} duration={0.7}>
          <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-[var(--color-accent-strong)]">
            {home.heroEyebrow}
          </p>
        </Reveal>
      ) : null}

      <h1
        className={`mt-5 font-serif font-bold leading-[1.04] tracking-tight text-[var(--color-foreground)] ${
          hasImage
            ? "text-4xl md:text-[3.2rem]"
            : "text-[2.6rem] md:text-[4.2rem]"
        }`}
      >
        <Typewriter text={home.heroHeading ?? ""} speed={130} />
      </h1>

      {home.heroQuote ? (
        <Reveal delay={0.35} distance={16} duration={0.85}>
          <figure className="mt-8 border-l-2 pl-5" style={{ borderColor: "var(--color-accent)" }}>
            <blockquote className="text-lg italic leading-relaxed text-[var(--color-foreground)]/80">
              &ldquo;{home.heroQuote}&rdquo;
            </blockquote>
            {home.heroQuoteAuthor ? (
              <figcaption className="mt-2 text-sm font-medium text-[var(--color-accent-strong)]">
                — {home.heroQuoteAuthor}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      ) : null}

      {home.heroSubhead ? (
        <Reveal delay={0.45} distance={18} duration={0.9}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            {home.heroSubhead}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.6} distance={14} duration={0.8}>
        <div className="mt-10 flex flex-wrap gap-4">
          {home.primaryCta?.label ? (
            <MagneticButton
              href={home.primaryCta.href ?? "/podcast"}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_var(--color-accent)] transition hover:bg-[var(--color-accent-strong)]"
            >
              {home.primaryCta.label}
              <span aria-hidden>→</span>
            </MagneticButton>
          ) : null}
          {home.secondaryCta?.label ? (
            <MagneticButton
              href={home.secondaryCta.href ?? "/podcast"}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-foreground)]/15 px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
            >
              {home.secondaryCta.label}
            </MagneticButton>
          ) : null}
        </div>
      </Reveal>
    </div>
  );

  if (!hasImage) {
    return (
      <section className="relative overflow-hidden bg-[var(--color-surface)]">
        <Container className="py-24 md:py-32">{copy}</Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <Container className="grid gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:py-28">
        {copy}
        <div className="relative">
          <Float duration={8} distance={5}>
            <motion.div
              className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
              {...imageReveal}
            >
              <SanityImg
                image={home.heroImage}
                alt={home.heroImage?.alt ?? home.heroHeading ?? ""}
                width={1000}
                height={1100}
                priority
                className="aspect-[10/11] w-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </motion.div>
          </Float>
        </div>
      </Container>
    </section>
  );
}
