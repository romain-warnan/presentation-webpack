import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonToolbar, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Accueil from "./accueil/accueil-container";
import Preloader from "./preloader/preloader-container";
import Nomenclature from "./nomenclature/nomenclature-container";
import "./application.css";

// <Button bsStyle="primary">Primary</Button>

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSelect(selectedKey) {
    this.props.setNavIndex(selectedKey);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    console.log("coucou", index);
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
            <Route path="/nomenclature/:niveau/:code" component={Nomenclature} />
            <Route path="/nomenclature" render={() => <Redirect to="/nomenclature/sections" />} />
            <Route path="/accueil" component={Accueil} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const NavBar = ({ index, handleClick }) => {
  return (
    <div className="nav-bar">
      <Link
        className={index == 1 ? "active" : "inactive"}
        to="/accueil"
        onClick={() => {
          handleClick(1);
        }}
      >
        Accueil
      </Link>
      <Link
        className={index == 2 ? "active" : "inactive"}
        to="/nomenclature/sections"
        onClick={() => {
          handleClick(2);
        }}
      >
        Arbre
      </Link>
    </div>
  );
};

export default App;
