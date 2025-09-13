import { useEffect } from "react";
import { Layout, Menu, Flex, Button, Spin } from "antd";
import { loginSuccess, logout } from "../store/slice/authSlice";
import { setAppInitialized } from "../store/slice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialized = useSelector((state) => state.app.isInitialized);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // menuItems使用了cartQuantity放在组件内
  const menuItems = [
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
      key: "/profile",
      label: <Link to={"/profile"}>个人中心</Link>,
    },
    {
      key: "/about",
      label: <Link to={"/about"}>关于</Link>,
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(loginSuccess({ user, token }));
    }
    dispatch(setAppInitialized());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!isInitialized) {
    return <Spin size="large" fullscreen />;
  }
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="logo" />
        <Menu
          mode={"horizontal"}
          items={menuItems}
          selectedKeys={[location.pathname]}
          style={{ minWidth: 0, flex: 1 }}
        />
        {isAuthenticated ? (
          <Flex gap="small" align="center">
            <Link to={"/profile"}>{user}</Link>
            <Button onClick={handleLogout} color="danger" variant="solid">
              退出登录
            </Button>
          </Flex>
        ) : (
          <Flex gap="small">
            <Link to={"/login"}>登录</Link>
            <Link to={"/register"}>注册</Link>
          </Flex>
        )}
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
