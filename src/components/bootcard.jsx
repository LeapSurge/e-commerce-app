import { Card } from "antd";
const { Meta } = Card;
export default function BootCard({ boot }) {
  return (
    <Card
      cover={boot.images?.[0]}
      className="boot-card"
      classNames={{ cover: "card--cover", body: "card--body" }}
      styles={{
        cover: {
          height: "200px",
          border: "1px solid black",
        },
      }}
    >
      <Meta title={boot.name} description={boot?.description} />
    </Card>
  );
}
