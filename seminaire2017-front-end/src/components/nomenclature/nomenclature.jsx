import React, { Component } from "react";
import PropTypes from "prop-types";
import ArbreFiche from "./arbre-fiche-container";
import Rubrique from "./rubrique-container";

class Nomenclature extends Component {
  componentWillMount() {
    if (this.props.match.path === "/nomenclature/sections") {
      this.props.openSections();
    } else {
      const { code } = this.props.match.params;
      this.props.showFiche(code);
    }
  }

  componentWillReceiveProps(ownProps) {
    const { code } = ownProps.match.params;
    if (ownProps.match.path === "/nomenclature/sections") {
      this.props.openSections();
    } else {
      this.props.showFiche(code);
    }
  }

  render() {
    return [
      <div key="fiches" className="fiches">
        <ArbreFiche />
      </div>,

      <Rubrique key="rubrique" />
    ];
  }
}

Nomenclature.propTypes = {
  rubrique: PropTypes.shape({
    code: PropTypes.string.isRequired,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  })
};

export default Nomenclature;
