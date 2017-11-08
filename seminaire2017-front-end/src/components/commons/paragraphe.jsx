import React from "react";
import PropTypes from "prop-types";

const Paragraphe = ({ title, content }) => (
  <div className="paragraphe">
    <h2 className="titre">{`${title} : `}</h2>
    <div className="contenu" dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

Paragraphe.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default Paragraphe;
