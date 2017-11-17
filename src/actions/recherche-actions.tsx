export enum TypeKeys {
  nouvelleRecherche = "app/nouvelleRecherche"
}

export interface NouvelleRechercheAction {
  type: TypeKeys.nouvelleRecherche;
  q: string;
}

export const nouvelleRecherche = (q: string) => ({ type: TypeKeys.nouvelleRecherche, q });
