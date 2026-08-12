<template>
  <div class="l-wrapper">
    <div class="c-error-content">
      <div class="l-wrap l-wrap--700">
        <div class="u-text-center">
          <h1
            v-if="error?.statusCode === 404"
            class="c-page-title c-page-title--black u-text-serif u-text-uppercase"
          >
            Page not found
          </h1>
          <h1
            v-else
            class="c-page-title c-page-title--black u-text-serif u-text-uppercase"
          >
            An error occurred
          </h1>
          <div class="u-mt-32">
            <NuxtLink to="/" class="c-button c-button--lg">Go back to home page</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; message?: string } }>();
const error = props.error;

useHead({
  title: "Error",
  meta: [{ name: "description", content: "Error Page" }],
});
</script>

<style lang="scss" scoped>
.c-error-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 2.5rem 0;
}
</style>
