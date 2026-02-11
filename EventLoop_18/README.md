## What is the Event Loop? (JavaScript)

The **Event Loop** is a mechanism that allows JavaScript to perform **non-blocking, asynchronous operations** even though JavaScript is **single-threaded**.

In simple words:
**Event Loop = the system that decides which code runs next.**

---

## Core Idea (Simple Definition)

JavaScript executes code in a **single thread**.
But when it encounters **asynchronous tasks** like:

* `setTimeout`
* `fetch`
* `Promises`
* `DOM events`

It doesn’t wait for them to finish.
Instead, it sends them to the **Web APIs** and continues executing other code.

When those async tasks finish, they go into **queues**, and the **Event Loop** decides when to execute them.

---

## Main Components of the Event Loop

### 1. Call Stack

* Where JavaScript executes functions.
* Works like a **stack (LIFO)**.

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

Execution:

```
Call Stack:
a()
b()
console.log()
```

---

### 2. Web APIs (Browser/Node)

Handles async operations like:

* `setTimeout`
* `fetch`
* `DOM events`

Example:

```js
setTimeout(() => {
  console.log("Hi");
}, 1000);
```

`setTimeout` is handled by **Web APIs**, not the call stack.

---

### 3. Callback Queue (Macrotask Queue)

Stores callbacks from:

* `setTimeout`
* `setInterval`
* `DOM events`

Example:

```
setTimeout → Callback Queue
```

---

### 4. Microtask Queue

Higher priority queue.

Stores:

* `Promises (.then, .catch)`
* `queueMicrotask`
* `MutationObserver`

Microtasks always run **before** macrotasks.

---

### 5. Event Loop (The Manager)

The event loop constantly checks:

1. Is the **call stack empty**?
2. If yes:

   * Run all **microtasks first**
   * Then run one **macrotask**

---

## Execution Flow (Step-by-Step)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AzBGH7PhEVhDAPXjNlil0jw.jpeg)

