---
createdAt: 09/05/2025
title: How I made a Wax London product page feel ready sooner
highlight: I cut the time it takes a phone to show a finished product page by 17%. On a computer the page started painting 25% sooner.
description: Wax London product pages were slow to look finished. I delayed reviews, started the cookie script earlier, and warmed up extra hosts so shoppers saw a usable page sooner. The main product photo is still the slow part.
type: Performance
client: Wax London
eyebrow: Performance
tool: WebPageTest
scope: Product page
dateRange: Apr to May 2025
featured: true
publish: true
url: https://www.waxlondon.com/products/whiting-coral-and-pale-blue-pike-check-overshirt
caseLayout: performance
category:
  - Performance
  - Shopify PDP
  - WebPageTest
  - Core Web Vitals
tools:
  - WebPageTest
  - Shopify
  - Liquid
  - JavaScript
metric: "−17%"
metricLabel: Mobile Speed Index
metrics:
  - label: Mobile Speed Index
    value: "−17.17%"
    baseline: "8.008s"
    variation: "6.633s"
    featured: true
  - label: Desktop start render
    value: "−25%"
    baseline: "1.6s"
    variation: "1.2s"
  - label: Desktop First Contentful Paint
    value: "−21.2%"
    baseline: "1.609s"
    variation: "1.268s"
  - label: Desktop Total Blocking Time
    value: "−15.8%"
    baseline: "330ms"
    variation: "278ms"
---

<h2 id="finding"><span class="c-case-kicker">Problem</span> The product was ready too late</h2>

I worked with Wax London on a Shopify product page that took too long to look finished. Reviews, cookie consent, and extra third-party hosts were getting in the way of the first screen.

Shoppers should see the product, then the rest of the page. If scripts delay that, they wait on a blank or half-drawn screen. That is a common problem on fashion stores that add review widgets, consent tools, and size apps on top of the theme.

I measured one live page in WebPageTest, on a phone and on a computer, then shipped a small set of loading changes. The page I used is the <a href="https://www.waxlondon.com/products/whiting-coral-and-pale-blue-pike-check-overshirt" target="_blank" rel="noopener noreferrer">Whiting Coral and Pale Blue Pike Check Overshirt</a>.

> If I cut blocking work on the product page, people should see a usable screen sooner, even while the main product photo still loads the old way.

On a phone, Speed Index went from 8.008s to 6.633s. That is 17.17% faster. Speed Index is how soon the screen looks complete. The full visible page used to take more than 9 seconds. It now finishes within 7.5 seconds. First Contentful Paint and Largest Contentful Paint each improved by about 100ms, which is small.

On a computer, the page started rendering 25% sooner, First Contentful Paint improved 21%, and Total Blocking Time dropped 16%. Largest Contentful Paint, the moment the main photo lands, went the other way, from 4.148s to 4.374s. That is 5.4% slower, and still a long way from Google's 2.5s target.

These figures are WebPageTest median runs, sorted by Speed Index. They are lab runs, not Chrome User Experience Report field data.

<h2 id="changes"><span class="c-case-kicker">Work</span> What I changed</h2>

I shipped four changes. I did not rewrite the theme. I did not replace the image pipeline.

<div class="c-process">
  <article class="c-process__item">
    <span class="c-process__num">01</span>
    <h3 class="c-process__title">Delayed the review widget</h3>
    <p class="c-process__desc">The reviews script no longer blocks the first paint. It can wait until the product is on screen.</p>
  </article>
  <article class="c-process__item">
    <span class="c-process__num">02</span>
    <h3 class="c-process__title">Started the cookie script earlier</h3>
    <p class="c-process__desc">Consent still has to run. Starting that fetch earlier meant less waiting once the page needed it.</p>
  </article>
  <article class="c-process__item">
    <span class="c-process__num">03</span>
    <h3 class="c-process__title">Let people zoom</h3>
    <p class="c-process__desc">The viewport was blocking pinch zoom. I set max-scale to 2.0 so people can enlarge the page. That is an accessibility fix, not a speed trick.</p>
  </article>
  <article class="c-process__item">
    <span class="c-process__num">04</span>
    <h3 class="c-process__title">Warmed up extra hosts</h3>
    <p class="c-process__desc">I preconnected cdnjs.cloudflare.com and geo.cookie-script.com so those requests start with a connection already open.</p>
  </article>
</div>

I could not fix Largest Contentful Paint in this pass. The main photo still depends on lazysizes, so the browser finds it late. The URL is also dynamic, so a simple preload is not safe.

