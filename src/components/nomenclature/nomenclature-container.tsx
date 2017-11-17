import { connect } from "react-redux";
import { Dispatch } from "redux";
import { openSections, showFiche } from "./../../actions/nomenclature-actions";
import { setNavIndex } from "./../../actions/app-actions";
import Nomenclature from "./nomenclature";
import * as State from "./../../reducers/combined-reducers";

const nomenclatureProps = (state: State.All) => ({});

const nomenclatureDispatch = (dispatch: Dispatch<State.All>) => ({
  openSections: () => {
    dispatch(openSections());
  },
  showFiche: (code: string) => {
    dispatch(showFiche(code));
  },
  setNavIndex: (index: number) => {
    dispatch(setNavIndex(index));
  }
});

export default connect(nomenclatureProps, nomenclatureDispatch)(Nomenclature);
