import { connect } from "react-redux";
import { openSections, showFiche } from "./../../actions/nomenclature-actions";
import { setNavIndex } from "./../../actions/app-actions";
import Nomenclature from "./nomenclature";

const nomenclatureProps = state => ({});

const nomenclatureDispatch = dispatch => ({
  openSections: () => {
    dispatch(openSections());
  },
  showFiche: code => {
    dispatch(showFiche(code));
  },
  setNavIndex: index => {
    dispatch(setNavIndex(index));
  }
});

export default connect(nomenclatureProps, nomenclatureDispatch)(Nomenclature);
