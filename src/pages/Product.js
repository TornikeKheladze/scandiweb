import React, { Component } from "react";
import history from "../history";
import { parsePath } from "react-router-dom";

class Product extends Component {
  render() {
    console.log(this.props);

    return <div>product</div>;
  }
}

export default Product;
