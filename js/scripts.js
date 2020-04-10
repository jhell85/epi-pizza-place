//----backEnd-----
function Order() {
  this.items = [];
  this.currentId = 0;
  this.orderTotal = 0;
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.price = 0;
}
// Pizza.prototype.getPrice(size, toppings){
   
// }
//----UI-----
let order = new Order();
function attachContactListeners()

$(document).ready(function() {
  let size;
  let toppings = [];
  attachContactListeners()

  $("#pizza").on("click", function(){
    showPizza()
  });
  $("#addPie").submit(function(event) {
    event.preventDefault();
    $(".toppings:checked").each(function() {
     toppings.push($(this).val());
    })

  })

});

function showPizza(){
  $("#pizza_container").removeClass("hidden")
}


