---
title: Client-Side JavaScript
description: Learn about DOM, BOM, and variety of scriptable web APIs.
createdAt: 01/01/2021
publish: false
tags:
  - javascript
  - dom
---

<div class="l-wrap l-wrap--700">

### Client-Side JavaScript, Browser environment

The JavaScript language was initially created for web browsers. Since then it has evolved and become a language with many uses and platforms.

A platform may be a browser, or a web-server or another host, even a “smart” coffee machine, if it can run JavaScript. Each of them provides platform-specific functionality. The JavaScript specification calls that a host environment.

A host environment provides own objects and functions additional to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here’s a bird’s-eye view of what we have when JavaScript runs in a web browser:

- **Root Object** ( Global Object )
  - window
- **DOM** ( Document Object Model )
  - document
- **BOM** ( Browser Object Model )
  - navigator
  - screen
  - location
  - frames
  - history
  - XMLHttpRequest
  - ...and many more.

### What is browser Web APIs?

A variety of scriptable objects that represent web browser windows, documents, document content, and various features of the browser.

- console - _to output something to the console_
- fetch() - _fetch api for fetching resources_

There are over hundreds of APIs is work in progress. The main two groups working on these APIs are <a href="https://whatwg.org/">WHATWG</a> and <a href="https://www.w3.org/">W3C</a>. Visit their website to get latest information about next hot new API they are working on currently.

Also, visit https://developer.mozilla.org/en-US/docs/Web/API to find the list of all the APIs that are available.

### Tree of DOM node classes

The one at the bottom inherit properties and methods from the top.

- EventTarget
  - Node
    - CharacterData
      - Comment
      - Text
    - Document
    - Element
      - SVGElement
      - HTMLElement
        - HTMLAnchorElement
        - HTMLInputElement
        - HTMLTableElement
        - ...and many more

### Further reading

- [What, exactly, is the DOM?](https://bitsofco.de/what-exactly-is-the-dom/)
- [Introduction to the DOM](https://www.digitalocean.com/community/tutorials/introduction-to-the-dom)
- [Understanding the DOM Tree and Nodes](https://www.digitalocean.com/community/tutorials/understanding-the-dom-tree-and-nodes)

### References

- [Browser: Document, Events, Interfaces on JavaScript Info](https://javascript.info/ui)
- [Web APIs on MDN](https://developer.mozilla.org/en-US/docs/Web/API)
- [DOM on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

</div><!-- /.l-wrap--700 -->
