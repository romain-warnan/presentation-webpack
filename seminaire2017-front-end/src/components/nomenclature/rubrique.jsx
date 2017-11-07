import React, { Component } from "react";
import PropTypes from "prop-types";

const Rubrique = ({ rubrique }) => null;

Fiche.propTypes = {
  rubrique: PropTypes.shape({
    code: PropTypes.string.isRequired,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  })
};

export default Rubrique;
