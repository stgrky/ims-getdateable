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
console.log(`→ Seeding home + settings + testimonials into ${projectId}/${dataset}`);

const k = (s) => ({ _key: s });

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  practiceName: "dateable()af",
  tagline: "A podcast about relationships—decoded one hot mess at a time.",
  palette: "dateable",
  fontPairing: "plus-jakarta",
  email: "info@getdateable.com",
  phone: "(512) 507-3982",
  addressLine: "2111 Dickson Drive, Suite 33, Austin, TX 78704",
  socialLinks: [
    { ...k("ig"), label: "Instagram", url: "#" },
    { ...k("fb"), label: "Facebook", url: "#" },
    { ...k("tt"), label: "TikTok", url: "#" },
  ],
  footerText: "Relationships, decoded. Made with humor and heart in Austin, TX.",
  stickyCta: { label: "Take the assessment", href: "/assessment" },
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: "The Dateable AF Podcast",
  heroHeading: "Welcome to our podcast. We talk relationships. All of them.",
  heroQuote: "Decoded—one hot mess at a time.",
  heroSubhead:
    "Relationships are complicated—not just romantic ones, but the ones with partners, exes, friends, family, coworkers, and yourself. Dateable AF is a podcast about how humans connect, avoid, attach, fight, love, and try again—with humor, honesty, and zero bullshit.",
  primaryCta: { label: "Take the free assessment", href: "/assessment" },
  secondaryCta: { label: "Listen to the podcast", href: "/podcast" },
  introHeading: "We don't give dating tips.",
  introBody:
    "We help you understand your relationship patterns. Every week on the Dateable AF Podcast, we break down:",
  painPoints: [
    "Why intimacy feels risky",
    "Why you get defensive",
    "Why you people-please",
    "Why you shut down",
    "Why you stay too long",
    "And why you keep ending up in the same emotional place with different people",
  ],
  introClosing:
    "Whether you're dating, married, divorced, single, or “it's complicated,” these patterns follow you everywhere—until you understand them.",
  missionHeading: "The Relatability Assessment.",
  missionIntro:
    "It's not about being “good” or “bad.” It shows you how you're doing across eight core relationship capacities—and what's quietly getting in the way:",
  missionPoints: [
    "Emotional regulation",
    "Communication",
    "Self-care",
    "Confidence",
    "Boundaries",
    "Financial stability",
    "Purpose",
    "Being a decent human",
  ],
  offerings: [],
  communityHeading: "Want in on what's next?",
  communityBody:
    "We're building a community for people who'd rather understand their patterns than keep repeating them. We don't want to guess what you need—we want to hear it straight from you. Tell us what would feel valuable, supportive, and real, and you'll be first in line when we open the doors.",
  communityCta: {
    label: "Send us your ideas—we're listening.",
    href: "/contact",
  },
  newsletterHeading: "Stay in the loop",
  newsletterBody:
    "Stay informed without getting spammed. We'll send occasional updates, new episodes, and relationship insights worth opening.",
  audienceCards: [],
};

const testimonials = [
  {
    _id: "testimonial-1",
    _type: "testimonial",
    quote:
      "Previews of the dateable()af Podcast are so smart and funny! I've already learned a lot and I can't wait for the next episodes to come out. Our community has been needing something like the dateable()af Podcast for a long time! Rachel and Sarah are perfect for this role.",
    attribution: "J.C.",
    context: "Listener, age 46",
    displayOrder: 1,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    quote:
      "I love the whole concept of “dateable()af,” but I am especially impressed with the Relatability Assessment Dr. Kyle created. It's a comprehensive tool to evaluate an individual's overall health and well-being, efficiently zeroing in on areas that may be holding someone back from the relationships they desire. Her model is going to save people a tremendous amount of time, money and general anguish.",
    attribution: "J. Bosarge",
    context: "Ph.D. Clinical Psychologist",
    displayOrder: 2,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    quote:
      "I've been very successful in every area of my life except my relationships. I love what dateable()af is building and I can't wait to see where it goes! The Relatability Assessment is such a great tool, and I really want to connect with other people putting this knowledge into practice.",
    attribution: "A.G.",
    context: "Listener",
    displayOrder: 3,
  },
];

console.log("→ Upserting documents...");
for (const doc of [siteSettings, homePage, ...testimonials]) {
  const res = await client.createOrReplace(doc);
  console.log(`   ${res._type.padEnd(14)} ${res._id}`);
}
console.log("\n✓ Home seed complete.");
