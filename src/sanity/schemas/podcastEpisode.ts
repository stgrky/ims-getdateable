import { defineField, defineType } from "sanity";

export const podcastEpisode = defineType({
  name: "podcastEpisode",
  title: "Podcast Episode",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "episodeNumber",
      title: "Episode number",
      type: "number",
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify episode link",
      description:
        "Paste the episode's Spotify link (e.g. https://open.spotify.com/episode/...). It will embed an inline player. Apple Podcasts and YouTube links also work.",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "guests",
      title: "Guest(s)",
      description: "Optional. Comma-separated if more than one.",
      type: "string",
    }),
    defineField({
      name: "showNotes",
      title: "Show notes",
      description: "A short summary / what this episode covers.",
      type: "text",
      rows: 4,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Episode number, high to low",
      name: "episodeNumberDesc",
      by: [{ field: "episodeNumber", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      number: "episodeNumber",
      date: "publishedAt",
    },
    prepare({ title, number, date }) {
      const ep = number ? `Ep ${number}` : null;
      const d = date ? new Date(date).toLocaleDateString() : null;
      return {
        title: title ?? "Untitled episode",
        subtitle: [ep, d].filter(Boolean).join(" · "),
      };
    },
  },
});
