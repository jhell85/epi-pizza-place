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
  console.log(this.orderTotal);
};
Order.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};
Order.prototype.displayItems = function () {
  this.items.forEach((item) => {
  });
};
Order.prototype.getItems = function () {
  printArray = this.items.map((item) => {
    if (item.type === "pizza") {
      if(item.toppings.length === 0){
        return `<div class="text-center ml-3 mr-5">${item.size}" Cheese Pizza<br><div class="mr-5 text-right">$${item.price}</div></div> `
      } else {
        return `<div class="text-center ml-3 mr-5">${item.size}" Pizza with ${item.returnToppings()}<br><div class=" mr-5 text-right">$${item.price}</div></div>`;
      };
    };
  });
  return printArray;
};
Order.prototype.addCustomer = function (customer) {
  this.customer = customer
}


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
      topping === "pineapple"
    ) {
      price += 1;
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
    if (this.toppings.length === 1){
      return topping
    } else {
      if (this.toppings.length === i + 1) {
        displayString = displayString.slice(0, -2);
        displayString += ` & ${topping}`;
      } else {
        displayString += `${topping}, `;
      }
    }
  }

  return displayString;
};

function addPizza(size, toppings) {
  let pizza = new Pizza(size, toppings);
  pizza.getprice();
  order.addItem(pizza);
}

function Customer(name, address, city, zip){
  this.name = name;
  this.address = address;
  this.city = city;
  this.zip = zip;
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

  $("#sign-in").submit(function(event) {
    event.preventDefault();
    let name = $("#name").val()
    let address = $("#address").val()
    let city = $("#city").val()
    let zip = $("#zip").val()
    if (!checkInputs(name, address, city, zip)){
      $("#form-check").html("")
      let customer = new Customer(name, address, city, zip);
      order.addCustomer(customer);
      $("#submit-div").removeClass("hidden");
      $("#sign-in-div").addClass("hidden");
      // $("#form-check").addClass("hidden");
    } else {
      $("#form-check").html(`please fill out ${checkInputs(name, address, city, zip)} input fields`)
    }
  })
  $("#submit-order").click(function() {
    if (order.items.length === 0){
      $("#form-check").html(`<h5>No items added to your order</h5>`)
    } else {
      hideDivs();
      $("#order-container").fadeOut();
      $("#order-confirmation").addClass("order-boarder mt-3 mb-3");
      $("#order-confirmation").html(`<h2 class=" pt-3 text-center"> Thank you for Ordering</h2><h5 class="pr-3 pt-1 text-right">delivering to:<br>${order.customer.name}<br>${order.customer.address}<br>${order.customer.city} ${order.customer.zip}</h5><h4 class="text-center">Order Details</h4><div class="pt-5 mb-3 pb-5">${order.getItems()}</div><div class="text-center">please have card or cash payment ready.</div><h4 class="pt-3 pb-3 text-right">Total: $ ${order.orderTotal}</h4>`);

    }
  })
});

function checkInputs(name, address, city, zip){
  checkArray = [name,address,city,zip]
  emptyFieldsString = ''
  fieldsArray = []
  for (let i = 0; i < checkArray.length; i++) {
    const input = checkArray[i];
    if(input === ""){
      if(i === 0){
        fieldsArray.push("name")
      } else if (i === 1){
        fieldsArray.push("address")
      } else if (i === 2){
        fieldsArray.push("city")
      } else if (i === 3){
        fieldsArray.push("zip code")
      }
    }
  }
  if(fieldsArray === []){
    return
  }else {
    for (let i = 0; i < fieldsArray.length; i++) {
      const field = fieldsArray[i];
      if (fieldsArray.length === 1){
        return field
      }
      if (fieldsArray.length === i + 1) {
        emptyFieldsString = emptyFieldsString.slice(0, -2);
        emptyFieldsString += ` & ${field}`;
      } else {
        emptyFieldsString += `${field}, `;
      }
    }
    return emptyFieldsString
  }
}

function hideDivs() {
  $("#toppings-div").addClass("hidden");
  $("#pizza-container").addClass("hidden");
  $("#form-check").html("")
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
  $("#order-display").addClass("order-background");
  $("#order-display").html(`<div class="pt-5 mb-3 pb-5">${order.getItems()}</div>`);
  $("#total-display").html(`<h5 class="text-right pr-3">Order total: $${order.orderTotal}</h5>`)
}
