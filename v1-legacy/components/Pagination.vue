<template>
  <div class="c-pagination">
    <div v-if="prev" class="c-pagination__prev">
      <div class="c-pagination__link-label">Previous {{ type }}</div>
      <NuxtLink :to="`${basePath}/${prev.slug}`" class="c-button c-button--lg">
        &laquo; {{ prev.title }}
      </NuxtLink>
    </div>
    <div v-if="next" class="c-pagination__next">
      <div class="c-pagination__link-label">Next {{ type }}</div>
      <NuxtLink :to="`${basePath}/${next.slug}`" class="c-button c-button--lg">
        {{ next.title }} &raquo;
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
    basePath?: string;
    type?: string;
  }>(),
  { basePath: "/blog", type: "Post" }
);
</script>
