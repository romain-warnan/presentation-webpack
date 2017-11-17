import React, { Component } from "react";
import Fiche from "./../../model/fiche";
import FicheComponent from "./fiche-component";
import FicheSelection from "./fiche-selection";
import "./arbre.css";

interface ArbreFicheProps {
  closeFiche: (fiche: Fiche) => void;
  items: Array<Fiche>;
  selection: Fiche;
  ficheActive: Fiche;
}

class ArbreFiche extends Component<ArbreFicheProps, any> {
  constructor(props: ArbreFicheProps) {
    super(props);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleClickBack(fiche: Fiche) {
    this.props.closeFiche(fiche);
  }

  render() {
    const { items, selection, ficheActive } = this.props;
    const liSelection = selection ? (
      <FicheSelection key={0} active={selection.code === ficheActive.code} fiche={selection} handleClick={this.handleClickBack} />
    ) : null;
    const li = items.map((fiche: Fiche, i: number) => (
      <FicheComponent key={i + 1} indent={fiche.parents.length > 0} active={fiche.code === ficheActive.code} fiche={fiche} />
    ));
    return (
      <ul className="racine">
        {liSelection}
        {li}
      </ul>
    );
  }
}

export default ArbreFiche;
