import React, { Component } from "react";
import PropTypes from "prop-types";
import Fiche from "./fiche";
import "./arbre.css";

class ArbreFiche extends Component {
  constructor(props) {
    super(props);
    this.handleClikFiche = this.handleClikFiche.bind(this);
    this.current = null;
  }

  handleClikFiche(fiche, open) {
    this.props.openFiche(fiche);
  }

  componentWillMount() {}

  render() {
    const { items, selection } = this.props;
    const li = items.map((fiche, i) => <Fiche key={i + 1} open={false} fiche={fiche} handleClick={this.handleClikFiche} />);
    const liSelection = selection ? <Fiche key={0} open={true} fiche={selection} handleClick={this.handleClikFiche} /> : null;
    return (
      <ul className="racine">
        {liSelection}
        {li}
      </ul>
    );
  }
}

ArbreFiche.propTypes = {
  selection: PropTypes.object,
  items: PropTypes.array.isRequired
};

export default ArbreFiche;
