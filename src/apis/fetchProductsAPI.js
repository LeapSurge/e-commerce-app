export default async function fetchProductsAPI(params) {
  const url = new URL("http://localhost:3000/boots");

  url.search = params.toString();

  const response = await fetch(url);

  await new Promise((resolve) => setTimeout(resolve, 500));
  return response.json();
}
