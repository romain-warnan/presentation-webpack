import { TypeKeys } from "./../actions/accueil-actions";
import { ActionsTypes } from "./../actions/action-types";
import Fiche from "./../model/fiche";

export type AccueilState = { fiche: Fiche };

const initial: AccueilState = { fiche: { niveau: null, code: null, libelle: null, noteGenerale: null, neComprendPas: null, comprend: null } };

export default (state: AccueilState = initial, action: ActionsTypes) => {
  switch (action.type) {
    case TypeKeys.displayFicheDone: {
      const { fiche } = action;
      return Object.assign({}, state, { fiche });
    }
    default:
      return state;
  }
};
