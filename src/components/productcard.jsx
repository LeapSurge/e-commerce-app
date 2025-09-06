import { Card } from "antd";
const { Meta } = Card;
export default function productCard({ product }) {
  return (
    <Card
      cover={product.images?.[0]}
      className="product-card"
      classNames={{ cover: "card--cover", body: "card--body" }}
      styles={{
        cover: {
          height: "200px",
          border: "1px solid black",
        },
      }}
    >
      <Meta title={product.name} description={product?.description} />
    </Card>
  );
}
