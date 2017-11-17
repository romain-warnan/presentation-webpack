import React, { Component } from "react";
import { ItemSuggestion } from "./../autocomplete/autocomplete";
import { Highlight } from "./../autocomplete/default-suggestion";
import { fetchFiche } from "./../../store/get-fiche";
import Fiche from "./../../model/fiche";

interface CustomItemSuggestionProps {
  item: ItemSuggestion<string>;
  prefix: string;
}

class CustomItemSuggestion extends Component<CustomItemSuggestionProps, any> {
  constructor(props: CustomItemSuggestionProps) {
    super(props);
    this.state = { niveau: null, code: null, libelle: null, ready: false };
  }

  componentDidMount() {
    fetchFiche(this.props.item.value).then((fiche: Fiche) => {
      this.setState({ ready: true, code: fiche.code, libelle: fiche.libelle, niveau: fiche.niveau });
    });
  }

  render() {
    if (this.state.ready) {
      const { code, libelle, niveau } = this.state;
      const tokens = this.props.prefix.split(" ");
      return (
        <div className="suggestion">
          <span className="suggestion-libelle">
            <Highlight tokens={tokens} libelle={libelle} />
          </span>
          <span className="complements">
            <span className="suggestion-niveau">
              <Highlight tokens={tokens} libelle={niveau} />
            </span>
            <span className="suggestion-code">
              <Highlight tokens={tokens} libelle={code} />
            </span>
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CustomItemSuggestion;
