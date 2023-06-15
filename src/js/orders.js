import currentOrders from "../js/currentOrders.mjs";
import { loadHeaderFooter, displayTotalItems } from "../js/utils.mjs";
import { checkLogin } from "../js/auth.mjs";

loadHeaderFooter(() => {
  // callback function will be executed after the template rendering is complete
  displayTotalItems();
});

// currentOrders will need to send the token to the server with the request or it will be denied. if checkLogin will return the token upon success
const token = checkLogin();
currentOrders("#orders", token);
