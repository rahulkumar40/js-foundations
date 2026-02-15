const art = ["shoes","pants","kurta"];

api.createOrder(CaretPosition, function(){
    api.proceedToPayment(function(){
    api.showOrderSummary();
});
});

// callback hall 
// pyramid of doom 
// inversion of control 
// problem of call 
// loosing control while excuting callback
// giving permission to other function without knowing that function when , hwo and execute .. 