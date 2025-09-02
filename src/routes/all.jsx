import { Breadcrumb, Flex } from "antd";
import { Link, Outlet } from "react-router-dom";
import { getBootNameById } from "./details";
export default function All() {
  return (
    <Flex vertical gap="middle">
      <h1>Shop All</h1>
      <Breadcrumb itemRender={itemRender} items={routes}></Breadcrumb>
      <Outlet />
    </Flex>
  );
}

const routes = [
  {
    path: "",
    title: "home",
  },
  {
    path: "all",
    title: "shop all",
  },
  {
    path: ":bootId",
    title: "xxboot",
  },
];
function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;
  let fullPath = `${paths.join("/")}`;
  // console.log(paths);
  // console.log(params);

  if (Object.keys(params).length > 0) {
    // 遍历所有参数，替换路径中的 :paramName
    for (const [key, value] of Object.entries(params)) {
      fullPath = fullPath.replace(`:${key}`, value);
    }
  }
  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={fullPath}>{currentRoute.title}</Link>
  );
}
