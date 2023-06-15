import { getOrders } from "./externalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    const parent = document.querySelector(selector);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    alertMessage(err.message)
  }
}

function orderTemplate(order) {
  let productDetails = "";
  order.items.forEach((item) => {
    const productName = item.name;
    const productQuantity = item.quantity;

    // append the product details to a string
    productDetails += `${productName} (Quantity: ${productQuantity}), `;
  });

  productDetails = productDetails.slice(0, -2);

  const template = `<tr>
    <th>Order N°${order.id}</td>
    </tr>
    <tr>
    <td>Order placed: ${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
    <td>Number of items: ${order.items.length}</td>
    <td>Product Details: ${productDetails}</td>
    <td>Total: ${order.orderTotal}</td>
  </tr>`;
  return template;
}
