import React, { Component } from "react";
import { ItemSuggestion } from "./autocomplete";
import removeAccents from "remove-accents";

interface DefaultSuggestionProps<T> {
  item: ItemSuggestion<T>;
  prefix: string;
}

interface HighlightProps {
  tokens: Array<string>;
  libelle: string;
}

interface Position {
  pos: number;
  length: number;
}

class DefaultSuggestion<T> extends Component<DefaultSuggestionProps<T>, any> {
  render() {
    const { label } = this.props.item;
    const tokens: Array<string> = this.props.prefix.split(" ");
    return (
      <div className="suggestion">
        <Highlight tokens={tokens} libelle={label} />
      </div>
    );
  }
}

export class Highlight extends Component<HighlightProps, any> {
  render() {
    const { tokens, libelle } = this.props;

    const positions: Array<Position> = [],
      spans: Array<any> = [];
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
  }
}

export default DefaultSuggestion;
