import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { contentDateValue, parseContentDate } from '../utils/seo';

export async function GET(context: { site: string }) {
  const articles = await getCollection('articles');
  const publishedArticles = articles
    .filter((a) => a.data.publish !== false)
    .sort((a, b) => contentDateValue(b.data.createdAt) - contentDateValue(a.data.createdAt));

  return rss({
    title: 'Saabbir Hossain — Blog & Articles',
    description: 'Articles on JavaScript, Web Performance, Shopify Plus, and A/B Testing by Saabbir Hossain.',
    site: context.site || 'https://saabbir.com',
    items: publishedArticles.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: parseContentDate(post.data.createdAt) || new Date(),
      link: post.data.external && post.data.externalUrl ? post.data.externalUrl : `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
