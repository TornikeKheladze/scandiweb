import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSingleProduct } from "../../features/productsSlice";
import { addToCart } from "../../features/cartSlice";
import Attribute from "./Attribute";
import outOfStock from "../../assets/out-of-stock.png";
import "./Product.scss";

class Product extends Component {
  state = {
    displayedImage: null,
    showMore: false,
    showError: false,
  };
  componentDidMount() {
    const id = this.props.router.params.id;
    this.props.fetchSingleProduct(id);
  }

  renderImages = () => {
    const list = this.props.product.singleProduct.gallery
      ? this.props.product.singleProduct.gallery.map((image) => {
          return (
            <img
              onClick={() => this.setState({ displayedImage: image })}
              key={image}
              src={image}
              alt={this.props.product.singleProduct.name}
            />
          );
        })
      : null;
    return <div className="imageList">{list}</div>;
  };
  renderMainInfo = () => {
    if (this.props.product.singleProduct.gallery) {
      const {
        attributes,
        brand,
        description,
        gallery,
        id,
        inStock,
        name,
        prices,
      } = this.props.product.singleProduct;

      const [filterPrice] = prices.filter((price) => {
        return this.props.header.choosenCurrency.label === price.currency.label;
      });
      const show = !this.state.showMore ? (
        <p
          className="showMore"
          onClick={() => this.setState({ showMore: true })}
        >
          show more
        </p>
      ) : (
        <p
          className="showMore"
          onClick={() => this.setState({ showMore: false })}
        >
          show less
        </p>
      );

      const slicedDescription = !this.state.showMore
        ? description.slice(0, 300)
        : description;

      const disable = this.props.cart.attributes[id]
        ? attributes.length ===
          Object.keys(this.props.cart.attributes[id]).length
        : null;
      const renderError = () => {
        if (this.state.showError) {
          if (!inStock) {
            return <p>OUT OF STOCK!</p>;
          }
          return <p>Please choose attributes</p>;
        }
      };

      return (
        <div className="mainInfo">
          <div className="mainImgDiv">
            <img
              className="mainImg"
              src={
                this.state.displayedImage
                  ? this.state.displayedImage
                  : gallery[0]
              }
              style={!inStock ? { opacity: "0.5" } : null}
              alt={name}
            />
            {!inStock && (
              <img className="outOfStock" src={outOfStock} alt="ouf of stock" />
            )}
          </div>
          <div className="infos">
            <h3 className="brand">{brand}</h3>
            <h4 className="name">{name}</h4>
            {attributes.map((att, i) => (
              <Attribute productId={id} key={i} {...att} inStock={inStock} />
            ))}
            <h4 className="price">price:</h4>
            <h4 className="amount">
              {filterPrice.currency.symbol} {filterPrice.amount}
            </h4>
            <div className="addToCartWrapper">
              <button
                className="addToCart"
                onClick={
                  !disable
                    ? () => {
                        this.setState({ showError: true });
                      }
                    : () => {
                        this.setState({ showError: false });
                        this.props.addToCart({
                          id,
                          attributes: this.props.cart.attributes[id],
                          allAttributes: attributes,
                          quantity: 1,
                          brand,
                          name,
                          prices,
                          gallery,
                          choosenCurrency: this.props.header.choosenCurrency,
                        });
                      }
                }
              >
                ADD TO CART
              </button>
              {renderError()}
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: slicedDescription,
              }}
            ></div>
            {description.length > 300 ? show : null}
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="product">
        {this.props.product.singleProduct ? (
          <>
            {this.renderImages()}
            {this.renderMainInfo()}
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return store;
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    return <Component {...props} router={{ params }} />;
  }
  return ComponentWithRouterProp;
}

export default connect(mapStateToProps, {
  fetchSingleProduct,
  addToCart,
})(withRouter(Product));
