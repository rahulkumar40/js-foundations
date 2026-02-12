console.log("Start")

setTimeout(() => {
    console.log("CallBack")
}, 5000);

console.log("End")

// million 

let startDate = new Date().getTime();
let endDate = startDate;
while(endDate<startDate+10000){
    endDate=new Date().getTime();
}
console.log("While expires here");


// Greate quetion 
