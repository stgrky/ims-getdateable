import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Origin Story",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
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
      description: "Short summary shown under the heading. Optional.",
    }),
    defineField({
      name: "founders",
      title: "Founders",
      description:
        "Each founder gets their own editorial block (portrait + bio).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            {
              name: "headline",
              type: "string",
              title: "Headline",
              description:
                "The big first-person heading, e.g. \"I'm Dr. Sarah Kyle, therapist and founder of dateable()af.\" Falls back to the name.",
            },
            {
              name: "title",
              type: "string",
              title: "Title / role",
              description: "e.g. 'Therapist & founder'",
            },
            {
              name: "portrait",
              type: "image",
              title: "Portrait",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            },
            {
              name: "bio",
              type: "text",
              rows: 8,
              title: "Bio",
              description: "Separate paragraphs with a blank line.",
            },
            { name: "ctaLabel", type: "string", title: "CTA label" },
            { name: "ctaHref", type: "string", title: "CTA link" },
          ],
          preview: { select: { title: "name", subtitle: "title" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Origin Story" }) },
});
