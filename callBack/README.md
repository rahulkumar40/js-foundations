
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



important keywords:

* callback hell
* pyramid of doom
* inversion of control
* losing control while executing callback

Let’s learn this **from absolute zero → interview-ready level** in a simple way.

---

# 1. What is a Callback? (Start from zero)

A **callback** is simply:

> A function passed as an argument to another function,
> which will be executed later.

### Simple example

```js
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Rahul", sayBye);
```

### Output

```
Hello Rahul
Goodbye!
```

Here:

* `sayBye` is a **callback function**
* It is passed into `greet`

---

# 2. Why callbacks are needed (Async concept)

JavaScript is **single-threaded**.

So when we do tasks like:

* API calls
* Database queries
* File reading
* Timers

We don’t want the program to stop.

So we use **callbacks**.

---

### Example: Asynchronous code

```js
console.log("Start");

setTimeout(function () {
    console.log("Callback executed");
}, 2000);

console.log("End");
```

### Output

```
Start
End
Callback executed
```

The function inside `setTimeout` is a **callback**.

---

# 3. Real-world example (Your shopping code)

```js
const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
    api.proceedToPayment(function () {
        api.showOrderSummary();
    });
});
```

### Logical steps

1. Create order
2. After order → proceed to payment
3. After payment → show summary

---

# 4. Callback Hell

When callbacks are **nested inside callbacks**, code becomes messy.

### Example

```js
login(function () {
    getUserData(function () {
        getOrders(function () {
            getPayment(function () {
                showSummary();
            });
        });
    });
});
```

This structure looks like a **triangle**.

So it is called:

## Pyramid of Doom

```
login(
   getUserData(
      getOrders(
         getPayment(
            showSummary()
         )
      )
   )
)
```

---

# 5. Problems with Callbacks

## 1. Callback Hell (Readability issue)

Code becomes:

* Hard to read
* Hard to maintain
* Hard to debug

---

## 2. Inversion of Control (Major problem)

This is the **most important interview concept**.

### What does it mean?

You **lose control** of your program.

You give control to another function.

---

### Example

```js
api.createOrder(cart, function () {
    api.proceedToPayment();
});
```

Here:

* You are giving your callback to `api.createOrder`
* Now **you don’t know**:

  * When it will call the callback
  * How many times it will call
  * Whether it will call or not

This is called:

> **Inversion of Control**
> You lose control over your own function.

---

### Real-life example

Imagine:

You give money to a stranger and say:

> “Buy groceries for me and come back.”

But:

* You don’t know when he’ll return
* Whether he’ll return
* Whether he’ll buy the right items

That’s **inversion of control**.

---

## 3. Problem of multiple or missing callbacks

Example:

```js
api.createOrder(cart, function () {
    api.proceedToPayment();
});
```

What if:

* Callback is called **twice** → double payment
* Callback is **never called** → no payment

You have **no guarantee**.

---

# 6. Summary of callback problems

| Problem                 | Meaning                       |
| ----------------------- | ----------------------------- |
| Callback Hell           | Nested callbacks, messy code  |
| Pyramid of Doom         | Triangle-shaped nested code   |
| Inversion of Control    | Losing control over execution |
| Multiple callback issue | Called more than once         |
| Missing callback issue  | Never called                  |

---

# 7. How JavaScript solved this: Promises

Promises were introduced to:

* Avoid callback hell
* Solve inversion of control
* Provide trust in async flow

---

### Same example using Promises

```js
api.createOrder(cart)
   .then(function () {
       return api.proceedToPayment();
   })
   .then(function () {
       return api.showOrderSummary();
   })
   .catch(function (err) {
       console.log(err);
   });
```

Cleaner and safer.

---

# 8. Modern version (Async/Await)

```js
async function placeOrder() {
    try {
        await api.createOrder(cart);
        await api.proceedToPayment();
        await api.showOrderSummary();
    } catch (err) {
        console.log(err);
    }
}
```

This looks like **synchronous code**, but works asynchronously.

---

# 9. Interview-level answers (Very important)

### Q: What is callback hell?

> Callback hell is a situation where multiple nested callbacks make the code difficult to read and maintain.

---

### Q: What is pyramid of doom?

> It is the triangular structure formed by nested callbacks, making code hard to understand.

---

### Q: What is inversion of control?

> It is a situation where we lose control over our program by giving our callback to another function, without knowing when or how it will execute.

---

### Q: How do promises solve callback problems?

> Promises provide better readability, error handling, and control over asynchronous operations, avoiding callback hell and inversion of control.

---


