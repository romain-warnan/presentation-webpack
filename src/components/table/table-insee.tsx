import React, { Component } from "react";
import { Table, Pagination, FormControl, FormGroup } from "react-bootstrap";
import { SortOrder, SortParam } from "./../../model/solr-beans";
import { ColonneType } from "./colonne";
import TableData from "./table-data";
import "./table-insee.css";

interface ColonnesProps {
  colonnes: Array<ColonneType>;
  handleSort: (col: ColonneType) => void;
}

interface SelectRowsProps {
  handleChange: (rows: number) => void;
  rowsOptions?: Array<number>;
}

const SelectRows: React.SFC<SelectRowsProps> = ({ handleChange, rowsOptions }) => {
  rowsOptions = Array.isArray(rowsOptions) && rowsOptions.length > 0 ? rowsOptions : [5, 10, 15, 20, 30, 50];
  const options = rowsOptions.map((val, i: number) => (
    <option key={i} value={val}>
      {val}
    </option>
  ));

  const handler = (e: React.FormEvent<EventTarget>) => {
    if (e.target instanceof HTMLSelectElement) {
      handleChange(parseInt((e.target as HTMLSelectElement).value));
    }
  };

  return (
    <FormGroup controlId="formControlsSelectMultiple">
      <FormControl
        componentClass="select"
        onChange={(e: React.FormEvent<EventTarget>) => {
          handler(e);
        }}
      >
        {options}
      </FormControl>
    </FormGroup>
  );
};

/* ** */
interface CelluleProps<T> {
  data: T;
  colonnes: Array<ColonneType>;
}

class Cellule<T> extends Component<CelluleProps<T>, any> {
  render() {
    const { data, colonnes } = this.props;
    const td = colonnes.map((col: ColonneType, i: number) => {
      if (col.id in data) {
        return <td key={i}>{data[col.id]}</td>;
      } else {
        return <td key={i}>#undefined</td>;
      }
    });
    return td;
  }
}
/* ** */

class Colonnes extends Component<ColonnesProps, any> {
  render() {
    const { colonnes, handleSort } = this.props;
    return [
      colonnes.map((col: ColonneType, i: number) => {
        const click = () => {
          handleSort(col);
        };
        return (
          <th className="sortable" key={i}>
            {col.label}
            {col.sortable ? (
              col.order === SortOrder.desc ? (
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
  }
}

/* *** */

export interface TableInseeProps<T> {
  dataProvider: (indexPage: number, sortables: Array<SortParam>, rows: number) => Promise<TableData<T>>;
}

class TableInsee<T> extends Component<TableInseeProps<T>, TableData<T>> {
  colonnes: Array<ColonneType>;
  rows: number;
  mapSortClauses: any;
  sortClauses: Array<SortParam>;

  constructor(props: TableInseeProps<T>) {
    super(props);
    this.colonnes = null;
    this.sortClauses = null;
    this.mapSortClauses = {};
    this.rows = 5;
    this.state = { documents: [], nbPages: 0, nbLignes: 0, page: 0, nbLignesTotal: 0 };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleRowsChange = this.handleRowsChange.bind(this);
  }

  handleClick(id: string) {}

  handleRowsChange(rows: number) {
    this.rows = rows;
    this.refresh(0);
  }

  componentWillMount() {
    // traitement des colonnes
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.colonnes = this.props.children.map((c: any): ColonneType => ({
          label: c.props.label,
          id: c.props.id,
          sortable: c.props.sortable ? true : false,
          order: SortOrder.desc
        }));
        this.sortClauses = this.props.children
          .filter((c: any): boolean => c.props.sortable)
          .map((c: any): SortParam => ({ id: c.props.id, order: SortOrder.desc }));
        this.mapSortClauses = this.sortClauses.reduce((map, clause) => {
          map[clause.id] = clause;

          return map;
        }, {});
      } else {
        // TODO cas 1 seule colonne
        // this.colonnes = {
        //   label: this.props.children.props.label,
        //   id: this.props.children.props.id,
        //   sortable: this.props.children.props.sortable ? true : false,
        //   order: "asc"
        // };
      }
    }
    // traitement initial des lignes
    this.refresh(0);
  }

  componentWillReceiveProps(nextProps: TableInseeProps<T>) {
    if (nextProps.dataProvider && nextProps.dataProvider !== this.props.dataProvider) {
      nextProps.dataProvider(0, this.sortClauses, this.rows).then(result => {
        this.setState({ ...result });
      });
    }
  }

  handleSelect(page: any) {
    this.refresh(page - 1);
  }

  refresh(page: number) {
    if (this.props.dataProvider) {
      this.props.dataProvider(page, this.sortClauses, this.rows).then(result => {
        this.setState({ ...result });
      });
    }
  }

  handleSort(c: ColonneType) {
    let other: Array<SortParam> = [],
      witch;
    this.sortClauses.forEach(clause => {
      if (clause.id === c.id) {
        witch = [clause];
        if (c.order === SortOrder.asc) {
          clause.order = SortOrder.desc;
          c.order = SortOrder.desc;
        } else {
          clause.order = SortOrder.asc;
          c.order = SortOrder.asc;
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
    const htmlDoc = documents.map((d: T, i: number) => {
      return (
        <tr key={i}>
          <Cellule data={d} colonnes={this.colonnes} />
        </tr>
      );
    });

    const pagination =
      nbPages > 1 ? (
        <div className="paginer clearfix">
          <span>{`${page * nbLignes + 1} à ${page * nbLignes +
            Math.min(nbLignes, nbLignesTotal - page * nbLignes)} entrées sur ${nbLignesTotal}`}</span>
          <span className="nav">
            <Pagination
              prev={true}
              next={true}
              first={true}
              last={true}
              ellipsis={true}
              boundaryLinks={true}
              items={nbPages}
              maxButtons={5}
              activePage={page + 1}
              onSelect={this.handleSelect}
            />
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

export default TableInsee;
