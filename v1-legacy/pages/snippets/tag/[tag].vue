<template>
  <section class="section u-py-32 u-bg-gray-dark">
    <div class="l-wrap l-wrap--700">
      <div class="c-banner u-br-4">
        <h1 class="c-page-title u-text-uppercase u-text-center">
          <small class="c-page-title__small">Snippets tagged</small>
          <span class="c-page-title__text">{{ tag }}</span>
        </h1>
      </div>
      <div class="u-mt-32">
        <ul class="c-articles-list">
          <li v-for="snippet of snippets" :key="snippet.slug" class="c-blog-post">
            <div>
              <NuxtLink :to="`/snippets/${snippet.slug}`" class="c-blog-post__link"> </NuxtLink>
              <NuxtLink :to="`/snippets/${snippet.slug}`" class="c-blog-post__title-link">
                <h2 class="c-blog-post__title">{{ snippet.title }}</h2>
              </NuxtLink>
              <p class="c-blog-post__text">{{ snippet.description }}</p>
            </div>
            <div class="c-blog-post__date">{{ formatDate(snippet.createdAt) }}</div>
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

const { data: snippetsData } = await useAsyncData(`snippets-tag-${tag}`, () =>
  queryContent("snippets")
    .where({ tags: { $contains: tag } })
    .sort({ createdAt: -1 })
    .find()
);
const snippets = computed(() => withSlug(snippetsData.value ?? []));

useHead({
  title: `Snippets tagged: ${tag}`,
  meta: [{ name: "description", content: `All snippets tagged in: ${tag}` }],
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
