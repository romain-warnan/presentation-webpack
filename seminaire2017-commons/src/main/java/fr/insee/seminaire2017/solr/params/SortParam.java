package fr.insee.seminaire2017.solr.params;

import java.io.Serializable;

public class SortParam implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1363104672262774520L;
	
	private String id;
	private ORDER order;
	
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ORDER getOrder() {
		return order;
	}

	public void setOrder(ORDER order) {
		this.order = order;
	}

	public static Builder newInstance(){
		return new Builder();
	}
	
	public static class Builder {
		private SortParam s;
		
		private Builder(){
			s = new SortParam();
		}
		
		public Builder setId(String id) {
			s.id = id;
			return this;
		}
		
		public Builder setOrder(ORDER order) {
			s.order = order;
			return this;
		}
		
		public SortParam build(){
			return s;
		}
	}


	/* *** */
	public static enum ORDER {
		asc, desc;
	}
}
