
# undefined vs not defined in JavaScript

In JavaScript, the difference boils down to **existence versus assignment**.

* **undefined**: The variable has been declared (memory is allocated), but no value has been assigned to it yet.
* **not defined**: The variable has not been declared at all in the current scope.

---

## Key Differences

| Feature | undefined                     | not defined                |
| ------- | ----------------------------- | -------------------------- |
| Meaning | Declared but lacks a value    | Does not exist in memory   |
| Result  | Returns the value `undefined` | Throws a `ReferenceError`  |
| Memory  | Memory space is reserved      | No memory space allocated  |
| Type    | A primitive data type         | An error state, not a type |

---

## Code Examples

### 1. undefined (The Placeholder)

When you declare a variable using `var`, `let`, or `const` but don't give it a value, JavaScript automatically assigns it `undefined` during the memory allocation phase.

```javascript
let x;
console.log(x); // Output: undefined
```

---

### 2. not defined (The Error)

If you try to access a variable that was never declared, the JavaScript engine cannot find it in the global execution context and stops execution.

```javascript
console.log(y); // Output: Uncaught ReferenceError: y is not defined
```

---

## Pro Tip: Best Practices

* **Avoid Manual Assignment:**
  Do not manually set variables to `undefined` (e.g., `x = undefined`).
  It is meant to be a system-level placeholder.

* **Use null for Intent:**
  If you want to explicitly signal that a variable is empty or has no value, use `null`.


---
#####

# Scope and the Scope Chain in JavaScript

## Introduction

In JavaScript, **Scope** determines the visibility of variables, while the **Scope Chain** is the mechanism used to find them.

---

## 1. Types of Scope

Scope defines the **"territory"** where a variable is accessible.

### Global Scope

* Variables declared outside any function or block.
* Accessible from anywhere in the code.

### Local / Function Scope

* Variables declared inside a function.
* Accessible only within that function.

### Block Scope

* Introduced in ES6.
* Variables declared with `let` or `const` inside a block `{}` (like an `if` statement or `for` loop) are only accessible within that block.
* `var` does **not** respect block scope.

---

## 2. The Scope Chain

The **Scope Chain** is the hierarchical process the JavaScript engine uses to resolve variable values.

### How it works

* When a variable is used, the engine first looks in the **current scope**.
* If it’s not found, it moves to the **outer (parent) scope**.

### Direction

* The lookup always moves **upwards** toward the **Global Scope**.

### Resolution

* The search stops as soon as the variable is found.
* If the engine reaches the Global Scope and still hasn’t found the variable, it throws a **ReferenceError**.

---

## 3. Lexical Environment

The scope chain is built based on **Lexical Scoping**.

* The chain is determined by **where the function is written** in the source code.
* Not by where the function is called.

### Formula

```
Lexical Environment = Local Memory + Reference to Parent’s Lexical Environment
```

---

## Access Rules

| Concept      | Access Rule                                                |
| ------------ | ---------------------------------------------------------- |
| Inner Scopes | Can access variables in their own scope + all outer scopes |
| Outer Scopes | Cannot access variables defined inside inner scopes        |


-----
----

---

# let, const, and the Temporal Dead Zone (TDZ)

In JavaScript, `let` and `const` are modern variable declarations introduced in ES6.
They were designed to solve problems that existed with `var`.

The **Temporal Dead Zone (TDZ)** is the safety mechanism that makes them different.

---

## 1. let vs const

Both `let` and `const` are **block-scoped**.

That means they only exist inside the block `{}` where they are declared.

### let

* Can be reassigned later.
* Can be declared without a value.
* Default value becomes `undefined` after initialization.

```javascript
let x;
console.log(x); // undefined

x = 10;
console.log(x); // 10
```

---

### const

* Used for constants.
* Must be initialized at declaration.
* Cannot be reassigned.

```javascript
const y = 20;
console.log(y); // 20

y = 30; // ❌ TypeError
```

---

### const with objects

`const` prevents reassignment, **not mutation**.

```javascript
const obj = { name: "Rahul" };
obj.name = "Amit";

console.log(obj.name); // "Amit" ✅ allowed
```

But:

```javascript
obj = {}; // ❌ TypeError
```

---

## 2. The Temporal Dead Zone (TDZ)

The **Temporal Dead Zone** is the time between:

* Entering a scope
* And the variable’s actual declaration line

During this period:

* The variable exists in memory.
* But it is **uninitialized**.
* Accessing it throws a **ReferenceError**.

---

### Basic TDZ Example

```javascript
console.log(a); // ❌ ReferenceError
let a = 10;
```

