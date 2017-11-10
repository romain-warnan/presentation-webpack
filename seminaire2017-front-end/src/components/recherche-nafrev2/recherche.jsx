import React, { Component } from "react";
import { PageHeader, FormGroup, FormControl, InputGroup, Button, Glyphicon } from "react-bootstrap";
import TableInsee, { Colonne, nullPromiseBuilder } from "./../table/table-insee";
import { fetchSolrRubrique } from "./../../store/fetch-solr";
import "./recherche.css";

const rubriquesPromiseBuilder = q => (indexPage, sortables = [], rows) => {
  const start = rows * indexPage;
  return fetchSolrRubrique(q, start, rows, sortables).then(response => {
    return {
      nbPages: Math.trunc(response.numFounds / rows) + (response.numFounds % rows > 0 ? 1 : 0),
      nbLignes: rows,
      page: start / rows,
      documents: response.documents,
      nbLignesTotal: response.numFounds
    };
  });
};

class Recherche extends Component {
  constructor(props) {
    super(props);
    this.searchbar = null;
    this.handleRechercher = this.handleRechercher.bind(this);
  }

  componentDidMount() {
    this.searchbar.value = this.props.q;
  }

  componentWillMount(nextProps) {
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
        <TableInsee dataProvider={dataProvider}>
          <Colonne label="code" id="code" sortable={true} />
          <Colonne label="niveau" id="niveau" sortable={true} />
          <Colonne label="libelle" id="libelle" />
        </TableInsee>
      </div>
    );
  }
}

export default Recherche;
