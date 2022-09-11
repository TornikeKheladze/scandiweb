import { Component } from "react";
import { connect } from "react-redux";
import "./Item.scss";

class Item extends Component {
  currencyFilter = () => {
    const [filtered] = this.props.prices.filter((prc) => {
      return prc.currency.label === this.props.choosenCurrency.label;
    });
    return filtered;
  };
  render() {
    // console.log(this.props);
    return (
      <div className="item">
        <div>
          <img className="item-img" src={this.props.gallery[0]} />
          <h3 className="item-name">
            {this.props.brand} {this.props.name}
          </h3>
          <p className="price">
            {this.currencyFilter().amount}{" "}
            {this.currencyFilter().currency.symbol}{" "}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const choosenCurrency = store.header.choosenCurrency;
  return { choosenCurrency };
};

export default connect(mapStateToProps)(Item);
