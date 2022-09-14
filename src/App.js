import React, { Component } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import ProductListPage from "./pages/ProductListPage/ProductsListPage";
import CartPage from "./pages/CartPage";
import Product from "./pages/Product/Product";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
