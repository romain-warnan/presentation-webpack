package fr.insee.seminaire2017.resources;

public class ResourceException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1002607581748040227L;
	
	public ResourceException(String message){
		super(message);
	}
	
	public ResourceException(String message, Throwable e){
		super(message, e);
	}

}