Why?

Because:

1. Memory phase:

   ```
   a → uninitialized (TDZ)
   ```

2. Execution:

   * `console.log(a)` tries to access it.
   * But `a` is still in TDZ.
   * So JS throws an error.

---

### Visual Timeline

```javascript
{
   // TDZ starts
   // console.log(myVar); ❌ error

   let myVar = "Hello";
   // TDZ ends

   console.log(myVar); // "Hello"
}
```

---

## 3. Difference Between var and let in Hoisting

### With var

```javascript
console.log(x); // undefined
var x = 10;
```

Memory phase:

```
x → undefined
```

Execution phase:

```
x = 10
```

---

### With let

```javascript
console.log(x); // ReferenceError
let x = 10;
```

Memory phase:

```
x → uninitialized (TDZ)
```

Execution:

* Access attempt → error

---

## 4. Where let and const are stored in memory

In the **Global Execution Context**, memory is divided into two areas.

---

### 1. Global Object Memory (window in browsers)

Stores:

* `var` variables
* Function declarations

Example:

```javascript
var a = 10;
console.log(window.a); // 10
```

---

### 2. Script / Declarative Environment Record

Stores:

* `let`
* `const`

Example:

```javascript
let b = 20;
console.log(window.b); // undefined
```

Even though `b` exists, it is not attached to `window`.

---

### Memory Comparison Table

| Variable Type | Memory Section | Accessible via window |
| ------------- | -------------- | --------------------- |
| var x = 10    | Global object  | Yes                   |
| let y = 20    | Script scope   | No                    |
| const z = 30  | Script scope   | No                    |

---

## 5. Example Showing Both Memory Areas

```javascript
var a = "I am on window";
let b = "I am in script scope";

console.log(window.a); // "I am on window"
console.log(window.b); // undefined
```

---

## 6. TDZ Inside Blocks

```javascript
{
  console.log(x); // ❌ ReferenceError
  let x = 5;
}
```

Block execution:

1. Enter block
2. Memory phase:

   ```
   x → uninitialized (TDZ)
   ```
3. Execution:

   * `console.log(x)` → error

---

## 7. TDZ with const

```javascript
console.log(y); // ❌ ReferenceError
const y = 50;
```

Same TDZ behavior as `let`.

---

## 8. TDZ in Functions

```javascript
function test() {
  console.log(a); // ❌ ReferenceError
  let a = 10;
}

test();
```

Function execution context:

Memory phase:

```
a → uninitialized (TDZ)
```

Execution:

* Access before declaration → error

---

## 9. Why TDZ Exists

TDZ was introduced to:

### 1. Catch bugs early

```javascript
if (true) {
  console.log(score); // error
  let score = 100;
}
```

Without TDZ, this could silently fail.

---

### 2. Make code predictable

With `var`:

```javascript
console.log(x); // undefined
var x = 10;
```

This can confuse developers.

With `let`:

```javascript
console.log(x); // error
let x = 10;
```

Clear and predictable behavior.

---

## 10. Quick Summary

### let

* Block scoped
* Can reassign
* Has TDZ

### const

* Block scoped
* Cannot reassign
* Must initialize
* Has TDZ

### var

* Function scoped
* Hoisted with `undefined`
* Attached to `window`
* No TDZ

---

## Final Mental Model

When a scope is created:

```
Memory Phase:

var → undefined
function → full body
let/const → uninitialized (TDZ)
```

Then:

```
Execution Phase:

Assignments happen
Functions run
TDZ ends at declaration line
```

---


# JavaScript Errors Explained for Interviews

To explain these errors clearly in a technical interview, define them based on **when** and **why** they occur during the **JavaScript Execution Context phases**.

---

## 1. ReferenceError (Memory & Scope)

### Explanation

This occurs when the JavaScript engine performs a **RHS (Right-Hand Side) lookup** for a variable but cannot find a valid reference in the **Scope Chain**.

### Why it happens

* The variable is not declared at all.
* The variable is accessed inside the **Temporal Dead Zone (TDZ)** for `let` or `const`.

### Key Interview Phrase

**“It’s an error of existence or visibility.”**

---

## 2. TypeError (Operations & Values)

### Explanation

This occurs when a value is used in a way that is **incompatible with its type**.
The variable exists, but the operation is not allowed.

### Why it happens

* Reassigning a `const` variable.
* Calling a non-function as a function.
* Accessing properties on `null` or `undefined`.

### Key Interview Phrase

**“It’s an error of usage or manipulation.”**

---

## 3. SyntaxError (Parsing & Rules)

