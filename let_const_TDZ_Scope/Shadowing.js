let x = 10;

function test() {
  let x = 20; // shadows outer x
  console.log(x);
}

test();        // 20
console.log(x); // 10


let a = 5;

{
  let a = 15; // shadows outer a
  console.log(a); // 15
}

console.log(a); // 5
