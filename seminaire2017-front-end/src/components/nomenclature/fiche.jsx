import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

class Fiche extends Component {
  render() {
    const { code, niveau, libelle } = this.props.fiche;
    const { indent, active } = this.props;
    const classes = classnames("note-container", { indent: indent, selected: active });
    return (
      <Link to={`/nomenclature/${niveau}/${code}`}>
        <li className="arbre-fiche">
          <div className={classes}>
            <span className="node-code">{code}</span>
            <span className="node-libelle">{libelle}</span>
          </div>
        </li>
      </Link>
    );
  }
}

Fiche.defaultProps = {
  indent: false,
  active: false
};

Fiche.propTypes = {
  indent: PropTypes.bool,
  active: PropTypes.bool,
  fiche: PropTypes.shape({
    code: PropTypes.string.isRequired,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  })

  // handleClick: PropTypes.func.isRequired
};

export default Fiche;
