console.log(num)
console.log(multiply(num))
multiply(num);
var num = 49;
console.log("------- after variable declaration")
const k = multiply(num);
console.log(k)

function multiply(num){
    // console.log(num)
    return num*num;
}
console.log("-----after function multiply declaration")
const ans = multiply(num)
console.log(ans)