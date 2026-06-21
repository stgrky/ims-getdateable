import { defineField, defineType } from "sanity";

const ctaObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "label", type: "string", title: "Label" },
      { name: "href", type: "string", title: "Link" },
    ],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // ── Hero ─────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      description: "Small label above the headline. Optional.",
      type: "string",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading (the big tagline)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroQuote",
      title: "Hero quote",
      description: "Optional pull-quote under the tagline.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroQuoteAuthor",
      title: "Hero quote — author",
      type: "string",
    }),
    defineField({
      name: "heroSubhead",
      title: "Hero subhead",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (optional)",
      description:
        "Leave blank for a bold type-only hero. Add a photo for a two-column hero.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    ctaObject("primaryCta", "Primary CTA"),
    ctaObject("secondaryCta", "Secondary CTA"),

    // ── Intro / pain points ──────────────────────────────
    defineField({
      name: "introHeading",
      title: "Intro heading",
      type: "string",
    }),
    defineField({
      name: "introBody",
      title: "Intro body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "painPoints",
      title: "Pain points (the 'tired of…' list)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "introClosing",
      title: "Intro closing line",
      description: "e.g. \"Yeah, we've been there. Let's fix it.\"",
      type: "string",
    }),

    // ── Mission ('we're not a dating app') ───────────────
    defineField({
      name: "missionHeading",
      title: "Mission heading",
      type: "string",
    }),
    defineField({
      name: "missionIntro",
      title: "Mission intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "missionPoints",
      title: "Mission points",
      type: "array",
      of: [{ type: "string" }],
    }),

    // ── Offerings ('here's what we've got') ──────────────
    defineField({
      name: "offeringsHeading",
      title: "Offerings heading",
      type: "string",
    }),
    defineField({
      name: "offerings",
      title: "Offerings",
      description: "The cards for the assessment, podcast, community, etc.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
            { name: "icon", type: "string", title: "Icon (emoji)" },
            { name: "ctaLabel", type: "string", title: "Link label" },
            { name: "href", type: "string", title: "Link" },
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
      validation: (rule) => rule.max(4),
    }),

    // ── Community teaser (waitlist) ──────────────────────
    defineField({
      name: "communityHeading",
      title: "Community heading",
      type: "string",
    }),
    defineField({
      name: "communityBody",
      title: "Community body",
      type: "text",
      rows: 3,
    }),
    ctaObject("communityCta", "Community CTA"),

    // ── Newsletter ───────────────────────────────────────
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "audienceCards",
      title: "Who this is for (cards)",
      description: "The 'you're someone who…' cards beside the email signup.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
