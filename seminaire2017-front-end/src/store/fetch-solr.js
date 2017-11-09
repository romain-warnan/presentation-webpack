import { getJson, postJson } from "./../fetch/fetch-api";
const HOST_PATH = process.env.REACT_APP_WS_NAFREV2_HOST;

export const fetchSuggestion = prefix => {
  const encodedPrefix = encodeURIComponent(prefix);
  return getJson(`${HOST_PATH}/nomenclature/suggestions?q=${encodedPrefix}`);
};

export const fetchSolrRubrique = (q, start, rows) => {
  const encodedPrefix = encodeURIComponent(q);

  return postJson(`${HOST_PATH}/nomenclature/recherche`, { q, start, rows });
};
