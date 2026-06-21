import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: undefined,
  deployment: { autoUpdates: true },
});
