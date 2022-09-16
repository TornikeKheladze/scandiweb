import React, { Component } from "react";
import { connect } from "react-redux";

import { handleAttributes } from "../../features/cartSlice";

class Attribute extends Component {
  componentDidMount() {}

  attributeItems = () => {
    const list = this.props.items.map((x, i) => {
      let choosenAttribute = null;
      const attribs = this.props.attributes[this.props.productId];

      if (attribs) {
        if (attribs[this.props.id]) {
          choosenAttribute = attribs[this.props.id].value;
        }
      }

      const swatchStyle =
        this.props.type === "swatch" ? { backgroundColor: x.value } : null;

      const choosenStyle = () => {
        let style = null;
        if (x.value === choosenAttribute) {
          if (this.props.type === "swatch") {
            style = { boxShadow: "0px 0px 0px 3px rgba(94,206,123,1)" };
          } else {
            style = { backgroundColor: "black", color: "white" };
          }
        }
        return style;
      };
      return (
        <p
          style={{ ...swatchStyle, ...choosenStyle() }}
          key={i}
          onClick={
            this.props.inStock
              ? () => {
                  this.props.handleAttributes({
                    ...x,
                    id: this.props.id,
                    productId: this.props.productId,
                  });
                }
              : null
          }
        >
          {x.value}
        </p>
      );
    });
    return list;
  };

  render() {
    return (
      <div className={`attribute ${this.props.type}`}>
        <h4>{this.props.id}:</h4>
        <div className="attList">{this.attributeItems()}</div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return store.cart;
};

export default connect(mapStateToProps, { handleAttributes })(Attribute);
