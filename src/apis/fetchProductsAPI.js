export default async function fetchProductsAPI(params) {
  const url = new URL("http://localhost:3000/boots");

  url.search = params.toString();
  // console.log(url.search);

  const response = await fetch(url);

  return response.json();
}
