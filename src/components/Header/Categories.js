import React, { Component } from "react";
import { Link } from "react-router-dom";

class Categories extends Component {
  render() {
    return (
      <div className="categories">
        {this.props.categories &&
          this.props.categories.map(({ name }) => (
            <Link
              to={"/"}
              onClick={(e) => {
                this.props.category(name);
                this.props.fetchProducts(e.target.innerText);
                localStorage.setItem("category", e.target.innerText);
              }}
              className={name === this.props.choosenCategory ? "active" : null}
              key={name}
            >
              {name}
            </Link>
          ))}
      </div>
    );
  }
}

export default Categories;
