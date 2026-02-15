// what is a callback function in javascript 
function x(y){
console.log("x")
y();
}
x(function y(){
    console.log("y")
})

// callback within setTimeout 
setTimeout(function(){
    console.log("Timer ")
}, 5000)

// call back function which will exceuted after 5 sec 

// function (){console.log("Timer ")} is callback function which pass as a argument 
// it save inside setTimeout and when its set time complement then it execute the function which get as param  

// one callstack or main thread 
// so any function block this call stack known as blocking main threat 

// fix use time as u use settime out 