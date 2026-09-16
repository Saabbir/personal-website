# Backlog

What's outstanding, roughly in the order I'd do it. Last updated 17 Sep 2026.

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
| [about.astro:110](../src/pages/about.astro#L110) | **How you ended up in CRO.** The story currently jumps from "moved to EchoLogyx" to "that's the short version of eight years". The part where testing became your thing is missing, and it's the hinge of the page. |
| [about.astro:132](../src/pages/about.astro#L132) | **"What I got wrong"** and **"What I'm learning right now"**. Two sections. The first is the single highest-value thing you could add to the site. |
| [about.astro:175](../src/pages/about.astro#L175) | Bandarban photo caption, in your voice. Currently a photo credit. |

### Raab Vital case study — highest priority

[raab-vital-theme-build.md](../src/content/work/raab-vital-theme-build.md),
currently `publish: false` so it builds nothing.

**Why it matters:** "Shopify themes" is the first thing listed under what you
do, and there is no build case study on the site. Every published study is a
test or a speed audit. A client who wants a theme built has nothing to look at.

The file has the full section skeleton with specific questions. It needs:
- the 5 frontmatter fields (dates, URL, description)
- screenshots in `public/images/work/raab-vital/` — `thumbnail.jpg` (414×310)
  and `cover.jpg` (1600×1200) at minimum
- an entry added to `scripts/generate-og-images.py`, then re-run it
- `publish: true`

### The portfolio is thin

4 published case studies, 3 of them Wax London. Five older projects
(CESPPA ×2, Jump Work, PersonX, A Perfect Space, Pragmatic Works) sit at
`publish: false`. Options, in order of preference:

1. Ship Raab Vital — fixes the one-client wall on its own
2. Republish the older work as short honest entries: *"2017, Invision to HTML,
   here's what I built and what I'd do differently now."* Group the Work page
   into "Recent" and "Earlier work"
3. Write up something recent that isn't Wax London

### The blog is nearly empty

4 published articles, and 2 of those link off-site to EchoLogyx. So you have
**two** of your own posts live. Six more are written but sit at
`publish: false` — mostly 2021 JavaScript notes. Either bring them up to the
current voice and publish, or delete them so they stop being a decision.

Article ideas that fit the voice (lessons, not tutorials):
- Why the Convert setup had two purchase goals reporting different lifts
- What a Figma file doesn't tell you about building a Shopify theme
- The third-party script that cost Wax London two seconds

---

## 2. Technical, not urgent

### Image pipeline
Every image is a raw file in `public/` referenced by absolute path, so Astro's
`<Image>` optimisation never runs — no AVIF/WebP, no `srcset`. Files were
recompressed in place (12MB → 4.8MB) which banked most of the win, but moving
assets to `src/assets/` and co-locating case-study images with their markdown
would unlock responsive images properly. Biggest remaining perf item.

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

**After adding a case study or article:**
```bash
python3 scripts/generate-og-images.py   # add the slug to CARDS first
npm run build
```

**After adding images:**
```bash
node scripts/optimize-images.mjs          # dry run, shows savings
node scripts/optimize-images.mjs --write  # apply
```

**Dates:** use `YYYY-MM-DD` in frontmatter. Older entries use `dd/mm/yyyy`,
which is ambiguous — `02/03/2026` could be either month. `formatDisplayDate()`
handles both and renders "May 2026", but new content should be ISO.

---

## 4. Why things are the way they are

Non-obvious choices — why Optimizely isn't in the client logo row, why the
contact form listener uses the capture phase, why older work is unpublished —
are recorded in [decisions.md](decisions.md). Read it before "fixing"
something that looks like an oversight.
