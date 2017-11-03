import { getJson } from "./../fetch/fetch-api";

const HOST_PATH = process.env.REACT_APP_WS_NAFREV2_HOST;
const FICHES = new Map();

export default (code, niveau) => {
  if (FICHES.has(code)) {
    return new Promise((resolve, reject) => {
      resolve(FICHES.get(code));
    });
  } else {
    return getJson(`${HOST_PATH}/${niveau}/${code}`).then(fiche => {
      FICHES.set(code, fiche);
      return fiche;
    });
  }
};
