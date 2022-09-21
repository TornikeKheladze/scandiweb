import React, { Component } from "react";
import leftButton from "../../assets/left.png";
import rightButton from "../../assets/right.png";

class CartImage extends Component {
  state = {
    activeImg: 0,
  };
  setActiveImage = (value, gallery) => {
    if (gallery.length === 1) return;
    this.setState((prevState) => {
      if (value === "prev") {
        if (prevState.activeImg === 0) {
          return { activeImg: gallery.length - 1 };
        } else {
          return { activeImg: prevState.activeImg - 1 };
        }
      }
      if (value === "next") {
        if (prevState.activeImg === gallery.length - 1) {
          return { activeImg: 0 };
        }
        return { activeImg: prevState.activeImg + 1 };
      }
    });
  };
  render() {
    return (
      <div className="image">
        <img src={this.props.gallery[this.state.activeImg]} />

        {this.props.type === "cartPage" && this.props.gallery.length > 1 ? (
          <div className="arrows">
            <img
              src={leftButton}
              alt="leftButton"
              onClick={() => this.setActiveImage("prev", this.props.gallery)}
            />
            <img
              src={rightButton}
              alt="rightButton"
              onClick={() => this.setActiveImage("next", this.props.gallery)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default CartImage;
