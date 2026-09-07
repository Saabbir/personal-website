import type { CollectionEntry } from 'astro:content';
import { contentDateValue } from './seo';

export interface AdjacentItem {
  slug: string;
  title: string;
}

type DatedEntry = CollectionEntry<'articles'> | CollectionEntry<'snippets'>;

export function getAdjacentEntries<T extends DatedEntry>(
  entries: T[],
  slug: string
): { prev: AdjacentItem | null; next: AdjacentItem | null } {
  const sorted = entries
    .filter((entry) => entry.data.publish !== false)
    .filter((entry) => !('external' in entry.data && entry.data.external))
    .sort((a, b) => {
      const dateDiff = contentDateValue(b.data.createdAt) - contentDateValue(a.data.createdAt);
      return dateDiff !== 0 ? dateDiff : a.slug.localeCompare(b.slug);
    });

  const index = sorted.findIndex((entry) => entry.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }

  const newer = index > 0 ? sorted[index - 1] : undefined;
  const older = index < sorted.length - 1 ? sorted[index + 1] : undefined;

  return {
    prev: older ? { slug: older.slug, title: older.data.title } : null,
    next: newer ? { slug: newer.slug, title: newer.data.title } : null,
  };
}
