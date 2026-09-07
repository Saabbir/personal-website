# Project Rules & Architecture Guidelines

This repository (`Saabbir/personal-website`) is the personal portfolio and engineering blog for **Saabbir Hossain** (Sr. Software Engineer at EchoLogyx Ltd, CRO-driven Shopify Plus Developer & Optimizely Certified A/B Testing Expert).

All AI assistants (Antigravity, Cursor, GitHub Copilot, Claude, Windsurf) working on this codebase MUST follow the strict rules below to maintain code quality, design consistency, and performance.

---

## 1. Core Framework & Architecture
- **Framework**: **Astro 4+** configured for Static Site Generation (`output: 'static'`).
- **Deployment Target**: GitHub Pages with custom domain (`https://saabbir.com`). All URLs must support static HTML rendering. The previous Nuxt 3 site is archived at `https://v1.saabbir.com`.
- **Islands Architecture**: Do not send client-side JavaScript unless necessary for interactive components (`client:visible` or `client:load` for ThemeToggle, Mobile Nav, Giscus Comments, ChatWidget).

---

## 2. SCSS & Styling Architecture (Strict BEM Methodology)
- **Methodology**: Strict **BEM (Block Element Modifier)** naming convention:
  - Block: `.c-card`, `.c-button`, `.c-hero`, `.c-nav`
  - Element: `.c-card__header`, `.c-card__title`, `.c-card__body`
  - Modifier: `.c-card--glass`, `.c-button--primary`, `.c-button--secondary`
  - Layout: `.l-container`, `.l-grid`, `.l-section`
  - Utilities: `.u-text-center`, `.u-mt-16`
- **7-Folder SCSS Structure**:
  - `src/styles/01-config/`: `_tokens.scss`, `_variables.scss`, `_mixins.scss`, `_functions.scss`
  - `src/styles/02-base/`: `_reset.scss`, `_root.scss` (using `light-dark()`), `_typography.scss`, `_a11y.scss`
  - `src/styles/03-components/`: `.c-button`, `.c-card`, `.c-nav`, `.c-hero`, `.c-timeline`, `.c-toc`, `.c-giscus`, `.c-widget`
  - `src/styles/04-layout/`: `_grid.scss`, `_header.scss`, `_footer.scss`, `_section.scss`
  - `src/styles/05-typography/`: `_prose.scss` (Reading container: `65ch` max-width, `1.7` line-height)
  - `src/styles/main.scss`: Entry SCSS file
- **Dark/Light Mode & Zero FOUC**:
  - Dark mode base: Obsidian Slate (`#0a0f1d`) with Neon Emerald accents (`#00e599`) and Cyber Cyan (`#00d2ff`).
  - An inline theme script must run in `<head>` BEFORE page render to set `<html data-theme="...">` to prevent Flash of Unstyled Content (FOUC).

---

## 3. Blog & Content System (MDX Content Collections)
- **Portability**: All articles (`src/content/articles/`), case studies (`src/content/work/`), and snippets (`src/content/snippets/`) MUST remain standard, portable Markdown/MDX.
- **Frontmatter Schema**: Strictly validated via Zod schemas in `src/content/config.ts`:
  - `title`: string
  - `description`: string
  - `createdAt`: string/date
  - `tags`: string[]
  - `publish`: boolean
  - `layout`: optional string (allows per-post custom layouts like `case-study` or `article`)
- **"Edit on GitHub" Link**: Every blog post page MUST render a direct GitHub edit link pointing to `https://github.com/Saabbir/personal-website/edit/main/src/content/articles/{slug}.mdx`.

---

## 4. Accessibility (a11y) & SEO Requirements
- **WCAG 2.1 AA**: High contrast ratios in both light and dark modes.
- **Keyboard Navigation**: High-visibility focus indicators using `:focus-visible`. Never strip outlines without providing an accessible alternative.
- **Touch Ergonomics**: All clickable targets (buttons, links, toggles) MUST have at least 44px × 44px hit areas on mobile.
- **SEO & Social Sharing**: Every page MUST have dynamic `<title>`, `<meta name="description">`, OpenGraph tags (`og:title`, `og:image`), Twitter cards, canonical URL (`<link rel="canonical">`), and Schema.org JSON-LD structured data (`Person`, `BlogPosting`).
- **External Links**: All external links MUST use `target="_blank" rel="noopener noreferrer"`.

---

## 5. Performance & Mobile Core Web Vitals
- **Target**: 100/100 Lighthouse score on Mobile & Desktop.
- **LCP Optimization**: Preload hero image/badges with `fetchpriority="high"`.
- **CLS Prevention**: Always specify `width` and `height` attributes or aspect-ratio boxes on `<img>` elements.
