import React, { Component } from "react";
import { Table, Pagination, FormControl, FormGroup, option } from "react-bootstrap";
import "./table-insee.css";

const SelectRows = ({ handleChange, rowsOptions }) => {
  rowsOptions = Array.isArray(rowsOptions) && rowsOptions.length > 0 ? rowsOptions : [5, 10, 15, 20, 30, 50];
  const options = rowsOptions.map((val, i) => (
    <option key={i} value={val}>
      {val}
    </option>
  ));
  return (
    <FormGroup controlId="formControlsSelectMultiple">
      <FormControl
        componentClass="select"
        onChange={e => {
          handleChange(e.target.value);
        }}
      >
        {options}
      </FormControl>
    </FormGroup>
  );
};

/* ** */
export const Colonne = ({ label, id, sortable }) => {
  return null;
};

/* ** */
export const nullPromiseBuilder = () => {
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

/* ** */
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

/* ** */
const Colonnes = ({ colonnes, handleSort }) => {
  return [
    colonnes.map((col, i) => {
      const click = () => {
        handleSort(col);
      };
      return (
        <th className="sortable" key={i}>
          {col.label}
          {col.sortable ? (
            col.order === "desc" ? (
              <span className="icone" onClick={click}>
                ▼
              </span>
            ) : (
              <span className="icone" onClick={click}>
                ▲
              </span>
            )
          ) : null}
        </th>
      );
    })
  ];
};

/* *** */
class TableInsee extends Component {
  constructor(props) {
    super(props);
    this.colonnes = null;
    this.sortClauses = null;
    this.mapSortClauses = {};
    this.rows = 5;
    this.state = { documents: [], nbPages: 0, nbLignes: 0, page: 0, nbLignesTotal: 0 };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.dataProvider = nullPromiseBuilder;
  }

  handleClick(id) {}

  handleRowsChange(rows) {
    this.rows = rows;
    this.refresh(0);
  }

  componentWillMount() {
    // traitement des colonnes
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.colonnes = this.props.children.map(c => ({ label: c.props.label, id: c.props.id, sortable: c.props.sortable ? true : false, order: "desc" }));
        this.sortClauses = this.props.children.filter(c => c.props.sortable).map(c => ({ id: c.props.id, order: "desc" }));
        this.mapSortClauses = this.sortClauses.reduce((map, clause) => {
          map[clause.id] = clause;

          return map;
        }, {});
      } else {
        this.colonnes = {
          label: this.props.children.props.label,
          id: this.props.children.props.id,
          sortable: this.props.children.props.sortable ? true : false,
          order: "asc"
        };
      }
    }
    // traitement initial des lignes
    this.refresh(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataProvider && nextProps.dataProvider !== this.props.dataProvider) {
      nextProps.dataProvider(0, this.sortClauses, this.rows).then(result => {
        this.setState({ ...result });
      });
    }
  }

  handleSelect(page) {
    this.refresh(page - 1);
  }

  refresh(page) {
    if (this.props.dataProvider) {
      this.props.dataProvider(page, this.sortClauses, this.rows).then(result => {
        this.setState({ ...result });
      });
    }
  }

  handleSort(c) {
    let other = [],
      witch;
    this.sortClauses.forEach(clause => {
      if (clause.id === c.id) {
        witch = [clause];
        if (c.order === "asc") {
          clause.order = "desc";
          c.order = "desc";
        } else {
          clause.order = "asc";
          c.order = "asc";
        }
      } else {
        other.push(clause);
      }
    });

    this.sortClauses = [].concat(witch, other);
    this.refresh(this.state.page);
  }

  render() {
    const { documents, nbPages, page, nbLignesTotal, nbLignes } = this.state;
    const htmlDoc = documents.map((d, i) => {
      return (
        <tr key={i}>
          <Cellule data={d} colonnes={this.colonnes} />
        </tr>
      );
    });
    const pagination =
      nbPages > 1 ? (
        <div className="paginer clearfix">
          <span>{`${page * nbLignes + 1} à ${page * nbLignes + Math.min(nbLignes, nbLignesTotal - page * nbLignes)} entrées sur ${nbLignesTotal}`}</span>
          <span className="nav">
            <Pagination prev next first last ellipsis boundaryLinks items={nbPages} maxButtons={5} activePage={page + 1} onSelect={this.handleSelect} />
          </span>
        </div>
      ) : null;
    return (
      <div className="table-insee">
        <div className="paginer clearfix">
          <span>Afficher par </span>
          <span className="rows ">
            <SelectRows handleChange={this.handleRowsChange} />
          </span>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <Colonnes colonnes={this.colonnes} handleSort={this.handleSort} />
            </tr>
          </thead>
          <tbody>{htmlDoc}</tbody>
        </Table>
        <div className="pagination-insee">{pagination}</div>
      </div>
    );
  }
}

TableInsee.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, child => {
      if (child.type !== Colonne) {
        error = new Error(`${componentName} n'acceppte que le type 'Collone'`);
      }
    });
    return error;
  }
};

export default TableInsee;
