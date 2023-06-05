import { getParam, loadHeaderFooter, displayTotalItems } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);
loadHeaderFooter(() => {
  // callback function will be executed after the template rendering is complete
  displayTotalItems();
});
