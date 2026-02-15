# How JavaScript Works Inside the JS Engine || [Js Working](jsWorking/README.md)

(Execution Context, Memory Phase, Code Phase)

JavaScript runs inside a **JavaScript Engine** (like V8 in Chrome, Node.js).

A **JS engine executes code in two main phases**:

1. **Memory Creation Phase** (also called Creation Phase)
2. **Code Execution Phase** (also called Execution Phase)

---

## High-Level Flow

1. JS engine receives code.
2. Creates a **Global Execution Context**.
3. Runs:
   - Memory phase
   - Code phase
4. Executes line by line.

---

## What is Execution Context?

Execution context is an environment where JS code is evaluated.

There are three types:

1. **Global Execution Context (GEC)**
2. **Function Execution Context (FEC)**
3. **Eval Execution Context** (rarely used)

---

# Two Main Phases

## 1. Memory Creation Phase (Creation Phase)

In this phase:

- Memory is allocated for:

  - Variables
  - Functions

- But **code is NOT executed** yet.

### Rules:

| Type      | Memory Value                            |
| --------- | --------------------------------------- |
| var       | undefined                               |
| let/const | in temporal dead zone (not initialized) |
| function  | full function stored                    |

---

### Example 1

```javascript
var a = 10;
function test() {
  console.log("Hello");
}
console.log(a);
```

### Memory Phase Result

| Name | Value               |
| ---- | ------------------- |
| a    | undefined           |
| test | function definition |

No code runs yet.

---

## 2. Code Execution Phase

Now the code runs **line by line**.

### Execution:

```javascript
var a = 10;
```

`a` changes from:

```
undefined → 10
```

Next:

```javascript
console.log(a);
```

Output:

```
10
```

---

# Step-by-Step Example

```javascript
var x = 5;
var y = 10;

function add(a, b) {
  return a + b;
}

var result = add(x, y);
console.log(result);
```

---

## Step 1: Global Execution Context Created

### Memory Phase

| Name   | Value               |
| ------ | ------------------- |
| x      | undefined           |
| y      | undefined           |
| add    | function definition |
| result | undefined           |

---

## Step 2: Code Execution Phase

Line 1:

```javascript
x = 5;
```

Line 2:

```javascript
y = 10;
```

Line 3:
Function already stored.

Line 4:

```javascript
result = add(x, y);
```

Now:

- New **Function Execution Context** is created.

---

## Function Execution Context

For:

```javascript
add(5, 10);
```

### Memory Phase

| Name | Value     |
| ---- | --------- |
| a    | undefined |
| b    | undefined |

### Code Phase

| Name | Value |
| ---- | ----- |
| a    | 5     |
| b    | 10    |

Return:

```
15
```

Back to global context:

```
result = 15
```

---

## Final Output

```javascript
console.log(result);
```

Output:

```
15
```

---

# Important Concepts

## 1. Hoisting

Because memory phase runs first:

```javascript
console.log(a);
var a = 5;
```

Output:

```
undefined
```

Because:

Memory phase:

```
a = undefined
```

---

## 2. Function Hoisting

```javascript
test();

function test() {
  console.log("Hello");
}
```

Output:

```
Hello
```

Because function is fully stored in memory phase.

---

## 3. let and const Behavior

```javascript
console.log(a);
let a = 10;
```

Output:

```
ReferenceError
```

Because:

- `let` is in **Temporal Dead Zone** until initialized.

---

# Full Execution Flow Summary

### Step-by-step process:

1. JS engine reads code.
2. Creates Global Execution Context.
3. Runs Memory Phase:

   - Variables → undefined
   - Functions → stored

4. Runs Code Phase:

   - Executes line by line.

5. If function is called:

   - New execution context created.
   - Memory phase
   - Code phase

6. Function finishes → context removed from call stack.

---

# Interview-Level Definition

**JavaScript executes code in two phases:**

1. **Memory Creation Phase**
   Variables are allocated memory and initialized.

2. **Code Execution Phase**
   Code runs line by line and values are assigned.

---

# JavaScript Core Concepts || [Let Const Var TDZ Scope ](let_const_TDZ_scope/README.md)

---

## 1. `undefined` vs `not defined`

### Core Idea

- **undefined** → Variable exists but has no value.
- **not defined** → Variable does not exist at all.

| Feature | undefined             | not defined    |
| ------- | --------------------- | -------------- |
| Meaning | Declared but no value | Not declared   |
| Result  | Returns `undefined`   | ReferenceError |
| Memory  | Allocated             | Not allocated  |
| Type    | Primitive value       | Error state    |

### Examples

```js
let x;
console.log(x); // undefined
```

```js
console.log(y); // ReferenceError: y is not defined
```

### Best Practice

- Do not manually assign `undefined`.
- Use `null` to represent intentional emptiness.

