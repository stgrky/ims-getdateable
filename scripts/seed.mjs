import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-09-01";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN in .env.local.\n" +
      "Generate one in Sanity dashboard → API → Tokens (Editor permissions)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

console.log(`→ Project ${projectId}, dataset ${dataset}`);

// Seed photography is from Unsplash (royalty-free for any use, no attribution
// required). Therapist clients should swap these for their own photography via
// Sanity Studio after handoff. Images are fetched from Unsplash CDN at
// seed-time so the repo doesn't need to bundle them.
const UNSPLASH = (id, w = 1600, h = 1100) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=85&fm=jpg`;

const seedImages = [
  // ── Site imagery ──
  {
    key: "hero",
    filename: "demo-hero.jpg",
    url: UNSPLASH("1441974231531-c6227db76b6e", 1920, 1200),
    alt: "Sunlight filtering through a forest path",
  },
  {
    key: "headshot",
    filename: "demo-headshot.jpg",
    url: UNSPLASH("1573497019940-1c28c88b4f3e", 1200, 1500),
    alt: "Professional portrait of the therapist",
  },
  {
    key: "guestHeadshot",
    filename: "demo-guest-headshot.jpg",
    url: UNSPLASH("1494790108377-be9c29b29330", 1200, 1500),
    alt: "Professional portrait of guest contributor Casey Whitfield",
  },
  {
    key: "postHero",
    filename: "demo-post-hero.jpg",
    url: UNSPLASH("1448375240586-882707db888b", 1920, 1080),
    alt: "Mist drifting through a quiet forest",
  },
  // ── Blog post imagery (one per new post) ──
  {
    key: "postBooks",
    filename: "demo-post-books.jpg",
    url: UNSPLASH("1457369804613-52c61a468e7d"),
    alt: "A wall of open book pages",
  },
  {
    key: "postMistMtn",
    filename: "demo-post-mist-mtn.jpg",
    url: UNSPLASH("1532009324734-20a7a5813719"),
    alt: "Layers of mountains fading into mist",
  },
  {
    key: "postMtnDawn",
    filename: "demo-post-mtn-dawn.jpg",
    url: UNSPLASH("1485470733090-0aae1788d5af"),
    alt: "A mountain silhouette under a starlit sky",
  },
  {
    key: "postCanyon",
    filename: "demo-post-canyon.jpg",
    url: UNSPLASH("1531168556467-80aace0d0144"),
    alt: "A river winding through a moss-covered canyon",
  },
  {
    key: "postFlowers",
    filename: "demo-post-flowers.jpg",
    url: UNSPLASH("1452827073306-6e6e661baf57"),
    alt: "A small bouquet of fresh flowers in a teal pitcher",
  },
  {
    key: "postPen",
    filename: "demo-post-pen.jpg",
    url: UNSPLASH("1471107340929-a87cd0f5b5f3"),
    alt: "A fountain pen resting on a lined notebook",
  },
  {
    key: "postVista",
    filename: "demo-post-vista.jpg",
    url: UNSPLASH("1469474968028-56623f02e42e"),
    alt: "A wide mountain vista with sunlight breaking through",
  },
  {
    key: "postLeaves",
    filename: "demo-post-leaves.jpg",
    url: UNSPLASH("1518531933037-91b2f5f229cc"),
    alt: "Dense green leaves filling the frame",
  },
  {
    key: "postLotus",
    filename: "demo-post-lotus.jpg",
    url: UNSPLASH("1474557157379-8aa74a6ef541"),
    alt: "A pink lotus blooming on still water",
  },
];

console.log("→ Fetching and uploading demo images...");
const imageRefs = {};
for (const img of seedImages) {
  const res = await fetch(img.url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${img.key}: ${res.status} ${img.url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: img.filename,
  });
  imageRefs[img.key] = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: img.alt,
  };
  console.log(`   ${img.key.padEnd(14)} → ${asset._id}`);
}

const rkey = () => Math.random().toString(36).slice(2, 12);

const block = (text, style = "normal") => ({
  _type: "block",
  _key: rkey(),
  style,
  markDefs: [],
  children: [
    { _type: "span", _key: rkey(), text, marks: [] },
  ],
});

const li = (text) => ({
  _type: "block",
  _key: rkey(),
  style: "normal",
  listItem: "bullet",
  level: 1,
  markDefs: [],
  children: [
    { _type: "span", _key: rkey(), text, marks: [] },
  ],
});

const docs = [
  {
    _id: "announcement",
    _type: "announcement",
    enabled: true,
    message: "Now accepting new clients for fall intake.",
    linkLabel: "Book a free consult",
    linkHref: "/contact",
    variant: "info",
  },
  {
    _id: "siteSettings",
    _type: "siteSettings",
    practiceName: "Sample Therapist Website",
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
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Now accepting new clients · Austin & telehealth statewide",
    heroHeading: "Slow, attentive therapy for people who think too much.",
    heroSubhead:
      "Compassionate, evidence-based care for adults and couples — in person in Austin and telehealth across Texas. Let's find a way of working together that fits the life you actually live.",
    heroImage: imageRefs.hero,
    primaryCta: { label: "Book a free 15-min consult", href: "/contact" },
    secondaryCta: { label: "Learn more about me", href: "/about" },
    whatToExpectHeading: "What to expect.",
    whatToExpectIntro:
      "Reaching out is usually the hardest part. Here's how the first weeks tend to go, so there are fewer unknowns.",
    whatToExpectSteps: [
      {
        _key: "wte1",
        icon: "✉️",
        title: "Reach out.",
        body: "Send a short note about what's going on. I read every message personally and reply within two business days — usually faster.",
      },
      {
        _key: "wte2",
        icon: "📞",
        title: "Free 15-minute call.",
        body: "A no-pressure conversation about what you're looking for, my approach, and whether we're a good fit. Either of us can say no.",
      },
      {
        _key: "wte3",
        icon: "🌿",
        title: "First session.",
        body: "We meet — in person or over secure video — and start building the kind of trust that makes the real work possible. Most clients book weekly to start.",
      },
    ],
    aboutTeaserHeading: "About me",
    aboutTeaserBody:
      "I help adults navigate the moments when life feels too big to carry alone — anxiety, depression, grief, life transitions, and the relationship patterns that quietly erode connection over time. My approach is collaborative, warm, and grounded in modern therapy techniques.",
    aboutTeaserImage: imageRefs.headshot,
    pricingHeading: "Fees & insurance.",
    pricingIntro:
      "Cost is one of the first things most people want to know. I keep it transparent.",
    sessionFee: "$175 per 50-minute session",
    insuranceNote:
      "I am out-of-network with insurance. I provide monthly superbills you can submit for partial reimbursement — most PPO plans cover 40–80% of out-of-network outpatient therapy.",
    slidingScaleNote:
      "A limited number of sliding-scale spots are available. If cost is a barrier, please ask.",
  },
  {
    _id: "testimonial-1",
    _type: "testimonial",
    quote:
      "I'd been carrying the same knot in my chest for years and didn't think therapy could touch it. Six months in, the knot is smaller and I know what to do when it shows up.",
    attribution: "M., 34",
    context: "Anxiety · 6 months",
    displayOrder: 1,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    quote:
      "She's the first therapist who actually pushed back on me — gently, but enough that I felt seen instead of managed. That made all the difference.",
    attribution: "A client",
    context: "Life transitions",
    displayOrder: 2,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    quote:
      "We almost called off the wedding. We didn't. The work in this room is part of why.",
    attribution: "Couple, mid-30s",
    context: "Couples therapy · 9 months",
    displayOrder: 3,
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "About me",
    intro:
      "Hi, I'm Dr. Jordan Sample. For over a decade, I've helped adults navigate the moments when life feels too big to carry alone — anxiety, depression, grief, transitions, and the kind of relationship struggles that erode connection over time. My practice is based in Austin, and I see clients across Texas via secure telehealth.",
    portrait: imageRefs.headshot,
    body: [
      block(
        "Therapy isn't one-size-fits-all, and I don't believe it should be. The work we do together depends on who you are, what you're carrying, and what you need most right now — sometimes that's structure and skills, sometimes it's the space to feel heard for the first time, and very often it's both, in different doses on different days."
      ),
      block("Who I work with", "h3"),
      block(
        "Most of my clients are adults navigating one or more of the following:"
      ),
      li("Anxiety that's started to interfere with sleep, work, or relationships"),
      li(
        "Depression — both the heavy kind and the low-grade variety that quietly steals the joy out of ordinary days"
      ),
      li(
        "Grief, including the messy aftermath of loss that doesn't fit a tidy timeline"
      ),
      li(
        "Life transitions: career changes, divorce, becoming a parent, losing a parent, moving across the country"
      ),
      li(
        "Relationship patterns that keep showing up no matter who you're with"
      ),
      block("How we'll work together", "h3"),
      block(
        "Our first session is mostly about getting to know each other. I'll ask about what brought you in, what's been working, what hasn't, and what you'd like to be different. You'll get a sense of how I work, and we'll decide together whether I'm the right fit for what you need — and if I'm not, I'll do my best to help you find someone who is."
      ),
      block(
        "From there, sessions are usually weekly to start. The cadence shifts as the work shifts. I'll bring evidence-based tools to the table, but I'll also bring my full attention — and sometimes a sense of humor, when the moment calls for it."
      ),
      block("My approach", "h3"),
      block(
        "I draw on cognitive-behavioral therapy (CBT), acceptance and commitment therapy (ACT), and emotion-focused approaches. In practice that means we won't just talk about what's hard — we'll also work on what helps. Sometimes that's a concrete skill or experiment to try between sessions; sometimes it's slowing down enough to notice what's actually going on inside."
      ),
      block(
        "I'm also a believer in the relationship itself doing a lot of the heavy lifting. Decades of research on what makes therapy work consistently point back to the quality of the connection between client and therapist. That's not a soft thing — it's the foundation."
      ),
      block("Training & background", "h3"),
      block(
        "I earned my Ph.D. in clinical psychology and completed post-doctoral training at a community mental health center, where I worked with adults across a wide range of presenting concerns. I'm licensed in Texas and continue to seek consultation, supervision, and continuing education to keep my work current and grounded."
      ),
      block("Beyond the office", "h3"),
      block(
        "When I'm not seeing clients, you can usually find me on a long walk with my dog, reading a novel slowly, or making a meal that takes longer than it should. I believe a therapist who has their own life and their own struggles makes for a better therapist — and probably a more honest human, too."
      ),
    ],
    credentials: [
      "Ph.D., Clinical Psychology",
      "Licensed Psychologist (Texas)",
      "Member, American Psychological Association",
      "Post-doctoral training in CBT and ACT",
    ],
  },
  {
    _id: "servicesPage",
    _type: "servicesPage",
    heading: "Therapy services",
    intro:
      "Every person and every relationship is different. Sessions are tailored to what you need most right now — and the work shifts as you do.",
    services: [
      {
        _key: "svc-individual",
        _type: "service",
        title: "Individual therapy",
        description:
          "One-on-one sessions for adults working through anxiety, depression, grief, life transitions, and self-discovery. Evidence-based approaches paired with warmth and a real human relationship.",
        icon: "💬",
      },
      {
        _key: "svc-couples",
        _type: "service",
        title: "Couples therapy",
        description:
          "Therapy for couples seeking better communication, deeper emotional connection, and skills to navigate conflict without losing each other in the process.",
        icon: "🤝",
      },
      {
        _key: "svc-telehealth",
        _type: "service",
        title: "Telehealth",
        description:
          "Secure, confidential video sessions from anywhere in Texas. Same care, your space — and easier to fit into a full life.",
        icon: "🌿",
      },
    ],
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heading: "Get in touch",
    intro:
      "Reach out by email or phone, and I'll get back to you within two business days. If we're a good fit, we'll set up a brief consultation call before scheduling a first session.",
    email: "hello@example.com",
    phone: "(555) 123-4567",
    addressLine: "123 Main Street, Austin, TX",
    hours: [
      { _key: "hr-1", day: "Mon – Thu", time: "9:00 am – 6:00 pm" },
      { _key: "hr-2", day: "Fri", time: "9:00 am – 1:00 pm" },
    ],
  },
  {
    _id: "author-default",
    _type: "author",
    name: "Dr. Jordan Sample",
    slug: { _type: "slug", current: "jordan-sample" },
    credentials: "Ph.D., Licensed Psychologist (TX)",
    isGuestContributor: false,
    isLicensedClinician: true,
    photo: imageRefs.headshot,
    bio: [
      block(
        "Dr. Jordan Sample is a licensed clinical psychologist with over a decade of experience helping adults navigate anxiety, depression, grief, and the relationship patterns that get in the way of the life they want."
      ),
      block(
        "Her work draws on the conviction that meaningful change happens at the intersection of warmth and structure: a relationship in which clients feel genuinely seen, paired with concrete tools for moving forward."
      ),
    ],
  },
  {
    _id: "author-guest-casey",
    _type: "author",
    name: "Casey Whitfield",
    slug: { _type: "slug", current: "casey-whitfield" },
    credentials: "LCSW",
    isGuestContributor: true,
    photo: imageRefs.guestHeadshot,
    bio: [
      block(
        "Casey Whitfield is a licensed clinical social worker in Austin whose work centers on trauma, the nervous system, and the slow art of feeling safe in your own body again."
      ),
      block(
        "She writes here occasionally as a guest contributor — bringing a somatic, polyvagal-informed lens to the conversations we have about mental health."
      ),
    ],
  },
  {
    _id: "category-general",
    _type: "category",
    title: "General",
    slug: { _type: "slug", current: "general" },
    description: "Posts that don't fit a more specific topic.",
  },
  // ── Blog posts (most recent first, descending publishedAt) ──
  {
    _id: "post-guest-polyvagal-tldr",
    _type: "post",
    title: "Polyvagal theory, in plain language",
    slug: {
      _type: "slug",
      current: "polyvagal-theory-plain-language",
    },
    author: { _type: "reference", _ref: "author-guest-casey" },
    clinicalReviewer: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-05-22T15:00:00.000Z",
    updatedAt: "2026-06-04T15:00:00.000Z",
    excerpt:
      "A guest post on what's actually going on when your body won't calm down — and why understanding your nervous system changes the work.",
    featuredImage: imageRefs.postLeaves,
    body: [
      block(
        "Most people have heard some version of 'fight or flight,' and that's a fine start. Polyvagal theory adds two ideas that, in my experience, change how clients relate to their own bodies: there's more than one shutdown state, and safety isn't an idea — it's a physiological reality."
      ),
      block(
        "When the nervous system reads the environment as safe, we land in what Stephen Porges calls the ventral vagal state. You can think, you can be curious, you can connect. When something registers as threat, we mobilize — that's the familiar fight-or-flight gear. And when threat feels overwhelming or inescapable, we drop into dorsal shutdown: numb, flat, far away."
      ),
      block("Why this matters in the room", "h3"),
      block(
        "Talk therapy alone often doesn't reach a body that's stuck in mobilization or shutdown. So a lot of the work I do is what I'd call bottom-up: breath, orientation to the room, gentle movement, naming sensations before naming feelings. Cognitive reframes are powerful, but they tend to land better once the body has come back online."
      ),
      block("A small thing to try", "h3"),
      block(
        "If you notice yourself activated — chest tight, jaw clenched, scanning — pause and slowly look around the room. Let your eyes land on three different things. Not as a coping skill to white-knuckle through, but as an invitation: 'Right now, is this room actually a threat?' Often, the answer the body gives back is no."
      ),
      block(
        "I'll be back here occasionally to share more on this kind of work. In the meantime, Jordan's practice is a wonderful place to land if any of this resonates."
      ),
    ],
  },
  {
    _id: "post-what-therapy-looks-like",
    _type: "post",
    title: "What therapy actually looks like",
    slug: { _type: "slug", current: "what-therapy-actually-looks-like" },
    author: { _type: "reference", _ref: "author-default" },
    editor: { _type: "reference", _ref: "author-guest-casey" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-05-15T14:00:00.000Z",
    excerpt:
      "Demystifying the room for anyone who's never been. What we actually do for fifty minutes, and what we don't.",
    featuredImage: imageRefs.postBooks,
    body: [
      block(
        "Most people picture therapy from movies. A soft couch, a neutral therapist, ambient probing about your mother. It isn't entirely wrong, but it isn't the whole picture either."
      ),
      block("What it usually looks like", "h3"),
      block(
        "Most sessions are conversational. I ask questions. You answer them. Sometimes there are silences, and they're not always anxious silences. Sometimes I push back gently when something doesn't add up. Sometimes I just listen for a long time."
      ),
      block("What it isn't", "h3"),
      block(
        "It isn't advice-giving, mostly. It isn't a friend who happens to have a license. It isn't free therapy by another name — paying for it does change how you show up. And it isn't, for most of us, a place where someone has a clever interpretation that unlocks the whole thing."
      ),
      block(
        "What it tends to be, on the better days, is a place where you get to say the thing you can't quite say anywhere else, and have someone help you understand what it might mean."
      ),
    ],
  },
  {
    _id: "post-anxiety-louder-than-reasons",
    _type: "post",
    title: "When anxiety is louder than your reasons",
    slug: {
      _type: "slug",
      current: "when-anxiety-is-louder-than-your-reasons",
    },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-04-22T14:00:00.000Z",
    excerpt:
      "Anxiety isn't always proportional to the threat. Why that's a feature, not a bug.",
    featuredImage: imageRefs.postMistMtn,
    body: [
      block(
        "A common moment in session: someone explains why they shouldn't be this anxious about a thing. They have the logic worked out. They've journaled. They know, intellectually, that the worst case probably won't happen. And yet — the anxiety persists."
      ),
      block(
        "Here's what I tell them. Your anxiety isn't trying to be reasonable. It's trying to keep you safe. It uses an older, simpler operating system than the one that handles your spreadsheets. The OS that handles safety is mostly looking for patterns from your past — things that hurt, things that felt wrong, things that left you alone."
      ),
      block("Why this matters", "h3"),
      block(
        "When you understand that anxiety isn't a logic puzzle, you stop fighting it on the wrong battlefield. You stop expecting that a really compelling thought will turn it off. Instead you can ask the more useful question: what is this trying to protect me from? What does my body think is at stake?"
      ),
      block(
        "That question, taken seriously, tends to do more than a thousand reframes. It also tends to be uncomfortable. That's usually a sign you're onto something."
      ),
    ],
  },
  {
    _id: "post-grief-no-timeline",
    _type: "post",
    title: "On grief that doesn't fit a timeline",
    slug: { _type: "slug", current: "on-grief-that-doesnt-fit-a-timeline" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-04-03T14:00:00.000Z",
    excerpt:
      "Grief is non-linear. A short defense of giving yourself longer than seems reasonable.",
    featuredImage: imageRefs.postMtnDawn,
    body: [
      block(
        "Grief, in the cultural imagination, is supposed to look like a downhill ski run. Steep at the top, then gentler, then flat, then back to normal life. Some grief actually does look like that."
      ),
      block(
        "But a lot of grief — maybe most of it — looks like weather. It comes back. It changes shape. It surprises you at six months and then again at two years. It misses anniversaries and shows up at random Tuesday lunches."
      ),
      block("What I tell clients", "h3"),
      block(
        "If you're somewhere between three months and twenty years out from a loss and you still feel it: you are not stuck. You are not broken. You are not failing at grief. You are doing the thing humans do when we lose someone or something important."
      ),
      block(
        "The thing that helps isn't moving on. It's letting the loss become part of how you move. The shape of it stays. The capacity to live around it, with it, despite it — that grows."
      ),
    ],
  },
  {
    _id: "post-myth-of-ready",
    _type: "post",
    title: "The myth of feeling “ready” for therapy",
    slug: { _type: "slug", current: "the-myth-of-feeling-ready-for-therapy" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-03-12T14:00:00.000Z",
    excerpt:
      "If you're waiting until it gets bad enough, you've already missed the point.",
    featuredImage: imageRefs.postCanyon,
    body: [
      block(
        "A surprising number of people tell me, in the first session, that they feel a little silly being here. They aren't sure their stuff is bad enough. They wonder if they're taking a spot from someone who really needs it."
      ),
      block(
        "I have a strong opinion about this. You don't need a crisis to deserve therapy. You don't need to have hit a wall. You don't need a clean diagnosis. The bar isn't \"it has to be bad enough.\" The bar is \"I'd like to be more like the person I'm capable of being.\""
      ),
      block("When I see people most", "h3"),
      block(
        "I see people in crisis, sure. But I see at least as many who come because they're functioning, on paper, and yet something feels off. They aren't depressed exactly. They aren't anxious exactly. They're just running on a thinner margin than they want to."
      ),
      block(
        "That's a great time to start. Earlier is almost always better. Less to undo, more time to build something different."
      ),
    ],
  },
  {
    _id: "post-hard-mornings",
    _type: "post",
    title: "Three small skills for hard mornings",
    slug: { _type: "slug", current: "three-small-skills-for-hard-mornings" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-02-18T14:00:00.000Z",
    excerpt:
      "When getting out of bed feels disproportionate to the day ahead — try one of these.",
    featuredImage: imageRefs.postFlowers,
    body: [
      block(
        "Some mornings are mornings. Some mornings are a small mountain. Here are three small things that have helped clients (and me) on the latter."
      ),
      block("Name what's heavy", "h3"),
      block(
        "Before you've even moved, take thirty seconds to say to yourself: what's heaviest about today, specifically? Sometimes the answer is a meeting you're dreading. Sometimes it's grief that has nothing to do with today. Sometimes it's nothing you can put your finger on, which is also data. Just naming it dials the volume down a little."
      ),
      block("Lower the first task", "h3"),
      block(
        "Whatever you were going to do first — make it smaller. Don't \"go for a run,\" sit on the couch in your running shoes. Don't \"start the report,\" open the document. Tiny first tasks bypass the part of you that's already deciding the day is unmanageable."
      ),
      block("Move before you decide", "h3"),
      block(
        "If you have the kind of brain that argues with itself about whether to get up, give the argument less ammunition. Put your feet on the floor before the deliberation starts. Walk to the kitchen. The thinking part of you can catch up later."
      ),
    ],
  },
  {
    _id: "post-body-keeps-score",
    _type: "post",
    title: "Reading: The Body Keeps the Score",
    slug: { _type: "slug", current: "reading-the-body-keeps-the-score" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-01-28T14:00:00.000Z",
    excerpt:
      "A book I keep recommending — what it gets right about trauma and the body, and a small caveat.",
    featuredImage: imageRefs.postPen,
    body: [
      block(
        "Bessel van der Kolk's The Body Keeps the Score is, by now, one of the most-recommended books in trauma therapy. It deserves its reputation. I recommend it often, with one caveat I'll get to."
      ),
      block(
        "What it gets right, more clearly than almost any other accessible book: the way trauma lives in the body, not just the story. The way somatic experience — heart rate, posture, gut, breath — is part of the picture, not separate from the \"real\" psychological work. The way certain bodies of treatment (EMDR, IFS, somatic experiencing, yoga, theater) can do things that pure talk therapy sometimes can't."
      ),
      block("The caveat", "h3"),
      block(
        "It's a fairly intense read in places. If you yourself have unprocessed trauma, you might find specific chapters destabilizing. That's not a reason not to read it — it's a reason to read it with care, ideally with a therapist you can take material into, and to put it down if a section is too much."
      ),
      block(
        "If you want a gentler entry point first, Resmaa Menakem's My Grandmother's Hands covers similar territory through the specific lens of inherited racialized trauma, and is more practice-oriented from the start."
      ),
    ],
  },
  {
    _id: "post-good-enough",
    _type: "post",
    title: "What we mean by “good enough”",
    slug: { _type: "slug", current: "what-we-mean-by-good-enough" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2026-01-05T14:00:00.000Z",
    excerpt:
      "A piece of therapy language that makes a big difference. From Winnicott, originally, but useful far outside of parenting.",
    featuredImage: imageRefs.postVista,
    body: [
      block(
        "A small piece of therapy language: \"good enough.\" The British psychoanalyst Donald Winnicott originally used it to describe parents. He argued that children don't need perfect parents — they need ones who are reliably present, attuned often enough, and able to repair when they fail. \"Good enough\" was his alternative to an impossible standard."
      ),
      block(
        "The phrase has aged well outside of parenting. I use it all the time with clients who are running themselves into the ground trying to be perfect partners, perfect professionals, perfect friends. \"Good enough\" isn't a license to slack. It's a recognition that the human-shaped standard is way below the punishing one most of us are trying to meet."
      ),
      block("What it changes", "h3"),
      block(
        "When someone genuinely takes on a \"good enough\" framing — not as a slogan, but as a working standard — the cost of any given moment goes way down. A hard conversation doesn't have to be perfectly delivered to be valuable. A piece of work doesn't have to be flawless to be useful. A relationship doesn't have to be conflict-free to be real."
      ),
      block(
        "That doesn't mean you stop trying. It means you stop punishing yourself for being human-shaped while you do."
      ),
    ],
  },
  {
    _id: "post-boundaries-not-walls",
    _type: "post",
    title: "Boundaries aren't walls",
    slug: { _type: "slug", current: "boundaries-arent-walls" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2025-12-10T14:00:00.000Z",
    excerpt:
      "Probably the most overused word in pop psychology. Worth reclaiming what it actually means.",
    featuredImage: imageRefs.postLeaves,
    body: [
      block(
        "\"Boundaries\" has become, in the last decade or so, one of those words that's everywhere and barely anywhere. Repeated so often that it stops meaning anything specific. Sometimes when I hear \"I'm setting a boundary\" in session, I have to gently ask: what do you mean, exactly?"
      ),
      block(
        "A useful working definition: a boundary is a clear statement about what you will or won't do, not a demand that the other person change. \"I'm not available to talk after 9pm\" is a boundary. \"You can't text me after 9pm\" is closer to a request, or sometimes a control attempt dressed as a boundary."
      ),
      block("Why the distinction matters", "h3"),
      block(
        "Boundaries that focus on your own behavior are inside your control. If someone keeps texting after 9, you don't have to text back. You can turn your phone off. You can address the pattern in a separate conversation. A request can be respected or not. A \"boundary\" as control attempt sets up the other person as the only one who can change the outcome — which usually makes everyone more frustrated."
      ),
      block(
        "Boundaries aren't walls. They're not punishment. They're not a way to make someone behave differently. They're an answer to a more honest question: given that this person is who they are, what am I willing to do?"
      ),
    ],
  },
  {
    _id: "post-quiet-depression",
    _type: "post",
    title: "On the quiet kind of depression",
    slug: { _type: "slug", current: "on-the-quiet-kind-of-depression" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2025-11-15T14:00:00.000Z",
    excerpt:
      "The depression that doesn't look like depression. And why it's the harder kind to name.",
    featuredImage: imageRefs.postLotus,
    body: [
      block(
        "When most people picture depression, they picture the visible version. Someone struggling to get out of bed, isolated, tearful, unable to function. That version exists. It's real. It's serious. It's also not the version most of my clients with depression actually have."
      ),
      block(
        "The more common version, in my office at least, looks like this: someone who's still going to work, still showing up for their family, still meeting their deadlines. Someone who would tell you, asked directly, that things are fine. And yet — they're moving through their life like it's underwater. The colors are dimmer. Pleasure doesn't fully land. The energy required for ordinary things feels disproportionate."
      ),
      block("Why it's harder to name", "h3"),
      block(
        "The visible version of depression has cultural permission. The quiet version is harder to claim, because you can't point to evidence. You're functioning. By any external measure, you're fine. There's a particular kind of loneliness in having a real problem and feeling like you don't have the credentials to call it one."
      ),
      block(
        "If you recognize yourself in this — the muted feeling, the dimmer colors, the sense that you're going through motions that used to be alive — please don't wait for it to get visible-version bad to take it seriously. The quiet kind is the same animal. It responds to the same things. You don't have to earn the right to ask for help."
      ),
    ],
  },
  {
    _id: "post-welcome",
    _type: "post",
    title: "Welcome to the blog",
    slug: { _type: "slug", current: "welcome" },
    author: { _type: "reference", _ref: "author-default" },
    categories: [
      { _key: "cat-general", _type: "reference", _ref: "category-general" },
    ],
    publishedAt: "2025-09-01T14:00:00.000Z",
    excerpt:
      "A short intro post — what you can expect to read here, and an invitation to reach out.",
    featuredImage: imageRefs.postHero,
    body: [
      block(
        "Welcome — and thank you for being here. I started this space because so many of the questions I hear in session aren't questions any one client needs to figure out alone."
      ),
      block("What you'll find here", "h3"),
      block(
        "Notes on therapy and mental health, with the occasional reading recommendation, gentle reframe, or specific skill that's helped clients (and me). I'll try to write the way I'd talk to you in session: thoughtfully, in plain language, and without pretending to have all the answers."
      ),
      block("A few things this isn't", "h3"),
      block(
        "This isn't a substitute for therapy. If something here resonates, take it with you — but please don't use a blog post in place of a real conversation with a real therapist if you need one."
      ),
      block(
        "It's also not a place where I'll share anything specific about clients. Everything I write is composite, generalized, or about my own experience. Confidentiality is the bedrock of this work, and I take it seriously."
      ),
      block(
        "If you have questions or topics you'd like me to write about, you're welcome to reach out via the contact page. I read everything, even when I can't reply to all of it."
      ),
    ],
  },
];

console.log("→ Upserting documents...");
for (const doc of docs) {
  const result = await client.createOrReplace(doc);
  console.log(`   ${result._type.padEnd(15)}  ${result._id}`);
}

console.log(
  "\n✓ Seed complete. Refresh the site and /studio to see the content."
);
