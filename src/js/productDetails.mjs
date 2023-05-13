import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs"; 


export default async function productDetails(productId) {
    const product = await findProductById(productId);
    renderProductDetails(product);
}

function addProductToCart(product) {
    const cart = getLocalStorage("so-cart") || [];
    const index = cart.findIndex((item) => item.Id === product.Id);
    if (index === -1) {
      cart.push({ ...product, quantity: 1, totalPrice: product.FinalPrice });
    } else {
      cart[index].quantity += 1;
      cart[index].totalPrice = cart[index].quantity * product.FinalPrice;
    }
    setLocalStorage("so-cart", cart);

    //add cart length to icon backpack
    document.querySelector(".num-items").innerHTML = cart.length;

}

function renderProductDetails(product){
    document.querySelector("#productName").innerHTML = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerHTML = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image; 
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerHTML = product.FinalPrice;
    document.querySelector("#productColorName").innerHTML = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id
    document.getElementById("addToCart").addEventListener("click", addProductToCart(product))
}