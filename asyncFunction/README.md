# ASYNC Function 
In JavaScript, **`async`** is used to define an **asynchronous function**—a function that works with operations that take time (like API calls, database queries, timers, etc.) without blocking the rest of the code.

---

## 🔹 What is `async`?

When you write a function with `async`, it **automatically returns a Promise**.

```javascript
async function greet() {
  return "Hello";
}

greet().then(console.log); // Hello
```

👉 Even though you're returning a string, JS wraps it inside a Promise.

---

## 🔹 Why use `async`?

Before `async`, we used:

* Callbacks ❌ (messy)
* `.then()` chains ❌ (hard to read)

With `async`, we get **clean and readable code using `await`**.

---

## 🔹 `async` + `await`

`await` can only be used inside an `async` function.

```javascript
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function fetchData() {
  console.log("Fetching...");

  const result = await getData(); // waits here
  console.log(result);

  console.log("Done");
}

fetchData();
```

### 🧠 Flow:

1. "Fetching..." prints
2. waits 2 seconds
3. "Data received"
4. "Done"

---

## 🔹 Error Handling with `async`

Use `try...catch`

```javascript
async function fetchData() {
  try {
    let res = await fetch("https://api.example.com/data");
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

---

## 🔹 Real-world Example (API)

```javascript
async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    console.log(users);
  } catch (err) {
    console.log("Failed to fetch users");
  }
}

getUsers();
```

---

## 🔹 Key Points

* `async` → makes a function return a Promise
* `await` → pauses execution until Promise resolves
* Cleaner than `.then()`
* Works best for API calls, DB, file handling

---

## 🔹 Interview Tip ⚡

👉 **Question:** What happens if you return a value from async function?
👉 **Answer:** It automatically becomes a resolved Promise.

---

