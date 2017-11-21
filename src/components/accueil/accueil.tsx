import React, { Component } from "react";
// import PropTypes from "prop-types";
import Paragraphe from "./../commons/paragraphe";
import { AutocompleteString } from "./../autocomplete/autocomplete";
import CustomItemSuggestion from "./custom-suggestion";
import { PageHeader, Panel } from "react-bootstrap";
import { fetchSuggestion } from "./../../store/fetch-solr";
import Fiche from "./../../model/fiche";
import { ItemSuggestion } from "./../autocomplete/autocomplete";
import "./accueil.css";

const suggestionProvider = (prefix: string): Promise<Array<ItemSuggestion<string>>> => {
  return fetchSuggestion(prefix).then(suggestions => {
    return suggestions.map((s: Fiche) => ({ value: s.code, label: s.libelle }));
  });
};

// const suggestionProviderFiche = (prefix: string): Promise<Array<ItemSuggestion<Fiche>>> => {
//   return fetchSuggestion(prefix).then(suggestions => {
//     return suggestions.map((s: Fiche): ItemSuggestion<Fiche> => ({ value: s, label: s.libelle }));
//   });
// };
// export const AutocompleteFiche: new () => Autocomplete<Fiche> = Autocomplete as any;

interface RubriqueProps {
  fiche: Fiche;
}

class Rubrique extends Component<RubriqueProps> {
  render() {
    const { fiche } = this.props;
    const { code, libelle, niveau } = fiche;
    const noteGenerale = fiche.noteGenerale ? <Paragraphe title="Note Générale" content={fiche.noteGenerale} /> : null;
    const comprend = fiche.comprend ? <Paragraphe title="Comprend" content={fiche.comprend} /> : null;
    const neComprendPas = fiche.neComprendPas ? (
      <Paragraphe title="Ne comprend pas" content={fiche.neComprendPas} />
    ) : null;
    return (
      <Panel header={`${niveau} ${code} – ${libelle}`} bsStyle="primary">
        {noteGenerale}
        {comprend}
        {neComprendPas}
      </Panel>
    );
  }
}

interface AccueilProps {
  displayFiche: (item: string) => void;
  fiche: Fiche;
}

class Accueil extends Component<AccueilProps> {
  constructor(props: AccueilProps) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(item: ItemSuggestion<string>) {
    this.props.displayFiche(item.value);
  }

  render() {
    const rubrique = this.props.fiche.code != null ? <Rubrique fiche={this.props.fiche} /> : null;
    return (
      <div className="accueil">
        <PageHeader>Consulter la nafrev2 avec react et redux</PageHeader>
        <div className="suggestions">
          <AutocompleteString
            suggestionProvider={suggestionProvider}
            onSelect={this.handleSelect}
            itemComponent={CustomItemSuggestion}
          />
        </div>
        <div className="rubrique">{rubrique}</div>
      </div>
    );
  }
}

export default Accueil;
