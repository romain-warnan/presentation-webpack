import { getJson, postJson } from "./../fetch/fetch-api";
import { SolrResponse, SortParam, SolrRequest } from "./../model/solr-beans";
import Fiche from "./../model/fiche";
const HOST_PATH = process.env.REACT_APP_WS_NAFREV2_HOST;

export const fetchSuggestion = (prefix: string): Promise<any> => {
  const encodedPrefix = encodeURIComponent(prefix);
  return getJson(`${HOST_PATH}/nomenclature/suggestions?q=${encodedPrefix}`);
};

export const fetchSolrRubrique = (q: string, start: number, rows: number, sortParams: Array<SortParam>): Promise<SolrResponse<Fiche>> => {
  const data: SolrRequest = { q, start, rows, sortParams };
  return postJson(`${HOST_PATH}/nomenclature/recherche`, data);
};
