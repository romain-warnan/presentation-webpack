import { connect } from "react-redux";
import Recherche from "./recherche";
import { setNavIndex } from "./../../actions/app-actions";
import { nouvelleRecherche } from "./../../actions/recherche-actions";

const rechercherProps = state => {
  const { q } = state.rechercheReducer;
  return { q };
};

const rechercheDispatch = dispatch => ({
  setNavIndex: index => {
    dispatch(setNavIndex(index));
  },
  nouvelleRecherche: q => {
    dispatch(nouvelleRecherche(q));
  }
});

export default connect(rechercherProps, rechercheDispatch)(Recherche);
