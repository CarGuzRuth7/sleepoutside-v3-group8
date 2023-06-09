import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
    window.location = "/orders/index.html"; 
  } catch {
    alertMessage("Incorrect username or password");
  }
}


export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location.href;
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    return token;
  }
}

export function isTokenValid(token) {
  if (token) {
    const decoded = jwt_decode(token);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      // console.log("Token expired.");
      return false;
    } else {
      // console.log("Valid token");
      return true;
    }
  } else {
    return false;
  }
}
