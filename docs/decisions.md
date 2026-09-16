# Decisions

Choices that look like mistakes or oversights from the outside, with the
reason attached — so nobody "fixes" them back.

Only non-obvious calls belong here. If the reason is visible in the code,
it doesn't need an entry. Append new ones at the top.

---

## The contact form's submit listener uses the capture phase
**Sep 2026 · [ContactForm.astro](../src/components/ContactForm.astro)**

The `true` third argument on `addEventListener('submit', …, true)` is load-bearing.

Astro's ViewTransitions router registers its own `submit` listener on
`document`. The form has no `action` attribute, so the router treats it as a
navigation to `location.pathname` — a same-page view transition that resets
scroll, which looked like "the form jumps to the top on submit". Both
listeners are bubble-phase on `document` and Astro's is registered first, so
it ran first.

The router bails on `e.defaultPrevented`. Capture phase always runs before
bubble regardless of registration order, so `preventDefault()` there stops it.

**Applies to any future JS-handled form on this site** — a newsletter signup
or filter form will hit the same trap. Use capture, or put `data-astro-reload`
on the form.

## The spinner is hidden under prefers-reduced-motion
**Sep 2026 · [_form.scss](../src/styles/03-components/_form.scss)**

The global reduced-motion rule flattens `animation-duration` to `0.01ms`,
which would leave a frozen ring rather than no spinner. It's hidden instead,
and the button label changing to "Sending…" carries the state.

## Optimizely and Shopify Plus are not in the client logo row
**Sep 2026 · [index.astro](../src/pages/index.astro)**

They're tools, not companies that hired him. A reader who notices a client
wall padded with software stops trusting the rest of the row. Tools belong in
a text list — they're on the About page under "Tools I reach for".

## The hero shows one attributed result, not a stat grid
**Sep 2026 · [index.astro](../src/pages/index.astro)**

The old hero had four tiles including `+50% Revenue per Visitor Lift` and
`+24% Average Order Value Uplift`. Both came from a *single* test (Wax London
model-vs-product) but read as site-wide averages.

Unattributed they look inflated; attributed they're credible. The hero card
now names the client, the sample, the date range, and the fact that purchase
rate stopped at 92.6% confidence. Don't reintroduce floating aggregate stats.

## "Average 20–40% lift across experiments" was deleted, not softened
**Sep 2026**

No CRO-literate buyer believes an average lift that high across a test
programme — most tests are flat or lose, which is the point of testing.
Stating it undermines the honest case studies one click away.

## JetBrains Mono was dropped
**Sep 2026 · [_tokens.scss](../src/styles/01-config/_tokens.scss)**

A whole webfont shipped on every page for code blocks that appear on a
handful. Replaced with a system mono stack. If code blocks ever need a
distinct face, load it only on pages that render them.

## Fonts are self-hosted rather than loaded from Google Fonts
**Sep 2026 · [main.scss](../src/styles/main.scss)**

The homepage LCP is text, so the font request *was* the LCP — and it sat
behind two cross-origin handshakes and a render-blocking third-party
stylesheet. Now `@fontsource-variable`, bundled. There is no third-party
origin left in the HTML; keep it that way.

The two `@use` lines need distinct namespaces (`as font-body`, `as
font-heading`) or Sass errors on the duplicate `index` namespace.

## The third testimonial was removed
**Sep 2026 · [index.astro](../src/pages/index.astro)**

"A Perfect Space Team" was the weakest of the three and its role was
overstated in a section claiming endorsements from CEOs and directors. Two
strong ones beat three where one is padding.

## Case study titles have no "Case Study:" prefix
**Sep 2026 · [CaseStudyLayout.astro](../src/layouts/CaseStudyLayout.astro)**

Twelve characters at the front of every SERP result and browser tab, telling
the reader something the URL and page already say.

## Metric badge modifiers mean good/bad, not up/down
**Sep 2026 · [_case-body.scss](../src/styles/03-components/_case-body.scss)**

`--up` is green, `--down` is red. On performance studies a *decrease* in LCP
or Total Blocking Time is an improvement and correctly uses `--up`. The names
are misleading but the usage is consistent — rename both together or not
at all.

Each badge also carries `u-sr-only` text ("better" / "worse" / "no real
change") because the meaning was otherwise in colour alone.

## Older work stays at publish: false
**Sep 2026 · `src/content/work/`**

CESPPA ×2, Jump Work, PersonX, A Perfect Space and Pragmatic Works are 2017–21
PSD-to-HTML projects. Deliberate choice to keep the portfolio lean rather than
pad it, revisited if the Work page still looks thin after Raab Vital ships.
See [backlog.md](backlog.md).

## Missing personal content is a TODO comment, not placeholder prose
**Sep 2026 · [about.astro](../src/pages/about.astro)**

Sections that depend on facts only Saabbir has — why he moved into CRO, what
he got wrong, what he's learning — are `{/* TODO(saabbir) */}` comments with
specific questions. They render nothing, so no invented biography ever reaches
a visitor. An earlier draft of the About page contained a fabricated origin
story; it was caught and removed. Don't fill these with plausible-sounding
filler.

## Images were recompressed in place
**Sep 2026 · [optimize-images.mjs](../scripts/optimize-images.mjs)**

12MB → 4.8MB across ~40 files, PNGs palette-quantized. Originals are in git
history. Text-heavy screenshots (WebPageTest tables) and photos were checked
for artefacts afterwards — if a future image looks degraded, lower the
quality setting for that file rather than assuming the script is safe for
every input.

## The contact form was silently broken before this
**Sep 2026 · [ContactForm.astro](../src/components/ContactForm.astro)**

It posted to `formspree.io/f/thesaabbir@gmail.com` — an email address where a
form hash belongs. Formspree answers `404 FORM_NOT_FOUND`, and the catch
branch applied the *success* style anyway. Every enquiry was lost, for as long
as that endpoint was in place.

Now `mkjgnwva`, verified live. The failure path shows a distinct error state
pointing at the mailto link. **Never style a failed send as success.**

---

## Giscus points at repo 325846926, category Announcements
**Sep 2026 · [GiscusComments.astro](../src/components/GiscusComments.astro)**

Comments were erroring with "giscus is not installed on this repository".
Three separate things were wrong:

1. GitHub Discussions wasn't enabled on the repo (now enabled).
2. The giscus app wasn't installed on the repo.
3. `data-repo-id` and `data-category-id` pointed at repo **103450777** — the
   old v1 site — not this repo (**325846926**). Copied config that could never
   have worked here.

Category is **Announcements**, not General, on giscus's own recommendation:
only maintainers and the giscus app can open threads there, so visitors
comment on existing discussions instead of being able to create arbitrary
ones. Swap `data-category` / `data-category-id` to the General pair if you
ever want it open.

Regenerate both IDs at <https://giscus.app> if the repo is ever renamed,
transferred, or replaced — they are not portable between repos.
