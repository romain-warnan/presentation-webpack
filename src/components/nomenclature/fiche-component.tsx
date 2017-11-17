import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Fiche from "./../../model/fiche";

interface FicheProps {
  indent?: boolean;
  active?: boolean;
  fiche: Fiche;
}

class FicheComponent extends Component<FicheProps, any> {
  public static defaultProps: FicheProps = {
    indent: false,
    active: false,
    fiche: null
  };
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

export default FicheComponent;
