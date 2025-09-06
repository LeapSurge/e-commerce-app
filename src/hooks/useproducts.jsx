import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import fetchProductsAPI from "../apis/fetchProductsAPI";

export default function useProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  // ————————————从URL派生的状态————————————
  // 排序状态
  const sort = searchParams.get("_sort") || "default";
  const order = searchParams.get("_order");

  // 筛选状态
  const filters = useMemo(
    () => ({
      brand: searchParams.getAll("brand"),
    }),
    [searchParams]
  );

  // 搜索状态
  const query = searchParams.get("q") || "default";

  // ————————————请求数据副作用————————————
  useEffect(() => {
    let ignore = false;

    const getProducts = async () => {
      try {
        if (!ignore) {
          setIsLoading(true);
          setError(null);

          const queryParams = new URLSearchParams();

          // 处理排序参数
          if (sort && sort !== "default") {
            queryParams.append("_sort", sort);
            if (order) {
              queryParams.append("_order", order);
            }
          }

          // 处理筛选参数
          if (filters.brand && filters.brand.length > 0) {
            filters.brand.forEach((b) => queryParams.append("brand", b));
          }

          // 处理防抖的搜索
          if (query && query !== "default") {
            queryParams.append("q", query);
          }

          setProducts(await fetchProductsAPI(searchParams));
        }
      } catch (e) {
        if (!ignore) {
          setError(e.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    getProducts();
    return () => (ignore = true);
  }, [sort, order, filters, query]);
  console.log(products);

  return { isLoading, error, products };
}
