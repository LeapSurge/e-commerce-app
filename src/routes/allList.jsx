import { Link, useSearchParams } from "react-router-dom";
import {
  Pagination,
  Row,
  Col,
  Select,
  Flex,
  Checkbox,
  Input,
  Skeleton,
  Empty,
  Result,
} from "antd";
import ProductCard from "../components/productCard";
import useProducts from "../hooks/useProducts";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";

export default function AllList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, error, products } = useProducts();
  const { inputValue, setInputValue } = useDebouncedSearch();

  // 派生状态
  const sortValue = searchParams.get("_order") || "default";
  const brands = searchParams.getAll("brand") || [];

  const handleSortChange = (value) => {
    setSearchParams((prevParams) => {
      // 1. prevParams是当前的SearchParams，创建一个可修改的副本
      const newParams = new URLSearchParams(prevParams);

      // 2. 默认时删除_sort, 非默认添加_sort
      if (value && value !== "default") {
        newParams.set("_sort", "price");
        newParams.set("_order", value);
      } else {
        newParams.delete("_sort");
        newParams.delete("_order");
      }

      // 3. 返回新的params对象
      return newParams;
    });
  };

  const handleFilterChange = (filterType, list) => {
    setSearchParams((p) => {
      const newParams = new URLSearchParams(p);
      newParams.delete(filterType);
      if (list && list.length > 0) {
        list.forEach((e) => newParams.append(filterType, e));
      }
      return newParams;
    });
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
  };

  return (
    <Flex vertical gap="small" className="all-list">
      <Flex align="center" gap="middle" justify="space-between">
        <Select
          options={[
            { label: "默认排序", value: "default" },
            { label: "价格从高到低", value: "desc" },
            { label: "价格从低到高", value: "asc" },
          ]}
          value={sortValue}
          onChange={handleSortChange}
          style={{ width: 130 }}
        />
        <Flex className="filter--item">
          <div className="title" gap="small">
            品牌：
          </div>
          <Checkbox.Group
            options={["Clarks", "Dr. Martens", "UGG"]}
            onChange={(checked) => {
              handleFilterChange("brand", checked);
            }}
            value={brands}
          />
        </Flex>
        <Input.Search
          placeholder="搜索商品"
          allowClear
          style={{ width: 200 }}
          value={inputValue}
          onChange={handleSearchChange}
          // loading
        />
      </Flex>
      <Skeleton
        active
        paragraph={{ rows: 5 }}
        loading={isLoading}
        title={false}
      >
        {error ? (
          <Result status="error" title={error} />
        ) : products && products.length > 0 ? (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product.id} xs={24} sm={12} lg={6}>
                <Link to={`/all/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty />
        )}
      </Skeleton>
      <Pagination align="center" defaultCurrent={1} total={10} />
    </Flex>
  );
}
