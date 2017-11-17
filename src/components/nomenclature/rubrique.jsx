import React from "react";
import PropTypes from "prop-types";
import Paragraphe from "./../commons/paragraphe";
import "./rubrique.css";

const Rubrique = ({ fiche }) => {
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
};

Rubrique.propTypes = {
  fiche: PropTypes.shape({
    code: PropTypes.string,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  })
};

export default Rubrique;
