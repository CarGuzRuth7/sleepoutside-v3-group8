import { loadHeaderFooter, displayTotalItems } from "./utils.mjs";
import { CheckOutProcess } from "./checkoutProcess.mjs";

loadHeaderFooter(() => {
  // callback function will be executed after the template rendering is complete
  displayTotalItems();
});
const checkoutProcess = new CheckOutProcess(
  "so-cart",
  "fieldset[name='orderInfo']"
);
document.forms["checkout-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});
