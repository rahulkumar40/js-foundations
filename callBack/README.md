
## What is a Callback Function?

A **callback function** is a function that is **passed as an argument to another function** and is **executed later**.

In simple words:

> A callback is a function that is called **after another function finishes its work**.

---

## Example 1: Basic Callback

```js
function x(y) {
    console.log("x");
    y(); // calling the callback
}

x(function y() {
    console.log("y");
});
```

### Execution

1. Function `x` is called.
2. `x` prints `"x"`.
3. Then it calls function `y`.
4. `y` prints `"y"`.

### Output

```
x
y
```

Here:

* Function `y` is passed as an argument to `x`.
* So `y` is the **callback function**.

---

## Example 2: Callback with `setTimeout`

```js
setTimeout(function () {
    console.log("Timer");
}, 5000);
```

### What happens here?

1. `setTimeout` is called.
2. It receives:

   * A function → callback
   * Time → 5000 ms
3. JavaScript **waits 5 seconds**.
4. Then it executes the callback function.

### Output after 5 seconds

```
Timer
```

So this part:

```js
function () {
    console.log("Timer");
}
```

is the **callback function**.

---

## Interview Definition (Best Answer)

> A callback function is a function passed as an argument to another function, which is executed later after a specific task or event is completed.

---

## Why Callbacks are Used

Callbacks are mainly used for:

* Asynchronous operations
* Event handling
* API calls
* Timers

Example:

```js
button.addEventListener("click", function () {
    console.log("Button clicked");
});
```

Here the function is executed **when the button is clicked**, so it is a callback.

---

If you want, I can next explain:

* **Synchronous vs Asynchronous callbacks**
* **Callback hell**
* How callbacks lead to **Promises and async/await** (very important for interviews).
