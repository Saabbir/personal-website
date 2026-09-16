---
createdAt: 28/03/2025
title: How I got Wax London's homepage on screen sooner
highlight: On a phone, the hero went from 3.0s to 2.2s, which meets Google's good mark. On a computer it went from 3.2s to 2.8s. The header jump on a phone went to zero.
description: Wax London's homepage hero was late, and the top of the page jumped on a phone. I got the first screen on sooner and matched the announcement bar heights. Third-party scripts are still the leftover cost.
type: Performance
client: Wax London
eyebrow: Performance
tool: WebPageTest
scope: Homepage
dateRange: Mar to May 2025
featured: true
publish: true
url: https://www.waxlondon.com/
caseLayout: performance
category:
  - Performance
  - Shopify Homepage
  - WebPageTest
  - Core Web Vitals
tools:
  - WebPageTest
  - Shopify
  - Liquid
  - JavaScript
metric: "−27%"
metricLabel: Mobile LCP
metrics:
  - label: Mobile Largest Contentful Paint
    value: "−26.7%"
    baseline: "3.0s"
    variation: "2.2s"
    featured: true
  - label: Desktop Largest Contentful Paint
    value: "−12.5%"
    baseline: "3.2s"
    variation: "2.8s"
  - label: Mobile Cumulative Layout Shift
    value: "0"
    baseline: "0.003"
    variation: "0"
  - label: Desktop Cumulative Layout Shift
    value: "0.002"
    baseline: "0.002"
    variation: "0.002"
---

<h2 id="finding"><span class="c-case-kicker">Problem</span> The first screen was late</h2>

I worked with Wax London on a homepage that had one job before anything else: show the hero. If that photo is late, or the top of the page jumps, people wait, then the brand feels slow.

That is a common first-screen problem on fashion homepages. The hero is the largest paint. Two announcement bars with different heights make the header drop. Third-party scripts for analytics, consent, and tests then compete with that first screen.

I measured the homepage in WebPageTest, on a phone and on a computer, then shipped the changes that would move Largest Contentful Paint and Cumulative Layout Shift. The live page is <a href="https://www.waxlondon.com/" target="_blank" rel="noopener noreferrer">waxlondon.com</a>.

> If the hero lands sooner and the announcement bar keeps a steady height, the first screen should feel stable and ready, instead of late and twitchy.

On a phone, Largest Contentful Paint went from 3.0s to 2.2s. That is 26.7% faster, and it meets Google's good threshold of 2.5s. The hero is now on screen by three seconds. That frame was missing in the before filmstrip.

On a computer, Largest Contentful Paint went from 3.2s to 2.8s. That is 12.5% faster. It is closer to 2.5s. It is not there yet.

These figures are lab runs, not Chrome User Experience Report field data.

<h2 id="changes"><span class="c-case-kicker">Work</span> What I changed</h2>

This was not a theme rewrite. I went after the first screen.

<div class="c-process">
  <article class="c-process__item">
    <span class="c-process__num">01</span>
    <h3 class="c-process__title">Got the hero on screen sooner</h3>
    <p class="c-process__desc">Largest Contentful Paint moved on both devices. On a phone the hero is now visible by three seconds, which the old filmstrip never showed.</p>
  </article>
  <article class="c-process__item">
    <span class="c-process__num">02</span>
    <h3 class="c-process__title">Matched the announcement bars</h3>
    <p class="c-process__desc">The theme bar and the global bar had different heights. When one replaced the other, the page jumped. Same height on both, and the jump stopped.</p>
  </article>
  <article class="c-process__item">
    <span class="c-process__num">03</span>
    <h3 class="c-process__title">Left desktop shift alone</h3>
    <p class="c-process__desc">Desktop Cumulative Layout Shift was already 0.002. CookieScript still adds a little. I did not chase a number that was already inside the budget.</p>
  </article>
  <article class="c-process__item">
    <span class="c-process__num">04</span>
    <h3 class="c-process__title">Checked the leftover script cost</h3>
    <p class="c-process__desc">A blocked-script run showed Triple Whale, CookieScript, and Convert still cost Speed Index and Largest Contentful Paint. That is leftover work, not a live change.</p>
  </article>
</div>

