<template>
  <div class="c-article-img-container">
    <img class="c-article-img" :src="imgSrc" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
}>();

const imgSrc = computed(() => `/images/${props.src}`);
</script>

<style lang="scss" scoped></style>
