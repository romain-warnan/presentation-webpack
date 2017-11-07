import { OPEN_SECTIONS_DONE, CLOSE_FICHE_DONE, SHOW_FICHE_DONE, SHOW_FICHE_RACINE_DONE } from "./../actions/nomenclature-actions";

const initial = {
  sections: {},
  selection: null,
  ficheActive: { code: null },
  items: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case OPEN_SECTIONS_DONE: {
      const { sections, ficheActive } = action;
      return {
        ...state,
        sections,
        selection: null,
        items: sections,
        ficheActive
      };
    }

    case CLOSE_FICHE_DONE: {
      const { items, selection, ficheActive } = action;
      return { ...state, items, selection, ficheActive: ficheActive };
    }

    case SHOW_FICHE_DONE: {
      const { fiche, enfants } = action;
      return { ...state, selection: fiche, items: enfants, ficheActive: fiche };
    }

    case SHOW_FICHE_RACINE_DONE: {
      const { fiche, parent, enfants } = action;
      return { ...state, selection: parent, items: enfants, ficheActive: fiche };
    }

    default:
      return state;
  }
};
