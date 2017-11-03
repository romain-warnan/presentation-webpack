import { connect } from "react-redux";
import { openFiche } from "./../../actions/nomenclature-actions";
import ArbreFiche from "./arbre-fiche";

const arbreFicheProps = state => {
  const { selection, items } = state.nomenclatureReducer;
  return { selection, items };
};

const arbreFicheDispatch = dispatch => ({
  openFiche: fiche => {
    dispatch(openFiche(fiche));
  }
});

export default connect(arbreFicheProps, arbreFicheDispatch)(ArbreFiche);
