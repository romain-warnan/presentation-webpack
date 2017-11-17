import { connect } from "react-redux";
import Rubrique from "./rubrique";

const propsRubrique = state => {
  const { ficheActive } = state.nomenclatureReducer;
  return { fiche: ficheActive };
};

export default connect(propsRubrique)(Rubrique);
