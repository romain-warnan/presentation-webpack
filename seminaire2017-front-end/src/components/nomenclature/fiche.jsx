import React, { Component } from "react";
import PropTypes from "prop-types";

class Fiche extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    const { handleClick, fiche, open } = this.props;
    if (typeof handleClick === "function") {
      handleClick(fiche, open);
    }
  }

  render() {
    const { code, libelle } = this.props.fiche;

    return (
      <li className="arbre-fiche" onClick={this.handleClick}>
        <div className="note-container">
          <span className="node-code">{code}</span>
          <span className="node-libelle">{libelle}</span>
        </div>
      </li>
    );
  }
}

Fiche.propTypes = {
  open: PropTypes.bool.isRequired,
  fiche: PropTypes.shape({
    code: PropTypes.string.isRequired,
    libelle: PropTypes.string.isrequired,
    niveau: PropTypes.string.isrequired
  }),

  handleClick: PropTypes.func.isRequired
};

export default Fiche;
