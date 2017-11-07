import { fetchFiche, fetchFiches, fetchSections } from "./../store/get-fiche";
import { startWaiting, stopWaiting } from "./app-actions";

export const SHOW_FICHE = "__SHOW_FICHE__";
export const SHOW_FICHE_DONE = "__SHOW_FICHE_DONE__";
export const SHOW_FICHE_RACINE_DONE = "__SHOW_FICHE_RACINE_DONE__";

export const OPEN_SECTIONS = "__OPEN_SECTIONS__";
export const OPEN_SECTIONS_DONE = "__OPEN_SECTIONS_DONE__";
export const CLOSE_FICHE = "__CLOSE_FICHE__";
export const CLOSE_FICHE_DONE = "__CLOSE_FICHE_DONE__";

export const openSections = fiche => (dispatch, getState) => {
  dispatch(startWaiting());
  fetchSections_(getState().nomenclatureReducer.ficheActive).then(result => {
    const { sections, ficheActive } = result;
    dispatch(stopWaiting());
    dispatch(openSectionsDone(sections, ficheActive));
  });
};

const fetchSections_ = async ficheActiveFille => {
  const sections = await fetchSections();
  let ficheActive = ficheActiveFille;
  if (ficheActiveFille.parents && ficheActiveFille.parents.length > 0) {
    ficheActive = await fetchFiche(ficheActiveFille.parents[ficheActiveFille.parents.length - 1]);
  }

  return { sections, ficheActive };
};

export const closeFiche = fiche => (dispatch, getState) => {
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

const openSectionsDone = (sections, ficheActive) => ({ type: OPEN_SECTIONS_DONE, sections, ficheActive });
const closeFicheDone = (items, selection, ficheActive) => ({ type: CLOSE_FICHE_DONE, items, selection, ficheActive });

/* ** */
export const showFiche = code => (dispatch, getState) => {
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

const fetchFiche_ = async code => {
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

const showFicheDone = (fiche, enfants) => ({ type: SHOW_FICHE_DONE, fiche, enfants });
const showFicheRacineDone = (fiche, parent, enfants) => ({ type: SHOW_FICHE_RACINE_DONE, fiche, parent, enfants });

/* ***************************************************************************************************** */

async function fetchParent(code) {
  const parent = await fetchFiche(code);
  return { selection: parent, items: await fetchFiches(parent.enfants) };
}
