# JavaScript Engine

A **JavaScript engine** is a specialized software component that **interprets and executes JavaScript code**.
It converts human-readable JavaScript into **machine-level instructions** that the computer can understand.

The JavaScript engine is responsible only for **code execution, memory management, and optimization**.
It does **not handle UI or rendering**—that is the job of the **rendering engine** in the browser.

---

## Major JavaScript Engines

### V8 (Google)

- Developed by Google.
- Used in **Chrome** and Chromium-based browsers like Edge and Brave.
- Also powers **Node.js** and **Deno**.

### SpiderMonkey (Mozilla)

- First JavaScript engine ever created.
- Maintained by Mozilla.
- Used in **Firefox**.

### JavaScriptCore (Apple)

- Also called **Nitro**.
- Used in **Safari**.
- Core engine behind the **Bun runtime**.

### Hermes (Meta)

- Developed by Meta.
- Optimized for **React Native** mobile apps.
- Focused on faster startup time and lower memory usage.

---

## How a JavaScript Engine Executes Code

Modern engines use **JIT (Just-In-Time) compilation** for performance.

### Step-by-step process:

1. **Parsing**

   - The engine reads the source code.
   - Converts it into an **Abstract Syntax Tree (AST)**.

2. **Bytecode Generation**

   - An interpreter converts the AST into **bytecode**.
   - Bytecode is easier and faster to execute.

3. **Optimization (JIT Compilation)**

   - The engine monitors frequently used code.
   - Hot code is compiled into **optimized machine code** for better performance.

4. **Garbage Collection**

   - The engine automatically removes unused objects.
   - This prevents memory leaks.

---

## Engine vs Runtime (Simple Comparison)

| Engine                        | Runtime                               |
| ----------------------------- | ------------------------------------- |
| Executes JavaScript code      | Provides environment to run code      |
| Manages memory and call stack | Provides APIs like DOM, Fetch, Timers |
| Example: V8, SpiderMonkey     | Example: Browser, Node.js, Bun        |

**Simple analogy:**

- **Engine** = Car’s engine (core power)
- **Runtime** = Whole car (engine + steering + brakes + dashboard)

---

## Short 20-second Interview Answer

“A JavaScript engine is the program that executes JavaScript code. It converts the code into machine instructions using parsing, bytecode generation, and JIT optimization. Examples include Google’s V8, Mozilla’s SpiderMonkey, and Apple’s JavaScriptCore. The engine handles execution and memory management, while the runtime provides external APIs like the DOM and event loop.”

---

---

# 1. Deep Dive: V8 Engine Internals

V8 uses a **multi-stage execution pipeline** to run JavaScript efficiently.

## V8 Architecture Overview

V8 mainly has two important components:

### 1. Ignition (Interpreter)

- Converts JavaScript into **bytecode**.
- Executes the bytecode line by line.
- Fast startup time.

### 2. TurboFan (Optimizing Compiler)

- Monitors frequently used code.
- Converts hot code into **highly optimized machine code**.
- Improves performance dramatically.

---

## Full V8 Execution Flow

### Step 1: Parsing

JavaScript code is converted into:

```
Source Code → Tokens → AST
```

Example:

```js
let x = 5 + 3;
```

AST represents the structure:

```
Assignment
   |
   +-- x
   +-- Addition
        |
        +-- 5
        +-- 3
```

---

### Step 2: Bytecode Generation (Ignition)

AST → Bytecode

Example bytecode (simplified):

```
Load 5
Load 3
Add
Store in x
```

Ignition executes this bytecode.

---

### Step 3: Profiling

While code runs:

- V8 tracks frequently executed functions.
- These are called **hot functions**.

Example:

```js
for (let i = 0; i < 100000; i++) {
  sum += i;
}
```

This loop becomes **hot code**.

---

### Step 4: Optimization (TurboFan)

Hot code is sent to **TurboFan**.

TurboFan:

- Analyzes the code.
- Makes assumptions (e.g., variable types).
- Converts it into optimized machine code.

Result:

- Much faster execution.

---

### Step 5: De-optimization (Important Interview Concept)

If assumptions break:

Example:

```js
function add(a, b) {
  return a + b;
}

add(2, 3); // numbers
add("hello", 5); // string + number
```

