import { getCategories, getCurrencies } from "../API";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    return getCategories.then((res) => res.json()).then((res) => res.data);
  }
);

export const fetchCurrencies = createAsyncThunk(
  "products/fetchCurrencies",
  async () => {
    return getCurrencies.then((res) => res.json()).then((res) => res.data);
  }
);

const initialState = {
  choosenCategory: "",
  categories: [],
  choosenCurrency: {},
  currencies: [],
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    currency: (store, { payload }) => {
      store.choosenCurrency = payload;
    },
    category: (store, { payload }) => {
      store.choosenCategory = payload;
    },
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (store, { payload }) => {
      store.categories = payload.categories;
    },
    [fetchCurrencies.fulfilled]: (store, { payload }) => {
      store.currencies = payload.currencies;
    },
  },
});

export const { currency, category } = headerSlice.actions;

export default headerSlice.reducer;
