import { fetchFiche } from "./../store/get-fiche";
import { startWaiting, stopWaiting } from "./app-actions";

export const DISPLAY_FICHE_DONE = "__DISPLAY_FICHE_DONE__";

export const displayFiche = code => (dispacth, getState) => {
  dispacth(startWaiting());
  fetchFiche(code).then(fiche => {
    dispacth(stopWaiting());
    dispacth(displayFicheDone(fiche));
  });
};

export const displayFicheDone = fiche => ({ type: DISPLAY_FICHE_DONE, fiche });