<section class="c-case-lab">
  <h2 id="lab"><span class="c-case-kicker">Results</span> What moved</h2>
  <p>The script work moved completeness and first paint. It barely touched Largest Contentful Paint. On a computer, largest paint got worse. That is honest. The photo is still the leftover problem.</p>

  <div class="c-case-vitals">
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Phone</p>
      <p class="c-case-vitals__value">6.633s</p>
      <p class="c-case-vitals__label">Speed Index</p>
      <p class="c-case-vitals__delta">from 8.008s</p>
    </article>
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Computer</p>
      <p class="c-case-vitals__value">1.2s</p>
      <p class="c-case-vitals__label">Start render</p>
      <p class="c-case-vitals__delta">from 1.6s</p>
    </article>
    <article class="c-case-vitals__card">
      <p class="c-case-vitals__device">Phone</p>
      <p class="c-case-vitals__value">3.661s</p>
      <p class="c-case-vitals__label">Largest paint</p>
      <p class="c-case-vitals__delta">from 3.772s</p>
    </article>
    <article class="c-case-vitals__card c-case-vitals__card--down">
      <p class="c-case-vitals__device">Computer</p>
      <p class="c-case-vitals__value">4.374s</p>
      <p class="c-case-vitals__label">Largest paint</p>
      <p class="c-case-vitals__delta">from 4.148s, 5.4% slower</p>
    </article>
  </div>
</section>

<section class="c-case-lab">
  <h2 id="phone"><span class="c-case-kicker">Phone</span> What changed on a phone</h2>
  <p>The biggest gain is how soon the screen looks complete. Speed Index improved 17.17%. First Contentful Paint and Largest Contentful Paint both moved in the right direction, but only by about a tenth of a second. Largest Contentful Paint is still over 3.5s. Google wants 2.5s.</p>
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
          <div class="c-case-metrics__metric" role="cell">First Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">2.572s</div>
          <div class="c-case-metrics__value" role="cell">2.460s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−4.35%</span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Largest Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">3.772s</div>
          <div class="c-case-metrics__value" role="cell">3.661s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−2.94%</span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Speed Index</div>
          <div class="c-case-metrics__value" role="cell">8.008s</div>
          <div class="c-case-metrics__value" role="cell">6.633s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−17.17%</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="c-case-variants c-case-variants--stack">
    <article class="c-case-variants__card">
      <p class="c-case-variants__label">Before · Phone</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-pdp-performance/mobile-before.png" alt="WebPageTest mobile before: First Contentful Paint 2.572s, Speed Index 8.008s, Largest Contentful Paint 3.772s, with a filmstrip of the overshirt product page loading from 2.0s to 5.2s." width="1446" height="355" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">Before the script changes</h3>
        <p class="c-case-variants__copy">Start render at 2.600s. First Contentful Paint at 2.572s. Speed Index at 8.008s. Largest Contentful Paint at 3.772s. Total Blocking Time at 1.053s.</p>
        <p class="c-case-variants__meta">8.008s Speed Index</p>
      </div>
    </article>
    <article class="c-case-variants__card c-case-variants__card--winner">
      <p class="c-case-variants__label">After · Phone</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-pdp-performance/mobile-after.png" alt="WebPageTest mobile after: First Contentful Paint 2.460s, Speed Index 6.633s, Largest Contentful Paint 3.661s on the same overshirt product page." width="1444" height="356" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">After reviews, cookies, and preconnects</h3>
        <p class="c-case-variants__copy">The screen looks usable sooner. Speed Index dropped 1.375s. First Contentful Paint and Largest Contentful Paint each improved by about 110ms. The photo is still the slow part.</p>
        <p class="c-case-variants__meta">6.633s Speed Index</p>
      </div>
    </article>
    <article class="c-case-variants__card c-case-variants__card--wide">
      <p class="c-case-variants__label">Complete · Phone</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-pdp-performance/mobile-complete.png" alt="WebPageTest comparison: the before run still loading at 7.5 seconds, while the after run reaches 100% visible content at 7.5 seconds." width="1434" height="506" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">100% visible content within 7.5 seconds</h3>
        <p class="c-case-variants__copy">Before, the visible page was still filling in after 7.5 seconds, and took more than 9 seconds to finish. After, the same checkpoint is done. A size widget called Eyefitu still added some extra work on the way.</p>
        <p class="c-case-variants__meta">Used to take more than 9 seconds</p>
      </div>
    </article>
  </div>
</section>

