<!--
  Read more about how to create components and use in markdown file in here -> https://jamesdonnelly.dev/blog/adding-images-with-nuxt-content/
-->

<template>
  <img :src="require(`~/assets/images/${this.src}`)" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
