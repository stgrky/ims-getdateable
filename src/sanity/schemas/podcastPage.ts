import { defineField, defineType } from "sanity";

export const podcastPage = defineType({
  name: "podcastPage",
  title: "Podcast Page",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Small label above the heading (e.g. 'The Podcast').",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "showUrl",
      title: "Spotify show link",
      description:
        "The podcast's main Spotify link (e.g. https://open.spotify.com/show/...). Embeds the full show with its episode list. Apple Podcasts / YouTube links also work.",
      type: "url",
    }),
    defineField({
      name: "featuredEpisode",
      title: "Featured episode",
      description:
        "Optional. Pinned at the top of the podcast page with its own player.",
      type: "reference",
      to: [{ type: "podcastEpisode" }],
    }),
    defineField({
      name: "platformLinks",
      title: "Also available on",
      description: "Optional links to other platforms (Apple, YouTube, etc.).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Podcast Page" }) },
});
