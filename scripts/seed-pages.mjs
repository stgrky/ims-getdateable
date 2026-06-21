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
console.log(`→ Seeding assessment + community into ${projectId}/${dataset}`);

const assessmentPage = {
  _id: "assessmentPage",
  _type: "assessmentPage",
  eyebrow: "Free · 5–7 minutes",
  heading: "The Dateability Assessment",
  intro:
    "You're exhausted from the apps and ready to try something new. The first step toward a satisfying dating life is taking the Dateability Assessment. You'll learn a lot about yourself — your strengths and your areas for growth — and when you're done, you'll get tips tailored specifically to you. It's 70 thought-provoking questions (sounds like a lot, but most folks finish in 5–7 minutes).",
  benefitsHeading: "What you'll learn about yourself",
  benefits: [
    "Physical self-care",
    "Emotional stability",
    "Communication",
    "Community",
    "Passion",
    "Confidence",
    "Financial fitness",
    "Being a good human",
  ],
  typeformUrl: "",
};

const communityPage = {
  _id: "communityPage",
  _type: "communityPage",
  eyebrow: "Coming soon",
  heading: "Want to be part of our future community?",
  body: "We know women are craving better ways to meet other high-quality women — we are too. That's why we're building a community just for you. But we don't want to guess what you need — we want to hear it straight from you. Tell us what kind of scene would feel valuable, supportive, and real. Share your thoughts, and you'll be first in line when we open the doors.",
  pointsHeading: "What we're dreaming up",
  points: [
    "Smart, inclusive, and full of women supporting women",
    "Real ways to meet other high-quality women",
    "Built around what you actually need — because you told us",
  ],
  ctaLabel: "Send us your ideas — we're listening",
  ctaHref: "/contact",
};

console.log("→ Upserting documents...");
for (const doc of [assessmentPage, communityPage]) {
  const res = await client.createOrReplace(doc);
  console.log(`   ${res._type.padEnd(16)} ${res._id}`);
}
console.log("\n✓ Pages seed complete.");
