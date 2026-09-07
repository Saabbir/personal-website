import type { CollectionEntry } from 'astro:content';

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\//g, '-')
    .replace(/\s+/g, '-');
}

export function isExternalArticle(article: CollectionEntry<'articles'>) {
  return article.data.external === true && Boolean(article.data.externalUrl);
}

export function articleHref(article: CollectionEntry<'articles'>) {
  if (isExternalArticle(article) && article.data.externalUrl) {
    return article.data.externalUrl;
  }
  return `/blog/${article.slug}/`;
}

export function articleLinkRel(article: CollectionEntry<'articles'>) {
  if (!isExternalArticle(article)) return {};
  return { target: '_blank' as const, rel: 'noopener noreferrer' };
}
