import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();
const productId = getParam("product");
productList(".product-list", productId);

const productTitle = productId.charAt(0).toUpperCase() + productId.slice(1);
document.querySelector(".product-category").innerHTML = productTitle.replace(
  "-",
  " "
);
