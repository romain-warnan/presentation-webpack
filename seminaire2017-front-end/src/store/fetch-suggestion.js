import { getJson } from "./../fetch/fetch-api";
const HOST_PATH = process.env.REACT_APP_WS_NAFREV2_HOST;

export const fetchSuggestion = prefix => {
  const encodedPrefix = encodeURIComponent(prefix);
  return getJson(`${HOST_PATH}/nomenclature/search?q=${encodedPrefix}`);
};
