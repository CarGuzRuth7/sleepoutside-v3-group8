import { loadHeaderFooter, displayTotalItems } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

loadHeaderFooter(() => {
    // callback function will be executed after the template rendering is complete
    displayTotalItems();
});
ShoppingCart();
