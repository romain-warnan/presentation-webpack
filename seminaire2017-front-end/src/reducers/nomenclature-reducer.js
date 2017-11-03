import { SECTIONS_LOADED, OPEN_FICHE_DONE } from "./../actions/nomenclature-actions";

const initial = {
  sections: {},
  selection: null,
  items: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case SECTIONS_LOADED: {
      const { sections } = action;

      return {
        ...state,
        sections,
        items: sections
      };
    }

    case OPEN_FICHE_DONE: {
      const { fiche, enfants } = action;
      return { ...state, selection: fiche, items: enfants };
    }

    default:
      return state;
  }
};
