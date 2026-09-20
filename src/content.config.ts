import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    // Home
    hero_heading_top: z.string().optional(),
    hero_heading_accent: z.string().optional(),
    hero_heading_end: z.string().optional(),
    hero_lead: z.string().optional(),
    hero_cta_donate: z.string().optional(),
    hero_cta_involved: z.string().optional(),
    hero_caption: z.string().optional(),
    hero_photo_alt: z.string().optional(),
    pillars_heading: z.string().optional(),
    quote_eyebrow: z.string().optional(),
    quote: z.string().optional(),
    video_heading: z.string().optional(),
    gallery_heading: z.string().optional(),
    gallery_intro: z.string().optional(),
    events_cta: z.object({
      eyebrow: z.string(),
      title: z.string(),
      body: z.string(),
      cta: z.string(),
    }).optional(),
    social_heading: z.string().optional(),
    social_intro: z.string().optional(),
    // About
    hero_image: image().optional(),
    hero_alt: z.string().optional(),
    // `title` + `body` render on the About page; `card_title` + `summary`
    // render on the homepage cards. card_title is optional and falls back
    // to title — set it only when the full title is too long for a card.
    pillars: z.array(z.object({
      num: z.string(),
      title: z.string(),
      card_title: z.string().optional(),
      summary: z.string(),
      body: z.string(),
    })).optional(),
    // Newsletter
    issue_label: z.string().optional(),
    issue_title: z.string().optional(),
    // Events
    intro: z.string().optional(),
    // Get Involved
    donate: z.object({ title: z.string(), body: z.string(), cta: z.string() }).optional(),
    banner: z.object({ title: z.string(), body: z.string(), cta: z.string() }).optional(),
    volunteer: z.object({ title: z.string(), body: z.string() }).optional(),
  }),
});

export const collections = { pages };
