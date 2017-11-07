import React from "react";
import PropTypes from "prop-types";
import "./rubrique.css";

const Paragraphe = ({ title, content }) => (
  <div className="paragraphe">
    <h2 className="titre">{`${title} : `}</h2>
    <div className="contenu" dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

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
    code: PropTypes.string.isRequired,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  })
};

export default Rubrique;
