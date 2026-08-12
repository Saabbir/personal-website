<template>
  <section class="section section--portfolio u-bg-gray-dark">
    <div class="l-wrap">
      <header class="section__header u-text-center">
        <h1 class="t-display-1">Featured works</h1>
        <p class="u-mt-16 t-18">Selected projects.</p>
      </header>
      <div :class="['l-works', works.length === 1 ? 'l-works--1' : '']">
        <div v-for="work of works" :key="work.slug" class="c-portfolio-card">
          <NuxtLink :to="`/work/${work.slug}`" class="c-portfolio-card__link"></NuxtLink>
          <figure class="c-portfolio-card__figure">
            <picture>
              <img
                v-if="work.imgFolderName"
                :src="`/images/work/${work.imgFolderName}/thumbnail.jpg`"
                :alt="`${work.title} Thumbnail`"
                width="414"
                height="311"
              />
            </picture>
            <figcaption class="c-portfolio-card__figcaption">
              <h5 class="c-portfolio-card__title">{{ work.title }}</h5>
              <p>{{ work.highlight }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

useHead({
  title: "Work",
  meta: [
    {
      name: "description",
      content:
        "Selected portfolio and case studies by Saabbir Hossain — Shopify Plus, A/B testing, and front-end development projects.",
    },
  ],
});

const { data: worksData } = await useAsyncData("work-list", () =>
  queryContent("work")
    .where({ publish: true })
    .sort({ createdAt: -1 })
    .find()
);
const works = computed(() => withSlug(worksData.value ?? []));

onMounted(() => {
  window.onload = driftBot;
  vhHack();
});
</script>

<style lang="scss" scoped></style>
