import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./features/headerSlice";
import productsSlice from "./features/productsSlice";

export const store = configureStore({
  reducer: {
    product: productsSlice,
    header: headerSlice,
  },
});
