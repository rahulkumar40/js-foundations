#  Destructuring 
> Destructuring is a Javascript expression introduced in ES6 that allow us to "unpack" value from array or properties from object into distinct variables. 

* it provides a concise way to extract data without modifying the origin structure. 

* It can be used in locations that receive data (such as the left-hand side of an assignment or anywhere that creates new identifier bindings).
``` js
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// Expected output: 10

console.log(b);
// Expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// Expected output: Array [30, 40, 50]


```
---- 

## Array Destructuring 
> Use square breakets [] to extract values based on their index position. 
------ 
* **Basic Assignment:** const [first, second] = ["red", "blue"];.
* **Skipping Values:** Use commas to skip unwanted elements: const [a, , c] = [1, 2, 3]; (skips 2).
* **Rest Syntax:** Gather all remaining elements into a new array: const [head, ...tail] = [1, 2, 3, 4];.
* **Variable Swapping:** Swap two variables in one line without a temporary variable: [a, b] = [b, a];. 
 
 ```js Example 

 const foo = ["one", "two", "three"];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

### Destructuring with more elements than the source
----
In an array destructuring from an array of length N specified on the right-hand side of the assignment, if the number of variables specified on the left-hand side of the assignment is greater than N, only the first N variables are assigned values. The values of the remaining variables will be undefined.
``` js 
const foo = ["one", "two"];

const [red, yellow, green, blue] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // undefined
console.log(blue); // undefined
``` 
--- 
### Swapping variables
* Two variables values can be swapped in one destructuring expression.

* Without destructuring, swapping two values requires a temporary variable or xor 
```js 
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1, 3, 2]
```