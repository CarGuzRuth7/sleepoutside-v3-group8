import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart(){
    const cartItems = getLocalStorage("so-cart") || [];
    const cartEl = document.querySelector(".product-list");

  renderListWithTemplate(cartItemTemplate, cartEl, cartItems, "afterbegin", false);
  if (cartItems.length > 0) {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide");
    cartFooter.querySelector(
      ".cart-total"
    ).textContent = `Total: $${total.toFixed(2)}`;
  }
  //add cart length to icon backpack
  // document.querySelector(".num-items").innerHTML = cartItems.length;
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.totalPrice.toFixed(2)}</p>
    </li>`;
    return newItem;
  }