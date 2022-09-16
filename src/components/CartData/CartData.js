import React, { Component } from "react";
import { connect } from "react-redux";

import CartAttributes from "./CartAttributes";
import { addToCart, removeItem } from "../../features/cartSlice";

class CartData extends Component {
  state = {
    activeImg: 0,
  };
  price = (prices, quantity) => {
    const [filtered] = prices.filter(
      (prc) => prc.currency.label === this.props.choosenCurrency.label
    );
    return (
      <h4 className="price">
        {filtered.currency.symbol} {(filtered.amount * quantity).toFixed(2)}
      </h4>
    );
  };
  mappedData = () => {
    if (this.props.cart) {
      return this.props.cart.map((item, i) => {
        return (
          <div className="cartItem" key={i}>
            <div className="itemInfo">
              <div>
                <h3 className="brand">{item.brand}</h3>
                <h3 className="name">{item.name}</h3>
              </div>
              {this.price(item.prices, item.quantity)}
              {item.allAttributes.map((attr) => (
                <CartAttributes
                  {...attr}
                  key={attr.id}
                  choosen={item.attributes}
                />
              ))}
            </div>
            <div className="right">
              <div className="addRemove">
                <button onClick={() => this.props.addToCart({ ...item })}>
                  +
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => this.props.removeItem(i)}>-</button>
              </div>
              <div className="image">
                <img src={item.gallery[0]} />
              </div>
            </div>
          </div>
        );
      });
    }
  };
  render() {
    return <>{this.mappedData()}</>;
  }
}

export default connect(null, { addToCart, removeItem })(CartData);
