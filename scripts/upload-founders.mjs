import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-01";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// Founder portraits. _key matches the founders array in seed-pages.mjs.
// Re-run this AFTER seed-pages.mjs (which recreates the aboutPage doc).
const founders = [
  { key: "sarah", file: "sarah-kyle.jpg", alt: "Dr. Sarah Kyle" },
  { key: "rachel", file: "rachel-howell.jpg", alt: "Rachel Howell" },
];

const docsDir = join(homedir(), "Documents");
const patch = client.patch("aboutPage");

for (const f of founders) {
  const path = join(docsDir, f.file);
  console.log(`→ Uploading ${f.file}...`);
  const buffer = readFileSync(path);
  const asset = await client.assets.upload("image", buffer, {
    filename: f.file,
  });
  console.log(`   asset ${asset._id}`);
  patch.set({
    [`founders[_key=="${f.key}"].portrait`]: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: f.alt,
    },
  });
}

console.log("→ Patching aboutPage founders...");
await patch.commit();
console.log("\n✓ Founder portraits uploaded and wired.");
