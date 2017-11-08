import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import nomenclatureReducer from "./nomenclature-reducer";
import accueilReducer from "./accueil-reducer";

export default combineReducers({
  appReducer,
  nomenclatureReducer,
  accueilReducer
});
