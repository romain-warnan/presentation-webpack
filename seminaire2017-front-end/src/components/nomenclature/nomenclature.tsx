import React, { Component } from "react";
import ArbreFiche from "./arbre-fiche-container";
import Rubrique from "./rubrique-container";

interface NomenclatureProps {
  setNavIndex: (index: number) => void;
  showFiche: (code: string) => void;
  openSections: () => void;
  match?: any;
}

class Nomenclature extends Component<NomenclatureProps, any> {
  componentWillMount() {
    this.props.setNavIndex(2);
    if (this.props.match.path === "/nomenclature/sections") {
      this.props.openSections();
    } else {
      const { code } = this.props.match.params;
      this.props.showFiche(code);
    }
  }

  componentWillReceiveProps(ownProps: NomenclatureProps) {
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

export default Nomenclature;
