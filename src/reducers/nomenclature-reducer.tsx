import * as actions from "./../actions/nomenclature-actions";
import Fiche from "./../model/fiche";
import { ActionsTypes } from "./../actions/action-types";

export type NomenclatureState = {
  sections: any;
  selection: Fiche;
  ficheActive: Fiche;
  items: Array<string>;
};

const initial: NomenclatureState = {
  sections: {},
  selection: null,
  ficheActive: { code: null },
  items: []
};

export default (state: NomenclatureState = initial, action: ActionsTypes) => {
  switch (action.type) {
    case actions.TypeKeys.openSectionDone: {
      const { sections, ficheActive } = action;
      return Object.assign({}, state, {
        sections,
        selection: null,
        items: sections,
        ficheActive
      });
    }

    case actions.TypeKeys.closeFicheDone: {
      const { items, selection, ficheActive } = action;
      return Object.assign({}, state, { items, selection, ficheActive: ficheActive });
    }

    case actions.TypeKeys.showFicheDone: {
      const { fiche, enfants } = action;
      return Object.assign({}, state, { selection: fiche, items: enfants, ficheActive: fiche });
    }

    case actions.TypeKeys.showFicheRacineDone: {
      const { fiche, parent, enfants } = action;
      return Object.assign({}, state, { selection: parent, items: enfants, ficheActive: fiche });
    }

    default:
      return state;
  }
};
