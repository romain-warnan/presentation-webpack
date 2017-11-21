import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers/combined-reducers";
import App from "./components/app-container";

let composeEnhancers;
if (process.env.NODE_ENV === "development") {
  composeEnhancers =
    "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__" in window ? window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] : compose;
} else {
  composeEnhancers = compose;
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
