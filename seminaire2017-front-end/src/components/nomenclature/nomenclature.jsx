import React, { Component } from "react";
import ArbreFiche from "./arbre-fiche-container";

class Nomenclature extends Component {
  componentWillMount() {
    this.props.loadSections();
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
