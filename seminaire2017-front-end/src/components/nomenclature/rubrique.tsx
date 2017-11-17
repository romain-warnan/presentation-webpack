import React, { Component } from "react";
import Fiche from "./../../model/fiche";
import Paragraphe from "./../commons/paragraphe";
import "./rubrique.css";

interface RubriqueProps {
  fiche: Fiche;
}

class Rubrique extends Component<RubriqueProps, any> {
  render() {
    const { fiche } = this.props;
    if (fiche.code) {
      const { code, libelle, niveau } = fiche;
      const noteGenerale = fiche.noteGenerale ? <Paragraphe title="Note Générale" content={fiche.noteGenerale} /> : null;
      const comprend = fiche.comprend ? <Paragraphe title="Comprend" content={fiche.comprend} /> : null;
      const neComprendPas = fiche.neComprendPas ? <Paragraphe title="Ne comprend pas" content={fiche.neComprendPas} /> : null;
      return (
        <div className="fiche">
          <h1 className="titre">{`${niveau} ${code} : ${libelle}`}</h1>
          {noteGenerale}
          {comprend}
          {neComprendPas}
        </div>
      );
    } else {
      return <div className="fiche" />;
    }
  }
}

export default Rubrique;
