function x (){
    var a = 7;
    function y(){
        console.log(a);
    }
    y();
}
x();
//

// 
function k (){
    var a = 7;
    function m(){
        console.log(a);
    }
    return m ;
    // return function m(){
    //     console.log(a);
    // } same as same but different formate 
}
var ans = k();
console.log(ans)
//

/// 1000 line 
// here a remember m function remembber a 
// so when a funtion do closure means its remember its all laxical environment function and its own scope also --> together and bind ....
ans();


// Tricky Interview GoCha 1
function trickA(){
    var a = 9;
    function k(){
        console.log(a);
    }
    a = 1092;
    return k;
}
var trickAns = trickA();
console.log(trickAns)// child function store 
console.log(trickA) // parent fucntion called 
trickAns(); // child called through variable 

// more tricky 
function l(){
    var b = 900;
    function trickA(){
    var a = 9;
    function k(){
        console.log(a,b);
    }
    a = 1092;
    return k;
}
}
