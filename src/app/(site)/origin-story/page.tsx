import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/site/CtaBanner";
import { FounderBlock } from "@/components/site/FounderBlock";
import { defaultAboutPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { aboutPageQuery } from "@/sanity/queries";
import type { AboutPage } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Origin Story",
};

async function getAbout() {
  return safeFetch<AboutPage>(aboutPageQuery, {}, defaultAboutPage);
}

export default async function OriginStoryRoute() {
  const page = await getAbout();
  const founders = page.founders ?? [];

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
              {page.heading ?? "Our origin story"}
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

      {/* ── FOUNDERS ── */}
      {founders.map((founder, i) => (
        <FounderBlock
          key={`${founder.name}-${i}`}
          founder={founder}
          index={i}
        />
      ))}

      <CtaBanner
        heading="Now you know us. Your turn."
        body="Start with the free assessment — five minutes, real answers, zero judgment."
        ctaLabel="Take the assessment"
        ctaHref="/assessment"
      />
    </>
  );
}
