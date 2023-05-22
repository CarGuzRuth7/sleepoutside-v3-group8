import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

const productId = getParam("product");
productList(".product-list", productId);

const productTitle = productId.charAt(0).toUpperCase() + productId.slice(1);
document.querySelector(".product-category").innerHTML = productTitle.replace(
  "-",
  " "
);
