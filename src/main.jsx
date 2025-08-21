import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./APP.css";
import Root from "./routes/root";
import Index from "./routes/index";
import All from "./routes/all";
import AllList from "./routes/all-list";
import Details, { loader as getBoot } from "./routes/details";
import Cart from "./routes/cart";
import { App, ConfigProvider } from "antd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "all",
        element: <All />,
        children: [
          { index: true, element: <AllList /> },
          { path: ":bootId", element: <Details />, loader: getBoot },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerBg: "#ffffff",
            },
          },
        }}
      >
        <App>
          <RouterProvider router={router} />
        </App>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
