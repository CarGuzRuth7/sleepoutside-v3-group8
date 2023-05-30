import { getLocalStorage, setLocalStorage, renderListWithTemplate, displayTotalItems } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartEl = document.querySelector(".product-list");

  renderListWithTemplate(cartItemTemplate, cartEl, cartItems, "afterbegin", false);

  if (cartItems.length > 0) {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide");
    cartFooter.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;

    //retrive quantity and store sum total in localStorage
    let totalQuantity = document.querySelectorAll(".num-quantity");
    let sum = 0
    for (var i = 0; i < totalQuantity.length; i++) {
    var itemTotal = Number(totalQuantity[i].innerHTML);
    sum = sum + itemTotal
    }
    setLocalStorage("total-items", sum);

  }

  cartEl.addEventListener("click", handleRemoveItem);

  function handleRemoveItem(event) {
    if (event.target.classList.contains("remove-item")) {
      const productId = event.target.dataset.id;

      const index = cartItems.findIndex((item) => item.Id === productId);
      if (index !== -1) {
        if (cartItems[index].quantity > 1) {
          // if the quantity is greater than 1, reduce the quantity by 1
          cartItems[index].quantity -= 1;
          cartItems[index].totalPrice = cartItems[index].quantity * cartItems[index].FinalPrice;

          // update the quantity and price elements for the removed item
          const itemToUpdate = event.target.parentNode;
          itemToUpdate.querySelector(".cart-card__quantity").textContent = `qty: ${cartItems[index].quantity}`;
          itemToUpdate.querySelector(".cart-card__price").textContent = `$${cartItems[index].totalPrice.toFixed(2)}`;
        } else {
          cartItems.splice(index, 1);
          // Remove the item from the cart list
          const itemToRemove = event.target.closest("li.cart-card");
          itemToRemove.parentNode.removeChild(itemToRemove);
        }
        // update the cart in local storage with the modified cart items
        setLocalStorage("so-cart", cartItems);
        // recalculate and update the total after removing the item
        const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        const cartFooter = document.querySelector(".cart-footer");
        cartFooter.classList.remove("hide");
        cartFooter.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;

        displayTotalItems();
      }
    }
  }
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
      <p class="cart-card__quantity">qty: <span class="num-quantity">${item.quantity}</span></p>
      <p class="cart-card__price">$${item.totalPrice.toFixed(2)}</p>
      <span class="remove-item" data-id="${item.Id}">X</span>
    </li>`;
    return newItem;
}