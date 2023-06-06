import { getLocalStorage } from "./utils.mjs"
import { checkOut } from "./externalServices.mjs"

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

export class CheckOutProcess {
  constructor(key, outputSelector){
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
    this.calculateOrdertotal();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    let subtotal = 0;
    let itemCount = 0;

    for (const item of this.list) {
      subtotal += item.FinalPrice * item.quantity;
      itemCount += item.quantity;
    }
    this.itemTotal = subtotal;
    this.displayOrderTotals(itemCount);
  }
  calculateOrdertotal() {
    const shippingPerItem = 2;
    const itemShipping = 10;

    const shippingCost = itemShipping + (this.list.length - 1) * shippingPerItem;
    this.shipping = shippingCost;
    this.tax = this.itemTotal * 0.06;
    // display the totals.
    const orderTotal = this.itemTotal + shippingCost + this.tax;
    this.orderTotal = orderTotal;
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const output = document.querySelector(this.outputSelector);

    const orderTemplate = `
    <legend>Order Summary</legend>
    <p>Item Total: $${this.itemTotal}</p>
    <p>Shipping: $${this.shipping}</p>
    <p>Tax: $${this.tax.toFixed(2)}</p>
    <p>Order Total: $${this.orderTotal}</p>
    `
    output.innerHTML = orderTemplate;
  }
  async checkout(form) {

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

      try {
        // make the post request to the server
        const response = await checkOut(options);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      };
  }
}