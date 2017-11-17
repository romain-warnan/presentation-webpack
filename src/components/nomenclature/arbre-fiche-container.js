import { connect } from "react-redux";
import ArbreFiche from "./arbre-fiche";
import { closeFiche } from "./../../actions/nomenclature-actions";

const arbreFicheProps = (state, ownProps) => {
  const { selection, items, ficheActive } = state.nomenclatureReducer;
  return { selection, items, ficheActive };
};

const arbreFicheDispatch = dispatch => ({
  closeFiche: fiche => {
    dispatch(closeFiche(fiche));
  }
});

export default connect(arbreFicheProps, arbreFicheDispatch)(ArbreFiche);
