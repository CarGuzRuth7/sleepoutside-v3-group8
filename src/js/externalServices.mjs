const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  let jsonResponse = await res.json();
  if (jsonResponse.Result || jsonResponse.message) {
    return jsonResponse;
  } else {
    throw { 
      name: "servicesError", 
      message: jsonResponse };
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