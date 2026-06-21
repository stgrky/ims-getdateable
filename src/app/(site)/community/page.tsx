import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { defaultCommunityPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { communityPageQuery } from "@/sanity/queries";
import type { CommunityPage } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Community",
};

async function getCommunity() {
  return safeFetch<CommunityPage>(communityPageQuery, {}, defaultCommunityPage);
}

export default async function CommunityPageRoute() {
  const page = await getCommunity();

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          {page.eyebrow ? (
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-[var(--color-accent-strong)]">
                {page.eyebrow}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {page.heading ?? "The Community"}
            </h1>
          </Reveal>
          {page.body ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {page.body}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── WHAT IT'LL BE ── */}
      {page.points && page.points.length > 0 ? (
        <section className="bg-[var(--color-background)] py-16 md:py-20">
          <Container>
            <div className="mx-auto max-w-2xl">
              {page.pointsHeading ? (
                <Reveal>
                  <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)] md:text-[1.9rem]">
                    {page.pointsHeading}
                  </h2>
                </Reveal>
              ) : null}
              <ul className="mt-8 space-y-4">
                {page.points.map((p, i) => (
                  <Reveal key={p} delay={Math.min(0.08 * i, 0.3)}>
                    <li className="flex items-start gap-3 text-lg text-[var(--color-foreground)]">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                      <span>{p}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── CTA ── */}
      <section className="bg-[var(--color-foreground)] py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold leading-[1.15] text-white md:text-[2.4rem]">
              Help us build it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              The doors aren&apos;t open yet — but your voice shapes what&apos;s
              behind them.
            </p>
          </Reveal>
          {page.ctaLabel ? (
            <Reveal delay={0.2}>
              <div className="mt-10">
                <MagneticButton
                  href={page.ctaHref ?? "/contact"}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
                >
                  {page.ctaLabel}
                  <span aria-hidden>→</span>
                </MagneticButton>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>
    </>
  );
}
