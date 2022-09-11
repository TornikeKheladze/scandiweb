import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProductListPage.scss";
import Item from "./Item/Item";

class ProductListPage extends Component {
  renderItems = () => {
    if (this.props.products) {
      return this.props.products.map((prd) => {
        return <Item key={prd.id} {...prd} />;
      });
    }
  };

  render() {
    return (
      <div className="productListPage">
        <h1 className="category">{this.props.name && this.props.name}</h1>
        {this.renderItems()}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return { ...store.product.products };
};

export default connect(mapStateToProps)(ProductListPage);

// {
//   fetchProducts,
//   fetchSingleProduct,
// }
