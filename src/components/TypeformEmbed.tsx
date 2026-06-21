type Props = {
  url?: string;
  title?: string;
};

/**
 * Inline Typeform embed. Pass the form's share URL (e.g.
 * https://form.typeform.com/to/XXXXXXXX) and it renders the form inline so
 * visitors take the assessment without leaving the site.
 *
 * Renders a tasteful empty state when no URL is set yet.
 */
export function TypeformEmbed({ url, title }: Props) {
  if (!url) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl border border-dashed p-10 text-center"
        style={{
          borderColor: "var(--color-subtle)",
          background: "var(--color-accent-soft)",
          minHeight: 320,
        }}
      >
        <p className="max-w-sm text-sm text-[var(--color-muted)]">
          The assessment appears here once the Typeform link is added in the
          studio.
        </p>
      </div>
    );
  }

  return (
    <iframe
      title={title ?? "Dateability Assessment"}
      src={url}
      loading="lazy"
      allow="camera; microphone; autoplay; encrypted-media;"
      className="w-full rounded-2xl border-0"
      style={{ height: 680 }}
    />
  );
}
