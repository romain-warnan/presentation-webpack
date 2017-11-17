import { fetchFiche } from "./../store/get-fiche";
import { Dispatch } from "redux";
import { startWaiting, stopWaiting } from "./app-actions";
import Fiche from "./../model/fiche";
import * as state from "./../reducers/combined-reducers";

export enum TypeKeys {
  displayFicheDone = "app/displayFicheDone"
}

export interface DisplayFicheDoneAction {
  type: TypeKeys.displayFicheDone;
  fiche: Fiche;
}

export const displayFiche = (code: string) => (dispatch: Dispatch<state.All>, getState: () => state.All) => {
  dispatch(startWaiting());
  fetchFiche(code).then((fiche: Fiche) => {
    dispatch(stopWaiting());
    dispatch(displayFicheDone(fiche));
  });
};

export const displayFicheDone = (fiche: Fiche) => ({ type: TypeKeys.displayFicheDone, fiche });
