import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
  },
  reducers: {
    setAppInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setAppInitialized } = appSlice.actions;
export default appSlice.reducer;
