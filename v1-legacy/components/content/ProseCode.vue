<template>
  <div class="nuxt-content-highlight">
    <span v-if="filename" class="filename">{{ filename }}</span>
    <ClientOnly>
      <pre :class="preClass"><code :class="codeClass" v-html="displayHtml"></code></pre>
      <template #fallback>
        <pre :class="preClass"><code :class="codeClass">{{ code }}</code></pre>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
  }>(),
  { code: "", language: null, filename: null, highlights: () => [] }
);

const preClass = computed(() => "language-" + (props.language || "text"));
const codeClass = computed(() => "language-" + (props.language || "text"));

const highlightedHtml = ref<string>("");

const displayHtml = computed(() =>
  highlightedHtml.value !== "" ? highlightedHtml.value : escapeHtmlStatic(props.code)
);

function escapeHtmlStatic(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Prism uses 'javascript' not 'js'
const prismLang = (l: string | null | undefined) =>
  l === "js" ? "javascript" : (l || "text");

onMounted(() => {
  if (!props.code) return;
  const lang = prismLang(props.language);
  const grammar =
    Prism.languages[lang] || Prism.languages.javascript || Prism.languages.plaintext;
  try {
    highlightedHtml.value = Prism.highlight(props.code, grammar, lang);
  } catch {
    highlightedHtml.value = escapeHtmlStatic(props.code);
  }
});
</script>
