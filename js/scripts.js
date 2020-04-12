//----backEnd-----
function Order() {
  this.items = [];
  this.currentId = 0;
  this.orderTotal = 0;
}
Order.prototype.addItem = function (item) {
  item.id = this.assignId();
  this.orderTotal += item.price;
  this.items.push(item);
};
Order.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};
Order.prototype.displayItems = function () {
  this.items.forEach((item) => {
    console.log(item);
  });
};
Order.prototype.getItems = function () {
  printArray = this.items.map((item) => {
    if (item.type === "pizza") {
      if(!item.toppings){
        return `<div class="text-left">${item.size}" Cheese pizza<br><span class="text-right">$${item.price}</span></div> `
      }
      return `<div class="text-right">${
        item.size
      }" pizza with ${item.returnToppings()} <br>$${item.price}</div>`;
    }
  });
  return printArray;
};

function Pizza(size, toppings) {
  this.type = "pizza";
  this.size = size;
  this.toppings = toppings;
}
Pizza.prototype.getprice = function () {
  let price = 0;
  price += this.size - 2;
  if (price === 16) {
    price -= 1;
  }
  this.toppings.forEach((topping) => {
    if (
      topping === "mushrooms" ||
      topping === "olives" ||
      topping === pineapple
    ) {
      price += 1.5;
    } else if (topping === "pepperoni" || topping === "sausage") {
      price += 2;
    }
  });
  this.price = price;
};
Pizza.prototype.returnToppings = function () {
  displayString = "";
  for (let i = 0; i < this.toppings.length; i++) {
    const topping = this.toppings[i];
    console.log(`topping:${topping} length: ${this.toppings.length} i: ${i}`);

    if (this.toppings.length === i + 1) {
      displayString = displayString.slice(0, -2);
      displayString += ` & ${topping}`;
    } else {
      displayString += `${topping}, `;
    }
  }

  return displayString;
};

function addPizza(size, toppings) {
  let pizza = new Pizza(size, toppings);
  pizza.getprice();
  order.addItem(pizza);
}

//----UI-----
let order = new Order();
$(document).ready(function () {
  let size;
  let toppings = [];
  attachListeners();
  $("#12").click(function(){size = 12});
  $("#14").click(function(){size = 14});
  $("#16").click(function(){size = 16});
  $("#18").click(function(){size = 18});

  $("#pizza").on("click", function () {
    showPizza();
  });

  $("#addPie").click(function () {
    $(".toppings:checked").each(function () {
      toppings.push($(this).val());
      this.checked = false;
    });
    addPizza(size, toppings);
    hideDivs();
    toppings = [];
    size = null;
    order.displayItems();
    displayOrder();
  });
});

function hideDivs() {
  $("#toppings-div").addClass("hidden");
  $("#pizza-container").addClass("hidden");
}

function attachListeners() {
  $(".size").click(function () {
    $("#toppings-div").removeClass("hidden");
  });
}

function showPizza() {
  $("#pizza-container").removeClass("hidden");
}

function displayOrder() {
  $("#order-total").html(order.getItems());
}
