<template>
  <div>
    <section class="section section--hero">
      <div class="l-wrap">
        <div class="c-intro-wrapper">
          <div class="l-wrap">
            <Intro />
          </div>
        </div>
      </div>
    </section>
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
import _ from "lodash";

useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content:
        "Saabbir Hossain — CRO-driven Shopify Plus developer and Optimizely Certified A/B Testing expert. Sr. Software Engineer at EchoLogyx Ltd. View my work and get in touch.",
    },
  ],
});

onMounted(() => {
  window.onload = driftBot;
  vhHack();
  window.addEventListener("resize", _.throttle(vhHack, 200));
});
</script>

<style lang="scss" scoped></style>
