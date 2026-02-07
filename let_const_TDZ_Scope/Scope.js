// Block Scope 
let a=10000000;
{
    let a = 10;
    console.log(a)
}

// console.log(a) // Reference error -> a is not define > 

for(let i=0; i<10; i++){
   console.log("Love You ",i);
}

function show(){
    let a = 100;
    console.log(a);
}

console.log("This is function Called ")
show();