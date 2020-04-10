//----backEnd-----
function Order() {
  this.items = [];
  this.currentId = 0;
  this.orderTotal = 0;
}

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}
Pizza.prototype.price = function() {
  let price = 0;
  price += (this.size - 2)
  if (price === 16){
    price -= 1
  }
  return price
}

//----UI-----
let order = new Order();
$(document).ready(function() {
  let size;
  let toppings = [];
  $("#12").click(function(){size = 12});
  $("#14").click(function(){size = 14});
  $("#16").click(function(){size = 16});
  $("#18").click(function(){size = 18});

  $("#pizza").on("click", function(){
    showPizza()
  });
  $("#addPie").click(function() {
    $(".toppings:checked").each(function() {
     toppings.push($(this).val());
    })
    let pizza = new Pizza(size, toppings)
    toppings = []
    pizza.getPrice()
  })

});

function showPizza(){
  $("#pizza_container").removeClass("hidden")
}


