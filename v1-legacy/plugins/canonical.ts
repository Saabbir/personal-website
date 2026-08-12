/**
 * Sets a canonical link for the current page so search engines see the preferred URL in the initial HTML.
 */
export default defineNuxtPlugin(() => {
  const route = useRoute();
  const canonicalUrl = computed(
    () => `https://saabbir.github.io${route.fullPath || "/"}`
  );
  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
  });
});
