import React, { Component } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./../autocomplete/autocomplete";
import ItemSuggestion from "./custom-suggestion";
import { fetchSuggestion } from "./../../store/fetch-suggestion";
import "./accueil.css";

const suggestionProvider = prefix => {
  return fetchSuggestion(prefix).then(suggestions => {
    return suggestions.map(s => ({ value: s.code, label: s.libelle }));
  });
};

class Accueil extends Component {
  handleSelect(item) {
    console.log(item);
  }

  render() {
    return (
      <div className="accueil">
        <div className="suggestions">
          <p>pppppppppppppppp kkkkkkkkkkkkkkkkkkkkkk jjjjjjjjjjjjj</p>
          <Autocomplete suggestionProvider={suggestionProvider} onSelect={this.handleSelect} itemComponent={ItemSuggestion} />
          <p>pppppppppppppppp kkkkkkkkkkkkkkkkkkkkkk jjjjjjjjjjjjj</p>
        </div>
      </div>
    );
  }
}
//
Accueil.propTypes = {};

export default Accueil;
