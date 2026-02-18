const cart = ["shoes","pants","kurta"];
const promise = createOrder(cart); // orderId

promise.then(function(ordeerId){
    console.log(ordeerId)
})

// producer 
function createOrder(cart){
    const pr = new Promise(function(resolve,reject){
        // create order
        // validateCart 
        // orderId
        if(!validateCart(cart)){
            const err = new Error("Cart is not valid");
            reject(err)
        }

        // logijc for createOrder
        const orderId = "234432";
        if(orderId){
            resolve(orderId)
        }
    })
    return pr;
}

function validateCart(cart){
    return true;
}