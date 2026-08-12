---
title: Detect Horizontal Swipe
description: Detect horizontal (left/right) swipe gesture on mobile touch devices with JavaScript.
createdAt: 01/01/2021
tags:
  - javascript
  - mobile
---

```js
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

## Further reading

- https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
