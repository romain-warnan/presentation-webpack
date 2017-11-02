package fr.insee.demo.solr.server;

import org.apache.solr.client.solrj.SolrClient;


public interface ServerFactory {

	SolrClient getServer() throws SolrInseeException;

	String getPath();

	void shutdown() throws SolrInseeException;
}
