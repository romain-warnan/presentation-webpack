package fr.insee.seminaire2017.solr.server;

import java.io.Serializable;
import java.util.List;

import com.google.common.collect.Lists;

public class Response<T> implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -424985113025726284L;
	
	private int start;
	private int rows;
	private long numFounds;
	private List<T> documents = Lists.newArrayList();
	
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}
	public long getNumFounds() {
		return numFounds;
	}
	public void setNumFounds(long numFounds) {
		this.numFounds = numFounds;
	}
	public List<T> getDocuments() {
		return documents;
	}
	public void setDocuments(List<T> documents) {
		this.documents = documents;
	}
	public static <T> Builder<T> newInstance() {
		return new Builder<T>();
	}
	
	
	public static class Builder<M> {
		Response<M> r;
		
		private Builder(){
			r = new Response<>();
		}
		
		public Builder<M> setStart(int start) {
			r.start = start;
			return this;
		}
		
		public Builder<M> setDocuments(List<M> documents) {
			r.documents = documents;
			return this;
		}
		
		public Builder<M> setNumFounds(long numFounds) {
			r.numFounds = numFounds;
			return this;
		}
		
		public Builder<M> setRows(int rows) {
			r.rows = rows;
			return this;
		}
		
		public Response<M> build(){
			return r;
		}
		
	}	
	
}
