// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true){
  const listProduct = list.map((item) => templateFn(item));
  parentElement.insertAdjacentHTML(position, listProduct.join(""));
  if (clear){
    parentElement.innerHTML = "";
  }
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true){

  if (clear){
    parentElement.innerHTML = "";
  }
  const html = await templateFn(data); 
  parentElement.insertAdjacentHTML(position, html);
//  console.log(parentElement.innerHTML)
  if(callback){
    callback(data);
  }
}

export function loadTemplate(path) {
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter(callback){ // added a callback to pass displayTotalItems after the template is rendered
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("header");
  const footerEl = document.querySelector("footer");
  renderWithTemplate(headerTemplateFn, headerEl, null, null, "afterbegin", true);
  renderWithTemplate(footerTemplateFn, footerEl, null, callback, "afterbegin", true);
  displayTotalItems()
}

//WRITE A FUNCTION TO GET TOTAL-ITEMS FROM LOCAL STORAGE. 
export function displayTotalItems(){
  const cartStorage = getLocalStorage("so-cart") || []
  // console.log(cartStorage)
  //displays totals items from the cart (backpack) on each view  
  const cartItems = document.querySelector(".num-items");

  // calculate the total number of items in the cart by summing up the quantity of each item
  let totalItems = cartStorage.reduce((accumulator, item) => accumulator + item.quantity, 0)
  // console.log(totalItems)
  if (cartItems) {
    cartItems.innerHTML = totalItems;
    toggleCartClass(cartItems);

    if (cartStorage.length === 0) {
      cartItems.style.display = "none";
    } else {
      cartItems.style.display = "inline-block";
    } 
  }
}
 
 export function toggleCartClass(number){
  //toggle num-items classes to animate the cart
  //const number = document.querySelector("num-items");
  number.classList.add("add-to-cart");
  setTimeout(()=>{number.classList.remove("add-to-cart")}, 5000)
}
