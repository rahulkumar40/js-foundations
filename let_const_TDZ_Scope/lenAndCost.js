console.log("===== 1. Basic let =====");
let a = 10;
console.log(a); // 10
a = 20;
console.log(a); // 20


console.log("\n===== 2. Basic const =====");
const b = 30;
console.log(b); // 30
// b = 40; // ❌ TypeError (uncomment to test)


console.log("\n===== 3. const must be initialized =====");
// const x; // ❌ SyntaxError (uncomment to test)


console.log("\n===== 4. Block Scope =====");
{
  let c = 100;
  const d = 200;
  console.log(c); // 100
  console.log(d); // 200
}
// console.log(c); // ❌ ReferenceError
// console.log(d); // ❌ ReferenceError


console.log("\n===== 5. var vs let block scope =====");
{
  var x1 = 10;
  let y1 = 20;
}
console.log(x1); // 10
// console.log(y1); // ❌ ReferenceError


console.log("\n===== 6. TDZ with let =====");
try {
  console.log(tdzVar); // ❌ ReferenceError
  let tdzVar = 10;
} catch (err) {
  console.log("TDZ Error:", err.message);
}


console.log("\n===== 7. var hoisting =====");
console.log(varTest); // undefined
var varTest = 50;


console.log("\n===== 8. let hoisting (TDZ) =====");
try {
  console.log(letTest); // ❌ ReferenceError
  let letTest = 60;
} catch (err) {
  console.log("TDZ Error:", err.message);
}


console.log("\n===== 9. let without initialization =====");
let p;
console.log(p); // undefined
p = 70;
console.log(p); // 70


console.log("\n===== 10. const with objects =====");
const user = { name: "Rahul" };
user.name = "Amit"; // allowed
console.log(user.name); // Amit

// user = {}; // ❌ TypeError (uncomment to test)


console.log("\n===== 11. Global scope difference =====");
var globalVar = "I am var";
let globalLet = "I am let";
const globalConst = "I am const";

console.log("globalVar:", globalVar);
console.log("globalLet:", globalLet);
console.log("globalConst:", globalConst);

// In browser only:
// console.log(window.globalVar);   // exists
// console.log(window.globalLet);   // undefined
// console.log(window.globalConst); // undefined


console.log("\n===== 12. Loop with var =====");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var loop:", i), 100);
}


console.log("\n===== 13. Loop with let =====");
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let loop:", j), 100);
}


console.log("\n===== 14. Redeclaration =====");
var r = 10;
var r = 20;
console.log("var redeclared:", r); // 20

let s = 30;
// let s = 40; // ❌ SyntaxError (uncomment to test)

const t = 50;
// const t = 60; // ❌ SyntaxError (uncomment to test)