TurboFan assumed numbers.
But string appears → **de-optimization happens**.

Engine falls back to slower bytecode execution.

---

## Memory in V8

V8 memory is divided into:

### 1. Stack

- Stores function calls.
- Stores primitive values.
- Very fast.

### 2. Heap

- Stores objects, arrays, functions.
- Managed by **garbage collector**.

---

## Garbage Collection

V8 uses **Generational Garbage Collection**.

### Two main areas:

1. Young Generation

   - New objects.
   - Cleaned frequently.

2. Old Generation

   - Long-lived objects.
   - Cleaned less often.

---

# 2. Deep Dive: Event Loop, Call Stack, and Queues

JavaScript is:

- Single-threaded
- Non-blocking
- Asynchronous

This is possible because of the **Event Loop**.

---

## Main Components

### 1. Call Stack

- Executes functions.
- Follows **LIFO** (Last In, First Out).

Example:

```js
function a() {
  b();
}

function b() {
  console.log("Hello");
}

a();
```

Stack flow:

```
Call Stack:
a()
b()
console.log()
```

---

### 2. Web APIs (Browser)

Provided by runtime:

- setTimeout
- DOM events
- fetch
- geolocation

---

### 3. Callback Queue (Macrotask Queue)

Stores:

- setTimeout callbacks
- setInterval
- DOM events

---

### 4. Microtask Queue (Higher Priority)

Stores:

- Promise callbacks
- MutationObserver
- queueMicrotask

---

## Event Loop Working

Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Execution order:

1. Start
2. End
3. Promise
4. Timer

Why?

Because:

- Microtasks run before macrotasks.

---

## Event Loop Algorithm (Simplified)

1. Execute code in call stack.
2. When stack is empty:

   - Run all microtasks.

3. Then run one macrotask.
4. Repeat.

---

# 3. Browser vs Node.js Runtime

JavaScript engine is the same concept, but runtime differs.

---

## Browser Runtime

### Components

- JS Engine (V8, SpiderMonkey, etc.)
- Web APIs:

  - DOM
  - fetch
  - setTimeout

- Event loop
- Rendering engine

---

## Node.js Runtime

Node.js uses:

- V8 engine
- libuv library

Node does **not have DOM**.

Instead, it provides:

- File system
- Networking
- Process handling

---

## Browser vs Node.js (Comparison Table)

| Feature     | Browser                | Node.js          |
| ----------- | ---------------------- | ---------------- |
| Engine      | V8, SpiderMonkey, etc. | V8               |
| DOM         | Yes                    | No               |
| File System | No                     | Yes              |
| Web APIs    | Yes                    | No               |
| Event Loop  | Browser event loop     | libuv event loop |
| Use case    | Frontend               | Backend          |

---

# 4. Advanced Interview Concepts

## 1. Why is JavaScript single-threaded?

- Simpler concurrency model.
- Prevents race conditions in DOM manipulation.

---

## 2. What is non-blocking I/O?

Instead of waiting:

Bad (blocking):

```
readFile()
(wait…)
```

Good (non-blocking):

```
readFile(callback)
(continue execution)
```

---

## 3. What is the difference between microtask and macrotask?

| Microtask      | Macrotask             |
| -------------- | --------------------- |
| Promise.then   | setTimeout            |
| queueMicrotask | setInterval           |
| Runs first     | Runs after microtasks |

---

## 4. What is JIT?

Just-In-Time compilation:

- Compiles code during execution.
- Improves performance.

---

## 5. What causes de-optimization?

- Changing variable types.
- Hidden class changes.
- Dynamic property addition.

Example:

```js
let obj = {};
obj.a = 1;
obj.b = 2;
```

Later:

```js
obj.c = "text";
```

Shape changes → de-optimization.

---

# Final Interview Summary (1-minute answer)

“JavaScript code is executed by a JavaScript engine like V8. The engine parses the code into an AST, converts it into bytecode using an interpreter, and then optimizes frequently used code using a JIT compiler. The runtime environment, such as the browser or Node.js, provides additional APIs and an event loop. The event loop manages asynchronous operations using the call stack, microtask queue, and macrotask queue.”

---
