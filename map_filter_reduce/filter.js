// filter are use to filter the value only 
// it return new array which pass the condition 

const arr = [5,1,3,1,6];
function isOdd (x){
    return x%2==0;
}
// filter odd values 
const output = arr.filter(isOdd);
console.log(output)

const otp = arr.filter((x)=>{
    return x<4;
})
console.log(otp)