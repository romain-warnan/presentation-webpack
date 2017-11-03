import React from "react";
import Nomenclature from "./nomenclature/nomenclature-container";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./application.css";

export default () => (
  <Router>
    <div className="application">
      <Switch>
        <Route path="/nomenclature/:niveau/:code" component={Nomenclature} />
        <Route path="/" render={() => <Redirect to="/nomenclature/section/A" />} />
      </Switch>
    </div>
  </Router>
);
