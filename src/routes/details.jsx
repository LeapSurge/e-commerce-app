import React, { useState } from "react";
import { useLoaderData, Form } from "react-router-dom";
import { Row, Col, Radio, Select, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../store/slice/cartSlice";

export const loader = ({ params }) => {
  const boot = fetch(`http://localhost:3000/boots?id=${params.id}`);
  if (!boot) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { boot };
};

const boot = {
  // --- 1. 核心商品信息 (SPU级别) ---
  productId: "B202310001",
  productName: "男士经典工装靴 防水耐磨短靴",
  mainImages: [
    "https://assets.example.com/shoes/boot/main/1.jpg",
    "https://assets.example.com/shoes/boot/main/2.jpg",
    "https://assets.example.com/shoes/boot/main/3.jpg",
    "https://assets.example.com/shoes/boot/main/4.jpg", // 可能包含上脚效果图
  ],
  videoUrl: "https://assets.example.com/shoes/boot/main/video.mp4", // 主图视频
  price: 899.0, // 默认SKU价格或最低价
  originalPrice: 1299.0,
  categoryId: "100301", // 男鞋 -> 靴子 -> 工装靴
  categoryName: "工装靴",
  brandName: "荒野猎人",

  // --- 2. 规格和SKU列表 (最关键的部分) ---
  specList: [
    {
      name: "颜色",
      values: ["深棕色", "黑色", "烟草色"],
    },
    {
      name: "尺码",
      values: ["39", "40", "41", "42", "43", "44"],
    },
  ],
  skuList: [
    // --- 深棕色 ---
    {
      skuId: "B20231000101",
      specs: ["深棕色", "39"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 15,
      image: "https://assets.example.com/shoes/boot/sku/deepbrown-39.jpg",
      code: "DEEPBRN39",
    },
    {
      skuId: "B20231000102",
      specs: ["深棕色", "40"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 22,
      image: "https://assets.example.com/shoes/boot/sku/deepbrown-40.jpg",
      code: "DEEPBRN40",
    },
    {
      skuId: "B20231000103",
      specs: ["深棕色", "41"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 18,
      image: "https://assets.example.com/shoes/boot/sku/deepbrown-41.jpg",
      code: "DEEPBRN41",
    },
    {
      skuId: "B20231000104",
      specs: ["深棕色", "42"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 11,
      image: "https://assets.example.com/shoes/boot/sku/deepbrown-42.jpg",
      code: "DEEPBRN42",
    },
    {
      skuId: "B20231000105",
      specs: ["深棕色", "43"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 5,
      image: "https://assets.example.com/shoes/boot/sku/deepbrown-43.jpg",
      code: "DEEPBRN43",
    },
    {
      skuId: "B20231000106",
      specs: ["深棕色", "44"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 9,
      image: "https://assets.example.com/shoes/boot/sku/deepbrown-44.jpg",
      code: "DEEPBRN44",
    },
    // --- 黑色 ---
    {
      skuId: "B20231000110",
      specs: ["黑色", "39"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 13,
      image: "https://assets.example.com/shoes/boot/sku/black-39.jpg",
      code: "BLACK39",
    },
    {
      skuId: "B20231000111",
      specs: ["黑色", "40"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 25,
      image: "https://assets.example.com/shoes/boot/sku/black-40.jpg",
      code: "BLACK40",
    },
    {
      skuId: "B20231000112",
      specs: ["黑色", "41"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 8,
      image: "https://assets.example.com/shoes/boot/sku/black-41.jpg",
      code: "BLACK41",
    },
    {
      skuId: "B20231000113",
      specs: ["黑色", "42"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 14,
      image: "https://assets.example.com/shoes/boot/sku/black-42.jpg",
      code: "BLACK42",
    },
    {
      skuId: "B20231000114",
      specs: ["黑色", "43"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 0,
      image: "https://assets.example.com/shoes/boot/sku/black-43.jpg",
      code: "BLACK43",
    },
    {
      skuId: "B20231000115",
      specs: ["黑色", "44"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 7,
      image: "https://assets.example.com/shoes/boot/sku/black-44.jpg",
      code: "BLACK44",
    },
    // --- 烟草色 ---
    {
      skuId: "B20231000120",
      specs: ["烟草色", "39"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 4,
      image: "https://assets.example.com/shoes/boot/sku/tobacco-39.jpg",
      code: "TOBACCO39",
    },
    {
      skuId: "B20231000121",
      specs: ["烟草色", "40"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 11,
      image: "https://assets.example.com/shoes/boot/sku/tobacco-40.jpg",
      code: "TOBACCO40",
    },
    {
      skuId: "B20231000122",
      specs: ["烟草色", "41"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 16,
      image: "https://assets.example.com/shoes/boot/sku/tobacco-41.jpg",
      code: "TOBACCO41",
    },
    {
      skuId: "B20231000123",
      specs: ["烟草色", "42"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 19,
      image: "https://assets.example.com/shoes/boot/sku/tobacco-42.jpg",
      code: "TOBACCO42",
    },
    {
      skuId: "B20231000124",
      specs: ["烟草色", "43"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 0,
      image: "https://assets.example.com/shoes/boot/sku/tobacco-43.jpg",
      code: "TOBACCO43",
    },
    {
      skuId: "B20231000125",
      specs: ["烟草色", "44"],
      price: 899.0,
      originalPrice: 1299.0,
      stock: 3,
      image: "https://assets.example.com/shoes/boot/sku/tobacco-44.jpg",
      code: "TOBACCO44",
    },
  ],
};
const { specList, skuList } = boot;

export const getBootNameById = (id) => {
  return "工装马丁靴";
};

function findSku(specs, skuList) {
  // console.log(specs);
  // skuList.forEach((element) => {
  //   console.log(JSON.stringify(element.specs));
  // });

  // const matchedSku = skuList.find(
  //   (sku) => JSON.stringify(specs) === JSON.stringify(sku.specs)
  // );
  const matchedSku = skuList.find(
    (sku) =>
      sku.specs.length === specs.length &&
      sku.specs.every((value, index) => value === specs[index])
  );
  console.log(matchedSku);
  return matchedSku;
}

export default function Details() {
  // const { boot } = useLoaderData();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();

  const sizeItems = specList
    .find((spec) => spec.name === "尺码")
    .values.map((size) => ({
      label: size,
      value: size,
    }));

  const colorOptions = specList
    .find((spec) => spec.name === "颜色")
    .values.map((color) => ({
      label: color,
      value: color,
    }));

  return (
    <div>
      <Row>
        <Col span={15}></Col>
        <Col span={9}>
          <h1>{boot.productName}</h1>
          <div className="details--price">
            <span className="details--original-price">
              ￥{boot.originalPrice}
            </span>
            <span className="details--price">￥{boot.price}</span>
          </div>
          <form>
            <fieldset>
              <legend>颜色</legend>
              <Radio.Group
                options={colorOptions}
                value={selectedColor}
                name={"color"}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>尺寸</legend>
              <Select
                value={selectedSize}
                // defaultValue="38"
                style={{ width: 120 }}
                options={sizeItems}
                onChange={(value) => setSelectedSize(value)}
              />
            </fieldset>
            <div className="details--btn-wrapper">
              <Button
                onClick={() => {
                  const selectedBoot = {
                    productName: boot.productName,
                    productId: boot.productId,
                    ...findSku([selectedColor, selectedSize], skuList),
                  };
                  console.log(selectedBoot);

                  dispatch(addItemToCart(selectedBoot));
                }}
              >
                加入购物车
              </Button>
              <Button type="primary">立即购买</Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}
