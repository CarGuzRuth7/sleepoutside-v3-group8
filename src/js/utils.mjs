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

export function generateBreadcrumb(category, productName, productId) {
  const breadcrumbNav = document.querySelector(".breadcrumb-navigation");
  const breadcrumbList = document.createElement("ul");
  breadcrumbList.classList.add("breadcrumb-list"); 
  const homeLink = createBreadcrumbLink("Home", "/index.html");
  breadcrumbList.appendChild(homeLink);
  

  if (category) {
    const categoryLink = createBreadcrumbLink(
      category.replace("-", " ").charAt(0).toUpperCase() + category.replace("-", " ").slice(1),
      `/product-list/index.html?product=${category}`,
    );
    breadcrumbList.appendChild(categoryLink);
  }

  if (productName && productId) {
    const productLink = createBreadcrumbLink(productName, `/product_pages/index.html?product=${productId}`);
    breadcrumbList.appendChild(productLink);
  }

  breadcrumbNav.innerHTML = "";
  breadcrumbNav.appendChild(breadcrumbList);
}

export function createBreadcrumbLink(text, href) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  const listItem = document.createElement("li");
  listItem.classList.add("breadcrumb-item"); 
  listItem.appendChild(link);
  return listItem;
}

export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  const div = document.createElement("div");
  const closeBtn = document.createElement("button");
  const msg = document.createElement("p");

  div.classList.add("alert");
  closeBtn.classList.add("close-btn-alert");
  closeBtn.innerHTML = "x";

  msg.innerHTML = message;

  div.appendChild(closeBtn);
  div.appendChild(msg);
  main.prepend(div);

  closeBtn.addEventListener("click", () => {
    main.removeChild(div);
  });

  // make sure they see the alert by scrolling to the top of the window
  // we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}
