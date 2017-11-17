import Fiche from "./../model/fiche";
import { getJson } from "./../fetch/fetch-api";

const LOCAL_STORE = new Map();
let LOCAL_SECTION: any = null;
const HOST_PATH = process.env.REACT_APP_WS_NAFREV2_HOST;

export const fetchFiche = (code: string): Promise<Fiche> => {
  let promise = null;
  if (LOCAL_STORE.has(code)) {
    promise = new Promise(resolve => {
      resolve(LOCAL_STORE.get(code));
    });
  } else {
    promise = getJson(`${HOST_PATH}/nomenclature/rubrique/${code}`).then(rubrique => {
      LOCAL_STORE.set(code, rubrique);
      return rubrique;
    });
  }

  return promise;
};

export const fetchFiches = (codes: Array<string>): Promise<Array<Fiche>> => {
  return Promise.all(codes.map(c => fetchFiche(c))).then(fiches => {
    fiches.forEach(f => {
      if (!LOCAL_STORE.has(f.code)) {
        LOCAL_STORE.set(f.code, f);
      }
    });

    return fiches;
  });
};

export const fetchSections = (): Promise<any> => {
  let promise = null;
  if (LOCAL_SECTION === null) {
    promise = getJson(`${HOST_PATH}/nomenclature/sections`).then(sections => {
      LOCAL_SECTION = sections;
      return sections;
    });
  } else {
    promise = new Promise(resolve => {
      resolve(LOCAL_SECTION);
    });
  }

  return promise;
};
