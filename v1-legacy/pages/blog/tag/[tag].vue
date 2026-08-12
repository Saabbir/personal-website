<template>
  <section class="section u-py-32 u-bg-gray-dark">
    <div class="l-wrap l-wrap--700">
      <div class="c-banner u-br-4">
        <h1 class="c-page-title u-text-uppercase u-text-center">
          <small class="c-page-title__small">Articles tagged</small>
          <span class="c-page-title__text">{{ tag }}</span>
        </h1>
      </div>
      <div class="u-mt-32">
        <ul class="c-articles-list">
          <li v-for="article of articles" :key="article.slug" class="c-blog-post">
            <div>
              <NuxtLink :to="`/blog/${article.slug}`" class="c-blog-post__link"> </NuxtLink>
              <NuxtLink :to="`/blog/${article.slug}`" class="c-blog-post__title-link">
                <h2 class="c-blog-post__title">{{ article.title }}</h2>
              </NuxtLink>
              <p class="c-blog-post__text">{{ article.description }}</p>
            </div>
            <div class="c-blog-post__date">{{ formatDate(article.createdAt) }}</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

const route = useRoute();
const tag = decodeURIComponent(route.params.tag as string);

const { data: articlesData } = await useAsyncData(`blog-tag-${tag}`, () =>
  queryContent("articles")
    .where({ tags: { $contains: tag } })
    .where({ publish: true })
    .sort({ createdAt: -1 })
    .find()
);
const articles = computed(() => withSlug(articlesData.value ?? []));

useHead({
  title: `Articles tagged: ${tag}`,
  meta: [{ name: "description", content: `All blog posts tagged in: ${tag}` }],
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

<style lang="scss" scoped></style>
