function x(){
    var i = 1;
    setTimeout(function(){
        console.log(i)
    },3000);
    // js don't wast for non
    console.log("Namaste JavaScript ")
}
x();

//Q - 2
function y(){
    for(var i=1; i<10; i++){
        setTimeout(()=>{
            console.log(i)
        },i*3000);
    }
    console.log("Namsaste JavaScript")
}
// this work this beacouse of closure 
// a funtion alogn with its laxical environemnt . 
    // here settimeout wait time 3 sec to run first phas untile all work and and i reach 10 
    // also for each loop setTimeout store and also remember  its reference of i ..> 

y();

// how to fix --> only useing let so it create block scope 

function yy(){
    for(let i=0; i<10; i++){
        setTimeout(()=>{
            console.log(i)
        },i*3000);
    }
    console.log("Fix for loop closure problem ")
}
yy() // each i refence to its own scope 

// other way to fix it 
function withOutLet(){
    for(var i=0; i<=5; i++){
        function close(){
            setTimeout(()=>{
                console.log(i);
            },i*3000);
        };
        close(i);
    }
    console.log("Without let fix problem")
}
withOutLet();