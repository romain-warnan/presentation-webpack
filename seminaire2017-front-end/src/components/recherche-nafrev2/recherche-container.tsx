import { connect } from "react-redux";
import Recherche from "./recherche";
import { setNavIndex } from "./../../actions/app-actions";
import { nouvelleRecherche } from "./../../actions/recherche-actions";
import * as State from "./../../reducers/combined-reducers";
import { Dispatch } from "redux";

const rechercherProps = (state: State.All) => {
  const { q } = state.rechercheReducer;
  return { q };
};

const rechercheDispatch = (dispatch: Dispatch<State.All>) => ({
  setNavIndex: (index: number) => {
    dispatch(setNavIndex(index));
  },
  nouvelleRecherche: (q: string) => {
    dispatch(nouvelleRecherche(q));
  }
});

export default connect(rechercherProps, rechercheDispatch)(Recherche);
