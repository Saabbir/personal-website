---
title: Style Placeholder Text
description: Style form placeholder text using CSS vendor prefixes.
createdAt: 01/01/2021
tags:
  - css
  - scss
---

```css
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

## Further reading

- https://css-tricks.com/almanac/selectors/p/placeholder/
