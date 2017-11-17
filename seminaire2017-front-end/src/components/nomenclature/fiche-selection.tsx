import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Fiche from "./../../model/fiche";

interface ContentProps {
  classes: string;
  code: string;
  libelle: string;
  handleClick?: (e: any) => void;
}

interface FicheSelectionProps {
  indent?: boolean;
  active?: boolean;
  handleClick?: (fiche: Fiche) => void;
  fiche?: Fiche;
}

class RootContent extends Component<ContentProps, any> {
  render() {
    const { classes, code, libelle } = this.props;
    return (
      <Link to="/nomenclature/sections">
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

class NormalContent extends Component<ContentProps, any> {
  render() {
    const { classes, code, libelle, handleClick } = this.props;
    return (
      <li className="arbre-fiche" onClick={handleClick}>
        <div className={classes}>
          <span className="node-code">{code}</span>
          <span className="node-libelle">{libelle}</span>
        </div>
      </li>
    );
  }
}

class FicheSelection extends Component<FicheSelectionProps, any> {
  public static defaultProps: FicheSelectionProps = {
    indent: false,
    active: false
  };

  constructor(props: FicheSelectionProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
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

export default FicheSelection;
