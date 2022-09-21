import React, { Component } from "react";
import { connect } from "react-redux";

import CartAttributes from "./CartAttributes";
import { addToCart, removeItem } from "../../features/cartSlice";
import CartImage from "../../pages/CartPage/CartImage";

class CartData extends Component {
  price = (prices) => {
    const [filtered] = prices.filter(
      (prc) => prc.currency.label === this.props.choosenCurrency.label
    );

    return (
      <h4 className="price">
        {filtered.currency.symbol} {filtered.amount.toFixed(2)}
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
              {this.price(item.prices)}
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
                <button
                  onClick={() =>
                    this.props.removeItem({
                      index: i,
                      ...this.props.choosenCurrency,
                    })
                  }
                >
                  -
                </button>
              </div>
              <CartImage gallery={item.gallery} type={this.props.type} />
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
