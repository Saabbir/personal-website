---
title: Detect Horizontal Swipe
description: Detect horizontal (left/right) swipe on mobile.
#featuredImg: async.webp
createdAt: 01/01/2021
tags:
  - javascript
---

<div class="c-code-wrapper">
  <div class="c-code-wrapper__header">
    <div class="c-code-wrapper__title">Detect horizontal swipe</div>
    <div class="c-code-wrapper__copy">Copy</div>
  </div>

```js [js]
// Detect horizontal swipe
!(function detectHorizontalSwipe() {
  let touchstartX = 0;
  let touchendX = 0;

  const body = document.querySelector("body");

  function handleGesture() {
    if (touchendX < touchstartX) alert("swiped left!");
    if (touchendX > touchstartX) alert("swiped right!");
  }

  body.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  body.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  });
})();
```

</div>

## Further reading

- https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
