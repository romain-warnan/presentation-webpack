import { connect } from "react-redux";
import { openSections, showFiche } from "./../../actions/nomenclature-actions";
import Nomenclature from "./nomenclature";

const nomenclatureProps = state => ({});

const nomenclatureDispatch = dispatch => ({
  openSections: () => {
    dispatch(openSections());
  },
  showFiche: code => {
    dispatch(showFiche(code));
  }
});

export default connect(nomenclatureProps, nomenclatureDispatch)(Nomenclature);
