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

const episodes = [
  {
    _id: "episode-12",
    _type: "podcastEpisode",
    title: "How to stop dating your ex's personality",
    episodeNumber: 12,
    publishedAt: "2026-06-10T15:00:00.000Z",
    showNotes:
      "We get into the patterns we keep re-dating — and the small, honest questions that help you finally pick differently.",
  },
  {
    _id: "episode-11",
    _type: "podcastEpisode",
    title: "The third-date spiral (and how to get out of it)",
    episodeNumber: 11,
    publishedAt: "2026-06-03T15:00:00.000Z",
    showNotes:
      "Why everything feels fine until date three, what your nervous system is actually doing, and how to stay in the room.",
  },
  {
    _id: "episode-10",
    _type: "podcastEpisode",
    title: "U-Hauling: a love story (a cautionary tale)",
    episodeNumber: 10,
    publishedAt: "2026-05-27T15:00:00.000Z",
    showNotes:
      "Funny, informative, and occasionally spicy: the lesbian-dating classic, examined with love and zero judgment.",
  },
];

const podcastPage = {
  _id: "podcastPage",
  _type: "podcastPage",
  eyebrow: "The podcast",
  heading: "Funny, informative, and occasionally spicy.",
  intro:
    "Real talk about dating women — the patterns, the spirals, the good kind of butterflies. Listen right here, no app-hopping required.",
  showUrl: "",
  featuredEpisode: { _type: "reference", _ref: "episode-12" },
  platformLinks: [],
};

console.log("→ Upserting documents...");
for (const doc of [...episodes, podcastPage]) {
  const res = await client.createOrReplace(doc);
  console.log(`   ${res._type.padEnd(16)} ${res._id}`);
}
console.log("\n✓ Podcast seed complete.");
