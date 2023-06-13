import { getOrders } from "./externalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    const parent = document.querySelector(selector);
    parent.innerHTML = orderTemplate(orders);
    console.log(orders)
  } catch (err) {
    alertMessage(err.message)
  }
}

function orderTemplate{
    
}