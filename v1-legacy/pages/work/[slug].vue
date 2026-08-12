<template>
  <section class="section section--portfolio-item">
    <div class="l-wrap">
      <div class="c-portfolio">
        <div class="c-portfolio__header u-text-center">
          <h1 class="t-display-1">{{ work.title }}</h1>
          <h3 v-if="work.highlight" class="u-mt-16 u-text-gray u-fw-500">
            {{ work.highlight }}
          </h3>
          <div class="c-copy u-mx-auto">
            <p v-if="work.description" class="u-mt-32 t-18">
              {{ work.description }}
            </p>
          </div>
        </div>
        <div class="c-portfolio__stats u-text-center">
          <dl v-if="work.type">
            <dt>Type</dt>
            <dd>{{ work.type }}</dd>
          </dl>
          <dl v-if="work.tools">
            <dt>Tools used:</dt>
            <dd v-for="tool in work.tools" :key="tool">{{ tool }}</dd>
          </dl>
          <dl v-if="work.url">
            <dt class="u-d-none">Live</dt>
            <dd>
              <a :href="work.url" class="c-button" target="_blank">View Live</a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div v-if="work.imgFolderName" class="l-wrap l-wrap--1200">
      <div class="c-portfolio__cover-image">
        <picture>
          <img
            :src="`/images/work/${work.imgFolderName}/cover.jpg`"
            :alt="`${work.title}-cover`"
            width="1600"
            height="1200"
          />
        </picture>
      </div>
    </div>
    <div class="nuxt-content-wrapper nuxt-content">
      <ContentRenderer v-if="work" :value="work" :components="contentComponents" />
    </div>
    <div v-if="work.pagination" class="u-my-32">
      <hr />
    </div>
    <div v-if="work.pagination" class="">
      <div class="l-wrap">
        <Pagination
          base-path="/work"
          type="Work"
          :prev="prev"
          :next="next"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

const route = useRoute();
const slug = route.params.slug as string;
const contentComponents = useContentComponents();

const { data: workData } = await useAsyncData(`work-${slug}`, () =>
  queryContent("work", slug).findOne()
);
if (!workData.value) {
  throw createError({ statusCode: 404, statusMessage: "Work not found" });
}
const work = computed(() => withSlugOne(workData.value, slug));

const { data: surroundData } = await useAsyncData(`work-surround-${slug}`, () =>
  queryContent("work")
    .only(["title", "slug", "_path"])
    .sort({ createdAt: 1 })
    .findSurround(`/work/${slug}`)
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

const workImg = computed(() => {
  const w = work.value;
  if (w?.imgFolderName)
    return `/images/work/${w.imgFolderName}/cover.jpg`;
  return "/images/cv-headshot.png";
});

const { canonicalUrl, absoluteImage } = useSiteUrl();

useHead({
  title: work.value ? `${work.value.title} - Case Study` : "Work",
  meta: work.value?.description
    ? [{ name: "description", content: work.value.description }]
    : [],
});

useSeoMeta({
  ogUrl: canonicalUrl,
  ogType: "article",
  ogTitle: computed(() => work.value?.title),
  ogDescription: computed(
    () => work.value?.description ?? work.value?.highlight ?? undefined
  ),
  ogImage: computed(() => absoluteImage(workImg.value)),
  twitterCard: "summary_large_image",
  twitterTitle: computed(() => work.value?.title),
  twitterDescription: computed(
    () => work.value?.description ?? work.value?.highlight ?? undefined
  ),
  twitterImage: computed(() => absoluteImage(workImg.value)),
});

onMounted(() => {
  window.onload = driftBot;
  vhHack();
});
</script>

<style lang="scss" scoped></style>
