package fr.insee.seminaire2017.solr.server;

import java.util.List;

import fr.insee.seminaire2017.solr.params.SortParam;

public interface Repository<T> {
	Response<T> find(String query, int start, int rows, List<SortParam> sortParams) throws SolrInseeException;
}
