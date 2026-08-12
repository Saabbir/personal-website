import { defineCollection, z } from 'astro:content';

const nullableString = z.union([z.string(), z.null()]).optional().transform((val) => val ?? '');

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: nullableString,
    featuredImg: z.union([z.string(), z.null()]).optional(),
    createdAt: nullableString,
    publish: z.boolean().optional().default(true),
    tags: z.array(z.string()).optional().default([]),
    layout: z.union([z.string(), z.null()]).optional(),
  }),
});

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: nullableString,
    highlight: nullableString,
    createdAt: nullableString,
    publish: z.boolean().optional().default(true),
    type: z.string().optional().default('Project'),
    imgFolderName: z.union([z.string(), z.null()]).optional(),
    featured: z.boolean().optional().default(false),
    url: z.union([z.string(), z.null()]).optional(),
    category: z.array(z.string()).optional().default([]),
    tools: z.array(z.string()).optional().default([]),
    layout: z.union([z.string(), z.null()]).optional(),
  }),
});

const snippetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: nullableString,
    createdAt: nullableString,
    publish: z.boolean().optional().default(true),
    tags: z.array(z.string()).optional().default([]),
    layout: z.union([z.string(), z.null()]).optional(),
  }),
});

export const collections = {
  articles: articlesCollection,
  work: workCollection,
  snippets: snippetsCollection,
};
