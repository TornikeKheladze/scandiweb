import React, { Component } from "react";
import { connect } from "react-redux";

import CartData from "../../components/CartData/CartData";
import "./CartPage.scss";

class CartPage extends Component {
  calculateTax = () => {
    return (this.props.cart.totalAmount * 0.21).toFixed(2);
  };

  renderOrderDiv = () => {
    if (this.props.cart.cart.length !== 0) {
      return (
        <div className="order">
          <p className="tax">
            Tax 21%:
            <span>
              {this.props.choosenCurrency.symbol} {this.calculateTax()}
            </span>
          </p>
          <p className="quantity">
            Quantity:<span>{this.props.cart.totalQuantity}</span>
          </p>
          <p className="total">
            Total:
            <span>
              {this.props.choosenCurrency.symbol} {this.props.cart.totalAmount}
            </span>
          </p>
          <button>ORDER</button>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="cartPage">
        <h1 className="pageName">
          CART {this.props.cart.cart.length === 0 ? "IS EMPTY" : null}
        </h1>
        <div className="itemsList">
          <CartData
            cart={this.props.cart.cart}
            currencies={this.props.currencies}
            choosenCurrency={this.props.choosenCurrency}
            type="cartPage"
          />
        </div>
        {this.renderOrderDiv()}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    cart: store.cart,
    currencies: store.header.currencies,
    choosenCurrency: store.header.choosenCurrency,
  };
};

export default connect(mapStateToProps)(CartPage);
