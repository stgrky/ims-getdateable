import type { PortableTextBlock } from "@portabletext/react";
import type { Image as SanityImage, Slug } from "sanity";

export type SanityImageWithAlt = SanityImage & {
  alt?: string;
  caption?: string;
};

export type PaletteName =
  | "sage"
  | "navy"
  | "terracotta"
  | "lavender"
  | "teal"
  | "dateable";

export type FontPairingName =
  | "cormorant"
  | "libre-franklin"
  | "fraunces"
  | "marcellus"
  | "plus-jakarta";

export interface SiteSettings {
  practiceName?: string;
  tagline?: string;
  palette?: PaletteName;
  fontPairing?: FontPairingName;
  logo?: SanityImageWithAlt;
  favicon?: SanityImageWithAlt;
  email?: string;
  phone?: string;
  addressLine?: string;
  socialLinks?: { label?: string; url?: string }[];
  footerText?: string;
  stickyCta?: { label?: string; href?: string };
}

export interface Cta {
  label?: string;
  href?: string;
}

export interface Offering {
  title?: string;
  body?: string;
  icon?: string;
  ctaLabel?: string;
  href?: string;
}

export interface HomePage {
  heroEyebrow?: string;
  heroHeading?: string;
  heroQuote?: string;
  heroQuoteAuthor?: string;
  heroSubhead?: string;
  heroImage?: SanityImageWithAlt;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  introHeading?: string;
  introBody?: string;
  painPoints?: string[];
  introClosing?: string;
  missionHeading?: string;
  missionIntro?: string;
  missionPoints?: string[];
  offeringsHeading?: string;
  offerings?: Offering[];
  communityHeading?: string;
  communityBody?: string;
  communityCta?: Cta;
  newsletterHeading?: string;
  newsletterBody?: string;
}

export interface Testimonial {
  _id: string;
  quote?: string;
  attribution?: string;
  context?: string;
  displayOrder?: number;
}

export type AnnouncementVariant = "info" | "accent" | "urgent";

export interface Announcement {
  _id?: string;
  _updatedAt?: string;
  enabled?: boolean;
  message?: string;
  linkLabel?: string;
  linkHref?: string;
  variant?: AnnouncementVariant;
  startDate?: string;
  endDate?: string;
}

export interface AboutPage {
  heading?: string;
  intro?: string;
  body?: PortableTextBlock[];
  portrait?: SanityImageWithAlt;
  credentials?: string[];
}

export interface ServiceItem {
  title?: string;
  description?: string;
  icon?: string;
}

export interface ServicesPage {
  heading?: string;
  intro?: string;
  services?: ServiceItem[];
}

export interface ContactPage {
  heading?: string;
  intro?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  schedulingUrl?: string;
  hours?: { day?: string; time?: string }[];
}

export interface PodcastEpisode {
  _id: string;
  title?: string;
  episodeNumber?: number;
  spotifyUrl?: string;
  publishedAt?: string;
  guests?: string;
  showNotes?: string;
}

export interface PodcastPage {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  showUrl?: string;
  featuredEpisode?: PodcastEpisode;
  platformLinks?: { label?: string; url?: string }[];
}

export interface AssessmentPage {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  benefitsHeading?: string;
  benefits?: string[];
  typeformUrl?: string;
}

export interface CommunityPage {
  eyebrow?: string;
  heading?: string;
  body?: string;
  pointsHeading?: string;
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface AuthorRef {
  _id: string;
  name?: string;
  photo?: SanityImageWithAlt;
  bio?: PortableTextBlock[];
  credentials?: string;
  isGuestContributor?: boolean;
  isLicensedClinician?: boolean;
}

export interface CategoryRef {
  _id: string;
  title?: string;
  slug?: string;
}

export interface PostListItem {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  featuredImage?: SanityImageWithAlt;
  publishedAt?: string;
  author?: {
    _id: string;
    name?: string;
    photo?: SanityImageWithAlt;
    isGuestContributor?: boolean;
  };
  categories?: CategoryRef[];
}

export interface ReviewerRef {
  _id: string;
  name?: string;
  credentials?: string;
  isLicensedClinician?: boolean;
}

export interface PostDetail extends PostListItem {
  body?: PortableTextBlock[];
  author?: AuthorRef;
  updatedAt?: string;
  clinicalReviewer?: ReviewerRef;
  editor?: ReviewerRef;
}

export interface BlogIndexResult {
  posts: PostListItem[];
  total: number;
}

export interface RecentPost {
  _id: string;
  title?: string;
  slug?: string;
  featuredImage?: SanityImageWithAlt;
  publishedAt?: string;
}

export type SlugRef = Slug;
