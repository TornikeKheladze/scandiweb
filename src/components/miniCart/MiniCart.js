import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Backdrop from "../Backdrop.js/Backdrop";
import CartData from "../CartData/CartData";
import "./MiniCart.scss";

class MiniCart extends Component {
  itemQuantity = () => {
    return (
      <h3 className="bagItems">
        My bag, <span>{this.props.cart.totalQuantity} items</span>
      </h3>
    );
  };
  totalAmount = () => {
    return (
      <div className="totalAmount">
        <h4>total:</h4>
        <h3>
          {this.props.cart.totalAmount}{" "}
          {this.props.header.choosenCurrency.symbol}
        </h3>
      </div>
    );
  };

  render() {
    return (
      <>
        <Backdrop click={this.props.onBackdropClick} type="miniCart" />
        <div
          className="miniCart"
          style={
            this.props.cart.cart.length > 2 ? { overflow: "scroll" } : null
          }
        >
          {this.itemQuantity()}
          {this.props.cart.cart.length === 0 && <h1>Bag is empty</h1>}
          <CartData
            cart={this.props.cart.cart}
            currencies={this.props.header.currencies}
            choosenCurrency={this.props.header.choosenCurrency}
          />
          {this.props.cart.cart.length > 0 && (
            <>
              {this.totalAmount()}
              <div className="buttons">
                <button
                  className="viewBag"
                  onClick={() => this.props.onBackdropClick()}
                >
                  <Link to={"/cart"}>VIEW BAG</Link>
                </button>
                <button className="checkout">CHECK OUT</button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return store;
};

export default connect(mapStateToProps)(MiniCart);
