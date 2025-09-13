export default async function fetchProductsApi(params) {
  const url = new URL("http://localhost:3000/boots");
  try {
    url.search = params.toString();
    const response = await fetch(url);

    await new Promise((resolve) => setTimeout(resolve, 500));
    return await response.json();
  } catch (error) {
    throw new Error(`网络错误：${error.message}`);
  }
}
