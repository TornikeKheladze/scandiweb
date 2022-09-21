import React, { Component } from "react";
import { connect } from "react-redux";

import logo from "../../assets/logo.png";
import down from "../../assets/down.png";
import up from "../../assets/up.png";
import cart from "../../assets/cart.png";
import "./Header.scss";

import {
  currency,
  category,
  fetchCategories,
  fetchCurrencies,
} from "../../features/headerSlice";

import { fetchProducts } from "../../features/productsSlice";
import Backdrop from "../Backdrop.js/Backdrop";
import { Link } from "react-router-dom";
import MiniCart from "../miniCart/MiniCart";
import Currencies from "./Currencies";
import Categories from "./Categories";

class Header extends Component {
  state = {
    dropDown: false,
    minicart: false,
  };
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchCurrencies();
    if (localStorage.getItem("category")) {
      this.props.category(localStorage.getItem("category"));
    }
  }
  componentDidUpdate() {
    this.defaultCurrency();
    this.defaultCategory();
    this.fetchInitialData();
  }
  fetchInitialData = () => {
    if (this.props.products.products) return;
    if (this.props.choosenCategory) {
      this.props.fetchProducts(this.props.choosenCategory);
    }
  };
  defaultCurrency = () => {
    if (this.props.choosenCurrency.label) return;
    if (this.props.currencies.length > 0) {
      this.props.currency(this.props.currencies[0]);
    }
  };
  defaultCategory = () => {
    if (this.props.choosenCategory) return;
    if (this.props.categories.length > 0)
      this.props.category(this.props.categories[0].name);
  };

  render() {
    return (
      <div className="header">
        <Categories
          categories={this.props.categories}
          category={this.props.category}
          fetchProducts={this.props.fetchProducts}
          choosenCategory={this.props.choosenCategory}
        />

        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="currenciesCart">
          <Currencies
            choosenCurrency={this.props.choosenCurrency}
            currencies={this.props.currencies}
            currency={this.props.currency}
          />
          <div
            className="cart"
            onClick={() => this.setState({ minicart: true })}
          >
            <img src={cart} alt="minicart" />
            {this.props.totalQuantity !== 0 ? (
              <p>{this.props.totalQuantity}</p>
            ) : null}
          </div>
          {this.state.minicart && (
            <MiniCart
              onBackdropClick={() => this.setState({ minicart: false })}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return { ...store.header, ...store.product, ...store.cart };
};

export default connect(mapStateToProps, {
  fetchCategories,
  fetchCurrencies,
  fetchProducts,
  currency,
  category,
})(Header);
