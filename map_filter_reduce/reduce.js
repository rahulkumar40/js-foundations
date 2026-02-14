// reduce is aggrigate function which return single element 
// it work on all element of array and further operation return single output 

const arr = [5,1,2,3,6];
// sum or max 
// const output = arr.reduce()

function findSum (arr){
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum+=arr[i];
    }
    console.log(sum);
}
findSum(arr)
// findSum()
//Quick Interview Insight

//Question: What happens if you call a function without required parameters?
//Answer: The parameter becomes undefined, which may cause runtime errors if you try to access properties like .length.

// ok 
// here curr is the the each element of the array . 
// acc --> accumalator which store and processed next process 
const output1 = arr.reduce(function (acc,curr){
    acc+=curr
    return acc;
},0)
const output = arr.reduce((acc,curr)=>(
    acc+=curr
),0)
console.log(output)

const outPutMx = arr.reduce(function(acc,curr){
    curr>acc?acc=curr:acc;
    return acc;
},0)
console.log(outPutMx)
//
const user =[
    {firstName:"Rahul",lastName:"kumar",age:23},
    {firstName:"Rohan",lastName:"kumar",age:23},
    {firstName:"Rahul",lastName:"kumar",age:23},
]

