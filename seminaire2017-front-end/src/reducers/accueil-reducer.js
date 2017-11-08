import { DISPLAY_FICHE_DONE } from "./../actions/accueil-actions";

const initial = { fiche: { niveau: null, code: null, libelle: null, noteGenerale: null, neComprendPas: null, comprend: null } };

export default (state = initial, action) => {
  switch (action.type) {
    case DISPLAY_FICHE_DONE: {
      const { fiche } = action;
      return { ...state, fiche };
    }
    default:
      return state;
  }
};
