import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TypeformEmbed } from "@/components/TypeformEmbed";
import { defaultAssessmentPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { assessmentPageQuery } from "@/sanity/queries";
import type { AssessmentPage } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Dateability Assessment",
};

async function getAssessment() {
  return safeFetch<AssessmentPage>(
    assessmentPageQuery,
    {},
    defaultAssessmentPage
  );
}

export default async function AssessmentPageRoute() {
  const page = await getAssessment();

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
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              {page.heading ?? "The Dateability Assessment"}
            </h1>
          </Reveal>
          {page.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {page.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      {page.benefits && page.benefits.length > 0 ? (
        <section className="bg-[var(--color-foreground)] py-16 md:py-20">
          <Container>
            {page.benefitsHeading ? (
              <Reveal>
                <h2 className="text-center font-serif text-2xl font-bold text-white md:text-[1.9rem]">
                  {page.benefitsHeading}
                </h2>
              </Reveal>
            ) : null}
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-4">
              {page.benefits.map((b, i) => (
                <Reveal key={b} delay={Math.min(0.05 * i, 0.3)}>
                  <div className="flex items-center gap-2.5 text-white">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                    <span className="text-[15px]">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── THE FORM ── */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container>
          <Reveal>
            <TypeformEmbed
              url={page.typeformUrl}
              title={page.heading ?? "Dateability Assessment"}
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
