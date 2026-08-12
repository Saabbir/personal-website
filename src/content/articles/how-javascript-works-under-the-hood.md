---
title: How JavaScript Works Under The Hood?
description: Learn how JavaScript works under the hood.
featuredImg: how-js-works.gif
createdAt: 01/01/2021
publish: false
tags:
  - javascript
  - theory
---

<div class="l-wrap l-wrap--700">

### What is global?

Code that aren't inside a function is global.

Whenever we're opening a tab in the browser, the JavaScript engine of the browser creates a global execution context for us. That execution context gives us a global object named 'window' and a special variable named 'this' automatically. We can use it in our JavaScript program when we working on the browser.

### What is syntax parsers?

A program that reads your code and determines what it does and if its grammar is valid. Your code isn't magic. Someone else wrote a program to translate your code into machine readable code.

### What is lexical environment?

Where something sits physically in the code you write. A lexical environment exists is programming languages in which where you write something is important.

### What is a identifier in JavaScript?

A sequence of characters in the code that identifies a `variable`, `function`, or `property`.

So in a nutshell, when you refer to any data/value (string, number, boolean, array, object, function, undefined, null) by using any sequence of characters, that is a identifier.

- [Read MDN article on this](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)

The followings are all identifier.

- Variable created using let, const, var
- Function created using function definition
- Function parameters/arguments
- Object property keys

### What is Execution Context in JavaScript?

A wrapper to help manage the code that is running. There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

**Details**

When a webpage loads, JavaScript engine creates an execution context named global execution context. That is the parent of all execution context and bottom of the execution stack. All the codes we write in our js file are wrapped inside this context.

There are two types of execution context in JavaScript.

- Global Exection Context
- Function Execution Context

Both works exactly the same way. Global execution context gets created by the JavaScript engine when it loads the page. Function execution context gets created when we invoke a function in JavaScript.

All the execution context has two phases. One is creation phase. Another is execution phase. Creation phase runs first before execution phase.

In creation phase, JavaScript engine looks into it's current execution context and finds out all the variables and functions are declared and stores them in the memory.

Then execution phase happen and execute the code top to bottom line by line and character by character.

That means JavaScript engine first setup the memory location for variables and functions before executing the code. That's called Hoisting.

Functions are stored in the memory entirely in the creation phase. But variables are stored in the memory with the initial value of undefined.

### See also

- [Ultimate Guide on Execution Context by Tyler McGinnis](https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/)
- [Article of Dmitry Soshnikov](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)
- [Medium Search on Execution Context](https://medium.com/search?q=Execution%20Context)

</div><!-- /.l-wrap--700 -->
