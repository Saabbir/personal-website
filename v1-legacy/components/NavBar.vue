<template>
  <div class="c-navbar">
    <div class="l-wrap">
      <div class="c-navbar__content">
        <NuxtLink to="/" class="c-navbar__brand">
          <div class="c-navbar__brand-img-container">
            <img
              :src="profileImgSrc"
              alt="Saabbir's Profile Picture"
              class="c-navbar__brand-img"
              width="60"
              height="60"
            />
          </div>
          <div class="c-navbar__brand-text">
            <span class="c-navbar__brand-text-name">Saabbir Hossain</span>
            <span class="c-navbar__brand-text-role">Shopify Plus Developer</span>
          </div>
        </NuxtLink>
        <div class="c-navbar__trigger" @click="toggleNav" aria-label="Toggle menu">
          <!-- Hamburger (bars) or grid (stream) icon -->
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0-6h4V4h-4v4z"/>
          </svg>
        </div>
        <nav class="c-navbar__nav" ref="navbarNav" @click="hideNav" aria-label="Main">
          <ul class="c-navbar__menu c-navbar__menu--without-number">
            <li class="c-navbar__menu-item">
              <NuxtLink
                to="/"
                exact
                class="c-navbar__menu-link"
                :class="{ 'nuxt-link-active': $route.path === '/' }"
              >
                <strong>01</strong>
                <span>home</span>
              </NuxtLink>
            </li>
            <li class="c-navbar__menu-item">
              <NuxtLink
                to="/work"
                exact
                class="c-navbar__menu-link"
                :class="{ 'nuxt-link-active': $route.path.includes('/work') }"
              >
                <strong>02</strong>
                <span>work</span>
              </NuxtLink>
            </li>
            <!-- <li class="c-navbar__menu-item">
              <NuxtLink to="/about" exact class="c-navbar__menu-link">
                <strong>03</strong>
                <span>about</span>
              </NuxtLink>
            </li> -->
            <li class="c-navbar__menu-item">
              <NuxtLink
                to="/contact"
                exact
                class="c-navbar__menu-link"
                :class="{ 'nuxt-link-active': $route.path === '/contact' }"
              >
                <strong>04</strong>
                <span>contact</span>
              </NuxtLink>
            </li>
            <li class="c-navbar__menu-item">
              <NuxtLink
                to="/blog"
                exact
                class="c-navbar__menu-link"
                :class="{
                  'nuxt-link-active': $route.path.includes('/blog'),
                }"
              >
                <strong>05</strong>
                <span>blog</span>
              </NuxtLink>
            </li>
            <li class="c-navbar__menu-item">
              <NuxtLink
                to="/snippets"
                exact
                class="c-navbar__menu-link"
                :class="{
                  'nuxt-link-active': $route.path.includes('/snippets'),
                }"
              >
                <strong>05</strong>
                <span>snippets</span>
              </NuxtLink>
            </li>
            <li class="c-navbar__menu-item">
              <a
                :href="resumeUrl"
                download="Saabbir_Hossain_Resume.pdf"
                class="c-navbar__menu-link"
                aria-label="Download resume (PDF)"
              >
                <strong>06</strong>
                <span>resume</span>
                <svg class="c-navbar__menu-link-icon c-navbar__menu-link-icon--download" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </li>
            <li class="c-navbar__menu-item c-navbar__menu-item--theme-toggle">
              <button
                type="button"
                class="c-navbar__theme-toggle"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggle"
              >
                <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const profileImgSrc = "/images/cv-headshot.png";
const resumeUrl = "/Saabbir_Hossain_Senior_Frontend_Engineer_8_Years_Resume_1_v7.pdf";
const navbarNav = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);
const { isDark, toggle } = useTheme();

function toggleNav() {
  navbarNav.value?.classList.toggle("is-open");
  isMenuOpen.value = !isMenuOpen.value;
}

function hideNav() {
  navbarNav.value?.classList.remove("is-open");
  isMenuOpen.value = false;
}
</script>

<style lang="scss" scoped></style>
