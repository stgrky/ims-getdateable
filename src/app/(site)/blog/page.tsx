import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { PostWidget } from "@/components/PostWidget";
import { defaultRecentPosts } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { blogIndexQuery, recentPostsQuery } from "@/sanity/queries";
import type { BlogIndexResult, RecentPost } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

function parsePage(raw: string | undefined) {
  const parsed = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export default async function BlogIndexRoute({ searchParams }: BlogPageProps) {
  const { page: rawPage } = await searchParams;
  const page = parsePage(rawPage);

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [{ posts, total }, recent] = await Promise.all([
    safeFetch<BlogIndexResult>(
      blogIndexQuery,
      { start, end },
      { posts: [], total: 0 }
    ),
    safeFetch<RecentPost[]>(recentPostsQuery, {}, defaultRecentPosts),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  // Out of range page (e.g. ?page=99 when only 1 page exists) → 404,
  // but page 1 with no posts is a valid empty state.
  if (page > 1 && page > totalPages) {
    notFound();
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              Field notes
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              Notes from the practice.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
              On therapy, mental health, and the small practices that make a
              difference. Written the way I&apos;d talk to you in session — in
              plain language, without pretending to have all the answers.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── POSTS + SIDEBAR ── */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {posts.length === 0 ? (
                <Reveal>
                  <p className="rounded-2xl border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-8 text-[var(--color-muted)]">
                    No posts yet. Once posts are published in the Studio, they
                    show up here.
                  </p>
                </Reveal>
              ) : (
                <>
                  <div className="space-y-10">
                    {posts.map((post, index) => (
                      <Reveal
                        key={post._id}
                        delay={Math.min(0.08 * index, 0.32)}
                      >
                        <PostCard post={post} />
                      </Reveal>
                    ))}
                  </div>
                  <Reveal>
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      basePath="/blog"
                    />
                  </Reveal>
                </>
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal delay={0.2}>
                  <PostWidget posts={recent} variant="recent" />
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
