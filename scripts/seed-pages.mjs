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
      title: "Therapist & founder of dateable()af",
      bio: "I've spent over 25 years as a therapist helping people build better relationships — but let's be real: dating can be brutal. I've worked with so many smart, successful women who have everything together except their love life. The apps? A necessary evil. The ghosting? Infuriating. The whole process? Straight-up exhausting. I get it, because I've seen it all — both as a therapist and as someone who's had to navigate queer dating myself.\n\nI came out at 29, which in lesbian years felt practically ancient. I did the casual dating thing, had a couple of long-ish relationships, and I've been with my current partner for over a decade and a half. So yes — I've experienced the highs, the lows, and the \"why did she just text me 'hey' six months later?\" confusion. Through it all, one thing has become clear: there's a better way to do this.\n\nThat's why I started dateable()af — to help women break out of frustrating patterns and actually enjoy dating again. The key? Small, powerful shifts that change the game, without the stress, the overthinking, or the emotional rollercoaster.",
      ctaLabel: "Take our free assessment",
      ctaHref: "/assessment",
    },
    {
      _key: "rachel",
      name: "Rachel Howell, M.Ed.",
      title: "Business partner & researcher extraordinaire",
      bio: "I bring over 30 years of research and training experience to dateable()af, but what really fuels me is my deep curiosity about human relationships — especially the wonderfully complex world of women-loving-women.\n\nProudly a lesbian since 10th grade, I've lived just about every phase of queer dating: the U-Haul era, the married years, and now, the dating-again adventure. Let's just say, I've got stories.\n\nThrough all the twists and turns, one thing has stayed the same: my passion for understanding what makes relationships work (and what makes them hilariously complicated). Alongside Sarah, I bring a mix of real-life experience, research-backed insights, and a love of laughing through the chaos of dating women.",
      ctaLabel: "Take our free assessment",
      ctaHref: "/assessment",
    },
  ],
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage",
  heading: "Let's connect",
  intro:
    "Your questions and ideas matter to us. Whether you want to say hi, ask about the assessment, or tell us what you'd want from the community — reach out. A real human (one of us) reads every note.",
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
