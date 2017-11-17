export interface SolrResponse<T> {
  numFounds: number;
  start: number;
  rows: number;
  documents: Array<T>;
}

export enum SortOrder {
  asc = "asc",
  desc = "desc"
}

export interface SortParam {
  id: string;
  order: SortOrder;
}

export interface SolrRequest {
  q: string;
  rows: number;
  start: number;
  sortParams: Array<SortParam>;
}
