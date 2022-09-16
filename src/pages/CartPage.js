import React, { Component } from "react";
import { connect } from "react-redux";

class CartPage extends Component {
  render() {
    console.log(this.props);
    return <div></div>;
  }
}
const mapStateToProps = (store) => {
  return store.cart;
};

export default connect(mapStateToProps)(CartPage);
