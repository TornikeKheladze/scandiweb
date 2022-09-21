import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributes: {},
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

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
      const ordered = Object.keys(payload.attributes)
        .sort()
        .reduce((obj, key) => {
          obj[key] = payload.attributes[key];
          return obj;
        }, {});
      const updatedPayload = { ...payload, attributes: ordered };

      const prevItems = store.cart && store.cart;
      let updated = null;
      let finalData = [...prevItems];
      prevItems.map((item, i) => {
        if (updatedPayload.id === item.id) {
          if (
            JSON.stringify(item.attributes) ===
            JSON.stringify(updatedPayload.attributes)
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
        finalData.push(updatedPayload);
      }

      if (finalData) {
        let quantity = 0;
        let amount = 0;
        let curPrice = null;
        finalData.forEach((x) => {
          quantity += x.quantity;
          [curPrice] = x.prices.filter(
            (prc) => prc.currency.label === updatedPayload.choosenCurrency.label
          );
          amount += curPrice.amount * x.quantity;
        });
        store.totalQuantity = quantity;
        store.totalAmount = amount.toFixed(2);
      }
      store.cart = finalData;
    },
    removeItem: (store, { payload }) => {
      let storeItems = store.cart && store.cart;
      let updated = storeItems[payload.index];
      if (updated.quantity > 0) {
        updated.quantity -= 1;
        storeItems[payload.index] = updated;
      }
      if (updated.quantity === 0) {
        storeItems.splice(payload.index, 1);
      }

      if (storeItems) {
        let quantity = 0;
        let amount = 0;
        let curPrice = null;
        storeItems.forEach((x) => {
          quantity += x.quantity;
          [curPrice] = x.prices.filter(
            (prc) => prc.currency.label === payload.label
          );
          amount += curPrice.amount * x.quantity;
        });
        store.totalQuantity = quantity;
        store.totalAmount = amount.toFixed(2);
      }

      store.cart = storeItems;
    },
  },
});

export const { handleAttributes, addToCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
