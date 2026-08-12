/** Canonical base URL for the site (used for og:url, canonical, absolute image URLs). */
const SITE_BASE = "https://saabbir.github.io";

export function useSiteUrl() {
  const route = useRoute();
  const canonicalUrl = computed(() => `${SITE_BASE}${route.fullPath}`);
  const absoluteImage = (path: string) =>
    path.startsWith("http") ? path : `${SITE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  return { base: SITE_BASE, canonicalUrl, absoluteImage };
}
