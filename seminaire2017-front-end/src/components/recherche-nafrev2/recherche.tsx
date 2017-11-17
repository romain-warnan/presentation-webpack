import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl, InputGroup, Button, Glyphicon } from "react-bootstrap";
import TableInsee from "./../table/table-insee";
import Colonne from "./../table/colonne";
import nullPromiseBuilder from "./../table/null-promise-builder";
import { fetchSolrRubrique } from "./../../store/fetch-solr";
import Fiche from "./../../model/fiche";
import { SolrResponse, SortParam } from "./../../model/solr-beans";
import "./recherche.css";

const TableFiche: new () => TableInsee<Fiche> = TableInsee as any;

const rubriquesPromiseBuilder = (q: string) => (indexPage: number, sortables: Array<SortParam> = [], rows: number) => {
  const start: number = rows * indexPage;
  return fetchSolrRubrique(q, start, rows, sortables).then((response: SolrResponse<Fiche>) => {
    return {
      nbPages: Math.trunc(response.numFounds / rows) + (response.numFounds % rows > 0 ? 1 : 0),
      nbLignes: rows,
      page: start / rows,
      documents: response.documents,
      nbLignesTotal: response.numFounds
    };
  });
};

interface RechercheProps {
  nouvelleRecherche: (q: string) => void;
  setNavIndex: (index: number) => void;
  q: string;
}

class Recherche extends Component<RechercheProps, any> {
  searchbar: any;

  constructor(props: RechercheProps) {
    super(props);
    this.searchbar = null;
    this.handleRechercher = this.handleRechercher.bind(this);
  }

  componentDidMount() {
    this.searchbar.value = this.props.q;
  }

  componentWillMount() {
    this.props.setNavIndex(3);
  }

  handleRechercher() {
    const q = this.searchbar.value.trim();
    if (this.props.q !== q) {
      if (q.length > 0) {
        this.props.nouvelleRecherche(q);
      } else {
        this.props.nouvelleRecherche("");
      }
    }
  }

  render() {
    const { q } = this.props;
    const dataProvider = q && q.trim().length > 0 ? rubriquesPromiseBuilder(q) : nullPromiseBuilder;
    return (
      <div className="recherche">
        <PageHeader>Rechercher dans nafrev2</PageHeader>
        <div className="search">
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="veuillez saisir votre recherche"
                inputRef={ref => {
                  this.searchbar = ref;
                }}
              />
              <InputGroup.Button onClick={this.handleRechercher}>
                <Button>
                  <Glyphicon glyph="glyphicon glyphicon-search" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </div>
        <TableFiche dataProvider={dataProvider}>
          <Colonne label="code" id="code" sortable={true} />
          <Colonne label="niveau" id="niveau" sortable={true} />
          <Colonne label="libelle" id="libelle" />
        </TableFiche>
      </div>
    );
  }
}

export default Recherche;
