import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  practiceName,
  tagline,
  palette,
  fontPairing,
  logo,
  favicon,
  email,
  phone,
  addressLine,
  socialLinks,
  footerText,
  stickyCta
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroEyebrow,
  heroHeading,
  heroQuote,
  heroQuoteAuthor,
  heroSubhead,
  heroImage,
  primaryCta,
  secondaryCta,
  introHeading,
  introBody,
  painPoints,
  introClosing,
  missionHeading,
  missionIntro,
  missionPoints,
  offeringsHeading,
  offerings,
  communityHeading,
  communityBody,
  communityCta,
  newsletterHeading,
  newsletterBody,
  audienceCards
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial"] | order(coalesce(displayOrder, 9999) asc, _createdAt desc)[0...5]{
  _id,
  quote,
  attribution,
  context,
  displayOrder
}`;

export const announcementQuery = groq`*[_type == "announcement"][0]{
  _id,
  _updatedAt,
  enabled,
  message,
  linkLabel,
  linkHref,
  variant,
  startDate,
  endDate
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  eyebrow,
  heading,
  intro,
  founders[]{
    name,
    headline,
    title,
    portrait,
    bio,
    ctaLabel,
    ctaHref
  }
}`;

const episodeProjection = `{
  _id,
  title,
  episodeNumber,
  spotifyUrl,
  publishedAt,
  guests,
  showNotes
}`;

export const podcastPageQuery = groq`*[_type == "podcastPage"][0]{
  eyebrow,
  heading,
  intro,
  showUrl,
  platformLinks,
  featuredEpisode->${episodeProjection}
}`;

export const allEpisodesQuery = groq`*[_type == "podcastEpisode"] | order(coalesce(episodeNumber, 0) desc, publishedAt desc)${episodeProjection}`;

export const assessmentPageQuery = groq`*[_type == "assessmentPage"][0]{
  eyebrow,
  heading,
  intro,
  benefitsHeading,
  benefits,
  typeformUrl
}`;

export const communityPageQuery = groq`*[_type == "communityPage"][0]{
  eyebrow,
  heading,
  body,
  pointsHeading,
  points,
  ctaLabel,
  ctaHref
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  heading,
  intro,
  services[]{
    title,
    description,
    icon
  }
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heading,
  intro,
  email,
  phone,
  addressLine,
  schedulingUrl,
  hours
}`;

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  publishedAt,
  author->{
    _id,
    name,
    photo,
    isGuestContributor
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

export const blogIndexQuery = groq`{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    author->{
      _id,
      name,
      photo,
      isGuestContributor
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  },
  "total": count(*[_type == "post" && defined(slug.current)])
}`;

export const recentPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage,
  publishedAt
}`;

export const similarPostsQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  slug.current != $slug &&
  count(categories[@._ref in $categoryIds]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  featuredImage,
  publishedAt
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  publishedAt,
  updatedAt,
  body,
  author->{
    _id,
    name,
    photo,
    bio,
    credentials,
    isGuestContributor,
    isLicensedClinician
  },
  clinicalReviewer->{
    _id,
    name,
    credentials,
    isLicensedClinician
  },
  editor->{
    _id,
    name,
    credentials,
    isLicensedClinician
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

