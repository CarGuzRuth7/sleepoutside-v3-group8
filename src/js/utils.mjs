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

export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true){

  if (clear){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, templateFn);
  if(callback){
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter(){
  const headerTemplateFn = await loadTemplate("src/public/partials/header.html");
  const footerTemplateFn = await loadTemplate("./partials/footer.html");
  const headerEl = document.querySelector("header");
  const footerEl = document.querySelector("footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}