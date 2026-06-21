import type {
  AboutPage,
  Announcement,
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
  practiceName: "Therapy Practice",
  tagline:
    "Therapy for adults navigating anxiety, depression, grief, transitions, and relationships.",
  palette: "sage",
  fontPairing: "cormorant",
  email: "hello@example.com",
  phone: "(555) 123-4567",
  addressLine: "123 Main Street, Austin, TX",
  socialLinks: [],
  footerText:
    "Licensed clinical psychologist. Content on this site is informational and is not a substitute for professional care. If you are in crisis, call or text 988.",
  stickyCta: { label: "Book a free consult", href: "/contact" },
};

export const defaultHomePage: HomePage = {
  heroEyebrow: "Now accepting new clients · Austin & telehealth statewide",
  heroHeading: "Slow, attentive therapy for people who think too much.",
  heroSubhead:
    "Compassionate, evidence-based care for adults and couples — in person in Austin and telehealth across Texas. Let's find a way of working together that fits the life you actually live.",
  primaryCta: { label: "Book a free 15-min consult", href: "/contact" },
  secondaryCta: { label: "Learn more about me", href: "/about" },
  whatToExpectHeading: "What to expect.",
  whatToExpectIntro:
    "Reaching out is usually the hardest part. Here's how the first weeks tend to go, so there are fewer unknowns.",
  whatToExpectSteps: [
    {
      icon: "✉️",
      title: "Reach out.",
      body:
        "Send a short note about what's going on. I read every message personally and reply within two business days — usually faster.",
    },
    {
      icon: "📞",
      title: "Free 15-minute call.",
      body:
        "A no-pressure conversation about what you're looking for, my approach, and whether we're a good fit. Either of us can say no.",
    },
    {
      icon: "🌿",
      title: "First session.",
      body:
        "We meet — in person or over secure video — and start building the kind of trust that makes the real work possible. Most clients book weekly to start.",
    },
  ],
  aboutTeaserHeading: "About me",
  aboutTeaserBody:
    "I help adults navigate the moments when life feels too big to carry alone — anxiety, depression, grief, life transitions, and the relationship patterns that quietly erode connection over time. My approach is collaborative, warm, and grounded in modern therapy techniques.",
  pricingHeading: "Fees & insurance.",
  pricingIntro:
    "Cost is one of the first things most people want to know. I keep it transparent.",
  sessionFee: "$175 per 50-minute session",
  insuranceNote:
    "I am out-of-network with insurance. I provide monthly superbills you can submit for partial reimbursement — most PPO plans cover 40–80% of out-of-network outpatient therapy.",
  slidingScaleNote:
    "A limited number of sliding-scale spots are available. If cost is a barrier, please ask.",
};

export const defaultTestimonials: Testimonial[] = [
  {
    _id: "default-1",
    quote:
      "I'd been carrying the same knot in my chest for years and didn't think therapy could touch it. Six months in, the knot is smaller and I know what to do when it shows up.",
    attribution: "M., 34",
    context: "Anxiety · 6 months",
    displayOrder: 1,
  },
  {
    _id: "default-2",
    quote:
      "She's the first therapist who actually pushed back on me — gently, but enough that I felt seen instead of managed. That made all the difference.",
    attribution: "A client",
    context: "Life transitions",
    displayOrder: 2,
  },
  {
    _id: "default-3",
    quote:
      "We almost called off the wedding. We didn't. The work in this room is part of why.",
    attribution: "Couple, mid-30s",
    context: "Couples therapy · 9 months",
    displayOrder: 3,
  },
];

export const defaultAboutPage: AboutPage = {
  heading: "About me",
  intro:
    "Hi, I'm a licensed clinical psychologist. For over a decade, I've helped adults navigate the moments when life feels too big to carry alone — anxiety, depression, grief, transitions, and the relationship struggles that quietly erode connection over time. My practice is based in Austin, and I see clients across Texas via secure telehealth.",
  body: [],
  credentials: [
    "Ph.D., Clinical Psychology",
    "Licensed Psychologist (Texas)",
    "Member, American Psychological Association",
    "Post-doctoral training in CBT and ACT",
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
  heading: "Get in touch",
  intro:
    "Reach out by email or phone, and I'll get back to you within two business days. If we're a good fit, we'll set up a brief consultation call before scheduling a first session.",
  email: "hello@example.com",
  phone: "(555) 123-4567",
  addressLine: "123 Main Street, Austin, TX",
  hours: [
    { day: "Mon – Thu", time: "9:00 am – 6:00 pm" },
    { day: "Fri", time: "9:00 am – 1:00 pm" },
  ],
};

export const defaultPosts: PostListItem[] = [];
export const defaultRecentPosts: RecentPost[] = [];

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
