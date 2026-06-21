import Link from "next/link";

import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { PostCard } from "@/components/PostCard";
import { CtaBanner } from "@/components/site/CtaBanner";
import { HomeHero } from "@/components/site/HomeHero";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { TestimonialRotator } from "@/components/site/TestimonialRotator";
import {
  defaultHomePage,
  defaultPosts,
  defaultTestimonials,
} from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import {
  allPostsQuery,
  featuredTestimonialsQuery,
  homePageQuery,
} from "@/sanity/queries";
import type { HomePage, PostListItem, Testimonial } from "@/sanity/types";

async function getHome() {
  return safeFetch<HomePage>(homePageQuery, {}, defaultHomePage);
}

async function getRecentBlogPosts() {
  const posts = await safeFetch<PostListItem[]>(allPostsQuery, {}, defaultPosts);
  return posts.slice(0, 3);
}

async function getTestimonials() {
  return safeFetch<Testimonial[]>(
    featuredTestimonialsQuery,
    {},
    defaultTestimonials
  );
}

function Bullet() {
  return (
    <span
      aria-hidden
      className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
      style={{ background: "var(--color-accent)" }}
    />
  );
}

export default async function HomePageRoute() {
  const [home, recentPosts, testimonials] = await Promise.all([
    getHome(),
    getRecentBlogPosts(),
    getTestimonials(),
  ]);

  return (
    <>
      <HomeHero home={home} />

      {/* ── INTRO / PAIN POINTS ── */}
      {home.introHeading || home.painPoints?.length ? (
        <section className="bg-[var(--color-background)] py-20 md:py-28">
          <Container>
            <div className="max-w-2xl">
              {home.introHeading ? (
                <Reveal>
                  <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                    {home.introHeading}
                  </h2>
                </Reveal>
              ) : null}
              {home.introBody ? (
                <Reveal delay={0.08}>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                    {home.introBody}
                  </p>
                </Reveal>
              ) : null}
              {home.painPoints && home.painPoints.length > 0 ? (
                <Reveal delay={0.16}>
                  <ul className="mt-6 space-y-3">
                    {home.painPoints.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-lg text-[var(--color-foreground)]"
                      >
                        <Bullet />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              {home.introClosing ? (
                <Reveal delay={0.24}>
                  <p className="mt-7 font-serif text-xl font-semibold text-[var(--color-foreground)]">
                    {home.introClosing}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── MISSION BAND ── */}
      {home.missionHeading ? (
        <section className="bg-[var(--color-foreground)] py-20 md:py-28">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="font-serif text-3xl font-bold leading-[1.1] text-white md:text-[2.6rem]">
                  {home.missionHeading}
                </h2>
              </Reveal>
              {home.missionIntro ? (
                <Reveal delay={0.08}>
                  <p className="mt-5 text-lg leading-relaxed text-white/70">
                    {home.missionIntro}
                  </p>
                </Reveal>
              ) : null}
              {home.missionPoints && home.missionPoints.length > 0 ? (
                <Reveal delay={0.16}>
                  <ul className="mt-6 space-y-3">
                    {home.missionPoints.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-lg text-white"
                      >
                        <Bullet />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── OFFERINGS ── */}
      {home.offerings && home.offerings.length > 0 ? (
        <section className="bg-[var(--color-background)] py-20 md:py-28">
          <Container>
            {home.offeringsHeading ? (
              <Reveal>
                <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                  {home.offeringsHeading}
                </h2>
              </Reveal>
            ) : null}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {home.offerings.map((o, i) => (
                <Reveal
                  key={`${o.title}-${i}`}
                  delay={0.1 + i * 0.08}
                  className="h-full"
                >
                  <Link
                    href={o.href ?? "#"}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_24px_60px_-28px_var(--color-accent)]"
                  >
                    {o.icon ? (
                      <div
                        aria-hidden
                        className="flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{ background: "var(--color-accent-soft)" }}
                      >
                        {o.icon}
                      </div>
                    ) : null}
                    <h3 className="mt-6 font-serif text-xl font-bold leading-tight text-[var(--color-foreground)] md:text-[1.5rem]">
                      {o.title}
                    </h3>
                    {o.body ? (
                      <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {o.body}
                      </p>
                    ) : null}
                    {o.ctaLabel ? (
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-strong)]">
                        {o.ctaLabel}
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    ) : null}
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <TestimonialRotator testimonials={testimonials} />

      {/* ── COMMUNITY (waitlist) ── */}
      {home.communityHeading ? (
        <section className="bg-[var(--color-foreground)] py-20 md:py-28">
          <Container className="text-center">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold leading-[1.15] text-white md:text-[2.5rem]">
                {home.communityHeading}
              </h2>
            </Reveal>
            {home.communityBody ? (
              <Reveal delay={0.1}>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                  {home.communityBody}
                </p>
              </Reveal>
            ) : null}
            {home.communityCta?.label ? (
              <Reveal delay={0.2}>
                <div className="mt-10">
                  <MagneticButton
                    href={home.communityCta.href ?? "/contact"}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
                  >
                    {home.communityCta.label}
                    <span aria-hidden>→</span>
                  </MagneticButton>
                </div>
              </Reveal>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* ── NEWSLETTER ── */}
      {home.newsletterHeading ? (
        <section className="bg-[var(--color-surface)] py-20 md:py-28">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <Reveal>
                  <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                    {home.newsletterHeading}
                  </h2>
                </Reveal>
                {home.newsletterBody ? (
                  <Reveal delay={0.08}>
                    <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
                      {home.newsletterBody}
                    </p>
                  </Reveal>
                ) : null}
              </div>
              <Reveal delay={0.16}>
                <NewsletterForm />
              </Reveal>
            </div>

            {home.audienceCards && home.audienceCards.length > 0 ? (
              <div className="mt-14 grid gap-5 sm:grid-cols-2">
                {home.audienceCards.map((card, i) => (
                  <Reveal key={`${card.title}-${i}`} delay={0.1 + i * 0.06}>
                    <div
                      className="h-full rounded-2xl p-7"
                      style={{ background: "var(--color-foreground)" }}
                    >
                      <h3 className="font-serif text-lg font-bold text-white">
                        {card.title}
                      </h3>
                      {card.body ? (
                        <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                          {card.body}
                        </p>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <CtaBanner
        heading="Ready to date a little better?"
        body="Start with the free assessment — five minutes, real answers, zero judgment."
        ctaLabel={home.primaryCta?.label ?? "Take the assessment"}
        ctaHref={home.primaryCta?.href ?? "/assessment"}
      />

      {/* ── BLOG ── */}
      {recentPosts.length > 0 ? (
        <section className="bg-[var(--color-background)] py-24 md:py-32">
          <Container>
            <div className="flex items-end justify-between">
              <Reveal>
                <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                  From the blog
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-[var(--color-accent-strong)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  All posts →
                </Link>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {recentPosts.map((post, i) => (
                <Reveal key={post._id} delay={0.1 + i * 0.1} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
