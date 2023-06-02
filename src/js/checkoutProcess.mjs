import { getLocalStorage } from "./utils.mjs"

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process
  return items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));
}
console.log(packageItems(items))

export default class checkoutProcess {

  const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    let subtotal = 0;
    let itemCount = 0;

    for (const item of this.list) {
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
    }
    
    this.itemTotal = subtotal;
    this.displayOrderTotals;
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    // if (this.itemTotal === 1){
    //   const itemShipping = 10;
    // } else {
    //   const itemShipping = 
    // }

    const shippingPerItem = 2;
    const itemShipping = 10;

    const shippingCost = itemShipping + (itemQuantity - 1) * shippingPerItem;
    this.shipping = shippingCost;
    this.tax = this.itemTotal * 0.06;
    // display the totals.
    const orderTotal = this.itemTotal + shippingCost + this.tax;
    this.orderTotal = orderTotal;
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    
  }
}

  async checkout(form) {

    const checkoutBtn = form.querySelector("#checkoutBtn");
    // Attach the event listener to the button click event
    checkoutBtn.addEventListener("click", event => {
      event.preventDefault();

      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
      const jsonFormData = formDataToJSON(form);
      jsonFormData.items = packageItems(this.list);
      jsonFormData.orderTotal = this.orderTotal;
      jsonFormData.shipping = this.shipping;
      jsonFormData.tax = this.tax;

      // create the options object for the fetch request
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonFormData)
      };

      // make the POST request to the server using the externalServices module
      externalServices.checkout("http://server-nodejs.cit.byui.edu:3000/checkout", options)
        .then(response => {
          // Process the server response (assuming it's JSON)
          return response.json();
        })
        .then(data => {
          // Handle the response data
          console.log(data);
        })
    });
  }
}