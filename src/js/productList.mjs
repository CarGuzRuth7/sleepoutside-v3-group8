import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate} from "./utils.mjs";
import { calculateDiscountPercentage } from "./productDetails.mjs";
import { generateBreadcrumb } from "./utils.mjs";

function productCardTemplate(product){
  calculateDiscountPercentage(product);
    const template = `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryLarge}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="discountPercentage-product" id="discountPercentage">- ${product.discountPercentage}%</p>
      <p class="product-card__price"> <span id="discountProduct">$${product.SuggestedRetailPrice}</span> <span id="productFinalPrice">$${product.FinalPrice}</span></p>
      </a>
  </li>`
  return template
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  // get the list of products 
  // render out the product list to the element
  let elem = document.querySelector(selector); 
  let productLst = await getData(category);
  renderListWithTemplate(productCardTemplate, elem, productLst, "afterbegin", false);
  generateBreadcrumb(category, null, null);
}