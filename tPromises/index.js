//1 Promises 
// it andle the async excution of javascript. 
// promises is an empty object with data value init 
// it consist default value like, its state and data : undefine 

//

const cart = ["shoes","pants","kurta"];

createOrderT(cart)// orderId reponse after creation of cart 

// createOrderT(cart) --> it a api call then it will create a promiss but we don't handle it so further we did any operation then it will crate problem like name it 



createOrder(cart,function(){
    proceedToPayment(orderId);
}) // this will create the problem 

proceedToPaymentT(orderId) // after the creation of cart the next step is doing payment 
// both createorder and proceedpayment are take long ttime to exceute 

// 

const promise = createOrder(cart);

// here js within sec create a promise with default value 
// after the 5-10 or any sec when createOrder did its work and return response then promise object filled with function reponse 
// promise automaticaly filled with newly vaoue of creaOrder 
// here below code help to handle the problem which we faced by callback or other 
// if promise has real data then it processed to next step other wise it don't work
// which increase the effiecny of code and reduce the bug or error and extra thingking 

promise.then(function(orderId){
    proceedToPayment(orderId)
})
