import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import authReducer from "./slice/authSlice";
import appReducer from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    app: appReducer,
  },
});
