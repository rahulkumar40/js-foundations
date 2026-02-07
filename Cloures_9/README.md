# Closure
> In JavaScript, a Closure is the combination of a function bundled together with references to its surrounding state (its Lexical Environment). 
* **To put it simply**: A function always remembers its birth place. Even if you run that function in a different part of your code, it still has access to the variables that were in its scope when it was created. 
*  **The Core Concept** : <br>
When a function is returned from another function, it doesn't just return the code; it returns a "backpack" containing all the variables it had access to at that moment. 
```javascript
function outer() {
    let count = 0;
    function inner() {
        count++;
        console.log(count);
    }
    return inner;
}

const counter = outer(); 
counter(); // 1
counter(); // 2
```


> In this example, outer() has finished executing and its execution context is gone from the Call Stack. However, inner still "remembers" the variable count because of the Closure. 
---
> Why do we need Closures? (Interview Perspective)
* In an interview, explain that closures solve these specific problems:
* Data Privacy / Encapsulation: You can create "private" variables that cannot be accessed or modified from the outside world MDN Web Docs.
* Function Factories: You can create functions that are customized with specific data (e.g., a function that adds 5, and another that adds 10).
Maintaining State: As seen in the counter example, it allows a function to "persist" information without using global variables. 
3. Closure vs. Scope Chain
Scope Chain is the rulebook (how to find variables).
Closure is the result (the function hanging onto those variables after the parent is gone). 
4. Memory Warning
While powerful, closures can lead to Memory Leaks if not handled carefully. Because the inner function holds a reference to the outer variables, those variables cannot be Garbage Collected as long as the inner function exists GeeksforGeeks. 
Interview "Pro" Tip:
If asked "What is a closure?", your first sentence should be:
"A closure is a function along with its lexical environment."

# The Interview Trap: 
## The Loop Problem
### Question: What will this code print?
``` javascript
function timer() {
    for (var i = 1; i <= 3; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
}
timer();
```

* The Expected Answer (The Mistake): Most people think it prints 1, 2, 3.
* The Real Answer: It prints 4, 4, 4.
### Why does this happen?
* **Closure + Reference:** The setTimeout function creates a closure. It doesn't store the value of i; it stores a reference to the variable i.
* **No Block Scope:** Because var is not block-scoped, there is only one i in memory for the entire loop.
* **Timing:** By the time the first setTimeout runs (after 1 second), the loop has already finished, and the single i in memory has become 4.
---
* The Solution 1: Use let (The Modern Way)
If you change var to let, it prints 1, 2, 3.
Why? let is block-scoped. 
* Every time the loop runs, it creates a new memory location for i. Each closure "grabs" its own unique version of i.
* The Solution 2: Use another Closure (The Old Way)
Before let existed, we solved this by wrapping setTimeout in another function to manually capture the value:

---

```javascript
for (var i = 1; i <= 3; i++) {
    function close(x) {
        setTimeout(function() {
            console.log(x);
        }, x * 1000);
    }
    close(i); // We "snap" a photo of the current i and pass it in as x
} 
```

> * Closure: Stores a reference to the outer variable.
> * The Trap: If that variable changes before the closure runs (like in a var loop), the closure sees the final value.
> * The Fix: Use let to create a new lexical environment for every iteration of the loop.