<section class="c-case-lab">
  <h2 id="lab"><span class="c-case-kicker">Results</span> What moved</h2>
  <p>WebPageTest on the homepage. Phone and computer. The phone now meets the Largest Contentful Paint bar. Desktop is closer. Layout shift on a phone is gone.</p>

  <div class="c-case-vitals">
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Phone</p>
      <p class="c-case-vitals__value">2.2s</p>
      <p class="c-case-vitals__label">Largest paint</p>
      <p class="c-case-vitals__delta">from 3.0s</p>
    </article>
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Computer</p>
      <p class="c-case-vitals__value">2.8s</p>
      <p class="c-case-vitals__label">Largest paint</p>
      <p class="c-case-vitals__delta">from 3.2s</p>
    </article>
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Phone</p>
      <p class="c-case-vitals__value">0</p>
      <p class="c-case-vitals__label">Layout shift</p>
      <p class="c-case-vitals__delta">from 0.003</p>
    </article>
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Computer</p>
      <p class="c-case-vitals__value">0.002</p>
      <p class="c-case-vitals__label">Layout shift</p>
      <p class="c-case-vitals__delta">already inside budget</p>
    </article>
  </div>

  <h3>Largest paint</h3>
  <p>Largest Contentful Paint is the moment the main content shows up. On this homepage that is the hero. Mobile now meets Google's good mark. Desktop is still 0.3s over 2.5s.</p>
  <div class="c-case-metrics__table c-case-metrics__table--audit" role="table">
    <div class="c-case-metrics__scroll">
      <div class="c-case-metrics__row c-case-metrics__head" role="row">
        <div role="columnheader">Metric</div>
        <div role="columnheader">Before</div>
        <div role="columnheader">After</div>
        <div role="columnheader">Difference</div>
      </div>
      <div class="c-case-metrics__body">
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Mobile Largest Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">3.0s</div>
          <div class="c-case-metrics__value" role="cell">2.2s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−26.7%<span class="u-sr-only"> (better)</span></span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Desktop Largest Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">3.2s</div>
          <div class="c-case-metrics__value" role="cell">2.8s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−12.5%<span class="u-sr-only"> (better)</span></span></div>
        </div>
      </div>
    </div>
  </div>
  <p class="c-case-metrics__note">Mobile after is 27 March to 28 March 2025. Lab data, not field data.</p>

  <div class="c-case-variants c-case-variants--stack">
    <article class="c-case-variants__card c-case-variants__card--winner">
      <p class="c-case-variants__label">Phone · Largest paint</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-homepage-performance/mobile-lcp.png" alt="WebPageTest mobile comparison: homepage Largest Contentful Paint moves from 3.0s before to 2.2s after, with the hero on screen by three seconds." width="1771" height="755" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">2.2s on a phone</h3>
        <p class="c-case-variants__copy">Before, the first meaningful hero frame sat at 3.0s. After, it sits at 2.2s. That is inside Google's 2.5s good mark. People see the jacket, not a blank phone screen.</p>
        <p class="c-case-variants__meta">26.7% faster</p>
      </div>
    </article>
    <article class="c-case-variants__card">
      <p class="c-case-variants__label">Computer · Largest paint</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-homepage-performance/desktop-lcp.png" alt="WebPageTest desktop comparison: homepage Largest Contentful Paint moves from 3.2s before to 2.8s after." width="975" height="342" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">2.8s on a computer</h3>
        <p class="c-case-variants__copy">The same hero moved from 3.2s to 2.8s. That is better. It is still 0.3s over the 2.5s target. Desktop still needs image and script work to close that gap.</p>
        <p class="c-case-variants__meta">12.5% faster</p>
      </div>
    </article>
  </div>

  <h3>Layout shift</h3>
  <p>The theme announcement bar and the global announcement bar were not the same height. When the global bar took over, the page dropped. Matching the heights removed the mobile jump. Desktop shift was already 0.002, well inside the 0.1 budget.</p>
  <div class="c-case-metrics__table c-case-metrics__table--audit" role="table">
    <div class="c-case-metrics__scroll">
      <div class="c-case-metrics__row c-case-metrics__head" role="row">
        <div role="columnheader">Metric</div>
        <div role="columnheader">Before</div>
        <div role="columnheader">After</div>
        <div role="columnheader">Difference</div>
      </div>
      <div class="c-case-metrics__body">
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Mobile Cumulative Layout Shift</div>
          <div class="c-case-metrics__value" role="cell">0.003</div>
          <div class="c-case-metrics__value" role="cell">0</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">Resolved<span class="u-sr-only"> (better)</span></span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Desktop Cumulative Layout Shift</div>
          <div class="c-case-metrics__value" role="cell">0.002</div>
          <div class="c-case-metrics__value" role="cell">0.002</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--flat">No change<span class="u-sr-only"> (no real change)</span></span></div>
        </div>
      </div>
    </div>
  </div>
  <p class="c-case-metrics__note">CookieScript still adds a little desktop shift. I did not spend the next week shaving 0.002.</p>

  <div class="c-case-variants c-case-variants--stack">
    <article class="c-case-variants__card c-case-variants__card--winner c-case-variants__card--wide">
      <p class="c-case-variants__label">Phone · Layout shift</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-homepage-performance/cls.png" alt="Bar chart of Cumulative Layout Shift on the homepage phone run. Before is about 0.003, after is near zero as of 28 March." width="1148" height="298" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">The jump is gone</h3>
        <p class="c-case-variants__copy">Same height on the theme bar and the global bar. The first screen stays put. People can tap a link without the header sliding out from under their thumb.</p>
        <p class="c-case-variants__meta">0 layout shift on a phone</p>
      </div>
    </article>
  </div>
