import { loadHeaderFooter, displayTotalItems } from "./utils.mjs";

loadHeaderFooter(() => {
    // callback function will be executed after the template rendering is complete
    displayTotalItems();
});