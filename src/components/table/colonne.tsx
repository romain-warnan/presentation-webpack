import { SortOrder } from "./../../model/solr-beans";

interface ColonneProps {
  label: string;
  id: string;
  sortable?: boolean;
  order?: SortOrder;
}

export type ColonneType = ColonneProps;

/* ** */

const Colonne: React.SFC<ColonneProps> = ({ label, id, sortable }) => {
  return null;
};

export default Colonne;
