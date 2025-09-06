import { Row, Col } from "antd";
import ProductCard from "../components/productcard";
import heroImage from "../assets/June_hero.png";
const promotionBoots = [
  {
    id: 1,
    name: "靴子1",
    images: ["靴子1.jpg"],
  },
  {
    id: 2,
    name: "靴子2",
    images: ["靴子2.jpg"],
  },
  {
    id: 3,
    name: "靴子3",
    images: ["靴子3.jpg"],
  },
  {
    id: 4,
    name: "靴子4",
    images: ["靴子4.jpg"],
  },
];
export default function Index() {
  return (
    <>
      <div className="banner">
        <img
          src={heroImage}
          alt=""
          width="1366"
          height="768.0"
          loading="lazy"
          sizes="100vw"
          className="hero-image"
        ></img>
        <h1 className="banner--title">SUMMER SALE - 20% off</h1>
      </div>
      <div className="category"></div>
      <div className="on-sale">
        <Row gutter={[16, 16]}>
          {promotionBoots.map((boot, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              {/* 使用能响应断点的卡片组件 */}
              <ProductCard product={boot} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
