import { connect } from "react-redux";
import Preloader from "./preloader";
import * as State from "./../../reducers/combined-reducers";

const preloaderProps = (state: State.All) => ({ active: state.appReducer.waiting });

export default connect(preloaderProps)(Preloader);
