import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import nomenclatureReducer from "./nomenclature-reducer";

export default combineReducers({
  appReducer,
  nomenclatureReducer
});
