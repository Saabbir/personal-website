<template>
  <div>
    <div class="c-intro c-intro--v1 u-d-grid">
      <!-- <div class="c-intro__img-container">
        <img src="~/assets/images/cv-headshot.png" alt="Saabbir Hossain's Profile Picture">
      </div> -->
      <div class="c-intro__content">
        <h1 class="t-display-1 u-mb-24">Hi, I'm Saabbir.</h1>
        <p>
          A <strong>CRO-driven Shopify Plus developer</strong> and <strong>Optimizely Certified A/B Testing expert</strong>, working globally from Bangladesh as a <strong>Sr. Software Engineer</strong> at EchoLogyx Ltd.
        </p>
        <!-- <p>I build static sites and apps using <strong>Vuejs</strong> and <strong>Nuxtjs</strong>.</p> -->
        <p>
          Over the past <strong>8 years</strong>, I’ve helped ecommerce brands grow through <strong>experimentation</strong>, <strong>performance engineering</strong>, and <strong>scalable Shopify architecture</strong>.
        </p>
        <!-- <p>I'm <strong>open to work</strong> for a <strong>full-time position</strong> where I can work as a creative front-end developer.</p> -->
        <div class="c-intro__buttons c-buttons u-mt-32 u-mt-sm-48">
          <NuxtLink to="/contact" class="c-button">
            Get in touch
          </NuxtLink>
          <a
            :href="resumeUrl"
            download="Saabbir_Hossain_Resume.pdf"
            class="c-button c-button--secondary"
            aria-label="Download resume (PDF)"
          >
            Download CV
          </a>
        </div>
      </div>
      <div class="c-intro__img-container">
        <picture>
          <img
            :src="headshotSrc"
            width="300"
            height="300"
            alt="Saabbir Hossain's Portrait"
          />
        </picture>
      </div>
    </div>
    <div class="c-intro c-intro--v2 u-d-none">
      <div class="c-intro__content u-text-center u-mx-auto">
        <h1 class="t-display-1 u-mb-24">Hi, I'm Saabbir.</h1>
        <p>
          A front-end developer and
          <strong>A/B testing expert</strong> based in Bangladesh, currently
          working as a <strong>Sr. Software Engineer</strong> at EchoLogyx Ltd.
        </p>
        <!-- <p>I build static sites and apps using <strong>Vuejs</strong> and <strong>Nuxtjs</strong>.</p> -->
        <p>
          Digital marketing and development are my interests, but I often find
          myself doing design work as well!
        </p>
        <!-- <p>I'm <strong>open to work</strong> for a <strong>full-time position</strong> where I can work as a creative front-end developer.</p> -->
        <div class="c-buttons u-mt-32 u-mt-sm-48">
          <NuxtLink to="/work" class="c-button">
            View my work
          </NuxtLink>
          <a
            :href="resumeUrl"
            download="Saabbir_Hossain_Resume.pdf"
            class="c-button c-button--secondary"
            aria-label="Download resume (PDF)"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const headshotSrc = "/images/cv-headshot.png";
const resumeUrl = "/Saabbir_Hossain_Senior_Frontend_Engineer_8_Years_Resume_1_v7.pdf";
</script>

<style></style>
