// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: { compatibilityVersion: 3 },

  ssr: true,
  nitro: {
    preset: "static",
  },

  app: {
    head: {
      title: "Saabbir Hossain",
      titleTemplate: (title) =>
        title && title !== "Saabbir Hossain"
          ? `${title} | Saabbir Hossain`
          : "Saabbir Hossain",
      htmlAttrs: { lang: "en" },
      noscript: [{ children: "This website requires JavaScript." }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "title", content: "Saabbir Hossain" },
        {
          name: "description",
          content:
            "Saabbir Hossain — CRO-driven Shopify Plus developer and Optimizely Certified A/B Testing expert. Sr. Software Engineer at EchoLogyx Ltd. Portfolio, blog, and code snippets.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://saabbir.github.io/" },
        { property: "og:title", content: "Saabbir Hossain" },
        {
          property: "og:description",
          content:
            "Saabbir Hossain — CRO-driven Shopify Plus developer and Optimizely Certified A/B Testing expert. Sr. Software Engineer at EchoLogyx Ltd.",
        },
        {
          property: "og:image",
          content: "https://saabbir.github.io/images/cv-headshot.png",
        },
        { property: "og:image:alt", content: "Saabbir Hossain" },
        { property: "og:site_name", content: "Saabbir Hossain" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://saabbir.github.io/" },
        { property: "twitter:title", content: "Saabbir Hossain" },
        {
          property: "twitter:description",
          content:
            "CRO-driven Shopify Plus developer and A/B Testing expert. Sr. Software Engineer at EchoLogyx Ltd.",
        },
        {
          property: "twitter:image",
          content: "https://saabbir.github.io/images/cv-headshot.png",
        },
        { property: "twitter:image:alt", content: "Saabbir Hossain" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/images/cv-headshot.png" }],
      script: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" },
        { src: "/js/global-client-side.js", body: true },
      ],
    },
  },

  css: [
    "normalize.css/normalize.css",
    "prism-themes/themes/prism-material-oceanic.css",
    "~/assets/scss/index.scss",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/01-config/config.scss" as *;',
          loadPaths: ['assets/scss'],
        },
      },
    },
  },

  components: [{ path: "~/components", pathPrefix: false }],

  modules: ["@nuxt/content", "@nuxtjs/google-fonts"],

  content: {
    // Use Prism for code highlighting (via custom ProseCode component)
    highlight: false,
  },

  googleFonts: {
    families: {
      Merriweather: [700],
      Nunito: [400, 700, 900],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false, // use CDN only so prepare works offline
  },

  router: {
    options: {
      strict: true,
    },
  },
});
