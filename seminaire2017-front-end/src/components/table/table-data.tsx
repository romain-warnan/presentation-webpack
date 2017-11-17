interface TableData<T> {
  nbPages: number;
  nbLignes: number;
  page: number;
  documents: Array<T>;
  nbLignesTotal: number;
}

export default TableData;
