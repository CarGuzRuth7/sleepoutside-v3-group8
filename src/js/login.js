import { loadHeaderFooter, displayTotalItems, getParam } from "./utils.mjs";
import { login } from "./auth.mjs"

loadHeaderFooter(() => {
  // callback function will be executed after the template rendering is complete
  displayTotalItems();
});

const loginForm = document.getElementById("login-form");
const redirectParam = getParam("redirect");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const redirect = redirectParam || "/"; 

    login({ email, password }, redirect);
  });
