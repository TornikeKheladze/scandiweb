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
      const prevItems = store.cart && store.cart;
      let updated = null;
      let finalData = [...prevItems];
      prevItems.map((item, i) => {
        if (payload.id === item.id) {
          if (
            JSON.stringify(item.attributes) ===
            JSON.stringify(payload.attributes)
          ) {
            updated = {
              ...prevItems[i],
              quantity: prevItems[i].quantity + 1,
            };
            finalData[i] = updated;
          }
        }
      });

      if (!updated) {
        finalData.push(payload);
      }

      store.cart = finalData;
    },
    removeItem: (store, { payload }) => {
      let storeItems = store.cart && store.cart;
      let updated = storeItems[payload];
      if (updated.quantity > 0) {
        updated.quantity -= 1;
        storeItems[payload] = updated;
      }
      if (updated.quantity === 0) {
        storeItems.splice(payload, 1);
      }
      store.cart = storeItems;
    },
  },
});

export const { handleAttributes, addToCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
