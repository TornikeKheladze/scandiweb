import { createSlice } from "@reduxjs/toolkit";

const initialState = { attributes: {}, cart: [] };

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    handleAttributes: (store, { payload }) => {
      const prevAttributes =
        store.attributes && store.attributes[payload.productId];
      const prevItems = store.attributes && store.attributes;
      const data = {
        ...prevItems,
        [payload.productId]: {
          ...prevAttributes,
          [payload.id]: payload,
        },
      };
      store.attributes = data;
    },
    addToCart: (store, { payload }) => {
      console.log(payload);
      // აქ ვიჩალიჩო უნდა რამე
      //attribute.js ში კიდე რამეს დავამატებდი inStock ზე
      store.cart = payload;
    },
  },
});

export const { handleAttributes, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
