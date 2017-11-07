import React, { Component } from "react";
import PropTypes from "prop-types";
import Fiche from "./fiche";
import FicheSelection from "./fiche-selection";
import "./arbre.css";

class ArbreFiche extends Component {
  constructor(props) {
    super(props);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickBack(fiche) {
    this.props.closeFiche(fiche);
  }

  render() {
    const { items, selection, ficheActive } = this.props;
    const liSelection = selection ? (
      <FicheSelection key={0} active={selection.code === ficheActive.code} fiche={selection} handleClick={this.handleClickBack} />
    ) : null;
    const li = items.map((fiche, i) => <Fiche key={i + 1} indent={fiche.parents.length > 0} active={fiche.code === ficheActive.code} fiche={fiche} />);
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
  items: PropTypes.array.isRequired,
  code: PropTypes.string,
  niveau: PropTypes.string
};

export default ArbreFiche;
