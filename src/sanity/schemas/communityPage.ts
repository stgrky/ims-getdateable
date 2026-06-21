import { defineField, defineType } from "sanity";

export const communityPage = defineType({
  name: "communityPage",
  title: "Community Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
    defineField({
      name: "pointsHeading",
      title: "Points heading",
      type: "string",
    }),
    defineField({
      name: "points",
      title: "What it'll be",
      description: "A few lines on what the community will offer.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "Community Page" }) },
});
