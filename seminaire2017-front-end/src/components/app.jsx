import React from "react";
import Nomenclature from "./nomenclature/nomenclature-container";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./application.css";
import Preloader from "./preloader/preloader-container";

export default () => (
  <Router>
    <div className="application">
      <Preloader />
      <Switch>
        <Route path="/nomenclature/sections" exact component={Nomenclature} />
        <Route path="/nomenclature/:niveau/:code" component={Nomenclature} />
        <Route path="/nomenclature" render={() => <Redirect to="/nomenclature/section/A" />} />
      </Switch>
    </div>
  </Router>
);
