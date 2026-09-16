# How to write for this site

The rules this site's copy was rewritten against, in September 2026. Read this
before writing or editing any user-facing text — page copy, case studies,
articles, snippets, meta descriptions, button labels.

## The one-line version

> A senior developer explaining something to a smart friend over coffee.

Not: corporate, salesy, inspirational, academic, or overly polished.

## Three rules everything else follows from

**1. Show, don't claim.** Never "I'm an expert in experimentation." Instead:
the test, the setup, the numbers, the caveat. Let the reader conclude it.

**2. Specific beats impressive.** "I rebuilt the announcement bar so the header
stopped jumping" lands harder than "delivered a high-performance experience."

**3. Honest limits are the differentiator.** The Wax London study says
*"Purchase rate is not at 95% confidence."* That one sentence does more for
credibility than every superlative a homepage could carry. Keep doing that.

## Banned words

Zero tolerance in user-facing copy. There's a check for these — see
"Before you publish" below.

```
passionate          results-driven      cutting-edge        world-class
best-in-class       industry-leading    seamless            leverage
empower             unlock              next-generation     robust solutions
digital transformation                  end-to-end expertise
innovative          highly skilled      live and breathe    pixels to profit
core competencies   I specialize in     turn traffic into revenue
```

Also avoid the *shape* of marketing copy even when the words aren't on the
list: alliterative headings that mean nothing ("from pixels to profit"),
eyebrow labels above every heading, and three-noun taglines
("Developer, analyst, and optimiser").

## The test for any sentence

> **Would I actually say this to another developer?**

If no, rewrite. This catches almost everything.

## Specifics

**First person, always.** "I build Shopify themes", never "Saabbir Hossain
builds Shopify themes." The second sounds like someone else wrote the site.

**Contractions are fine.** I've, don't, that's, here's. Write like speech.

**Short paragraphs.** One to four sentences. Headings often. The page should be
scannable before it's readable.

**Numbers get attributed.** A figure with no source reads as invented. `+50%`
belongs next to the client, the sample size and the date range, or it doesn't
belong on the page. Aggregate claims across a test programme ("average 20–40%
lift") are not credible to anyone who runs tests — most tests are flat or lose.

**Admit what you don't know.** "I didn't measure this properly at the time" is
more credible than a number you half-remember.

**Write about failures.** What you built first, what went wrong, what you
changed, what you'd do differently. This is the most valuable content on the
site and almost nobody writes it.

## Case study structure

The three Wax London studies are the reference. Copy their shape:

1. **Overview** — the short version, in plain words
2. **Hypothesis / the brief** — why this, what question it answers
3. **What I changed** — specific, with before/after
4. **Results** — the numbers, in a table
5. **Insights** — what it means for someone in the same position
6. **Caveats — "What this does not prove"** — never skip this section
7. **Takeaway** — who has this problem, what you'd do about it

Headings use the kicker pattern:
`<h2 id="results"><span class="c-case-kicker">Results</span> What happened</h2>`

Good headings are questions a client actually asks: *"Does seeing the model
sell the suit?"* Bad headings are labels: *"Project Overview."*

## Before you publish

```bash
# 1. No marketing language
grep -rniE "passionate|results-driven|cutting-edge|world-class|seamless|leverage|empower|unlock|industry-leading|core competencies|live and breathe|pixels to profit" src/pages src/components src/layouts src/content

# 2. Types and build
npx astro check && npm run build

# 3. Read it out loud
```

That third one is the one that matters. Any sentence you wouldn't say to
another developer gets rewritten.