<section class="c-case-lab">
  <h2 id="computer"><span class="c-case-kicker">Computer</span> What changed on a computer</h2>
  <p>Desktop started painting much sooner. Start render went from 1.6s to 1.2s. First Contentful Paint followed it. Total Blocking Time fell. Speed Index improved a little. Largest Contentful Paint got worse.</p>
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
          <div class="c-case-metrics__metric" role="cell">Start render</div>
          <div class="c-case-metrics__value" role="cell">1.600s</div>
          <div class="c-case-metrics__value" role="cell">1.200s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−25.0%</span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">First Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">1.609s</div>
          <div class="c-case-metrics__value" role="cell">1.268s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−21.2%</span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Largest Contentful Paint</div>
          <div class="c-case-metrics__value" role="cell">4.148s</div>
          <div class="c-case-metrics__value" role="cell">4.374s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--down">+5.4%</span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Speed Index</div>
          <div class="c-case-metrics__value" role="cell">8.526s</div>
          <div class="c-case-metrics__value" role="cell">8.161s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−4.3%</span></div>
        </div>
        <div class="c-case-metrics__row" role="row">
          <div class="c-case-metrics__metric" role="cell">Total Blocking Time</div>
          <div class="c-case-metrics__value" role="cell">0.330s</div>
          <div class="c-case-metrics__value" role="cell">0.278s</div>
          <div role="cell"><span class="c-case-metrics__badge c-case-metrics__badge--up">−15.8%</span></div>
        </div>
      </div>
    </div>
  </div>
  <p class="c-case-metrics__note">Start render, First Contentful Paint, and Total Blocking Time all improved. Largest Contentful Paint did not. That is the image problem showing up on a faster machine.</p>

  <div class="c-case-variants c-case-variants--stack">
    <article class="c-case-variants__card">
      <p class="c-case-variants__label">Before · Computer</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-pdp-performance/desktop-before.png" alt="WebPageTest desktop before: start render 1.600s, First Contentful Paint 1.609s, Largest Contentful Paint 4.148s, Speed Index 8.526s." width="1439" height="361" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">Before the script changes</h3>
        <p class="c-case-variants__copy">First pixels at 1.6s. Largest Contentful Paint at 4.148s. Speed Index at 8.526s. Total Blocking Time at 330ms.</p>
        <p class="c-case-variants__meta">1.6s start render</p>
      </div>
    </article>
    <article class="c-case-variants__card">
      <p class="c-case-variants__label">After · Computer</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-pdp-performance/desktop-after.png" alt="WebPageTest desktop after: start render 1.200s, First Contentful Paint 1.268s, Largest Contentful Paint 4.374s, Speed Index 8.161s." width="1443" height="329" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">Faster first paint, slower largest paint</h3>
        <p class="c-case-variants__copy">The page starts 400ms sooner. First Contentful Paint and Total Blocking Time improve with it. Largest Contentful Paint is 226ms later than before. The hero image is still the bottleneck.</p>
        <p class="c-case-variants__meta">1.2s start render</p>
      </div>
    </article>
    <article class="c-case-variants__card c-case-variants__card--wide">
      <p class="c-case-variants__label">Complete · Computer</p>
      <figure class="c-case-variants__shot">
        <img src="/images/work/wax-london-pdp-performance/desktop-complete.png" alt="WebPageTest comparison: the before desktop run reaches 100% visible content around 13 seconds, while the after run is complete by 9 seconds." width="1428" height="503" loading="lazy" decoding="async">
      </figure>
      <div class="c-case-variants__body">
        <h3 class="c-case-variants__title">100% visible content within 9 seconds</h3>
        <p class="c-case-variants__copy">The after run is visually complete by 9 seconds. The before run is still filling in past that. This matches the Speed Index gain. It does not cancel the Largest Contentful Paint regression.</p>
        <p class="c-case-variants__meta">Complete by 9s after the changes</p>
      </div>
    </article>
  </div>
</section>

<aside class="c-case-leftover">
  <h2 id="open"><span class="c-case-kicker">Takeaway</span> What this means</h2>
  <p>This is the kind of loading work I do on Shopify product pages. I delay the widgets that can wait, start the tools that have to run, and warm up the extra hosts. Shoppers see a finished screen sooner, even when the main photo still needs a later pass.</p>
  <p>The leftover problem is the product photo. It still waits on lazysizes, and the URL cannot be preloaded as it stands. On a phone Largest Contentful Paint barely moved. On a computer it got worse. A size widget called Eyefitu still added extra weight.</p>
  <p>Stores with the same mix of reviews, consent tools, and third-party widgets hit this pattern. I can audit that first screen, ship the loading cuts that move completeness, then take on the image work that actually moves Largest Contentful Paint.</p>
</aside>
