import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

productList(".product-list", "tents");
// add cart length to icon backpack
// const cartItems = getLocalStorage("so-cart") || [];
// document.querySelector(".num-items").innerHTML = cartItems.length;

loadHeaderFooter();
