<template>
  <div>
    <section class="section section--contact-copy">
      <div class="l-wrap l-wrap--700">
        <header class="section__header u-text-center">
          <h2 class="t-display-2 u-text-center">Get in touch</h2>
        </header>
        <ContactCopy />
      </div>
    </section>
    <section class="section section--contact-form">
      <div class="l-wrap l-wrap--700">
        <header class="section__header u-text-center">
          <h2 class="t-display-2">Send a message</h2>
        </header>
        <ContactForm />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import driftBot from "@/utils/driftBot";
import vhHack from "@/utils/vhHack";

useHead({
  title: "Contact",
  meta: [
    {
      name: "description",
      content: "Get in touch with Saabbir Hossain — contact form and social links.",
    },
  ],
});

onMounted(() => {
  window.onload = driftBot;
  vhHack();
});
</script>