</section>

<section class="c-case-lab">
  <h2 id="open"><span class="c-case-kicker">Takeaway</span> What this means</h2>
  <p>This is the kind of homepage work I do for Shopify stores. I get the hero on screen, keep the header still, then measure what third-party scripts still cost.</p>
  <p>Triple Whale, CookieScript, and Convert still sit on this homepage. I blocked them in a WebPageTest diagnostic, not on the live site. Speed Index dropped from 6.603s to 2.838s. Largest Contentful Paint dropped from 3.129s to 2.375s. That leftover cost is why a store can win the hero and still feel unfinished.</p>
  <p>The domains were api.config-security.com, whale.camera, geo.cookie-script.com, cdn-4.convertexperiments.com, and conf.config-security.com. Start render stayed at 1.400s either way. The tax is visual completeness and largest paint, not the first pixel. Stores that have to keep those tools can still load them after the first screen.</p>

  <div class="c-case-metrics__table c-case-metrics__table--audit c-case-metrics__table--scripts" role="table">
    <div class="c-case-metrics__scroll">
      <div class="c-case-metrics__row c-case-metrics__head" role="row">
        <div role="columnheader">Metric</div>
        <div role="columnheader">Scripts on</div>
        <div role="columnheader">Scripts blocked</div>
        <div role="columnheader">Difference</div>
      </div>
      <div class="c-case-metrics__body">
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Speed Index</div>
          <div class="c-case-metrics__value" role="cell">6.603s</div>
          <div class="c-case-metrics__value" role="cell">2.838s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−57.0%<span class="u-sr-only"> (better)</span></span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Largest Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">3.129s</div>
          <div class="c-case-metrics__value" role="cell">2.375s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−24.1%<span class="u-sr-only"> (better)</span></span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Cumulative Layout Shift</div>
          <div class="c-case-metrics__value" role="cell">0.002</div>
          <div class="c-case-metrics__value" role="cell">0</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">Resolved<span class="u-sr-only"> (better)</span></span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Total Blocking Time</div>
          <div class="c-case-metrics__value" role="cell">0.387s</div>
          <div class="c-case-metrics__value" role="cell">0.352s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−9.0%<span class="u-sr-only"> (better)</span></span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="c-case-variants c-case-variants--stack">
    <article class="c-case-variants__card">
      <p class="c-case-variants__label">Before · Scripts on</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-homepage-performance/scripts-before.png" alt="WebPageTest with Triple Whale, CookieScript, and Convert still loading. Speed Index 6.603s, Largest Contentful Paint 3.129s, Cumulative Layout Shift 0.002." width="1824" height="547" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">With the third parties</h3>
        <p class="c-case-variants__copy">Speed Index 6.603s. Largest Contentful Paint 3.129s. Cumulative Layout Shift 0.002. Total Blocking Time 387ms. The filmstrip is still filling in at 3 seconds.</p>
        <p class="c-case-variants__meta">6.603s Speed Index</p>
      </div>
    </article>
    <article class="c-case-variants__card c-case-variants__card--winner">
      <p class="c-case-variants__label">After · Scripts blocked</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-homepage-performance/scripts-after.png" alt="WebPageTest with Triple Whale, CookieScript, and Convert blocked. Speed Index 2.838s, Largest Contentful Paint 2.375s, Cumulative Layout Shift 0." width="1820" height="444" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">Without those three</h3>
        <p class="c-case-variants__copy">Speed Index 2.838s. Largest Contentful Paint 2.375s. Cumulative Layout Shift 0. Total Blocking Time 352ms. The hero is in the filmstrip by 2.5 seconds.</p>
        <p class="c-case-variants__meta">2.838s Speed Index</p>
      </div>
    </article>
  </div>

  <aside class="c-case-leftover">
    <p>The phone hero now meets Google's good mark, and the announcement bar no longer jumps. Desktop still sits 0.3s over 2.5s. If your homepage has the same mix of hero, header bars, and third-party scripts, I can run this kind of audit and ship the first-screen work that shoppers actually feel.</p>
  </aside>
</section>
