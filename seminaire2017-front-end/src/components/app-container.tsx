import { connect } from "react-redux";
import { setNavIndex } from "./../actions/app-actions";
import * as redux from "redux";
import App from "./app";
import * as State from "./../reducers/combined-reducers";

const appProps = (state: State.All) => {
  const { navIndex } = state.appReducer;
  return { navIndex };
};

const appDispatch = (dispatch: redux.Dispatch<State.All>) => ({
  setNavIndex: (index: number) => {
    dispatch(setNavIndex(index));
  }
});

export default connect(appProps, appDispatch)(App);
