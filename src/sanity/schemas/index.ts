import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { announcement } from "./announcement";
import { assessmentPage } from "./assessmentPage";
import { author } from "./author";
import { blockContent } from "./blockContent";
import { category } from "./category";
import { communityPage } from "./communityPage";
import { contactPage } from "./contactPage";
import { homePage } from "./homePage";
import { podcastEpisode } from "./podcastEpisode";
import { podcastPage } from "./podcastPage";
import { post } from "./post";
import { servicesPage } from "./servicesPage";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  author,
  category,
  post,
  testimonial,
  announcement,
  podcastEpisode,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  podcastPage,
  assessmentPage,
  communityPage,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "contactPage",
  "announcement",
  "podcastPage",
  "assessmentPage",
  "communityPage",
]);
