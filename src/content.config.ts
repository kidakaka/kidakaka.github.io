import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    slug: z.string(),
    year: z.string(),
    month: z.string(),
    day: z.string(),
    categories: z.array(z.string()).default([]),
    excerpt: z.string().optional().default(''),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
