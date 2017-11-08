import { connect } from "react-redux";
import { displayFiche } from "./../../actions/accueil-actions";
import Accueil from "./accueil";

const accueilProps = state => {
  const { fiche } = state.accueilReducer;
  return { fiche };
};

const accueilDispatch = dispatch => ({
  displayFiche: code => {
    dispatch(displayFiche(code));
  }
});

export default connect(accueilProps, accueilDispatch)(Accueil);
