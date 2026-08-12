<template>
  <div class="sections">
    <section class="section c-banner">
      <div class="l-wrap l-wrap--700">
        <h1 class="c-page-title u-text-center u-text-uppercase">My snippets</h1>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search snippets"
          class="c-search-input"
        />
      </div>
    </section>
    <section class="section u-py-32">
      <div class="l-wrap l-wrap--700">
        <ul v-if="filteredSnippets.length" class="c-articles-list">
          <li v-for="snippet of filteredSnippets" :key="snippet.slug" class="c-blog-post">
            <div>
              <NuxtLink :to="`/snippets/${snippet.slug}`" class="c-blog-post__link"> </NuxtLink>
              <NuxtLink :to="`/snippets/${snippet.slug}`">
                <h2 class="c-blog-post__title">{{ snippet.title }}</h2>
              </NuxtLink>
              <p class="c-blog-post__text">{{ snippet.description }}</p>
            </div>
            <div class="c-blog-post__date">{{ formatDate(snippet.createdAt) }}</div>
          </li>
        </ul>
        <p v-else class="no-article-matched">No snippets matched to your search query!</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

useHead({
  title: "Snippets",
  meta: [
    {
      name: "description",
      content:
        "Code snippets and short tips by Saabbir Hossain — CSS, JavaScript, and front-end development.",
    },
  ],
});

const { data: snippetsData } = await useAsyncData("snippets-list", () =>
  queryContent("snippets").sort({ createdAt: -1 }).find()
);
const snippets = computed(() => withSlug(snippetsData.value ?? []));

const searchQuery = ref("");
const filteredSnippets = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return snippets.value;
  return snippets.value.filter(
    (s: { title?: string; description?: string }) =>
      (s.title ?? "").toLowerCase().includes(q) || (s.description ?? "").toLowerCase().includes(q)
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
