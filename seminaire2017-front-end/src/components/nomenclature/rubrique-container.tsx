import { connect } from "react-redux";
import Rubrique from "./rubrique";
import * as State from "./../../reducers/combined-reducers";

const propsRubrique = (state: State.All) => {
  const { ficheActive } = state.nomenclatureReducer;
  return { fiche: ficheActive };
};

export default connect(propsRubrique)(Rubrique);
