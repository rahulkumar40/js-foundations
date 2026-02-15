Here is a **visual representation of JavaScript execution phases** (only the execution context, memory phase, and code phase — not the event loop).

---

## JavaScript Execution Context – Two Phases

![Image](https://binovarghese.com/img/2022/execution-context-1.jpg)

![Image](https://media.licdn.com/dms/image/v2/D4E12AQEaJ3m0YqcBaA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689691669450?e=2147483647\&t=TrO-9cZuwx9_K4neQJpNjqZJza8gHyylEhLU3wpW3qU\&v=beta)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Feiz3o1fe8lx4okxtmi27.gif)

![Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1761988425883/33792916-eee7-4f87-b365-51a04290aa96.png)

---

## How to Read This Diagram (Step-by-Step)

### Step 1: Code Enters JS Engine

Example code:

```javascript
var a = 10;
function test() {
  console.log("Hello");
}
console.log(a);
```

---

## Step 2: Global Execution Context Created

The engine creates a container called:

```
Global Execution Context
```

Inside it, there are **two main parts**:

### 1. Memory Component (Creation Phase)

Stores:

* Variables
* Functions

### What happens here:

```
a → undefined
test → function definition
```

No code runs yet.

---

### 2. Code Component (Execution Phase)

Now code runs line by line.

#### Step-by-step:

```
var a = 10
```

Memory update:

```
a: undefined → 10
```

Next:

```
console.log(a)
```

Output:

```
10
```

---

## Simple Mental Model (Very Important)

Think of the execution context like a **room with two sections**:

### Left side → Memory phase

* Space is reserved for variables and functions.

### Right side → Code phase

* Actual code runs step by step.

```
---------------------------------
|  Memory Phase | Code Phase    |
|---------------|---------------|
| a: undefined  | var a = 10    |
| test: func    | console.log(a)|
---------------------------------
```

---

## Function Call Visualization

Example:

```javascript
function add(x, y) {
  return x + y;
}

add(2, 3);
```

### When function is called:

A **new execution context** is created.

```
Call Stack:

[ add Execution Context ]
[ Global Execution Context ]
```

Inside `add`:

Memory phase:

```
x: undefined
y: undefined
```

Code phase:

```
x = 2
y = 3
return 5
```

Then function context is removed.

---

## One-Line Core Idea

**Every execution context runs in two steps:**

1. Memory creation phase (hoisting).
2. Code execution phase (line-by-line execution).

---

