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
  return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${order.items.length}</td>
  <td>${order.orderTotal}</td></tr>`;
}