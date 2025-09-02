import { Link, useSearchParams } from "react-router-dom";
import { Pagination, Row, Col, Select, Flex } from "antd";
import BootCard from "../components/bootcard";
import { useState, useEffect } from "react";

async function fetchList(params) {
  const url = new URL("http://localhost:3000/boots");

  url.search = params.toString();
  // console.log(url.search);

  const response = await fetch(url);

  return response.json();
}

export default function AllList() {
  const [boots, setBoots] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get("_sort") || "default";

  useEffect(() => {
    let ignore = false;

    const loadList = async () => {
      if (!ignore) {
        setBoots(await fetchList(searchParams));
      }
    };

    loadList();
    return () => (ignore = true);
  }, [searchParams]);

  return (
    <Flex vertical gap="small" className="all-list">
      <Flex>
        <Select
          value={sortOrder}
          options={[
            { label: "默认排序", value: "default" },
            { label: "价格从高到低", value: "-price" },
            { label: "价格从低到高", value: "price" },
          ]}
          onChange={(value) => {
            setSearchParams((prevParams) => {
              // 1. prevParams是当前的SearchParams，创建一个可修改的副本
              const newParams = new URLSearchParams(prevParams);

              // 2. 默认时删除_sort, 非默认添加_sort
              if (value !== "default") {
                newParams.set("_sort", value);
              } else {
                newParams.delete("_sort");
              }

              // 3. 返回新的params对象
              return newParams;
            });
          }}
          style={{ width: 130 }}
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
