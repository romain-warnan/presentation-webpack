import { connect } from "react-redux";
import { setNavIndex } from "./../actions/app-actions";
import App from "./app";

const appProps = state => {
  const { navIndex } = state.appReducer;
  return { navIndex };
};

const appDispatch = dispatch => ({
  setNavIndex: index => {
    dispatch(setNavIndex(index));
  }
});

export default connect(appProps, appDispatch)(App);
