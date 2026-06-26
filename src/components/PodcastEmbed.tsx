type Kind = "show" | "episode";

type Props = {
  url?: string;
  kind?: Kind;
  /** Accessible title for the iframe */
  title?: string;
};

/**
 * Inline podcast player. Accepts a Spotify, Apple Podcasts, or YouTube link
 * and rewrites it to that platform's embed URL. Spotify is the primary target.
 *
 * Note: the Spotify *show* embed only features the latest episode (it does not
 * render a browsable list inside the iframe), so we size it as a single-episode
 * player and link out to Spotify for the full back catalog.
 *
 * Renders a tasteful empty state when no link is set yet, so the page still
 * reads well before the client pastes their show/episode URL in Studio.
 */
export function PodcastEmbed({ url, kind = "show", title }: Props) {
  const embedUrl = url ? toEmbedUrl(url) : null;
  const height = kind === "show" ? 352 : 232;

  if (!embedUrl) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl border border-dashed text-center"
        style={{
          borderColor: "var(--color-subtle)",
          background: "var(--color-accent-soft)",
          minHeight: kind === "show" ? 220 : 140,
        }}
      >
        <p className="max-w-xs px-6 text-sm text-[var(--color-muted)]">
          The {kind === "show" ? "podcast player" : "episode player"} appears
          here once the Spotify link is added in the studio.
        </p>
      </div>
    );
  }

  return (
    <iframe
      title={title ?? "Podcast player"}
      src={embedUrl}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="w-full rounded-2xl border-0"
      style={{ height }}
    />
  );
}

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();

    if (host.endsWith("spotify.com")) {
      if (u.pathname.includes("/embed/")) return url;
      return `https://open.spotify.com/embed${u.pathname}`;
    }
    if (host.endsWith("apple.com")) {
      return url.replace("podcasts.apple.com", "embed.podcasts.apple.com");
    }
    if (host.endsWith("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    return url;
  } catch {
    return url;
  }
}
