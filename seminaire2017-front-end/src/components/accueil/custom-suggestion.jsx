import React, { Component } from "react";
import PropTypes from "prop-types";
import { Highlight } from "./../autocomplete/default-suggestion";
import { fetchFiche } from "./../../store/get-fiche";

class ItemSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = { niveau: null, code: null, libelle: null, ready: false };
  }

  componentWillMount() {
    fetchFiche(this.props.item.value).then(fiche => {
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

ItemSuggestion.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })
};

export default ItemSuggestion;
