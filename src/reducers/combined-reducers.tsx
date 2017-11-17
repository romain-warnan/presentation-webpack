import { combineReducers } from "redux";
import appReducer, { AppState } from "./app-reducer";
import nomenclatureReducer, { NomenclatureState } from "./nomenclature-reducer";
import accueilReducer, { AccueilState } from "./accueil-reducer";
import rechercheReducer, { RechercheState } from "./recherche-reducer";

export type All = {
  appReducer: AppState;
  nomenclatureReducer: NomenclatureState;
  accueilReducer: AccueilState;
  rechercheReducer: RechercheState;
};

export default combineReducers({
  appReducer,
  nomenclatureReducer,
  accueilReducer,
  rechercheReducer
});
