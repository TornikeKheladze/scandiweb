import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import headerSlice from "./features/headerSlice";
import productsSlice from "./features/productsSlice";

export const store = configureStore({
  reducer: {
    product: productsSlice,
    header: headerSlice,
    cart: cartSlice,
  },
});
