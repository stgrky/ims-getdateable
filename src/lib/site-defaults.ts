import type {
  AboutPage,
  Announcement,
  AssessmentPage,
  CommunityPage,
  ContactPage,
  HomePage,
  PodcastEpisode,
  PodcastPage,
  PostListItem,
  RecentPost,
  ServicesPage,
  SiteSettings,
  Testimonial,
} from "@/sanity/types";

export const defaultSiteSettings: SiteSettings = {
  practiceName: "dateable()af",
  tagline: "Women are amazing. Dating them shouldn't be a nightmare.",
  palette: "dateable",
  fontPairing: "plus-jakarta",
  email: "info@getdateable.com",
  phone: "(512) 507-3982",
  addressLine: "2111 Dickson Drive, Suite 33, Austin, TX 78704",
  socialLinks: [
    { label: "Instagram", url: "#" },
    { label: "Facebook", url: "#" },
    { label: "TikTok", url: "#" },
  ],
  footerText: "By women, for women. Made with a little spice in Austin, TX.",
  stickyCta: { label: "Take the assessment", href: "/assessment" },
};

export const defaultHomePage: HomePage = {
  heroEyebrow: "For women who date women",
  heroHeading: "Women are amazing. Dating them shouldn't be a nightmare.",
  heroQuote:
    "The biggest problem with dating is that people are trying to find the right partner instead of focusing on being the right partner.",
  heroQuoteAuthor: "Dr. Sarah Kyle",
  primaryCta: { label: "Take the free assessment", href: "/assessment" },
  secondaryCta: { label: "Listen to the podcast", href: "/podcast" },

  introHeading: "Welcome to dateable()af",
  introBody:
    "A space for women who date women—and are ready to do it better. If you're successful in most areas of your life but dating feels like a disaster zone, you're not alone. Tired of…",
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

  offeringsHeading: "Here's What We've Got (So Far)",
  offerings: [
    {
      icon: "📋",
      title: "The FREE Dateability Assessment",
      body: "A 5-minute quiz to identify the blind spots that might be keeping you single. Get personalized results + tips you can actually use.",
      ctaLabel: "Take Our Free Dateability Assessment",
      href: "/assessment",
    },
    {
      icon: "🎙️",
      title: "The dateable()af Podcast",
      body: "A funny, informative, and occasionally spicy look at what it really takes to date women successfully. (Listen while you're swiping—we won't judge.)",
      ctaLabel: "Click Here to Listen",
      href: "/podcast",
    },
    {
      icon: "✨",
      title: "More to Come",
      body: "We're dreaming up the community you've been asking for—one that's smart, inclusive, and full of women supporting women. Until then, start with the quiz and the pod. We're so glad you're here.",
      ctaLabel: "Join the list",
      href: "/community",
    },
  ],

  communityHeading: "Want to be part of our future community?",
  communityBody:
    "We know women are craving better ways to meet other high-quality women—we are too. That's why we're building a community just for you. But we don't want to guess what you need—we want to hear it straight from you. Tell us what kind of scene would feel valuable, supportive, and real. Share your thoughts, and you'll be first in line when we open the doors.",
  communityCta: {
    label: "Click here to send us your ideas—we're listening.",
    href: "/contact",
  },

  newsletterHeading: "Stay in the loop",
  newsletterBody:
    "You want to stay informed without getting spammed. We want to stay connected with you. We would love to send you occasional dating tips and updates about what's going on in the dateable()af community. Join our email list to stay connected.",
  audienceCards: [
    {
      title: "About the Assessment",
      body: "You're someone who wants to know yourself better. Our dateability assessment will show you how well you're doing with physical self-care, emotional stability, communication, community, passion, confidence, financial fitness, and being a good human.",
    },
    {
      title: "You Want to Meet Other Women Like You",
      body: "You're standing by, waiting for us to open the dateable()af membership program so you can make some connections. Join our email list so you can get one of the first invitations!",
    },
    {
      title: "You Want to Laugh, Learn, and Be Entertained",
      body: "Listen and subscribe to our dateable()af Podcast. We're chatting about all things related to women dating women, plus interviewing some amazing guests.",
    },
    {
      title: "Let Us Know What Kind of Support You Need",
      body: "dateable()af was designed for women, by women. We want to create a community just for you. Please message us and let us know how we can help you make dating less brutal.",
    },
  ],
};

export const defaultTestimonials: Testimonial[] = [
  {
    _id: "default-1",
    quote:
      "Previews of the dateable()af Podcast are so smart and funny! I've already learned a lot and I can't wait for the next episodes to come out. Our community has been needing something like the dateable()af Podcast for a long time! Rachel and Sarah are perfect for this role.",
    attribution: "J.C.",
    context: "Single lesbian, age 46",
    displayOrder: 1,
  },
  {
    _id: "default-2",
    quote:
      "I love the whole concept of “dateable()af,” but I am especially impressed with the “dateability” assessment Dr. Kyle created. It's a comprehensive tool to evaluate an individual's overall health and well-being, efficiently zeroing in on areas that may be holding someone back from the successful relationship they desire. Her model is going to save people a tremendous amount of time, money and general anguish when it comes to dating.",
    attribution: "J. Bosarge",
    context: "Ph.D. Clinical Psychologist",
    displayOrder: 2,
  },
  {
    _id: "default-3",
    quote:
      "I've been very successful in every area of my life except romantic relationships. It's so hard to find quality women, and the apps just aren't getting it right. I love what dateable()af is envisioning for our community and I can't wait to see where it goes! The Dateability Assessment is such a great tool and I really want to meet other women who are putting this knowledge into practice.",
    attribution: "A.G.",
    context: "Single queer woman, age 42",
    displayOrder: 3,
  },
];

