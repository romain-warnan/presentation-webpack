import { connect } from "react-redux";
import Preloader from "./preloader";

export default connect(state => ({ active: state.appReducer.waiting }))(Preloader);
