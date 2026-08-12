<template>
  <div>
    <section
      class="section c-blog-post-banner"
      :style="{ backgroundImage: `url(${articleImg})` }"
    >
      <div class="l-wrap">
        <p class="c-blog-post-banner__date">{{ formatDate(article.createdAt) }}</p>
        <h1 class="c-page-title u-text-center u-text-uppercase u-mt-20 u-mb-40">
          {{ article.title }}
        </h1>
        <div v-if="article.tags" class="c-tags">
          <NuxtLink
            v-for="(tag, index) in article.tags"
            :key="index"
            class="c-tag"
            :to="`/blog/tag/${encodeURIComponent(tag)}`"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="section section--breadcrumb c-breadcrumb">
      <div class="l-wrap">
        <nav class="c-breadcrumb__nav">
          <NuxtLink to="/" class="c-breadcrumb__link">&#127968; home</NuxtLink>
          <NuxtLink to="/blog" class="c-breadcrumb__link">blog</NuxtLink>
          <NuxtLink
            :to="`/blog/${article.slug}`"
            class="c-breadcrumb__link c-breadcrumb__link--disabled u-text-capitalize"
          >
            {{ (article.slug || "").replace(/-/g, " ") }}
          </NuxtLink>
        </nav>
      </div>
    </section>
    <section class="section c-article-container">
      <div class="l-article">
        <article class="c-article">
          <div class="c-article__body nuxt-content">
            <ContentRenderer v-if="article" :value="article" :components="contentComponents" />
          </div>
        </article>
      </div>
      <div class="u-my-48">
        <hr />
      </div>
      <div class="l-wrap l-wrap--700">
        <div class="u-my-48">
          <Pagination base-path="/blog" type="Post" :prev="prev" :next="next" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

const route = useRoute();
const slug = route.params.slug as string;
const contentComponents = useContentComponents();

const { data: articleData } = await useAsyncData(`blog-${slug}`, () =>
  queryContent("articles", slug).findOne()
);
if (!articleData.value) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
}
const article = computed(() => withSlugOne(articleData.value, slug));

const { data: surroundData } = await useAsyncData(`blog-surround-${slug}`, () =>
  queryContent("articles")
    .only(["title", "slug", "_path"])
    .sort({ createdAt: -1 })
    .where({ publish: true })
    .findSurround(`/articles/${slug}`)
);
const prev = computed(() => {
  const s = surroundData.value;
  const p = s?.[0];
  return p ? withSlugOne(p, "") : null;
});
const next = computed(() => {
  const s = surroundData.value;
  const n = s?.[1];
  return n ? withSlugOne(n, "") : null;
});

const articleImg = computed(() => {
  const a = article.value;
  const f = a?.featuredImg;
  return `/images/article-featured-images/${f || "default.png"}`;
});

const { canonicalUrl, absoluteImage } = useSiteUrl();

useHead({
  title: article.value?.title,
  meta: article.value?.description
    ? [{ name: "description", content: article.value.description }]
    : [],
});

useSeoMeta({
  ogUrl: canonicalUrl,
  ogType: "article",
  ogTitle: computed(() => article.value?.title),
  ogDescription: computed(() => article.value?.description ?? undefined),
  ogImage: computed(() => absoluteImage(articleImg.value)),
  twitterCard: "summary_large_image",
  twitterTitle: computed(() => article.value?.title),
  twitterDescription: computed(() => article.value?.description ?? undefined),
  twitterImage: computed(() => absoluteImage(articleImg.value)),
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
