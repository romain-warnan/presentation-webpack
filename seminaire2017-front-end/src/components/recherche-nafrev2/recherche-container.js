import { connect } from "react-redux";
import Recherche from "./recherche";
import { setNavIndex } from "./../../actions/app-actions";

const rechercherProps = state => ({});

const rechercheDispatch = dispatch => ({
  setNavIndex: index => {
    dispatch(setNavIndex(index));
  }
});

export default connect(rechercherProps, rechercheDispatch)(Recherche);
