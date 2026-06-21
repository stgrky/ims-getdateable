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
  tagline: "Women are amazing. Dating them shouldn't be a nightmare.",
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
  footerText: "By women, for women. Made with a little spice in Austin, TX.",
  stickyCta: { label: "Take the assessment", href: "/assessment" },
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: "For women who date women",
  heroHeading: "Women are amazing. Dating them shouldn't be a nightmare.",
  heroQuote:
    "The biggest problem with dating is that people are trying to find the right partner instead of focusing on being the right partner.",
  heroQuoteAuthor: "Dr. Sarah Kyle",
  heroSubhead:
    "A space for women who date women — and are ready to do it better. If you're successful in most areas of your life but dating feels like a disaster zone, you're not alone.",
  primaryCta: { label: "Take the free assessment", href: "/assessment" },
  secondaryCta: { label: "Listen to the podcast", href: "/podcast" },
  introHeading: "Welcome to dateable()af",
  introBody:
    "A space for women who date women — and are ready to do it better. If you're successful in most areas of your life but dating feels like a disaster zone, you're not alone. Tired of…",
  painPoints: [
    "The endless swipe spiral?",
    "Ghosting (and the pit in your stomach that follows)?",
    "Wondering if there are any quality women left?",
  ],
  introClosing: "Yeah, we've been there. Let's fix it.",
  missionHeading: "We're not a dating app.",
  missionIntro:
    "We're two women (and longtime daters) who love women, and we're on a mission to help you:",
  missionPoints: [
    "Become your most dateable self",
    "Navigate the wild world of lesbian dating",
    "Have more fun and less frustration",
  ],
  offeringsHeading: "Here's what we've got (so far)",
  offerings: [
    {
      ...k("assessment"),
      icon: "📋",
      title: "The free Dateability Assessment",
      body: "A 5-minute quiz to identify the blind spots that might be keeping you single. Get personalized results + tips you can actually use.",
      ctaLabel: "Take the assessment",
      href: "/assessment",
    },
    {
      ...k("podcast"),
      icon: "🎙️",
      title: "The dateable()af Podcast",
      body: "Funny, informative, and occasionally spicy — what it really takes to date women successfully. Listen while you're swiping; we won't judge.",
      ctaLabel: "Listen now",
      href: "/podcast",
    },
    {
      ...k("community"),
      icon: "✨",
      title: "The community (coming soon)",
      body: "We're dreaming up the community you've been asking for — smart, inclusive, and full of women supporting women. Get on the list.",
      ctaLabel: "Join the list",
      href: "/community",
    },
  ],
  communityHeading: "Want to be part of our future community?",
  communityBody:
    "We know women are craving better ways to meet other high-quality women — we are too. That's why we're building a community just for you. But we don't want to guess what you need — we want to hear it from you. Tell us what would feel valuable, supportive, and real, and you'll be first in line when we open the doors.",
  communityCta: {
    label: "Send us your ideas — we're listening",
    href: "/contact",
  },
  newsletterHeading: "Stay in the loop",
  newsletterBody:
    "You want to stay informed without getting spammed. We want to stay connected with you. We'll send occasional dating tips and updates about what's going on in the dateable()af community. Join our email list to stay connected.",
};

const testimonials = [
  {
    _id: "testimonial-1",
    _type: "testimonial",
    quote:
      "Previews of the dateable()af Podcast are so smart and funny! I've already learned a lot and I can't wait for the next episodes to come out. Our community has been needing something like this for a long time — Rachel and Sarah are perfect for this role.",
    attribution: "J.C.",
    context: "Single lesbian, age 46",
    displayOrder: 1,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    quote:
      "I love the whole concept of dateable()af, but I'm especially impressed with the dateability assessment Dr. Kyle created. It's a comprehensive tool that efficiently zeroes in on the areas that may be holding someone back from the relationship they desire.",
    attribution: "J. Bosarge",
    context: "Ph.D. Clinical Psychologist",
    displayOrder: 2,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    quote:
      "I've been very successful in every area of my life except romantic relationships. It's so hard to find quality women, and the apps just aren't getting it right. I love what dateable()af is envisioning — I can't wait to see where it goes!",
    attribution: "A.G.",
    context: "Single queer woman, age 42",
    displayOrder: 3,
  },
];

console.log("→ Upserting documents...");
for (const doc of [siteSettings, homePage, ...testimonials]) {
  const res = await client.createOrReplace(doc);
  console.log(`   ${res._type.padEnd(14)} ${res._id}`);
}
console.log("\n✓ Home seed complete.");
