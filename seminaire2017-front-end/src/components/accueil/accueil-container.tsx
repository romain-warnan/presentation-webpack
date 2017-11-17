import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as State from "./../../reducers/combined-reducers";
import { displayFiche } from "./../../actions/accueil-actions";
import Accueil from "./accueil";

const accueilProps = (state: State.All) => {
  const { fiche } = state.accueilReducer;
  return { fiche };
};

const accueilDispatch = (dispatch: Dispatch<State.All>) => ({
  displayFiche: (code: string) => {
    dispatch(displayFiche(code));
  }
});

export default connect(accueilProps, accueilDispatch)(Accueil);
