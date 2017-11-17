import React, { Component } from "react";
import PropTypes from "prop-types";
import removeAccents from "remove-accents";

class DefaultSuggestion extends Component {
  render() {
    const { label } = this.props.item;
    const tokens = this.props.prefix.split(" ");
    return (
      <div className="suggestion">
        <Highlight tokens={tokens} libelle={label} />
      </div>
    );
  }
}

export const Highlight = ({ tokens, libelle }) => {
  const positions = [],
    spans = [];
  const libelleClean = removeAccents(libelle).toLowerCase();
  tokens.forEach(token => {
    const index = libelleClean.indexOf(removeAccents(token).toLowerCase());
    if (index >= 0) {
      positions.push({ pos: index, length: token.length });
    }
  });
  positions.sort((a, b) => {
    if (a.pos < b.pos) return -1;
    else if (a.pos > b.pos) return 1;
    else return 0;
  });
  let curr = 0,
    nb = 0;
  positions.forEach(w => {
    const { pos, length } = w;
    if (curr !== pos) {
      spans.push(<span key={nb++}>{libelle.substring(curr, pos)}</span>);
    }

    spans.push(
      <span key={nb++} className="highlight">
        {libelle.substring(pos, pos + length)}
      </span>
    );
    curr = pos + length;
  });
  if (curr < libelle.length) {
    spans.push(<span key={nb++}>{libelle.substring(curr, libelle.length)}</span>);
  }

  return spans;
};

DefaultSuggestion.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })
};

export default DefaultSuggestion;
