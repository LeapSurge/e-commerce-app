import { Link } from "react-router-dom";
import { Pagination, Row, Col } from "antd";
import BootCard from "../components/bootcard";

const response = await fetch("http://localhost:3000/boots");
const boots = await response.json();

export default function AllList() {
  return (
    <div className="all-list">
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
    </div>
  );
}
