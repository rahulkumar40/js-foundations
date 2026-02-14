
const user =[
    {firstName:"Rahul",lastName:"kumar",age:23},
    {firstName:"Rohan",lastName:"kumar",age:25},
    {firstName:"Ramu",lastName:"kumar",age:23},
    {firstName:"Ronit",lastName:"J",age:24},
]

// list of full names 
// 
const fullName = user.map((user)=>(
     user.firstName + " " +user.lastName
))
console.log(fullName)

// find how may user has particular age 
const resultParticularAge = user.reduce(function(acc,curr){
    if(acc[curr.age]){
        acc[curr.age]=++acc[curr.age];
    }else {
        acc[curr.age]=1;
    }
    return acc;
},{});
console.log(resultParticularAge)