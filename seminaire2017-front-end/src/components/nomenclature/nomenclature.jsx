import React, { Component } from "react";
import ArbreFiche from "./arbre-fiche-container";

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
      <div key="fiche" className="fiche">
        fiche
      </div>
    ];
  }
}

export default Nomenclature;
