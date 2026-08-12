<template>
  <div class="sections">
    <section class="section section--banner c-banner">
      <div class="l-wrap l-wrap--700">
        <h1 class="c-page-title u-text-center u-text-uppercase">My writings</h1>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles"
          class="c-search-input"
        />
        <div v-if="uniqueArticleTags.length" class="c-tags u-mt-32">
          <NuxtLink
            v-for="(tag, index) in uniqueArticleTags"
            :key="index"
            class="c-tag"
            :to="`/blog/tag/${encodeURIComponent(tag)}`"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="section section--blog u-py-0">
      <div class="l-wrap l-wrap--700">
        <div class="u-py-32">
          <ul v-if="filteredArticles.length" class="c-articles-list">
            <li v-for="article of filteredArticles" :key="article.slug" class="c-blog-post">
              <div>
                <NuxtLink :to="`/blog/${article.slug}`" class="c-blog-post__link"> </NuxtLink>
                <NuxtLink :to="`/blog/${article.slug}`">
                  <h2 class="c-blog-post__title">{{ article.title }}</h2>
                </NuxtLink>
                <p class="c-blog-post__text">{{ article.description }}</p>
              </div>
              <div class="c-blog-post__date">{{ formatDate(article.createdAt) }}</div>
            </li>
          </ul>
          <p v-else class="no-article-matched">No articles matched to your search query!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

useHead({
  title: "Blog",
  meta: [
    {
      name: "description",
      content:
        "Blog posts and articles by Saabbir Hossain on front-end development, A/B testing, JavaScript, and web performance.",
    },
  ],
});

const { data: articlesData } = await useAsyncData("blog-list", () =>
  queryContent("articles")
    .where({ publish: true })
    .sort({ createdAt: -1 })
    .find()
);

const articles = computed(() => withSlug(articlesData.value ?? []));
const uniqueArticleTags = computed(() => {
  const all: string[] = [];
  articles.value.forEach((a: { tags?: string[] }) => a.tags && all.push(...a.tags));
  return [...new Set(all)];
});

const searchQuery = ref("");
const filteredArticles = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return articles.value;
  return articles.value.filter(
    (a: { title?: string; description?: string }) =>
      (a.title ?? "").toLowerCase().includes(q) || (a.description ?? "").toLowerCase().includes(q)
  );
});

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

onMounted(() => {
  window.onload = driftBot;
  vhHack();
});
</script>

<style lang="scss" scoped>
.no-article-matched {
  margin: 0;
  text-align: center;
}
</style>
