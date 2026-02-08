// encapsulation with closure 
// var count = 0;
// advantage of closure 
// yse closore is very important in js 
// like compiler design , currying 
//it is used in data hidding and encapsulation 
// like we have to data we want to hide so other fucntion or part of program cann't access it 
// suppose i have to create a counter 
var countt =0;
function incrementCounter(){
    countt++;
}// here any body can access our counter so to prevent from visible to all we use closure 

// increment();
function counter(){
    var count = 0;
    function increment(){
        count++;
        console.log(count);
    }
    
    return increment;
}
// if anyone want to access count 
// console.log(count);

var counter1 = counter();
counter1()
counter1();

// like this way data hidding acheave here 
var counter2 = counter(); // this is purely new counter , this will not toach above code any way 
// this will make new closur 
// this make a new counter inplace 
counter2();
// output 1 
// so here it start with counter 0 ; 

// it is scable for incremtn and decremtn 
// no , we can achieve by constructor 
function Counter(){
    let count =0;
    this.incrementCounter = function (){
        count++;
        console.log(count)
    }
    this.decrementCounter =function (){
        count--;
        console.log(count)
    }
}

// let count1 = Counter();
let count1 =new  Counter();
count1.incrementCounter();

// disadvantage of closure 
// if it is properly handle then i may cause the memory accesse use 
// or memory leak 
// Garbage collector -->  
// a program in js or brower which prize the leak memory means which don't use long tiem then it deleter that memory 