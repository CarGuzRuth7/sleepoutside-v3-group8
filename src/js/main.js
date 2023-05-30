//import productList from "./productList.mjs";
import { loadHeaderFooter, displayTotalItems } from "./utils.mjs";
import Alert from "./Alert.js";

// loadHeaderFooter();
//calls random alert messages
loadHeaderFooter(() => {
  // Callback function will be executed after the template rendering is complete
  displayTotalItems();
});
Alert();
