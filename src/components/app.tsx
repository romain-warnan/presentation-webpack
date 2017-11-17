import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import Accueil from "./accueil/accueil-container";
import Preloader from "./preloader/preloader-container";
import Nomenclature from "./nomenclature/nomenclature-container";
import Recherche from "./recherche-nafrev2/recherche-container";
import "./application.css";

interface AppProps {
  readonly setNavIndex: (selectedKey: number) => void;
  readonly navIndex: number;
}

class App extends Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSelect(selectedKey: number) {
    this.props.setNavIndex(selectedKey);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index: number) {
    this.props.setNavIndex(index);
  }

  render() {
    const { navIndex } = this.props;
    return (
      <Router>
        <div className="application">
          <Preloader />
          <NavBar index={navIndex} handleClick={this.handleClick} />
          <Switch>
            <Route path="/nomenclature/sections" exact component={Nomenclature} />
            <Route path="/nomenclature/recherche" exact component={Recherche} />
            <Route path="/nomenclature/:niveau/:code" component={Nomenclature} />
            <Route path="/nomenclature" render={() => <Redirect to="/nomenclature/sections" />} />
            <Route path="/accueil" component={Accueil} />
          </Switch>
        </div>
      </Router>
    );
  }
}

interface NavBarProps {
  index: number;
  handleClick: (index: number) => void;
}

class NavBar extends Component<NavBarProps, any> {
  render() {
    const { index, handleClick } = this.props;
    return (
      <div className="nav-bar">
        <div className="liens">
          <Link
            className={index === 1 ? "active" : "inactive"}
            to="/accueil"
            onClick={() => {
              handleClick(1);
            }}
          >
            Accueil
          </Link>
          <Link
            className={index === 2 ? "active" : "inactive"}
            to="/nomenclature/sections"
            onClick={() => {
              handleClick(2);
            }}
          >
            Arbre
          </Link>
          <Link
            className={index === 3 ? "active" : "inactive"}
            to="/nomenclature/recherche"
            onClick={() => {
              handleClick(3);
            }}
          >
            Recherche
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
