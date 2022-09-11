import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsByCategory, getSingleProduct } from "../API";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category) => {
    return getProductsByCategory(category)
      .then((res) => res.json())
      .then((res) => res.data);
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    return getSingleProduct(id)
      .then((res) => res.json())
      .then((res) => res.data);
  }
);

const initialState = {
  products: {},
  singleProduct: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  extraReducers: {
    [fetchProducts.fulfilled]: (store, { payload }) => {
      store.products = payload.category;
    },
    [fetchSingleProduct.fulfilled]: (store, { payload }) => {
      store.singleProduct = payload.product;
    },
  },
});

export default productsSlice.reducer;
