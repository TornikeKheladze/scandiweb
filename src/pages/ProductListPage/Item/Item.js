import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Item.scss";
import greenCart from "../../../assets/hover-cart.png";
import outOfStock from "../../../assets/out-of-stock.png";
import { addToCart } from "../../../features/cartSlice";

class Item extends Component {
  state = {
    showCartButton: false,
  };
  currencyFilter = () => {
    const [filtered] = this.props.prices.filter((prc) => {
      return prc.currency.label === this.props.choosenCurrency.label;
    });
    return filtered;
  };
  cartButton = () => {
    const { brand, name, prices, gallery, id, attributes } = this.props;
    let defaultAttributes = {};
    this.props.attributes.forEach((att) => {
      let attr = { ...att.items[0], id: att.id, productId: id };
      defaultAttributes[att.id] = attr;
    });

    return (
      this.state.showCartButton && (
        <img
          src={greenCart}
          className="hoverButton"
          onClick={() => {
            this.props.addToCart({
              id,
              attributes: defaultAttributes,
              allAttributes: attributes,
              quantity: 1,
              brand,
              name,
              prices,
              gallery,
              choosenCurrency: this.props.choosenCurrency,
            });
          }}
          alt="cartButton"
        />
      )
    );
  };

  render() {
    return (
      <div
        className="parentItem"
        onMouseEnter={() => this.setState({ showCartButton: true })}
        onMouseLeave={() => this.setState({ showCartButton: false })}
      >
        <Link to={`/product/${this.props.id}`} className="item">
          <div>
            <img
              className="item-img"
              src={this.props.gallery[0]}
              alt="productImg"
              style={!this.props.inStock ? { opacity: "0.5" } : null}
            />
            {!this.props.inStock && (
              <img className="outOfStock" src={outOfStock} alt="ouf of stock" />
            )}
            <h3 className="item-name">
              {this.props.brand} {this.props.name}
            </h3>
            <p className="price">
              {this.currencyFilter().amount}
              {this.currencyFilter().currency.symbol}
            </p>
          </div>
        </Link>
        {this.props.inStock && this.cartButton()}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const choosenCurrency = store.header.choosenCurrency;
  return { choosenCurrency };
};

export default connect(mapStateToProps, { addToCart })(Item);
