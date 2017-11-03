package fr.insee.seminaire2017.solr.server;

public class SolrInseeException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4685224860694688483L;

	public SolrInseeException() {
		super();
	}

	
	public SolrInseeException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public SolrInseeException(String message, Throwable cause) {
		super(message, cause);
	}

	public SolrInseeException(String message) {
		super(message);
	}

	public SolrInseeException(Throwable cause) {
		super(cause);
	}

}
