import { fetchFiche, fetchFiches, fetchSections } from "./../store/get-fiche";
import { Dispatch } from "redux";
import { startWaiting, stopWaiting } from "./app-actions";
import Fiche from "./../model/fiche";
import * as state from "./../reducers/combined-reducers";

export enum TypeKeys {
  showFicheDone = "app/showFicheDone",
  showFicheRacineDone = "app/showFicheRacineDone",
  openSectionDone = "app/openSectionDone",
  closeFicheDone = "app/closeFicheDone"
}

/* Typage des actions */
export interface OpenSectionDoneAction {
  type: TypeKeys.openSectionDone;
  sections: any;
  ficheActive: Fiche;
}
export interface CloseFicheDoneAction {
  type: TypeKeys.closeFicheDone;
  items: Array<any>;
  selection: Fiche;
  ficheActive: Fiche;
}
export interface ShowFicheDoneAction {
  type: TypeKeys.showFicheDone;
  fiche: Fiche;
  enfants: Array<String>;
}

export interface ShowFicheRacineDone {
  type: TypeKeys.showFicheRacineDone;
  fiche: Fiche;
  parent: Fiche;
  enfants: Array<String>;
}

interface FetchFiche {
  fiche?: Fiche;
  enfants?: Array<any>;
  parent?: Fiche;
}

/* Fonction asynch */
export const openSections = () => (dispatch: Dispatch<state.All>, getState: () => state.All) => {
  dispatch(startWaiting());
  fetchSections_(getState().nomenclatureReducer.ficheActive).then(result => {
    const { sections, ficheActive } = result;
    dispatch(stopWaiting());
    dispatch(openSectionsDone(sections, ficheActive));
  });
};

const fetchSections_ = async (ficheActiveFille: Fiche) => {
  const sections = await fetchSections();
  let ficheActive = ficheActiveFille;
  if (ficheActiveFille.parents && ficheActiveFille.parents.length > 0) {
    ficheActive = await fetchFiche(ficheActiveFille.parents[ficheActiveFille.parents.length - 1]);
  }

  return { sections, ficheActive };
};

export const closeFiche = (fiche: Fiche) => (dispatch: Dispatch<state.All>, getState: () => state.All) => {
  const parent = fiche.parents.length > 0 ? fiche.parents[fiche.parents.length - 1] : null;
  if (parent) {
    dispatch(startWaiting());
    fetchParent(parent).then(result => {
      dispatch(stopWaiting());
      const { items, selection } = result;
      dispatch(closeFicheDone(items, selection, fiche));
    });
  } else {
    dispatch(closeFicheDone(getState().nomenclatureReducer.sections, null, fiche));
  }
};

export const showFiche = (code: string) => (dispatch: Dispatch<state.All>, getState: () => state.All) => {
  dispatch(startWaiting());
  fetchFiche_(code).then(result => {
    dispatch(stopWaiting());
    const { fiche } = result;
    if (fiche.enfants.length === 0) {
      const { parent, enfants } = result;
      dispatch(showFicheRacineDone(fiche, parent, enfants));
    } else {
      const { enfants } = result;
      dispatch(showFicheDone(fiche, enfants));
    }
  });
};

const fetchFiche_ = async (code: string): Promise<FetchFiche> => {
  const fiche = await fetchFiche(code);
  if (fiche.enfants.length === 0) {
    const parent = await fetchFiche(fiche.parents[fiche.parents.length - 1]);
    const enfants = await fetchFiches(parent.enfants);
    return { fiche, enfants, parent };
  } else {
    const enfants = await fetchFiches(fiche.enfants);
    return { fiche, enfants };
  }
};

/* actions builder */
const openSectionsDone = (sections: any, ficheActive: Fiche) => ({ type: TypeKeys.openSectionDone, sections, ficheActive });
const closeFicheDone = (items: Array<any>, selection: Fiche, ficheActive: Fiche) => ({ type: TypeKeys.closeFicheDone, items, selection, ficheActive });
const showFicheDone = (fiche: Fiche, enfants: Array<String>) => ({ type: TypeKeys.showFicheDone, fiche, enfants });
const showFicheRacineDone = (fiche: Fiche, parent: Fiche, enfants: Array<String>) => ({ type: TypeKeys.showFicheRacineDone, fiche, parent, enfants });

/* ***************************************************************************************************** */
interface FetchParent {
  selection: Fiche;
  items: Array<Fiche>;
}
async function fetchParent(code: string): Promise<FetchParent> {
  const parent = await fetchFiche(code);
  return { selection: parent, items: await fetchFiches(parent.enfants) };
}
