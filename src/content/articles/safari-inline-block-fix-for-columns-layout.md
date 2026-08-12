---
title: Safari inline-block fix for CSS columns layout
# description:
# featuredImg: js-strings.jpg
createdAt: 04/11/2023
publish: true
tags:
  - css
  - safari
  - issue
  - fix
---

<div class="l-wrap l-wrap--700">

## The problem

Using css columns property gives us different results for Chrome and Safari. Check below gif file.

</div><!-- /.l-wrap--700 -->

<div class="l-wrap l-wrap--md">
<!--
  Read more about how to create components and use in markdown file in here -> https://jamesdonnelly.dev/blog/adding-images-with-nuxt-content/
-->

<MarkdownImage src="article-images/safari-inline-block-issue.gif" alt="Safari inline-block issue" class="u-my-32"></MarkdownImage>

</div><!-- /.l-wrap--md -->

<div class="l-wrap l-wrap--700">

Look closely to the above gif file and you'll see the border positions differently if we toggle <code>display: inline-block</code> rule. In this case, border-bottom for last child of the left column goes above the first child of the right column. This issue only occurs in Safari browser.

## The finding

Border bottom works incorrectly in Safari while using CSS columns for layout.

## The fix

Use <code>display: inline-block</code> along with the <code>border-bottom</code> rule.

</div><!-- /.l-wrap--700 -->
