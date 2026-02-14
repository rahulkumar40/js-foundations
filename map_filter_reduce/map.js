// map funtion are used to transform value of array 
const arr = [5,1,3,2,6];

// duble - [10, 2, 6, 4, 12]

// each and every value double its indivual value so this is tranform done 

// function pass -> it twll what we want to do with this array 
// it will run the function on each value of array
// 2nd step  
function duble(x){
    return x*2;
}

// 1st step 
const output = arr.map(duble);
console.log(output) // done working 

//4th step 
function tribple(x){
    return 3*x
}

// 3rd step : get triple of each element 
const output1 = arr.map(tribple);
console.log(output1) // done 

// 5th step : get binary of array element 
function binary(x){
    return x.toString(2);
}
const output2 = arr.map(binary);
console.log(output2)


const outputReal= arr.map(function binary(x){
    return x.toString(2);
})

console.log(outputReal)

const outputR = arr.map(x=>x*10);
console.log(outputR);
