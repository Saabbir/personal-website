---
title: Safari back-forward-cache override
description: Prevent Safari from serving stale cached pages on back/forward browser navigation.
createdAt: 05/03/2024
tags:
  - javascript
  - safari
---

```js
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

## Further reading

- https://stackoverflow.com/a/13123626/5527156
- https://web.dev/articles/bfcache
