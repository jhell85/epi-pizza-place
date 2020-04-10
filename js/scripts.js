//----backEnd-----
function Order() {
  this.items = [];
  this.currentId = 0;
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.price = 0;
}
//----UI-----
$(document).ready(function() {
  $("#pizza").on("click", function(){
    showPizza()
  })
});

function showPizza(){
  $("#pizza_container").removeClass("hidden")
}
