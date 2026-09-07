---
title: Safari inline-block fix for CSS columns layout
description: Safari misplaces borders in CSS multi-column layouts when items use display inline-block. Here is the problem and the fix.
createdAt: 04/11/2023
publish: true
tags:
  - css
  - safari
  - issue
  - fix
---

## The problem

Using the CSS `columns` property gives different results in Chrome and Safari.

![Safari inline-block issue in a CSS columns layout](/images/articles/safari-inline-block/safari-inline-block-issue.gif)

Look closely at the gif. The border position changes if you toggle the `display: inline-block` rule. In this case, `border-bottom` for the last child of the left column sits above the first child of the right column. This issue only occurs in Safari.

## The finding

`border-bottom` works incorrectly in Safari while using CSS columns for layout.

## The fix

Use `display: inline-block` along with the `border-bottom` rule.
