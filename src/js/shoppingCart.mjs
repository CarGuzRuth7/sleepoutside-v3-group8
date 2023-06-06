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
  cartEl.addEventListener("click", handleAddItem);

  function handleRemoveItem(event) {
    if (event.target.classList.contains("remove-item")) {
      const productId = event.target.dataset.id;
  
      const index = cartItems.findIndex((item) => item.Id === productId);
      if (index !== -1) {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
          cartItems[index].totalPrice = cartItems[index].quantity * cartItems[index].FinalPrice;
  
          const itemToUpdate = event.target.closest("li.cart-card");
          itemToUpdate.querySelector(".cart-card__quantity").textContent = `${cartItems[index].quantity}`;
          itemToUpdate.querySelector(".cart-card__price").textContent = `$${cartItems[index].totalPrice.toFixed(2)}`;
        } else {
          cartItems.splice(index, 1);
          const itemToRemove = event.target.closest("li.cart-card");
          itemToRemove.parentNode.removeChild(itemToRemove);
        }
        setLocalStorage("so-cart", cartItems);
        updateCartTotal();
      }
    }
  }

  function handleAddItem(event) {
    if (event.target.classList.contains("add-item")) {
      const productId = event.target.dataset.id;

      const index = cartItems.findIndex((item) => item.Id === productId);
      if (index !== -1) {
        cartItems[index].quantity += 1;
        cartItems[index].totalPrice = cartItems[index].quantity * cartItems[index].FinalPrice;

        const itemToUpdate = event.target.closest("li.cart-card");
        itemToUpdate.querySelector(".cart-card__quantity").textContent = `${cartItems[index].quantity}`;
        itemToUpdate.querySelector(".cart-card__price").textContent = `$${cartItems[index].totalPrice.toFixed(2)}`;

        setLocalStorage("so-cart", cartItems);
        updateCartTotal();
      }
    }
  }   

  function updateCartTotal() {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide");
    cartFooter.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
    displayTotalItems();
  }
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__price">$${item.totalPrice.toFixed(2)}</p>
      <p class="quantity"> Quantity </p>
      <div class="cart-quantity"> 
        <span class="remove-item" data-id="${item.Id}">-</span>
        <p class="cart-card__quantity">${item.quantity}</p>
        <span class="add-item" data-id="${item.Id}">+</span>
      </div>
    </li>`;
    return newItem;
}