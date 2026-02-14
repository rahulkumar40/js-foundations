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


const users =[
    {firstName:"Rahul",lastName:"kumar",age:23},
    {firstName:"Rohan",lastName:"kumar",age:25},
    {firstName:"Ramu",lastName:"kumar",age:23},
    {firstName:"Ronit",lastName:"J",age:44},
]

// find first name those age is less then 30
const outputFirstName = users.filter(function(user){
    if(user.age<30)return user;
    
}).map(x=>x.firstName)
console.log(outputFirstName)