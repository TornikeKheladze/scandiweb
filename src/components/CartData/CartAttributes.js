import React, { Component } from "react";

class CartAttributes extends Component {
  renderAttributeItems = () => {
    return this.props.items.map((item) => {
      const swatchStyle =
        this.props.type === "swatch"
          ? {
              backgroundColor: item.value,
              fontSize: 0,
              height: "16px",
              minWidth: "16px",
            }
          : null;

      const choosenStyle = () => {
        let style = null;
        if (item.value === this.props.choosen[this.props.name].value) {
          if (this.props.type === "swatch") {
            style = { boxShadow: "0px 0px 0px 3px rgba(94,206,123,1)" };
          } else {
            style = { backgroundColor: "black", color: "white" };
          }
        }
        return style;
      };
      return (
        <p style={{ ...swatchStyle, ...choosenStyle() }} key={item.id}>
          {item.value}
        </p>
      );
    });
  };
  render() {
    return (
      <div className="attributeItems">
        <h4 className="attributeId">{this.props.id}</h4>
        <div className="list">{this.renderAttributeItems()}</div>
      </div>
    );
  }
}

export default CartAttributes;
