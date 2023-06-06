import productList from "./productList.mjs";
import { getParam, loadHeaderFooter, displayTotalItems } from "./utils.mjs";

loadHeaderFooter(() => {
  // callback function will be executed after the template rendering is complete
  displayTotalItems();
});

const productId = getParam("product");
productList(".product-list", productId);

const productTitle = productId.charAt(0).toUpperCase() + productId.slice(1);
document.querySelector(".product-category").innerHTML = productTitle.replace(
  "-",
  " "
);
