import productList from "./productList.mjs";
import { getLocalStorage } from "./utils.mjs";

productList(".product-list", "tents");

//   //add cart length to icon backpack
const cartItems = getLocalStorage("so-cart") || [];
document.querySelector(".num-items").innerHTML = cartItems.length;
