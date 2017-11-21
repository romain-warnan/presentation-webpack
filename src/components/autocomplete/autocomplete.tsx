import React, { Component } from "react";
import "./autocomplete.css";
import cross from "./cross.svg";

export interface ItemSuggestion<T> {
  value: T;
  label: string;
}

interface AutocompleteProps<T> {
  suggestionProvider: (prefix: string) => Promise<Array<ItemSuggestion<T>>>;
  onSelect: (item: ItemSuggestion<T>) => void;
  items?: Array<ItemSuggestion<T>>;
  itemComponent: React.ComponentClass<ItemRendererComponent<T>>;
}

interface ItemRendererComponent<T> {
  item: ItemSuggestion<T>;
  prefix: string;
}

interface AutocompleteState<T> {
  value: string;
  displayItems: boolean;
  overItems: boolean;
  items: Array<ItemSuggestion<T>>;
}

class Autocomplete<U> extends Component<AutocompleteProps<U>, AutocompleteState<U>> {
  timer: number;
  constructor(props: AutocompleteProps<U>) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.timer = null;
    this.state = { value: "", items: [], displayItems: false, overItems: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleSup = this.handleSup.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState((prevState, props) => {
      if (this.timer != null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = window.setTimeout(() => {
        this.search(value.trim());
      }, 350);
      return { value, items: [], displayItems: false, overItems: false };
    });
  }

  search(prefix: string) {
    const prefixTrim = prefix.trim();
    if (prefixTrim !== "*" && prefixTrim !== "") {
      this.props.suggestionProvider(prefix).then((items: Array<ItemSuggestion<U>>) => {
        const displayItems = items.length > 0;
        this.setState({ ...this.state, items, displayItems });
      });
    } else {
      this.setState({ ...this.state, items: [], displayItems: false, overItems: false });
    }
  }

  handleBlur(e: React.ChangeEvent<EventTarget>) {
    if (!this.state.overItems) {
      this.setState({ ...this.state, displayItems: false, overItems: false });
    }
  }

  handleFocus() {
    this.setState({ ...this.state, displayItems: this.state.items.length > 0 });
  }

  handleClick(item: ItemSuggestion<U>, e: React.ChangeEvent<HTMLElement>) {
    e.stopPropagation();
    this.setState({ ...this.state, displayItems: false });
    this.props.onSelect(item);
  }

  handleSup() {
    this.setState({ ...this.state, value: "", items: [] });
  }
  handleMouseEnter() {
    this.setState({ ...this.state, overItems: true });
  }
  handleMouseLeave() {
    this.setState({ ...this.state, overItems: false });
  }

  render() {
    const Composant: React.ComponentClass<ItemRendererComponent<U>> = this.props.itemComponent;
    const items = this.state.items.map((item: ItemSuggestion<U>, i: number) => {
      let boundItemClick = this.handleClick.bind(this, item);
      return (
        <div onClick={boundItemClick} key={i} className="autocompleter-item">
          <Composant item={item} prefix={this.state.value} />
        </div>
      );
    });
    const iconeCross =
      this.state.value.trim().length > 0 ? (
        <span className="cross" onClick={this.handleSup}>
          <img src={cross} alt="supprimer" />
        </span>
      ) : null;

    const listeItems = this.state.displayItems ? (
      <div className="items-liste" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {items}
      </div>
    ) : null;
    return (
      <div className="insee-autocomplete" onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <div className="input-zone">
          {iconeCross}
          <input type="text" placeholder="Veuillez saisir..." onChange={this.handleChange} value={this.state.value} />
        </div>
        {listeItems}
      </div>
    );
  }
}

export const AutocompleteString: new () => Autocomplete<string> = Autocomplete as any;
export default Autocomplete;
