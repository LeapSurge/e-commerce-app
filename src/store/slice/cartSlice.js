import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalQuantity: 0,
    totalAmount: 0,
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      if (!action.payload) {
        throw new Error("没有商品对象");
      }
      const item = state.items.find(
        (item) => item.skuId == action.payload.skuId
      );
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
      state.totalQuantity++;
      // console.log(state.items);
    },

    incrementItemQuantity: (state, action) => {
      const item = state.items.find((item) => action.payload === item.skuId);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalAmount += item.price;
      }
    },

    decrementItemQuantity: (state, action) => {
      const item = state.items.find((item) => action.payload === item.skuId);

      if (item && item.quantity > 0) {
        item.quantity--;
        state.totalQuantity--;
        state.totalAmount -= item.price;

        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.skuId !== action.payload);
        }
      }
    },

    removeItemFromCart: (state, action) => {
      const item = state.items.find((item) => action.payload === item.skuId);
      if (item) {
        state.totalAmount -= item.price * item.quantity;
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((i) => i.skuId !== action.payload);
      }
    },
  },
});

export const {
  addItemToCart,
  decrementItemQuantity,
  incrementItemQuantity,
  removeItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
