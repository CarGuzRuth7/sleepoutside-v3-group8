import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, displayTotalItems} from "./utils.mjs"; 


export default async function productDetails(productId) {
    const product = await findProductById(productId);
    renderProductDetails(product);
}

function addProductToCart(product) {
    const cart = getLocalStorage("so-cart") || [];

    // let totalItems = 0
    const index = cart.findIndex((item) => item.Id === product.Id);
    if (index === -1) {
      cart.push({ ...product, quantity: 1, totalPrice: product.FinalPrice });
    } else {
      cart[index].quantity += 1;
      cart[index].totalPrice = cart[index].quantity * product.FinalPrice;
    }
    setLocalStorage("so-cart", cart);
    displayTotalItems();    
}


export function calculateDiscountPercentage(product) {
  const originalPrice = product.SuggestedRetailPrice;
  const discountedPrice = product.FinalPrice;
  const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
  product.discountPercentage = discountPercentage.toFixed(0);
}

function renderProductDetails(product){
    calculateDiscountPercentage(product);
    document.querySelector("#productName").innerHTML = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryExtraLarge; 
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#discountPercentage").innerHTML = `- ${product.discountPercentage}%`
    document.querySelector("#discountProduct").innerHTML = `$${product.SuggestedRetailPrice}`;
    document.querySelector("#productFinalPrice").innerHTML = `$${product.FinalPrice}`;
    document.querySelector("#productColorName").innerHTML = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
    document.querySelector("#addToCart").addEventListener("click", () => addProductToCart(product));
    document.title = `Sleep Outside | ${product.NameWithoutBrand}`;
}