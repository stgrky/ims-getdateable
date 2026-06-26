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
console.log(`→ Seeding podcast into project ${projectId}/${dataset}`);

const podcastPage = {
  _id: "podcastPage",
  _type: "podcastPage",
  eyebrow: "The podcast",
  heading: "Listen to Dateable AF.",
  intro:
    "Relationships, decoded—one episode at a time. Hit play right here; no app-hopping required.",
  showUrl: "https://open.spotify.com/show/4nFlpmwPgRVUvkdgReMCTF",
  platformLinks: [],
};

console.log("→ Upserting podcast page...");
const res = await client.createOrReplace(podcastPage);
console.log(`   ${res._type.padEnd(16)} ${res._id}`);

// Episodes are surfaced by the embedded Spotify show, so remove any seeded
// episode docs (the old placeholder ones).
console.log("→ Removing any seeded episode docs...");
await client.delete({ query: '*[_type == "podcastEpisode"]' });

console.log("\n✓ Podcast seed complete.");
