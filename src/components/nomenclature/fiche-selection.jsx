import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

const RootContent = ({ classes, code, libelle }) => (
  <Link to="/nomenclature/sections">
    <li className="arbre-fiche" onClick={this.handleClick}>
      <div className={classes}>
        <span className="node-code">{code}</span>
        <span className="node-libelle">{libelle}</span>
      </div>
    </li>
  </Link>
);

const NormalContent = ({ classes, code, libelle, handleClick }) => (
  <li className="arbre-fiche" onClick={handleClick}>
    <div className={classes}>
      <span className="node-code">{code}</span>
      <span className="node-libelle">{libelle}</span>
    </div>
  </li>
);

class FicheSelection extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    const { handleClick, fiche } = this.props;
    if (typeof handleClick === "function") {
      handleClick(fiche);
    }
  }

  render() {
    const { code, libelle, parents } = this.props.fiche;
    const { indent, active } = this.props;
    const classes = classnames("note-container", { indent: indent, selected: active });
    const content =
      parents.length === 0 ? (
        <RootContent classes={classes} code={code} libelle={libelle} />
      ) : (
        <NormalContent classes={classes} code={code} libelle={libelle} handleClick={this.handleClick} />
      );
    return content;
  }
}

FicheSelection.defaultProps = {
  indent: false,
  active: false
};

FicheSelection.propTypes = {
  indent: PropTypes.bool,
  active: PropTypes.bool,
  fiche: PropTypes.shape({
    code: PropTypes.string.isRequired,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  }),
  handleClick: PropTypes.func.isRequired
};

export default FicheSelection;
