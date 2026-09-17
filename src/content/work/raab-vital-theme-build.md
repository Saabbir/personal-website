---
# ---------------------------------------------------------------------------
# DRAFT — not published yet. Flip `publish: true` once the TODOs below are
# filled in. This is the missing piece in the portfolio: every published case
# study is a test or a speed audit, and "Shopify theme development" is the
# first thing listed under what I do. A client who wants a theme built
# currently has nothing to look at.
#
# Everything marked TODO(saabbir) is something only you know. I've left the
# structure, the layout wiring and the questions — not invented answers.
# ---------------------------------------------------------------------------
createdAt: "" # TODO(saabbir): launch date, e.g. 2024-11-20
title: Building the Raab Vital storefront from a Figma file
highlight: "" # TODO(saabbir): one sentence, the outcome — e.g. a supplements storefront built from scratch in Liquid, with a product page the team can edit themselves
description: "" # TODO(saabbir): 2-3 plain sentences for the card and search results. What was there before, what you built, what it does now
type: Shopify
client: Raab Vital
eyebrow: Shopify build
tool: Shopify
scope: Full theme
dateRange: "" # TODO(saabbir): e.g. Sep - Nov 2024
caseLayout: shopify
featured: true
publish: false
url: "" # TODO(saabbir): live storefront URL
imgFolderName: raab-vital
category:
  - Shopify
  - Theme development
  - Liquid
tools:
  - Shopify
  - Liquid
  - JavaScript
  - SCSS
# Optional. A build usually doesn't have a single headline number the way a
# test does — don't invent one. If you have real before/after figures
# (launch speed, theme editor time saved, pages the team now ships without
# you), add them. If you don't, delete this block and let the writing carry it.
# metric: ""
# metricLabel: ""
# metrics:
#   - label: ""
#     value: ""
#     featured: true
---

<h2 id="overview"><span class="c-case-kicker">Overview</span> The short version</h2>

{/*
TODO(saabbir): 2–3 short paragraphs. Answer, in plain words:
  - Who is Raab Vital and what do they sell?
  - What did they have before — nothing, an off-the-shelf theme, an old site?
  - What did they hand you? (A Figma file and no theme, if I've understood right.)
  - What did you build?

Keep the voice you already use in the Wax London studies: "I worked with X on
a problem a lot of Y have." Say the thing, don't sell it.
*/}

<h2 id="brief"><span class="c-case-kicker">The brief</span> A design file, no theme</h2>

{/*
TODO(saabbir): this is the section other developers will actually read, and
the one clients quietly judge you on. A Figma file is not a theme. Explain
what that gap really involves — the stuff a designer's file doesn't answer:

  - What happens to this section when there are 2 products instead of 6?
  - What does this look like when the title runs to three lines?
  - Which of these numbers are real settings and which were placeholders?
  - What did you have to go back to the designer about?

One concrete example beats a general description.
*/}

<h2 id="build"><span class="c-case-kicker">The build</span> What I made editable, and what I didn't</h2>

{/*
TODO(saabbir): the most useful section in the whole write-up, and almost
nobody writes it. Clients care enormously about this and can never articulate
it, so saying it out loud is a real differentiator.

  - Which sections did you build as schema sections/blocks, and why those?
  - What did you deliberately hardcode, and why? (Every setting you expose is
    a setting someone can break. That decision is the craft.)
  - Any metafields or metaobjects? What are they holding?
  - What can their team change now without calling you?

If you used the c-process markup, the three/four-step layout renders nicely
here — see wax-london-homepage-performance.md for the pattern.
*/}

<h2 id="hard-part"><span class="c-case-kicker">The hard part</span> What went wrong first</h2>

{/*
TODO(saabbir): one real problem, honestly told. This is the section that
makes people trust the rest of the page. Structure:

  - what I built first
  - what went wrong / why it was the wrong direction
  - what I changed
  - what I'd do differently now

It does not need to be dramatic. "I made the variant picker a block, then
realised..." is plenty. A build case study with no friction in it reads
like a brochure, and everybody knows it.
*/}

<h2 id="result"><span class="c-case-kicker">Result</span> Where it landed</h2>

{/*
TODO(saabbir): what shipped, and how it's held up since.
  - launch date, and what the storefront does now
  - speed numbers if you have them — but only real ones. If you never
    measured it properly, say "I didn't measure this properly at the time",
    which is both honest and more credible than a made-up Lighthouse score.
  - anything the team has shipped on their own since launch: that's the
    strongest possible evidence the build was good.
*/}

<h2 id="screens"><span class="c-case-kicker">Screens</span> Before and after</h2>

{/*
TODO(saabbir): screenshots go in public/images/work/raab-vital/.
  - thumbnail.jpg (414x310) — used on the work grid and homepage
  - cover.jpg (1600x1200) — shown at the top of this page for shopify layout
  - plus whatever design/build comparisons you want inline

The c-case-variants markup in wax-london-model-vs-product.md is the pattern
for side-by-side shots. Give every image a real alt description — the
existing case studies describe what's actually in the frame, keep that up.

Then run: python3 scripts/generate-og-images.py
after adding an entry for this slug, so the share card isn't the default one.
*/}

<h2 id="who"><span class="c-case-kicker">Takeaway</span> Who this helps</h2>

{/*
TODO(saabbir): close the way the other studies close — who has this problem,
and what you'd do about it. Something like:

  "Brands with a design already done and no theme to put it in. The build is
  the easy half. Deciding what the team can safely change afterwards is the
  half that decides whether you're still fixing it in a year."

Then the layout adds the CTA automatically (caseCtaCopy in utils/work.ts
gives the shopify variant: "Need a Shopify build that holds up?").
*/}
