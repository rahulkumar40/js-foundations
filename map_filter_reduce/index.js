// ==========================================
// JavaScript Array Methods Deep Dive
// map() vs filter() vs forEach()
// ==========================================

// ------------------------------------------
// 1. Basic map() example
// ------------------------------------------
console.log("1. Basic map()");
const nums1 = [1, 2, 3, 4];
const doubled = nums1.map(num => num * 2);
console.log(doubled); // [2,4,6,8]


// ------------------------------------------
// 2. Basic filter() example
// ------------------------------------------
console.log("\n2. Basic filter()");
const nums2 = [1, 2, 3, 4];
const even = nums2.filter(num => num % 2 === 0);
console.log(even); // [2,4]


// ------------------------------------------
// 3. Real-world API example
// ------------------------------------------
console.log("\n3. API data example");
const users = [
  { id: 1, name: "Rahul", active: true },
  { id: 2, name: "Aman", active: false }
];

const names = users.map(u => u.name);
console.log(names); // ["Rahul", "Aman"]

const activeUsers = users.filter(u => u.active);
console.log(activeUsers);
// [{ id:1, name:"Rahul", active:true }]


// ------------------------------------------
// 4. Combined map() + filter()
// ------------------------------------------
console.log("\n4. Combined map + filter");
const products = [
  { name: "Phone", price: 12000 },
  { name: "Laptop", price: 60000 },
  { name: "Pen", price: 20 }
];

const expensiveProductNames = products
  .filter(p => p.price > 1000)
  .map(p => p.name.toUpperCase());

console.log(expensiveProductNames);
// ["PHONE", "LAPTOP"]


// ------------------------------------------
// 5. map() without return
// ------------------------------------------
console.log("\n5. map() without return");
const nums3 = [1, 2, 3];
const mapNoReturn = nums3.map(num => {
  console.log(num * 2);
});
console.log(mapNoReturn);
// [undefined, undefined, undefined]


// ------------------------------------------
// 6. filter() without return
// ------------------------------------------
console.log("\n6. filter() without return");
const filterNoReturn = nums3.filter(num => {
  console.log(num);
});
console.log(filterNoReturn);
// []


// ------------------------------------------
// 7. forEach() return behavior
// ------------------------------------------
console.log("\n7. forEach() return value");
const forEachResult = nums3.forEach(num => num * 2);
console.log(forEachResult);
// undefined


// ------------------------------------------
// 8. map() returning boolean
// ------------------------------------------
console.log("\n8. map() returning boolean");
const boolMap = [1, 2, 3, 4].map(num => num > 2);
console.log(boolMap);
// [false, false, true, true]


// ------------------------------------------
// 9. filter() returning value
// ------------------------------------------
console.log("\n9. filter() returning truthy values");
const truthyFilter = [1, 2, 0].filter(num => num);
console.log(truthyFilter);
// [1,2]


// ------------------------------------------
// 10. map() + filter() but missing return
// ------------------------------------------
console.log("\n10. map() after filter but missing return");
const nums4 = [1, 2, 3];

const wrongMap = nums4
  .filter(num => num > 1)
  .map(num => { num * 2 }); // missing return

console.log(wrongMap);
// [undefined, undefined]

// Correct version
const correctMap = nums4
  .filter(num => num > 1)
  .map(num => num * 2);

console.log(correctMap);
// [4,6]


// ------------------------------------------
// 11. Conditional logic in map()
// ------------------------------------------
console.log("\n11. Conditional map without else");
const arr = [1, 2, 3, 4, 5];

const conditionalWrong = arr.map(num => {
  if (num % 2 === 0) {
    return num * 10;
  }
});
console.log(conditionalWrong);
// [undefined, 20, undefined, 40, undefined]


// Correct version
console.log("\nCorrect conditional map");
const conditionalCorrect = arr.map(num =>
  num % 2 === 0 ? num * 10 : num
);
console.log(conditionalCorrect);
// [1,20,3,40,5]


// ------------------------------------------
// 12. Filter even then multiply
// ------------------------------------------
console.log("\n12. Filter even then multiply");
const evenTimes10 = arr
  .filter(num => num % 2 === 0)
  .map(num => num * 10);

console.log(evenTimes10);
// [20,40]


// ------------------------------------------
// END OF FILE
// ------------------------------------------
console.log("\nAll examples executed.");
