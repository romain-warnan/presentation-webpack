import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Pagination } from "react-bootstrap";
import "./table-insee.css";

// <th className="sortable">
//   {label}
//   {sortable ? <span className="icone">▼</span> : null}
// </th>

export const Colonne = ({ label, id, sortable }) => {
  return null;
};

const Cellule = ({ data, colonnes }) => {
  const td = colonnes.map((col, i) => {
    if (col.id in data) {
      return <td key={i}>{data[col.id]}</td>;
    } else {
      return <td key={i}>#undefined</td>;
    }
  });
  return td;
};

/* *** */
class TableInsee extends Component {
  constructor(props) {
    super(props);
    this.colonnes = null;
    this.sortColonnes = null;
    this.state = { documents: [], nbPages: 0, nbLignes: 0, page: 0 };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleClick(id) {
    this.sortColonnes.forEach(c => {
      if (c.id === id) {
      }
    });
  }

  componentWillMount() {
    // traitement des colonnes
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.colonnes = this.props.children.map(c => ({ label: c.props.label, id: c.props.id, sortable: c.props.sortable ? true : false, order: "asc" }));
        this.sortColonnes = this.props.children.filter(c => c.props.sortable).map(c => c.props.id);
      } else {
        this.colonnes = {
          label: this.props.children.props.label,
          id: this.props.children.props.id,
          sortable: this.props.children.props.sortable ? true : false
        };
      }
    }
    // traitement des lignes
    if (typeof this.props.dataProvider === "function") {
      this.props.dataProvider(0).then(result => {
        this.setState({ documents: result.documents, nbPages: result.nbPages, nbLignes: result.nbLignes, page: result.page });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataProvider !== nextProps.dataProvider) {
      nextProps.dataProvider(0).then(result => {
        this.setState({ documents: result.documents, nbPages: result.nbPages, nbLignes: result.nbLignes, page: result.page });
      });
    }
  }

  handleSelect(page) {
    if (this.props.dataProvider) {
      this.props.dataProvider(page - 1).then(result => {
        this.setState({ documents: result.documents, nbPages: result.nbPages, nbLignes: result.nbLignes, page: result.page });
      });
    }
  }

  handleSort(col) {
    console.log(col);
  }

  render() {
    const { documents, nbPages, nbLignes, page } = this.state;
    const htmlDoc = documents.map((d, i) => {
      return (
        <tr key={i}>
          <Cellule data={d} colonnes={this.colonnes} />
        </tr>
      );
    });
    const pagination =
      nbPages > 1 ? (
        <Pagination prev next first last ellipsis boundaryLinks items={nbPages} maxButtons={5} activePage={page + 1} onSelect={this.handleSelect} />
      ) : null;

    const htmlCols = this.colonnes.map((col, i) => (
      <th
        className="sortable"
        key={i}
        onClick={() => {
          this.handleSort(col);
        }}
      >
        {col.label}
        {col.sortable ? <span className="icone">▼</span> : null}
      </th>
    ));
    return (
      <div className="table-insee">
        <Table striped bordered condensed hover>
          <thead>
            <tr>{htmlCols}</tr>
          </thead>
          <tbody>{htmlDoc}</tbody>
        </Table>
        <div className="pagination-insee">{pagination}</div>
      </div>
    );
  }
}

TableInsee.propYypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, child => {
      if (child.type !== Colonne) {
        error = new Error(`${componentName} n'acceppte que le type Collone`); // '`' + componentName + '` children should be of type `Card`.'
      }
    });
    return error;
  }
};

export default TableInsee;
