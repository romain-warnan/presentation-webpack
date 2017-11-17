import * as accueil from "./accueil-actions";
import * as app from "./app-actions";
import * as nomenclature from "./nomenclature-actions";
import * as recherche from "./recherche-actions";

/*
* type contenant l'ensemble des types d'actions de l'application.
*/
export type ActionsTypes =
  | accueil.DisplayFicheDoneAction
  | app.StartWaitingAction
  | app.SetNavIndexWaitingAction
  | app.StopWaitingWaitingAction
  | nomenclature.CloseFicheDoneAction
  | nomenclature.OpenSectionDoneAction
  | nomenclature.ShowFicheDoneAction
  | nomenclature.ShowFicheRacineDone
  | recherche.NouvelleRechercheAction;
