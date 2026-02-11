console.log("Start")

document.getElementById("btn").addEventListener("click",function cb(){
    console.log("CallBack")
});
// callback register cb() inside webapi and also attach envent listener , 
// web api environment 
    // stay unitl close browser or remove . 

// fech data 
// why we need callback queue
/* 
---------
cb() | cb() | cb() | cb()
-------
*/
console.log("End");

// micro task  queue 
/*
- higher prority
---------
cbf() | cbf() | cbf() | cbf()
-------
// */
// starwation