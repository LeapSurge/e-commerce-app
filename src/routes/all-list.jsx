import { Link, useSearchParams } from "react-router-dom";
import { Pagination, Row, Col, Select, Flex, Checkbox, Input } from "antd";
import BootCard from "../components/bootcard";
import { useState, useEffect, useMemo } from "react";
import useDebounce from "../hooks/usedebounce";

async function fetchList(params) {
  const url = new URL("http://localhost:3000/boots");

  url.search = params.toString();
  // console.log(url.search);

  const response = await fetch(url);

  return response.json();
}

export default function AllList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [boots, setBoots] = useState([]);
  const sortOrder = searchParams.get("_order") || "default";
  const brands = searchParams.getAll("brand");
  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const debouncedQuery = useDebounce(query, 500);

  const filters = useMemo(() => {
    return { brand: brands };
  }, [brands.join(",")]);

  useEffect(() => {
    let ignore = false;

    const loadList = async () => {
      if (!ignore) {
        setBoots(await fetchList(searchParams));
      }
    };
    // console.log(filters);
    loadList();
    return () => (ignore = true);
  }, [sortOrder, filters, queryParam]);

  useEffect(() => {
    // console.log(query);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (!debouncedQuery) {
        newParams.delete("q");
      } else {
        newParams.set("q", debouncedQuery);
      }
      return newParams;
    });
  }, [debouncedQuery]);

  return (
    <Flex vertical gap="small" className="all-list">
      <Flex align="center" gap="middle" justify="space-between">
        <Select
          value={sortOrder}
          options={[
            { label: "默认排序", value: "default" },
            { label: "价格从高到低", value: "desc" },
            { label: "价格从低到高", value: "asc" },
          ]}
          onChange={(value) => {
            setSearchParams((prevParams) => {
              // 1. prevParams是当前的SearchParams，创建一个可修改的副本
              const newParams = new URLSearchParams(prevParams);

              // 2. 默认时删除_sort, 非默认添加_sort
              if (value !== "default") {
                newParams.set("_sort", "price");
                newParams.set("_order", value);
              } else {
                newParams.delete("_sort");
                newParams.delete("_order");
              }

              // 3. 返回新的params对象
              return newParams;
            });
          }}
          style={{ width: 130 }}
        />
        <Flex className="filter--item">
          <div className="title" gap="small">
            品牌：
          </div>
          <Checkbox.Group
            options={["Clarks", "Dr. Martens", "UGG"]}
            value={brands}
            onChange={(selected) => {
              setSearchParams((p) => {
                const newParams = new URLSearchParams(p);
                newParams.delete("brand");
                selected.forEach((brand) => newParams.append("brand", brand));
                return newParams;
              });
            }}
          />
        </Flex>
        <Input.Search
          placeholder="搜索商品"
          allowClear
          style={{ width: 200 }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // loading
        />
      </Flex>
      <Row gutter={[16, 16]}>
        {boots.map((boot) => (
          <Col key={boot.id} xs={24} sm={12} lg={6}>
            <Link to={`/all/${boot.id}`}>
              <BootCard boot={boot} />
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination align="center" defaultCurrent={1} total={10} />
    </Flex>
  );
}
