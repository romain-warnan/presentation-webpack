import React, { Component } from "react";
import PropTypes from "prop-types";
import "./autocomplete.css";
import cross from "./cross.svg";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.counter = null;
    this.timer = null;
    this.state = { value: "", items: [], prefix: "" };
    this.handleClick = this.handleClick.bind(this);
    this.handleSup = this.handleSup.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState((prevState, props) => {
      if (this.timer != null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        const tokens = value.trim().split(" ");
        const query = tokens.reduce((acc, curr) => {
          return `${acc} ${curr}*`;
        }, "");
        if (query.length > 0) {
          this.search(query);
        }
      }, 350);
      return { value };
    });
  }

  search(prefix) {
    this.props.suggestionProvider(prefix).then(items => {
      this.setState({ ...this.state, items, prefix });
    });
  }

  handleClick(item) {
    // TODO
  }

  handleSup(e) {
    this.setState({ ...this.state, value: "", prefix: "", items: [] });
  }

  render() {
    const Composant = this.props.itemComponent;
    const items = this.state.items.map((item, i) => {
      let boundItemClick = this.handleClick.bind(this, item);
      return (
        <div onClick={boundItemClick} key={i} className="autocompleter-item">
          <Composant item={item} prefix={this.state.prefix} />
        </div>
      );
    });
    const iconeCross =
      this.state.value.trim().length > 0 ? (
        <span className="cross" onClick={this.handleSup}>
          <img src={cross} />
        </span>
      ) : null;

    const listeItems = items.length > 0 ? <div className="items-liste">{items}</div> : null;
    return (
      <div className="autocomplete">
        <div className="input-zone">
          {iconeCross}
          <input type="text" placeholder="Veuillez saisir..." onChange={this.handleChange} value={this.state.value} />
        </div>
        {listeItems}
      </div>
    );
  }
}

export default Autocomplete;
