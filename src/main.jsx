import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { App, ConfigProvider } from "antd";
import "./APP.css";
import { store } from "./store/store";
import Root from "./routes/root";
import Index from "./routes/index";
import All from "./routes/all";
import AllList from "./routes/allList";
import Details, { loader as getBoot } from "./routes/details";
import Cart from "./routes/cart";
import Register from "./routes/register";
import Login from "./routes/login";
import ProtectedRoute from "./routes/protectedRoute";
import Profile from "./routes/profile";

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
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
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
