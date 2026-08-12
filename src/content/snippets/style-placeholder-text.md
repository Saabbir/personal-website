---
title: Style Placeholder Text
description: Style form placeholder text using CSS.
#featuredImg: async.webp
createdAt: 01/01/2021
tags:
  - css
  - scss
---

<div class="c-code-wrapper">
  <div class="c-code-wrapper__header">
    <div class="c-code-wrapper__title">Style placeholder text</div>
    <div class="c-code-wrapper__copy">Copy</div>
  </div>

```css [css]
/* Style placeholder text */

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: red;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: red;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: red;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: red;
}
```

</div>

## Further reading

- https://css-tricks.com/almanac/selectors/p/placeholder/
