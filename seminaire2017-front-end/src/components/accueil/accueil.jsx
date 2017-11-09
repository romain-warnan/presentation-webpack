import React, { Component } from "react";
// import PropTypes from "prop-types";
import Paragraphe from "./../commons/paragraphe";
import Autocomplete from "./../autocomplete/autocomplete";
import ItemSuggestion from "./custom-suggestion";
import { PageHeader } from "react-bootstrap";
import { fetchSuggestion } from "./../../store/fetch-solr";
import { Panel } from "react-bootstrap";
import "./accueil.css";

const suggestionProvider = prefix => {
  return fetchSuggestion(prefix).then(suggestions => {
    return suggestions.map(s => ({ value: s.code, label: s.libelle }));
  });
};

const Rubrique = ({ fiche }) => {
  const { code, libelle, niveau } = fiche;
  const noteGenerale = fiche.noteGenerale ? <Paragraphe title="Note Générale" content={fiche.noteGenerale} /> : null;
  const comprend = fiche.comprend ? <Paragraphe title="Comprend" content={fiche.comprend} /> : null;
  const neComprendPas = fiche.neComprendPas ? <Paragraphe title="Ne comprend pas" content={fiche.neComprendPas} /> : null;
  return (
    <Panel header={`${niveau} ${code} – ${libelle}`} bsStyle="primary">
      {noteGenerale}
      {comprend}
      {neComprendPas}
    </Panel>
  );
};

class Accueil extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(item) {
    this.props.displayFiche(item.value);
  }

  render() {
    const rubrique = this.props.fiche.code != null ? <Rubrique fiche={this.props.fiche} /> : null;
    return (
      <div className="accueil">
        <PageHeader>Consulter la nafrev2 avec react et redux</PageHeader>

        <div className="suggestions">
          <Autocomplete suggestionProvider={suggestionProvider} onSelect={this.handleSelect} itemComponent={ItemSuggestion} />
        </div>
        <div className="rubrique">{rubrique}</div>
      </div>
    );
  }
}

export default Accueil;
