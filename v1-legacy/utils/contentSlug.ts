/**
 * Nuxt Content v2 uses _path (e.g. "/articles/my-post") not slug.
 * Derive slug from _path (last segment) when slug is missing.
 */
export function getContentSlug(item: { slug?: string; _path?: string } | null | undefined): string {
  if (!item) return "";
  if (item.slug) return item.slug;
  const path = item._path ?? "";
  const segments = path.replace(/^\/+|\/+$/g, "").split("/");
  return segments.length ? segments[segments.length - 1]! : "";
}

/** Normalize a list of content items so each has a .slug */
export function withSlug<T extends { slug?: string; _path?: string }>(items: T[]): (T & { slug: string })[] {
  return items.map((item) => ({
    ...item,
    slug: getContentSlug(item),
  }));
}

/** Normalize a single content item to have .slug */
export function withSlugOne<T extends { slug?: string; _path?: string }>(
  item: T | null | undefined,
  fallback = ""
): (T & { slug: string }) | null {
  if (item == null) return null;
  return {
    ...item,
    slug: getContentSlug(item) || fallback,
  };
}
