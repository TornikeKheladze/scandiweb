import { Component } from "react";
import "./Backdrop.scss";
class Backdrop extends Component {
  render() {
    return (
      <div
        style={
          this.props.type === "miniCart"
            ? {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }
            : null
        }
        onClick={this.props.click}
        className="backdrop"
      ></div>
    );
  }
}
export default Backdrop;
