import React, { Component } from "react";

import Backdrop from "../Backdrop.js/Backdrop";
import down from "../../assets/down.png";
import up from "../../assets/up.png";

class Currencies extends Component {
  state = {
    dropDown: false,
  };
  render() {
    return (
      <>
        {this.state.dropDown && (
          <Backdrop click={() => this.setState({ dropDown: false })} />
        )}
        <ul className="currencies">
          <li
            className="firstLi"
            onClick={() => this.setState({ dropDown: !this.state.dropDown })}
          >
            {this.props.choosenCurrency.symbol}
            <span>
              <img src={this.state.dropDown ? up : down} />
            </span>
          </li>
          <div className={`${this.state.dropDown && "active"}`}>
            {this.props.currencies &&
              this.state.dropDown &&
              this.props.currencies.map(({ label, symbol }) => (
                <li
                  className={
                    label === this.props.choosenCurrency.label
                      ? "choosen"
                      : null
                  }
                  onClick={() => {
                    this.props.currency({ label, symbol });
                    this.setState({ dropDown: false });
                  }}
                  key={label}
                >
                  {label}
                  {symbol}
                </li>
              ))}
          </div>
        </ul>
      </>
    );
  }
}

export default Currencies;
