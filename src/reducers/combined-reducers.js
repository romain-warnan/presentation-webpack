import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import nomenclatureReducer from "./nomenclature-reducer";
import accueilReducer from "./accueil-reducer";
import rechercheReducer from "./recherche-reducer";

export default combineReducers({
  appReducer,
  nomenclatureReducer,
  accueilReducer,
  rechercheReducer
});
