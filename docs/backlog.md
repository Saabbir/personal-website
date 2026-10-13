# Backlog

What's outstanding, roughly in the order I'd do it. Last updated 13 Oct 2026.

The public site is a personal blog while Saabbir is at EchoLogyx. Case studies
stay in the repo unpublished. Don't ship Work to saabbir.com unless he asks.

---

## 1. Content you need to write

### The four TODOs in the codebase

```bash
grep -rn "TODO(saabbir)" src/
```

None of these leave a visible hole — the site is publishable without them.
They're additive.

| Where | What |
|---|---|
| [about.astro](../src/pages/about.astro) | **How you ended up in CRO.** The story currently jumps from "moved to EchoLogyx" to "that's the short version of eight years". The part where testing became your thing is missing, and it's the hinge of the page. |
| [about.astro](../src/pages/about.astro) | **"What I got wrong"** and **"What I'm learning right now"**. Two sections. The first is the single highest-value thing you could add to the site. |
| [about.astro](../src/pages/about.astro) | Bandarban photo caption, in your voice. Currently a photo credit. |

### The blog is nearly empty

4 published articles, and 2 of those link off-site to EchoLogyx. So you have
**two** of your own posts live. Six more are written but sit at
`publish: false` — mostly 2021 JavaScript notes. Either bring them up to the
current voice and publish, or delete them so they stop being a decision.

Article ideas that fit the voice (lessons, not tutorials):
- Why the Convert setup had two purchase goals reporting different lifts
- What a Figma file doesn't tell you about building a Shopify theme
- The third-party script that cost a fashion homepage two seconds

### Resources / reading page — later

A page of books and links. Don't invent a list. Wait until Saabbir writes it.

### Case studies — not public

[src/content/work/](../src/content/work/) is kept, all `publish: false`.
Assets are in [held/work-assets/](../held/work-assets/), not `public/`.
The supplements theme-build draft is the most complete unpublished Shopify
build write-up. Leave it unpublished. If Work ever comes back, that file is
the first one to finish — screenshots go in `held/work-assets/images/work/`,
not `public/images/work/`, until publish is allowed.

---

## 2. Technical, not urgent

### Image pipeline
Every image is a raw file in `public/` referenced by absolute path, so Astro's
`<Image>` optimisation never runs — no AVIF/WebP, no `srcset`. Files were
recompressed in place (12MB → 4.8MB) which banked most of the win, but moving
assets to `src/assets/` would unlock responsive images properly. Biggest
remaining perf item.

### Inline styles
Several hundred inline `style=` attributes across pages, fighting the BEM SCSS
system. Migrating the repeated ones into `03-components/` would make the next
design change roughly a tenth of the work. Slow, safe, no user-visible change.

### Things deliberately not done
- **ViewTransitions** ships Astro's client router (~19KB) to every page. Worth
  measuring whether it earns that.
- **Font preload** — fonts are self-hosted now, but the `@font-face` isn't
  discovered until CSS parses. A preload would help LCP; the hashed filename
  makes it awkward.

---

## 3. Maintenance

**After adding an article:**
```bash
python3 scripts/generate-og-images.py   # add the slug to CARDS first
npm run build
```

Do not add work slugs to that script. Work OG cards belong in
`held/work-assets/images/og/`.

**After adding images:**
```bash
node scripts/optimize-images.mjs          # dry run, shows savings
node scripts/optimize-images.mjs --write  # apply
```

**Dates:** use `YYYY-MM-DD` in frontmatter. Older entries use `dd/mm/yyyy`,
which is ambiguous — `02/03/2026` could be either month. `formatDisplayDate()`
handles both and renders "15 May 2026", but new content should be ISO.

**After go-live of this branch:** ask Google Search Console to drop the old
`/work/` URLs.

---

## 4. Why things are the way they are

Non-obvious choices — why Work is unpublished, why the contact form listener
uses the capture phase, why the hero has no metric card — are recorded in
[decisions.md](decisions.md). Read it before "fixing" something that looks
like an oversight.
