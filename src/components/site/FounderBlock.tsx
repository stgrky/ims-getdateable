"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { Founder } from "@/sanity/types";

type Props = {
  founder: Founder;
  /** Even index = image left, odd = image right */
  index: number;
};

function monogram(name?: string) {
  if (!name) return "";
  const cleaned = name
    .replace(/(^|\s)(dr|mr|mrs|ms|mx)\.?\s/i, " ")
    .replace(/,.*$/, "")
    .trim();
  const parts = cleaned.split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function FounderBlock({ founder, index }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["8%", "-8%"]
  );

  const imageFirst = index % 2 === 0;
  const paragraphs = (founder.bio ?? "").split(/\n\s*\n/).filter(Boolean);
  const hasPortrait = Boolean(founder.portrait?.asset);

  const media = (
    <div className={imageFirst ? "md:order-1" : "md:order-2"}>
      <motion.div
        style={{ y }}
        className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
      >
        {hasPortrait ? (
          <SanityImg
            image={founder.portrait}
            alt={founder.portrait?.alt ?? founder.name ?? ""}
            width={1000}
            height={1200}
            className="aspect-[5/6] w-full object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        ) : (
          <div
            className="flex aspect-[5/6] w-full items-center justify-center"
            style={{ background: "var(--color-accent-soft)" }}
          >
            <span
              className="font-serif text-7xl font-bold md:text-8xl"
              style={{ color: "var(--color-accent)" }}
              aria-hidden
            >
              {monogram(founder.name)}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );

  const copy = (
    <div className={imageFirst ? "md:order-2" : "md:order-1"}>
      <div className="md:sticky md:top-28">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold leading-[1.1] text-[var(--color-accent)] md:text-[2.4rem]">
            {founder.headline ?? founder.name}
          </h2>
        </Reveal>
        {founder.title ? (
          <Reveal delay={0.06}>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {founder.title}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.12}>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[var(--color-foreground)]/85">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        {founder.ctaLabel ? (
          <Reveal delay={0.18}>
            <Link
              href={founder.ctaHref ?? "/podcast"}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              {founder.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </div>
  );

  return (
    <section ref={ref} className="bg-[var(--color-background)] py-16 md:py-24">
      <Container className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
        {media}
        {copy}
      </Container>
    </section>
  );
}
