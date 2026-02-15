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