![Image](https://media.licdn.com/dms/image/v2/D5612AQHIuZDc3cqPtg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1721189705579?e=2147483647\&t=7z1ivEBMlIOpeq4P2UUbbrj1T64ysIpkPv27efVvq60\&v=beta)


Flow:

1. Code goes into **Call Stack**
2. Async tasks go to **Web APIs**
3. Completed async tasks go to:

   * Microtask Queue (Promises)
   * Callback Queue (setTimeout)
4. Event Loop checks:

   * If stack is empty → run microtasks
   * Then run macrotasks

---

## Example 1: Basic Order

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

### Output

```
Start
End
Promise
Timeout
```

### Why?

1. `Start` → call stack
2. `setTimeout` → Web API → callback queue
3. `Promise` → microtask queue
4. `End` → call stack
5. Stack empty:

   * Run microtask → `Promise`
6. Then macrotask → `Timeout`

---

## Execution Priority

| Priority    | Queue                                |
| ----------- | ------------------------------------ |
| 1 (highest) | Call Stack                           |
| 2           | Microtask Queue (Promises)           |
| 3           | Macrotask Queue (setTimeout, events) |

---

## Real-Life Analogy

Think of a **restaurant kitchen**:

* Call Stack = Chef’s cooking table
* Web APIs = Assistants doing background tasks
* Microtask Queue = VIP orders
* Callback Queue = Normal orders
* Event Loop = Manager deciding next order

Manager rule:

1. Finish VIP orders first.
2. Then handle normal orders.

---

## One-Line Interview Answer

**“The event loop is a mechanism that continuously checks the call stack and task queues, and executes queued callbacks when the call stack is empty, enabling asynchronous behavior in single-threaded JavaScript.”**

---

# understand how 
> **event loop, callback queue, and microtask queue** work using this code. Let’s go step by step in a simple
---

## Your Code

```js
console.log("Start")

document.getElementById("btn").addEventListener("click", function cb() {
    console.log("CallBack")
});

console.log("End");
```

---

## Step-by-Step Execution

### Step 1: Global Execution Context

JavaScript is **single-threaded**, so it runs line by line.

#### Line 1

```js
console.log("Start")
```

Output:

```
Start
```

---

### Step 2: Event Listener Registration

```js
document.getElementById("btn")
        .addEventListener("click", function cb(){...});
```

What happens internally:

1. JS sends this work to **Web APIs** (browser environment).
2. Browser **registers the click listener**.
3. The callback function `cb()` is stored.
4. It **waits** until:

   * User clicks the button, or
   * Listener is removed.

**Important:**
This callback does **not** go to the queue immediately.
It only goes to the queue **when the click happens**.

---

### Step 3: Next Line Executes

```js
console.log("End");
```

Output:

```
End
```

---

## Current Output (before any click)

```
Start
End
```

---

## What Happens When You Click the Button?

1. Click event happens.
2. Browser pushes `cb()` into the **Callback Queue**.
3. Event Loop checks:

   * Is Call Stack empty? → Yes
4. It pushes `cb()` into the Call Stack.
5. Function executes.

Output:

```
CallBack
```

---

## Final Output After Click

```
Start
End
CallBack
```

---

# Callback Queue vs Microtask Queue

You mentioned this in your notes.

## 1. Callback Queue (Macrotask Queue)

Contains:

* setTimeout
* setInterval
* DOM events (click, scroll)
* fetch (then after resolution)

Example:

```js
setTimeout(() => console.log("Timer"), 0);
```

---

## 2. Microtask Queue (Higher Priority)

Contains:

* Promises (`.then`)
* MutationObserver
* queueMicrotask()

Example:

```js
Promise.resolve().then(() => console.log("Promise"));
```

---

## Priority Rule

Event loop always executes:

```
1. Call Stack
2. Microtask Queue (EMPTY FIRST)
3. Callback Queue
```

---

## Example Showing Priority

```js
console.log("Start");

setTimeout(() => console.log("Timer"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

### Execution Order

1. Start
2. End
3. Promise (microtask)
4. Timer (callback queue)

Output:

```
Start
End
Promise
Timer
```

---

## What is Starvation?

You wrote: `// starvation`

### Definition

**Starvation** happens when:

* Microtask queue keeps getting new tasks.
* Callback queue never gets a chance to execute.

Example:

```js
function loop() {
    Promise.resolve().then(loop);
}
loop();

setTimeout(() => console.log("Timer"), 0);
```

Here:

* Microtasks keep adding more microtasks.
* `setTimeout` never runs.
* Callback queue is **starved**.

---

## Simple Interview Definition

**Event Loop:**
A mechanism that moves tasks from queues to the call stack when it becomes empty.

**Callback Queue:**
Stores asynchronous tasks like timers and events.

**Microtask Queue:**
Stores high-priority tasks like promises.

---


# 1. Why the Event Loop Exists (Core Idea)

## Problem

JavaScript is **single-threaded**.

That means:

* It can do **only one task at a time**.
* It has only **one call stack**.

But real applications need:

* Network requests
* Timers
* User clicks
* File reading

These are **slow operations**.

If JS waited for each of them:

```js
const data = fetch("api");
console.log(data);
```

The browser would **freeze** until the network finishes.

So JavaScript needed a system where:

* It can continue executing code
* While slow tasks run in the background

That system is the **Event Loop architecture**.

---

# 2. Main Components of Event Loop System

There are **5 main parts**:

1. Call Stack
2. Web APIs
3. Callback Queue (Macrotask Queue)
4. Microtask Queue
5. Event Loop

We’ll explain each with:

* What it is
* Why it exists
* How it works

---

# 3. Call Stack

## What is it?

A **stack data structure** where JavaScript executes functions.

Works on:

```
LIFO = Last In, First Out
```

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

### Stack Flow

```
Call a()
   ↓
Call b()
   ↓
console.log()
```

---

## Why it exists

JavaScript needs a structure to:

* Track function calls
* Know where to return after execution

---

## How it works

1. Function is called → pushed to stack
2. Function finishes → removed from stack
3. Stack becomes empty → event loop checks queues

---

# 4. Web APIs (Browser Environment)

## What are Web APIs?

Features provided by the **browser**, not JavaScript itself.

Examples:

* setTimeout
* DOM events
* fetch
* Geolocation
* Console

---

## Why they exist

Because JavaScript:

* Cannot handle timers
* Cannot do network calls
* Cannot listen to clicks

So browser provides these features.

---

## How they work

Example:

```js
setTimeout(() => console.log("Timer"), 2000);
```

Steps:

1. JS sees `setTimeout`
2. Sends it to **Web API**
3. Timer starts in background
4. After 2s → callback moves to **Callback Queue**

---

# 5. Callback Queue (Macrotask Queue)

## What is it?

A queue where **asynchronous callbacks wait** before execution.

It contains:

* setTimeout
* setInterval
* DOM events
* I/O tasks

---

## Why it exists

Because:

* Call stack may be busy
* Async tasks must wait

So they line up in a **queue**.

---

## How it works

Example:

```js
setTimeout(() => console.log("A"), 0);
```

Steps:

1. Timer finishes
2. Callback goes into **Callback Queue**
3. Waits until:

   * Call stack is empty
   * Microtasks are finished
4. Event loop pushes it to stack

---

# 6. Microtask Queue

## What is it?

A **high-priority queue** for important async tasks.

Contains:

* Promise `.then()`
* queueMicrotask()
* MutationObserver

---

## Why it exists

Some tasks must run **immediately after current code**.

Example:

* Promise resolution
* DOM updates

So microtasks get **higher priority**.

---

## How it works

Example:

```js
Promise.resolve().then(() => console.log("Promise"));
```

Steps:

1. Promise resolves
2. Callback goes to **Microtask Queue**
3. When stack is empty:

   * Microtasks run first
   * Then macrotasks

---

# 7. Event Loop

## What is the Event Loop?

It is a **continuous process** that:

* Checks if the call stack is empty
* Moves tasks from queues to the stack

---

## Why it exists

Because:

* JS must manage async operations
* And still remain single-threaded

Event loop is the **traffic controller**.

---

## How it works (Real Flow)

Event loop repeats this cycle:

```
1. Execute call stack
2. If stack empty:
      Run ALL microtasks
3. Then run ONE macrotask
4. Repeat
```

---

# 8. Full Execution Example (Complete Flow)

```js
console.log("Start");

setTimeout(() => console.log("Timer"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

---

## Step-by-step

### Step 1: Global code

Stack:

```
console.log("Start")
```

Output:

```
Start
```

---

### Step 2: setTimeout

* Sent to Web API
* Timer starts

---

### Step 3: Promise

* Promise resolves immediately
* Callback goes to **Microtask Queue**

---

### Step 4: console.log("End")

Output:

```
End
```

Stack becomes empty.

---

### Step 5: Event Loop Action

Event loop checks:

1. Microtask queue → has Promise
2. Execute it

Output:

```
Promise
```

---

### Step 6: Now macrotask

Callback queue has:

```
Timer
```

Execute it:

```
Timer
```

---

## Final Output

```
Start
End
Promise
Timer
```

---

# 9. Starvation (Important Concept)

## What is starvation?

When microtasks **never finish**, so macrotasks never execute.

Example:

```js
function loop() {
  Promise.resolve().then(loop);
}
loop();

setTimeout(() => console.log("Timer"), 0);
```

What happens:

* Microtask keeps adding another microtask
* Event loop never reaches macrotask
* Timer never runs

This is called:

```
Microtask Starvation
```

---

# 10. Summary Diagram (Mental Model)

Imagine a restaurant:

* **Call Stack** = Chef cooking
* **Web APIs** = Kitchen machines
* **Microtask Queue** = VIP orders
* **Callback Queue** = Normal orders
* **Event Loop** = Waiter

Rule:

```
Chef finishes current dish
↓
Waiter gives all VIP orders
↓
Then one normal order
↓
Repeat
```

---

# 11. One-Line Definitions (Interview Gold)

**Call Stack:**
Where JS executes functions.

**Web APIs:**
Browser-provided async features.

**Callback Queue:**
Queue for timers, events, and async callbacks.

**Microtask Queue:**
High-priority queue for promises.

**Event Loop:**
Moves tasks to the call stack when it becomes empty.

---
