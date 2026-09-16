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
    external: z.boolean().optional().default(false),
    externalUrl: z.string().url().optional(),
    externalSource: z.string().optional(),
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
    client: z.string().optional(),
    eyebrow: z.string().optional(),
    tool: z.string().optional(),
    duration: z.string().optional(),
    dateRange: z.string().optional(),
    visitors: z.union([z.string(), z.number()]).optional(),
    trafficSplit: z.string().optional(),
    scope: z.string().optional(),
    caseLayout: z.enum(['ab-test', 'performance', 'shopify', 'analytics', 'other']).optional(),
    metric: z.string().optional(),
    metricLabel: z.string().optional(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      baseline: z.string().optional(),
      variation: z.string().optional(),
      featured: z.boolean().optional(),
    })).optional().default([]),
    download: z.object({
      href: z.string(),
      filename: z.string().optional(),
      label: z.string().optional(),
    }).optional(),
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
