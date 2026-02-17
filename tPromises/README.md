# 1. What is a Promise

A **Promise** is a JavaScript object that handles **asynchronous operations**.

It represents the **future result** of an operation.

A promise has two main things:

- **State**
- **Result (data)**

---

![alt text](image.png)

> A Promise always starts in the pending state.

- It can then move to only one of the two states:

- Fulfilled → operation successful

- Rejected → operation failed

> Important rule:
> \*Once a promise is fulfilled or rejected, its state cannot change again.

---

## 2. Default State of a Promise

When a promise is created, it looks like this internally:

```
Promise {
   state: "pending",
   result: undefined
}
```

### Promise States

1. **Pending** → Initial state (waiting for result)
2. **Fulfilled** → Operation successful
3. **Rejected** → Operation failed

---

## 3. Your Example (Corrected Explanation)

```js
const cart = ["shoes", "pants", "kurta"];
```

User wants to:

1. Create order
2. Then proceed to payment

---

## 4. Problem with Callback Approach

```js
createOrder(cart, function (orderId) {
  proceedToPayment(orderId);
});
```

### Why this is a problem

- `createOrder` takes time (API call)
- `proceedToPayment` also takes time
- If we keep nesting callbacks, code becomes messy

This leads to:

```
Callback Hell
Pyramid of Doom
```

Example:

```js
createOrder(cart, function (orderId) {
  proceedToPayment(orderId, function () {
    showSummary(function () {
      updateWallet();
    });
  });
});
```

Hard to read, debug, and maintain.

---

## 5. Promise-Based Approach (Your Main Idea)

```js
const promise = createOrder(cart);
```

### What happens internally

Immediately after this line:

```
promise = {
   state: "pending",
   result: undefined
}
```

After some time (API response comes):

```
promise = {
   state: "fulfilled",
   result: orderId
}
```

JavaScript automatically updates the promise.

---

## 6. Handling the Promise

```js
promise.then(function (orderId) {
  proceedToPayment(orderId);
});
```

### What `.then()` does

- It waits for the promise to be fulfilled.
- When result comes, it executes the function.

So:

1. Order created
2. Promise fulfilled
3. `.then()` runs
4. Payment starts

This ensures:

- Correct execution order
- No timing issues
- Cleaner code

---

## 7. Why Promises Are Better

Promises:

- Avoid callback hell
- Improve readability
- Handle errors better
- Provide chaining
- Work with async/await

---

## 8. Real Flow of Your Example

### Step-by-step execution

```js
const promise = createOrder(cart);
```

State:

```
pending
```

After API response:

```
fulfilled → orderId
```

Then:

```js
promise.then(function (orderId) {
  proceedToPayment(orderId);
});
```

Payment starts only after order creation.

---

## 9. Full Example (Correct Implementation)

### createOrder function

```js
function createOrder(cart) {
  return new Promise(function (resolve, reject) {
    if (!cart.length) {
      reject("Cart is empty");
    }

    setTimeout(() => {
      const orderId = "12345";
      resolve(orderId);
    }, 2000);
  });
}
```

### Using the promise

```js
createOrder(cart)
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .catch(function (err) {
    console.log(err);
  });
```

---

## 10. Most Important Concept (Interview Point)

A promise is:

> A container for a future value.

You don’t control when it finishes, but you control **what happens after it finishes**.

---

## 11. Your Concept — Corrected Summary

Your original idea, but corrected:

> A promise handles asynchronous execution in JavaScript.
> It is an object that represents the future result of an operation.
> Initially, it is in the **pending state** with an **undefined result**.
> After the asynchronous operation completes, the promise becomes either:
>
> - **fulfilled** with a value, or
> - **rejected** with an error.
>
> Using `.then()`, we can handle the result once the promise is fulfilled.
> This avoids callback hell and makes the code cleaner and more reliable.

---
