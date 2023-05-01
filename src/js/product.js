import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";


function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex((item) => item.Id === product.Id);
  if (index === -1) {
    cartItems.push({ ...product, quantity: 1, totalPrice: product.FinalPrice });
  } else {
    cartItems[index].quantity += 1;
    cartItems[index].totalPrice = cartItems[index].quantity * product.FinalPrice;
  }
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productId = getParam("product");

console.log(findProductById(productId))