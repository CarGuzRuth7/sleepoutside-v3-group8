import {getData} from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    const template = `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`
  return template

}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  // get the list of products 
  // render out the product list to the element
  let elem = document.querySelector(selector);
  let productLst = await getData(category);

  function filterResults(arr) {
    // Define an array of product IDs we want to keep
    const usedIds = ["880RR", "985RF", "985PR", "344YJ"];
    // Filter the array of products to only include products with the desired IDs
    return arr.filter((item) => usedIds.includes(item.Id));
  }
  productLst = filterResults(productLst);
  renderListWithTemplate(productCardTemplate, elem, productLst, "afterbegin", false);
}

