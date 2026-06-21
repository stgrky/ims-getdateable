import { defineField, defineType } from "sanity";

export const assessmentPage = defineType({
  name: "assessmentPage",
  title: "Assessment Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "benefitsHeading",
      title: "What you'll learn — heading",
      type: "string",
    }),
    defineField({
      name: "benefits",
      title: "What you'll learn",
      description: "The dimensions the assessment measures.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "typeformUrl",
      title: "Typeform link",
      description:
        "The assessment's Typeform share URL (e.g. https://form.typeform.com/to/XXXXXXXX). Embeds the form inline.",
      type: "url",
    }),
  ],
  preview: { prepare: () => ({ title: "Assessment Page" }) },
});
