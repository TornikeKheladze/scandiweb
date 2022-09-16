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
  renderCategories = () => {
    return (
      <div className="categories">
        {this.props.categories &&
          this.props.categories.map(({ name }) => (
            <p
              onClick={(e) => {
                this.props.category(name);
                this.props.fetchProducts(e.target.innerText);
                localStorage.setItem("category", e.target.innerText);
              }}
              className={name === this.props.choosenCategory ? "active" : null}
              key={name}
            >
              <Link to="/">{name}</Link>
            </p>
          ))}
      </div>
    );
  };
  itemQuantity = () => {
    let initial = 0;
    this.props.cart.forEach((item, i) => {
      initial += item.quantity;
    });
    return initial !== 0 ? <p>{initial}</p> : null;
  };
  renderCurrencies = () => {
    return (
      <>
        {this.state.dropDown && (
          <Backdrop click={() => this.setState({ dropDown: false })} />
        )}
        <ul
          className="currencies"
          style={
            this.state.dropDown
              ? {
                  boxShadow: " 0px 0px 9px 1px rgba(56, 50, 50, 1)",
                }
              : null
          }
        >
          <li
            className="firstLi"
            onClick={() => this.setState({ dropDown: !this.state.dropDown })}
          >
            {this.props.choosenCurrency.symbol}
            <span>
              <img src={this.state.dropDown ? up : down} />
            </span>
          </li>

          {this.props.currencies &&
            this.state.dropDown &&
            this.props.currencies.map(({ label, symbol }) => (
              <li
                className={
                  label === this.props.choosenCurrency.label ? "choosen" : null
                }
                onClick={() => {
                  this.props.currency({ label, symbol });
                  this.setState({ dropDown: false });
                }}
                key={label}
              >
                {label}
                {symbol}
              </li>
            ))}
        </ul>
      </>
    );
  };

  render() {
    return (
      <div className="header">
        {this.renderCategories()}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {this.renderCurrencies()}
        <div className="cart">
          <img
            onClick={() => this.setState({ minicart: true })}
            src={cart}
            alt="minicart"
          />
          {this.itemQuantity()}
        </div>
        {this.state.minicart && (
          <MiniCart
            onBackdropClick={() => this.setState({ minicart: false })}
          />
        )}
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
