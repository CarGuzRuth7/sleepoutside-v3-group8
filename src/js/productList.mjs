import {getData} from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    const template = `<li class="product-card">
    <a href=product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`
  return template

}

export default async function productList(selector, category){
    // get the element we will insert the list into from the selector
    // get the list of products 
    // render out the product list to the element
    
    let elem = document.querySelector(selector);
    let productLst = await getData(category); 
    renderListWithTemplate(productCardTemplate, elem, productLst, "afterbegin", false);

   
}

// function renderList(list, elem){

//     const listProduct = list.map((item) => productCardTemplate(item));
//     elem.insertAdjacentHTML("afterbegin", listProduct.join(""));
     
// }
