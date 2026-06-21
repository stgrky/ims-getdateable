import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Therapy Site",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && !["unpublish", "delete", "duplicate"].includes(action)
          )
        : input,
  },
});
