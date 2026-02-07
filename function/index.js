// how function work in js 
var x=10;
a();
console.log(a()) // whole body printed here fucntion a() -> print 100 but its won preint undefined 
console.log(a) // 
b();
console.log(x)
function a(){
    var x = 100;
    console.log(x)
}
function b(){
    var x =1000;
    console.log(x)
}