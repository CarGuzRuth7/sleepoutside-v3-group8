const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`)
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkOut(payload){
  const url = `${baseURL}checkout`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  const response = await fetch(url, options);
  const json = await convertToJson(response);
  return json;
}

export async function loginRequest(creds){
  const url = `${baseURL}login`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  };
  const response = await fetch(url, options);
  if (!response.ok){
    throw new Error("Login failed.")
  }
  const data = await response.json();
  return data.accessToken;
}

export async function getOrders(token) {
  const url = `${baseURL}orders`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok){
    throw new Error("Login failed.")
  }
  // console.log(response);
  return response.json();
}
