import { getJson } from "./../fetch/fetch-api";
import { getSousNiveau, getSurNiveau } from "./../model/nomenclature-niveaux";
import fetchFiche from "./../store/get-fiche";

export const LOAD_SECTIONS = "__LOAD_SECTIONS__";
export const SECTIONS_LOADED = "__SECTIONS_LOADED__";
export const OPEN_FICHE = "__OPEN_FICHE__";
export const OPEN_FICHE_DONE = "__OPEN_FICHE_DONE__";

export const HOST_PATH = process.env.REACT_APP_WS_NAFREV2_HOST;

export const loadSections = () => (dispatch, getState) => {
  getJson(`${HOST_PATH}/sections`).then(sections => {
    const promises = Object.keys(sections).map(code => fetchFiche(code, "section"));
    Promise.all(promises).then(sections => {
      dispatch(sectionsLoaded(sections));
    });
  });
};

const sectionsLoaded = sections => ({ type: SECTIONS_LOADED, sections });

export const openFiche = fiche => (dispatch, getState) => {
  if (fiche.niveau === "section") {
    fetchFiche(fiche.code, "section").then(fiche => {
      fetchChildren(fiche, dispatch);
    });
  } else if (fiche.niveau !== "sousClasse") {
    fetchChildren(fiche, dispatch);
  }
};

const fetchChildren = (fiche, dispatch) => {
  if (fiche.enfants) {
    const niveau = getSousNiveau(fiche.niveau);
    if (niveau) {
      const promises = fiche.enfants.map(code => fetchFiche(code, niveau));
      Promise.all(promises).then(enfants => {
        dispatch(openFicheDone(fiche, enfants));
      });
    }
  }
};

const openFicheDone = (fiche, enfants) => ({ type: OPEN_FICHE_DONE, fiche, enfants });