---

## 2. Scope and Scope Chain

### Types of Scope

| Scope    | Description                                    |
| -------- | ---------------------------------------------- |
| Global   | Accessible everywhere                          |
| Function | Accessible only inside function                |
| Block    | Accessible only inside `{}` with `let`/`const` |

---

### Scope Chain

When a variable is used:

1. Look in current scope.
2. If not found, move to parent scope.
3. Continue upward to global scope.
4. If still not found → **ReferenceError**.

---

## 3. Lexical Environment

Scope is determined by **where the function is written**, not where it is called.

### Formula

```
Lexical Environment = Local Memory + Reference to Parent
```

### Access Rules

| Scope       | Access                        |
| ----------- | ----------------------------- |
| Inner scope | Can access outer variables    |
| Outer scope | Cannot access inner variables |

---

## 4. `var` vs `let` vs `const`

### let

- Block-scoped
- Can be reassigned
- Can be declared without value

```js
let x;
x = 10;
```

---

### const

- Block-scoped
- Must be initialized
- Cannot be reassigned

```js
const y = 20;
```

But objects can mutate:

```js
const obj = { name: "Rahul" };
obj.name = "Amit"; // allowed
```

---

### var

- Function-scoped
- Hoisted with `undefined`
- Attached to global object (`window`)

---

## 5. Temporal Dead Zone (TDZ)

### Definition

Time between:

- Entering scope
- And variable declaration

During this time:

- Variable exists
- But is uninitialized
- Accessing it → ReferenceError

### Example

```js
console.log(a); // ReferenceError
let a = 10;
```

---

### Memory Model

| Variable  | Memory Phase        |
| --------- | ------------------- |
| var       | undefined           |
| function  | full function       |
| let/const | uninitialized (TDZ) |

---

## 6. Global Memory Sections

| Variable | Memory Area   | window access |
| -------- | ------------- | ------------- |
| var      | Global object | Yes           |
| let      | Script scope  | No            |
| const    | Script scope  | No            |

Example:

```js
var a = 10;
let b = 20;

console.log(window.a); // 10
console.log(window.b); // undefined
```

---

## 7. JavaScript Errors (Interview Model)

### SyntaxError

- Compile-time error
- Code breaks grammar rules

Example:

```js
const x; // SyntaxError
```

---

### ReferenceError

- Variable not found in scope chain
- Or accessed in TDZ

Example:

```js
console.log(a); // ReferenceError
```

---

### TypeError

- Operation not allowed on value

Example:

```js
const x = 10;
x = 20; // TypeError
```

---

### Interview Comparison

| Error          | Phase   | Meaning              |
| -------------- | ------- | -------------------- |
| SyntaxError    | Parsing | Code structure wrong |
| ReferenceError | Runtime | Variable not found   |
| TypeError      | Runtime | Invalid operation    |

---

## 8. Blocks and Block Scope

### Block

A block is:

```js
{ ... }
```

Used to group multiple statements.

Example:

```js
if (user) {
  console.log("Welcome");
  console.log("Redirecting");
}
```

---

### Block Scope

- `let` and `const` are block-scoped.
- `var` ignores block scope.

---

## 9. Shadowing

### Definition

When an inner variable has the same name as an outer variable, the inner one **shadows** the outer.

---

### Example

```js
let x = 10;

function test() {
  let x = 20;
  console.log(x);
}

test(); // 20
console.log(x); // 10
```

---

### Block Shadowing

```js
let a = 5;

{
  let a = 15;
  console.log(a); // 15
}

console.log(a); // 5
```

---

### Illegal Shadowing

```js
let x = 10;

{
  var x = 20; // SyntaxError
}
```

Reason:

- `let` is block-scoped.
- `var` is function-scoped.
- Scope conflict occurs.

---

### Legal Shadowing

```js
var x = 10;

{
  let x = 20;
}

console.log(x); // 10
```

---

## TDZ Shadowing Interview Trap

```js
let a = 10;

function test() {
  console.log(a);
  let a = 20;
}

test();
```

Result:

```
ReferenceError
```

Reason:

- Inner `a` is in TDZ.
- It shadows outer `a`.

---

## Final Interview Mental Model

### Execution Context Memory Phase

```
var → undefined
function → full body
let/const → uninitialized (TDZ)
```

### Execution Phase

```
Assignments happen
Functions run
TDZ ends at declaration line
```

---

## One-Paragraph Interview Answer

JavaScript uses lexical scoping and execution contexts. Variables declared with `var` are function-scoped and hoisted with `undefined`, while `let` and `const` are block-scoped and remain in the Temporal Dead Zone until initialized. The scope chain resolves variables from inner to outer scopes, and errors like SyntaxError, ReferenceError, and TypeError occur at different phases of execution depending on the issue.

---
