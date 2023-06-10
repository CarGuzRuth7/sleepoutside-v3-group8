import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, displayTotalItems, generateBreadcrumb, alertMessage } from "./utils.mjs"; 


export default async function productDetails(productId) {
  try{
    const product = await findProductById(productId);
    if(!product){
      throw new SyntaxError("The product you are trying to find is not available.")
    }
    renderProductDetails(product);
    generateBreadcrumb(product.Category, product.Name, productId);
  } catch (err){
    let productD = document.querySelector(".product-detail")
    productD.innerHTML = `<h2>Product Not Found</h2>
                           <p>${err.message}</p>`
  }
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
    alertMessage("Product Added Successfully");
    setTimeout(()=>{
      let alert = document.querySelector(".alert");
      alert.remove()
    }, 6000)
    
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