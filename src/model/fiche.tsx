export default interface Fiche {
  code?: string;
  niveau?: string;
  libelle?: string;
  parents?: Array<string>;
  enfants?: Array<string>;
  noteGenerale?: string;
  neComprendPas?: string;
  comprend?: string;
};
