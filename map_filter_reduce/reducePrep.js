
const user =[
    {firstName:"Rahul",lastName:"kumar",age:23},
    {firstName:"Rohan",lastName:"kumar",age:23},
    {firstName:"Ramu",lastName:"kumar",age:23},
]

// list of full names 
// 
const fullName = user.map((user)=>(
     user.firstName + " " +user.lastName
))
console.log(fullName)