### Explanation

This is a **compile-time error**.
The JavaScript engine fails to parse the code because it violates the **formal language rules (grammar)**.

### Why it happens

* Missing brackets or parentheses.
* Duplicate `let` declarations in the same scope.
* Declaring a `const` without assignment.

### Key Interview Phrase

**“It’s an error of grammar or structure that prevents execution.”**

---

## Interview “Gold” Comparison Table

| Error Type     | Phase       | Mental Model                                   |
| -------------- | ----------- | ---------------------------------------------- |
| SyntaxError    | Pre-parsing | “I don’t understand what you wrote.”           |
| ReferenceError | Execution   | “I know what you want, but I can’t find it.”   |
| TypeError      | Execution   | “I found it, but it’s not allowed to do that.” |

---

## Common Interview Trick Question

### Question

If there is a **SyntaxError** on line 10, will line 1 execute?

### Answer

No.

Because a **SyntaxError is detected during the parsing phase**, before execution starts.
The entire script is rejected.

* **SyntaxError** → compile-time error.
* **ReferenceError** and **TypeError** → runtime errors.

So code runs normally until it reaches the broken line in runtime errors.

---



---

# JavaScript Errors Explained for Interviews

To explain these errors clearly in a technical interview, define them based on **when** and **why** they occur during the **JavaScript Execution Context phases**.

---

## 1. ReferenceError (Memory & Scope)

### Explanation

This occurs when the JavaScript engine performs a **RHS (Right-Hand Side) lookup** for a variable but cannot find a valid reference in the **Scope Chain**.

### Why it happens

* The variable is not declared at all.
* The variable is accessed inside the **Temporal Dead Zone (TDZ)** for `let` or `const`.

### Key Interview Phrase

**“It’s an error of existence or visibility.”**

---

## 2. TypeError (Operations & Values)

### Explanation

This occurs when a value is used in a way that is **incompatible with its type**.
The variable exists, but the operation is not allowed.

### Why it happens

* Reassigning a `const` variable.
* Calling a non-function as a function.
* Accessing properties on `null` or `undefined`.

### Key Interview Phrase

**“It’s an error of usage or manipulation.”**

---

## 3. SyntaxError (Parsing & Rules)

### Explanation

This is a **compile-time error**.
The JavaScript engine fails to parse the code because it violates the **formal language rules (grammar)**.

### Why it happens

* Missing brackets or parentheses.
* Duplicate `let` declarations in the same scope.
* Declaring a `const` without assignment.

### Key Interview Phrase

**“It’s an error of grammar or structure that prevents execution.”**

---

## Interview “Gold” Comparison Table

| Error Type     | Phase       | Mental Model                                   |
| -------------- | ----------- | ---------------------------------------------- |
| SyntaxError    | Pre-parsing | “I don’t understand what you wrote.”           |
| ReferenceError | Execution   | “I know what you want, but I can’t find it.”   |
| TypeError      | Execution   | “I found it, but it’s not allowed to do that.” |

---

## Common Interview Trick Question

### Question

If there is a **SyntaxError** on line 10, will line 1 execute?

### Answer

No.

Because a **SyntaxError is detected during the parsing phase**, before execution starts.
The entire script is rejected.

* **SyntaxError** → compile-time error.
* **ReferenceError** and **TypeError** → runtime errors.

So code runs normally until it reaches the broken line in runtime errors.

---
# Block , Blcok Scope And Shadowing 
## The Block { }
> In JavaScript, a Block is defined by a pair of curly braces { ... }. Its purpose is to group multiple statements together.<br>
> The "Compound Statement": We use blocks where JS expects a single statement but we want to provide many (like inside an if condition or a for loop).

* Without a block, this happens:
``` javascript
if (userIsLoggedIn) 
    console.log("Welcome!"); // This line is controlled by the IF
    console.log("Redirecting..."); // This line runs NO MATTER WHAT!

//The engine sees two separate statements. It only attaches the first one to the if. This leads to massive bugs where code runs when it shouldn't.
```
* The Solution: The "Compound Statement"
> The Block { } acts like coding glue. It wraps multiple statements into a single package so the engine treats them as one single unit.
With a block:
```
javascript
if (userIsLoggedIn) {
    // Everything inside these braces is now ONE compound statement
    console.log("Welcome!");
    console.log("Redirecting...");
}
```
---
* **Use code with caution.**
>Now, the if controls the entire package. If the condition is false, the engine skips the whole block.
## Block Scope
> Block Scope means that variables declared inside a { } block are only accessible within that block.
> let and const are block-scoped. They are stored in a separate memory space called the Block Scope.
> var is NOT block-scoped. It is either globally scoped or function-scoped. It ignores the curly braces of an if or loop.

