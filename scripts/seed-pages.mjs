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
  heading: "The Relatability Assessment",
  intro:
    "It's not about being “good” or “bad.” The Relatability Assessment shows you how you're doing across eight core relationship capacities—and what's quietly getting in the way. It's 70 thought-provoking questions (sounds like a lot, but most folks finish in 5–7 minutes), and when you're done you'll get insights tailored to you.",
  benefitsHeading: "What it measures",
  benefits: [
    "Emotional regulation",
    "Communication",
    "Self-care",
    "Confidence",
    "Boundaries",
    "Financial stability",
    "Purpose",
    "Being a decent human",
  ],
  typeformUrl: "",
};

const communityPage = {
  _id: "communityPage",
  _type: "communityPage",
  eyebrow: "Coming soon",
  heading: "Want in on what's next?",
  body: "We're building a community for people who'd rather understand their patterns than keep repeating them. But we don't want to guess what you need—we want to hear it straight from you. Tell us what would feel valuable, supportive, and real, and you'll be first in line when we open the doors.",
  pointsHeading: "What we're dreaming up",
  points: [
    "Smart, inclusive, and full of people who actually do the work",
    "Real connection—not another feed to scroll",
    "Built around what you actually need, because you told us",
  ],
  ctaLabel: "Send us your ideas—we're listening",
  ctaHref: "/contact",
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  eyebrow: "Our origin story",
  heading:
    "Two women who love women — and got tired of watching dating be a nightmare.",
  intro:
    "dateable()af is the work of two longtime daters who decided there had to be a better way. Here's who we are and why we started.",
  founders: [
    {
      _key: "sarah",
      name: "Dr. Sarah Kyle",
      headline: "I'm Dr. Sarah Kyle, therapist and founder of dateable()af.",
      title: "Therapist & founder",
      portrait: {
        _type: "image",
        alt: "Dr. Sarah Kyle",
        asset: {
          _type: "reference",
          _ref: "image-b8811b970684e4b9555f3b5aa0fde85adeee0bf0-1450x2166-jpg",
        },
      },
      bio: "I've spent over 25 years as a therapist helping people build better relationships, but let's be real—dating can be brutal. I've worked with so many smart, successful women who have everything together except their love life. The apps? A necessary evil. The ghosting? Infuriating. The whole process? Straight-up exhausting. I get it—because I've seen it all—both as a therapist and as someone who's had to navigate queer dating myself.\n\nI came out at 29, which in lesbian years felt practically ancient. I did the casual dating thing, had a couple of long(ish)-term relationships, and I've been with my current partner for over a decade and a half. So yes, I've experienced the highs, the lows, and the \"why did she just text me 'hey' six months later?\" confusion. And through it all, one thing has become clear: there's a better way to do this.\n\nThat's why I started dateable()af—to help women break out of frustrating patterns and actually enjoy dating again. The key? Small, powerful shifts that change the game—without the stress, the overthinking, or the emotional rollercoaster. Whether you're sick of the apps, trapped in the same dating cycles, or just trying to figure out what actually makes someone dateable, I've got you.",
      ctaLabel: "Listen to the podcast",
      ctaHref: "/podcast",
    },
    {
      _key: "rachel",
      name: "Rachel Howell, M.Ed.",
      headline:
        "And I'm Rachel Howell, M.Ed., dateable()af business partner and researcher extraordinaire.",
      title: "Business partner & researcher",
      portrait: {
        _type: "image",
        alt: "Rachel Howell",
        asset: {
          _type: "reference",
          _ref: "image-3f242d315fb39a6c3307edf2c5cf8dc736d66f47-1450x2166-jpg",
        },
      },
      bio: "I bring over 30 years of research and training experience to dateable()af, but what really fuels me is my deep curiosity about human relationships—especially the wonderfully complex world of women-loving-women.\n\nProudly a lesbian since 10th grade, I've lived just about every phase of queer dating: the U-Haul era, the married years, and now, the dating-again adventure. Let's just say, I've got stories.\n\nThrough all the twists and turns, one thing has stayed the same: my passion for understanding what makes relationships work (and what makes them hilariously complicated). Alongside Sarah, I bring a mix of real-life experiences, research-backed insights, and a love of laughing through the chaos of dating women.\n\nWhether it's sharing my own lessons learned or breaking down modern dating dynamics, I show up with authenticity, humor, and a genuine desire to help women navigate love and connection with more confidence—and a lot less stress.",
      ctaLabel: "Listen to the podcast",
      ctaHref: "/podcast",
    },
  ],
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage",
  heading: "Let's connect",
  intro:
    "Your questions and ideas matter to us. Whether you want to say hi, suggest a topic, or tell us what you'd want from the community — reach out. A real human (one of us) reads every note.",
  email: "info@getdateable.com",
  phone: "(512) 507-3982",
  addressLine: "2111 Dickson Drive, Suite 33, Austin, TX 78704",
  hours: [],
};

console.log("→ Upserting documents...");
for (const doc of [assessmentPage, communityPage, aboutPage, contactPage]) {
  const res = await client.createOrReplace(doc);
  console.log(`   ${res._type.padEnd(16)} ${res._id}`);
}
console.log("\n✓ Pages seed complete.");
