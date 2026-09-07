# Saabbir Hossain — Personal Website

Astro 4 portfolio and engineering blog. Live at [https://saabbir.com](https://saabbir.com).

The previous Nuxt 3 site is archived at [https://v1.saabbir.com](https://v1.saabbir.com).

---

## Tech stack

- **Astro 4** static site generation for GitHub Pages
- **MDX Content Collections** — articles, snippets, and case studies in `src/content/`
- **SCSS** with strict BEM (`c-block__element--modifier`)
- Dark/light theme with a zero-FOUC inline script

---

## Prerequisites

- **Node.js:** v18 or later (v20 LTS recommended)
- **npm:** v9 or later

```sh
node -v   # should be 18+
npm -v
```

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone git@github.com-personal:Saabbir/personal-website.git
   cd personal-website
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   The site will be available at [http://localhost:4321](http://localhost:4321)

---

## Build & Deployment

- **Production build:**
  ```sh
  npm run build
  ```
  Type-checks and writes static HTML to `dist/`.

- **Preview the generated site:**
  ```sh
  npm run preview
  ```

GitHub Actions deploys `main` to GitHub Pages with the custom domain `saabbir.com`.

---

## Versioning

| URL | Stack | Repository |
|-----|--------|------------|
| [saabbir.com](https://saabbir.com) | Astro (current) | `Saabbir/personal-website` |
| [v1.saabbir.com](https://v1.saabbir.com) | Nuxt 3 archive | `Saabbir/personal-website-v1` |

Generic GitBook-ready guides (GitHub Pages, DNS, Actions, v2/v3 redesign) live in [`cookbooks/`](cookbooks/).
