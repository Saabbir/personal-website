---
title: JavaScript Strings
description: Learn how to work with text in JavaScript.
featuredImg: js-strings.jpg
createdAt: 01/01/2021
publish: false
tags:
  - javascript
---

<div class="l-wrap l-wrap--700">

### What is the difference between string literals and string objects in JavaScript?

String literals (denoted by double or single quotes) and strings returned from String calls in a non-constructor context (i.e., without using the new keyword) are primitive strings. JavaScript automatically converts primitives to String objects, so that it's possible to use String object methods for primitive strings. In contexts where a method is to be invoked on a primitive string or a property lookup occurs, JavaScript will automatically wrap the string primitive and call the method or perform the property lookup.

- [Read stackoverflow thread on this](https://stackoverflow.com/questions/17256182/what-is-the-difference-between-string-literals-and-string-objects-in-javascript)

**Explanation**

Whenever we try to access a property/method on a primitive string, JavaScript automatically converts the primitive string into a string object. So, `'Saabbir'.length` converts into new `String('Saabbir').length` behind the scene. That's why we can access all of those string methods on a primitive string like Saabbir.

### What is a string object?

Strings created from `String` constructor function in a constructor context (i.e, using the `new` keyword) are string object.

**Example**

```js [js]
new String("Saabbir Hossain");
```

**Key takeaways**

- Without using `new` operator, `String` function calls always returns string primitive value.

- `String` function takes any types of data as an argument and converts it into it's corresponding primitive string value. So, `String(100)` will return the primitive string `"100"`. In here, the number value `100` gets converted into its corresponding `"100"` string value.

### String prototype chain

<div class="c-prism-container">

```js [js]
new String("string").__proto__ === String.prototype;
String.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```

</div>

</div><!-- /.l-wrap--700 -->
