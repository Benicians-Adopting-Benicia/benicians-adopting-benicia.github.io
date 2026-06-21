import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    // About
    hero_image: z.string().optional(),
    hero_alt: z.string().optional(),
    pillars: z.array(z.object({ num: z.string(), title: z.string(), body: z.string() })).optional(),
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
