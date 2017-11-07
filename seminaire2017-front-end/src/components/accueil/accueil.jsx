import React, { Component } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./../autocomplete/autocomplete";
import { fetchSuggestion } from "./../../store/fetch-suggestion";
import { fetchFiche } from "./../../store/get-fiche";
import "./accueil.css";

class ItemSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = { code: null, libelle: null, ready: false };
  }

  componentWillMount() {
    fetchFiche(this.props.item.value).then(fiche => {
      this.setState({ ready: true, code: fiche.code, libelle: fiche.libelle });
    });
  }

  render() {
    if (this.state.ready) {
      const { code, libelle } = this.state;
      return [
        <span key="code" className="suggestion-code">
          {code}
        </span>,
        <span key="libelle" className="suggestion-libelle">
          {libelle}
        </span>
      ];
    } else {
      return null;
    }
  }
}

const suggestionProvider = prefix => {
  return fetchSuggestion(prefix).then(suggestions => {
    return suggestions.map(s => ({ value: s.code, label: s.libelle }));
  });
};

class Accueil extends Component {
  render() {
    return (
      <div className="accueil">
        <div className="suggestions">
          <p>pppppppppppppppp kkkkkkkkkkkkkkkkkkkkkk jjjjjjjjjjjjj</p>
          <Autocomplete suggestionProvider={suggestionProvider} onChange={this.handleChange} itemComponent={ItemSuggestion} />
          <p>pppppppppppppppp kkkkkkkkkkkkkkkkkkkkkk jjjjjjjjjjjjj</p>
        </div>
      </div>
    );
  }
}

Accueil.propTypes = {};

export default Accueil;