export const defaultAboutPage: AboutPage = {
  eyebrow: "Our origin story",
  heading: "Two women who love women — and got tired of watching dating be a nightmare.",
  intro:
    "dateable()af is the work of two longtime daters who decided there had to be a better way. Here's who we are and why we started.",
  founders: [
    {
      name: "Dr. Sarah Kyle",
      headline: "I'm Dr. Sarah Kyle, therapist and founder of dateable()af.",
      title: "Therapist & founder",
      bio: "I've spent over 25 years as a therapist helping people build better relationships, but let's be real—dating can be brutal. I've worked with so many smart, successful women who have everything together except their love life. The apps? A necessary evil. The ghosting? Infuriating. The whole process? Straight-up exhausting. I get it—because I've seen it all—both as a therapist and as someone who's had to navigate queer dating myself.\n\nI came out at 29, which in lesbian years felt practically ancient. I did the casual dating thing, had a couple of long(ish)-term relationships, and I've been with my current partner for over a decade and a half. So yes, I've experienced the highs, the lows, and the \"why did she just text me 'hey' six months later?\" confusion. And through it all, one thing has become clear: there's a better way to do this.\n\nThat's why I started dateable()af—to help women break out of frustrating patterns and actually enjoy dating again. The key? Small, powerful shifts that change the game—without the stress, the overthinking, or the emotional rollercoaster. Whether you're sick of the apps, trapped in the same dating cycles, or just trying to figure out what actually makes someone dateable, I've got you.",
      ctaLabel: "Take Our Free Assessment",
      ctaHref: "/assessment",
    },
    {
      name: "Rachel Howell, M.Ed.",
      headline:
        "And I'm Rachel Howell, M.Ed., dateable()af business partner and researcher extraordinaire.",
      title: "Business partner & researcher",
      bio: "I bring over 30 years of research and training experience to dateable()af, but what really fuels me is my deep curiosity about human relationships—especially the wonderfully complex world of women-loving-women.\n\nProudly a lesbian since 10th grade, I've lived just about every phase of queer dating: the U-Haul era, the married years, and now, the dating-again adventure. Let's just say, I've got stories.\n\nThrough all the twists and turns, one thing has stayed the same: my passion for understanding what makes relationships work (and what makes them hilariously complicated). Alongside Sarah, I bring a mix of real-life experiences, research-backed insights, and a love of laughing through the chaos of dating women.\n\nWhether it's sharing my own lessons learned or breaking down modern dating dynamics, I show up with authenticity, humor, and a genuine desire to help women navigate love and connection with more confidence—and a lot less stress.",
      ctaLabel: "Take Our Free Assessment",
      ctaHref: "/assessment",
    },
  ],
};

export const defaultServicesPage: ServicesPage = {
  heading: "Therapy services",
  intro:
    "Every person and every relationship is different. Sessions are tailored to what you need most right now — and the work shifts as you do.",
  services: [
    {
      title: "Individual therapy",
      description:
        "One-on-one sessions for adults working through anxiety, depression, grief, life transitions, and self-discovery. Evidence-based approaches paired with warmth and a real human relationship.",
      icon: "💬",
    },
    {
      title: "Couples therapy",
      description:
        "Therapy for couples seeking better communication, deeper emotional connection, and skills to navigate conflict without losing each other in the process.",
      icon: "🤝",
    },
    {
      title: "Telehealth",
      description:
        "Secure, confidential video sessions from anywhere in Texas. Same care, your space — and easier to fit into a full life.",
      icon: "🌿",
    },
  ],
};

export const defaultContactPage: ContactPage = {
  heading: "Let's connect",
  intro:
    "Your questions and ideas matter to us. Whether you want to say hi, ask about the assessment, or tell us what you'd want from the community — reach out. A real human (one of us) reads every note.",
  email: "info@getdateable.com",
  phone: "(512) 507-3982",
  addressLine: "2111 Dickson Drive, Suite 33, Austin, TX 78704",
  hours: [],
};

export const defaultPosts: PostListItem[] = [];
export const defaultRecentPosts: RecentPost[] = [];

export const defaultAssessmentPage: AssessmentPage = {
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

export const defaultCommunityPage: CommunityPage = {
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

export const defaultEpisodes: PodcastEpisode[] = [
  {
    _id: "default-ep-1",
    title: "How to stop dating your ex's personality",
    episodeNumber: 12,
    publishedAt: "2026-06-10T15:00:00.000Z",
    guests: "",
    showNotes:
      "We get into the patterns we keep re-dating — and the small, honest questions that help you finally pick differently.",
  },
  {
    _id: "default-ep-2",
    title: "The third-date spiral (and how to get out of it)",
    episodeNumber: 11,
    publishedAt: "2026-06-03T15:00:00.000Z",
    guests: "",
    showNotes:
      "Why everything feels fine until date three, what your nervous system is actually doing, and how to stay in the room.",
  },
  {
    _id: "default-ep-3",
    title: "U-Hauling: a love story (a cautionary tale)",
    episodeNumber: 10,
    publishedAt: "2026-05-27T15:00:00.000Z",
    guests: "",
    showNotes:
      "Funny, informative, and occasionally spicy: the lesbian-dating classic, examined with love and zero judgment.",
  },
];

export const defaultPodcastPage: PodcastPage = {
  eyebrow: "The podcast",
  heading: "Funny, informative, and occasionally spicy.",
  intro:
    "Real talk about dating women — the patterns, the spirals, the good kind of butterflies. Listen right here, no app-hopping required.",
  showUrl: "",
  featuredEpisode: defaultEpisodes[0],
  platformLinks: [],
};

export const defaultAnnouncement: Announcement = {
  enabled: false,
  message: "",
  variant: "info",
};
