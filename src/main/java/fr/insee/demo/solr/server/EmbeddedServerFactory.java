package fr.insee.demo.solr.server;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.embedded.EmbeddedSolrServer;
import org.apache.solr.common.SolrException;
import org.apache.solr.core.CoreContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class EmbeddedServerFactory implements ServerFactory {

	private static final Logger logger = LoggerFactory.getLogger(EmbeddedServerFactory.class);

	private String solrHome;

	private String core;

	private SolrClient server;

	public EmbeddedServerFactory(String solrHome, String core) {
		this.solrHome = solrHome;
		this.core = core;
	}

	@Override
	public SolrClient getServer() throws SolrInseeException {
		if (server == null) {

			try {
				if (solrHome != null && !solrHome.isEmpty()) {
					CoreContainer container = new CoreContainer(solrHome);
					container.load();
					server = new EmbeddedSolrServer(container, this.core);
				}
				else {
					throw new SolrInseeException("La variable solr.solr.home n'est pas renseignée dans la configuration de dev.");
				}
			}
			catch (SolrException e) {
				throw new SolrInseeException("Impossible de construire le serveur embedded solrj.", e);
			}
		}
		return server;
	}

	@Override
	public void shutdown() throws SolrInseeException {
		if (server != null) {
			try {
				server.close();
				server = null;
			}
			catch (IOException e) {
				throw new SolrInseeException("Impossible d'arréter un serveur : " + getPath(), e);
			}

		}
	}

	public String getSolrHome() {
		return solrHome;
	}

	@PostConstruct
	public void postConstruct() {
		try {
			FileUtils.deleteDirectory(new File(solrHome + "/" + core + "/data"));
		}
		catch (IOException e) {
			logger.error("Impossible de supprimer les fichiers : " + solrHome + "/" + core + "/data");
		}
	}

	@Override
	public String getPath() {
		return "Embedded";
	}

}
