<template>
  <div class="c-feature-figure">
    <div class="c-feature-figure__img-container">
      <img :src="imgSrc" :alt="alt" />
    </div>
    <div class="c-feature-figure__caption">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ src: string; alt?: string }>();
const imgSrc = computed(() => `/images/${props.src}`);
</script>

<style lang="scss" scoped>

</style>