## Shadowing
> Shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope. The inner variable "shadows" (hides) the outer one.
javascript

``` 
var a = 100; // Global Scope
{
    var a = 10; // Shadows the global 'a'
    let b = 20; 
    console.log(a); // 10
}
console.log(a); // 10! (var 'a' was overwritten because it's not block-scoped) 

```

----- 

Use code with caution.

## Illegal Shadowing
You cannot shadow a let variable using a var. This throws a SyntaxError because var tries to jump out of the block to the same scope where let is already sitting.
```
javascript

let x = 10;
{
    var x = 20; // ❌ SyntaxError: 'x' has already been declared
}
Use code with caution.
```
### Interview Summary Table
> Concept	Explanation	Key Memory Fact
Block	{ } used to group code.	No specific memory space.
Block Scope	Restricted access within { }.<br>	Uses the Block memory section in DevTools.
* Shadowing	Inner variable hiding outer variable.	Inner value is resolved first in the Scope Chain.
Illegal Shadowing	var trying to cross let boundaries.	Throws a SyntaxError.
* Pro Tip: During an interview, if asked about shadowing, mention that functions also create their own scope, and shadowing works there too.

# Shadowing in JavaScript

## Definition

**Shadowing** happens when a variable declared inside a certain scope has the **same name** as a variable in an outer scope.
The inner variable **hides (shadows)** the outer variable within its scope.

---

## Basic Example

```javascript
let x = 10;

function test() {
  let x = 20; // shadows outer x
  console.log(x);
}

test();        // 20
console.log(x); // 10
```

### What happens

* Global `x = 10`
* Inside the function, a new `x = 20` is created.
* The inner `x` **shadows** the global `x`.
* Outside the function, the original `x` is still `10`.

---

## Shadowing with Block Scope

```javascript
let a = 5;

{
  let a = 15; // shadows outer a
  console.log(a); // 15
}

console.log(a); // 5
```

---

## Shadowing with var (Function Scope)

```javascript
var b = 100;

function demo() {
  var b = 200; // shadows global b
  console.log(b);
}

demo();        // 200
console.log(b); // 100
```

---

## Illegal Shadowing

Illegal shadowing happens when JavaScript does **not allow** the shadowing because of scope conflicts.

### Example: var trying to shadow let

```javascript
let x = 10;

{
  var x = 20; // ❌ SyntaxError
}
```

### Why?

* `let` is block-scoped.
* `var` is function-scoped.
* This creates a conflict in the same scope chain.

---

## Legal Shadowing

```javascript
var x = 10;

{
  let x = 20; // ✅ allowed
  console.log(x); // 20
}

console.log(x); // 10
```

Reason:

* `let` is block-scoped.
* It only exists inside the block.

---

## Shadowing in Nested Functions

```javascript
let value = 1;

function outer() {
  let value = 2;

  function inner() {
    let value = 3;
    console.log(value);
  }

  inner();
}

outer(); // 3
```

### Scope chain lookup

Inside `inner()`:

1. Looks for `value` in its own scope → finds `3`
2. Stops searching
3. Does not use outer values

---

## Shadowing vs Reassignment

### Shadowing (new variable)

```javascript
let x = 10;

function test() {
  let x = 20; // new variable
}
```

### Reassignment (same variable)

```javascript
let x = 10;
x = 20; // same variable updated
```

---

## Real Interview Example

```javascript
let a = 10;

function test() {
  console.log(a);
  let a = 20;
}

test();
```

### What happens

**Memory phase of test():**

```
a → uninitialized (TDZ)
```

**Execution:**

* `console.log(a)` tries to access inner `a`.
* Inner `a` is in TDZ.
* Error occurs.

Result:

```
ReferenceError: Cannot access 'a' before initialization
```

---

## Key Interview Points

* Shadowing occurs when a variable in an inner scope has the same name as one in an outer scope.
* Inner variable **takes priority**.
* Outer variable becomes inaccessible inside that scope.
* Illegal shadowing occurs with `var` and `let` conflicts.

---

## Quick Summary

| Concept             | Meaning                                      |
| ------------------- | -------------------------------------------- |
| Shadowing           | Inner variable hides outer variable          |
| Legal shadowing     | let inside block shadows outer var/let       |
| Illegal shadowing   | var conflicts with let/const in same scope   |
| TDZ shadowing error | Accessing shadowed let before initialization |

---

