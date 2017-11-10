import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup, Button, Glyphicon } from "react-bootstrap";
import TableInsee, { Colonne } from "./../table/table-insee";
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

const nullPromiseBuilder = () => {
  return new Promise(resolve => {
    resolve({
      nbPages: 0,
      nbLignes: 0,
      page: 0,
      nbLignesTotal: 0,
      documents: []
    });
  });
};

class Recherche extends Component {
  constructor(props) {
    super(props);
    this.searchbar = null;
    this.state = { dataProvider: nullPromiseBuilder };
    this.handleRchercher = this.handleRchercher.bind(this);
  }

  componentWillMount(nextProps) {
    this.props.setNavIndex(3);
  }

  handleRchercher() {
    const q = this.searchbar.value.trim();
    if (q.length > 0) {
      this.setState({ dataProvider: rubriquesPromiseBuilder(q) });
    } else {
      this.setState({ dataProvider: nullPromiseBuilder });
    }
  }

  render() {
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
              <InputGroup.Button onClick={this.handleRchercher}>
                <Button>
                  <Glyphicon glyph="glyphicon glyphicon-search" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </div>
        <TableInsee dataProvider={this.state.dataProvider}>
          <Colonne label="code" id="code" sortable={true} />
          <Colonne label="niveau" id="niveau" sortable={true} />
          <Colonne label="libelle" id="libelle" />
        </TableInsee>
      </div>
    );
  }
}

export default Recherche;
