import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PodcastEmbed } from "@/components/PodcastEmbed";
import { defaultEpisodes, defaultPodcastPage } from "@/lib/site-defaults";
import { formatDateLong } from "@/lib/format";
import { safeFetch } from "@/sanity/client";
import { allEpisodesQuery, podcastPageQuery } from "@/sanity/queries";
import type { PodcastEpisode, PodcastPage } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Podcast",
};

async function getPodcast() {
  return safeFetch<PodcastPage>(podcastPageQuery, {}, defaultPodcastPage);
}

async function getEpisodes() {
  return safeFetch<PodcastEpisode[]>(allEpisodesQuery, {}, defaultEpisodes);
}

export default async function PodcastPageRoute() {
  const [page, episodes] = await Promise.all([getPodcast(), getEpisodes()]);
  const featured = page.featuredEpisode;

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          {page.eyebrow ? (
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                {page.eyebrow}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {page.heading ?? "The podcast"}
            </h1>
          </Reveal>
          {page.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                {page.intro}
              </p>
            </Reveal>
          ) : null}
          {page.platformLinks && page.platformLinks.length > 0 ? (
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                <span className="text-[var(--color-muted)]">Also on</span>
                {page.platformLinks.map((link) =>
                  link.url && link.label ? (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--color-accent-strong)] underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ) : null
                )}
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── FEATURED EPISODE ── */}
      {featured ? (
        <section className="bg-[var(--color-background)] py-12 md:py-16">
          <Container>
            <Reveal>
              <p className="mb-5 text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                Latest episode
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <PodcastEmbed
                url={featured.spotifyUrl}
                kind="episode"
                title={featured.title}
              />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── FULL SHOW ── */}
      <section className="bg-[var(--color-background)] pb-16 md:pb-20">
        <Container>
          <Reveal>
            <p className="mb-5 text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              Every episode
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <PodcastEmbed url={page.showUrl} kind="show" title="Full show" />
          </Reveal>
        </Container>
      </section>

      {/* ── EPISODE NOTES ── */}
      {episodes.length > 0 ? (
        <section className="bg-[var(--color-surface)] py-20 md:py-24">
          <Container>
            <Reveal>
              <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                Episode notes
              </h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              {episodes.map((ep, i) => (
                <Reveal key={ep._id} delay={Math.min(0.06 * i, 0.3)}>
                  <article
                    className="rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-background)] p-6 md:p-7"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
                      {ep.episodeNumber ? (
                        <span className="font-medium text-[var(--color-accent-strong)]">
                          Episode {ep.episodeNumber}
                        </span>
                      ) : null}
                      {ep.publishedAt ? (
                        <time
                          dateTime={ep.publishedAt}
                          className="before:mr-3 before:text-[var(--color-subtle)] before:content-['·']"
                        >
                          {formatDateLong(ep.publishedAt)}
                        </time>
                      ) : null}
                      {ep.guests ? (
                        <span className="before:mr-3 before:text-[var(--color-subtle)] before:content-['·']">
                          with {ep.guests}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 font-serif text-xl leading-tight text-[var(--color-foreground)] md:text-[1.5rem]">
                      {ep.title}
                    </h3>
                    {ep.showNotes ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {ep.showNotes}
                      </p>
                    ) : null}
                    {ep.spotifyUrl ? (
                      <a
                        href={ep.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)] hover:text-[var(--color-foreground)]"
                      >
                        Listen
                        <span aria-hidden>→</span>
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
