# setTimeout Trust ISSUE 


### Corrected code example

```js
console.log("start");

setTimeout(function () {
  console.log("callback");
}, 5000);

console.log("end");

// assume heavy code here taking 10 seconds
```
> This is a classic "Event Loop" interview scenario! It perfectly demonstrates why JavaScript is called asynchronous and non-blocking.
---
> Even though you have "millions of lines of code" taking 10 seconds, the sequence of events is very specific because of how the Call Stack and the Task Queue interact.

---

## What actually controls execution?

JavaScript execution is controlled by **three main components**:

1. **Call Stack** – where functions are executed
2. **Web APIs** (Browser/Node timers, fetch, etc.)
3. **Event Loop + Task Queue**

---

## Step-by-step execution timeline

### 1. `console.log("start")`

* Goes to **Call Stack**
* Executes immediately
  **Output:** `start`

---

### 2. `setTimeout(..., 5000)`

* Timer is **not** handled by JavaScript itself.
* It is given to the **Web API** (browser timer).
* The call stack becomes free again.

---

### 3. `console.log("end")`

* Executes immediately
  **Output:**

```
start
end
```

---

### 4. Heavy synchronous code starts (10 seconds)

* Runs on the **main thread**
* Call stack is **busy**
* JavaScript cannot do anything else during this time

---

### 5. Timer finishes at 5 seconds

* Web API moves the callback into the **Task Queue**
* But it **cannot execute yet** because the call stack is busy

---

### 6. Heavy code ends at 10 seconds

* Call stack becomes empty
* Event Loop checks the queue
* Pushes callback to stack

**Output:**

```
callback
```

---

## Final output order

```
start
end
(10 second pause)
callback
```

---

## Key concept to remember (interview answer)

### “setTimeout delay is a minimum delay, not exact”

The callback runs:

```
after delay time
AND
when call stack becomes empty
```

So the real time becomes:

```
max(delay time, time when stack is free)
```

---

## Why JavaScript behaves this way

Because JavaScript is:

* **Single-threaded**
* Uses **run-to-completion**
* Never interrupts running code

---

## How to prevent blocking

If you have heavy code:

### Option 1: Break it into chunks

```js
function heavyTask() {
  for (let i = 0; i < 1000000; i++) {
    // some work
  }
  setTimeout(heavyTask, 0);
}
heavyTask();
```

### Option 2: Use Web Workers (best for heavy tasks)

Runs code on a separate thread.

---

## Simple interview one-line explanation

> JavaScript uses an event loop where asynchronous callbacks execute only after the call stack becomes empty, so synchronous code always finishes first.

---

```javascript 
console.log("start");

setTimeout(function () {
  console.log("callback");
}, 0);

console.log("end");
```
> Even with 0 seconds, the result is exactly the same: your callback will still wait for the "millions of lines of code" to finish. 
---
> Here is why setTimeout(fn, 0) is not actually "immediate":
* 1. The "End of the Line" Rule
* When you call setTimeout(fn, 0), the engine doesn't run the code now. It just puts a "message" at the very end of the Task Queue. 
* Step 1: The engine sees setTimeout(0).
* Step 2: It immediately tells the Browser/Runtime, "Hey, this timer is already done. Put the callback in the queue."
* Step 3: The engine continues executing the current script (your 10-second block of code).
* Step 4: Only after the current script is completely finished and the Call Stack is empty does the Event Loop check the queue and run your callback. 
> 2. The 4ms Minimum
> In most browsers, if you nest multiple timers, they enforce a minimum delay of 4 milliseconds for historical performance reasons. So 0ms often technically becomes 4ms behind the scenes, though the "waiting for the stack to clear" rule is the much bigger factor in your case. 
* Comparison: 5 sec vs. 0 sec
Scenario 	Script Length	Callback Wait Time
5 sec delay	10 sec script	10 seconds (The 5s finishes while the script is still running).
0 sec delay	10 sec script	10 seconds (The 0s finishes instantly, but must wait for the script to end).
> Why use 0ms then?
Developers use setTimeout(fn, 0) as a "deferral" trick. It allows you to: 
Unblock the UI: Let the browser "breathe" and update the screen (render) before running the next task.
Wait for the DOM: Ensure a piece of code runs only after the browser has finished processing the current HTML/CSS updates. 
Do you want to know about Promises? They use a different queue (the Microtask Queue) and actually run before setTimeout(0)