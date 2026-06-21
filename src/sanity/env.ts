// Project ID and dataset are intentionally hardcoded as fallbacks: these are
// PUBLIC values (the project ID is visible in the deployed Studio URL and the
// Sanity dashboard, and `NEXT_PUBLIC_` env vars are exposed to the browser
// anyway). Hardcoding them means the standalone Studio build — which does NOT
// read `.env.local` — still has what it needs to boot.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// TODO(provisioning step 2): replace "" with the Get Dateable Sanity project ID
// once the new project is created. Empty fallback means the site renders the
// built-in default content until the project is wired up.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = projectId.length > 0;
