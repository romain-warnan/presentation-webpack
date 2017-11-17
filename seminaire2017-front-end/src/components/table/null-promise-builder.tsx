import TableData from "./table-data";

const nullPromiseBuilder = (): Promise<TableData<null>> => {
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

export default nullPromiseBuilder;
