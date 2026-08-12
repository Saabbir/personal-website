---
title: Get all non native window variables
description: Extract all custom user-defined window properties in browser environment.
createdAt: 05/03/2024
tags:
  - javascript
  - window
---

```js
// Get all non native window variables
(function showAllNonNativeWindowProperties() {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const currentWindowProps = Object.getOwnPropertyNames(window);

  const allNonNativeProps = currentWindowProps.filter(function (prop) {
    return !iframe.contentWindow.hasOwnProperty(prop);
  });

  for (const prop of allNonNativeProps.sort()) {
    console.log(`Saabbir ${prop}: `, window[`${prop}`]);
  }

  document.body.removeChild(iframe);
})();
```

## Further reading

- https://stackoverflow.com/questions/17246309/get-all-user-defined-window-properties
