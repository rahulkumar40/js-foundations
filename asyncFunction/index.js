
// console.log("Me hu")
// async function getData() {
//     setTimeout(()=>{
//         console.log("I am inside set timeout block")
//     }, 3000)
// }
// getData()
// console.log("key kr rah hai")


// async function always return a promiss 
async function getData(){
    // return promise or 
    // return any_value 
    return 'Namaste'

    // what this will done by js engine 
    // this value wrapped into a promise and return further by this async function 
    // automaticaly converted by js to promise 
}

const data = getData();
console.log(data)

// async and await are used to handle promises . 


// how promise and async await work 

const p = new Promise((resolve,reject)=>{
    resolve("Promise Resolved value ")
})

// await can only be used inside an async function 
async function handlePromise() {
    const val = await p;
    console.log(val);
}
// function getDataa(){
//     p.then(res)=console.log((res));
// }
// getDataa()