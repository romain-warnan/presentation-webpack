import { TypeKeys } from "./../actions/recherche-actions";
import { ActionsTypes } from "./../actions/action-types";

export interface RechercheState {
  q: string;
}

const initial: RechercheState = {
  q: ""
};

export default (state: RechercheState = initial, action: ActionsTypes) => {
  switch (action.type) {
    case TypeKeys.nouvelleRecherche: {
      const { q } = action;
      return Object.assign({}, state, { state, q });
    }
    default:
      return state;
  }
};
