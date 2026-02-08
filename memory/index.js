function b(){
    var v=0;
    var z=0;
    function k(){
        console.log(v)
    }
    return k;
}
var y = b();
y();

// there are smartly garbage collector which manage memory very smartly 
// it think which one to leave or remove or freez . 