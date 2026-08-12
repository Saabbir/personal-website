---
title: Entire JavaScript language in a table of contents
description: Get a bird’s-eye view of whole JavaScript in a table of contents.
createdAt: 01/01/2021
publish: false
tags:
  - javascript
---

<div class="l-wrap l-wrap--700">

**Inspired by**

- [javascript-in-one-pic](https://github.com/coodict/javascript-in-one-pic)
- [Learn X in Y minutes](https://learnxinyminutes.com/docs/javascript/)

## Table of contents

---

<br>

<div class="c-toc">
  <ol>
    <li>What is JavaScript? 
      <ol>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview">Start here. Read me first!</a></li>
      </ol>
    </li>
    <li>Kinds of JavaScript:
      <ol>
        <li><a href="http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/">Core JavaScript</a> ( ECMAScript )</li>
        <li>Client Side JavaScript ( Browser )</li>
        <li>Server Side JavaScript ( NodeJS )</li>
      </ol>
    </li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar">Lexical Structure</a>
      <ol>
        <li>Character Set</li>
        <li>Comments:
          <ol>
            <li><code>// single line comment</code></li>
            <li><code>/* multi line comment */</code></li>
          </ol>          
        </li>
        <li>Literals</li>
        <li>Identifiers and Reserved Words</li>
        <li>Optional Semicolons</li>
        <li>Case Sensitivity</li>
      </ol>
    </li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Data, Values, and Variables</a>
      <ol>
        <li>Numbers ( <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">Number</a> )
        </li>
        <li>Text ( <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">String</a> )
          <ol>
            <li><code>'Single quote string'</code></li>
            <li><code>"Double quote string"</code></li>
            <li><code>`Template string using backtick`</code></li>
          </ol>
        </li>
        <li>Boolean Values ( <code>true</code>, <code>false</code> )</li>
        <li><code>null</code> and <code>undefined</code></li>
        <li>The Global Object</li>
        <li>Wrapper Objects</li>
        <li>Immutable Primitive Values and Mutable Object References</li>
        <li>Type Conversions</li>
        <li><a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations">Variable Declaration</a>
          <ol>
            <li><code>Let</code></li>
            <li><code>Const</code></li>
            <li><code>Var</code></li>
          </ol>
        </li>
        <li><a href="https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript">Variable Scope</a>
          <ol>
            <li>Global Scope</li>
            <li>Local Scope</li>
          </ol>
        </li>
        <li><a
            href="https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript">Hoisting</a>
        </li>
        <li>Variable Shadowing</li>
      </ol>
    </li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators">Expressions and Operators</a>
      <ol>
        <li>Primary Expressions</li>
        <li>Object and Array Initializers</li>
        <li>Function Definition Expressions</li>
        <li>Property Access Expressions</li>
        <li>Invocation Expressions</li>
        <li>Object Creation Expressions</li>
        <li>Operator Overview</li>
        <li>Arithmetic Expressions</li>
        <li>Relational Expressions</li>
        <li>Logical Expressions</li>
        <li>Assignment Expressions</li>
        <li>Evaluation Expressions</li>
        <li>Miscellaneous Operators</li>
        <li><a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table">Operator
            Precedence Table</a></li>
      </ol>
    </li>
    <li>Statements 
      <ol>
        <li>Expression Statements</li>
        <li>Compound and Empty Statements</li>
        <li>Declaration Statements</li>
        <li>Conditionals <ol>
            <li>if</li>
            <li>else</li>
            <li>else if</li>
            <li>switch</li>
          </ol>
        </li>
        <li>Loops 
          <ol>
            <li>while</li>
            <li>do while</li>
            <li>for</li>
            <li>for in</li>
            <li>for of</li>
          </ol>
        </li>
        <li>Jumps
          <ol>
            <li>break</li>
            <li>continue</li>
            <li>return</li>
            <li>throw</li>
            <li>try/catch/finally</li>
          </ol>
        </li>
        <li>Miscellaneous Statements
          <ol>
            <li>debugger</li>
          </ol>        
        </li>
      </ol>
    </li>
    <li>Objects 
      <ol>
        <li>Kinds of objects:
          <ol>
            <li>Native objects. Example: <code>Math</code></li>
            <li>Host objects. Example: <code>window</code></li>
            <li>User defined objects. Example: <code>{ name: 'Saabbir' }</code></li>
          </ol>        
        </li>
        <li>Ways to create objects:
          <ol>
            <li>Using object literal syntax: <code>{}</code></li>
            <li>Using <code>new</code> keyword</li>
            <li>Using <code>Object.create()</code> method</li>
          </ol>        
        </li>
        <li>Querying and Setting Properties:
          <ol>
            <li>Dot notation: <code>obj.property</code></li>
            <li>Bracket notation: <code>obj[property]</code></li>
          </ol>         
        </li>
        <li>Kinds of object property:
          <ol>
            <li>Own property</li>
            <li>Inherited property</li>
          </ol>         
        </li>
        <li>Types of object property:
          <ol>
            <li>Data property</li>
            <li>Accessor property</li>
          </ol>         
        </li>
        <li>Data property attributes:
          <ol>
            <li>value</li>
            <li>writable</li>
            <li>enumerable</li>
            <li>configurable</li>
          </ol>         
        </li>
        <li>Accessor property attributes:
          <ol>
            <li>get</li>
            <li>set</li>
            <li>enumerable</li>
            <li>configurable</li>
          </ol>         
        </li>
      </ol>
    </li>
    <li>Arrays 
      <ol>
        <li>Creating Arrays</li>
        <li>Reading and Writing Array Elements</li>
        <li>Sparse Arrays</li>
        <li>Array Length</li>
        <li>Adding and Deleting Array Elements</li>
        <li>Iterating Arrays</li>
        <li>Multidimensional Arrays</li>
        <li>Array Methods</li>
        <li>ECMAScript 5 Array Methods</li>
        <li>Array Type</li>
        <li>Array-Like Objects</li>
        <li>Strings As Arrays</li>
      </ol>
    </li>
    <li>Functions 
      <ol>
        <li>Defining Functions</li>
        <li>Invoking Functions</li>
        <li>Function Arguments and Parameters</li>
        <li>Functions As Values</li>
        <li>Functions As Namespaces</li>
        <li>Closures</li>
        <li>Function Properties, Methods, and Constructor</li>
        <li>Functional Programming</li>
      </ol>
    </li>
    <li>Object Oriented Programming 
      <ol>
        <li>Constructor Function</li>
        <li>new Operator</li>
        <li>Function prototype Property</li>
        <li>Inheritance in JavaScript</li>
        <li>Prototypal Inheritance</li>
        <li>class Syntax</li>
        <li>this Keyword</li>
      </ol>
    </li>
    <li>Classes and Modules 
      <ol>
        <li>Classes and Prototypes</li>
        <li>Classes and Constructors</li>
        <li>Java-Style Classes in JavaScript</li>
        <li>Augmenting Classes</li>
        <li>Classes and Types</li>
        <li>Object-Oriented Techniques in JavaScript</li>
        <li>Subclasses</li>
        <li>Classes in ECMAScript 5</li>
        <li>Modules</li>
      </ol>
    </li>
    <li>Pattern Matching with Regular Expressions 
      <ol>
        <li>Defining Regular Expressions</li>
        <li>String Methods for Pattern Matching</li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp">The RegExp Object</a></li>
      </ol>
    </li>
    <li>Documentation and References 
      <ol>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference">JavaScript Reference</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Properties_Index">JavaScript Properties Index</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Methods_Index">JavaScript Methods Index</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Glossary">MDN Web Docs Glossary: Definitions of Web-related terms</a></li>
      </ol>
    </li>
  </ol>
</div>

</div><!-- /.l-wrap--700 -->
