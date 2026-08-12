---
title: Safari back-forward-cache override
description:
#featuredImg: async.webp
createdAt: 05/03/2024
tags:
  - javascript
  - safari
---

<div class="c-code-wrapper">
  <div class="c-code-wrapper__header">
    <div class="c-code-wrapper__title">Safari back-forward-cache override</div>
    <div class="c-code-wrapper__copy">Copy</div>
  </div>

```js [js]
// Safari back-forward-cache override
(function () {
  window.onpageshow = function (event) {
    if (event.persisted) {
      document.body.style.opacity = 0;
      window.location.reload();
    }
  };
})();
```

</div>

## Further reading

- https://stackoverflow.com/a/13123626/5527156
- https://web.dev/articles/bfcache
