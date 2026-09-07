import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: string }) {
  const articles = await getCollection('articles');
  const publishedArticles = articles
    .filter((a) => a.data.publish !== false)
    .sort((a, b) => new Date(b.data.createdAt || '').getTime() - new Date(a.data.createdAt || '').getTime());

  return rss({
    title: 'Saabbir Hossain — Blog & Articles',
    description: 'Articles on JavaScript, Web Performance, Shopify Plus, and A/B Testing by Saabbir Hossain.',
    site: context.site || 'https://saabbir.com',
    items: publishedArticles.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.createdAt || new Date()),
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
