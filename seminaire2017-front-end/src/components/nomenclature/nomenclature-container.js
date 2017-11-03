import { connect } from "react-redux";
import { loadSections } from "./../../actions/nomenclature-actions";
import Nomenclature from "./nomenclature";

const nomenclatureProps = state => ({});

const nomenclatureDispatch = dispatch => ({
  loadSections: () => {
    dispatch(loadSections());
  }
});

export default connect(nomenclatureProps, nomenclatureDispatch)(Nomenclature);
