//import productList from "./productList.mjs";
import { loadHeaderFooter, displayTotalItems } from "./utils.mjs";
import Alert from "./Alert.js";

// loadHeaderFooter();
loadHeaderFooter(() => {
  // callback function will be executed after the template rendering is complete
  displayTotalItems();
});
//calls random alert messages
Alert();
