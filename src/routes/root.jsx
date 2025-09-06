import { Layout, Menu, Input } from "antd";
import { useSelector } from "react-redux";
import { Outlet, Link, useLocation } from "react-router-dom";
const { Header, Content, Footer } = Layout;

export default function Root() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const items = [
    {
      key: "/",
      label: <Link to={"/"}>首页</Link>,
    },
    {
      key: "/all",
      label: <Link to={"/all"}>全部商品</Link>,
    },
    {
      key: "/cart",
      label: <Link to={"/cart"}>购物车{cartQuantity}</Link>,
    },
    {
      key: "/about",
      label: <Link to={"/about"}>关于</Link>,
    },
  ];
  const location = useLocation();
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="logo" />
        <Menu
          mode={"horizontal"}
          items={items}
          selectedKeys={[location.pathname]}
          style={{ minWidth: 0, flex: "auto" }}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
